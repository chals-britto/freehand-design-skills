/* Pando DS V1 — Timepicker behaviour. Requires timepicker.css + button.css.

   pdsTimepicker.build(options) → HTMLElement (.pds-timepicker)
     value        'HH:MM' 24-hour (default '02:10', Figma's selected row)
     minuteStep   5 (Figma: 00, 05 … 55)       hours are always 00–23
     cancelLabel  'Cancel'   applyLabel 'Apply'   (Figma copy)
     static       true → markup only, no behaviour (docs)

   pdsTimepicker.init(el, { onApply(value), onCancel() })
     Wires scrolling, clicks and the keyboard:
       ArrowUp / ArrowDown  previous / next value in the focused column
       Home / End           first / last value
       ArrowLeft / Right    hour ↔ minute column
       Enter                Apply      Escape  Cancel
     The value in the band is the selected value; scrolling snaps to rows.

   pdsTimepicker.getValue(el) → 'HH:MM'     pdsTimepicker.setValue(el, 'HH:MM')
   pdsTimepicker.sync(el)   re-centres both columns (call after showing a hidden picker)

   pdsTimepicker.attach(input, options) → { el, open(), close() }
     input   the <input> inside a kit .pds-input (or the .pds-input wrapper)
     Opens under the field on click or ArrowDown, as wide as the field (min 160).
     Apply writes 'HH:MM' into the input and fires input + change. Cancel, Escape
     or a click outside closes without changing the value. Focus returns to the input.
     options: same as build, plus onApply / onCancel.
   (attach, keyboard and focus ring: added in review — Figma shows the panel only.) */
(function () {
  let uid = 0;
  const pad = n => String(n).padStart(2, '0');

  function parse(v, step) {
    const m = /^\s*(\d{1,2})\s*:\s*(\d{1,2})/.exec(v || '');
    let h = m ? Math.min(23, +m[1]) : 0, mi = m ? Math.min(59, +m[2]) : 0;
    return { h, mi: Math.floor(mi / step) * step };
  }

  function build(o = {}) {
    const id = 'pdstp' + (++uid);
    const step = o.minuteStep || 5;
    const { h, mi } = parse(o.value == null ? '02:10' : o.value, step);
    const opts = (list, sel, key) => list.map((n, i) =>
      `<li class="pds-timepicker__opt" role="option" id="${id}-${key}${i}" data-i="${i}" data-v="${pad(n)}" aria-selected="${n === sel}">${pad(n)}</li>`).join('');
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const mins = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
    const hi = hours.indexOf(h), mn = mins.indexOf(mi);
    const el = document.createElement('div');
    el.className = 'pds-timepicker';
    el.dataset.step = step;
    el.innerHTML =
      `<div class="pds-timepicker__time">` +
        `<ul class="pds-timepicker__col" role="listbox" tabindex="0" aria-label="Hours" data-col="h" data-index="${hi}" aria-activedescendant="${id}-h${hi}">${opts(hours, h, 'h')}</ul>` +
        `<span class="pds-timepicker__colon" aria-hidden="true">:</span>` +
        `<ul class="pds-timepicker__col" role="listbox" tabindex="0" aria-label="Minutes" data-col="m" data-index="${mn}" aria-activedescendant="${id}-m${mn}">${opts(mins, mi, 'm')}</ul>` +
      `</div>` +
      `<span class="pds-timepicker__band" aria-hidden="true"></span>` +
      `<span class="pds-timepicker__divider" aria-hidden="true"></span>` +
      `<div class="pds-timepicker__actions">` +
        `<button type="button" class="pds-button pds-button--text pds-button--small" data-act="cancel"><span class="pds-button__label">${o.cancelLabel || 'Cancel'}</span></button>` +
        `<button type="button" class="pds-button pds-button--small" data-act="apply"><span class="pds-button__label">${o.applyLabel || 'Apply'}</span></button>` +
      `</div>`;
    if (o.static) el.querySelectorAll('.pds-timepicker__col').forEach(c => c.removeAttribute('tabindex'));
    return el;
  }

  const cols = el => el.querySelectorAll('.pds-timepicker__col');
  const pitch = col => { const o = col.children; return o.length > 1 ? o[1].offsetTop - o[0].offsetTop : 26; };

  function mark(col, i) {
    const items = col.children;
    i = Math.max(0, Math.min(items.length - 1, i));
    col.dataset.index = i;
    for (const li of items) li.setAttribute('aria-selected', String(+li.dataset.i === i));
    col.setAttribute('aria-activedescendant', items[i].id);
    return i;
  }

  function select(col, i, smooth) {
    i = mark(col, i);
    col._lock = true;
    col.scrollTo({ top: i * pitch(col), behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' });
    clearTimeout(col._lt); col._lt = setTimeout(() => { col._lock = false; }, smooth ? 400 : 50);
  }

  function sync(el) { cols(el).forEach(c => select(c, +c.dataset.index || 0, false)); }

  function getValue(el) {
    const [h, m] = cols(el);
    return h.children[+h.dataset.index].dataset.v + ':' + m.children[+m.dataset.index].dataset.v;
  }

  function setValue(el, v) {
    const { h, mi } = parse(v, +el.dataset.step || 5);
    const [ch, cm] = cols(el);
    select(ch, h, false);
    select(cm, [...cm.children].findIndex(li => +li.dataset.v === mi), false);
  }

  function init(el, cb = {}) {
    if (el._pdsTp) return el;
    el._pdsTp = cb;
    const [ch, cm] = cols(el);
    cols(el).forEach(col => {
      col.addEventListener('scroll', () => {
        if (col._lock) return;
        clearTimeout(col._st);
        col._st = setTimeout(() => mark(col, Math.round(col.scrollTop / pitch(col))), 80);
      }, { passive: true });
      col.addEventListener('click', e => {
        const li = e.target.closest('.pds-timepicker__opt');
        if (li) { select(col, +li.dataset.i, true); col.focus({ preventScroll: true }); }
      });
      col.addEventListener('keydown', e => {
        const i = +col.dataset.index, last = col.children.length - 1;
        const go = n => { e.preventDefault(); select(col, n, true); };
        switch (e.key) {
          case 'ArrowUp': go(i - 1); break;
          case 'ArrowDown': go(i + 1); break;
          case 'Home': go(0); break;
          case 'End': go(last); break;
          case 'ArrowLeft': e.preventDefault(); ch.focus(); break;
          case 'ArrowRight': e.preventDefault(); cm.focus(); break;
          case 'Enter': e.preventDefault(); apply(); break;
          default:
        }
      });
    });
    el.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cancel(); } });
    function apply() { const cbs = el._pdsTp; cbs.onApply && cbs.onApply(getValue(el)); }
    function cancel() { const cbs = el._pdsTp; cbs.onCancel && cbs.onCancel(); }
    el.querySelector('[data-act="apply"]').addEventListener('click', apply);
    el.querySelector('[data-act="cancel"]').addEventListener('click', cancel);
    requestAnimationFrame(() => sync(el));
    if (document.fonts) document.fonts.ready.then(() => sync(el)); // web-font swap can reset the scroll
    return el;
  }

  function attach(input, o = {}) {
    const field = input.matches('input') ? input : input.querySelector('input');
    const wrap = field.closest('.pds-input') || field.parentElement;
    if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
    const el = build(Object.assign({}, o, { value: field.value || o.value || '00:00' }));
    el.classList.add('pds-timepicker--popup');
    el.hidden = true;
    el.id = 'pdstp-pop' + (++uid);
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Choose time');
    wrap.appendChild(el);
    field.setAttribute('aria-haspopup', 'dialog');
    field.setAttribute('aria-expanded', 'false');
    field.setAttribute('aria-controls', el.id);
    field.setAttribute('autocomplete', 'off');
    let hadActive = false;

    function open() {
      if (!el.hidden) return;
      if (field.value) setValue(el, field.value);
      el.hidden = false;
      hadActive = wrap.classList.contains('pds-input--active');
      wrap.classList.add('pds-input--active');
      field.setAttribute('aria-expanded', 'true');
      sync(el);
      el.querySelector('.pds-timepicker__col').focus({ preventScroll: true });
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
        field.value = v;
        wrap.classList.add('pds-input--filled');
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        close();
        o.onApply && o.onApply(v);
      },
      onCancel() { close(); o.onCancel && o.onCancel(); }
    });
    field.addEventListener('click', () => (el.hidden ? open() : close(false)));
    field.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && !el.hidden) { e.preventDefault(); close(); }
    });
    return { el, open, close };
  }

  window.pdsTimepicker = { build, init, getValue, setValue, sync, attach };
})();
