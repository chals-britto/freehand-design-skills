/* Pando DS V1 — Filter By behaviour. Requires filter-by.css and the kit atoms:
   icons/icons-data.js, toggle.js (switch), dropdown.js (option list),
   calendar.js (+ timepicker.js for Show Time). Nothing here re-implements an atom.

   Builders (each returns an element; static:true → markup only, for docs)
   pdsFilterBy.pill(o)    Filter By                     → .pds-filter-by-item
     type        'dropdown' (default) | 'search' | 'toggle'
     label       'Label'                    value  '' → State=Empty
     placeholder 'Select' (dropdown) | 'Search' (search)       — Figma copy
     theme       'light' | 'dark'           (Toggle and Search Hover exist in Light only)
     hover       true → draw the Hover state (docs)
     on          toggle: true = Filled (Yes)
     groups      kit dropdown groups  [{ label, options:[{ label, value }] }]
     multiple    true → multi-select list, value shows the labels joined by ", "
     search      search-header placeholder for type 'search' (kit sample "Search for Depot")
   pdsFilterBy.bar(o)     Dropdown Filters             → .pds-filter-bar   { filters:[pill o], more:{…} }
   pdsFilterBy.more(o)    More Filters                 → .pds-filter-more  { open, reset:true, filters:[pill o] }
   pdsFilterBy.select(o)  Data Selection Dropdown Filter → .pds-filter-by-item  { label (→ With Label), value, placeholder, groups }
   pdsFilterBy.date(o)    .Date and Time               → .pds-filter-date
     type     'date' (Date Selection) | 'range' (Date Range) | 'time' | 'metrics'
     label    'Delivery Date :'   showLabel true   showTime false   nav false (Right & Left Navigation)   reset false
     date     'YYYY-MM-DD' | ['YYYY-MM-DD','YYYY-MM-DD']    text  shown text (default formatted date)
     time     '10:00 AM'          countdown '0:00:00' / timeLabel 'Bid Ends' (type 'time')
     metrics  [{ tag:'Wt.', qty:'0', unit:'mt.' }, …] , metricsLabel 'selected :'

   Helpers
   pdsFilterBy.setValue(item, labels)   pdsFilterBy.clear(item)
   pdsFilterBy.clearAll(scope)          clears every pill / select / date inside scope
   pdsFilterBy.applied(scope)           → [{ label, value, item }] for every filled filter

   Events (bubble): 'pds-filter-change' { label, value, values }  ·  'pds-filter-reset' (from More Filters Reset)
   Open lists close on pick (single), outside click or Esc (kit dropdown behaviour). */
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function icon(n) {
    const i = (window.PDS_ICONS || []).find(x => x.n === n);
    return i ? i.svg.replace(/\s(width|height)="[^"]*"/g, '').replace('<svg', '<svg aria-hidden="true" focusable="false"') : '';
  }
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmt(iso) { // 'YYYY-MM-DD' → "01 Jan '23" (Figma sample format)
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return '';
    return `${m[3]} ${MON[+m[2] - 1]} '${m[1].slice(2)}`;
  }
  const isoOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const toDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  function emit(node, detail) { node.dispatchEvent(new CustomEvent('pds-filter-change', { bubbles: true, detail })); }

  /* ── Filter By pill ─────────────────────────────────────────── */
  function pill(o = {}) {
    const type = o.type || 'dropdown';
    const dark = o.theme === 'dark';
    const label = o.label == null ? 'Label' : o.label;
    const item = el('<span class="pds-filter-by-item"></span>');
    item.dataset.filterType = type;
    item.dataset.label = label;
    if (type === 'toggle') {
      const on = !!o.on;
      item.innerHTML = `<span class="pds-filter-by pds-filter-by--toggle${dark ? ' pds-filter-by--dark' : ''}${o.hover ? ' is-hover' : ''}" role="group" aria-label="${esc(label)}">` +
        `<span class="pds-filter-by__label">${esc(label)}</span><span class="pds-filter-by__colon" aria-hidden="true">:</span>` +
        `<button type="button" class="pds-toggle${dark ? ' pds-toggle--dark' : ''}" role="switch" aria-checked="${on}" aria-label="${esc(label)}">` +
        `<span class="pds-toggle__track"><span class="pds-toggle__knob"></span></span><span class="pds-toggle__text" aria-hidden="true">${on ? 'Yes' : 'No'}</span></button></span>`;
      item._initial = on;
      if (!o.static) item.addEventListener('pds-change', e => {
        e.stopPropagation();
        emit(item, { label, value: e.detail.checked ? 'Yes' : '', values: e.detail.checked ? ['Yes'] : [] });
      });
      return item;
    }
    const ph = o.placeholder || (type === 'search' ? 'Search' : 'Select');
    const value = o.value || '';
    item.dataset.placeholder = ph;
    item.innerHTML = `<button type="button" class="pds-filter-by${value ? '' : ' pds-filter-by--empty'}${dark ? ' pds-filter-by--dark' : ''}${o.hover ? ' is-hover' : ''}">` +
      (type === 'search' ? `<span class="pds-filter-by__search">${icon('nav-search-10')}</span>` : '') +
      `<span class="pds-filter-by__label">${esc(label)}</span><span class="pds-filter-by__colon" aria-hidden="true">:</span>` +
      `<span class="pds-filter-by__value">${esc(value || ph)}</span>` +
      (type === 'search' ? '' : `<span class="pds-filter-by__caret">${icon('nav-dropdown-arrow-stroke')}</span>`) +
      `</button>`;
    if (!o.static) wireList(item, item.firstElementChild, o, type === 'search' ? (o.search || 'Search for Depot') : '');
    return item;
  }

  /* Kit dropdown list under a trigger (Filter By pill or Data Selection) */
  function wireList(item, trigger, o, search) {
    if (!window.pdsDropdown || !o.groups) return;
    const host = el('<div class="pds-filter-by__menu"></div>');
    const menu = pdsDropdown.build({ search, groups: o.groups, multiple: !!o.multiple });
    host.appendChild(menu); item.appendChild(host);
    item._menu = menu;
    pdsDropdown.attach(trigger, menu, { onChange: (values, labels) => setValue(item, labels, values) });
  }

  function setValue(item, labels, values) {
    labels = [].concat(labels || []).filter(Boolean);
    const kind = item.dataset.filterType;
    if (kind === 'toggle') {
      const sw = item.querySelector('.pds-toggle');
      window.pdsToggle ? pdsToggle.setChecked(sw, labels.length > 0) : sw.setAttribute('aria-checked', String(labels.length > 0));
      emit(item, { label: item.dataset.label, value: labels.length ? 'Yes' : '', values: labels.length ? ['Yes'] : [] });
      return;
    }
    if (kind === 'date') return;
    const text = labels.join(', ');
    const isSelect = kind === 'select';
    const v = item.querySelector(isSelect ? '.pds-filter-select__value' : '.pds-filter-by__value');
    v.textContent = text || item.dataset.placeholder;
    if (!isSelect) item.querySelector('.pds-filter-by').classList.toggle('pds-filter-by--empty', !text);
    if (!labels.length && item._menu) item._menu.querySelectorAll('[role="option"]').forEach(n => n.setAttribute('aria-selected', 'false'));
    emit(item, { label: item.dataset.label || '', value: text, values: values || labels });
  }

  function clear(item) {
    if (item.dataset.filterType === 'date') { item._reset && item._reset(); return; }
    setValue(item, []);
  }
  function clearAll(scope) { scope.querySelectorAll('.pds-filter-by-item').forEach(clear); }
  function applied(scope) {
    const out = [];
    scope.querySelectorAll('.pds-filter-by-item').forEach(item => {
      const k = item.dataset.filterType;
      if (k === 'toggle') { if (item.querySelector('.pds-toggle').getAttribute('aria-checked') === 'true') out.push({ label: item.dataset.label, value: 'Yes', item }); return; }
      const v = item.querySelector(k === 'select' ? '.pds-filter-select__value' : '.pds-filter-by__value');
      if (v && v.textContent !== item.dataset.placeholder) out.push({ label: item.dataset.label || '', value: v.textContent, item });
    });
    return out;
  }

  /* ── Dropdown Filters bar ───────────────────────────────────── */
  function bar(o = {}) {
    const b = el('<div class="pds-filter-bar" data-filter-scope></div>');
    (o.filters || []).forEach(f => b.appendChild(pill(Object.assign({ static: o.static }, f))));
    if (o.more) b.appendChild(more(Object.assign({ static: o.static }, o.more)));
    return b;
  }

  /* ── More Filters ───────────────────────────────────────────── */
  function more(o = {}) {
    const open = !!o.open, reset = o.reset !== false;
    const m = el(`<div class="pds-filter-more" data-state="${open ? 'open' : 'closed'}">` +
      `<button type="button" class="pds-filter-more__toggle" aria-label="More Filters" aria-expanded="${open}"${open ? ' hidden' : ''}>${icon('nav-filter-10')}</button>` +
      `<div class="pds-filter-more__filters"${open ? '' : ' hidden'}></div>` +
      `<button type="button" class="pds-button pds-button--text pds-button--small pds-filter-more__reset"${open && reset ? '' : ' hidden'}><span class="pds-button__label">Reset</span></button>` +
      `<button type="button" class="pds-filter-more__close" aria-label="Close"${open ? '' : ' hidden'}>${icon('nav-close-tag')}</button></div>`);
    const box = m.querySelector('.pds-filter-more__filters');
    (o.filters || [{}]).forEach(f => box.appendChild(pill(Object.assign({ static: o.static }, f))));
    if (o.static) return m;
    const tg = m.querySelector('.pds-filter-more__toggle'), rs = m.querySelector('.pds-filter-more__reset'), cl = m.querySelector('.pds-filter-more__close');
    const set = st => {
      const isOpen = st === 'open'; m.dataset.state = st;
      tg.hidden = isOpen; tg.setAttribute('aria-expanded', String(isOpen));
      box.hidden = !isOpen; rs.hidden = !(isOpen && reset); cl.hidden = !isOpen;
      (isOpen ? (box.querySelector('button') || cl) : tg).focus();
    };
    tg.addEventListener('click', () => set('open'));
    cl.addEventListener('click', () => set('closed'));
    rs.addEventListener('click', () => {
      clearAll(m.closest('[data-filter-scope]') || m);
      m.dispatchEvent(new CustomEvent('pds-filter-reset', { bubbles: true }));
    });
    m.pdsSetState = set;
    return m;
  }

  /* ── Data Selection Dropdown Filter ─────────────────────────── */
  function select(o = {}) {
    const ph = o.placeholder || '<Filter by>';
    const item = el('<span class="pds-filter-by-item"></span>');
    item.dataset.filterType = 'select'; item.dataset.placeholder = ph; item.dataset.label = o.label || '';
    item.innerHTML = `<button type="button" class="pds-filter-select${o.label ? ' pds-filter-select--labelled' : ''}">` +
      (o.label ? `<span class="pds-filter-select__label">${esc(o.label)}</span><span class="pds-filter-select__colon" aria-hidden="true">:</span>` : '') +
      `<span class="pds-filter-select__value">${esc(o.value || ph)}</span><span class="pds-filter-select__arrow">${icon('nav-dropdown-arrow-stroke')}</span></button>`;
    if (!o.static) wireList(item, item.firstElementChild, o, o.search || '');
    return item;
  }

  /* ── .Date and Time ─────────────────────────────────────────── */
  function date(o = {}) {
    const type = o.type || 'date';
    if (type === 'time') {
      return el(`<div class="pds-filter-date pds-filter-date--time"><span class="pds-filter-date__time-label">${esc(o.timeLabel || 'Bid Ends')}</span>` +
        `<span class="pds-filter-date__countdown">${esc(o.countdown || '0:00:00')}</span></div>`);
    }
    if (type === 'metrics') {
      const ms = o.metrics || [{ tag: 'Wt.', qty: '0', unit: 'mt.' }, { tag: 'Vol.', qty: '0', unit: 'cbm.' }, { tag: 'Qty', qty: '0', unit: 'pcs.' }];
      return el(`<div class="pds-filter-date pds-filter-date--metrics"><span class="pds-filter-date__metrics-label">${esc(o.metricsLabel || 'selected :')}</span><span class="pds-filter-date__metrics">` +
        ms.map(x => `<span class="pds-filter-date__metric"><span class="pds-tag pds-tag--purple"><span class="pds-tag__text">${esc(x.tag)}</span></span>` +
          `<span class="pds-filter-date__metric-value"><span class="pds-filter-date__qty">${esc(x.qty)}</span>${x.unit ? `<span class="pds-filter-date__unit">${esc(x.unit)}</span>` : ''}</span></span>`).join('') +
        `</span></div>`);
    }
    const range = type === 'range';
    const showLabel = o.showLabel !== false, label = o.label || 'Delivery Date :';
    const iso = o.date || (range ? ['2024-01-01', '2024-01-07'] : '2023-01-01');
    const textOf = v => range ? `${fmt(v[0])} - ${fmt(v[1])}` : fmt(v);
    const text = o.text || (range ? "01 Jan '24 - 07 Jan ‘24" : "01 Jan '23"); // Figma sample text, as drawn
    const time = o.time || '10:00 AM';
    const node = el(`<div class="pds-filter-date pds-filter-date--${range ? 'range' : 'date'}" data-filter-type="date">` +
      (range && o.nav ? `<button type="button" class="pds-filter-date__shift pds-filter-date__shift--prev" aria-label="Previous">${icon('nav-right-caret')}</button>` : '') +
      (showLabel ? `<span class="pds-filter-date__label">${esc(label)}</span>` : '') +
      `<span class="pds-filter-by-item" data-filter-type="date"><button type="button" class="pds-filter-date__trigger" aria-haspopup="dialog" aria-expanded="false"${showLabel ? '' : ` aria-label="${esc(label.replace(/\s*:\s*$/, ''))}"`}>` +
      `<span class="pds-filter-date__icon">${icon('nav-calendar-input')}</span><span class="pds-filter-date__text">${esc(text)}</span>` +
      (o.showTime ? `<span aria-hidden="true">-</span><span class="pds-filter-date__time">${esc(time)}</span>` : '') +
      `</button></span>` +
      (range && o.nav ? `<button type="button" class="pds-filter-date__shift pds-filter-date__shift--next" aria-label="Next">${icon('nav-right-caret')}</button>` : '') +
      (o.reset ? `<span class="pds-filter-date__divider" aria-hidden="true"></span><button type="button" class="pds-button pds-button--text pds-button--small pds-filter-date__reset"><span class="pds-button__label">Reset</span></button>` : '') +
      `</div>`);
    if (o.static || !window.pdsCalendar) return node;

    const item = node.querySelector('.pds-filter-by-item'), trig = item.firstElementChild;
    const tx = node.querySelector('.pds-filter-date__text'), tm = node.querySelector('.pds-filter-date__time');
    const initial = { iso: [].concat(iso), text, time };
    let cur = [].concat(iso);
    const host = el('<div class="pds-filter-by__menu"></div>');
    const cal = pdsCalendar.build({ mode: range ? 'range' : 'single', months: 1, showTime: !!o.showTime, value: range ? cur : cur[0], time });
    cal.classList.add('pds-calendar--popup'); cal.setAttribute('role', 'dialog'); cal.setAttribute('aria-label', label.replace(/\s*:\s*$/, ''));
    host.hidden = true; host.appendChild(cal); item.appendChild(host);
    const outside = e => { if (!item.contains(e.target)) close(false); };
    function open() { host.hidden = false; trig.setAttribute('aria-expanded', 'true'); document.addEventListener('pointerdown', outside, true); const f = cal.querySelector('.pds-calendar__day[tabindex="0"]'); f && f.focus(); }
    function close(refocus = true) { if (host.hidden) return; host.hidden = true; trig.setAttribute('aria-expanded', 'false'); document.removeEventListener('pointerdown', outside, true); if (refocus) trig.focus(); }
    function show(v, t) {
      cur = v; tx.textContent = textOf(v);
      if (tm && t) tm.textContent = t;
      emit(node, { label: label.replace(/\s*:\s*$/, ''), value: tx.textContent + (tm ? ' - ' + tm.textContent : ''), values: v.slice() });
    }
    pdsCalendar.init(cal, {
      onApply(v) { const nv = range ? [v.start, v.end] : [v.date]; if (nv[0]) show(nv, v.time); close(); },
      onCancel() { close(); }
    });
    trig.addEventListener('click', () => (host.hidden ? open() : close()));
    node.addEventListener('keydown', e => { if (e.key === 'Escape' && !host.hidden) close(); });
    // Right & Left Navigation: move the range by its own length
    node.querySelectorAll('.pds-filter-date__shift').forEach(b => b.addEventListener('click', () => {
      const s = toDate(cur[0]), e = toDate(cur[1] || cur[0]); const span = Math.round((e - s) / 864e5) + 1, dir = b.classList.contains('pds-filter-date__shift--prev') ? -1 : 1;
      s.setDate(s.getDate() + dir * span); e.setDate(e.getDate() + dir * span);
      const nv = [isoOf(s), isoOf(e)]; pdsCalendar.setValue(cal, nv); show(nv);
    }));
    node._reset = item._reset = () => {
      cur = initial.iso.slice(); tx.textContent = initial.text; if (tm) tm.textContent = initial.time;
      pdsCalendar.setValue(cal, range ? cur : cur[0]);
      emit(node, { label: label.replace(/\s*:\s*$/, ''), value: '', values: [] });
    };
    const rb = node.querySelector('.pds-filter-date__reset'); if (rb) rb.addEventListener('click', node._reset);
    return node;
  }

  window.pdsFilterBy = { pill, bar, more, select, date, setValue, clear, clearAll, applied, icon, fmt };
})();
