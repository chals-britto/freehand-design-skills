/* Pando DS V1 — Metrics + Widgets behaviour. Requires metrics-widgets.css.
   pdsMetrics.init(root?)  wires every tile inside root (default document):
     · Pin buttons (.pds-metric__pin, .pds-widget__pin) toggle aria-pressed.
       On a metric the tile switches between the Figma pairs
       No Click: Pinned ↔ Unpinned · Pinnable: Default ↔ Pinned (Light and Glass).
     · Clickable metrics (.pds-metric--clickable with a .pds-metric__hit button)
       toggle Active (.is-active + aria-pressed). Figma does not say whether one
       or several metrics can be active at once — each tile toggles on its own.
   Fires a "pds-metric-change" event on the tile: detail { pinned?, active? }.
   Idempotent: calling init twice does not double-bind. */
(function () {
  function fire(tile, detail) { tile.dispatchEvent(new CustomEvent('pds-metric-change', { bubbles: true, detail })); }

  function onClick(e) {
    const pin = e.target.closest('.pds-metric__pin, .pds-widget__pin');
    if (pin && !pin.disabled) {
      const on = pin.getAttribute('aria-pressed') !== 'true';
      pin.setAttribute('aria-pressed', String(on));
      pin.setAttribute('aria-label', on ? 'Unpin' : 'Pin');
      const tile = pin.closest('.pds-metric, .pds-widget');
      if (tile && tile.classList.contains('pds-metric')) {
        if (tile.classList.contains('pds-metric--no-click')) {
          tile.classList.toggle('pds-metric--pinned', on);
          tile.classList.toggle('pds-metric--unpinned', !on);
        } else if (tile.classList.contains('pds-metric--pinnable')) {
          tile.classList.toggle('pds-metric--pinned', on);
        }
      }
      if (tile) fire(tile, { pinned: on });
      return;
    }
    const hit = e.target.closest('.pds-metric__hit');
    if (hit && !hit.disabled) {
      const tile = hit.closest('.pds-metric');
      const on = hit.getAttribute('aria-pressed') !== 'true';
      hit.setAttribute('aria-pressed', String(on));
      tile.classList.toggle('is-active', on);
      fire(tile, { active: on });
    }
  }

  function init(root) {
    root = root || document;
    if (root.__pdsMetrics) return;
    root.__pdsMetrics = true;
    root.addEventListener('click', onClick);
  }

  window.pdsMetrics = { init };
})();
