/* ════════════════════════════════════════
   值班佇列 · 事件研判
   資料由 data/events.js 提供（window.EVENT_SCENARIOS），
   由 pipeline/events/build.py 產生：逐期回放 SAR 偵測結果，
   每個時點只用當時已取得的影像。
   兩種模式：即時監看（kind=live，預設）與演練模式（正／負案例、全清冊回放等歷史事件）。
   人工查證紀錄存在這台電腦的瀏覽器（localStorage），兩種模式分開存，可匯出 JSON。
   ════════════════════════════════════════ */

'use strict';

const Duty = (() => {
  const SCENARIOS = (window.EVENT_SCENARIOS || []).filter(s => !s.hidden);
  const STORE_KEY = 'ossint.verify.v1';
  const DRILL_STORE_KEY = 'ossint.verify.drill.v1';

  const PRIORITY_GROUPS = [
    { key: 'high', title: '建議立即查證' },
    { key: 'medium', title: '建議人工確認' },
    { key: 'low', title: '暫時觀察' },
  ];
  /* 標籤的滑鼠提示：與「使用說明」裡的圖例同一份文字（規則見 pipeline/events/triage.py） */
  const PRIORITY_TIP = {
    high: '高優先＝建議立即查證：多期 SAR 一致且附近有崩塌、單期 SAR 有他單位獨立觀測佐證，或前期已確認、最新一期未見（可能潰決）',
    medium: '中優先＝建議人工確認：只有一期 SAR、空間條件符合，待下一期複核',
    low: '低優先＝暫時觀察：下一期複核未持續，或附近沒有崩塌訊號',
  };
  const CONFIDENCE_TIP = {
    高: '研判信心高：有 SAR 以外的獨立證據（他單位光學、航拍、判釋、現地勘查），或人工查證確認',
    中: '研判信心中：只有 SAR，但跨期結果明確（已確認持續，或複核明確未持續）',
    低: '研判信心低：只有單期 SAR 尚未複核，或前後期結果不一致',
  };
  const VERDICTS = {
    confirm: { text: '確認為堰塞湖', tag: '人工確認' },
    watch: { text: '持續觀察', tag: '人工：持續觀察' },
    exclude: { text: '排除（非堰塞湖）', tag: '人工排除' },
  };
  const EVIDENCE_MARK = { support: '✓', against: '✗', context: '·' };

  const st = { scenario: 0, snap: 0, eventId: null, lastLive: -1 };
  let showBase = true;   // 小地圖是否顯示事件前光學底圖
  let showAerial = true; // 小地圖是否疊上該時點已可取得的最新航照

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* 「?」：開新分頁到使用說明（help.html）的對應段落 */
  const helpQ = (id, name) =>
    `<a class="help-q" href="help.html#${id}" target="_blank" rel="noopener" title="使用說明：${name}" aria-label="使用說明：${name}">?</a>`;

  /* ── 人工查證紀錄 ── */

  function loadStore(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
  }
  function writeStore(key, store) {
    try { localStorage.setItem(key, JSON.stringify(store)); return true; } catch (e) { return false; }
  }
  const STORES = { live: loadStore(STORE_KEY), drill: loadStore(DRILL_STORE_KEY) };

  /* 舊版只有一份紀錄：把歷史事件（非 live_）的紀錄搬到演練那一份，之後兩邊不再混在一起 */
  (() => {
    const moved = Object.keys(STORES.live).filter(k => !k.startsWith('live_'));
    if (!moved.length) return;
    moved.forEach(k => { STORES.drill[k] = STORES.live[k]; delete STORES.live[k]; });
    writeStore(DRILL_STORE_KEY, STORES.drill);
    writeStore(STORE_KEY, STORES.live);
  })();

  const scen = () => SCENARIOS[st.scenario];
  const snap = () => scen().snapshots[st.snap];
  const isDrill = () => scen().kind !== 'live';
  const store = () => (isDrill() ? STORES.drill : STORES.live);
  const saveStore = () => writeStore(isDrill() ? DRILL_STORE_KEY : STORE_KEY, store());
  const storeKey = id => `${scen().id}:${id}`;
  const lastSnap = () => scen().snapshots.length - 1;

  /* ── 座標：WGS84 經緯度 → TWD97 TM2（EPSG:3826，GRS80、中央經線 121°、尺度 0.9999、東偏 250 km）──
     現場人員與各單位慣用 TWD97，事件卡與任務單兩種都給 */
  function twd97(lon, lat) {
    const a = 6378137, f = 1 / 298.257222101, k0 = 0.9999, lon0 = 121 * Math.PI / 180, E0 = 250000;
    const e2 = f * (2 - f), ep2 = e2 / (1 - e2), e4 = e2 * e2, e6 = e4 * e2;
    const p = lat * Math.PI / 180, l = lon * Math.PI / 180;
    const sp = Math.sin(p), cp = Math.cos(p), tp = Math.tan(p);
    const N = a / Math.sqrt(1 - e2 * sp * sp), T = tp * tp, C = ep2 * cp * cp, A = (l - lon0) * cp;
    const M = a * ((1 - e2 / 4 - 3 * e4 / 64 - 5 * e6 / 256) * p - (3 * e2 / 8 + 3 * e4 / 32 + 45 * e6 / 1024) * Math.sin(2 * p)
      + (15 * e4 / 256 + 45 * e6 / 1024) * Math.sin(4 * p) - (35 * e6 / 3072) * Math.sin(6 * p));
    const x = E0 + k0 * N * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * A ** 5 / 120);
    const y = k0 * (M + N * tp * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A ** 4 / 24
      + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * A ** 6 / 720));
    return [Math.round(x), Math.round(y)];
  }
  const coordText = ([lon, lat]) => {
    const [x, y] = twd97(lon, lat);
    return `${lat.toFixed(5)}°N ${lon.toFixed(5)}°E（TWD97 ${x}, ${y}）`;
  };
  const mapLink = ([lon, lat]) => `https://www.google.com/maps?q=${lat.toFixed(5)},${lon.toFixed(5)}`;

  /* ── 時間 ──
     「現在」：即時監看用真的現在；演練模式用回放的時點（看當時的值班人員會看到什麼） */
  const DAY = 86400000;
  const nowFor = () => (isDrill() ? new Date(snap().asOf).getTime() : Date.now());
  function agoText(ms) {
    const d = Math.floor(ms / DAY);
    if (d >= 1) return `${d} 天前`;
    const h = Math.floor(ms / 3600000);
    return h >= 1 ? `${h} 小時前` : '剛剛';
  }
  /* 「尚未查證 · 已 3 天」；事件這一期才剛出現（不到 1 小時）時只寫「尚未查證」 */
  const waitingText = ms => (ms < 3600000 ? '尚未查證' : `尚未查證 · 已 ${agoText(ms).replace('前', '')}`);

  /* 「10/23」這類只到日的標籤：年份取自參考時間，跨年時往後推一年 */
  function labelDate(label, ref) {
    const m = String(label || '').match(/(\d{1,2})\/(\d{1,2})/);
    if (!m) return null;
    const r = new Date(ref);
    const d = new Date(r.getFullYear(), +m[1] - 1, +m[2]);
    if (d - r < -180 * DAY) d.setFullYear(d.getFullYear() + 1);
    return d;
  }
  /* 事件第一次出現的時點（asOf） */
  function firstSeenAt(sc, id) {
    const s = sc.snapshots.find(x => x.events.some(e => e.id === id));
    return s ? new Date(s.asOf).getTime() : null;
  }

  /* 查證紀錄只在記錄當下及之後的時點生效，往前回放時看不到 */
  function verification(id) {
    const rec = store()[storeKey(id)];
    return rec && st.snap >= rec.snapIndex ? rec : null;
  }

  /* 把人工查證疊到系統研判上：系統原本的判斷保留，只調整顯示 */
  function withHuman(ev) {
    const rec = verification(ev.id);
    if (!rec) return { ...ev, human: null };
    const out = { ...ev, human: rec, gaps: ev.gaps.filter(g => g.kind !== 'field') };
    if (rec.verdict === 'confirm') {
      out.confidence = '高';
      out.confidenceReasons = [`人工查證確認（${rec.who || '未署名'}）`, ...ev.confidenceReasons.slice(0, 1)];
    } else if (rec.verdict === 'exclude') {
      out.confidenceReasons = [`人工查證排除（${rec.who || '未署名'}）`, ...ev.confidenceReasons];
    }
    return out;
  }

  function events() {
    return snap().events.map(withHuman);
  }

  /* ── 回放時點 ── */

  function renderRail() {
    const rail = $('#snapRail');
    const latest = !isDrill() ? lastSnap() : -1;
    rail.innerHTML = scen().snapshots.map((s, i) => `
      <button class="snap ${i === st.snap ? 'is-on' : ''}" type="button" role="tab"
              aria-selected="${i === st.snap}" data-i="${i}">
        <span class="snap-time">${esc(s.label)}${i === latest ? '<span class="snap-latest">最新</span>' : ''}</span>
        <span class="snap-what">${esc(s.what)}</span>
        <span class="snap-since">${esc(s.since)}${latest >= 0 ? ` · ${agoText(Date.now() - new Date(s.asOf))}` : ''}</span>
        <span class="snap-counts" aria-label="高 ${s.counts.high}、中 ${s.counts.medium}、低 ${s.counts.low}">
          <i class="c-high">${s.counts.high}</i><i class="c-medium">${s.counts.medium}</i><i class="c-low">${s.counts.low}</i>
        </span>
      </button>`).join('');
    $$('.snap', rail).forEach(b => b.addEventListener('click', () => setSnap(+b.dataset.i)));

    // 即時監看時看的不是最新一期：提醒，避免把舊結果當成現況
    const old = $('#oldSnap');
    if (!isDrill() && st.snap !== lastSnap()) {
      old.hidden = false;
      old.innerHTML = `<span>正在看 <b>${esc(snap().label)}</b> 的結果，不是最新一期</span>
        <button class="btn" type="button">回到最新（${esc(scen().snapshots[lastSnap()].label)}）</button>`;
      $('button', old).addEventListener('click', () => setSnap(lastSnap()));
    } else {
      old.hidden = true;
      old.innerHTML = '';
    }
  }

  function setSnap(i) {
    const n = scen().snapshots.length;
    st.snap = Math.max(0, Math.min(n - 1, i));
    const ids = snap().events.map(e => e.id);
    if (!ids.includes(st.eventId)) st.eventId = sortedEvents()[0] ? sortedEvents()[0].id : null;
    render();
  }

  /* ── 佇列 ── */

  function sortedEvents() {
    const order = { high: 0, medium: 1, low: 2 };
    return events().sort((a, b) => {
      const ax = a.human && a.human.verdict === 'exclude' ? 1 : 0;
      const bx = b.human && b.human.verdict === 'exclude' ? 1 : 0;
      return ax - bx || order[a.priority] - order[b.priority] || b.areaHectare - a.areaHectare;
    });
  }

  function queueItem(ev) {
    const tags = [];
    if (ev.isNew) tags.push('<span class="q-tag is-new">本期新增</span>');
    if (ev.human) tags.push(`<span class="q-tag is-human">${VERDICTS[ev.human.verdict].tag}</span>`);
    // 高優先還沒人查證：標出已經等了多久
    if (ev.priority === 'high' && !ev.human) {
      const t0 = firstSeenAt(scen(), ev.id);
      if (t0 != null) tags.push(`<span class="q-tag is-waiting" title="首次出現後還沒有人工查證紀錄">${waitingText(nowFor() - t0)}</span>`);
    }
    (ev.hindsight || []).forEach(h => tags.push(
      `<span class="q-tag is-hindsight v-${esc(h.verdict)}">${h.verdict === 'false_positive' ? '事後：誤報' : '事後查證'}</span>`));
    const opt = (ev.optical || []).find(r => r.verdict !== 'cloud');
    if (opt) tags.push(`<span class="q-tag is-optical v-${esc(opt.verdict)}" title="光學影像自動判讀，只供參考">光學 ${mdText(opt.time)}：${OPTICAL_TEXT[opt.verdict]}</span>`);
    const dist = ev.distanceFromReferenceM != null ? ` · 距清冊壩址 ${ev.distanceFromReferenceM.toLocaleString()} m` : '';
    return `
      <button class="q-item p-${ev.priority} ${ev.id === st.eventId ? 'is-active' : ''}" type="button" data-id="${ev.id}">
        <span class="q-id">${ev.id}</span>
        <span class="q-main">
          <span class="q-action">${ev.action}<span class="q-pers">${ev.persistenceText}</span></span>
          <span class="q-meta">規模 ${ev.scale} · ${ev.areaHectare} 公頃${dist}</span>
        </span>
        <span class="q-tags">${tags.join('')}</span>
      </button>`;
  }

  function renderQueue() {
    const s = snap();
    const evs = sortedEvents();
    $('#queueTitle').textContent = `${s.label} 的事件佇列`;
    // 即時監看：下一期還有幾天；已經過了卻沒有新一期，代表資料沒更新
    let next = '';
    const nd = !isDrill() && st.snap === lastSnap() ? labelDate(s.nextPass, s.asOf) : null;
    if (nd) {
      const days = Math.ceil((nd - Date.now()) / DAY);
      next = days > 0 ? `（${days} 天後）` : days === 0 ? '（今天）' : `（應已過境 ${-days} 天，尚無資料）`;
    }
    $('#queueNote').textContent = `${evs.length} 件 · 下一期 ${s.nextPass}${s.nextPassOrbit ? ` ${s.nextPassOrbit}` : ''}${next}`;
    renderOpticalNote();

    const excluded = evs.filter(e => e.human && e.human.verdict === 'exclude');
    const active = evs.filter(e => !excluded.includes(e));
    let html = PRIORITY_GROUPS.map(g => {
      const list = active.filter(e => e.priority === g.key);
      if (!list.length) return '';
      return `
        <div class="q-group g-${g.key}">
          <div class="q-group-head"><span class="has-tip" title="${esc(PRIORITY_TIP[g.key])}">${g.title}</span><b>${list.length}</b></div>
          ${list.map(queueItem).join('')}
        </div>`;
    }).join('');
    if (excluded.length) {
      html += `
        <div class="q-group g-excluded">
          <div class="q-group-head"><span>已人工排除</span><b>${excluded.length}</b></div>
          ${excluded.map(queueItem).join('')}
        </div>`;
    }
    $('#queue').innerHTML = html || '<p class="narr-empty q-empty">這個時點沒有偵測到疑似事件。</p>';
    $$('#queue .q-item').forEach(b => b.addEventListener('click', () => selectEvent(b.dataset.id)));
  }

  /* 光學影像（pipeline/daily/optical.py）：最近幾景的雲量、下一次 Sentinel-2／Landsat 預計過境。
     只有即時監看的最新一期顯示；回看前幾期時這是現在的資料，不是當時的，所以不顯示。 */
  const OPTICAL_TEXT = { water: '看得到水', partial: '少量水', no_water: '看不到水', cloud: '雲遮' };
  // 「2026-10-29…」→「10/29」（直接取字串，不受瀏覽器時區影響）
  const mdText = s => { const m = String(s).match(/^\d{4}-(\d{2})-(\d{2})/); return m ? `${+m[1]}/${+m[2]}` : '—'; };
  function renderOpticalNote() {
    const box = $('#opticalNote');
    const o = scen().optical;
    box.hidden = isDrill() || st.snap !== lastSnap() || !o;
    if (box.hidden) return;
    const recent = o.scenes.slice(0, 3).map(r =>
      `${mdText(r.time)} ${esc(r.sensor)} ${r.clearPct != null ? `晴空 ${r.clearPct}%` : '雲量資料未到'}`).join('、');
    box.innerHTML = `<b>光學影像</b> ${helpQ('optical', '光學影像')} ${o.scenes.length ? `最近 ${recent}` : '最近沒有影像'}` +
      '<span class="op-est"> · 之後的過境見上方「接下來的衛星過境」</span>';
  }

  /* 接下來的衛星過境（pipeline/events/build.py upcoming_passes）：提醒值班人員什麼時候會有新影像。
     日期是推估；已過但還沒進來的標「待更新」（衛星可能沒拍，或影像還沒上架、下次自動更新才會分析）。 */
  const UPCOMING_KIND = {
    sar: { tag: '雷達', note: '不受雲影響，通常隔天可分析' },
    s2: { tag: '光學', note: '有雲就看不到，通常隔天上架' },
    landsat: { tag: '光學', note: '有雲就看不到，上架約晚 1～2 週' },
  };
  const WEEKDAY = '日一二三四五六';
  function renderUpcoming() {
    const box = $('#upcoming');
    const list = scen().upcoming || [];
    box.hidden = isDrill() || !list.length;
    if (box.hidden) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const items = list.map(p => {
      const [y, m, d] = p.date.split('-').map(Number);
      const day = new Date(y, m - 1, d);
      const n = Math.round((day - today) / DAY);
      const k = p.kind === 'sar' ? 'sar' : p.sensor.startsWith('Landsat') ? 'landsat' : 's2';
      const when = n > 0 ? `${n} 天後` : n === 0 ? '今天' : '待更新';
      return `
        <li class="up-${k}${n < 0 ? ' is-past' : ''}${n >= 0 && n <= 2 ? ' is-soon' : ''}" title="${esc(UPCOMING_KIND[k].note)}">
          <span class="up-date">${m}/${d}（${WEEKDAY[day.getDay()]}）${p.time ? ` ${esc(p.time)}` : ''}</span>
          <span class="up-sat">${esc(p.sensor)}${p.orbit ? ` · ${esc(p.orbit)}` : ''}</span>
          <span class="up-kind">${UPCOMING_KIND[k].tag} · ${when}</span>
        </li>`;
    }).join('');
    box.innerHTML = `
      <div class="rail-head"><span class="label">接下來的衛星過境 · 推估</span>${helpQ('upcoming', '接下來的衛星過境')}</div>
      <ul class="up-list">${items}</ul>
      <p class="up-note">雷達（Sentinel-1）穿得過雲，是主要的新資料；光學（Sentinel-2、Landsat）要沒雲才看得到地面。
        日期依各衛星重訪週期推估，衛星偶爾沒拍；影像上架後，下一次自動更新（每兩天）才會分析。</p>`;
  }

  /* ── 窗格小地圖 ── */

  function renderMinimap() {
    const svg = $('#minimap');
    const sc = scen();
    const W = 400, half = sc.windowKm / 2;
    const pxPerKm = W / sc.windowKm;
    const [lon0, lat0] = sc.center;
    const kx = 111.32 * Math.cos(lat0 * Math.PI / 180), ky = 110.54;
    const xy = ([lon, lat]) => [W / 2 + (lon - lon0) * kx * pxPerKm, W / 2 - (lat - lat0) * ky * pxPerKm];
    const pts = poly => poly.map(p => xy(p).map(v => v.toFixed(1)).join(',')).join(' ');

    // 事件前光學底圖：範圍與小地圖相同（pipeline/daily/basemap.py），經緯度線性對應，直接拉滿
    // 航照圖層（scripts/aerial_dashboard.py）範圍相同、沒拍到處透明；只用這個時點已可取得的最新一張
    const asOf = new Date(snap().asOf);
    const air = (sc.aerial || []).filter(a => new Date(a.available) <= asOf).pop();
    const layer = (cls, file) =>
      `<image class="${cls}" href="${esc(file)}" x="0" y="0" width="${W}" height="${W}" preserveAspectRatio="none"/>`;
    let g = (sc.basemap && showBase ? layer('mm-base', sc.basemap.file) : '') +
            (air && showAerial ? layer('mm-base', air.file) : '');
    if (g) g += `<rect class="mm-dim" x="0" y="0" width="${W}" height="${W}"/>`;
    for (let k = 1; k < sc.windowKm; k++) {
      const v = k * pxPerKm;
      g += `<line class="mm-grid" x1="${v}" y1="0" x2="${v}" y2="${W}"/><line class="mm-grid" x1="0" y1="${v}" x2="${W}" y2="${v}"/>`;
    }
    if (sc.reference) {
      const [rx, ry] = xy(sc.reference.lonLat);
      g += `<g class="mm-ref"><path d="M${rx - 6},${ry - 6}L${rx + 6},${ry + 6}M${rx + 6},${ry - 6}L${rx - 6},${ry + 6}"/>
            <text x="${rx + 12}" y="${ry - 2}">清冊壩址</text><text x="${rx + 12}" y="${ry + 11}">（事後登載）</text></g>`;
    }
    const evs = events();
    // 選取中的畫在最上層
    evs.sort((a, b) => (a.id === st.eventId) - (b.id === st.eventId));
    evs.forEach(ev => {
      const sel = ev.id === st.eventId ? ' is-sel' : '';
      const [cx, cy] = xy(ev.lonLat);
      const shape = ev.polygonLonLat.length >= 3
        ? `<polygon points="${pts(ev.polygonLonLat)}"/>` : '';
      g += `<g class="mm-ev p-${ev.priority}${sel}" data-id="${ev.id}" tabindex="0" role="button" aria-label="${ev.id} ${ev.action}">
              ${shape}<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4"/>
              <text x="${(cx + 8).toFixed(1)}" y="${(cy + 4).toFixed(1)}">${ev.id}</text></g>`;
    });
    g += `<g class="mm-scale"><line x1="14" y1="${W - 16}" x2="${14 + pxPerKm}" y2="${W - 16}"/>
          <text x="14" y="${W - 22}">1 km</text></g>
          <text class="mm-north" x="${W - 16}" y="20" text-anchor="middle">N↑</text>`;
    svg.setAttribute('viewBox', `0 0 ${W} ${W}`);
    svg.innerHTML = g;
    $$('.mm-ev', svg).forEach(el => {
      el.addEventListener('click', () => selectEvent(el.dataset.id));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectEvent(el.dataset.id); } });
    });
    const note = $('#minimapNote');
    note.innerHTML = `${sc.windowKm} km 分析窗格 · 色塊為 SAR 新增水體（陡坡遮罩會擋掉部分湖面）· ±${half} km ${helpQ('minimap', '小地圖')}` +
      (sc.basemap ? `<br><label class="mm-toggle"><input type="checkbox" ${showBase ? 'checked' : ''}> 底圖</label>
        <span title="${esc(sc.basemap.source)}">事件前光學影像（${esc(sc.basemap.before)} 以前）· 回放當下可取得，不含事件後的畫面</span>` : '') +
      (air ? `<br><label class="mm-toggle"><input type="checkbox" data-layer="aerial" ${showAerial ? 'checked' : ''}> 航照</label>
        <span>${esc(air.shotDate)} 拍攝 · ${esc(air.source)}</span>` : '');
    $$('.mm-toggle input', note).forEach(tg => tg.addEventListener('change', () => {
      if (tg.dataset.layer === 'aerial') showAerial = tg.checked; else showBase = tg.checked;
      renderMinimap();
    }));
  }

  /* ── 事件卡 ── */

  function readCell(label, value, sub, cls, tip) {
    const v = tip ? `<span class="has-tip" title="${esc(tip)}">${value}</span>` : value;
    return `<div class="cell"><span class="label">${label}</span><div class="num ${cls || ''}">${v}</div>${sub ? `<div class="sub">${sub}</div>` : ''}</div>`;
  }

  function verifyForm(ev) {
    const rec = store()[storeKey(ev.id)];
    const live = verification(ev.id);
    const hiddenNote = rec && !live
      ? `<p class="vf-note">此事件在 ${esc(scen().snapshots[rec.snapIndex].label)} 有查證紀錄，這個時點還看不到。</p>` : '';
    const saved = live ? `
      <div class="vf-saved">
        <b>${VERDICTS[live.verdict].text}</b>｜${esc(live.who || '未署名')}｜${esc(new Date(live.at).toLocaleString('zh-TW', { hour12: false }))}
        ${live.note ? `<p>${esc(live.note)}</p>` : ''}
        <span class="vf-at">記錄於回放時點 ${esc(scen().snapshots[live.snapIndex].label)}</span>
      </div>` : '';
    return `
      <div class="verify">
        <span class="at">人工查證 ${helpQ('verify', '人工查證、紀錄存在哪裡')}</span>
        ${saved}${hiddenNote}
        <form class="vf" id="verifyForm">
          <div class="vf-verdicts" role="radiogroup" aria-label="查證結果">
            ${Object.entries(VERDICTS).map(([k, v]) => `
              <label><input type="radio" name="verdict" value="${k}" ${live && live.verdict === k ? 'checked' : ''}>${v.text}</label>`).join('')}
          </div>
          <div class="vf-row">
            <input class="vf-input" name="who" placeholder="查證人員" value="${esc(live ? live.who : '')}" autocomplete="off">
            <input class="vf-input vf-wide" name="note" placeholder="補充說明（例如：UAV 已確認壩體、光學影像可見湖面）" value="${esc(live ? live.note : '')}" autocomplete="off">
          </div>
          <div class="vf-actions">
            <button class="btn" type="submit">儲存查證紀錄</button>
            ${live ? '<button class="btn ghost" type="button" id="verifyClear">清除</button>' : ''}
            <button class="btn ghost" type="button" id="verifyExport">匯出全部查證紀錄</button>
          </div>
          <p class="vf-note">紀錄只存在這台電腦的瀏覽器。系統的研判不會被覆寫，只在旁邊註記人工結果。${
            isDrill() ? '演練模式的紀錄與即時監看分開存，匯出時也分開。' : ''}</p>
        </form>
      </div>`;
  }

  function taskSheet(ev) {
    const s = snap();
    return [
      `【${scen().name}】${ev.id}｜${ev.action}｜${ev.priorityText}`,
      `研判時點：${s.label}（${s.what}）`,
      `位置：${coordText(ev.lonLat)}`,
      `地圖：${mapLink(ev.lonLat)}`,
      `摘要：${ev.summary}`,
      '建議任務：',
      ...ev.tasks.map((t, i) => `  ${i + 1}. ${t.label}——${t.reason}`),
      '證據缺口：',
      ...ev.gaps.map(g => `  - ${g.text}`),
    ].join('\n');
  }

  /* 事後查證：回放結束後才做的查證（例如負案例的光學影像查證）。
     只是註記，回放當下系統不知道，所以不改動上面的研判結果。 */
  function hindsightBox(ev) {
    if (!ev.hindsight || !ev.hindsight.length) return '';
    return ev.hindsight.map(h => `
      <div class="ev-hindsight v-${esc(h.verdict)}">
        <span class="at">事後查證 · 回放當下系統不知道，不影響上方研判</span>
        <b>${esc(h.title)}</b>
        <p>${esc(h.text)}</p>
        <p class="hs-links">${(h.images || []).map(im =>
          `<a href="../../${esc(im.path)}" target="_blank" rel="noopener">${esc(im.label)}</a>`).join('')}${
          h.method ? `<span>方法：${esc(h.method)}</span>` : ''}</p>
      </div>`).join('');
  }

  /* 光學影像自動判讀（監看窗格）：每景事件範圍內的晴空比例與判為水的比例。只供參考，不改動研判。 */
  function opticalBox(ev) {
    const rs = (ev.optical || []).slice(0, 5);
    if (!rs.length) return '';
    const rows = rs.map(r => `
      <li class="v-${esc(r.verdict)}"><span class="op-when">${mdText(r.time)} ${esc(r.sensor)}</span><b>${OPTICAL_TEXT[r.verdict]}</b>
        <span>晴空 ${r.clearPct}%${r.waterPct != null ? `，其中 ${r.waterPct}% 判為水` : ''}</span></li>`).join('');
    return `
      <div class="ev-optical">
        <span class="at">光學影像自動判讀 · 只供參考，不影響上方研判 ${helpQ('optical', '光學影像')}</span>
        <ul>${rows}</ul>
        <p>範圍是 SAR 最近一次偵測到的水體。山區陰影、薄雲、濕泥都可能誤判；要當作證據，請調閱影像確認後記在人工查證。</p>
      </div>`;
  }

  function renderCard() {
    const box = $('#evCard');
    const ev = events().find(e => e.id === st.eventId);
    if (!ev) { box.innerHTML = '<p class="narr-empty ev-empty">選一個事件查看證據與建議任務。</p>'; return; }

    const sc = scen();
    const where = [
      coordText(ev.lonLat),
      ev.lakeFloorM != null ? `湖底高程 ${ev.lakeFloorM} m` : null,
      ev.distanceFromReferenceM != null ? `距清冊壩址 ${ev.distanceFromReferenceM.toLocaleString()} m` : null,
    ].filter(Boolean).join(' · ');

    const badges = [
      `<span class="badge ev-pri p-${ev.priority} has-tip" title="${esc(PRIORITY_TIP[ev.priority])}">${ev.priorityText}</span>`,
      `<span class="badge badge-status">${ev.persistenceText}</span>`,
      `<span class="badge badge-status">SAR 證據強度 ${ev.grade}</span>`,
      ev.isNew ? '<span class="badge badge-status">本期新增</span>' : '',
      ev.human ? `<span class="badge ev-human">${VERDICTS[ev.human.verdict].tag}</span>` : '',
    ].join('');

    // 沒有網址的出處（例如航遙分署直接提供的航照）直接寫出來源，不做成連結
    const src = e => !e.source ? ''
      : e.url ? ` <a class="ev-src" href="${esc(e.url)}" target="_blank" rel="noopener" title="${esc(e.source)}">來源</a>`
      : ` <span class="ev-src">（${esc(e.source)}）</span>`;
    const evidence = ev.evidence.map(e => `
      <li class="ev-${e.status}"><span class="mk" aria-hidden="true">${EVIDENCE_MARK[e.status]}</span><span>${esc(e.text)}${src(e)}</span></li>`).join('');
    const gaps = ev.gaps.map(g => `<li><span class="mk" aria-hidden="true">?</span>${esc(g.text)}</li>`).join('');

    const dets = ev.detections.map(d => {
      const re = d.recheck === 'pending'
        ? (d.recheckTime ? `待複核（${d.recheckTime}）` : '無複核期')
        : `${d.recheck === 'persistent' ? '持續' : '未持續'}（IoU ${d.iou != null ? d.iou.toFixed(2) : '—'}）`;
      const img = d.evidenceImage ? `<a href="../../${d.evidenceImage}" target="_blank" rel="noopener">證據圖</a>` : '—';
      return `<tr><td>${d.passTime}</td><td>${d.areaHectare}</td><td class="re-${d.recheck}">${re}</td><td>${img}</td></tr>`;
    }).join('');

    const support = ev.evidence.filter(e => e.status === 'support').length;
    const against = ev.evidence.filter(e => e.status === 'against').length;
    const evidenceCount = `${support} 項支持` + (against ? `、${against} 項反對` : '') +
      (ev.gaps.length ? `，缺 ${ev.gaps.length} 項` : '');

    // 直接顯示：判斷要用的（建議行動、警示、建議任務、人工查證）；佐證細節收在下方，點了才展開
    box.innerHTML = `
      <div class="detail-head">
        <div class="badges">${badges}</div>
        <h1>${ev.id} · 疑似堰塞湖事件</h1>
        <span class="where">${where}</span>
        <div class="ev-coord-actions">
          <button class="btn ghost" type="button" id="coordCopy">複製座標</button>
          <a class="btn ghost" href="${mapLink(ev.lonLat)}" target="_blank" rel="noopener">在地圖上開啟</a>
        </div>
      </div>

      ${hindsightBox(ev)}

      <div class="decision-summary ev-readout">
        ${readCell('建議行動', ev.action, ev.priorityText, `t-${ev.priority}`, PRIORITY_TIP[ev.priority])}
        ${readCell('規模（相對）', ev.scale, `SAR ${ev.areaHectare} 公頃，偏低，視為下限`)}
        ${readCell('研判信心', ev.confidence, ev.confidenceReasons[0], '', CONFIDENCE_TIP[ev.confidence])}
        ${readCell('首次出現', ev.firstSeen, `最近一次 ${ev.lastSeen}`)}
      </div>

      ${ev.conflicts.length ? `<div class="ev-conflict"><span class="at">證據衝突</span>${ev.conflicts.map(c => `<p>${esc(c)}</p>`).join('')}</div>` : ''}
      ${(ev.cautions || []).length ? `<div class="ev-caution"><span class="at">提醒</span>${ev.cautions.map(c => `<p>${esc(c)}</p>`).join('')}</div>` : ''}
      ${opticalBox(ev)}

      <div class="action-card">
        <span class="at">建議任務 ${helpQ('card-top', '事件卡各欄位')}</span>
        <ol class="ev-tasks">${ev.tasks.map(t => `<li><b>${esc(t.label)}</b><span>${esc(t.reason)}</span></li>`).join('')}</ol>
        <button class="btn ghost ev-copy" type="button" id="taskCopy">複製任務單</button>
      </div>

      ${verifyForm(ev)}

      <div class="ev-folds">
        <div class="ev-folds-head"><span class="at">佐證細節</span>${helpQ('card-folds', '研判摘要、證據、逐期紀錄、命中規則')}</div>
        <details class="ev-fold">
          <summary>研判摘要</summary>
          <div class="ev-summary p-${ev.priority}">${esc(ev.summary)}</div>
        </details>
        <details class="ev-fold">
          <summary>證據（${evidenceCount}）</summary>
          <div class="ev-cols">
            <div><span class="at">目前證據</span><ul class="ev-list">${evidence}</ul></div>
            <div><span class="at">證據缺口</span><ul class="ev-list ev-gaps">${gaps}</ul></div>
          </div>
        </details>
        <details class="ev-fold">
          <summary>逐期偵測紀錄（${ev.detections.length} 期）</summary>
          <table class="ev-dets">
            <thead><tr><th>影像時間</th><th>面積（公頃）</th><th>複核</th><th></th></tr></thead>
            <tbody>${dets}</tbody>
          </table>
          <div class="limitation-note">研判信心：${ev.confidenceReasons.map(esc).join('；')}</div>
        </details>
        <details class="ev-fold">
          <summary>命中規則（${ev.rulesFired.length} 條）</summary>
          <ul class="ev-rules">${ev.rulesFired.map(r => `<li>${r}</li>`).join('')}</ul>
        </details>
        ${sc.reference ? `<button class="btn ghost ev-inv" type="button" id="toInventory">對照清冊：${esc(sc.reference.name)}${isDrill() ? '（事後登載）' : ''}</button>` : ''}
      </div>`;

    bindCard(ev);
  }

  function bindCard(ev) {
    const form = $('#verifyForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const verdict = fd.get('verdict');
      if (!verdict) { toast('請先選擇查證結果'); return; }
      store()[storeKey(ev.id)] = {
        verdict, who: (fd.get('who') || '').trim(), note: (fd.get('note') || '').trim(),
        at: new Date().toISOString(), snapIndex: st.snap, snapshot: snap().label,
        systemPriority: ev.priority, systemAction: ev.action,
      };
      toast(saveStore() ? `已儲存 ${ev.id} 的查證紀錄${isDrill() ? '（演練）' : ''}` : '瀏覽器不允許儲存，紀錄只保留到關閉頁面');
      render();
    });
    const clear = $('#verifyClear');
    if (clear) clear.addEventListener('click', () => {
      delete store()[storeKey(ev.id)];
      saveStore();
      render();
    });
    $('#verifyExport').addEventListener('click', exportRecords);
    const copy = (text, msg) => {
      const done = () => toast(msg);
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
      else fallbackCopy(text, done);
    };
    $('#taskCopy').addEventListener('click', () => copy(taskSheet(ev), `已複製 ${ev.id} 任務單`));
    $('#coordCopy').addEventListener('click', () => copy(coordText(ev.lonLat), `已複製 ${ev.id} 座標`));
    const inv = $('#toInventory');
    if (inv) inv.addEventListener('click', () => {
      // 先切到清冊分頁；select() 在 app.js，會把頁面捲回頂端，所以捲動放在它之後
      if (typeof Views !== 'undefined') Views.show('inventory');
      if (typeof select === 'function') select(scen().reference.lakeId);
      setTimeout(() => $('.board').scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    });
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('無法複製，請手動選取'); }
    ta.remove();
  }

  function exportRecords() {
    const records = store();
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = isDrill() ? 'verification-records-drill.json' : 'verification-records.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    toast(`已匯出 ${Object.keys(records).length} 筆${isDrill() ? '演練' : ''}查證紀錄`);
  }

  function toast(msg) {
    if (typeof showToast === 'function') showToast(msg);
  }

  /* ── 組合 ── */

  function selectEvent(id) {
    st.eventId = id;
    renderTodo();
    renderQueue();
    renderMinimap();
    renderCard();
  }

  function setScenario(i) {
    st.scenario = i;
    if (!isDrill()) st.lastLive = i;
    st.snap = defaultSnap(scen());
    st.eventId = sortedEvents()[0] ? sortedEvents()[0].id : null;
    render();
  }

  const indexOfKind = kind => SCENARIOS.findIndex(s => s.kind === kind);

  /* 即時監看的資料新舊：最新一期距今幾天；超過 STALE_DAYS（兩軌合計約每 6 天一期的兩倍）視為過舊。
     每日更新的狀態檔若記到更新的影像、但情境還停在舊一期，代表有影像沒分析 */
  const STALE_DAYS = 12;
  function freshness(sc) {
    const last = sc.snapshots[sc.snapshots.length - 1];
    const t = new Date(last.asOf);
    const age = Math.floor((Date.now() - t) / 86400000);
    const w = ((window.DAILY_STATUS || {}).windows || []).find(x => x.id === sc.id);
    const day = t.toISOString().slice(0, 10).replace(/-/g, '');
    const newer = w && w.lastScene && w.lastScene > day ? `${w.lastScene.slice(4, 6)}/${w.lastScene.slice(6, 8)}` : null;
    return { age, stale: age > STALE_DAYS, newer, label: last.label };
  }

  /* 給頂端狀態列：所有監看中窗格裡最舊的那個 */
  function liveFreshness() {
    const fs = liveIndices().filter(i => SCENARIOS[i].active !== false).map(i => freshness(SCENARIOS[i]));
    if (!fs.length) return null;
    return fs.reduce((a, b) => (b.age > a.age ? b : a));
  }

  /* ── 待處理：所有監看窗格最新一期的高／中優先事件，一張清單看完 ── */
  function renderTodo() {
    const box = $('#todo');
    if (!box) return;
    if (isDrill() || !liveIndices().length) { box.hidden = true; return; }
    const order = { high: 0, medium: 1 };
    const rows = [];
    let low = 0;
    liveIndices().forEach(i => {
      const sc = SCENARIOS[i], k = sc.snapshots.length - 1, sn = sc.snapshots[k];
      sn.events.forEach(ev => {
        const rec = STORES.live[`${sc.id}:${ev.id}`];
        const human = rec && k >= rec.snapIndex ? rec : null;
        if (human && human.verdict === 'exclude') return;
        if (!(ev.priority in order)) { low++; return; }
        rows.push({ i, sc, ev, human, t0: firstSeenAt(sc, ev.id) });
      });
    });
    rows.sort((a, b) => order[a.ev.priority] - order[b.ev.priority] || b.ev.areaHectare - a.ev.areaHectare);
    // 清單依據的是哪幾期：各窗格最新一期的日期；每日更新已在監看、但還沒有任何分析結果的窗格另外列出，不要默默漏掉
    const dates = [...new Set(liveIndices().map(i => SCENARIOS[i].snapshots[SCENARIOS[i].snapshots.length - 1].label.split(' ')[0]))];
    const liveIds = new Set(liveIndices().map(i => SCENARIOS[i].id));
    const pending = ((window.DAILY_STATUS || {}).windows || []).filter(w => !liveIds.has(w.id));
    const head = `<div class="todo-head"><span class="label">待處理 · 各監看窗格最新一期（${dates.map(esc).join('、')}）</span>${helpQ('todo', '待處理清單')}
      <span class="todo-count">${rows.length ? `${rows.length} 件` : ''}${low ? `${rows.length ? '，' : ''}另有 ${low} 件暫時觀察` : ''}</span></div>` +
      (pending.length ? `<p class="todo-pending">另有 ${pending.length} 個監看窗格還沒有任何分析結果，不在清單裡：${
        pending.map(w => `${esc(w.name.replace(/\s*\d+ 小時雨量.*$/, ''))}（${esc(w.activatedAt.slice(5, 10).replace('-', '/'))} 加入）`).join('、')}</p>` : '');
    const body = rows.length ? `<div class="todo-list">${rows.map(r => {
      const state = r.human ? `<span class="q-tag is-human">${VERDICTS[r.human.verdict].tag}</span>`
        : r.t0 != null ? `<span class="q-tag ${r.ev.priority === 'high' ? 'is-waiting' : ''}">${waitingText(Date.now() - r.t0)}</span>` : '';
      return `
        <button class="todo-item p-${r.ev.priority} ${r.i === st.scenario && r.ev.id === st.eventId ? 'is-active' : ''}" type="button"
                data-scen="${esc(r.sc.id)}" data-ev="${esc(r.ev.id)}">
          <span class="lg-key p-${r.ev.priority}">${PRIORITY_GROUPS.find(g => g.key === r.ev.priority) ? r.ev.priorityText.slice(0, 1) : ''}</span>
          <span class="todo-main"><b>${esc(r.sc.name)} · ${esc(r.ev.id)}</b>
            <span>${esc(r.ev.action)} · ${esc(r.ev.persistenceText)} · 規模 ${esc(r.ev.scale)}</span></span>
          ${state}
        </button>`;
    }).join('')}</div>`
      : '<p class="todo-empty">所有監看窗格的最新一期都沒有需要處理的事件。</p>';
    box.innerHTML = head + body;
    box.hidden = false;
    $$('.todo-item', box).forEach(b => b.addEventListener('click', () => openScenario(b.dataset.scen, null, b.dataset.ev)));
  }
  /* 即時監看：監看中的窗格排前面，同狀態維持情境檔順序 */
  const liveIndices = () => SCENARIOS.map((s, i) => ({ s, i })).filter(x => x.s.kind === 'live')
    .sort((a, b) => (b.s.active !== false) - (a.s.active !== false) || a.i - b.i).map(x => x.i);

  /* 即時監看：每個監看窗格一顆按鈕，數字是最新一期的高／中優先事件數。
     演練模式：正／負案例用按鈕；全清冊回放（kind=replay）筆數多，收在下拉選單；另有「系統歷史成績」 */
  function renderScenarioTabs() {
    const box = $('#scenTabs');
    const btn = (i, text) => `
      <button class="filter ${i === st.scenario ? 'is-on' : ''}" type="button" data-i="${i}">${text}</button>`;
    let html;
    if (!isDrill()) {
      const tabs = liveIndices().map(i => {
        const s = SCENARIOS[i], c = s.snapshots[s.snapshots.length - 1].counts;
        const n = (c.high ? `<i class="c-high">${c.high}</i>` : '') + (c.medium ? `<i class="c-medium">${c.medium}</i>` : '');
        const f = freshness(s);
        const age = `<span class="scen-age ${f.stale || f.newer ? 'is-stale' : ''}" title="最新一期 ${esc(f.label)}">${f.age} 天前</span>`;
        return btn(i, `${s.active === false ? '（已停止）' : ''}${esc(s.name)}${n ? `<span class="scen-counts">${n}</span>` : ''}${age}`);
      }).join('');
      html = `<span class="label scen-label">監看窗格 ${helpQ('windows', '監看窗格')}</span><div class="filters">${tabs}</div>`;
    } else {
      const kindText = { positive: '正案例', negative: '負案例' };
      const tabs = SCENARIOS.map((s, i) => kindText[s.kind] ? btn(i, `${kindText[s.kind]}｜${esc(s.name)}`) : '').join('');
      const xs = SCENARIOS.map((s, i) => ({ s, i })).filter(x => x.s.kind === 'replay');
      const menu = xs.length ? `
        <select class="county-select scen-select ${scen().kind === 'replay' ? 'is-on' : ''}" aria-label="更多歷史案例">
          <option value="">更多歷史案例（${xs.length}）…</option>
          ${xs.map(x => `<option value="${x.i}" ${x.i === st.scenario ? 'selected' : ''}>${esc(x.s.name)}</option>`).join('')}
        </select>` : '';
      const score = window.REPLAY_SUMMARY ? '<button class="btn ghost" type="button" id="toScore">系統歷史成績</button>' : '';
      html = `<span class="label scen-label">歷史案例 ${helpQ('drill-cases', '演練模式的案例')}</span><div class="filters">${tabs}</div>${menu}${score}`;
    }
    box.innerHTML = html;
    $$('button[data-i]', box).forEach(b => b.addEventListener('click', () => setScenario(+b.dataset.i)));
    $$('select', box).forEach(sel =>
      sel.addEventListener('change', () => { if (sel.value !== '') setScenario(+sel.value); }));
    const score = $('#toScore');
    if (score) score.addEventListener('click', () => $('#replay').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  /* 切到指定情境（可指定時點標籤、事件代號）並捲到值班佇列；全清冊回放表、清冊詳情、系統狀態都用這個。
     情境是不是 live 決定模式，所以點歷史案例會自動進演練模式 */
  function openScenario(id, snapLabel, eventId) {
    const i = SCENARIOS.findIndex(s => s.id === id);
    if (i < 0) return false;
    st.scenario = i;
    if (!isDrill()) st.lastLive = i;
    const k = snapLabel ? scen().snapshots.findIndex(s => s.label === snapLabel) : -1;
    st.snap = k >= 0 ? k : defaultSnap(scen());
    const evs = sortedEvents();
    st.eventId = (eventId && evs.some(e => e.id === eventId)) ? eventId : (evs[0] ? evs[0].id : null);
    if (typeof Views !== 'undefined') Views.show('duty', { scroll: false });
    render();
    document.getElementById('duty').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  /* 演練模式預設開正案例（馬太鞍溪 2025）；沒有就開第一個歷史情境 */
  function enterDrill() {
    const i = indexOfKind('positive') >= 0 ? indexOfKind('positive') : SCENARIOS.findIndex(s => s.kind !== 'live');
    if (i >= 0) openScenario(SCENARIOS[i].id);
  }

  function exitDrill() {
    const i = st.lastLive >= 0 ? st.lastLive : liveIndices()[0];
    if (i != null && i >= 0) openScenario(SCENARIOS[i].id);
  }

  function render() {
    const sc = scen();
    const drill = isDrill();
    $('#dutyLabel').textContent = drill ? '演練模式 · 歷史事件回放' : '即時監看';
    $('#dutyTitle').textContent = sc.name;
    $('#dutyDesc').textContent = sc.description;
    $('#duty').classList.toggle('is-drill', drill);
    $('#drillBanner').hidden = !drill;
    // 沒有即時監看的資料時，演練模式是唯一的畫面，不顯示「回到即時監看」
    $('#drillExit').hidden = !liveIndices().length;
    const pos = indexOfKind('positive');
    const enter = $('#drillEnter');
    enter.hidden = drill || pos < 0;
    if (pos >= 0) enter.textContent = `${SCENARIOS[pos].name} 事件回放`;
    const replay = $('#replay');
    if (replay) replay.hidden = !drill || !window.REPLAY_SUMMARY;
    // 即時監看資料過舊或有影像沒分析：提示，避免把舊結果當成現況。
    // 一般畫面只說資料暫停更新（值班人員要知道能不能相信畫面）；原因與處理方式只在網管檢視
    const fresh = $('#freshNote');
    const f = drill ? null : freshness(sc);
    const admin = typeof Views !== 'undefined' && Views.isAdmin();
    fresh.hidden = !f || (!f.stale && !f.newer);
    fresh.classList.toggle('is-admin-note', admin);
    if (f) fresh.innerHTML = admin
      ? `<b>資料可能過舊</b>：最新一期是 ${esc(f.label)}（${f.age} 天前）` +
        (f.newer ? `，但系統已記到 ${f.newer} 的影像還沒分析，請檢查每日自動更新（系統管理分頁）` : `，衛星約每 6 天經過一次，請檢查每日自動更新（系統管理分頁）`)
      : `<b>即時監看資料暫停更新</b>：最新一期是 ${esc(f.label)}（${f.age} 天前），畫面上是當時的結果，不代表現況。`;
    const news = $('#dutyNews');
    if (news) news.hidden = drill || !news.innerHTML.trim();
    if (!$('#duty').hidden) {
      const hash = drill ? '#drill' : '#duty';
      if (location.hash !== hash) history.replaceState(null, '', hash);
    }
    renderTodo();
    renderScenarioTabs();
    renderRail();
    renderUpcoming();
    renderQueue();
    renderMinimap();
    renderCard();
  }

  /* 即時監看停在最新一期；演練模式停在三種優先等級都有的第一個時點（最能看出排序），沒有就停在最後 */
  function defaultSnap(sc) {
    if (sc.kind === 'live') return sc.snapshots.length - 1;
    const i = sc.snapshots.findIndex(s => s.counts.high && s.counts.medium && s.counts.low);
    return i >= 0 ? i : sc.snapshots.length - 1;
  }

  function init() {
    const section = $('#duty');
    if (!section) return;
    if (!SCENARIOS.length) {
      section.querySelector('.duty-board').innerHTML =
        '<div class="empty"><b>沒有事件資料</b>請在 code/ 底下執行 python -m pipeline.events.build 產生 data/events.js。</div>';
      return;
    }
    $('#drillEnter').addEventListener('click', enterDrill);
    $('#drillExit').addEventListener('click', exitDrill);
    // 預設開即時監看的第一個窗格；網址是 #drill（報告用）或沒有即時監看資料時開演練模式
    const live = liveIndices();
    st.lastLive = live.length ? live[0] : -1;
    if (location.hash === '#drill' || !live.length) {
      const pos = indexOfKind('positive');
      st.scenario = pos >= 0 ? pos : Math.max(0, SCENARIOS.findIndex(s => s.kind !== 'live'));
    } else {
      st.scenario = live[0];
    }
    st.snap = defaultSnap(scen());
    st.eventId = sortedEvents()[0] ? sortedEvents()[0].id : null;
    render();

    document.addEventListener('keydown', e => {
      if (!e.target.closest || !e.target.closest('#snapRail')) return;
      if (e.key === 'ArrowRight') { setSnap(st.snap + 1); $('#snapRail .snap.is-on').focus(); }
      if (e.key === 'ArrowLeft') { setSnap(st.snap - 1); $('#snapRail .snap.is-on').focus(); }
    });
  }

  return { init, openScenario, enterDrill, liveFreshness };
})();

document.addEventListener('DOMContentLoaded', Duty.init);
