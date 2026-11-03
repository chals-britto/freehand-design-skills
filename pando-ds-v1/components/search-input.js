/* Pando DS V1 — Search Input behaviour. Requires search-input.css,
   dropdown-option.css (rows) and menu.css (category headings).
   pdsSearchInput.init(root)   wire one .pds-search-input (idempotent)
   pdsSearchInput.initAll(scope = document)   every [data-pds-search-input]
   Markup: .pds-search-input > .pds-search-input__field > input[role=combobox]
           + ul.pds-search-input__panel[role=listbox] of li.pds-dropdown-option[role=option]
             and (Categories) li.pds-menu__section[role=presentation].
   Behaviour
     · typing opens the panel and filters rows by title + secondary text
       (case-insensitive); headings with no visible rows hide too
     · ↓ / ↑ move the highlight (.is-active + aria-activedescendant), ↓ opens
     · Enter or click picks: default list → value = row title, panel closes;
       --categories → toggles aria-selected (the check), panel stays open
     · Esc closes; a click outside closes
     · clear × (Show Close Icon) shows while there is a value; clears + refocuses
   Events (bubble from root): "pds-search-input:select" detail {option, title, selected} */
(function () {
  let uid = 0;

  function init(root) {
    if (!root || root.__pdsSearch) return;
    root.__pdsSearch = true;
    const input = root.querySelector('.pds-search-input__input');
    const panel = root.querySelector('.pds-search-input__panel');
    const clear = root.querySelector('.pds-search-input__clear');
    const multi = root.classList.contains('pds-search-input--categories');
    if (!input) return;

    const syncClear = () => { if (clear) clear.hidden = !input.value; };
    syncClear();
    if (clear) clear.addEventListener('click', () => {
      input.value = ''; syncClear(); if (panel) filter(); input.focus();
      root.dispatchEvent(new Event('input', { bubbles: true }));
    });
    if (!panel) { input.addEventListener('input', syncClear); return; }

    if (!panel.id) panel.id = 'pds-search-list-' + (++uid);
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-controls', panel.id);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    panel.setAttribute('role', 'listbox');
    if (multi) panel.setAttribute('aria-multiselectable', 'true');

    const rows = () => [...panel.querySelectorAll('.pds-dropdown-option')];
    const visible = () => rows().filter(r => !r.hidden);
    rows().forEach(r => {
      if (!r.id) r.id = panel.id + '-o' + (++uid);
      r.setAttribute('role', 'option');
      if (!r.hasAttribute('aria-selected')) r.setAttribute('aria-selected', 'false');
    });
    panel.querySelectorAll('.pds-menu__section').forEach(h => h.setAttribute('role', 'presentation'));

    function isOpen() { return !panel.hidden; }
    function open() {
      if (!visible().length) return close();
      panel.hidden = false; root.classList.add('is-open'); input.setAttribute('aria-expanded', 'true');
    }
    function close() {
      panel.hidden = true; root.classList.remove('is-open'); input.setAttribute('aria-expanded', 'false');
      setActive(null);
    }
    function setActive(r) {
      rows().forEach(x => x.classList.toggle('is-active', x === r));
      if (r) { input.setAttribute('aria-activedescendant', r.id); r.scrollIntoView({ block: 'nearest' }); }
      else input.removeAttribute('aria-activedescendant');
    }
    function filter() {
      const q = input.value.trim().toLowerCase();
      rows().forEach(r => { r.hidden = !!q && !r.textContent.toLowerCase().includes(q); });
      // a heading hides when every row up to the next heading is hidden
      panel.querySelectorAll('.pds-menu__section').forEach(h => {
        let n = h.nextElementSibling, any = false;
        while (n && !n.classList.contains('pds-menu__section')) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        h.hidden = !any;
      });
      const a = panel.querySelector('.is-active');
      if (a && a.hidden) setActive(null);
    }
    function pick(r) {
      const title = (r.querySelector('.pds-dropdown-option__title') || r).textContent.trim();
      if (multi) {
        const on = r.getAttribute('aria-selected') !== 'true';
        r.setAttribute('aria-selected', String(on));
        root.dispatchEvent(new CustomEvent('pds-search-input:select', { bubbles: true, detail: { option: r, title, selected: on } }));
      } else {
        rows().forEach(x => x.setAttribute('aria-selected', String(x === r)));
        input.value = title; syncClear(); close();
        root.dispatchEvent(new CustomEvent('pds-search-input:select', { bubbles: true, detail: { option: r, title, selected: true } }));
      }
    }
    function move(d) {
      const v = visible(); if (!v.length) return;
      const i = v.indexOf(panel.querySelector('.is-active'));
      setActive(v[i < 0 ? (d > 0 ? 0 : v.length - 1) : (i + d + v.length) % v.length]);
    }

    input.addEventListener('input', () => { syncClear(); filter(); open(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen()) { filter(); open(); } move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (isOpen()) move(-1); }
      else if (e.key === 'Enter') { const a = panel.querySelector('.is-active'); if (isOpen() && a) { e.preventDefault(); pick(a); } }
      else if (e.key === 'Escape') { if (isOpen()) { e.preventDefault(); close(); } }
    });
    panel.addEventListener('mousedown', e => e.preventDefault()); // keep focus in the input
    panel.addEventListener('click', e => {
      if (e.target.closest('.pds-dropdown-option__delete')) return;
      const r = e.target.closest('.pds-dropdown-option'); if (r && !r.hidden) pick(r);
    });
    panel.addEventListener('mousemove', e => { const r = e.target.closest('.pds-dropdown-option'); if (r) setActive(r); });
    document.addEventListener('mousedown', e => { if (isOpen() && !root.contains(e.target)) close(); });

    filter();
    if (!root.classList.contains('is-open')) close(); else open();
  }

  function initAll(scope) { (scope || document).querySelectorAll('[data-pds-search-input]').forEach(init); }

  window.pdsSearchInput = { init, initAll };
})();
