/* ════════════════════════════════════════
   每日自動更新 · 狀態
   資料由 data/daily.js 提供（window.DAILY_STATUS），由 pipeline/daily/run.py 產生：
   各步驟是否成功、目前監看的窗格、發布中的警戒、待人工確認的新聞候選。
   頂端一行狀態（更新時間、警戒、失敗步驟），點開是系統狀態（執行步驟、監看窗格）；
   新聞候選放在值班佇列旁（只在即時監看顯示）。點監看窗格 → 值班佇列切到該窗格。
   ════════════════════════════════════════ */

'use strict';

const DailyView = (() => {
  const D = window.DAILY_STATUS;
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const STEP_TEXT = {
    inventory: '清冊', alerts: '警戒', 'gee-login': 'GEE 登入', rain: '雨量熱區', risk: '風險模型', watchlist: '監看名單',
    sentinel: 'Sentinel-1', passrain: '過境前雨量', news: '新聞候選', build: '儀表板資料', git: 'git',
  };
  const KIND_TEXT = { aerial: '航拍', satellite: '衛星', field: '現地／通報', official: '背景', optical: '光學' };
  const day = s => s ? `${s.slice(4, 6)}/${s.slice(6, 8)}` : '—';
  const helpQ = (id, name) =>
    `<a class="help-q" href="help.html#${id}" target="_blank" rel="noopener" title="使用說明：${name}" aria-label="使用說明：${name}">?</a>`;

  function steps(list) {
    return list.map(s => {
      const cls = s.status === 'ok' ? 'ok' : s.status === 'error' ? 'err' : 'skip';
      const tip = s.status === 'error' ? s.error : s.status === 'skipped' ? '略過' : `${s.seconds} 秒`;
      return `<span class="ds ${cls}" title="${esc(tip)}">${esc(STEP_TEXT[s.name] || s.name)}</span>`;
    }).join('');
  }

  function windows(list) {
    if (!list.length) return '<p class="dim">目前沒有監看中的窗格。</p>';
    return `<ul class="dw">${list.map(w => `
      <li><button type="button" data-scen="${esc(w.id)}">
        <b>${esc(w.name)}</b>
        <span class="dim">${w.sources.map(esc).join('；')}</span>
        <span class="dim mono">${w.orbits && w.orbits.length ? w.orbits.map(esc).join('＋') : '尚未選軌道'}
          · 啟用 ${esc(w.activatedAt.slice(5, 10))} · 最新影像 ${day(w.lastScene)}</span>
      </button></li>`).join('')}</ul>`;
  }

  function news(list, total) {
    if (!list.length) return '<p class="dim">沒有待確認的新聞候選。</p>';
    return `<ul class="dn">${list.slice(0, 5).map(n => `
      <li><span class="ro">${esc(KIND_TEXT[n.kind] || n.kind)}</span>
        <a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.title)}</a>
        <span class="dim mono">${esc(n.time.slice(5, 16).replace('T', ' '))} · 對到：${n.matches.map(m => esc(m.name)).join('、')}</span></li>`).join('')}</ul>
      <p class="dim">共 ${total} 筆對到地點、待確認。確認後才會進研判（在本機執行 <code>python -m pipeline.daily.news list</code> 查看與確認）。</p>`;
  }

  /* 網頁開著時資料不會自己換：每 10 分鐘（以及切回這個分頁時）看一下 daily.js 有沒有更新，
     有就提示重新整理。用 file:// 開或抓不到時不提示 */
  const CHECK_MS = 10 * 60 * 1000;
  function watchNewData() {
    const box = $('#newData');
    if (!box || location.protocol === 'file:') return;
    let last = 0;
    const check = async () => {
      if (Date.now() - last < 60000) return;
      last = Date.now();
      try {
        const text = await (await fetch('data/daily.js', { cache: 'no-store' })).text();
        const m = text.match(/"finishedAt":\s*"([^"]+)"/);
        if (!m || m[1] === D.finishedAt) return;
        box.innerHTML = `<div class="wrap"><b>有新資料</b><span>系統在 ${esc(m[1].slice(5, 16).replace('T', ' ').replace('-', '/'))} 更新過，畫面上的還是舊的</span>
          <button class="btn" type="button">重新整理</button></div>`;
        $('button', box).addEventListener('click', () => location.reload());
        box.hidden = false;
      } catch (e) { /* 離線或抓不到：不提示 */ }
    };
    setInterval(check, CHECK_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  }

  function init() {
    const box = $('#sysStatus');
    if (!box) return;
    if (!D) return;   // 沒有每日更新資料：頂端不顯示狀態
    const failed = D.steps.filter(s => s.status === 'error');
    const alerts = D.alerts.length
      ? `${D.alerts.length} 則（${[...new Set(D.alerts.map(a => a.place))].slice(0, 4).map(esc).join('、')}…）` : '目前無警戒';

    // 頂端一行狀態：失敗時寫出影響，不只給數字
    const btn = $('#sysStatusBtn');
    btn.hidden = false;
    btn.classList.toggle('has-alert', D.alerts.length > 0);
    const alertsFailed = failed.some(s => s.name === 'alerts');
    const alertText = alertsFailed
      ? `<b class="st-err">警戒資料這次沒抓到，沿用上一次（${D.alerts.length ? `${D.alerts.length} 則` : '無警戒'}）</b>`
      : D.alerts.length ? `<b class="st-alert">警戒 ${D.alerts.length} 則</b>` : '無警戒';
    const others = failed.filter(s => s.name !== 'alerts').map(s => STEP_TEXT[s.name] || s.name);
    // 即時監看影像過舊（Sentinel-1 步驟可能「成功」但沒分析新影像，失敗數看不出來）
    const fresh = typeof Duty !== 'undefined' && Duty.liveFreshness ? Duty.liveFreshness() : null;
    $('#sysStatusText').innerHTML = [
      `資料更新 ${esc(D.finishedAt.slice(5, 16).replace('T', ' ').replace('-', '/'))}`,
      alertText,
      others.length ? `<b class="st-err">${others.map(esc).join('、')}失敗</b>` : '',
      fresh && fresh.stale ? `<b class="st-alert">即時監看影像已 ${fresh.age} 天未更新</b>` : '',
    ].filter(Boolean).join(' · ');
    btn.classList.toggle('has-error', failed.length > 0 || !!(fresh && fresh.stale));
    btn.title = failed.length
      ? `失敗：${failed.map(s => STEP_TEXT[s.name] || s.name).join('、')}（點開看系統狀態）` : '點開看系統狀態';

    // 發布中的警戒：頂端紅色橫幅
    const ab = $('#alertBanner');
    if (ab && D.alerts.length) {
      const TYPE = { D: '土石流', L: '大規模崩塌' };
      const places = [...new Set(D.alerts.map(a => `${a.place}${a.level ? `（${a.level}）` : ''}`))];
      ab.innerHTML = `<div class="wrap"><b>${alertsFailed ? '警戒（沿用上一次）' : '發布中的警戒'}</b>
        <span>${[...new Set(D.alerts.map(a => TYPE[a.type] || a.type))].map(esc).join('、')} ${D.alerts.length} 則：
        ${places.slice(0, 8).map(esc).join('、')}${places.length > 8 ? ` 等 ${places.length} 處` : ''}</span>
        ${helpQ('status', '警戒與系統狀態')}</div>`;
      ab.hidden = false;
    }
    watchNewData();
    // GSMaP 在 GEE 上通常落後 1～2 天；超過 48 小時標紅
    let rainNote = '';
    if (D.rainAsOf) {
      const lag = Math.round((new Date(D.finishedAt) - new Date(D.rainAsOf)) / 3600000);
      const at = new Date(D.rainAsOf).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
      rainNote = `<span class="ds ${lag > 48 ? 'err' : ''}" title="GSMaP 衛星雨量在 Google Earth Engine 上通常落後 1～2 天">雨量資料至 ${esc(at)}（落後約 ${lag} 小時）</span>`;
    }
    $('#dailyBody').innerHTML = `
      <div class="sys-head"><b>系統狀態</b>${helpQ('status', '系統狀態')}<span class="dim">每兩天自動更新 · 本次 ${esc(D.startedAt.slice(0, 16).replace('T', ' '))} 開始、${esc(D.finishedAt.slice(11, 16))} 完成</span></div>
      <div class="daily-steps"><span class="label">執行步驟</span>${steps(D.steps)}${rainNote}</div>
      <div><h3>監看窗格（${D.windows.length}）<span class="dim">　土石流／大規模崩塌警戒：${alerts}</span></h3>${windows(D.windows)}</div>`;
    box.addEventListener('click', e => {
      const b = e.target.closest('button[data-scen]');
      if (!b) return;
      box.hidden = true;
      $('#sysStatusBtn').setAttribute('aria-expanded', 'false');
      Duty.openScenario(b.dataset.scen);
    });

    // 新聞候選：值班時要看的外部訊息，放在佇列旁
    const nb = $('#dutyNews');
    if (nb) {
      nb.innerHTML = `<h3>新聞候選 ${helpQ('news', '新聞候選')} <span class="dim">對到監看窗格或清冊地點、待人工確認</span></h3>${news(D.newsCandidates, D.newsCandidateCount)}`;
      nb.hidden = $('#duty').classList.contains('is-drill');
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', DailyView.init);
