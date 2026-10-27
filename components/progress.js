/* Pando DS V1 — Progress Indicator behaviour. Requires progress.css.

   pdsProgress.set(el, value, text?)
     value  0–100 (percent). Clamped and rounded. Updates the fill width and
            aria-valuenow. 0 shows the 4px nub, as in Figma State 0.
     text   optional; replaces the visible progress text (e.g. "2/5 steps")
            and is mirrored to aria-valuetext.
   pdsProgress.build({ theme, value, text, label }) → element
     theme  'light' | 'dark'   (default 'light')
     label  accessible name (aria-label). Figma has no label; the product
            screen must supply one (e.g. the file name).
   Markup: role="progressbar" with aria-valuemin=0, aria-valuemax=100. */
(function () {
  function clamp(v) { v = Number(v); if (!isFinite(v)) v = 0; return Math.round(Math.min(100, Math.max(0, v))); }

  function set(el, value, text) {
    if (!el) return el;
    const v = clamp(value);
    el.style.setProperty('--_value', v);
    el.setAttribute('aria-valuenow', v);
    if (text != null) {
      let t = el.querySelector('.pds-progress__text');
      if (!t) { t = document.createElement('span'); t.className = 'pds-progress__text'; t.setAttribute('aria-hidden', 'true'); el.appendChild(t); }
      t.textContent = text;
    }
    const t = el.querySelector('.pds-progress__text');
    if (t && t.textContent.trim()) el.setAttribute('aria-valuetext', t.textContent.trim());
    else el.removeAttribute('aria-valuetext');
    return el;
  }

  function build(o = {}) {
    const el = document.createElement('div');
    el.className = 'pds-progress' + (o.theme === 'dark' ? ' pds-progress--dark' : '');
    el.setAttribute('role', 'progressbar');
    el.setAttribute('aria-valuemin', '0');
    el.setAttribute('aria-valuemax', '100');
    if (o.label) el.setAttribute('aria-label', o.label);
    el.innerHTML = '<span class="pds-progress__track" aria-hidden="true"><span class="pds-progress__fill"></span></span>';
    if (o.text != null) { const t = document.createElement('span'); t.className = 'pds-progress__text'; t.setAttribute('aria-hidden', 'true'); t.textContent = o.text; el.appendChild(t); }
    return set(el, o.value || 0);
  }

  /* Wire static markup: reads data-value (or aria-valuenow) once. */
  function init(root) {
    (root || document).querySelectorAll('.pds-progress').forEach(el => {
      el.setAttribute('role', 'progressbar');
      el.setAttribute('aria-valuemin', '0');
      el.setAttribute('aria-valuemax', '100');
      set(el, el.dataset.value != null ? el.dataset.value : el.getAttribute('aria-valuenow'));
    });
    return root;
  }

  window.pdsProgress = { set, build, init };
})();
