/* ════════════════════════════════════════
   每日自動更新 · 狀態
   資料由 data/daily.js 提供（window.DAILY_STATUS），由 pipeline/daily/run.py 產生：
   各步驟是否成功、目前監看的窗格、發布中的警戒、對到地點的新聞候選（背景參考，不進研判）。
   一般畫面：頂端只寫資料更新時間與警戒則數，不寫執行細節。
   網管檢視（網址 ?admin，見 views.js）：頂端加上失敗步驟與即時監看影像新舊，點一下到「系統管理」分頁：
   系統狀態（執行步驟、各窗格最近一次的錯誤與白話說明）、執行紀錄、最近一次的完整輸出（data/syslog.js）。
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
    sentinel: 'Sentinel-1', passrain: '過境前雨量', basemap: '底圖', optical: '光學影像', passes: '衛星過境', news: '新聞候選',
    build: '儀表板資料', git: 'git',
  };
  const KIND_TEXT = { aerial: '航拍', satellite: '衛星', field: '現地／通報', official: '背景', optical: '光學' };
  const day = s => s ? `${s.slice(4, 6)}/${s.slice(6, 8)}` : '—';
  const helpQ = (id, name) =>
    `<a class="help-q" href="help.html#${id}" target="_blank" rel="noopener" title="使用說明：${name}" aria-label="使用說明：${name}">?</a>`;

  /* 常見錯誤翻成白話（網管檢視用）；認不得的回傳 null，只顯示原文 */
  function plain(err) {
    const e = String(err || '');
    if (/thumbnails\.create|getDownloadURL.*denied/i.test(e))
      return 'GEE 服務帳號沒有下載影像的權限：請專案管理者在 IAM 加上「Earth Engine Resource Writer」';
    if (/USER_PROJECT_DENIED|serviceusage/i.test(e)) return '帳號沒有使用這個 GCP 專案的權限';
    if (/permission|denied|403/i.test(e)) return '權限不足';
    if (/timed? ?out|timeout/i.test(e)) return '連線逾時（對方網站或網路暫時有問題，下次通常會恢復）';
    if (/缺少影像|FileNotFound/i.test(e)) return '找不到要分析的影像檔';
    return null;
  }
  const errText = err => plain(err) || String(err || '').slice(0, 160);

  function steps(list) {
    return list.map(s => {
      const cls = s.status === 'ok' ? 'ok' : s.status === 'error' ? 'err' : 'skip';
      const tip = s.status === 'error' ? `${plain(s.error) ? `${plain(s.error)}\n` : ''}${s.error}`
        : s.status === 'skipped' ? '略過' : `${s.seconds} 秒`;
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
          · 啟用 ${esc(w.activatedAt.slice(5, 10))} · 最新雷達 ${day(w.lastScene)}${w.lastOptical ? ` · 最新光學 ${day(w.lastOptical)}` : ''}</span>
        ${w.lastError ? `<span class="dw-err" title="${esc(w.lastError.error)}">上次失敗（${esc(w.lastError.at.slice(5, 16).replace('T', ' ').replace('-', '/'))}）：${esc(errText(w.lastError.error))}</span>` : ''}
      </button></li>`).join('')}</ul>`;
  }

  function news(list, total) {
    if (!list.length) return '<p class="dim">沒有對到地點的新聞。</p>';
    return `<ul class="dn">${list.slice(0, 5).map(n => `
      <li><span class="ro">${esc(KIND_TEXT[n.kind] || n.kind)}</span>
        <a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.title)}</a>
        <span class="dim mono">${esc(n.time.slice(5, 16).replace('T', ' '))} · 對到：${n.matches.map(m => esc(m.name)).join('、')}</span></li>`).join('')}</ul>
      <p class="dim">共 ${total} 筆對到地點。新聞只當背景參考，不會進入研判；要當作證據，請打開原文確認後，記在事件卡的人工查證。</p>`;
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
    if (!D) return;   // 沒有每日更新資料：頂端不顯示狀態
    const failed = D.steps.filter(s => s.status === 'error');
    const alerts = D.alerts.length
      ? `${D.alerts.length} 則（${[...new Set(D.alerts.map(a => a.place))].slice(0, 4).map(esc).join('、')}…）` : '目前無警戒';

    const admin = typeof Views !== 'undefined' && Views.isAdmin();
    const updated = `資料更新 ${esc(D.finishedAt.slice(5, 16).replace('T', ' ').replace('-', '/'))}`;
    const alertsFailed = failed.some(s => s.name === 'alerts');
    const btn = $('#sysStatusBtn');
    btn.hidden = false;
    btn.classList.toggle('has-alert', D.alerts.length > 0);

    if (!admin) {
      // 一般畫面：只寫更新時間與警戒則數，不顯示執行細節；不能點開
      btn.classList.add('is-plain');
      btn.removeAttribute('aria-controls');
      btn.removeAttribute('aria-expanded');
      btn.tabIndex = -1;
      $('#sysStatusText').innerHTML = [updated,
        D.alerts.length ? `<b class="st-alert">警戒 ${D.alerts.length} 則</b>` : '無警戒'].join(' · ');
    } else {
      // 網管檢視：失敗時寫出影響，不只給數字
      const alertText = alertsFailed
        ? `<b class="st-err">警戒資料這次沒抓到，沿用上一次（${D.alerts.length ? `${D.alerts.length} 則` : '無警戒'}）</b>`
        : D.alerts.length ? `<b class="st-alert">警戒 ${D.alerts.length} 則</b>` : '無警戒';
      const others = failed.filter(s => s.name !== 'alerts');
      const fresh = typeof Duty !== 'undefined' && Duty.liveFreshness ? Duty.liveFreshness() : null;
      $('#sysStatusText').innerHTML = ['<span class="st-admin">網管檢視</span>', updated, alertText,
        ...others.map(s => `<b class="st-err" title="${esc(s.error)}">${esc(STEP_TEXT[s.name] || s.name)}失敗${
          plain(s.error) ? `：${esc(plain(s.error).split('：')[0])}` : ''}</b>`),
        fresh && fresh.stale ? `<b class="st-alert">即時監看影像已 ${fresh.age} 天未更新</b>` : '',
      ].filter(Boolean).join(' · ');
      btn.classList.toggle('has-error', failed.length > 0 || !!(fresh && fresh.stale));
      btn.title = failed.length
        ? `失敗：${failed.map(s => STEP_TEXT[s.name] || s.name).join('、')}（點一下到系統管理）` : '點一下到系統管理';
    }

    // 發布中的警戒：頂端紅色橫幅（值班人員要看，所以一般畫面也顯示）
    const ab = $('#alertBanner');
    if (ab && D.alerts.length) {
      const TYPE = { D: '土石流', L: '大規模崩塌' };
      const places = [...new Set(D.alerts.map(a => `${a.place}${a.level ? `（${a.level}）` : ''}`))];
      ab.innerHTML = `<div class="wrap"><b>${alertsFailed && admin ? '警戒（沿用上一次）' : '發布中的警戒'}</b>
        <span>${[...new Set(D.alerts.map(a => TYPE[a.type] || a.type))].map(esc).join('、')} ${D.alerts.length} 則：
        ${places.slice(0, 8).map(esc).join('、')}${places.length > 8 ? ` 等 ${places.length} 處` : ''}</span>
        ${helpQ('alert-banner', '警戒橫幅')}</div>`;
      ab.hidden = false;
    }
    watchNewData();
    newsBox();
    if (!admin) return;   // 系統管理分頁只給網管檢視
    adminStatus(alerts);
    // 執行紀錄與完整輸出另放在 syslog.js（較大），只在網管檢視載入；用 <script> 載入，直接開檔案（file://）也能用
    const s = document.createElement('script');
    s.src = 'data/syslog.js';
    s.onload = () => adminLog(window.SYSTEM_LOG);
    s.onerror = () => adminLog(null);
    document.body.appendChild(s);
  }

  /* 系統管理 · 系統狀態：本次各步驟、雨量資料時間、各監看窗格（最近一次失敗的白話原因） */
  function adminStatus(alerts) {
    const box = $('#adminStatus');
    if (!box) return;
    // GSMaP 在 GEE 上通常落後 1～2 天；超過 48 小時標紅
    let rainNote = '';
    if (D.rainAsOf) {
      const lag = Math.round((new Date(D.finishedAt) - new Date(D.rainAsOf)) / 3600000);
      const at = new Date(D.rainAsOf).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
      rainNote = `<span class="ds ${lag > 48 ? 'err' : ''}" title="GSMaP 衛星雨量在 Google Earth Engine 上通常落後 1～2 天">雨量資料至 ${esc(at)}（落後約 ${lag} 小時）</span>`;
    }
    const failed = D.steps.filter(x => x.status === 'error');
    box.innerHTML = `
      <div class="sec-head"><h2>系統狀態</h2>${helpQ('status', '系統管理')}<span class="rule"></span>
        <span class="count">每兩天自動更新 · 本次 ${esc(D.startedAt.slice(0, 16).replace('T', ' '))} 開始、${esc(D.finishedAt.slice(11, 16))} 完成</span></div>
      <div class="daily-steps"><span class="label">執行步驟</span>${steps(D.steps)}${rainNote}</div>
      ${failed.map(x => `<p class="admin-fail"><b>${esc(STEP_TEXT[x.name] || x.name)}失敗</b>：${esc(errText(x.error))}
        ${plain(x.error) ? `<span class="dim">原文：${esc(x.error)}</span>` : ''}</p>`).join('')}
      <div><h3>監看窗格（${D.windows.length}）<span class="dim">　土石流／大規模崩塌警戒：${alerts}</span></h3>${windows(D.windows)}</div>`;
    box.addEventListener('click', e => {
      const b = e.target.closest('button[data-scen]');
      if (b) Duty.openScenario(b.dataset.scen);
    });
  }

  /* 系統管理 · 執行紀錄（最近幾次的摘要，新的在上）＋最近一次的完整輸出 */
  function adminLog(L) {
    const table = $('#adminHistory'), pre = $('#adminLog');
    if (!table || !pre) return;
    const hist = (L && L.history) || [];
    $('#adminHistoryCount').textContent = hist.length ? `最近 ${hist.length} 次` : '尚無紀錄';
    table.innerHTML = hist.length ? `
      <thead><tr><th>開始</th><th>花費</th><th>結果</th><th>各步驟（滑鼠停留看秒數與錯誤）</th></tr></thead>
      <tbody>${hist.map(h => {
        const bad = h.steps.filter(x => x.status === 'error');
        return `<tr class="${bad.length ? 'has-fail' : ''}">
          <td class="mono">${esc(h.startedAt.slice(0, 16).replace('T', ' '))}</td>
          <td class="mono">${h.minutes} 分</td>
          <td>${bad.length ? `<b class="st-err">${bad.length} 步失敗</b><span class="dim">${bad.map(x =>
            `${esc(STEP_TEXT[x.name] || x.name)}：${esc(errText(x.error))}`).join('<br>')}</span>` : '<span class="ok-text">全部成功</span>'}</td>
          <td>${steps(h.steps)}</td></tr>`;
      }).join('')}</tbody>` : '<tbody><tr><td class="dim">還沒有執行紀錄。</td></tr></tbody>';

    const run = L && L.lastRun;
    if (!run) {
      $('#adminLogCount').textContent = '尚無';
      pre.textContent = '還沒有保存的輸出：系統從這一版開始保存，下一次自動更新跑完後就會出現。\n之前的完整輸出只在 GitHub Actions 的執行紀錄裡（要登入 GitHub 才看得到）。';
      return;
    }
    $('#adminLogCount').textContent = `${esc(run.startedAt.slice(0, 16).replace('T', ' '))} 開始 · ` +
      (run.totalLines > run.lines.length ? `共 ${run.totalLines} 行，顯示最後 ${run.lines.length} 行` : `共 ${run.lines.length} 行`);
    const BAD = /error|exception|traceback|失敗|denied|錯誤/i, HEAD = /^== /;
    const render = onlyBad => {
      pre.innerHTML = run.lines.filter(l => !onlyBad || BAD.test(l) || HEAD.test(l)).map(l =>
        `<span class="${BAD.test(l) ? 'lg-err' : HEAD.test(l) ? 'lg-head' : ''}">${esc(l)}</span>`).join('\n');
    };
    render(false);
    $('#adminLogErrors').addEventListener('change', e => render(e.target.checked));
  }

  /* 新聞候選：值班時要看的外部訊息，放在佇列旁 */
  function newsBox() {
    const nb = $('#dutyNews');
    if (!nb) return;
    nb.innerHTML = `<h3>新聞候選 ${helpQ('news', '新聞候選')} <span class="dim">對到監看窗格或清冊地點 · 背景參考，不進研判</span></h3>${news(D.newsCandidates, D.newsCandidateCount)}`;
    nb.hidden = $('#duty').classList.contains('is-drill');
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', DailyView.init);
