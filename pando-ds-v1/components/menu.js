/* Pando DS V1 — Dropdown menu panels behaviour. Requires menu.css (+ checkbox.css, tag.css, scrollbar.css).

   pdsMenu.build(o) → menu element
     type      'single'  Dropdown Light · Single-Info · Single      (200, 36px rows)
               'check'   Dropdown Light · Single-Info · Multiple    (checkbox rows — always multi)
               'info'    Dropdown Light · Multi-Info               (52px rows, second line + Input Tag)
               'add'     Dropdown Light · Custom Add               (rows + "Add new")
               'table'   Dropdown list (400, table header + rows)  · Dropdown Light · Type=Table with flat:true
               'dark'    .Dropdown Dark                            (align 'left' | 'right')
     multiple  true → multi-select (info, table, dark). Menu stays open while picking.
     options   [{ label, value, sub, tag, selected, state:'hover' }]   (list types)
     align     'left' | 'right'   (dark only)
     table:    columns ['Header', …] · rows [{ cells:[…], tag, selected, disabled, alt }]
               usage 'recent' | 'search' | 'selected' · section 'Section Name'
               toggle { label:'Type', options:['Option 1', …], active: 0 | -1 } · flat true (body only)
     static    true → no click wiring (documentation)

   pdsMenu.attach(trigger, menu, { field, valueEl, placeholder, onChange(values, labels) })
     click / Enter / Space / ↓ / ↑ on the trigger opens · ↑ ↓ Home End move · Enter / Space pick ·
     Esc, Tab or a click outside closes · single pick closes, multi pick keeps it open.
     field (e.g. the .pds-input wrapper) gets pds-input--open / pds-input--filled;
     valueEl (e.g. .pds-input__value) shows the picked label(s).
   Events on the menu: 'pds-menu-change' {values, labels} · 'pds-menu-add' {label} · 'pds-menu-filter' {index, label}. */
(function () {
  let uid = 0;
  const CHECK = '<svg class="pds-menu__check" viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11.35 2.20C11.54 2.40 11.54 2.72 11.35 2.91L4.47 9.79C4.28 9.98 3.96 9.98 3.77 9.79L0.64 6.66C0.45 6.47 0.45 6.15 0.64 5.95C0.84 5.76 1.15 5.76 1.35 5.95L4.12 8.73L10.64 2.20C10.84 2.01 11.15 2.01 11.35 2.20Z"/></svg>'; /* icons/nav-selected.svg */
  const MULTI = '<svg viewBox="0 0 10 8" aria-hidden="true"><path fill="currentColor" d="M3.44 5.50L8.36 0.57C8.46 0.47 8.63 0.47 8.73 0.57L9.42 1.25C9.52 1.36 9.52 1.53 9.42 1.64L3.63 7.42C3.53 7.52 3.36 7.52 3.26 7.42L0.57 4.74C0.47 4.63 0.47 4.46 0.57 4.35L1.24 3.67C1.35 3.57 1.51 3.57 1.62 3.67L3.44 5.50Z"/></svg>'; /* icons/system-status-selected-multi.svg */
  const ADD = '<svg viewBox="0 0 10 10" aria-hidden="true"><path fill="currentColor" d="M5.5 9.54C5.5 9.79 5.27 10 5 10C4.75 10 4.55 9.83 4.50 9.62L4.5 9.54L4.5 0.45C4.5 0.20 4.72 0 5 0C5.24 0 5.44 0.16 5.49 0.37L5.5 0.45L5.5 9.54Z"/><path fill="currentColor" d="M9.54 4.5C9.79 4.5 10 4.72 10 5C10 5.24 9.83 5.44 9.62 5.49L9.54 5.5L0.45 5.5C0.20 5.5 0 5.27 0 5C0 4.75 0.16 4.55 0.37 4.50L0.45 4.5L9.54 4.5Z"/></svg>'; /* icons/action-add.svg (10px · Type=Add) */
  const ENTER = '<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.23 5.67C9.02 5.49 9.00 5.19 9.19 4.99L10.31 3.84H4.49C3.94 3.84 3.49 4.25 3.49 4.75V12.54C3.49 12.79 3.27 13.00 2.99 13.00C2.72 13.00 2.49 12.79 2.49 12.54V4.75C2.49 3.74 3.39 2.92 4.49 2.92H10.32L9.20 1.80L9.14 1.73C9.01 1.54 9.04 1.28 9.23 1.12C9.44 0.94 9.77 0.96 9.97 1.15L11.86 3.03L11.92 3.11C12.04 3.28 12.02 3.52 11.86 3.68L9.97 5.63L9.90 5.69C9.71 5.83 9.43 5.82 9.23 5.67Z"/></svg>'; /* icons/indicator-rotate-right-14.svg */
  const BOX = '<span class="pds-checkbox__box"><svg class="pds-checkbox__mark" viewBox="0 0 10 8" aria-hidden="true"><path d="M3.28 5.72L8.74.09c.12-.12.3-.12.41 0l.76.78c.12.12.12.32 0 .44L3.48 7.91c-.11.12-.3.12-.41 0L.09 4.85c-.12-.12-.12-.32 0-.44l.74-.78c.12-.12.3-.12.42 0z"/></svg><span class="pds-checkbox__dash"></span></span>';

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const checkbox = (label, on, dark) => `<span class="pds-checkbox${dark ? ' pds-checkbox--dark' : ''}"><input type="checkbox" class="pds-checkbox__input" tabindex="-1" aria-hidden="true"${on ? ' checked' : ''}>${BOX}${label != null ? `<span class="pds-checkbox__label">${esc(label)}</span>` : ''}</span>`;

  function optAttrs(n, o, id) {
    n.id = id; n.setAttribute('role', 'option');
    n.setAttribute('aria-selected', o.selected ? 'true' : 'false');
    if (o.disabled) n.setAttribute('aria-disabled', 'true');
    if (o.state === 'hover') n.classList.add('is-hover');
    n.dataset.value = o.value != null ? o.value : o.label;
    n.dataset.label = o.label;
    return n;
  }

  /* One list option, by menu type */
  function option(type, o, id, cfg) {
    let n;
    if (type === 'check') {
      n = el('li', 'pds-menu__option pds-menu__option--check', checkbox(o.label, o.selected, cfg.dark));
    } else if (type === 'info') {
      n = el('li', 'pds-menu__option pds-menu__option--info',
        `<span class="pds-menu__info"><span class="pds-menu__label">${esc(o.label)}</span><span class="pds-menu__sub">${esc(o.sub == null ? o.label : o.sub)}</span></span>` +
        (o.tag === false || (cfg.multiple && o.tag == null) ? '' : `<span class="pds-tag pds-tag--input"><span class="pds-tag__text">${esc(o.tag || 'Text')}</span></span>`) +
        (cfg.multiple ? CHECK : ''));
    } else if (type === 'text') {
      n = el('li', 'pds-menu__text', `<span class="pds-menu__label">${esc(o.label)}</span>${MULTI}`);
    } else {
      n = el('li', 'pds-menu__option', `<span class="pds-menu__label">${esc(o.label)}</span>`);
    }
    return optAttrs(n, o, id);
  }

  function section(text, dark) { const s = el('div', 'pds-menu__section' + (dark ? ' pds-menu__section--dark' : '')); s.textContent = text; s.setAttribute('role', 'presentation'); return s; }

  function bar(t, place, dark) {
    const b = el('div', 'pds-menu__bar' + (place === 'bottom' ? ' pds-menu__bar--bottom' : '') + (dark ? ' pds-menu__bar--dark' : ''));
    b.setAttribute('role', 'group'); b.setAttribute('aria-label', t.label || 'Type');
    b.innerHTML = `<span class="pds-menu__bar-label">${esc(t.label || 'Type')}</span><span class="pds-menu__pills">${(t.options || []).map((p, i) => `<button type="button" class="pds-menu__pill" aria-pressed="${i === t.active}">${esc(p)}</button>`).join('')}</span>`;
    return b;
  }

  function head(cols) {
    const h = el('div', 'pds-menu__head');
    h.setAttribute('role', 'presentation');
    h.innerHTML = cols.map((c, i) => `<span class="pds-menu__hcell">${i === 0 ? '<span class="pds-menu__hcell-spacer" aria-hidden="true"></span>' : ''}${esc(c)}</span>`).join('');
    return h;
  }

  function row(r, i, id) {
    const n = el('div', 'pds-menu__row' + (r.alt ?? i % 2 === 0 ? ' pds-menu__row--alt' : ''));
    n.innerHTML = r.cells.map((c, j) => `<span class="pds-menu__cell">${j === 0 ? checkbox(null, r.selected) : ''}<span class="pds-menu__cell-text">${esc(c)}</span>${j === 1 && r.tag ? `<span class="pds-tag"><span class="pds-tag__text">${esc(r.tag)}</span></span>` : ''}</span>`).join('');
    if (r.state === 'hover') n.classList.add('is-hover');
    return optAttrs(n, { ...r, label: r.cells[0] }, id);
  }

  function build(o = {}) {
    const id = 'pds-menu-' + (++uid);
    const type = o.type || 'single';
    const multiple = type === 'check' || !!o.multiple;
    let m, list;

    if (type === 'table') {
      m = el('div', 'pds-menu pds-menu--table' + (o.flat ? ' pds-menu--flat' : ''));
      const usage = o.usage || 'search';
      if (!o.flat) {
        if (usage === 'search') m.appendChild(bar(o.toggle || { label: 'Type', options: ['Option 1', 'Option 2', 'Option 3'], active: 0 }, 'top'));
        else m.appendChild(section(o.section || (usage === 'selected' ? 'Selected <Label>' : 'Section Name')));
        m.appendChild(head(o.columns || ['Header', 'Header', 'Header']));
      }
      list = el('div', 'pds-menu__body pds-scroll pds-scroll--light' + (usage === 'search' || o.flat ? '' : ' pds-menu__body--short'));
      (o.rows || []).forEach((r, i) => list.appendChild(row(r, i, id + '-o' + i)));
      m.appendChild(list);
      if (!o.flat && usage === 'recent') m.appendChild(bar(o.toggle || { label: 'Type', options: ['Option 1', 'Option 2', 'Option 3'], active: -1 }, 'bottom'));
    } else if (type === 'dark') {
      const right = o.align === 'right';
      const kind = multiple ? (right ? 'multi-right' : 'multi-left') : (right ? 'single-right' : 'single-left');
      m = el('div', 'pds-menu pds-menu--dark pds-menu--' + kind);
      list = el('ul', 'pds-menu__list pds-scroll pds-scroll--dark');
      const rowType = kind === 'multi-left' ? 'check' : kind === 'single-left' ? 'single' : 'text';
      (o.options || []).forEach((op, i) => list.appendChild(option(rowType, op, id + '-o' + i, { dark: true, multiple })));
      m.appendChild(list);
    } else {
      m = el('ul', 'pds-menu pds-scroll pds-scroll--light' + (type === 'info' ? ' pds-menu--info' : type === 'check' ? ' pds-menu--check' : type === 'add' ? ' pds-menu--add' : ''));
      list = m;
      (o.options || []).forEach((op, i) => m.appendChild(op.section ? section(op.section) : option(type, op, id + '-o' + i, { multiple })));
      if (type === 'add') {
        const nw = el('li', 'pds-menu__new', `<span class="pds-menu__new-field"><input class="pds-menu__new-input" type="text" aria-label="New option" value="${esc(o.addActive && o.static ? (o.newLabel || 'New Option') : '')}">${o.static ? `<span class="pds-menu__cursor${o.cursor === 'off' ? ' pds-menu__cursor--off' : ''}" aria-hidden="true">|</span>` : ''}</span><span class="pds-menu__hint" aria-hidden="true">${ENTER}ENTER</span>`);
        nw.setAttribute('role', 'presentation');
        nw.hidden = !o.addActive;
        if (o.static) nw.querySelector('input').readOnly = true;
        const add = el('li', 'pds-menu__add', `${ADD}<span>Add new</span>`);
        add.setAttribute('role', 'option'); add.setAttribute('aria-selected', 'false'); add.id = id + '-add'; add.dataset.add = '1';
        m.appendChild(nw); m.appendChild(add);
      }
    }

    list.id = id + '-list';
    list.setAttribute('role', 'listbox');
    if (multiple) list.setAttribute('aria-multiselectable', 'true');
    if (o.label) list.setAttribute('aria-label', o.label);
    m.id = id;
    m._listbox = list; m._multiple = multiple; m._type = type;
    if (!o.static) wire(m);
    return m;
  }

  /* ── Behaviour ─────────────────────────────────────────────── */
  const options = m => [...m._listbox.querySelectorAll('[role="option"]')].filter(n => n.getAttribute('aria-disabled') !== 'true' && !n.hidden);

  function values(m) {
    const sel = [...m._listbox.querySelectorAll('[role="option"][aria-selected="true"]')].filter(n => !n.dataset.add);
    return { values: sel.map(n => n.dataset.value), labels: sel.map(n => n.dataset.label) };
  }

  function setSelected(n, on) {
    n.setAttribute('aria-selected', on ? 'true' : 'false');
    const cb = n.querySelector('.pds-checkbox__input'); if (cb) cb.checked = on;
  }

  function select(m, n) {
    if (!n || n.getAttribute('aria-disabled') === 'true') return;
    if (n.dataset.add) { startAdd(m); return; }
    if (m._multiple) setSelected(n, n.getAttribute('aria-selected') !== 'true');
    else { m._listbox.querySelectorAll('[role="option"]').forEach(x => setSelected(x, x === n)); }
    m.dispatchEvent(new CustomEvent('pds-menu-change', { detail: values(m), bubbles: true }));
    if (!m._multiple && m._close) m._close(true);
  }

  /* Custom Add: Default → Active (New Option row + ENTER hint) → Enter adds the option */
  function startAdd(m) {
    const nw = m.querySelector('.pds-menu__new'); if (!nw) return;
    const input = nw.querySelector('input');
    nw.hidden = false; input.value = ''; input.focus();
    if (m._setActive) m._setActive(null);
  }
  function wireAdd(m) {
    const nw = m.querySelector('.pds-menu__new'); if (!nw) return;
    const input = nw.querySelector('input');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const label = input.value.trim(); if (!label) return;
        const i = m._listbox.querySelectorAll('[role="option"]').length;
        const n = option('single', { label }, m.id + '-n' + i, {});
        m._listbox.insertBefore(n, nw);
        nw.hidden = true;
        m.dispatchEvent(new CustomEvent('pds-menu-add', { detail: { label }, bubbles: true }));
        select(m, n);
        if (m._trigger && !m.hidden) m._trigger.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault(); e.stopPropagation();
        nw.hidden = true; if (m._trigger) m._trigger.focus();
      }
    });
  }

  function wire(m) {
    m.addEventListener('mousedown', e => { if (!e.target.closest('input, button')) e.preventDefault(); }); /* keep focus on the trigger */
    m._listbox.addEventListener('click', e => select(m, e.target.closest('[role="option"]')));
    m.querySelectorAll('.pds-menu__pills').forEach(g => g.addEventListener('click', e => {
      const p = e.target.closest('.pds-menu__pill'); if (!p) return;
      const all = [...g.children]; all.forEach(x => x.setAttribute('aria-pressed', x === p));
      m.dispatchEvent(new CustomEvent('pds-menu-filter', { detail: { index: all.indexOf(p), label: p.textContent }, bubbles: true }));
    }));
    wireAdd(m);
  }

  function attach(trigger, m, opts = {}) {
    const field = opts.field, valueEl = opts.valueEl;
    const placeholder = opts.placeholder || (valueEl ? valueEl.textContent : '');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', m._listbox.id);
    m.hidden = true; m._trigger = trigger;
    let active = null;

    const setActive = n => {
      if (active) active.classList.remove('is-active');
      active = n;
      if (n) { n.classList.add('is-active'); trigger.setAttribute('aria-activedescendant', n.id); n.scrollIntoView({ block: 'nearest' }); }
      else trigger.removeAttribute('aria-activedescendant');
    };
    m._setActive = setActive;
    const open = () => {
      if (!m.hidden) return;
      m.hidden = false; trigger.setAttribute('aria-expanded', 'true');
      if (field) field.classList.add('pds-input--open');
      const list = options(m);
      setActive(list.find(n => n.getAttribute('aria-selected') === 'true') || list[0] || null);
    };
    const close = refocus => {
      if (m.hidden) return;
      m.hidden = true; trigger.setAttribute('aria-expanded', 'false');
      if (field) field.classList.remove('pds-input--open');
      const nw = m.querySelector('.pds-menu__new'); if (nw) nw.hidden = true;
      setActive(null);
      if (refocus) trigger.focus();
    };
    m._close = close;
    const move = d => {
      const list = options(m); if (!list.length) return;
      let i = list.indexOf(active);
      i = d === 'first' ? 0 : d === 'last' ? list.length - 1 : (i + d + list.length) % list.length;
      setActive(list[i]);
    };

    trigger.addEventListener('click', () => { if (trigger.disabled) return; m.hidden ? open() : close(); });
    trigger.addEventListener('keydown', e => {
      if (trigger.disabled) return;
      const k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); if (m.hidden) open(); else move(k === 'ArrowDown' ? 1 : -1); }
      else if ((k === 'Home' || k === 'End') && !m.hidden) { e.preventDefault(); move(k === 'Home' ? 'first' : 'last'); }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); if (m.hidden) open(); else if (active) select(m, active); }
      else if (k === 'Escape' && !m.hidden) { e.preventDefault(); close(true); }
      else if (k === 'Tab') close(false);
    });
    document.addEventListener('mousedown', e => { if (!m.hidden && !m.contains(e.target) && !trigger.contains(e.target)) close(false); });

    m.addEventListener('pds-menu-change', e => {
      const { values: v, labels } = e.detail;
      if (valueEl) {
        valueEl.textContent = labels.length ? labels.join(', ') : placeholder;
        valueEl.classList.toggle('is-placeholder', !labels.length);
      }
      if (field) field.classList.toggle('pds-input--filled', labels.length > 0);
      if (opts.onChange) opts.onChange(v, labels);
    });
    return { open, close };
  }

  window.pdsMenu = { build, attach, values, parts: { section, bar, head, row, checkbox } };
})();
