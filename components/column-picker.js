/* Pando DS V1 — Column Picker behaviour. Requires column-picker.css, toggle.css + toggle.js
   (the switch), button.css (header icon button), icons.css and icons/icons-data.js (glyphs).
   Works by event delegation, so any .pds-column-picker on the page is live once this loads.

   Types (Figma):
     toggle    Column Picker · Type=Toggle   — switch per column shows / hides it
     pin       Column Picker · Type=Pin      — pin icon per column pins / unpins it
     advanced  Column Picker Advanced        — switch per column + two View Header chips,
                                               each chip shows / hides that header
   Every type: drag the dotted handle to reorder. Keyboard alternative (added in review,
   not in Figma): focus the handle and press ↑ / ↓ (Home / End jump to the ends).
   Figma has no search, no Apply / Reset: every change applies immediately.

   Each change dispatches a bubbling "pds-columns-change" event on the picker:
     detail = { reason: 'toggle'|'pin'|'view'|'reorder', columns: state(el) }
   The header icon button (Figma "Show Button", Indicator Icon/Resize) dispatches
   "pds-columns-button"; Figma does not say what it does.

   API (window.pdsColumnPicker):
     build({ type, title, subtitle, showButton, columns, label })  → element
        columns: [{ id, name, on, pinned, headers:[{ name, on }, { name, on }] }]
     state(el)  → [{ id, name, on, pinned, headers }] in current order
     move(row, delta)  move a row up (−1) or down (+1) */
(function () {
  function icon(n, cls) {
    const i = (window.PDS_ICONS || []).find(x => x.n === n);
    if (!i) throw new Error('pdsColumnPicker: icon missing — load icons/icons-data.js (' + n + ')');
    return i.svg.replace('<svg ', '<svg' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true" focusable="false" ');
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function switchHtml(on, name) {
    return '<button type="button" class="pds-toggle" role="switch" aria-checked="' + !!on + '" aria-label="Show ' + esc(name) + '">' +
      '<span class="pds-toggle__track"><span class="pds-toggle__knob"></span></span>' +
      '<span class="pds-toggle__text" aria-hidden="true">' + (on ? 'Yes' : 'No') + '</span></button>';
  }
  function chipHtml(h, rowOn) {
    const on = h.on !== false;
    return '<button type="button" class="pds-view-header" aria-pressed="' + on + '" data-on="' + on + '"' + (rowOn ? '' : ' disabled') +
      ' aria-label="Show header ' + esc(h.name) + '">' +
      icon('indicator-view-14', 'pds-view-header__ico-view') + icon('indicator-hide-14', 'pds-view-header__ico-hide') +
      '<span class="pds-view-header__label">' + esc(h.name) + '</span></button>';
  }

  function rowHtml(type, c) {
    const on = type === 'pin' ? !!c.pinned : c.on !== false;
    let left = '<button type="button" class="pds-column-picker__handle" aria-label="Move ' + esc(c.name) +
      '. Arrow keys move it">' + icon('misc-drag-indicator-small') + '</button>';
    let right;
    if (type === 'advanced') {
      const hs = c.headers || [{ name: c.name }, { name: c.name }];
      left += '<span class="pds-column-picker__headers">' + chipHtml(hs[0], on) +
        '<span class="pds-column-picker__bar" aria-hidden="true">|</span>' + chipHtml(hs[1] || hs[0], on) + '</span>';
      right = switchHtml(on, c.name);
    } else {
      left += '<span class="pds-column-picker__name">' + esc(c.name) + '</span>';
      right = type === 'pin'
        ? '<button type="button" class="pds-column-picker__pin" aria-pressed="' + on + '" aria-label="Pin ' + esc(c.name) + '">' +
          icon('indicator-pin-14', 'pds-column-picker__ico-pin') + '</button>'
        : switchHtml(on, c.name);
    }
    return '<li class="pds-column-picker__row' + (on ? '' : ' is-off') + '" data-id="' + esc(c.id || c.name) + '" data-name="' + esc(c.name) + '">' +
      '<span class="pds-column-picker__left">' + left + '</span>' + right + '</li>';
  }

  function build(o) {
    o = o || {};
    const type = ['toggle', 'pin', 'advanced'].includes(o.type) ? o.type : 'toggle';
    const el = document.createElement('div');
    el.className = 'pds-column-picker' + (type === 'advanced' ? ' pds-column-picker--advanced' : ' pds-column-picker--' + type);
    el.dataset.type = type;
    el.setAttribute('role', 'group');
    const title = o.title || 'Column Picker';
    el.setAttribute('aria-label', o.label || title);
    el.innerHTML =
      '<div class="pds-column-picker__top"><div class="pds-column-picker__heading">' +
      '<p class="pds-column-picker__title">' + esc(title) + '</p>' +
      (o.subtitle !== '' ? '<p class="pds-column-picker__subtitle">' + esc(o.subtitle || 'can display upto 10 columns at any instance') + '</p>' : '') +
      '</div>' +
      (o.showButton ? '<button type="button" class="pds-button pds-button--icon pds-button--small" data-column-picker-button aria-label="Resize">' +
        icon('indicator-resize-14', 'pds-button__icon') + '</button>' : '') +
      '</div>' +
      '<ul class="pds-column-picker__list" aria-label="Columns">' + (o.columns || []).map(c => rowHtml(type, c)).join('') + '</ul>' +
      '<p class="pds-column-picker__sr" aria-live="polite"></p>';
    swapPinIcons(el);
    return el;
  }

  /* Pinned = Indicator Icon/Pin, unpinned = Indicator Icon/Unpin (Figma swaps the glyph) */
  function swapPinIcons(root) {
    root.querySelectorAll('.pds-column-picker__pin').forEach(b => {
      const want = b.getAttribute('aria-pressed') === 'true' ? 'indicator-pin-14' : 'indicator-unpin-14';
      if (b.dataset.icon !== want) { b.innerHTML = icon(want); b.dataset.icon = want; }
    });
  }

  function rows(picker) { return Array.from(picker.querySelectorAll('.pds-column-picker__row')); }

  function state(picker) {
    const type = picker.dataset.type || 'toggle';
    return rows(picker).map(r => {
      const sw = r.querySelector('.pds-toggle');
      const pin = r.querySelector('.pds-column-picker__pin');
      const s = { id: r.dataset.id, name: r.dataset.name, on: sw ? sw.getAttribute('aria-checked') === 'true' : true, pinned: pin ? pin.getAttribute('aria-pressed') === 'true' : false };
      if (type === 'advanced') s.headers = Array.from(r.querySelectorAll('.pds-view-header')).map(h => ({ name: h.textContent.trim(), on: h.dataset.on === 'true' }));
      return s;
    });
  }

  function emit(picker, reason) {
    if (!picker) return;
    picker.dispatchEvent(new CustomEvent('pds-columns-change', { bubbles: true, detail: { reason, columns: state(picker) } }));
  }
  function say(picker, msg) { const l = picker && picker.querySelector('.pds-column-picker__sr'); if (l) l.textContent = msg; }

  function setRowOn(row, on) {
    row.classList.toggle('is-off', !on);
    row.querySelectorAll('.pds-view-header').forEach(h => {
      h.disabled = !on;
      h.setAttribute('aria-pressed', on && h.dataset.on === 'true' ? 'true' : 'false');
    });
  }

  function move(row, delta, toEnd) {
    const list = row.parentElement, all = Array.from(list.children);
    const from = all.indexOf(row);
    let to = toEnd === 'start' ? 0 : toEnd === 'end' ? all.length - 1 : from + delta;
    to = Math.max(0, Math.min(all.length - 1, to));
    if (to === from) return false;
    if (to > from) all[to].after(row); else all[to].before(row);
    return true;
  }

  /* Switch → row shown / hidden (toggle.js flips aria-checked and fires pds-change) */
  document.addEventListener('pds-change', e => {
    const sw = e.target.closest && e.target.closest('.pds-column-picker__row .pds-toggle');
    if (!sw) return;
    const row = sw.closest('.pds-column-picker__row'), picker = sw.closest('.pds-column-picker');
    if (!row) return;
    setRowOn(row, e.detail.checked);
    emit(picker, 'toggle');
  });

  document.addEventListener('click', e => {
    const pin = e.target.closest('.pds-column-picker__pin');
    if (pin && !pin.disabled) {
      const on = pin.getAttribute('aria-pressed') !== 'true';
      pin.setAttribute('aria-pressed', on);
      pin.closest('.pds-column-picker__row').classList.toggle('is-off', !on);
      swapPinIcons(pin.parentElement);
      emit(pin.closest('.pds-column-picker'), 'pin');
      return;
    }
    const chip = e.target.closest('.pds-column-picker__row .pds-view-header');
    if (chip && !chip.disabled) {
      const on = chip.dataset.on !== 'true';
      chip.dataset.on = on; chip.setAttribute('aria-pressed', on);
      emit(chip.closest('.pds-column-picker'), 'view');
      return;
    }
    const btn = e.target.closest('.pds-column-picker [data-column-picker-button]');
    if (btn) btn.closest('.pds-column-picker').dispatchEvent(new CustomEvent('pds-columns-button', { bubbles: true }));
  });

  /* Keyboard reorder — added in review, not in Figma */
  document.addEventListener('keydown', e => {
    const h = e.target.closest && e.target.closest('.pds-column-picker__handle');
    if (!h) return;
    const map = { ArrowUp: [-1], ArrowDown: [1], Home: [0, 'start'], End: [0, 'end'] }[e.key];
    if (!map) return;
    e.preventDefault();
    const row = h.closest('.pds-column-picker__row'), picker = h.closest('.pds-column-picker');
    if (move(row, map[0], map[1])) {
      h.focus();
      const all = rows(picker);
      say(picker, row.dataset.name + ', position ' + (all.indexOf(row) + 1) + ' of ' + all.length);
      emit(picker, 'reorder');
    }
  });

  /* Pointer drag on the handle */
  let drag = null;
  document.addEventListener('pointerdown', e => {
    const h = e.target.closest('.pds-column-picker__handle');
    if (!h || e.button !== 0) return;
    e.preventDefault();
    const row = h.closest('.pds-column-picker__row');
    drag = { h, row, picker: h.closest('.pds-column-picker'), moved: false };
    h.setPointerCapture(e.pointerId);
    row.classList.add('is-dragging');
    h.focus();
  });
  document.addEventListener('pointermove', e => {
    if (!drag) return;
    const { row } = drag, list = row.parentElement;
    for (const other of list.children) {
      if (other === row) continue;
      const r = other.getBoundingClientRect(), mid = r.top + r.height / 2;
      const before = row.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_PRECEDING;
      if (before && e.clientY < mid) { other.before(row); drag.moved = true; break; }
      if (!before && e.clientY > mid && other === row.nextElementSibling) { other.after(row); drag.moved = true; break; }
    }
  });
  function endDrag() {
    if (!drag) return;
    drag.row.classList.remove('is-dragging');
    if (drag.moved) {
      const all = rows(drag.picker);
      say(drag.picker, drag.row.dataset.name + ', position ' + (all.indexOf(drag.row) + 1) + ' of ' + all.length);
      emit(drag.picker, 'reorder');
    }
    drag = null;
  }
  document.addEventListener('pointerup', endDrag);
  document.addEventListener('pointercancel', endDrag);

  window.pdsColumnPicker = { build, state, move };
})();
