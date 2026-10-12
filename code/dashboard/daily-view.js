/* ════════════════════════════════════════
   每日自動更新 · 狀態面板
   資料由 data/daily.js 提供（window.DAILY_STATUS），由 pipeline/daily/run.py 產生：
   各步驟是否成功、目前監看的窗格、發布中的警戒、待人工確認的新聞候選。
   點監看窗格 → 值班佇列切到該窗格。
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
        <span class="dim mono">${w.orbit ? `${w.orbit.pass === 'DESCENDING' ? '降' : '升'}軌 ${w.orbit.orbit}` : '尚未選軌道'}
          · 啟用 ${esc(w.activatedAt.slice(5, 10))} · 最新影像 ${day(w.lastScene)}</span>
      </button></li>`).join('')}</ul>`;
  }

  function news(list, total) {
    if (!list.length) return '<p class="dim">沒有待確認的新聞候選。</p>';
    return `<ul class="dn">${list.slice(0, 8).map(n => `
      <li><span class="ro">${esc(KIND_TEXT[n.kind] || n.kind)}</span>
        <a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.title)}</a>
        <span class="dim mono">${esc(n.time.slice(5, 16).replace('T', ' '))} · 對到：${n.matches.map(m => esc(m.name)).join('、')}</span></li>`).join('')}</ul>
      <p class="dim">共 ${total} 筆對到地點、待確認。確認後才會進研判（在本機執行 <code>python -m pipeline.daily.news list</code> 查看與確認）。</p>`;
  }

  function init() {
    const box = $('#daily');
    if (!box) return;
    if (!D) { box.hidden = true; return; }
    const failed = D.steps.filter(s => s.status === 'error').length;
    $('#dailyCount').textContent = `更新 ${D.finishedAt.slice(0, 16).replace('T', ' ')}` + (failed ? ` · ${failed} 步失敗` : '');
    const alerts = D.alerts.length
      ? `${D.alerts.length} 則（${[...new Set(D.alerts.map(a => a.place))].slice(0, 4).map(esc).join('、')}…）` : '目前無警戒';
    // GSMaP 在 GEE 上通常落後 1～2 天；超過 48 小時標紅
    let rainNote = '';
    if (D.rainAsOf) {
      const lag = Math.round((new Date(D.finishedAt) - new Date(D.rainAsOf)) / 3600000);
      const at = new Date(D.rainAsOf).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
      rainNote = `<span class="ds ${lag > 48 ? 'err' : ''}" title="GSMaP 衛星雨量在 Google Earth Engine 上通常落後 1～2 天">雨量資料至 ${esc(at)}（落後約 ${lag} 小時）</span>`;
    }
    $('#dailyBody').innerHTML = `
      <div class="daily-steps"><span class="label">執行步驟</span>${steps(D.steps)}${rainNote}</div>
      <div class="daily-cols">
        <div><h3>監看窗格（${D.windows.length}）<span class="dim">　土石流／大規模崩塌警戒：${alerts}</span></h3>${windows(D.windows)}</div>
        <div><h3>外部證據候選</h3>${news(D.newsCandidates, D.newsCandidateCount)}</div>
      </div>`;
    box.addEventListener('click', e => {
      const b = e.target.closest('button[data-scen]');
      if (b) Duty.openScenario(b.dataset.scen);
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', DailyView.init);
