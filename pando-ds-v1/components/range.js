/* Pando DS V1 — Range behaviour. Requires range.css.

   pdsRange.build(opts) → element        pdsRange.init(root) → root (wires behaviour)

   Range (single handle):
     { set:'range', theme:'light'|'dark', spacing:'tight'|'loose',
       min, max, step, value, scale:[...labels], highlight:true|false,
       label:'Label', unit:'unit', showLabel:true, showScale:true }
   Slider (two handles, Pando blue):  { set:'slider', steps:16|6, a, b, scale:true|false }
   Dual Range (two handles, light blue): { set:'dual', a, b, scale:true|false }
     a / b are dot indexes (Slider 0–15 or 0–5, Dual Range 0–16).

   Figma behaviour text: drag the thumb, or click a spot on the track and the
   thumb jumps there. Keys (added in review — not in Figma):
   ←/↓ one step down · →/↑ one step up · Home/End min/max.
   Two-handle sets: the nearest handle moves on click; handles cannot cross. */
(function () {
  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function thumb(which, label) {
    const t = el('span', 'pds-range__thumb pds-range__thumb--' + which);
    t.tabIndex = 0;
    t.setAttribute('role', 'slider');
    if (label) t.setAttribute('aria-label', label);
    t.appendChild(el('i', 'pds-range__caret'));
    t.appendChild(el('i', 'pds-range__caret pds-range__caret--next'));
    return t;
  }

  function build(o = {}) {
    const set = o.set || 'range';
    const root = el('div', 'pds-range');
    const rail = el('div', 'pds-range__rail');
    const track = el('div', 'pds-range__track');
    rail.appendChild(track);

    if (set === 'range') {
      const theme = o.theme === 'dark' ? 'dark' : 'light';
      const spacing = o.spacing === 'tight' ? 'tight' : 'loose';
      root.classList.add('pds-range--' + theme, 'pds-range--' + spacing);
      const min = o.min ?? (spacing === 'tight' ? 0 : 50), max = o.max ?? (spacing === 'tight' ? 1000 : 250);
      Object.assign(root.dataset, { min, max, step: o.step ?? 50, highlight: o.highlight === false ? 'false' : 'true' });
      const n = spacing === 'tight' ? 21 : 5;
      for (let i = 0; i < n; i++) track.appendChild(el('span', 'pds-range__tick'));
      const t = thumb('a', o.label || 'Label'); t.dataset.value = o.value ?? min; rail.appendChild(t);
      if (o.showLabel !== false) {
        const row = el('div', 'pds-range__label-row');
        row.appendChild(el('span', 'pds-range__label', o.label || 'Label'));
        row.appendChild(el('span', 'pds-range__unit', o.unit || 'unit'));
        root.appendChild(row);
      }
      const body = el('div', 'pds-range__body'); body.appendChild(rail);
      if (o.showScale !== false) {
        const sc = el('div', 'pds-range__scale');
        const labels = o.scale || (spacing === 'tight' ? [0, 200, 400, 600, 800, 1000] : [50, 100, 150, 200, 250]);
        labels.forEach(v => { const s = el('span', 'pds-range__scale-item', String(v)); s.dataset.value = v; sc.appendChild(s); });
        body.appendChild(sc);
      }
      root.appendChild(body);
    } else {
      const dual = set === 'dual';
      root.classList.add(dual ? 'pds-range--dual' : 'pds-range--slider');
      const steps = dual ? 17 : (o.steps === 16 ? 16 : 6);
      if (!dual && steps === 16) root.classList.add('pds-range--steps-16');
      Object.assign(root.dataset, { min: 0, max: steps - 1, step: 1 });
      for (let i = 0; i < steps; i++) track.appendChild(el('span', 'pds-range__tick'));
      track.prepend(el('span', 'pds-range__fill'));
      const ta = thumb('a', 'Minimum'), tb = thumb('b', 'Maximum');
      ta.dataset.value = o.a ?? 0; tb.dataset.value = o.b ?? 1;
      rail.append(ta, tb);
      root.appendChild(rail);
      if (o.scale) {
        const sc = el('div', 'pds-range__count');
        /* Figma: Dual Range shows 00–16; Slider (16 dots) shows 0–14 under the first 15 dots */
        const count = dual ? 17 : 15;
        for (let i = 0; i < count; i++) sc.appendChild(el('span', 'pds-range__count-item', dual ? String(i).padStart(2, '0') : String(i)));
        root.appendChild(sc);
      }
    }
    return init(root);
  }

  function num(root, name) { return parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0; }

  function init(root) {
    if (root._pdsRange) return root;
    root._pdsRange = true;
    const min = +root.dataset.min, max = +root.dataset.max, step = +root.dataset.step || 1;
    const thumbs = [...root.querySelectorAll('.pds-range__thumb')];
    const rail = root.querySelector('.pds-range__rail');
    const snap = v => Math.min(max, Math.max(min, Math.round((v - min) / step) * step + min));

    function set(t, v) {
      v = snap(v);
      const i = thumbs.indexOf(t);
      if (thumbs.length === 2) { /* handles cannot cross */
        if (i === 0) v = Math.min(v, +thumbs[1].dataset.value);
        else v = Math.max(v, +thumbs[0].dataset.value);
      }
      t.dataset.value = v;
      root.style.setProperty(i === 0 ? '--a' : '--b', String((v - min) / (max - min)));
      t.setAttribute('aria-valuenow', v);
      t.setAttribute('aria-valuemin', i === 1 ? thumbs[0].dataset.value : min);
      t.setAttribute('aria-valuemax', i === 0 && thumbs[1] ? thumbs[1].dataset.value : max);
      if (thumbs.length === 2) {
        const other = thumbs[1 - i];
        if (i === 0) other.setAttribute('aria-valuemin', v); else other.setAttribute('aria-valuemax', v);
      }
      if (root.dataset.highlight === 'true') {
        root.querySelectorAll('.pds-range__scale-item').forEach(s =>
          s.classList.toggle('pds-range__scale-item--selected', +s.dataset.value === v));
      }
      root.dispatchEvent(new CustomEvent('pds-range:change', { bubbles: true, detail: { values: thumbs.map(x => +x.dataset.value) } }));
    }
    thumbs.forEach(t => set(t, +t.dataset.value));

    function valueAt(clientX) {
      const r = rail.getBoundingClientRect();
      const pct = (clientX - r.left - num(root, '--_c0')) / num(root, '--_span');
      return min + Math.min(1, Math.max(0, pct)) * (max - min);
    }
    function nearest(v) {
      if (thumbs.length === 1) return thumbs[0];
      const [a, b] = thumbs.map(t => +t.dataset.value);
      if (a === b) return v < a ? thumbs[0] : thumbs[1];
      return Math.abs(v - a) <= Math.abs(v - b) ? thumbs[0] : thumbs[1];
    }

    let active = null;
    rail.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      const v = valueAt(e.clientX);
      active = e.target.closest('.pds-range__thumb') || nearest(v);
      set(active, v);   /* click a spot on the track: the thumb jumps there */
      active.classList.add('is-dragging');
      active.focus({ preventScroll: true });
      rail.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    rail.addEventListener('pointermove', e => { if (active) set(active, valueAt(e.clientX)); });
    const end = () => { if (active) active.classList.remove('is-dragging'); active = null; };
    rail.addEventListener('pointerup', end);
    rail.addEventListener('pointercancel', end);

    thumbs.forEach(t => t.addEventListener('keydown', e => {
      const v = +t.dataset.value;
      const map = { ArrowLeft: v - step, ArrowDown: v - step, ArrowRight: v + step, ArrowUp: v + step, Home: min, End: max };
      if (!(e.key in map)) return;
      e.preventDefault();
      set(t, map[e.key]);
    }));
    root.pdsSet = (values) => values.forEach((v, i) => thumbs[i] && set(thumbs[i], v));
    return root;
  }

  window.pdsRange = {
    build,
    init,
    initAll(scope = document) { scope.querySelectorAll('.pds-range').forEach(init); }
  };
})();
