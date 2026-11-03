/* Pando DS V1 — Filter Light / Dark behaviour. Requires filter-panel.css and the kit
   pieces it is built from: accordion.js (group headers), search-input.css (field),
   checkbox.css, button.css, button-group.css, icons.css, scrollbar.css.
   Figma page is named "To BE REVIEWED" — built as published; confirm before treating as standard.

   pdsFilterPanel.build(o)  → element
     theme    'light' | 'dark'                                   (default 'light')
     variant  'multiple' | 'single' (Light only) | 'left' (Dark only)
              Light: Single · Multiple   Dark: Left · Multiple   (Figma "Variant")
     type     'multiple' (checkboxes) | 'single' (one per group, text rows)  — .options "Type"
     title    header text (Figma "Filter")
     groups   [{ title, options: [label | {label, selected}] }]
     open     index of the open group (Multiple, default 0)
     search   show the Search Input in the options pane (Multiple, default true)
   pdsFilterPanel.buildGroup({ theme, type, title, options }) → a .group on its own
   pdsFilterPanel.buildOption({ theme, type, label, selected, hover }) → one .options row
   pdsFilterPanel.value(el) → { [groupTitle]: [selected labels] }
   pdsFilterPanel.reset(el)  clears every selection and the search

   Behaviour
     · Multiple: the accordion column lists the groups; opening one closes the others and
       shows its options in the pane (one is always open, as in Figma).
     · The count badge on each group header = selected options in that group; hidden at 0.
     · Search filters the open group's options by label (case-insensitive); it clears when
       another group is opened.
     · type 'multiple': native checkboxes. type 'single': one choice per group; picking the
       chosen row again clears it.
     · RESET clears all groups (Figma label "reset"); APPLY reads the selection.
   Events (bubble from the panel):
     "pds-filter-panel:change" detail {group, label, selected, value}
     "pds-filter-panel:apply"  detail {value}
     "pds-filter-panel:reset"  detail {value} */
(function () {
  let uid = 0;
  const ICON = {
    filter: '<svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M9.52 0C9.88 0 10.10 0.39 9.95 0.70L9.90 0.77L6.71 5.37L6.71 7.82C6.71 8.06 6.55 8.26 6.33 8.30L6.24 8.31C6.01 8.31 5.82 8.14 5.78 7.91L5.78 7.82V5.21C5.78 5.14 5.79 5.06 5.83 4.99L5.86 4.93L8.60 0.98H1.38L4.13 4.93C4.17 4.99 4.20 5.06 4.21 5.14L4.22 5.21V9.50C4.22 9.78 4.00 10 3.75 10C3.51 10 3.32 9.82 3.28 9.59L3.28 9.50L3.28 5.37L0.09 0.77C-0.11 0.47 0.05 0.06 0.39 0.00L0.47 0H9.52Z" fill="currentColor"/></svg>',
    search: '<svg viewBox="0 0 11 11" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.78 0C1.68 0 0 1.68 0 3.75C0 5.82 1.68 7.51 3.78 7.51C4.64 7.51 5.42 7.22 6.06 6.75L9.18 9.88L9.25 9.93C9.43 10.06 9.69 10.03 9.87 9.86C10.06 9.66 10.07 9.36 9.89 9.17L6.77 6.05C7.27 5.42 7.57 4.62 7.57 3.75C7.57 1.68 5.88 0 3.78 0ZM3.78 0.80C5.40 0.80 6.71 2.12 6.71 3.75C6.71 5.38 5.40 6.70 3.78 6.70C2.16 6.70 0.85 5.38 0.85 3.75C0.85 2.12 2.16 0.80 3.78 0.80Z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-linecap="round"/></svg>',
    selected: '<svg viewBox="0 0 10 8" fill="none" aria-hidden="true"><path d="M3.44 5.50L8.36 0.57C8.46 0.47 8.63 0.47 8.73 0.57L9.42 1.25C9.52 1.36 9.52 1.53 9.42 1.64L3.63 7.42C3.53 7.52 3.36 7.52 3.26 7.42L0.57 4.74C0.47 4.63 0.47 4.46 0.57 4.35L1.24 3.67C1.35 3.57 1.51 3.57 1.62 3.67L3.44 5.50Z" fill="currentColor"/></svg>',
    mark: '<svg class="pds-checkbox__mark" viewBox="0 0 10 8" aria-hidden="true"><path d="M3.28 5.72L8.74.09c.12-.12.3-.12.41 0l.76.78c.12.12.12.32 0 .44L3.48 7.91c-.11.12-.3.12-.41 0L.09 4.85c-.12-.12-.12-.32 0-.44l.74-.78c.12-.12.3-.12.42 0z"/></svg>'
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const norm = o => (typeof o === 'string' ? { label: o, selected: false } : { label: o.label, selected: !!o.selected });

  // Real icon SVGs from components/icons when the manifest is loaded; inline copies otherwise
  function icon(name, fallback) {
    const m = window.PDS_ICONS && window.PDS_ICONS.find(i => i.n === name);
    return m ? m.svg : fallback;
  }

  /* One .options row */
  function buildOption(o = {}) {
    const dark = o.theme === 'dark';
    const type = o.type === 'single' ? 'single' : 'multiple';
    const label = esc(o.label || 'Default Option');
    let row;
    if (type === 'multiple') {
      row = el('div', 'pds-filter-panel__option');
      row.innerHTML = '<label class="pds-checkbox' + (dark ? ' pds-checkbox--dark' : '') + '"><input type="checkbox" class="pds-checkbox__input"' + (o.selected ? ' checked' : '') + '><span class="pds-checkbox__box" aria-hidden="true">' + ICON.mark + '<span class="pds-checkbox__dash"></span></span><span class="pds-checkbox__label">' + label + '</span></label>';
    } else {
      row = el('button', 'pds-filter-panel__option pds-filter-panel__option--single');
      row.type = 'button';
      row.setAttribute('role', 'radio');
      row.setAttribute('aria-checked', o.selected ? 'true' : 'false');
      row.innerHTML = '<span class="pds-filter-panel__label">' + label + '</span><span class="pds-filter-panel__check" aria-hidden="true">' + icon('system-status-selected-multi', ICON.selected) + '</span>';
    }
    row.dataset.label = o.label || 'Default Option';
    if (o.hover) row.classList.add('is-hover');
    return row;
  }

  function buildList(g, theme, type) {
    const list = el('div', 'pds-filter-panel__options');
    list.setAttribute('role', type === 'single' ? 'radiogroup' : 'group');
    list.setAttribute('aria-label', g.title || 'Header');
    (g.options || []).map(norm).forEach(op => list.appendChild(buildOption({ theme, type, label: op.label, selected: op.selected })));
    list.dataset.group = g.title || 'Header';
    return list;
  }

  /* .group light / .group dark — Section Header + options */
  function buildGroup(o = {}) {
    const theme = o.theme === 'dark' ? 'dark' : 'light';
    const type = o.type === 'single' ? 'single' : 'multiple';
    const wrap = el('div', 'pds-filter-panel__group');
    const id = 'pds-fp-g' + (++uid);
    const h = el('div', 'pds-filter-panel__section', esc(o.title || 'Header'));
    h.id = id;
    wrap.appendChild(h);
    const list = buildList({ title: o.title, options: o.options || Array(5).fill('Default Option') }, theme, type);
    list.removeAttribute('aria-label'); list.setAttribute('aria-labelledby', id);
    wrap.appendChild(list);
    return wrap;
  }

  function buttons(dark, extraCls) {
    const g = el('div', 'pds-button-group' + (extraCls ? ' ' + extraCls : ''));
    const d = dark ? ' pds-button--dark' : '';
    g.innerHTML = '<button type="button" class="pds-button pds-button--text pds-button--small' + d + '" data-fp="reset">reset</button>' +
      '<button type="button" class="pds-button pds-button--small' + d + '" data-fp="apply">apply</button>';
    return g;
  }

  function heading(tag, title) {
    const h = el(tag, 'pds-filter-panel__heading');
    h.innerHTML = '<span class="pds-icon pds-filter-panel__icon" aria-hidden="true">' + icon('nav-filter-10', ICON.filter) + '</span><span class="pds-filter-panel__title">' + esc(title || 'Filter') + '</span>';
    return h;
  }

  function searchField() {
    const s = el('div', 'pds-filter-panel__search');
    s.innerHTML = '<div class="pds-search-input"><div class="pds-search-input__field"><span class="pds-icon pds-search-input__icon" aria-hidden="true">' + icon('nav-search-10', ICON.search) + '</span>' +
      '<input class="pds-search-input__input" type="search" aria-label="Search options" placeholder="Search Input">' +
      '<button type="button" class="pds-search-input__clear" aria-label="Clear search" hidden><span class="pds-icon">' + icon('nav-close-tag', ICON.close) + '</span></button></div></div>';
    return s;
  }

  function build(o = {}) {
    const theme = o.theme === 'dark' ? 'dark' : 'light';
    const dark = theme === 'dark';
    let variant = o.variant || 'multiple';
    if (variant === 'single' && dark) variant = 'left';
    if (variant === 'left' && !dark) variant = 'single';
    const type = o.type === 'single' ? 'single' : 'multiple';
    const groups = (o.groups && o.groups.length ? o.groups : [{ title: 'Header', options: Array(5).fill('Default Option') }]);
    const root = el('div', 'pds-filter-panel pds-filter-panel--' + theme + ' pds-filter-panel--' + variant);
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', o.title || 'Filter');
    root.dataset.type = type;

    if (variant === 'single') {
      root.appendChild(buildGroup({ theme, type, title: groups[0].title, options: groups[0].options }));
    } else if (variant === 'left') {
      root.appendChild(heading('div', o.title)).classList.replace('pds-filter-panel__heading', 'pds-filter-panel__tab');
      const main = el('div', 'pds-filter-panel__main');
      main.appendChild(buildGroup({ theme, type, title: groups[0].title, options: groups[0].options }));
      main.appendChild(buttons(true, 'pds-filter-panel__footer'));
      root.appendChild(main);
    } else {
      const bar = el('div', 'pds-filter-panel__bar');
      bar.appendChild(heading('div', o.title));
      bar.appendChild(buttons(dark));
      root.appendChild(bar);
      const body = el('div', 'pds-filter-panel__body');
      const col = el('div', 'pds-filter-panel__groups');
      const pane = el('div', 'pds-filter-panel__pane');
      pane.id = 'pds-fp-pane' + (++uid);
      if (o.search !== false) pane.appendChild(searchField());
      const lists = el('div', 'pds-filter-panel__list pds-scroll pds-scroll--' + theme);
      pane.appendChild(lists);
      const openIdx = Math.min(Math.max(o.open | 0, 0), groups.length - 1);
      groups.forEach((g, i) => {
        const acc = window.pdsAccordion.build({ type: 'slideout', theme, open: i === openIdx, title: g.title || 'Header' });
        const p = acc.querySelector(':scope > .pds-accordion__panel'); if (p) p.remove();
        const btn = acc.querySelector('.pds-accordion__header');
        btn.setAttribute('aria-controls', pane.id);
        const count = el('span', 'pds-filter-panel__count');
        count.hidden = true;
        acc.querySelector('.pds-accordion__text').appendChild(count);
        acc.dataset.index = i;
        col.appendChild(acc);
        const list = buildList(g, theme, type);
        list.dataset.index = i;
        list.hidden = i !== openIdx;
        lists.appendChild(list);
      });
      body.appendChild(col);
      body.appendChild(pane);
      root.appendChild(body);
    }
    init(root);
    return root;
  }

  /* ── Behaviour ─────────────────────────────────────────────────── */
  function isOn(row) {
    const cb = row.querySelector('.pds-checkbox__input');
    return cb ? cb.checked : row.getAttribute('aria-checked') === 'true';
  }
  function setOn(row, on) {
    const cb = row.querySelector('.pds-checkbox__input');
    if (cb) cb.checked = on; else row.setAttribute('aria-checked', on ? 'true' : 'false');
  }
  function value(root) {
    const out = {};
    root.querySelectorAll('.pds-filter-panel__options').forEach(list => {
      out[list.dataset.group] = [...list.querySelectorAll('.pds-filter-panel__option')].filter(isOn).map(r => r.dataset.label);
    });
    return out;
  }
  function counts(root) {
    root.querySelectorAll('.pds-filter-panel__groups > .pds-accordion').forEach(acc => {
      const list = root.querySelector('.pds-filter-panel__options[data-index="' + acc.dataset.index + '"]');
      const n = list ? [...list.querySelectorAll('.pds-filter-panel__option')].filter(isOn).length : 0;
      const c = acc.querySelector('.pds-filter-panel__count');
      if (!c) return;
      c.textContent = n; c.hidden = n === 0;
      const btn = acc.querySelector('.pds-accordion__header');
      btn.setAttribute('aria-label', (list ? list.dataset.group : '') + (n ? ', ' + n + ' selected' : ''));
    });
  }
  function filter(root, q) {
    q = (q || '').trim().toLowerCase();
    root.querySelectorAll('.pds-filter-panel__list .pds-filter-panel__option').forEach(r => {
      r.hidden = !!q && !r.dataset.label.toLowerCase().includes(q);
    });
  }
  function clearSearch(root) {
    const input = root.querySelector('.pds-search-input__input');
    if (!input || !input.value) return;
    input.value = '';
    const clr = root.querySelector('.pds-search-input__clear'); if (clr) clr.hidden = true;
    filter(root, '');
  }
  function openGroup(root, i) {
    root.querySelectorAll('.pds-filter-panel__groups > .pds-accordion').forEach(acc => window.pdsAccordion.toggle(acc, +acc.dataset.index === i));
    root.querySelectorAll('.pds-filter-panel__list > .pds-filter-panel__options').forEach(l => { l.hidden = +l.dataset.index !== i; });
    clearSearch(root);
  }
  function reset(root) {
    root.querySelectorAll('.pds-filter-panel__option').forEach(r => setOn(r, false));
    clearSearch(root);
    counts(root);
  }
  const fire = (root, name, detail) => root.dispatchEvent(new CustomEvent('pds-filter-panel:' + name, { bubbles: true, detail }));

  function init(root) {
    if (!root || root.__pdsFilter) return;
    root.__pdsFilter = true;
    // Group headers (accordion.js toggles first; keep exactly one open)
    root.querySelectorAll('.pds-filter-panel__groups > .pds-accordion').forEach(acc => {
      acc.querySelector('.pds-accordion__header').addEventListener('click', () => openGroup(root, +acc.dataset.index));
    });
    // Options
    root.addEventListener('change', e => {
      const row = e.target.closest('.pds-filter-panel__option');
      if (!row || !e.target.matches('.pds-checkbox__input')) return;
      counts(root);
      fire(root, 'change', { group: row.parentElement.dataset.group, label: row.dataset.label, selected: e.target.checked, value: value(root) });
    });
    root.addEventListener('click', e => {
      const row = e.target.closest('.pds-filter-panel__option--single');
      if (row) {
        const on = !isOn(row);
        row.parentElement.querySelectorAll('.pds-filter-panel__option').forEach(r => setOn(r, false));
        setOn(row, on);
        counts(root);
        fire(root, 'change', { group: row.parentElement.dataset.group, label: row.dataset.label, selected: on, value: value(root) });
        return;
      }
      const b = e.target.closest('[data-fp]');
      if (!b) return;
      if (b.dataset.fp === 'reset') { reset(root); fire(root, 'reset', { value: value(root) }); }
      else fire(root, 'apply', { value: value(root) });
    });
    // Search within options (kit Search Input; its init wires the clear ×)
    // Not wired through pdsSearchInput.init: with no results panel its clear × handler
    // throws (search-input.js calls filter() on a null panel) — see Open issues.
    const si = root.querySelector('.pds-search-input');
    if (si) {
      const input = si.querySelector('.pds-search-input__input');
      const clr = si.querySelector('.pds-search-input__clear');
      input.addEventListener('input', () => { if (clr) clr.hidden = !input.value; filter(root, input.value); });
      if (clr) clr.addEventListener('click', () => { clearSearch(root); input.focus(); });
    }
    counts(root);
  }

  window.pdsFilterPanel = { build, buildGroup, buildOption, init, value, reset, open: openGroup };
})();
