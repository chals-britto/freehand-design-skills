/* Pando DS V1 — Subheader Menu + Sort behaviour. Requires menu-panels.css, menu.css + menu.js,
   toggle.css + toggle.js (Delivery Type Toggle Tab), icons.css.

   pdsMenuPanels.subheader(o) → element   (Figma "Subheader Menu" 2312:5082)
     label     trigger text (Figma sample 'Subheader Active')
     options   ['Option 1', 'Option 2', 'Option 3'] or [{ label, value }]
     active    index of the Active option (row filled #E9F1F5)
     static    true → drawn open, no behaviour (documentation)
     showValue true → the trigger shows the picked label (build choice, see menu-panels.md)
     onChange(value, label)
   Behaviour comes from pdsMenu.attach (menu.js): click / Enter / Space / ↓ opens, ↑ ↓ Home End move,
   Enter / Space picks and closes, Esc / Tab / outside click closes. Arrow flips with aria-expanded.

   pdsMenuPanels.sort(o) → element   (Figma "Sort-1" 2312:5216)
     title     tab text ('Filter By')
     groups    [{ label, options:[{ label, value, icon:'contract'|'open'|'no-freight'|'market' }],
                  toggle:['FTL','PTL'], toggleActive:0, selected:index }]
     open      true → panel starts open · static true → open, no behaviour
   The tab toggles the panel (aria-expanded). Esc closes and returns focus to the tab; outside click closes.
   Each group is one radiogroup (single selection): click / Space / Enter selects; ←/↑ and →/↓ move
   (wrapping, selection does NOT follow focus), Home / End. Fires bubbling 'pds-change'
   { group, index, value, label } on the panel. The Toggle Tab fires toggle.js's own 'pds-change'. */
(function () {
  let uid = 0;
  /* SVGs copied from components/icons/ (currentColor) */
  const ARROW_DOWN = '<svg class="pds-menu-panels__arrow pds-menu-panels__arrow--down" viewBox="0 0 8 5" aria-hidden="true"><path d="M8 0L0 0L3.99 5L4 4.99L4.00 5L8 0Z" fill="currentColor"/></svg>'; /* icons/nav-dropdown-arrow-solid.svg */
  const ARROW_UP = '<svg class="pds-menu-panels__arrow pds-menu-panels__arrow--up" viewBox="0 0 8 5" aria-hidden="true"><path d="M8 5L0 5L3.99 0L4 0.00L4.00 0L8 5Z" fill="currentColor"/></svg>'; /* icons/nav-dropdown-arrow-inverse-solid.svg */
  /* Sort-1 "Arrow 1": a 7px vector line with an arrow-lines cap, not an icon instance */
  const TAB_ARROW = '<svg viewBox="0 0 7 8" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 0.5V7.5M0.5 4.5L3.5 7.5L6.5 4.5"/></svg>';
  const ICONS = {
    contract: '<svg viewBox="0 0 14 14" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.60 2.70C13.69 2.66 13.79 2.67 13.87 2.74C13.95 2.80 14 2.90 14 3.02V9.82C14 10.01 13.86 10.16 13.70 10.16H12.85C12.48 10.16 12.13 9.94 11.92 9.60L11.18 10.08C11.21 10.45 11.08 10.83 10.79 11.09C10.59 11.27 10.37 11.35 10.16 11.33C10.07 11.56 9.90 11.75 9.68 11.88C9.44 12.02 9.18 12.06 8.95 12.01C8.84 12.29 8.65 12.52 8.41 12.64C8.18 12.76 7.92 12.77 7.68 12.66C7.45 12.88 7.13 12.88 7.00 12.88C6.66 12.88 6.22 12.69 5.98 12.50C5.72 12.30 4.42 11.15 3.33 10.09C3.18 9.94 2.84 9.64 2.51 9.36C2.49 9.34 2.47 9.33 2.45 9.31C2.31 9.18 2.17 9.06 2.06 8.96C1.84 9.28 1.50 9.48 1.14 9.48H0.29C0.13 9.48 0 9.33 0 9.14V2.34C0 2.22 0.04 2.12 0.12 2.06C0.20 1.99 0.30 1.98 0.39 2.02L2.76 3.02C3.06 3.15 3.29 3.40 3.42 3.73C3.49 3.90 3.53 4.07 3.53 4.25C3.78 4.23 4.09 4.20 4.42 4.17C4.94 4.11 5.47 4.06 5.85 4.05C6.79 3.22 7.61 3.15 8.59 3.73C9.34 4.19 10.10 4.47 10.51 4.61L10.51 4.60C10.52 4.54 10.54 4.48 10.57 4.41C10.70 4.08 10.93 3.83 11.23 3.71L13.60 2.70ZM10.14 10.61C10.20 10.69 10.34 10.64 10.44 10.55C10.50 10.49 10.70 10.29 10.56 10.00C10.30 9.49 9.35 8.58 8.52 7.77L8.52 7.77C8.03 7.31 7.58 6.87 7.24 6.49C7.03 6.61 6.85 6.69 6.57 6.74C6.25 7.20 5.70 7.44 5.29 7.44C5.09 7.44 4.93 7.39 4.79 7.29C4.55 7.12 4.41 6.86 4.38 6.56C4.31 5.89 4.81 5.18 5.14 4.78C4.92 4.80 4.70 4.82 4.47 4.84C4.07 4.88 3.69 4.92 3.41 4.94L2.32 8.34C2.44 8.45 2.62 8.60 2.80 8.77C3.15 9.07 3.54 9.41 3.70 9.57C4.81 10.66 6.10 11.77 6.30 11.93C6.47 12.06 6.80 12.20 7.00 12.20C7.04 12.20 7.10 12.20 7.14 12.19C6.70 11.71 6.13 10.99 5.93 10.75C5.82 10.61 5.83 10.39 5.94 10.27C6.06 10.14 6.25 10.14 6.36 10.28C6.52 10.49 7.36 11.53 7.78 11.95C7.94 12.09 8.09 12.06 8.18 12.02C8.30 11.95 8.40 11.82 8.45 11.66C7.96 11.16 7.10 10.08 7.09 10.06C6.99 9.93 6.99 9.71 7.11 9.58C7.23 9.46 7.41 9.46 7.52 9.60C7.72 9.86 8.60 10.94 8.95 11.27C8.95 11.27 8.95 11.27 8.95 11.28C8.96 11.28 8.96 11.28 8.96 11.28C8.96 11.28 8.96 11.28 8.96 11.28C8.96 11.28 8.97 11.28 8.97 11.29C9.04 11.37 9.23 11.38 9.42 11.27C9.48 11.24 9.60 11.15 9.63 11.00C9.20 10.53 8.11 9.21 7.97 9.05C7.86 8.91 7.87 8.70 7.98 8.57C8.10 8.44 8.28 8.44 8.39 8.58C8.97 9.28 9.91 10.4 10.11 10.59C10.12 10.59 10.12 10.59 10.12 10.60C10.12 10.60 10.13 10.60 10.13 10.61C10.13 10.61 10.13 10.61 10.13 10.61C10.14 10.61 10.14 10.61 10.14 10.61Z" fill="currentColor"/></svg>', /* icons/status-indent-type-contract.svg */
    open: '<svg viewBox="0 0 14 14" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.62 6.65L5.62 6.65L8.92 6.65C9.13 6.66 9.31 6.75 9.45 6.90C9.58 7.03 9.65 7.19 9.68 7.36L9.69 7.50V12.59C9.69 12.83 9.61 13.03 9.45 13.19C9.33 13.32 9.18 13.40 9.01 13.43L8.88 13.44H0.80C0.58 13.44 0.39 13.36 0.23 13.19C0.10 13.06 0.03 12.91 0.00 12.73L0 12.59V7.50C0 7.26 0.07 7.06 0.23 6.90C0.36 6.77 0.50 6.69 0.67 6.66L0.80 6.65L5.62 6.65ZM4.75 10.21C4.41 10.21 4.14 10.50 4.14 10.86C4.14 11.02 4.19 11.18 4.29 11.29L4.05 12.22H5.46L5.22 11.29C5.31 11.17 5.37 11.02 5.37 10.86C5.37 10.50 5.10 10.21 4.75 10.21ZM10.23 1C11.26 1 12.15 1.38 12.89 2.16C13.55 2.85 13.92 3.68 13.98 4.63L14 4.95V7.22C14 7.37 13.94 7.50 13.84 7.61C13.76 7.70 13.66 7.75 13.56 7.77L13.46 7.78H12.92C12.77 7.78 12.65 7.73 12.54 7.61C12.46 7.53 12.41 7.44 12.39 7.33L12.38 7.22V4.95C12.38 4.33 12.17 3.80 11.75 3.35C11.33 2.91 10.82 2.69 10.23 2.69C9.63 2.69 9.12 2.91 8.70 3.35C8.34 3.73 8.14 4.18 8.08 4.69L8.07 4.95L8.07 5.81H6.46L6.46 4.95C6.46 3.97 6.76 3.12 7.35 2.39L7.56 2.16C8.30 1.38 9.19 1 10.23 1V1Z" fill="currentColor"/></svg>', /* icons/status-indent-type-open.svg */
    'no-freight': '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M13.24 1.00L13.25 10.69V11.13C13.25 11.31 13.19 11.48 13.10 11.62L13.10 11.64C12.97 11.80 12.81 11.92 12.62 11.98L12.48 12.00V13.01C12.48 13.50 12.13 13.91 11.68 13.98L11.52 14H11.22C11.06 14 10.91 13.96 10.78 13.88L10.65 13.80C10.45 13.65 10.31 13.43 10.27 13.17L10.26 13.01V12.01H3.98V13.01C3.98 13.50 3.64 13.91 3.18 13.98L3.02 14H2.72L2.57 13.98C2.16 13.91 1.84 13.58 1.77 13.17L1.76 13.01V12.00L1.62 11.98L1.54 11.94L1.57 11.92L3.74 9.89C3.91 10.08 4.16 10.20 4.43 10.20C4.94 10.20 5.35 9.77 5.35 9.25C5.35 9.00 5.26 8.78 5.11 8.61L7.14 6.71L7.25 6.71L7.26 6.71H9.14L11.30 6.71L10.84 3.73L10.76 3.31L13.24 1.00ZM12.12 0L9.08 2.84L3.55 2.84L3.44 3.46L3.44 3.46L2.95 6.71L4.94 6.71L1 10.41L1.00 0.88C1.00 0.45 1.30 0.09 1.70 0.01L1.86 0.00L12.12 0ZM9.93 8.30C9.42 8.30 9.00 8.72 9.00 9.25C9.00 9.77 9.42 10.20 9.93 10.20C10.44 10.20 10.85 9.77 10.85 9.25C10.85 8.72 10.44 8.30 9.93 8.30Z" fill="currentColor"/></svg>', /* icons/status-indent-type-no-freight.svg */
    market: '<svg viewBox="0 0 14 14" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.71 2.02C9.25 1.37 9.90 1 10.59 1C12.47 1 14 3.78 14 7.22C14 10.65 12.47 13.44 10.59 13.44C9.89 13.44 9.25 13.06 8.71 12.41L0.48 8.63C-0.16 7.92 -0.16 6.51 0.48 5.81L8.71 2.02ZM5.12 12.17C5.43 12.32 5.81 12.23 6.01 11.97L6.19 11.74L7.23 12.21C7.20 12.25 7.17 12.29 7.14 12.33L7.14 12.33L7.14 12.33C6.81 12.76 6.37 13.33 5.43 13.33C4.99 13.33 4.80 13.24 3.83 12.79C3.63 12.69 3.39 12.58 3.11 12.45C2.04 11.96 2.04 11.01 2.04 10.18C2.04 10.07 2.04 9.97 2.04 9.86L3.17 10.38L3.18 10.50C3.18 10.82 3.19 11.02 3.27 11.17C3.39 11.39 3.68 11.52 4.38 11.84L4.38 11.84C4.59 11.93 4.84 12.04 5.12 12.17ZM8.33 7.22C8.33 10.09 9.54 12.32 10.59 12.32C11.63 12.32 12.85 10.09 12.85 7.22C12.85 4.34 11.63 2.11 10.59 2.11C9.54 2.11 8.33 4.34 8.33 7.22ZM9.13 5.61C9.11 5.61 9.09 5.61 9.07 5.61C8.93 6.02 8.84 6.49 8.82 7.01C8.82 7.07 8.82 7.14 8.82 7.20C8.82 7.81 8.92 8.37 9.09 8.82C9.09 8.82 9.10 8.82 9.11 8.83C9.11 8.83 9.12 8.83 9.13 8.83C10.04 8.83 10.78 8.11 10.78 7.22C10.78 6.33 10.04 5.61 9.13 5.61Z" fill="currentColor"/></svg>' /* icons/status-indent-type-market.svg */
  };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

  /* ── Subheader Menu ─────────────────────────────────────────── */
  function subheader(o = {}) {
    const id = 'pds-menu-panels-' + (++uid);
    const opts = (o.options || ['Option 1', 'Option 2', 'Option 3']).map((x, i) => {
      const op = typeof x === 'string' ? { label: x } : Object.assign({}, x);
      op.selected = i === (o.active == null ? 0 : o.active);
      return op;
    });
    const root = el('div', 'pds-menu-panels pds-menu-panels--subheader' + (o.static ? ' pds-menu-panels--static' : ''));
    const trig = el('button', 'pds-menu-panels__trigger', `<span class="pds-menu-panels__label">${esc(o.label || 'Subheader Active')}</span>${ARROW_DOWN}${ARROW_UP}`);
    trig.type = 'button'; trig.id = id + '-trigger';
    const menu = window.pdsMenu.build({ type: 'single', options: opts, static: !!o.static, label: o.label || 'Subheader Active' });
    menu.classList.add('pds-menu-panels__list');
    root.append(trig, menu);
    if (o.static) {
      trig.setAttribute('aria-expanded', 'true');
      trig.setAttribute('aria-haspopup', 'listbox');
      trig.tabIndex = -1;
      return root;
    }
    window.pdsMenu.attach(trig, menu, {
      valueEl: o.showValue ? trig.querySelector('.pds-menu-panels__label') : null,
      onChange: (v, l) => { if (o.onChange) o.onChange(v[0], l[0]); }
    });
    return root;
  }

  /* ── Sort-1 ─────────────────────────────────────────────────── */
  function radios(g) { return [...g.querySelectorAll('.pds-menu-panels__option')]; }

  function check(panel, g, opt) {
    const list = radios(g);
    list.forEach(x => { const on = x === opt; x.setAttribute('aria-checked', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1; });
    panel.dispatchEvent(new CustomEvent('pds-change', { bubbles: true, detail: { group: g.dataset.group, index: list.indexOf(opt), value: opt.dataset.value, label: opt.dataset.label } }));
  }

  function wireGroup(panel, g) {
    g.addEventListener('click', e => { const o = e.target.closest('.pds-menu-panels__option'); if (o) check(panel, g, o); });
    g.addEventListener('keydown', e => {
      const list = radios(g), i = list.indexOf(document.activeElement); if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = list[(i + 1) % list.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = list[(i - 1 + list.length) % list.length];
      else if (e.key === 'Home') n = list[0];
      else if (e.key === 'End') n = list[list.length - 1];
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); check(panel, g, list[i]); return; }
      if (n) { e.preventDefault(); list.forEach(x => x.tabIndex = x === n ? 0 : -1); n.focus(); }
    });
  }

  function sort(o = {}) {
    const id = 'pds-menu-panels-' + (++uid);
    const groups = o.groups || [
      { label: 'Indent Type', options: [{ label: 'Contract', icon: 'contract' }, { label: 'Open', icon: 'open' }, { label: 'No Freight', icon: 'no-freight' }, { label: 'Market', icon: 'market' }] },
      { label: 'Delivery Type', toggle: ['FTL', 'PTL'], toggleActive: 0, options: [{ label: 'All' }, { label: 'Air' }, { label: 'Road' }, { label: 'Rail' }] }
    ];
    const root = el('div', 'pds-menu-panels pds-menu-panels--sort');
    const tab = el('button', 'pds-menu-panels__tab', `<span>${esc(o.title || 'Filter By')}</span>${TAB_ARROW}`);
    tab.type = 'button';
    const panel = el('div', 'pds-menu-panels__panel');
    panel.id = id + '-panel';
    groups.forEach((gr, gi) => {
      const sid = `${id}-s${gi}`;
      const sec = el('div', 'pds-menu-panels__section'); sec.id = sid; sec.textContent = gr.label;
      panel.appendChild(sec);
      if (gr.toggle) {
        const wrap = el('div', 'pds-menu-panels__toggle');
        const tg = el('div', 'pds-toggle-tab pds-toggle-tab--dark');
        tg.setAttribute('role', 'radiogroup'); tg.setAttribute('aria-label', gr.label + ' mode');
        gr.toggle.forEach((t, ti) => {
          const b = el('button', 'pds-toggle-tab__option'); b.type = 'button'; b.textContent = t;
          const on = ti === (gr.toggleActive || 0);
          b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1;
          tg.appendChild(b);
        });
        wrap.appendChild(tg); panel.appendChild(wrap);
      }
      const g = el('div', 'pds-menu-panels__grid');
      g.setAttribute('role', 'radiogroup'); g.setAttribute('aria-labelledby', sid); g.dataset.group = gr.label;
      g.style.setProperty('--rows', Math.ceil(gr.options.length / 2));
      gr.options.forEach((op, oi) => {
        const b = el('button', 'pds-menu-panels__option', (op.icon && ICONS[op.icon] ? `<span class="pds-icon pds-icon--12">${ICONS[op.icon]}</span>` : '') + `<span>${esc(op.label)}</span>`);
        b.type = 'button'; b.setAttribute('role', 'radio');
        const on = oi === gr.selected;
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on || (gr.selected == null && oi === 0) ? 0 : -1;
        b.dataset.value = op.value != null ? op.value : op.label; b.dataset.label = op.label;
        g.appendChild(b);
      });
      panel.appendChild(g);
      if (!o.static) wireGroup(panel, g);
    });
    root.append(tab, panel);
    if (o.static) { tab.tabIndex = -1; panel.querySelectorAll('button').forEach(b => b.tabIndex = -1); return root; }

    tab.setAttribute('aria-expanded', 'false'); tab.setAttribute('aria-controls', panel.id);
    const setOpen = on => { panel.hidden = !on; tab.setAttribute('aria-expanded', on ? 'true' : 'false'); };
    setOpen(!!o.open);
    tab.addEventListener('click', () => setOpen(panel.hidden));
    root.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); setOpen(false); tab.focus(); } });
    document.addEventListener('mousedown', e => { if (!panel.hidden && !root.contains(e.target)) setOpen(false); });
    root._setOpen = setOpen;
    return root;
  }

  window.pdsMenuPanels = { subheader, sort, icons: ICONS };
})();
