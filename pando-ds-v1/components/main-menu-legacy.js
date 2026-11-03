/* Pando DS V1 — Old Menu (legacy 240px menu) behaviour.
   LEGACY — superseded by New Main Menu? Confirm whether still used.
   Requires main-menu-legacy.css (+ main-menu.css for .pds-menu-item, icons.css,
   avatar.css) and icons/icons-data.js (PDS_ICONS).

   pdsMenuLegacy.create(config) → <nav class="pds-menu-legacy">
     config.label        aria-label of the nav (default "Main menu")
     config.items        [{ id, label, icon, href }]   top to bottom
                         icon = kit icon name (e.g. 'menu-dashboard') or an <svg> string
     config.user         { initials, name, role }
     config.current      item id → Active fill + aria-current="page"
     config.interactive  false → static render (variant pages): no listeners, not focusable

   pdsMenuLegacy.open(menu, opener) / close(menu) / toggle(menu, opener) / setCurrent(menu, id)
   Events on the nav: pds-menu-legacy:open · :close · :navigate {id, label, href} · :logout

   Behaviour: hover = .Menu-Item Hover fill (CSS); click an item → it becomes current
   (Active fill) and :navigate fires. Close (×) closes the menu and returns focus to the opener.
   Keyboard (added in review — not in Figma): Close, the item list and Log Out are one Tab
   stop each; in the list ↑/↓ move (wrap), Home/End; Enter/Space follow the link;
   Esc anywhere closes the menu. */
(function () {
  const ICON = n => { const i = (window.PDS_ICONS || []).find(x => x.n === n); return i ? i.svg : ''; };
  const svgOf = v => (v && v.trim().startsWith('<svg')) ? v : ICON(v);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = (svg, size) => `<span class="pds-icon pds-icon--${size}" aria-hidden="true">${svg}</span>`;

  function create(cfg) {
    cfg = Object.assign({ label: 'Main menu', items: [], user: {}, interactive: true }, cfg);
    const u = cfg.user || {};
    const nav = document.createElement('nav');
    nav.className = 'pds-menu-legacy';
    nav.setAttribute('aria-label', cfg.label);
    nav.innerHTML =
      `<div class="pds-menu-legacy__head">`
      + `<button type="button" class="pds-menu-legacy__close" aria-label="Close menu">${icon(ICON('nav-close-tag'), 14)}</button>`
      + `<div class="pds-menu-legacy__user">`
      +   `<span class="pds-avatar pds-avatar--text" aria-hidden="true"><span class="pds-avatar__initials">${esc(u.initials || '')}</span></span>`
      +   `<div class="pds-menu-legacy__details"><p class="pds-menu-legacy__name">${esc(u.name || '')}</p><p class="pds-menu-legacy__role">${esc(u.role || '')}</p></div>`
      +   `<hr class="pds-menu-legacy__rule">`
      + `</div>`
      + `<button type="button" class="pds-menu-legacy__logout">Log Out</button>`
      + `</div>`
      + `<ul class="pds-menu-legacy__list">`
      + cfg.items.map(it => `<li><a class="pds-menu-item pds-menu-legacy__item" data-item="${esc(it.id)}" href="${esc(it.href || '#')}">${icon(svgOf(it.icon), 20)}<span class="pds-menu-legacy__label">${esc(it.label)}</span></a></li>`).join('')
      + `</ul>`;
    nav._ml = { cfg, opener: null };
    setCurrent(nav, cfg.current);
    if (cfg.interactive) wire(nav); else nav.querySelectorAll('a,button').forEach(b => b.tabIndex = -1);
    return nav;
  }

  const items = nav => [...nav.querySelectorAll('[data-item]')];
  function fire(nav, name, detail) { nav.dispatchEvent(new CustomEvent('pds-menu-legacy:' + name, { bubbles: true, detail })); }

  function setCurrent(nav, id) {
    nav._ml.cfg.current = id;
    items(nav).forEach(a => {
      const on = a.dataset.item === id;
      a.classList.toggle('pds-menu-item--active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function open(nav, opener) {
    nav._ml.opener = opener || document.activeElement;
    nav.hidden = false; fire(nav, 'open', {});
    const list = items(nav), first = list.find(a => a.tabIndex === 0) || list[0];
    first && first.focus();
  }
  function close(nav) {
    nav.hidden = true; fire(nav, 'close', {});
    const o = nav._ml.opener; if (o && o.focus && document.contains(o)) o.focus();
  }
  function toggle(nav, opener) { nav.hidden ? open(nav, opener) : close(nav); }

  function rove(list, target) { list.forEach(a => a.tabIndex = a === target ? 0 : -1); target && target.focus(); }

  function wire(nav) {
    const list = items(nav);
    const start = list.find(a => a.dataset.item === nav._ml.cfg.current) || list[0];
    list.forEach(a => a.tabIndex = a === start ? 0 : -1);

    nav.addEventListener('click', e => {
      const b = e.target.closest('a,button'); if (!b || !nav.contains(b)) return;
      if (b.classList.contains('pds-menu-legacy__close')) return close(nav);
      if (b.classList.contains('pds-menu-legacy__logout')) return fire(nav, 'logout', {});
      if (b.hasAttribute('data-item')) {
        rove(list, b);
        setCurrent(nav, b.dataset.item);
        fire(nav, 'navigate', { id: b.dataset.item, label: b.textContent.trim(), href: b.getAttribute('href') });
      }
    });

    nav.addEventListener('keydown', e => {
      const t = e.target, k = e.key;
      if (k === 'Escape') { e.preventDefault(); return close(nav); }
      if (!t.hasAttribute('data-item')) return;
      const i = list.indexOf(t);
      if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); rove(list, list[(i + (k === 'ArrowDown' ? 1 : -1) + list.length) % list.length]); }
      else if (k === 'Home' || k === 'End') { e.preventDefault(); rove(list, k === 'Home' ? list[0] : list[list.length - 1]); }
      else if (k === ' ') { e.preventDefault(); t.click(); }
    });
  }

  window.pdsMenuLegacy = { create, open, close, toggle, setCurrent };
})();
