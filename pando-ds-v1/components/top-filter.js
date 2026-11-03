/* Pando DS V1 — Top Filter behaviour. Requires top-filter.css and the kit pieces it composes:
   metrics-widgets.js (pdsMetrics), filter-by.js (pdsFilterBy) + its atoms
   (icons/icons-data.js, toggle.js, dropdown.js, timepicker.js, calendar.js).
   Nothing here re-implements a metric, a filter pill, a dropdown or a calendar.

   pdsTopFilter.build(o)  → .pds-top-filter element
     type        'default' | 'filter-bottom' | 'stats' (Only stats) | 'no-stats' | 'swappable'
     source      '<Source>'          destination 'All Consignees'          — Figma sample
     groups      left Widget Groups  [{ highlight:'brown'|'blue'|undefined, metrics:[{ label, value, active, num:'red' }] }]
     right       right Widget Group  { metrics:[{ label, value }], num:'green' }  (Default only)
     filters     More Filters pills  [pdsFilterBy.pill options]         (default one empty pill)
     showFilters true  · showDate true  · showTime false (Show Additional Time: “Bid Ends 0:00:00”)
     date        options for pdsFilterBy.date (default Date Selection “Delivery Date :”)
     static      true → markup only (docs)
   pdsTopFilter.init(el)   wires one Top Filter (build() calls it unless static)
   pdsTopFilter.state(el)  → { metrics:[{ label, value }], filters:[{ label, value }] }
   pdsTopFilter.reset(el)  clears active metrics and every filter / date inside el

   Wiring (the build’s reading — Figma has no behaviour notes):
     · Clickable metrics toggle Active through pdsMetrics (each tile on its own, as the kit).
     · Filter pills fill through pdsFilterBy; More Filters opens / closes / Resets as the kit.
     · Any change fires 'pds-top-filter-change' on the Top Filter, detail = state(el),
       and sets data-applied="<count>" (active metrics + applied filters).
     · .Filter-Actions: Reset View → reset(el). All Widgets / Add View fire
       'pds-top-filter-action' { action: 'all-widgets' | 'add-view' } for the product to handle. */
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function svg(n) {
    const i = (window.PDS_ICONS || []).find(x => x.n === n);
    return i ? i.svg.replace('<svg', '<svg focusable="false"') : '';
  }
  const ic = n => `<span class="pds-icon" aria-hidden="true">${svg(n)}</span>`;
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  /* Figma sample content (Top Filter 3103:8433, Type=Default) */
  const SAMPLE_GROUPS = [
    { highlight: 'brown', metrics: [{ label: 'Pending', value: '25', active: true }, { label: 'On Hold', value: '00', num: 'red' }] },
    { metrics: [{ label: 'Air', value: '080' }, { label: 'Ocean', value: '08' }] },
    { highlight: 'blue', metrics: [{ label: 'Ambient', value: '15' }, { label: 'Frozen', value: '00' }, { label: 'Refrigerated', value: '00' }] }
  ];
  const SAMPLE_RIGHT = { num: 'green', metrics: [{ label: 'Selected Count', value: '00' }, { label: 'Total Weight (LBS)', value: '00' }, { label: 'Total Volume (Cft)', value: '00' }] };

  /* Kit markup for .pds-metric / .pds-metric-group (classes from metrics-widgets.css) */
  function metric(m, clickable, num) {
    const n = m.num || num;
    const cls = ['pds-metric', clickable ? 'pds-metric--clickable' : 'pds-metric--no-click'];
    if (m.active && clickable) cls.push('is-active');
    if (n) cls.push('pds-top-filter__num--' + n);
    const hit = clickable ? `<button type="button" class="pds-metric__hit" aria-pressed="${!!m.active}" aria-label="${esc(m.label)}: ${esc(m.value)}"></button>` : '';
    const icon = clickable ? ic('indicator-dashboard-14') : '';
    return `<div class="${cls.join(' ')}">${hit}<span class="pds-metric__label">${esc(m.label)}</span>` +
      `<span class="pds-metric__stat">${icon}<span class="pds-metric__num">${esc(m.value)}</span></span></div>`;
  }
  function group(g, clickable) {
    const hl = g.highlight ? ' pds-top-filter__group--' + g.highlight : '';
    return `<div class="pds-metric-group${hl}" role="group" aria-label="${esc(g.type || 'Widget Type')}"><div class="pds-metric-group__type"><span>${esc(g.type || 'Widget Type')}</span></div>` +
      g.metrics.map((m, i) => (i ? '<span class="pds-metric-group__divider" aria-hidden="true"></span>' : '') + metric(m, clickable, g.num)).join('') + '</div>';
  }

  /* .Filter-Actions (3033:9089) */
  function actions() {
    return `<div class="pds-filter-actions" role="group" aria-label="View actions">` +
      `<button type="button" class="pds-filter-actions__btn" data-action="all-widgets" aria-label="All Widgets">${ic('action-widgets')}</button>` +
      `<button type="button" class="pds-filter-actions__btn" data-action="reset-view" aria-label="Reset View">${ic('action-fetch')}</button>` +
      `<button type="button" class="pds-filter-actions__btn" data-action="add-view" aria-label="Add View">${ic('action-add')}</button></div>`;
  }

  function build(o = {}) {
    const type = o.type || 'default';
    const F = window.pdsFilterBy;
    const showFilters = o.showFilters !== false, showDate = o.showDate !== false;
    const hasSource = type === 'default' || type === 'no-stats';
    const hasWidgets = type === 'default' || type === 'filter-bottom' || type === 'stats';
    const hasMore = type !== 'stats';
    const moreOpen = type === 'filter-bottom' || type === 'no-stats';
    const groups = o.groups || SAMPLE_GROUPS;

    const root = el(`<div class="pds-top-filter pds-top-filter--${type}" data-type="${type}">` +
      `<div class="pds-top-filter__left"></div><div class="pds-top-filter__right"></div></div>`);
    const left = root.firstElementChild, right = root.lastElementChild;

    const filters = el('<div class="pds-top-filter__filters"></div>');
    if (hasSource) filters.insertAdjacentHTML('beforeend',
      `<span class="pds-top-filter__source"><span class="pds-top-filter__from">${esc(o.source || '<Source>')}</span>` +
      `<span class="pds-top-filter__move" aria-label="to" role="img"><i></i></span>` +
      `<span class="pds-top-filter__to">${esc(o.destination || 'All Consignees')}</span></span>`);
    if (type === 'swappable') filters.insertAdjacentHTML('beforeend',
      `<span class="pds-top-filter__slot"><span class="pds-top-filter__slot-title">Swappable Content</span><span>Swap this component out</span></span>`);
    if (hasMore && F) {
      const more = F.more({ open: moreOpen, reset: true, filters: o.filters || [{}], static: o.static });
      if (!showFilters) more.hidden = true;
      more.classList.add('pds-top-filter__more');
      filters.appendChild(more);
    }

    const widgets = hasWidgets ? el(`<div class="pds-top-filter__widgets">${groups.map(g => group(g, true)).join('')}${actions()}</div>`) : null;

    if (type === 'filter-bottom') { left.appendChild(widgets); left.appendChild(filters); }
    else { if (type !== 'stats') left.appendChild(filters); if (widgets) left.appendChild(widgets); }

    if (F) {
      const d = F.date(Object.assign({ type: 'date', static: o.static }, o.date || {}));
      d.classList.add('pds-top-filter__date'); if (!showDate) d.hidden = true;
      right.appendChild(d);
      if (o.showTime) { const t = F.date({ type: 'time', static: o.static }); t.classList.add('pds-top-filter__time'); right.appendChild(t); }
    }
    if (type === 'default' && o.right !== false) right.insertAdjacentHTML('beforeend', group(o.right || SAMPLE_RIGHT, false));

    if (!o.static) init(root);
    return root;
  }

  /* ── state + wiring ─────────────────────────────────────────── */
  function state(root) {
    const metrics = [...root.querySelectorAll('.pds-metric--clickable.is-active')].map(t => ({
      label: t.querySelector('.pds-metric__label').textContent.trim(),
      value: t.querySelector('.pds-metric__num').textContent.trim()
    }));
    const filters = window.pdsFilterBy ? pdsFilterBy.applied(root).map(x => ({ label: x.label, value: x.value })) : [];
    return { metrics, filters };
  }
  function update(root) {
    const s = state(root);
    root.dataset.applied = String(s.metrics.length + s.filters.length);
    root.dispatchEvent(new CustomEvent('pds-top-filter-change', { bubbles: true, detail: s }));
  }
  function reset(root) {
    root.querySelectorAll('.pds-metric--clickable.is-active').forEach(t => {
      t.classList.remove('is-active');
      const hit = t.querySelector('.pds-metric__hit'); if (hit) hit.setAttribute('aria-pressed', 'false');
    });
    if (window.pdsFilterBy) pdsFilterBy.clearAll(root);
    update(root);
  }
  function init(root) {
    if (!root || root.__pdsTopFilter) return;
    root.__pdsTopFilter = true;
    if (window.pdsMetrics) pdsMetrics.init(document);   // kit binds once per document — do not also init an ancestor of this element
    let queued = false;
    const later = () => { if (queued) return; queued = true; queueMicrotask(() => { queued = false; update(root); }); };
    root.addEventListener('pds-metric-change', later);
    root.addEventListener('pds-filter-change', later);
    root.addEventListener('pds-filter-reset', later);
    root.addEventListener('click', e => {
      const b = e.target.closest('.pds-filter-actions__btn'); if (!b || !root.contains(b)) return;
      const action = b.dataset.action;
      if (action === 'reset-view') reset(root);
      root.dispatchEvent(new CustomEvent('pds-top-filter-action', { bubbles: true, detail: { action } }));
    });
    root.dataset.applied = String(state(root).metrics.length + state(root).filters.length);
  }

  window.pdsTopFilter = { build, init, state, reset, SAMPLE_GROUPS, SAMPLE_RIGHT };
})();
