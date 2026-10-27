/* Pando DS V1 — Left Menu Panel behaviour. Requires left-panel.css
   (+ tabs.js when the header is a Tab Group — tabs.js wires its own tabs).
   Markup (Type=Internal Stages):
     <nav class="pds-left-panel" aria-label="Stages">
       <div class="pds-left-panel__header">
         <h2 class="pds-left-panel__title">Heading</h2>
         <div class="pds-button-group">
           <button type="button" class="pds-button pds-button--text pds-button--small"
                   data-left-panel-toggle aria-expanded="true"><span class="pds-button__label">Collapse</span></button>
         </div>
       </div>
       <div class="pds-left-panel__body">
         <ul class="pds-left-panel__menu">
           <li><a class="pds-left-panel__row pds-left-panel__row--primary" href="…">Header</a></li>
           <li class="pds-left-panel__stage">
             <button type="button" class="pds-left-panel__row pds-left-panel__row--stage" aria-expanded="true" aria-controls="s1">…</button>
             <ul class="pds-left-panel__sub" id="s1"><li><a class="pds-left-panel__tertiary" href="…">Tertiary</a></li></ul>
           </li>
         </ul>
       </div>
     </nav>
   Behaviour:
     - [data-left-panel-toggle] collapses the panel to the 52px rail (Collapsed=Yes) and back.
       Its label switches Collapse ↔ Expand (Figma text); aria-expanded follows.
     - A stage row with aria-controls expands / collapses its .Third level menu (Secondary Level).
     - Clicking a .Menu-Item, Primary row, stage link or Tertiary row makes it the active item:
       aria-current="page" on it, removed from the others in the same panel.
       Rows with aria-disabled="true" ignore clicks and are skipped by the arrow keys.
     - Keyboard inside the panel body: ↑/↓ previous/next visible row · Home/End first/last ·
       → on a closed stage opens it, on an open stage moves into it · ← on an open stage closes it,
       on a Tertiary row moves to its stage. Enter/Space are native (link/button).
     - Events (bubble from the panel): 'pds-left-panel-toggle' {collapsed},
       'pds-left-panel-expand' {stage, open}, 'pds-left-panel-select' {item}.
   API (window.pdsLeftPanel):
     init(root = document)        wire every .pds-left-panel inside root (idempotent)
     collapse(panel, yes = true)  set Collapsed=Yes / No
     expand(stageRow, open)       open / close a stage's children
     select(panel, el)            make el the active row */
(function () {
  const ROWS = '.pds-left-panel__item, .pds-left-panel__row, .pds-left-panel__tertiary:not(.pds-left-panel__tertiary--swap)';
  const isDisabled = el => el.getAttribute('aria-disabled') === 'true';
  const subOf = row => { const id = row.getAttribute('aria-controls'); return id ? document.getElementById(id) : null; };
  const emit = (panel, name, detail) => panel.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));

  function collapse(panel, yes) {
    yes = yes !== false;
    panel.classList.toggle('pds-left-panel--collapsed', yes);
    panel.querySelectorAll('[data-left-panel-toggle]').forEach(b => {
      b.setAttribute('aria-expanded', yes ? 'false' : 'true');
      const l = b.querySelector('.pds-button__label') || b;
      l.textContent = yes ? (b.dataset.expandLabel || 'Expand') : (b.dataset.collapseLabel || 'Collapse');
    });
    emit(panel, 'pds-left-panel-toggle', { collapsed: yes });
  }

  function expand(row, open) {
    const sub = subOf(row); if (!sub) return;
    if (open === undefined) open = row.getAttribute('aria-expanded') !== 'true';
    row.setAttribute('aria-expanded', open ? 'true' : 'false');
    sub.hidden = !open;
    const panel = row.closest('.pds-left-panel');
    if (panel) emit(panel, 'pds-left-panel-expand', { stage: row, open });
  }

  function select(panel, el) {
    if (!el || isDisabled(el)) return;
    panel.querySelectorAll('[aria-current]').forEach(n => { if (n !== el) n.removeAttribute('aria-current'); });
    el.setAttribute('aria-current', 'page');
    emit(panel, 'pds-left-panel-select', { item: el });
  }

  const visibleRows = panel => Array.from(panel.querySelectorAll(ROWS))
    .filter(r => !isDisabled(r) && r.offsetParent !== null);

  function wire(panel) {
    if (panel.dataset.pdsLeftPanel) return;
    panel.dataset.pdsLeftPanel = '1';

    panel.querySelectorAll('.pds-left-panel__row[aria-controls]').forEach(r => {
      const sub = subOf(r); if (sub) sub.hidden = r.getAttribute('aria-expanded') !== 'true';
    });

    panel.addEventListener('click', e => {
      const t = e.target.closest('[data-left-panel-toggle]');
      if (t && panel.contains(t)) { collapse(panel, !panel.classList.contains('pds-left-panel--collapsed')); return; }
      const row = e.target.closest(ROWS);
      if (!row || !panel.contains(row)) return;
      if (row.getAttribute('href') === '#') e.preventDefault();
      if (isDisabled(row)) { e.preventDefault(); return; }
      if (row.hasAttribute('aria-controls')) { expand(row); return; }
      select(panel, row);
    });

    panel.addEventListener('keydown', e => {
      const cur = document.activeElement;
      if (!cur || !cur.matches(ROWS) || !panel.contains(cur)) return;
      const rows = visibleRows(panel), i = rows.indexOf(cur);
      let to = null;
      switch (e.key) {
        case 'ArrowDown': to = rows[Math.min(i + 1, rows.length - 1)]; break;
        case 'ArrowUp':   to = rows[Math.max(i - 1, 0)]; break;
        case 'Home':      to = rows[0]; break;
        case 'End':       to = rows[rows.length - 1]; break;
        case 'ArrowRight':
          if (cur.hasAttribute('aria-controls')) {
            if (cur.getAttribute('aria-expanded') !== 'true') expand(cur, true);
            else { const sub = subOf(cur); to = sub && sub.querySelector(ROWS); }
          } else return;
          break;
        case 'ArrowLeft':
          if (cur.hasAttribute('aria-controls') && cur.getAttribute('aria-expanded') === 'true') expand(cur, false);
          else if (cur.closest('.pds-left-panel__sub')) {
            const sub = cur.closest('.pds-left-panel__sub');
            to = panel.querySelector(`[aria-controls="${sub.id}"]`);
          } else return;
          break;
        default: return;
      }
      e.preventDefault();
      if (to) to.focus();
    });
  }

  function init(root) { (root || document).querySelectorAll('.pds-left-panel').forEach(wire); }

  window.pdsLeftPanel = { init, collapse, expand, select };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
