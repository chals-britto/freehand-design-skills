/* Pando DS V1 — Calendar behaviour. Requires calendar.css + button.css.
   Optional: timepicker.js (the Time field opens the kit Timepicker), input.js (attach target).

   pdsCalendar.build(options) → HTMLElement (.pds-calendar)
     type        'month' (default) | 'year' | 'day' | 'multi'          ← Figma Type
     months      1 | 2                                                  ← Month Type Single / Double
     mode        'single' | 'range'                                     ← Range Selected
     theme       'light' | 'dark'   (Figma has Dark for Month only)
     showTime    true → Date + Time fields (Month · Single), times row (Multi Date)  ← Show Time / With Time
     value       'YYYY-MM-DD' | ['YYYY-MM-DD','YYYY-MM-DD'] | 2024 (year) | 15 | 'last' (day)
     view        'YYYY-MM' first month shown (default: the value, else today)
     today       'YYYY-MM-DD' (default: the real today)
     min, max    'YYYY-MM-DD' · disabled(date) → true  — drawn as Disabled=Yes, Range=Yes
     time        '10:00 AM' (Figma sample)          times ['10:00 AM','12:00 PM','3:30 PM']
     selectors   ['Creation Date', …] (.Date Selector tabs, Multi Date)  selector 0
     presets     [{label:'Next 3 Days', days:3}, …] (Day · Double)
     cancelSize  'small' (default) | 'normal'  (Figma: Normal on Light · Double · Range)
     static      true → markup only, no behaviour (docs)

   pdsCalendar.init(el, { onApply(value), onCancel(), onChange(value) })
     Grid keyboard (added in review — Figma is static):
       ← → ↑ ↓   previous / next day, week (year: ±1 / ±4)
       PageUp / PageDown   previous / next month (Shift: year; year view: 20 years)
       Home / End          start / end of the week row
       Enter / Space       select       Esc   Cancel
     Range: first pick sets the start, second the end (swapped if earlier).

   pdsCalendar.getValue(el)  → { date | start,end | year | day, text, time?, selector? }
   pdsCalendar.setValue(el, value)

   pdsCalendar.attach(input, options) → { el, open(), close() }
     input   the <input> inside a kit .pds-input (or the wrapper)
     Opens under the field on click or ArrowDown. Apply writes the text
     (DD-MM-YYYY, Figma's format; ranges "DD-MM-YYYY – DD-MM-YYYY") and fires
     input + change. Cancel, Esc or a click outside closes without changing it. */
(function () {
  let uid = 0;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const CARET = '<svg viewBox="0 0 5 8" aria-hidden="true"><path d="M1.20 0.5L0.5 1.24L3.10 4L0.50 6.75L1.20 7.5L4.16 4.37L4.5 4L4.16 3.62L1.20 0.5Z" fill="currentColor"/></svg>'; // icons/nav-right-caret.svg
  const YEAR0 = 2009, YEARS = 20; // Figma page "2009 - 2028"

  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const D = (y, m, d) => new Date(y, m, d);
  const iso = d => d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : null;
  const fmt = d => d ? `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}` : '';
  const same = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const addDays = (d, n) => D(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const addMonths = (d, n) => { const t = D(d.getFullYear(), d.getMonth() + n, 1); const last = D(t.getFullYear(), t.getMonth() + 1, 0).getDate(); return D(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last)); };
  const first = d => D(d.getFullYear(), d.getMonth(), 1);
  function parse(v) {
    if (v instanceof Date) return D(v.getFullYear(), v.getMonth(), v.getDate());
    if (typeof v !== 'string') return null;
    let m = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/.exec(v);
    if (m) return valid(+m[1], +m[2] - 1, +m[3]);
    m = /^\s*(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})\s*$/.exec(v); // DD-MM-YYYY (Figma)
    if (m) return valid(+m[3], +m[2] - 1, +m[1]);
    return null;
  }
  function valid(y, m, d) { const t = D(y, m, d); return t.getMonth() === m && t.getDate() === d ? t : null; }
  const yearPage = y => YEAR0 + Math.floor((y - YEAR0) / YEARS) * YEARS;

  /* ── Build ──────────────────────────────────────────────────── */
  function build(o = {}) {
    const id = 'pdscal' + (++uid);
    const type = o.type || 'month';
    const months = type === 'multi' ? 2 : (o.months || 1);
    const mode = o.mode || (type === 'multi' ? 'range' : 'single');
    const dark = o.theme === 'dark';
    const wide = type === 'multi' || type === 'day';
    const showTime = o.showTime !== undefined ? !!o.showTime : (type === 'month' && months === 1);
    const st = {
      id, type, months, mode, dark, wide, showTime, static: !!o.static,
      today: parse(o.today) || parse(new Date()),
      min: parse(o.min), max: parse(o.max), disabledFn: o.disabled || null,
      start: null, end: null, year: null, day: null, focus: null,
      time: o.time == null ? '10:00 AM' : o.time,
      tabs: null, tab: 0
    };
    const el = document.createElement('div');
    el._cal = st;
    el.id = id;
    el.className = 'pds-calendar' + (months === 2 ? ' pds-calendar--double' : '') + (wide ? ' pds-calendar--wide' : '') +
      (type === 'multi' ? ' pds-calendar--multi' : '') + (type === 'day' ? ' pds-calendar--day' : '') + (type === 'year' ? ' pds-calendar--year' : '') + (dark ? ' pds-calendar--dark' : '');
    if (!o.static) { el.setAttribute('role', 'group'); el.setAttribute('aria-label', o.label || (type === 'year' ? 'Choose year' : type === 'day' && months === 1 ? 'Choose day' : 'Choose date')); }

    const btn = (act, label, primary, size) => `<button type="button" class="pds-button ${primary ? '' : 'pds-button--text '}${size === 'normal' ? '' : 'pds-button--small'}${dark && !primary ? ' pds-button--dark' : ''}" data-act="${act}"><span class="pds-button__label">${esc(label)}</span></button>`;
    const L = Object.assign({ reset: 'Reset', now: 'Now', today: 'Today', apply: 'Apply', cancel: 'Cancel' }, o.labels);
    const nav = dir => `<button type="button" class="pds-calendar__nav pds-calendar__nav--${dir}" data-nav="${dir === 'prev' ? -1 : 1}" aria-label="${dir === 'prev' ? 'Previous' : 'Next'} ${type === 'year' ? YEARS + ' years' : 'month'}">${CARET}</button>`;

    let head = '';
    if (!(type === 'day' && months === 1)) {
      head = `<div class="pds-calendar__head">${nav('prev')}<div class="pds-calendar__titles">` +
        Array.from({ length: months }, () => '<h3 class="pds-calendar__title" aria-live="polite"></h3>').join('') + `</div>${nav('next')}</div>`;
    }
    const monthsHTML = `<div class="pds-calendar__months"></div>`;
    let body = '', foot = '';

    if (type === 'month' && months === 1) {
      const fields = showTime
        ? `<div class="pds-calendar__divider" role="presentation"></div><div class="pds-calendar__fields">` +
          `<div class="pds-calendar__fieldwrap"><input class="pds-calendar__field" data-field="date" aria-label="Date (DD-MM-YYYY)" autocomplete="off" placeholder="DD-MM-YYYY"></div>` +
          `<div class="pds-calendar__fieldwrap"><input class="pds-calendar__field" data-field="time" aria-label="Time" autocomplete="off" value="${esc(st.time)}"></div></div>`
        : '';
      body = `<div class="pds-calendar__body">${monthsHTML}${fields}</div>`;
      foot = `<div class="pds-calendar__actions"><div class="pds-calendar__secondary">${btn('reset', L.reset)}${btn('now', L.now)}</div>${btn('apply', L.apply, true)}</div>`;
    } else if (type === 'year') {
      body = `<div class="pds-calendar__body">${monthsHTML}<div class="pds-calendar__divider" role="presentation"></div></div>`;
      foot = `<div class="pds-calendar__actions"><div class="pds-calendar__secondary">${btn('reset', L.reset)}${btn('today', L.today)}</div>${btn('apply', L.apply, true)}</div>`;
    } else if (type === 'day' && months === 1) {
      body = `<div class="pds-calendar__body">${monthsHTML}<div class="pds-calendar__chips"><button type="button" class="pds-calendar__selector pds-calendar__selector--chip" data-day="last" aria-pressed="false">${esc(o.lastLabel || 'Last Day of Month')}</button></div></div>`;
      foot = `<div class="pds-calendar__actions"><div class="pds-calendar__secondary">${btn('reset', L.reset)}</div>${btn('apply', L.apply, true)}</div>`;
    } else {
      // Double month: Month · Double, Day · Double (presets), Multi Date (± times)
      body = monthsHTML;
      const right = `<div class="pds-calendar__actions">${btn('cancel', L.cancel, false, o.cancelSize)}${btn('apply', L.apply, true)}</div>`;
      let extras = '';
      if (type === 'day') {
        const presets = o.presets || [{ label: 'Next 3 Days', days: 3 }, { label: 'Next 7 Days', days: 7 }, { label: 'Next 1 Month', months: 1 }];
        extras = `<div class="pds-calendar__extras"><div class="pds-calendar__presets">` +
          presets.map((p, i) => `<button type="button" class="pds-calendar__field" data-preset="${i}" aria-pressed="false">${esc(p.label)}</button>`).join('') + `</div></div>`;
        st.presets = presets;
      } else if (type === 'multi' && showTime) {
        const times = o.times || ['10:00 AM', '12:00 PM', '3:30 PM'];
        extras = `<div class="pds-calendar__extras"><p class="pds-calendar__time-label" id="${id}-tl">Select Time</p><div class="pds-calendar__presets">` +
          times.map((t, i) => `<input class="pds-calendar__field pds-calendar__field--time" data-time="${i}" value="${esc(t)}" size="${Math.max(4, t.length)}" aria-labelledby="${id}-tl" aria-label="Time ${i + 1}">`).join('') + `</div></div>`;
      }
      foot = `<div class="pds-calendar__divider" role="presentation"></div>` +
        (extras ? `<div class="pds-calendar__foot">${extras}${right.replace('pds-calendar__actions', 'pds-calendar__actions pds-calendar__actions--end')}</div>` : right);
    }

    let inner = head + body + foot;
    if (type === 'multi') {
      const sels = o.selectors || ['Creation Date', 'Vehicle Requirement Date', 'Dispatch Date'];
      st.tabs = sels.map(() => ({ start: null, end: null }));
      st.tab = o.selector || 0;
      st.selectors = sels;
      inner = `<div class="pds-calendar__tabs" role="tablist" aria-label="Date type">` +
        sels.map((s, i) => `<button type="button" class="pds-calendar__selector" role="tab" data-tab="${i}" aria-selected="${i === st.tab}" tabindex="${i === st.tab ? 0 : -1}">${esc(s)}</button>`).join('') +
        `</div><div class="pds-calendar__panel">${inner}</div>`;
    }
    el.innerHTML = inner;

    setValue(el, o.value, true);
    st.view = first(parse(o.view && o.view.length === 7 ? o.view + '-01' : o.view) || st.start || st.today);
    if (type === 'year') st.page = yearPage(st.year || st.today.getFullYear());
    render(el);
    if (o.static) el.querySelectorAll('button, input').forEach(b => { b.tabIndex = -1; });
    return el;
  }

  /* ── State helpers ──────────────────────────────────────────── */
  function isDisabled(st, d) {
    return (st.min && d < st.min) || (st.max && d > st.max) || (st.disabledFn ? !!st.disabledFn(d) : false);
  }
  function setValue(el, v, quiet) {
    const st = el._cal;
    st.start = st.end = null; st.year = null; st.day = null;
    if (v == null || v === '') { if (!quiet) render(el); return; }
    if (st.type === 'year') st.year = +v;
    else if (st.type === 'day' && st.months === 1) st.day = v === 'last' ? 'last' : +v;
    else if (Array.isArray(v)) { st.start = parse(v[0]); st.end = parse(v[1]); }
    else st.start = parse(v);
    if (st.tabs) st.tabs[st.tab] = { start: st.start, end: st.end };
    if (!quiet) {
      if (st.start) st.view = first(st.start);
      if (st.year) st.page = yearPage(st.year);
      render(el);
    }
  }

  function getValue(el) {
    const st = el._cal;
    if (st.type === 'year') return { year: st.year, text: st.year ? String(st.year) : '' };
    if (st.type === 'day' && st.months === 1) return { day: st.day, text: st.day === 'last' ? el.querySelector('[data-day="last"]').textContent : (st.day ? String(st.day) : '') };
    const out = {};
    if (st.mode === 'range') {
      out.start = iso(st.start); out.end = iso(st.end || st.start);
      out.text = st.start ? fmt(st.start) + ' – ' + fmt(st.end || st.start) : '';
    } else { out.date = iso(st.start); out.text = fmt(st.start); }
    const tf = el.querySelector('[data-field="time"]');
    if (tf) out.time = tf.value;
    if (st.selectors) out.selector = st.selectors[st.tab];
    const times = el.querySelectorAll('[data-time]');
    if (times.length) out.times = [...times].map(t => t.value);
    return out;
  }

  /* ── Render ─────────────────────────────────────────────────── */
  function cellHTML(st, d, cls, label, text, focusKey, extra = '') {
    const sel = /is-selected/.test(cls);
    const off = /is-outside|is-disabled/.test(cls);
    return `<div class="pds-calendar__cell ${cls}" role="gridcell" aria-selected="${sel}"${off ? ' aria-disabled="true"' : ''}>` +
      `<button type="button" class="pds-calendar__day" tabindex="${focusKey ? 0 : -1}" aria-label="${esc(label)}"${extra}>${text}</button></div>`;
  }

  function monthHTML(st, m0, idx) {
    const y = m0.getFullYear(), m = m0.getMonth();
    const days = D(y, m + 1, 0).getDate();
    const off = (D(y, m, 1).getDay() + 6) % 7;
    const rows = Math.ceil((off + days) / 7);
    const lo = st.start && st.end && st.end < st.start ? st.end : st.start;
    const hi = st.start && st.end && st.end < st.start ? st.start : st.end;
    let cells = '';
    for (let i = 0; i < rows * 7; i++) {
      if (i % 7 === 0) cells += '<div class="pds-calendar__row" role="row">';
      const d = D(y, m, i - off + 1);
      const inMonth = d.getMonth() === m;
      if (!inMonth) {
        // compact grid (.Weekdays & Weeks) shows neighbours as Disabled; wide grids hide them (Figma)
        cells += st.wide || (st.months === 2 && idx === 0 && i >= off + days) || (st.months === 2 && idx === 1 && i < off)
          ? '<div class="pds-calendar__cell is-empty" role="gridcell"></div>'
          : cellHTML(st, d, 'is-outside', d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(), d.getDate(), false, ' disabled');
      } else {
        let c = [];
        if (isDisabled(st, d)) c.push('is-disabled');
        if (st.mode === 'range' && lo && hi && d >= lo && d <= hi) c.push('is-range');
        if (same(d, lo)) c.push('is-selected', 'is-start');
        if (st.mode === 'range' && same(d, hi)) c.push('is-selected', 'is-end');
        if (st.mode === 'range' && lo && !hi && same(d, lo)) c.push('is-end');
        const label = d.getDate() + ' ' + MONTHS[m] + ' ' + y + (same(d, st.today) ? ', today' : '');
        cells += cellHTML(st, d, [...new Set(c)].join(' '), label, d.getDate(), same(d, st._tab),
          ` data-date="${iso(d)}"${same(d, st.today) ? ' aria-current="date"' : ''}`);
      }
      if (i % 7 === 6) cells += '</div>';
    }
    return `<div class="pds-calendar__month">` +
      `<div class="pds-calendar__weekdays" aria-hidden="true">${WD.map(w => `<span class="pds-calendar__wd">${w}</span>`).join('')}</div>` +
      `<div class="pds-calendar__grid" role="grid" aria-label="${MONTHS[m]} ${y}">${cells}</div></div>`;
  }

  function render(el) {
    const st = el._cal;
    const box = el.querySelector('.pds-calendar__months');
    const titles = el.querySelectorAll('.pds-calendar__title');
    // which cell holds the roving tab stop
    if (st.type === 'year') {
      const ys = Array.from({ length: YEARS }, (_, i) => st.page + i);
      const tab = ys.includes(st.focus) ? st.focus : ys.includes(st.year) ? st.year : ys.includes(st.today.getFullYear()) ? st.today.getFullYear() : st.page;
      titles[0].textContent = `${st.page} - ${st.page + YEARS - 1}`;
      let cells = '';
      ys.forEach((y, i) => {
        if (i % 4 === 0) cells += '<div class="pds-calendar__row" role="row">';
        cells += cellHTML(st, null, y === st.year ? 'is-selected' : '', String(y) + (y === st.today.getFullYear() ? ', this year' : ''), y, y === tab, ` data-year="${y}"`);
        if (i % 4 === 3) cells += '</div>';
      });
      box.innerHTML = `<div class="pds-calendar__grid pds-calendar__grid--years" role="grid" aria-label="Years ${titles[0].textContent}">${cells}</div>`;
    } else if (st.type === 'day' && st.months === 1) {
      const tab = st.focus || (typeof st.day === 'number' ? st.day : 1);
      let cells = '';
      for (let i = 0; i < 35; i++) {
        if (i % 7 === 0) cells += '<div class="pds-calendar__row" role="row">';
        const n = i + 1;
        cells += n <= 31 ? cellHTML(st, null, st.day === n ? 'is-selected' : '', 'Day ' + n, n, n === tab, ` data-dom="${n}"`) : '<div class="pds-calendar__cell is-empty" role="gridcell"></div>';
        if (i % 7 === 6) cells += '</div>';
      }
      box.innerHTML = `<div class="pds-calendar__month"><div class="pds-calendar__grid" role="grid" aria-label="Day of month">${cells}</div></div>`;
      const chip = el.querySelector('[data-day="last"]');
      chip.setAttribute('aria-pressed', String(st.day === 'last'));
    } else {
      const vis = Array.from({ length: st.months }, (_, i) => D(st.view.getFullYear(), st.view.getMonth() + i, 1));
      const inView = d => d && vis.some(v => v.getFullYear() === d.getFullYear() && v.getMonth() === d.getMonth());
      st._tab = inView(st.focus) ? st.focus : inView(st.start) ? st.start : inView(st.today) ? st.today : vis[0];
      vis.forEach((v, i) => { titles[i].textContent = MONTHS[v.getMonth()] + ' ' + v.getFullYear(); });
      box.innerHTML = vis.map((v, i) => monthHTML(st, v, i)).join('<span class="pds-calendar__sep" role="presentation"></span>');
      const df = el.querySelector('[data-field="date"]');
      if (df && document.activeElement !== df) df.value = fmt(st.start);
      el.querySelectorAll('[data-preset]').forEach(b => {
        const p = st.presets[+b.dataset.preset], r = presetRange(st, p);
        const on = !!st.start && same(st.start, r[0]) && same(st.end, r[1]);
        b.setAttribute('aria-pressed', String(on)); b.classList.toggle('is-on', on);
      });
      el.querySelectorAll('[data-tab]').forEach(t => { const on = +t.dataset.tab === st.tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    }
    if (st.static) el.querySelectorAll('.pds-calendar__day').forEach(b => { b.tabIndex = -1; });
  }

  function presetRange(st, p) {
    const end = p.months ? addMonths(st.today, p.months) : addDays(st.today, p.days || 0);
    return [st.today, end];
  }

  /* ── Behaviour ──────────────────────────────────────────────── */
  function focusCell(el) {
    const b = el.querySelector('.pds-calendar__day[tabindex="0"]');
    if (b) b.focus({ preventScroll: true });
  }

  function pick(el, key) {
    const st = el._cal;
    if (st.type === 'year') { st.year = st.focus = key; }
    else if (st.type === 'day' && st.months === 1) { st.day = key; st.focus = typeof key === 'number' ? key : st.focus; }
    else {
      const d = key; st.focus = d;
      if (isDisabled(st, d)) return;
      if (st.mode === 'range') {
        if (!st.start || st.end) { st.start = d; st.end = null; }
        else if (d < st.start) { st.end = st.start; st.start = d; }
        else st.end = d;
      } else st.start = d;
      if (st.tabs) st.tabs[st.tab] = { start: st.start, end: st.end };
    }
    render(el);
    changed(el);
  }

  function changed(el) { const cb = el._cbs; cb && cb.onChange && cb.onChange(getValue(el)); }

  function move(el, e) {
    const st = el._cal;
    const k = e.key;
    if (st.type === 'year') {
      const cur = st.focus || st.year || st.page;
      const col = (cur - st.page) % 4;
      const dx = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -4, ArrowDown: 4, PageUp: -YEARS, PageDown: YEARS, Home: -col, End: 3 - col }[k];
      if (dx === undefined) return false;
      st.focus = cur + dx;
      if (st.focus < st.page || st.focus >= st.page + YEARS) st.page = yearPage(st.focus);
    } else if (st.type === 'day' && st.months === 1) {
      const cur = st.focus || 1;
      const col = (cur - 1) % 7;
      const dx = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -col, End: 6 - col }[k];
      if (dx === undefined) return false;
      st.focus = Math.max(1, Math.min(31, cur + dx));
    } else {
      const cur = st._tab || st.today;
      const col = (cur.getDay() + 6) % 7;
      let n;
      switch (k) {
        case 'ArrowLeft': n = addDays(cur, -1); break;
        case 'ArrowRight': n = addDays(cur, 1); break;
        case 'ArrowUp': n = addDays(cur, -7); break;
        case 'ArrowDown': n = addDays(cur, 7); break;
        case 'Home': n = addDays(cur, -col); break;
        case 'End': n = addDays(cur, 6 - col); break;
        case 'PageUp': n = addMonths(cur, e.shiftKey ? -12 : -1); break;
        case 'PageDown': n = addMonths(cur, e.shiftKey ? 12 : 1); break;
        default: return false;
      }
      st.focus = n;
      const last = D(st.view.getFullYear(), st.view.getMonth() + st.months, 0);
      if (n < st.view) st.view = first(n);
      else if (n > last) st.view = D(n.getFullYear(), n.getMonth() - st.months + 1, 1);
    }
    render(el);
    focusCell(el);
    return true;
  }

  function init(el, cb = {}) {
    if (el._cbs) { el._cbs = cb; return el; }
    el._cbs = cb;
    const st = el._cal;
    el.addEventListener('click', e => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        const n = +nav.dataset.nav;
        if (st.type === 'year') { st.page += n * YEARS; st.focus = null; }
        else { st.view = D(st.view.getFullYear(), st.view.getMonth() + n, 1); st.focus = null; }
        render(el); return;
      }
      const day = e.target.closest('.pds-calendar__day');
      if (day && !day.disabled && el.contains(day)) {
        if (day.dataset.year) pick(el, +day.dataset.year);
        else if (day.dataset.dom) pick(el, +day.dataset.dom);
        else if (day.dataset.date) pick(el, parse(day.dataset.date));
        focusCell(el); return;
      }
      const chip = e.target.closest('[data-day="last"]');
      if (chip) { pick(el, st.day === 'last' ? null : 'last'); return; }
      const tab = e.target.closest('[data-tab]');
      if (tab) { selectTab(el, +tab.dataset.tab); return; }
      const pre = e.target.closest('[data-preset]');
      if (pre) {
        const r = presetRange(st, st.presets[+pre.dataset.preset]);
        st.start = r[0]; st.end = r[1]; st.view = first(r[0]); st.focus = null;
        render(el); changed(el); return;
      }
      const act = e.target.closest('[data-act]');
      if (!act) return;
      const a = act.dataset.act;
      if (a === 'apply') { el._cbs.onApply && el._cbs.onApply(getValue(el)); }
      else if (a === 'cancel') { el._cbs.onCancel && el._cbs.onCancel(); }
      else if (a === 'reset') { setValue(el, null); const df = el.querySelector('[data-field="date"]'); if (df) df.value = ''; changed(el); }
      else if (a === 'now' || a === 'today') {
        if (st.type === 'year') { st.year = st.today.getFullYear(); st.page = yearPage(st.year); }
        else { st.start = st.today; st.end = null; st.view = first(st.today); st.focus = st.today; }
        if (a === 'now') {
          const tf = el.querySelector('[data-field="time"]');
          if (tf) { const t = new Date(); tf.value = pad(t.getHours()) + ':' + pad(t.getMinutes()); }
        }
        render(el); changed(el);
      }
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); el._cbs.onCancel && el._cbs.onCancel(); return; }
      if (e.target.classList.contains('pds-calendar__day')) { if (move(el, e)) e.preventDefault(); return; }
      const tab = e.target.closest('[data-tab]');
      if (tab && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        const n = (st.tab + (e.key === 'ArrowRight' ? 1 : -1) + st.tabs.length) % st.tabs.length;
        selectTab(el, n); el.querySelector(`[data-tab="${n}"]`).focus();
      }
    });
    const df = el.querySelector('[data-field="date"]');
    if (df) df.addEventListener('change', () => {
      const d = parse(df.value);
      if (d && !isDisabled(st, d)) { st.start = d; st.view = first(d); st.focus = d; render(el); changed(el); }
      else df.value = fmt(st.start);
    });
    const tf = el.querySelector('[data-field="time"]');
    if (tf && window.pdsTimepicker && cb.timepicker !== false) {
      pdsTimepicker.attach(tf, { onApply: () => changed(el) });
    }
    return el;
  }

  function selectTab(el, i) {
    const st = el._cal;
    st.tabs[st.tab] = { start: st.start, end: st.end };
    st.tab = i;
    st.start = st.tabs[i].start; st.end = st.tabs[i].end; st.focus = null;
    if (st.start) st.view = first(st.start);
    render(el); changed(el);
  }

  /* ── Attach to a kit input ──────────────────────────────────── */
  function attach(input, o = {}) {
    const field = input.matches('input') ? input : input.querySelector('input');
    const wrap = field.closest('.pds-input') || field.parentElement;
    if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
    const el = build(o);
    el.classList.add('pds-calendar--popup');
    el.hidden = true;
    el.setAttribute('role', 'dialog');
    wrap.appendChild(el);
    field.setAttribute('aria-haspopup', 'dialog');
    field.setAttribute('aria-expanded', 'false');
    field.setAttribute('aria-controls', el.id);
    field.setAttribute('autocomplete', 'off');
    let hadActive = false;

    function readField() {
      const v = field.value;
      if (!v) return;
      const st = el._cal;
      if (st.type === 'year') setValue(el, +v || null);
      else if (st.mode === 'range') { const p = v.split(/\s+[–-]\s+/); setValue(el, [p[0], p[1] || p[0]].map(parse)); }
      else if (!(st.type === 'day' && st.months === 1)) setValue(el, parse(v));
    }
    function open() {
      if (!el.hidden) return;
      readField();
      el.hidden = false;
      hadActive = wrap.classList.contains('pds-input--active');
      wrap.classList.add('pds-input--active');
      field.setAttribute('aria-expanded', 'true');
      focusCell(el);
      if (!el.contains(document.activeElement)) { const f = el.querySelector('.pds-calendar__day[tabindex="0"], [data-tab][tabindex="0"]'); f && f.focus(); }
      document.addEventListener('pointerdown', outside, true);
    }
    function close(refocus = true) {
      if (el.hidden) return;
      el.hidden = true;
      if (!hadActive) wrap.classList.remove('pds-input--active');
      field.setAttribute('aria-expanded', 'false');
      document.removeEventListener('pointerdown', outside, true);
      if (refocus) field.focus();
    }
    function outside(e) { if (!el.contains(e.target) && e.target !== field) { close(false); o.onCancel && o.onCancel(); } }

    init(el, {
      onApply(v) {
        field.value = v.text;
        wrap.classList.toggle('pds-input--filled', !!v.text);
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        close();
        o.onApply && o.onApply(v);
      },
      onCancel() { close(); o.onCancel && o.onCancel(); },
      onChange: o.onChange,
      timepicker: o.timepicker
    });
    field.addEventListener('click', () => (el.hidden ? open() : close(false)));
    field.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && !el.hidden) { e.preventDefault(); close(); }
    });
    return { el, open, close };
  }

  window.pdsCalendar = { build, init, getValue, setValue, attach, render };
})();
