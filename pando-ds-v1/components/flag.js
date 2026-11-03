/* Pando DS V1 — "Flag an issue" wiring for spec pages.
   Each page has <button data-flag="page"> and sections marked [data-flag-area].
   Clicking a flag button (or a section's own flag button) opens the artifact's
   comment composer pinned to that section, so Claude can read it back.
   Outside claude.ai (local file, no comments capability) it explains instead. */
(function () {
  function areaFor(btn) {
    return btn.closest('[data-flag-area]') || document.querySelector('main') || document.body;
  }
  function note(btn, text) {
    let n = btn.parentElement.querySelector('.flag-note');
    if (!n) { n = document.createElement('span'); n.className = 'flag-note'; n.style.cssText = 'margin-left:10px;font-size:12px;color:var(--pg-muted,#5b6672)'; btn.after(n); }
    n.textContent = text;
  }
  // one small flag button per section, top-right of its heading
  document.querySelectorAll('[data-flag-area]').forEach(sec => {
    const h = sec.querySelector('h2');
    if (!h || h.querySelector('[data-flag]')) return;
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.flag = 'section'; b.textContent = 'Flag';
    b.setAttribute('aria-label', 'Flag an issue in ' + h.textContent.trim());
    b.style.cssText = 'margin-left:10px;font:500 11px var(--pg-ui,sans-serif);border:1px solid var(--pg-line,#dfe3e8);background:var(--pg-panel,#fff);color:var(--pg-muted,#5b6672);border-radius:999px;padding:2px 9px;cursor:pointer;vertical-align:middle';
    h.appendChild(b);
  });
  document.addEventListener('click', async e => {
    const btn = e.target.closest('[data-flag]');
    if (!btn) return;
    const target = btn.dataset.flag === 'page' ? (document.querySelector('main') || document.body) : areaFor(btn);
    let comments = null;
    try { comments = window.claude ? await window.claude.use('comments') : null; } catch (_) {}
    if (!comments) { note(btn, 'Open this page on claude.ai and use Comment mode in the top bar to pin a note here.'); return; }
    try { await comments.openComposer({ element: target }); }
    catch (err) { note(btn, 'Couldn’t open the comment box (' + ((err && err.code) || 'error') + '). Use Comment mode in the top bar.'); }
  });
})();
