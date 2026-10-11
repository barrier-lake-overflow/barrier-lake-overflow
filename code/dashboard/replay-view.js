/* ════════════════════════════════════════
   全清冊回放 · 統計表
   資料由 data/replay.js 提供（window.REPLAY_SUMMARY），
   由 pipeline/events/build.py（replay.py）產生。
   點一列 → 值班佇列切到該湖的回放、停在首次偵測的時點。
   ════════════════════════════════════════ */

'use strict';

const ReplayView = (() => {
  const DATA = window.REPLAY_SUMMARY;
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const OUTCOME = {
    detected: { text: '偵測到', cls: 'o-hit' },
    missed: { text: '漏報', cls: 'o-miss' },
    no_pass: { text: '期間無過境', cls: 'o-none' },
    no_data: { text: '尚無資料', cls: 'o-none' },
  };
  const PRIORITY = { high: '高', medium: '中', low: '低' };
  const days = d => d == null ? '—' : `${d} 天`;
  const vol = v => v ? `${v.toLocaleString()} 萬` : '<span class="dim">未登載</span>';

  function totals(t) {
    const cell = (n, label, cls = '') => `<div class="rt ${cls}"><b>${n}</b><span>${label}</span></div>`;
    return [
      cell(t.targets, '回放筆數'),
      cell(t.detected, '偵測到', 'o-hit'),
      cell(t.missed, '漏報', 'o-miss'),
      cell(t.no_pass, '期間無過境', 'o-none'),
      cell(t.no_data, '尚無資料', 'o-none'),
      cell(t.expectedChanceHits, '隨機基準：碰巧命中的期望筆數', 'o-chance'),
      cell(t.highAmongDetected, '偵測到且曾列高優先'),
    ].join('');
  }

  function bySize(groups) {
    return groups.filter(g => g.observable).map(g =>
      `<span><b>${esc(g.group)}</b> ${g.detected}／${g.observable} 筆偵測到（隨機期望 ${g.expectedChance}）</span>`).join('');
  }

  function row(r) {
    const o = OUTCOME[r.outcome];
    const result = r.outcome === 'detected'
      ? `${esc(r.eventId)} · ${esc(r.detectedAt)}（形成後 ${days(r.detectLagDays)}）`
      : `<span class="dim">${esc(r.reason)}</span>`;
    const pri = r.maxPriority
      ? `<span class="rp p-${r.maxPriority}">${PRIORITY[r.maxPriority]}</span> <span class="dim">信心${esc(r.confidence)}</span>` : '—';
    const other = r.passCount ? `${r.otherEvents}${r.otherHighEvents ? `（高 ${r.otherHighEvents}）` : ''}` : '—';
    const clickable = r.passCount && r.outcome !== 'no_data';
    return `
      <tr class="${clickable ? 'is-link' : ''}" ${clickable ? `tabindex="0" data-scen="${esc(r.scenarioId)}"
          data-snap="${esc(r.detectedAt || '')}" data-ev="${esc(r.eventId || '')}"` : ''}>
        <td><b>${esc(r.name)}</b><span class="dim">${esc(r.county)} · ${esc(r.cause || '誘因未登載')}</span></td>
        <td class="num">${esc(r.formed)}${r.breach ? `<span class="dim">潰決 ${esc(r.breach)}</span>` : ''}</td>
        <td class="num">${vol(r.volume)}</td>
        <td class="num">${esc(r.orbit || '—')}<span class="dim">${r.passCount ? `${r.passCount} 期` : ''}${
          r.preCount != null ? ` · 基準 ${r.preCount} 張` : ''}</span>${
          r.preCount != null && r.preCount < 3 ? '<span class="dim warn">基準張數不足，假暗區偏多</span>' : ''}</td>
        <td class="num">${days(r.firstPassLagDays)}</td>
        <td><span class="ro ${o.cls}">${o.text}</span></td>
        <td>${result}</td>
        <td>${pri}</td>
        <td class="num">${r.distanceM != null ? `${r.distanceM.toLocaleString()} m` : '—'}</td>
        <td class="num">${other}</td>
        <td class="num ${r.chanceHitProb >= 0.4 ? 'warn' : ''}">${r.chanceHitProb != null ? `${Math.round(r.chanceHitProb * 100)}%` : '—'}</td>
      </tr>`;
  }

  function init() {
    const box = $('#replay');
    if (!box) return;
    if (!DATA) {
      box.hidden = true;
      return;
    }
    const t = DATA.totals, ru = DATA.rules;
    $('#replayCount').textContent = `${t.targets} 筆 · 更新 ${DATA.generated.slice(0, 10)}`;
    $('#replayDesc').innerHTML =
      `清冊中 ${ru.start.slice(0, 4)} 年以後、形成日期完整到日的堰塞湖，每一筆都用<b>同一套流程、同一組參數</b>逐期回放，` +
      `不逐湖調整。窗格以清冊壩址為中心 4 km；逐期影像取形成前 ${ru.postBeforeDays} 天到形成後 ${ru.postAfterDays} 天，` +
      `軌道取形成後最早有影像的一軌。形成後（含前 1 天）到潰決為止，壩址 ${ru.matchRadiusM / 1000} km 內出現事件即算偵測到。`;
    $('#replayTotals').innerHTML = totals(t);
    $('#replaySize').innerHTML = `<span class="label">依清冊蓄水量（看到結果後才分組，僅供描述）</span>${bySize(DATA.bySize)}`;
    $('#replayTable').innerHTML = `
      <thead><tr>
        <th>堰塞湖</th><th>清冊形成日</th><th>蓄水量（m³）</th><th>軌道 · 期數</th><th>形成後首張</th>
        <th>結果</th><th>首次偵測／原因</th><th>最高優先</th><th>距壩址</th><th>同窗格其他事件</th>
        <th title="壩址換成窗格內任一位置，1 km 內剛好有事件的機率">碰巧命中機率</th>
      </tr></thead>
      <tbody>${DATA.rows.map(row).join('')}</tbody>`;
    const skipped = DATA.skipped.map(s => `${s.name}（${s.reason}）`).join('、');
    $('#replayNote').textContent =
      `未納入：${DATA.beforeStartCount} 筆形成於 ${ru.start.slice(0, 4)} 年以前（Sentinel-1 尚未穩定覆蓋台灣）` +
      (skipped ? `；${skipped}` : '') +
      '。「碰巧命中機率」：把壩址換成窗格內任一位置、1 km 內剛好有事件的機率；窗格裡事件多時偏高，' +
      '該列的「偵測到」可能只是碰巧（≥ 40% 以琥珀色標示）。偵測端最小湖面 0.5 公頃，蓄水量小的湖可能低於此限。' +
      '「形成後首張」以清冊形成日 00:00 起算，清冊多只登載到日。';

    const open = tr => tr && tr.dataset.scen && Duty.openScenario(tr.dataset.scen, tr.dataset.snap, tr.dataset.ev);
    box.addEventListener('click', e => open(e.target.closest('tr.is-link')));
    box.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const tr = e.target.closest('tr.is-link');
        if (tr) { e.preventDefault(); open(tr); }
      }
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', ReplayView.init);
