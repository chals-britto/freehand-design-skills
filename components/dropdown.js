/* Pando DS V1 — Dropdown behaviour. Requires dropdown.css.

   pdsDropdown.build(o) → menu element (closed trigger is NOT built here;
   use "Input – Dropdown Select" from the Inputs page)
     o.search      placeholder for the search header ('' / omit → no search)
     o.groups      [{ label, options:[{ label, value, selected, disabled, sub, icon }] }]
                   label '' → no group header
     o.panel       true → rich 400px panel (rows with icon circle, from the loose frames)
     o.multiple    true → multi-select: list stays open, check marks on rows
     o.icon        'region' | 'depot' — icon circle for panel rows
     o.emptyText   message when search finds nothing   (copy to be confirmed)
     o.loading     true → shows o.loadingText instead of options (copy to be confirmed)

   pdsDropdown.attach(trigger, menu, { onChange(values, labels) })
     click trigger → open / close · click outside or Esc → close ·
     single select: pick closes the menu · multi select: menu stays open.
   Keyboard navigation (arrow keys, focus ring) is deferred to the a11y pass. */
(function () {
  const ICON = {
    region: '<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M3.53769 1.60239C1.48744 3.73891 1.48744 7.20289 3.53769 9.3394L6.90941 12.853C7.09751 13.049 7.40249 13.049 7.59059 12.853L10.9623 9.3394C13.0126 7.20289 13.0126 3.73891 10.9623 1.60239C8.91206 -0.534129 5.58794 -0.534129 3.53769 1.60239ZM10.4332 2.47889C11.9535 4.23243 11.9028 6.93959 10.2811 8.62955L7.25 11.7883L4.21888 8.62955C2.54484 6.88507 2.54484 4.05672 4.21888 2.31224C5.89292 0.567761 8.60708 0.567761 10.2811 2.31224L10.4332 2.47889ZM7.25 3C6.2835 3 5.5 3.7835 5.5 4.75C5.5 5.7165 6.2835 6.5 7.25 6.5C8.2165 6.5 9 5.7165 9 4.75C9 3.7835 8.2165 3 7.25 3ZM7.25 4C7.66421 4 8 4.33579 8 4.75C8 5.16421 7.66421 5.5 7.25 5.5C6.83579 5.5 6.5 5.16421 6.5 4.75C6.5 4.33579 6.83579 4 7.25 4Z"/></svg>',
    depot: '<svg viewBox="9 9 12 12" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.21639 12.8602L14.6931 9.08822C14.8633 8.971 15.088 8.97056 15.2587 9.0871L20.782 12.8591C20.9184 12.9523 21 13.1068 21 13.272V20.5C21 20.7761 20.7761 21 20.5 21H9.5C9.22386 21 9 20.7761 9 20.5V13.272C9 13.1075 9.08091 12.9535 9.21639 12.8602ZM20 13.535L14.977 10.106L10 13.534V20H11.6603V16.811C11.6603 16.5656 11.8371 16.3614 12.0704 16.3191L12.1603 16.311H17.8397C18.0852 16.311 18.2893 16.4879 18.3317 16.7212L18.3397 16.811V20H20V13.535ZM17.3397 20H12.6603L12.66 17.311H17.339L17.3397 20ZM18.3397 14.4865C18.3397 14.2103 18.1193 13.9865 17.8474 13.9865H12.1526L12.0641 13.9945C11.8344 14.0368 11.6603 14.241 11.6603 14.4865C11.6603 14.7626 11.8807 14.9865 12.1526 14.9865H17.8474L17.9359 14.9784C18.1656 14.9361 18.3397 14.7319 18.3397 14.4865Z"/></svg>'
  };
  const CHECK = '<svg class="pds-dropdown__check" viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11.3536 2.20895C11.5488 2.40421 11.5488 2.72079 11.3536 2.91605L4.47855 9.79105C4.28329 9.98632 3.96671 9.98632 3.77145 9.79105L0.646447 6.66605C0.451184 6.47079 0.451184 6.15421 0.646447 5.95895C0.841709 5.76368 1.15829 5.76368 1.35355 5.95895L4.125 8.73039L10.6464 2.20895C10.8417 2.01368 11.1583 2.01368 11.3536 2.20895Z"/></svg>';
  let uid = 0;

  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function option(o, cfg) {
    let n;
    if (cfg.panel) {
      n = el('div', 'pds-dropdown__row' + (o.sub ? ' pds-dropdown__row--two-line' : ''));
      const ic = el('span', 'pds-dropdown__row-icon' + ((o.icon || cfg.icon) === 'depot' ? ' pds-dropdown__row-icon--depot' : ''));
      ic.innerHTML = ICON[o.icon || cfg.icon || 'region'];
      n.appendChild(ic);
      const tx = el('span', 'pds-dropdown__row-text');
      tx.appendChild(el('span', 'pds-dropdown__row-title', o.label));
      if (o.sub) tx.appendChild(el('span', 'pds-dropdown__row-sub', o.sub));
      n.appendChild(tx);
      n.insertAdjacentHTML('beforeend', CHECK);
    } else {
      n = el('div', 'pds-dropdown__option', o.label);
    }
    n.setAttribute('role', 'option');
    n.setAttribute('aria-selected', o.selected ? 'true' : 'false');
    if (o.disabled) n.setAttribute('aria-disabled', 'true');
    n.dataset.value = o.value != null ? o.value : o.label;
    n.dataset.label = o.label;
    return n;
  }

  function build(o = {}) {
    const id = 'pds-dd-' + (++uid);
    const m = el('div', 'pds-dropdown' + (o.panel ? ' pds-dropdown--panel' : ''));
    m.id = id;
    if (o.search) {
      const s = el('div', 'pds-dropdown__search');
      const i = el('input', 'pds-dropdown__search-input');
      i.type = 'search'; i.placeholder = o.search; i.setAttribute('aria-label', o.search); i.setAttribute('aria-controls', id + '-list');
      s.appendChild(i); m.appendChild(s);
      i.addEventListener('input', () => filter(m, i.value));
    }
    const list = el('div', 'pds-dropdown__list');
    list.id = id + '-list';
    list.setAttribute('role', 'listbox');
    if (o.multiple) list.setAttribute('aria-multiselectable', 'true');
    if (o.loading) {
      list.setAttribute('aria-busy', 'true');
      list.appendChild(el('div', 'pds-dropdown__empty', o.loadingText || ''));
    } else {
      (o.groups || []).forEach(g => {
        if (g.label) { const h = el('div', 'pds-dropdown__group', g.label); h.setAttribute('role', 'presentation'); list.appendChild(h); }
        if (o.panel) { g.options.forEach(op => list.appendChild(option(op, o))); }
        else {
          const box = el('div', 'pds-dropdown__options'); box.setAttribute('role', 'group');
          if (g.label) box.setAttribute('aria-label', g.label);
          g.options.forEach(op => box.appendChild(option(op, o)));
          list.appendChild(box);
        }
      });
      const empty = el('div', 'pds-dropdown__empty', o.emptyText || ''); empty.hidden = true; empty.setAttribute('role', 'status');
      list.appendChild(empty);
    }
    m.appendChild(list);
    m._multiple = !!o.multiple;
    list.addEventListener('click', e => {
      const n = e.target.closest('[role="option"]');
      if (!n || n.getAttribute('aria-disabled') === 'true') return;
      select(m, n);
    });
    return m;
  }

  /* Hide options that don't match; hide group headers left with no options; show empty message. */
  function filter(m, q) {
    q = q.trim().toLowerCase();
    let any = false;
    m.querySelectorAll('[role="option"]').forEach(n => { const hit = !q || n.dataset.label.toLowerCase().includes(q); n.hidden = !hit; if (hit) any = true; });
    m.querySelectorAll('.pds-dropdown__options').forEach(b => {
      const vis = [...b.children].some(c => !c.hidden);
      b.hidden = !vis;
      const h = b.previousElementSibling; if (h && h.classList.contains('pds-dropdown__group')) h.hidden = !vis;
    });
    const e = m.querySelector('.pds-dropdown__empty'); if (e && !m.querySelector('[aria-busy]')) e.hidden = any;
  }

  function values(m) {
    const sel = [...m.querySelectorAll('[role="option"][aria-selected="true"]')];
    return { values: sel.map(n => n.dataset.value), labels: sel.map(n => n.dataset.label) };
  }

  function select(m, n) {
    if (m._multiple) n.setAttribute('aria-selected', n.getAttribute('aria-selected') === 'true' ? 'false' : 'true');
    else { m.querySelectorAll('[role="option"]').forEach(x => x.setAttribute('aria-selected', 'false')); n.setAttribute('aria-selected', 'true'); }
    const v = values(m);
    m.dispatchEvent(new CustomEvent('pds-dropdown-change', { detail: v, bubbles: true }));
    if (!m._multiple && m._close) m._close();
  }

  function attach(trigger, m, opts = {}) {
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', m.id);
    m.hidden = true;
    const open = () => {
      m.hidden = false; trigger.setAttribute('aria-expanded', 'true');
      const s = m.querySelector('.pds-dropdown__search-input'); if (s) { s.value = ''; filter(m, ''); s.focus(); }
    };
    const close = () => { if (m.hidden) return; m.hidden = true; trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); };
    m._close = close;
    trigger.addEventListener('click', () => (m.hidden ? open() : close()));
    document.addEventListener('mousedown', e => { if (!m.hidden && !m.contains(e.target) && !trigger.contains(e.target)) { m.hidden = true; trigger.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) close(); });
    m.addEventListener('pds-dropdown-change', e => { opts.onChange && opts.onChange(e.detail.values, e.detail.labels); });
    return { open, close };
  }

  window.pdsDropdown = { build, attach, filter, values };
})();
