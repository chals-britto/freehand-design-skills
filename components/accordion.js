/* Pando DS V1 — Accordion behaviour. Requires accordion.css.
   pdsAccordion.build({ type, theme, open, title, secondary, details, content })
     type       'vertical' | 'slideout' | 'page'          (default 'vertical')
     theme      'light' | 'dark'   — Dark exists for Vertical and Slideout only
     open       boolean (default false)
     title      header text (Figma "Header Title", default "Accordion Header")
     secondary  string → shows the Secondary Text (Vertical/Slideout, "Show Secondary Text")
     details    null | 'toggle' | 'stats' | 'status' — "With Additional Details" slot
                (Figma ships it for Light Vertical and Light Page only)
     content    Node or HTML string for the panel. Page type defaults to the
                Figma "Swappable Content" placeholder; Vertical/Slideout have no
                panel style in Figma, so content is placed as-is.
   pdsAccordion.init(root) wires every .pds-accordion inside root (click, Enter, Space
   via the native <button>), keeping aria-expanded and the panel's hidden in sync. */
(function () {
  let uid = 0;
  const ICON = {
    plusminus: '<svg viewBox="0 0 20 20" aria-hidden="true"><path class="plus" d="M10.5 5v11M5 10.5h11" stroke="currentColor" fill="none"/><path class="minus" d="M5 10.5h11" stroke="currentColor" fill="none"/></svg>',
    arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><g class="arrow" fill="none" stroke="currentColor"><g class="short"><path d="M7 10.5h12"/><path d="M13.5 4.5l6 6-6 6"/></g><g class="long"><path d="M.5 10.5h19"/><path d="M13.5 4.5l6 6-6 6"/></g></g></svg>',
    refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/></svg>'
  };
  // Figma sample content for the "Additional Info - Swappable with Local" slot
  const DETAILS = {
    toggle: '<span class="pds-accordion__toggle-inputs"><span class="pds-accordion__toggle-input"><span class="pds-accordion__label">Package Received</span><span class="pds-accordion__switch">Yes</span></span><span class="pds-accordion__check"></span></span>',
    stats: '<span class="pds-accordion__meta"><span class="pds-accordion__stat"><span class="pds-accordion__tag">DIM</span>10x10x10</span><span class="pds-accordion__stat"><span class="pds-accordion__tag">Tag Text</span>100 Kgs</span><span class="pds-accordion__stat"><span class="pds-accordion__tag">Qty</span>25</span></span>',
    status: '<span class="pds-accordion__status">Picked Up</span>'
  };
  const PAGE_SLOT = '<div class="pds-accordion__slot"><div class="pds-accordion__slot-title">' + ICON.refresh + 'Swappable Content</div><p class="pds-accordion__slot-body">Swap this component out with another.</p></div>';

  function el(tag, cls, html) { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]); }

  function build(o = {}) {
    const type = ['vertical', 'slideout', 'page'].includes(o.type) ? o.type : 'vertical';
    const theme = type !== 'page' && o.theme === 'dark' ? 'dark' : 'light';
    const id = 'pds-acc-' + (++uid);
    const root = el('div', 'pds-accordion pds-accordion--' + type + ' pds-accordion--' + theme + (o.details ? ' pds-accordion--details' : '') + (o.open ? ' is-open' : ''));
    const btn = el('button', 'pds-accordion__header'); btn.type = 'button';
    btn.setAttribute('aria-expanded', o.open ? 'true' : 'false');
    btn.setAttribute('aria-controls', id);
    const title = esc(o.title || 'Accordion Header');
    const details = o.details && DETAILS[o.details] ? '<span aria-hidden="true">' + DETAILS[o.details] + '</span>' : '';

    if (type === 'page') {
      btn.innerHTML = '<span class="pds-accordion__lead"><span class="pds-accordion__page-title">' + title + '</span><span class="pds-accordion__switch" aria-hidden="true">Active</span></span>' +
        '<span class="pds-accordion__right">' + details + '<span class="pds-accordion__action"><span class="when-closed">Expand</span><span class="when-open">Collapse</span></span></span>';
    } else {
      const sec = o.secondary ? '<span class="pds-accordion__secondary">' + esc(o.secondary) + '</span>' : '';
      const icon = '<span class="pds-accordion__icon' + (o.details ? ' pds-accordion__icon--boxed' : '') + '">' + (type === 'slideout' ? ICON.arrow : ICON.plusminus) + '</span>';
      btn.innerHTML = '<span class="pds-accordion__text"><span class="pds-accordion__title">' + title + '</span>' + sec + '</span>' +
        '<span class="pds-accordion__right">' + details + icon + '</span>';
    }
    root.appendChild(btn);

    const panel = el('div', 'pds-accordion__panel' + (type === 'page' ? ' pds-accordion__panel--page' : ''));
    panel.id = id; panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', o.title || 'Accordion Header');
    if (o.content == null) panel.innerHTML = type === 'page' ? PAGE_SLOT : '';
    else if (typeof o.content === 'string') panel.innerHTML = o.content;
    else panel.appendChild(o.content);
    panel.hidden = !o.open;
    root.appendChild(panel);
    wire(root);
    return root;
  }

  function set(root, open) {
    const btn = root.querySelector(':scope > .pds-accordion__header');
    const panel = root.querySelector(':scope > .pds-accordion__panel');
    root.classList.toggle('is-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (panel) panel.hidden = !open;
  }

  function wire(root) {
    if (root.dataset.pdsWired) return;
    root.dataset.pdsWired = '1';
    const btn = root.querySelector(':scope > .pds-accordion__header');
    if (btn) btn.addEventListener('click', () => set(root, !root.classList.contains('is-open')));
  }

  window.pdsAccordion = {
    build,
    toggle(root, open) { set(root, open == null ? !root.classList.contains('is-open') : !!open); },
    init(scope = document) { scope.querySelectorAll('.pds-accordion').forEach(wire); }
  };
})();
