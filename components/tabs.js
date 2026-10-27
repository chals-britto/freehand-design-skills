/* Pando DS V1 — Tab Group behaviour. Requires tabs.css.
   Markup:
     <div class="pds-tabs" role="tablist" aria-label="…">
       <button class="pds-tabs__tab" role="tab" id="t1" aria-controls="p1" aria-selected="true">Overview</button>
       <button class="pds-tabs__tab" role="tab" id="t2" aria-controls="p2" aria-selected="false">History</button>
       <button class="pds-tabs__tab" role="tab" id="t3" aria-controls="p3" aria-disabled="true">Notes</button>
     </div>
     <div class="pds-tabs__panel" role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">…</div>
   Behaviour:
     - One tab stop: only the selected tab has tabindex="0" (roving tabindex).
     - Click selects. ←/→ move to the previous/next enabled tab and select it
       (wraps); Home/End go to the first/last enabled tab. Selection follows focus.
     - Disabled tabs (aria-disabled="true") are skipped and cannot be selected.
     - The selected tab's panel is shown, the others get `hidden`.
     - Fires 'pds-tabs-change' on the tablist, detail = { index, tab, panel }.
   API (window.pdsTabs):
     init(root = document)  wire every .pds-tabs inside root (idempotent)
     select(tablist, index) select tab `index` (ignored if disabled) */
(function () {
  const TAB = '.pds-tabs__tab';
  const tabsOf = list => Array.from(list.querySelectorAll(TAB));
  const isDisabled = t => t.getAttribute('aria-disabled') === 'true';
  const panelOf = t => { const id = t.getAttribute('aria-controls'); return id ? document.getElementById(id) : null; };

  function select(list, index, focus) {
    const tabs = tabsOf(list), tab = tabs[index];
    if (!tab || isDisabled(tab)) return;
    tabs.forEach((t, i) => {
      const on = i === index;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      const p = panelOf(t); if (p) p.hidden = !on;
    });
    if (focus) tab.focus();
    list.dispatchEvent(new CustomEvent('pds-tabs-change', { bubbles: true, detail: { index, tab, panel: panelOf(tab) } }));
  }

  function step(tabs, from, dir) {
    const n = tabs.length;
    for (let k = 1; k <= n; k++) { const i = (from + dir * k + n) % n; if (!isDisabled(tabs[i])) return i; }
    return from;
  }

  function wire(list) {
    if (list.dataset.pdsTabs) return;
    list.dataset.pdsTabs = '1';
    if (!list.hasAttribute('role')) list.setAttribute('role', 'tablist');
    const tabs = tabsOf(list);
    let cur = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true' && !isDisabled(t));
    if (cur < 0) cur = tabs.findIndex(t => !isDisabled(t));
    tabs.forEach((t, i) => {
      if (!t.hasAttribute('role')) t.setAttribute('role', 'tab');
      if (t.tagName === 'BUTTON' && !t.hasAttribute('type')) t.type = 'button';
      t.setAttribute('aria-selected', i === cur ? 'true' : 'false');
      t.tabIndex = i === cur ? 0 : -1;
      const p = panelOf(t);
      if (p) { p.setAttribute('role', 'tabpanel'); if (t.id) p.setAttribute('aria-labelledby', t.id); if (!p.hasAttribute('tabindex')) p.tabIndex = 0; p.hidden = i !== cur; }
    });

    list.addEventListener('click', e => {
      const t = e.target.closest(TAB); if (!t || !list.contains(t)) return;
      const i = tabsOf(list).indexOf(t);
      if (isDisabled(t)) { e.preventDefault(); return; }
      select(list, i, true);
    });
    list.addEventListener('keydown', e => {
      const ts = tabsOf(list), from = ts.indexOf(document.activeElement);
      if (from < 0) return;
      let to = null;
      if (e.key === 'ArrowRight') to = step(ts, from, 1);
      else if (e.key === 'ArrowLeft') to = step(ts, from, -1);
      else if (e.key === 'Home') to = step(ts, -1, 1);
      else if (e.key === 'End') to = step(ts, ts.length, -1);
      if (to === null) return;
      e.preventDefault();
      select(list, to, true);
    });
  }

  function init(root) { (root || document).querySelectorAll('.pds-tabs').forEach(wire); }

  window.pdsTabs = { init, select: (list, i) => select(list, i, false) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
