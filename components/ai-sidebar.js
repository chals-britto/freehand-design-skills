/* Pando DS V1 — AI Side Bar behaviour. Requires ai-sidebar.css, icons.css,
   icons/icons-data.js, button.css; tooltip.css + tooltip.js for the toggle tooltip (optional).

   pdsAiSidebar.create({ title, open, groups })  → <nav> element, already wired
     title   header title (Figma "Freight invoice assistant")
     open    true (Type=Open, default) | false (Type=Closed)
     groups  [{ id, label, items: [{ id, label, href, active }] }]
             Figma draws two groups: "Starred" and "Recent".
   pdsAiSidebar.init(nav)               wire markup you wrote yourself (create() calls it)
   pdsAiSidebar.toggle(nav, open?)      Type=Open ↔ Type=Closed
   pdsAiSidebar.select(nav, idOrLink)   marks one chat as current (.Menu-Item State=Active)
   pdsAiSidebar.pin(nav, id, pinned?)   moves a chat into "Starred" (pinned) or back to "Recent"

   Events (bubble from the <nav>):
     pds-ai-sidebar-toggle {open} · pds-ai-sidebar-select {id, label}
     pds-ai-sidebar-new · pds-ai-sidebar-search
     pds-ai-sidebar-more {id, label, button} — the ⋯ More Actions button; Figma draws no menu
     pds-ai-sidebar-pin {id, pinned}

   Figma: Open/Closed and Default/Hover only. Added for the kit, not in Figma:
   keyboard (↑ ↓ Home End between chats, → to ⋯, ← back), focus rings, pin(),
   empty groups are hidden. */
(function () {
  const TIP = { open: { text: 'Close Sidebar', beak: '1' }, closed: { text: 'Open Sidebar', beak: '11' } }; // Figma tooltip text + beak
  const LOGO = '<svg viewBox="0 0 18 18" aria-hidden="true"><path fill="currentColor" d="M15.2252 8.38237H13.2675C11.2282 8.38237 9.56952 6.72374 9.56952 4.68442V2.72668C9.56952 2.53635 9.40638 2.40039 9.24325 2.40039H6.38821C6.19787 2.40039 6.06191 2.56353 6.06191 2.72668V4.68442C6.06191 6.72374 4.40327 8.38237 2.36396 8.38237H0.379024C0.188688 8.38237 0.0527344 8.54552 0.0527344 8.70866V11.5637C0.0527344 11.754 0.215879 11.89 0.379024 11.89H2.33676C4.37607 11.89 6.03472 13.5486 6.03472 15.5879V17.5457C6.03472 17.736 6.19787 17.872 6.36101 17.872H9.21605C9.40638 17.872 9.54234 17.7088 9.54234 17.5457V15.5879C9.54234 13.5486 11.201 11.89 13.2403 11.89H15.198C15.3883 11.89 15.5243 11.7269 15.5243 11.5637V8.70866C15.5243 8.51832 15.3612 8.38237 15.198 8.38237H15.2252Z"/><path fill="currentColor" d="M17.7829 2.30251H17.044C16.2744 2.30251 15.6485 1.67654 15.6485 0.906911V0.168063C15.6485 0.0962307 15.5869 0.0449219 15.5253 0.0449219H14.4478C14.3759 0.0449219 14.3246 0.106492 14.3246 0.168063V0.906911C14.3246 1.67654 13.6987 2.30251 12.9291 2.30251H12.18C12.1081 2.30251 12.0568 2.36409 12.0568 2.42565V3.50314C12.0568 3.57497 12.1184 3.62628 12.18 3.62628H12.9188C13.6885 3.62628 14.3145 4.25224 14.3145 5.02189V5.76073C14.3145 5.83256 14.3759 5.88387 14.4375 5.88387H15.515C15.5869 5.88387 15.6382 5.82229 15.6382 5.76073V5.02189C15.6382 4.25224 16.2641 3.62628 17.0338 3.62628H17.7726C17.8445 3.62628 17.8958 3.56472 17.8958 3.50314V2.42565C17.8958 2.35382 17.8342 2.30251 17.7726 2.30251H17.7829Z"/></svg>'; // exported from Figma "Freehand_Ai_Icon 1" (4514:11173)
  let uid = 0;

  function icon(name, size) {
    const d = (window.PDS_ICONS || []).find(i => i.n === name);
    return '<span class="pds-icon pds-icon--' + size + '" aria-hidden="true">' + (d ? d.svg : '') + '</span>';
  }
  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function fire(nav, name, detail) { nav.dispatchEvent(new CustomEvent('pds-ai-sidebar-' + name, { bubbles: true, detail })); }

  function item(o) {
    const li = el('li', 'pds-ai-sidebar__item');
    li.dataset.id = o.id;
    const a = el('a', 'pds-ai-sidebar__link', o.label);
    a.href = o.href || '#'; a.title = o.label; // full title for truncated rows
    if (o.active) a.setAttribute('aria-current', 'page');
    const m = el('button', 'pds-ai-sidebar__more'); m.type = 'button';
    m.setAttribute('aria-label', 'More actions for ' + o.label);
    m.innerHTML = icon('action-more-actions', 10);
    li.append(a, m);
    return li;
  }

  function create(o = {}) {
    const nav = el('nav', 'pds-ai-sidebar');
    nav.setAttribute('aria-label', 'Chat history');
    const id = 'pds-ai-sidebar-' + (++uid);
    nav.innerHTML =
      '<div class="pds-ai-sidebar__header">' +
        '<div class="pds-ai-sidebar__brand"><span class="pds-ai-sidebar__logo">' + LOGO + '</span><p class="pds-ai-sidebar__title"></p></div>' +
        '<button type="button" class="pds-ai-sidebar__toggle" aria-controls="' + id + '-body">' + icon('nav-grid-view', 14) + '</button>' +
      '</div>' +
      '<div class="pds-ai-sidebar__body" id="' + id + '-body">' +
        '<div class="pds-ai-sidebar__actions">' +
          '<button type="button" class="pds-button pds-button--action pds-ai-sidebar__action" data-ai-action="new">' + icon('action-add', 10).replace('pds-icon ', 'pds-icon pds-button__icon ') + '<span class="pds-ai-sidebar__action-label">New Chat</span></button>' +
          '<button type="button" class="pds-button pds-button--action pds-ai-sidebar__action pds-ai-sidebar__action--search" data-ai-action="search">' + icon('nav-search-10', 10).replace('pds-icon ', 'pds-icon pds-button__icon ') + '<span class="pds-ai-sidebar__action-label">Search</span></button>' +
        '</div>' +
        '<div class="pds-ai-sidebar__groups"></div>' +
      '</div>';
    nav.querySelector('.pds-ai-sidebar__title').textContent = o.title || 'Freight invoice assistant';
    const groups = nav.querySelector('.pds-ai-sidebar__groups');
    (o.groups || []).forEach(g => {
      const s = el('section', 'pds-ai-sidebar__group'); s.dataset.group = g.id;
      const hid = id + '-' + g.id;
      const h = el('h3', 'pds-ai-sidebar__heading', g.label); h.id = hid;
      const ul = el('ul', 'pds-ai-sidebar__list'); ul.setAttribute('aria-labelledby', hid);
      (g.items || []).forEach(i => ul.appendChild(item(i)));
      s.append(h, ul); groups.appendChild(s);
    });
    if (o.open === false) nav.classList.add('pds-ai-sidebar--closed');
    init(nav);
    return nav;
  }

  /* ── state ── */
  function links(nav) { return [...nav.querySelectorAll('.pds-ai-sidebar__group:not([hidden]) .pds-ai-sidebar__link')]; }
  function rove(nav, target) {
    const all = links(nav);
    const cur = target || all.find(a => a.hasAttribute('aria-current')) || all[0];
    all.forEach(a => a.tabIndex = a === cur ? 0 : -1);
    nav.querySelectorAll('.pds-ai-sidebar__more').forEach(b => b.tabIndex = -1);
  }
  function syncGroups(nav) {
    nav.querySelectorAll('.pds-ai-sidebar__group').forEach(g => { g.hidden = !g.querySelector('.pds-ai-sidebar__item'); });
  }

  function toggle(nav, open) {
    const isOpen = !nav.classList.contains('pds-ai-sidebar--closed');
    const next = open === undefined ? !isOpen : !!open;
    nav.classList.toggle('pds-ai-sidebar--closed', !next);
    const t = nav.querySelector('.pds-ai-sidebar__toggle');
    const tip = TIP[next ? 'open' : 'closed'];
    t.setAttribute('aria-expanded', String(next));
    t.setAttribute('aria-label', tip.text);
    if (t._tip) {
      t._tip.querySelector('.pds-tooltip__text').textContent = tip.text;
      t._tip.dataset.beak = tip.beak;
      t._tip.className = t._tip.className.replace(/pds-tooltip--beak-\d+/, 'pds-tooltip--beak-' + tip.beak);
      if (!t._tip.hidden && window.pdsTooltip) pdsTooltip.show(t._tip, t);
    }
    if (next !== isOpen) fire(nav, 'toggle', { open: next });
    return next;
  }

  function select(nav, x) {
    const a = typeof x === 'string' ? nav.querySelector('.pds-ai-sidebar__item[data-id="' + CSS.escape(x) + '"] .pds-ai-sidebar__link') : x;
    if (!a) return;
    nav.querySelectorAll('.pds-ai-sidebar__link[aria-current]').forEach(n => n.removeAttribute('aria-current'));
    a.setAttribute('aria-current', 'page');
    rove(nav, a);
    fire(nav, 'select', { id: a.closest('.pds-ai-sidebar__item').dataset.id, label: a.textContent });
  }

  function pin(nav, id, pinned) {
    const li = nav.querySelector('.pds-ai-sidebar__item[data-id="' + CSS.escape(id) + '"]');
    if (!li) return;
    const inStarred = !!li.closest('[data-group="starred"]');
    const next = pinned === undefined ? !inStarred : !!pinned;
    const to = nav.querySelector('[data-group="' + (next ? 'starred' : 'recent') + '"] .pds-ai-sidebar__list');
    if (to && next !== inStarred) { to.prepend(li); syncGroups(nav); rove(nav); }
    fire(nav, 'pin', { id, pinned: next });
    return next;
  }

  function init(nav) {
    if (nav.dataset.pdsReady) return; nav.dataset.pdsReady = '';
    const t = nav.querySelector('.pds-ai-sidebar__toggle');
    if (window.pdsTooltip) {
      t._tip = pdsTooltip.attach(t, { text: TIP.open.text, showTitle: false, beak: TIP.open.beak });
      t._tip.classList.add('pds-ai-sidebar__tip');
    }
    toggle(nav, !nav.classList.contains('pds-ai-sidebar--closed'));
    syncGroups(nav); rove(nav);

    nav.addEventListener('click', e => {
      if (e.target.closest('.pds-ai-sidebar__toggle')) { toggle(nav); return; }
      const act = e.target.closest('[data-ai-action]');
      if (act) { fire(nav, act.dataset.aiAction, {}); return; }
      const more = e.target.closest('.pds-ai-sidebar__more');
      if (more) { const li = more.closest('.pds-ai-sidebar__item'); fire(nav, 'more', { id: li.dataset.id, label: li.querySelector('.pds-ai-sidebar__link').textContent, button: more }); return; }
      const a = e.target.closest('.pds-ai-sidebar__link');
      if (a) { if (a.getAttribute('href') === '#') e.preventDefault(); select(nav, a); }
    });

    nav.addEventListener('keydown', e => {
      const a = e.target.closest('.pds-ai-sidebar__link, .pds-ai-sidebar__more');
      if (!a) return;
      const li = a.closest('.pds-ai-sidebar__item');
      const link = li.querySelector('.pds-ai-sidebar__link');
      const all = links(nav), i = all.indexOf(link);
      let to = null;
      if (e.key === 'ArrowDown') to = all[Math.min(i + 1, all.length - 1)];
      else if (e.key === 'ArrowUp') to = all[Math.max(i - 1, 0)];
      else if (e.key === 'Home') to = all[0];
      else if (e.key === 'End') to = all[all.length - 1];
      else if (e.key === 'ArrowRight' && a === link) { e.preventDefault(); const m = li.querySelector('.pds-ai-sidebar__more'); m.tabIndex = 0; link.tabIndex = -1; m.focus(); return; }
      else if (e.key === 'ArrowLeft' && a !== link) { e.preventDefault(); rove(nav, link); link.focus(); return; }
      if (to) { e.preventDefault(); rove(nav, to); to.focus(); }
    });
  }

  window.pdsAiSidebar = { create, init, toggle, select, pin };
})();
