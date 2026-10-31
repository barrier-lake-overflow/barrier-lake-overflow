/* ════════════════════════════════════════
   分頁與頂端抽屜
   分頁：值班（#duty）、全台清冊（#inventory），一次只顯示一個。
   #drill 直接開演練模式（報告用的連結），由 duty.js 讀取。
   頂端抽屜：系統狀態（daily-view.js 填內容）。使用說明是另一頁 help.html，開新分頁。
   ════════════════════════════════════════ */

'use strict';

const Views = (() => {
  const VIEWS = ['duty', 'inventory'];
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  let current = null;

  const fromHash = () => (location.hash === '#inventory' ? 'inventory' : 'duty');

  /* 切換分頁；hash 用 replaceState 改，不觸發 hashchange、也不多一筆瀏覽紀錄 */
  function show(view, { scroll = true } = {}) {
    if (!VIEWS.includes(view)) view = 'duty';
    $$('.view[data-view]').forEach(el => { el.hidden = el.dataset.view !== view; });
    $$('.vt').forEach(a => {
      if (a.dataset.view === view) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const drill = location.hash === '#drill' || ($('#duty') && $('#duty').classList.contains('is-drill'));
    const hash = view === 'duty' && drill ? '#drill' : `#${view}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
    // 3D 地圖在隱藏時量不到大小，切回清冊時重算
    if (view === 'inventory' && typeof Map3D !== 'undefined') requestAnimationFrame(() => Map3D.resize());
    if (scroll && current !== null && current !== view) window.scrollTo({ top: 0 });
    current = view;
  }

  function drawer(btnSel, panelSel) {
    const btn = $(btnSel), panel = $(panelSel);
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  function init() {
    show(fromHash(), { scroll: false });
    $$('.vt').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      show(a.dataset.view);
    }));
    window.addEventListener('hashchange', () => {
      if (location.hash === '#drill' && typeof Duty !== 'undefined') Duty.enterDrill();
      else show(fromHash());
    });
    drawer('#sysStatusBtn', '#sysStatus');
  }

  return { init, show };
})();

document.addEventListener('DOMContentLoaded', Views.init);
