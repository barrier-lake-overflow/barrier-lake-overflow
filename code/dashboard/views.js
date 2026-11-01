/* ════════════════════════════════════════
   分頁與頂端抽屜
   分頁：值班（#duty）、全台清冊（#inventory），一次只顯示一個。
   #drill 直接開演練模式（報告用的連結），由 duty.js 讀取。
   使用說明是另一頁 help.html，開新分頁。

   網管檢視：網址加 ?admin，多一個「系統管理」分頁（#admin：系統狀態、執行紀錄、最近一次的輸出，
   daily-view.js 填內容）。一般畫面（值班人員、來訪者）只顯示資料更新時間與資料新舊。
   這只是把畫面分開，不是權限保護：網站是靜態頁面，狀態資料本來就在公開的 repo 裡。
   ════════════════════════════════════════ */

'use strict';

const Views = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const ADMIN = new URLSearchParams(location.search).has('admin');
  document.documentElement.classList.toggle('is-admin', ADMIN);
  const VIEWS = ADMIN ? ['duty', 'inventory', 'admin'] : ['duty', 'inventory'];
  let current = null;

  const fromHash = () => {
    const v = location.hash.slice(1);
    return VIEWS.includes(v) ? v : 'duty';
  };

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

  function init() {
    const tab = $('.vt[data-view="admin"]');
    if (tab) tab.hidden = !ADMIN;
    show(fromHash(), { scroll: false });
    $$('.vt').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      show(a.dataset.view);
    }));
    window.addEventListener('hashchange', () => {
      if (location.hash === '#drill' && typeof Duty !== 'undefined') Duty.enterDrill();
      else show(fromHash());
    });
    // 網管檢視：點頂端狀態列直接到系統管理分頁
    const btn = $('#sysStatusBtn');
    if (ADMIN && btn) btn.addEventListener('click', () => show('admin'));
    initFontScale();
  }

  /* 齒輪小視窗：字級（標準／大／特大，記在這台瀏覽器，使用說明頁也套用；<head> 已先套用）＋資料來源致謝 */
  function initFontScale() {
    const btn = $('#fsBtn'), menu = $('#fsMenu');
    if (!btn || !menu) return;
    const cur = document.documentElement.dataset.fs || '';
    $$('input', menu).forEach(r => {
      r.checked = r.value === cur;
      r.addEventListener('change', () => {
        if (r.value) document.documentElement.dataset.fs = r.value;
        else delete document.documentElement.dataset.fs;
        try { localStorage.setItem('fontScale', r.value); } catch (e) { /* 無痕模式：只套用這一次 */ }
        window.dispatchEvent(new Event('resize'));   // 3D 地圖等依尺寸繪製的元件重排
      });
    });
    // 小視窗貼在按鈕下方、右緣對齊按鈕，但不超出畫面左右
    const place = () => {
      const r = btn.getBoundingClientRect();
      const w = menu.offsetWidth;
      const left = Math.min(Math.max(12, r.right - w), window.innerWidth - w - 12);
      menu.style.top = `${Math.round(r.bottom + 6)}px`;
      menu.style.left = `${Math.round(left)}px`;
    };
    const open = v => { menu.hidden = !v; btn.setAttribute('aria-expanded', String(v)); if (v) place(); };
    window.addEventListener('resize', () => { if (!menu.hidden) place(); });
    btn.addEventListener('click', e => { e.stopPropagation(); open(menu.hidden); });
    document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) open(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { open(false); btn.focus(); } });
  }

  return { init, show, isAdmin: () => ADMIN };
})();

document.addEventListener('DOMContentLoaded', Views.init);
