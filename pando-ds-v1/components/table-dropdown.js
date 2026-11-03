/* Pando DS V1 — Table Dropdown behaviour. Requires table-dropdown.css + menu.css/menu.js,
   checkbox.css, tag.css (+ scrollbar.css). The list and its keyboard come from pdsMenu.

   pdsTableDropdown.build(o) → root element (.pds-table-dropdown)
     type         'none'      single select, picked row turns blue          (Type=None)
                  'checkbox'  multi select with kit checkboxes               (Type=Checkbox)
                  'multi'     multi select, ✓ on the right of picked rows    (Type=Multi-Selected)
     size         'small' (default, hugs its text) | 'large' (fills the cell)
     theme        'light' (default) | 'dark'  — Figma has no dark open list; the list stays light
     placeholder  default 'Select Option' (Figma sample)
     options      [{ label, value, selected, state:'hover' }]
     maxTags      multi: Input Tags shown before the "+ n" Multiselect Tag (default 2, as Figma)
     label        accessible name (default = placeholder)
     open         true → render open (documentation)
     static       true → no behaviour (documentation)
     onChange(values, labels)

   Behaviour (pdsMenu.attach): click / Enter / Space / ↓ / ↑ opens · ↑ ↓ Home End move ·
   Enter / Space pick · Esc, Tab or a click outside closes · single pick closes, multi stays open.
   Tag × removes that value. Event on the root: 'pds-table-dropdown-change' {values, labels}. */
(function () {
  const ARROW = '<svg class="pds-table-dropdown__arrow" viewBox="0 0 8 5" aria-hidden="true"><path d="M8 0L0 0L3.99 5L4 4.99L4.00 5L8 0Z" fill="currentColor"/></svg>'; /* icons/nav-dropdown-arrow-solid.svg */
  const CHECK = '<svg class="pds-table-dropdown__check" viewBox="0 0 10 8" aria-hidden="true"><path fill="currentColor" d="M3.44 5.50L8.36 0.57C8.46 0.47 8.63 0.47 8.73 0.57L9.42 1.25C9.52 1.36 9.52 1.53 9.42 1.64L3.63 7.42C3.53 7.52 3.36 7.52 3.26 7.42L0.57 4.74C0.47 4.63 0.47 4.46 0.57 4.35L1.24 3.67C1.35 3.57 1.51 3.57 1.62 3.67L3.44 5.50Z"/></svg>'; /* icons/system-status-selected-multi.svg */
  const X = '<svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M9.88 2.11C9.69 1.91 9.37 1.91 9.18 2.11L6.00 5.29L2.81 2.11L2.74 2.05C2.55 1.91 2.28 1.93 2.11 2.11C1.91 2.30 1.91 2.62 2.11 2.81L5.29 6.00L2.11 9.18L2.05 9.25C1.91 9.44 1.93 9.71 2.11 9.88C2.30 10.08 2.62 10.08 2.81 9.88L6.00 6.70L9.18 9.88L9.25 9.94C9.44 10.08 9.71 10.06 9.88 9.88C10.08 9.69 10.08 9.37 9.88 9.18L6.70 6.00L9.88 2.81L9.94 2.74C10.08 2.55 10.06 2.28 9.88 2.11Z"/></svg>'; /* icons/nav-close-tag.svg */

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

  function render(root) {
    const s = root._state, trig = root._trigger;
    const { values, labels } = window.pdsMenu.values(root._menu);
    trig.classList.remove('has-tags');
    if (!labels.length) {
      trig.innerHTML = `<span class="pds-table-dropdown__value is-placeholder">${esc(s.placeholder)}</span>${ARROW}`;
    } else if (!s.multiple) {
      trig.innerHTML = `<span class="pds-table-dropdown__value">${esc(labels[0])}</span>${ARROW}`;
    } else {
      const dark = s.theme === 'dark' ? ' pds-tag--dark' : '';
      const shown = labels.slice(0, s.maxTags), rest = labels.length - shown.length;
      trig.classList.add('has-tags');
      trig.innerHTML = `<span class="pds-table-dropdown__tags">${shown.map((l, i) =>
        `<span class="pds-tag pds-tag--input${dark}"><span class="pds-tag__text">${esc(l)}</span>` +
        `<button type="button" class="pds-tag__remove" tabindex="-1" aria-label="Remove ${esc(l)}" data-value="${esc(values[i])}">${X}</button></span>`).join('')}` +
        (rest > 0 ? `<span class="pds-tag pds-tag--count${dark}">+ ${rest}</span>` : '') + `</span>${ARROW}`;
    }
  }

  function build(o = {}) {
    const type = o.type === 'checkbox' || o.type === 'multi' ? o.type : 'none';
    const size = o.size === 'large' ? 'large' : 'small';
    const theme = o.theme === 'dark' ? 'dark' : 'light';
    const multiple = type !== 'none';
    const placeholder = o.placeholder || 'Select Option';

    const root = el('div', `pds-table-dropdown pds-table-dropdown--${size}${theme === 'dark' ? ' pds-table-dropdown--dark' : ''}`);
    root.dataset.type = type;
    const trig = el('div', 'pds-table-dropdown__trigger');
    trig.setAttribute('role', 'combobox');
    trig.tabIndex = 0;
    trig.setAttribute('aria-label', o.label || placeholder);

    const menu = window.pdsMenu.build({
      type: type === 'checkbox' ? 'check' : 'single',
      multiple: type === 'multi',
      options: o.options || [],
      label: o.label || placeholder,
      static: !!o.static
    });
    menu.classList.add('pds-table-dropdown__menu');
    if (type === 'checkbox') menu.classList.add('pds-table-dropdown__menu--check');
    if (type === 'multi') {
      menu.classList.add('pds-table-dropdown__menu--multi');
      menu.querySelectorAll('.pds-menu__option').forEach(n => n.insertAdjacentHTML('beforeend', CHECK));
    }

    root.appendChild(trig); root.appendChild(menu);
    root._trigger = trig; root._menu = menu;
    root._state = { type, size, theme, multiple, placeholder, maxTags: o.maxTags == null ? 2 : o.maxTags };
    render(root);

    const changed = () => {
      render(root);
      const v = window.pdsMenu.values(menu);
      root.dispatchEvent(new CustomEvent('pds-table-dropdown-change', { detail: v, bubbles: true }));
      if (o.onChange) o.onChange(v.values, v.labels);
    };

    if (o.static) {
      trig.setAttribute('aria-haspopup', 'listbox');
      trig.setAttribute('aria-expanded', o.open ? 'true' : 'false');
      trig.setAttribute('aria-controls', menu._listbox.id);
      menu.hidden = !o.open;
      return root;
    }

    root._api = window.pdsMenu.attach(trig, menu, {});
    menu.addEventListener('pds-menu-change', changed);

    /* Tag × — deselect that value without opening the list */
    trig.addEventListener('click', e => {
      const x = e.target.closest('.pds-tag__remove'); if (!x) return;
      e.stopImmediatePropagation();
      const n = [...menu.querySelectorAll('[role="option"]')].find(n => n.dataset.value === x.dataset.value);
      if (n) {
        n.setAttribute('aria-selected', 'false');
        const cb = n.querySelector('.pds-checkbox__input'); if (cb) cb.checked = false;
        menu.dispatchEvent(new CustomEvent('pds-menu-change', { detail: window.pdsMenu.values(menu), bubbles: true }));
      }
      trig.focus();
    }, true);

    if (o.open) root._api.open();
    return root;
  }

  window.pdsTableDropdown = {
    build,
    values: root => window.pdsMenu.values(root._menu),
    open: root => root._api && root._api.open(),
    close: root => root._api && root._api.close(false)
  };
})();
