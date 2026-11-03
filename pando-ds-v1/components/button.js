/* Pando DS V1 — Button behaviour. Requires button.css.
   pdsButton.setLoading(button, true|false)
     Adds the vector spinner before the label, sets aria-busy="true" and
     aria-disabled="true", and swallows clicks until loading ends
     (added in review: "disabled while loading"; Figma only had a raster spinner).
     The button keeps focus and its label, so screen readers still know what it is.
   pdsButton.check(root?)
     Warns in the console for icon-only buttons with no accessible name
     (added in review: icon-only buttons need aria-label + a tooltip). */
(function () {
  const SPINNER = '<svg class="pds-button__spinner" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
    '<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/>' +
    '<path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function block(e) {
    if (e.currentTarget.getAttribute('aria-busy') === 'true') { e.preventDefault(); e.stopImmediatePropagation(); }
  }

  function setLoading(btn, on) {
    if (!btn) return;
    if (on) {
      if (btn.classList.contains('is-loading')) return;
      btn.classList.add('is-loading');
      btn.setAttribute('aria-busy', 'true');
      btn.setAttribute('aria-disabled', 'true');
      btn.insertAdjacentHTML('afterbegin', SPINNER);
      btn.addEventListener('click', block, true);
    } else {
      btn.classList.remove('is-loading');
      btn.removeAttribute('aria-busy');
      btn.removeAttribute('aria-disabled');
      const s = btn.querySelector(':scope > .pds-button__spinner');
      if (s) s.remove();
      btn.removeEventListener('click', block, true);
    }
  }

  function check(root) {
    const sel = '.pds-button--icon, .pds-button--icon-plain, .pds-button--dual-circular, .pds-button-dual .pds-button';
    const bad = [];
    (root || document).querySelectorAll(sel).forEach(b => {
      const name = (b.getAttribute('aria-label') || b.getAttribute('aria-labelledby') || b.textContent || '').trim();
      if (!name) bad.push(b);
    });
    if (bad.length) console.warn('[pdsButton] icon-only buttons without an accessible name (add aria-label):', bad);
    return bad;
  }

  window.pdsButton = { setLoading, check, SPINNER };
})();
