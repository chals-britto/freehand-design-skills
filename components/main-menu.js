/* Pando DS V1 — New Main Menu behaviour. Requires main-menu.css (+ icons.css,
   scrollbar.css, avatar.css, tooltip.css/js) and icons/icons-data.js (PDS_ICONS).

   pdsMainMenu.create(config) → <nav class="pds-main-menu">
     config.label     aria-label of the nav (default "Main menu")
     config.modules   [{ id, label, icon, items }]       rail order, top to bottom
                      icon  = kit icon name (e.g. 'menu-analytics') or an <svg> string
                      items = fly-out rows; none → the module is a direct link (tooltip on hover)
       row kinds:     { label, href }                     .Secondary menu Type=Single
                      { section: 'Planning' }             blue section label (Figma instance override)
                      { label, items:[…], expanded }      Type=Arrow (collapsed) / Type=Multiple (expanded)
                      third-level rows: { label, href }   .Third level menu
     config.user      { initials, name, role }            rail avatar + .Name row
     config.current   { module, item }                    current page → Active fill + aria-current
     config.interactive  false → static render (variant pages): no listeners, no tooltips
     config.open      module id whose fly-out is shown at start

   pdsMainMenu.open(menu, opener) / close(menu) / toggle(menu, opener)
   pdsMainMenu.showFly(menu, id, pin) / hideFly(menu)  ·  setCurrent(menu, module, item)
   Events on the nav: pds-main-menu:open · :close · :navigate {module, item, href} · :logout

   Behaviour: hover a rail item → its fly-out shows; click pins it (click again
   unpins); pointer leaving the menu falls back to the pinned fly-out or hides it.
   Rail item with no fly-out (Settings, Profile) shows the kit Tooltip on hover.
   Keyboard (added in review — not in Figma): rail and fly-out are one Tab stop each;
   ↑/↓ move (wrap), Home/End; Enter/Space/→ on a rail item opens its fly-out and
   moves focus in; in the fly-out Enter follows a link or toggles a group, → expands,
   ← collapses a group or goes back to the rail; Esc hides the fly-out, then closes the menu. */
(function () {
  let uid = 0;
  const ICON = n => { const i = (window.PDS_ICONS || []).find(x => x.n === n); return i ? i.svg : ''; };
  const svgOf = v => (v && v.trim().startsWith('<svg')) ? v : ICON(v);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = (svg, size) => `<span class="pds-icon pds-icon--${size}" aria-hidden="true">${svg}</span>`;
  const caret = () => `<span class="pds-main-menu__caret" aria-hidden="true">${ICON('nav-right-caret')}</span>`;

  function rowsHTML(items, mod, cur) {
    return items.map(it => {
      if (it.section) return `<li><p class="pds-main-menu__section">${esc(it.section)}</p></li>`;
      if (it.items) {
        const id = 'pds-mm-g' + (++uid), open = !!it.expanded;
        const kids = it.items.map(k => {
          if (k.arrow) return `<li><button type="button" class="pds-main-menu__third pds-main-menu__third--arrow" data-row><span class="pds-main-menu__label">${esc(k.label)}</span>${caret()}</button></li>`;
          const c = cur && cur.module === mod && cur.item === k.label;
          return `<li><a class="pds-main-menu__third" data-row href="${esc(k.href || '#')}"${c ? ' aria-current="page"' : ''}><span class="pds-main-menu__label">${esc(k.label)}</span></a></li>`;
        }).join('');
        return `<li><button type="button" class="pds-main-menu__row" data-row data-group aria-expanded="${open}" aria-controls="${id}"><span class="pds-main-menu__label">${esc(it.label)}</span>${caret()}</button>`
          + `<div class="pds-main-menu__children" id="${id}"${open ? '' : ' hidden'}><span class="pds-main-menu__line" aria-hidden="true"></span><ul>${kids}</ul></div></li>`;
      }
      const c = cur && cur.module === mod && cur.item === it.label;
      return `<li><a class="pds-main-menu__row" data-row href="${esc(it.href || '#')}"${c ? ' aria-current="page"' : ''}><span class="pds-main-menu__label">${esc(it.label)}</span></a></li>`;
    }).join('');
  }

  function flyHTML(m, cfg, id) {
    const u = cfg.user || {};
    return `<div class="pds-main-menu__fly" id="${id}" data-module="${esc(m.id)}" role="group" aria-label="${esc(m.label)}" hidden>`
      + `<p class="pds-main-menu__heading">${esc(m.heading || m.label)}</p>`
      + `<ul class="pds-main-menu__scroll pds-scroll pds-scroll--light">${rowsHTML(m.items, m.id, cfg.current)}</ul>`
      + `<div class="pds-main-menu__name"><div class="pds-main-menu__who"><p class="pds-main-menu__user">${esc(u.name || '')}</p><p class="pds-main-menu__role">${esc(u.role || '')}</p></div>`
      + `<button type="button" class="pds-main-menu__logout" aria-label="Logout">${icon(ICON('indicator-logout-14'), 14)}</button></div></div>`;
  }

  function create(cfg) {
    cfg = Object.assign({ label: 'Main menu', modules: [], user: {}, interactive: true }, cfg);
    const nav = document.createElement('nav');
    nav.className = 'pds-main-menu';
    nav.setAttribute('aria-label', cfg.label);
    const base = 'pds-mm' + (++uid);
    let rail = `<div class="pds-main-menu__rail"><button type="button" class="pds-menu-item" data-rail data-close aria-label="Close menu">${icon(ICON('menu-close'), 20)}</button>`
      + `<ul class="pds-main-menu__list pds-scroll pds-scroll--light">`;
    let flys = '';
    cfg.modules.forEach(m => {
      const has = m.items && m.items.length, fid = base + '-' + m.id;
      rail += `<li><button type="button" class="pds-menu-item" data-rail data-module="${esc(m.id)}" aria-label="${esc(m.label)}"${has ? ` aria-expanded="false" aria-controls="${fid}"` : ''}>${icon(svgOf(m.icon), 20)}</button></li>`;
      if (has) flys += flyHTML(m, cfg, fid);
    });
    const u = cfg.user || {};
    rail += `</ul><div class="pds-main-menu__profile"><button type="button" class="pds-avatar pds-avatar--text pds-main-menu__avatar" data-rail data-profile aria-label="Profile${u.name ? ': ' + esc(u.name) : ''}"><span class="pds-avatar__initials">${esc(u.initials || '')}</span></button></div></div>`;
    nav.innerHTML = rail + flys;
    nav._mm = { cfg, pinned: null, shown: null, opener: null };
    paintRail(nav);
    if (cfg.open) showFly(nav, cfg.open, false);
    if (cfg.interactive) wire(nav); else nav.querySelectorAll('a,button').forEach(b => b.tabIndex = -1);
    return nav;
  }

  const railBtns = nav => [...nav.querySelectorAll('[data-rail]')];
  const modBtn = (nav, id) => nav.querySelector(`.pds-main-menu__rail [data-module="${CSS.escape(id)}"]`);
  const flyOf = (nav, id) => nav.querySelector(`.pds-main-menu__fly[data-module="${CSS.escape(id)}"]`);

  /* Active fill: the module whose fly-out shows; otherwise the current module */
  function paintRail(nav) {
    const st = nav._mm, act = st.shown || (st.cfg.current && st.cfg.current.module);
    nav.querySelectorAll('.pds-main-menu__rail [data-module]').forEach(b => {
      const on = b.dataset.module === act;
      b.classList.toggle('pds-menu-item--active', on);
      if (b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded', String(b.dataset.module === st.shown));
      if (st.cfg.current && b.dataset.module === st.cfg.current.module) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
  }

  function showFly(nav, id, pin) {
    const st = nav._mm, f = flyOf(nav, id);
    nav.querySelectorAll('.pds-main-menu__fly').forEach(x => { x.hidden = x !== f; });
    st.shown = f ? id : null;
    if (pin) st.pinned = st.shown;
    paintRail(nav);
    return f;
  }
  function hideFly(nav) {
    const st = nav._mm;
    nav.querySelectorAll('.pds-main-menu__fly').forEach(x => { x.hidden = true; });
    st.shown = null; st.pinned = null; paintRail(nav);
  }

  function setCurrent(nav, module, item) {
    const st = nav._mm; st.cfg.current = { module, item };
    nav.querySelectorAll('.pds-main-menu__fly [aria-current]').forEach(a => a.removeAttribute('aria-current'));
    const f = flyOf(nav, module);
    if (f && item) [...f.querySelectorAll('a[data-row]')].filter(a => a.textContent.trim() === item).forEach(a => a.setAttribute('aria-current', 'page'));
    paintRail(nav);
  }

  function fire(nav, name, detail) { nav.dispatchEvent(new CustomEvent('pds-main-menu:' + name, { bubbles: true, detail })); }

  function open(nav, opener) {
    nav._mm.opener = opener || document.activeElement;
    nav.hidden = false; fire(nav, 'open', {});
    const first = railBtns(nav).find(b => b.tabIndex === 0) || railBtns(nav)[0];
    first && first.focus();
  }
  function close(nav) {
    hideFly(nav); nav.hidden = true; fire(nav, 'close', {});
    const o = nav._mm.opener; if (o && o.focus && document.contains(o)) o.focus();
  }
  function toggle(nav, opener) { nav.hidden ? open(nav, opener) : close(nav); }

  /* Roving tabindex helpers */
  function rove(list, target) { list.forEach(b => b.tabIndex = b === target ? 0 : -1); target && target.focus(); }
  function visibleRows(f) { return [...f.querySelectorAll('[data-row]')].filter(r => !r.closest('[hidden]')); }
  function enterFly(nav, id) {
    const f = showFly(nav, id, true); if (!f) return;
    const rows = visibleRows(f); rove(rows, rows.find(r => r.tabIndex === 0) || rows[0]);
  }

  function wire(nav) {
    const st = nav._mm, rb = railBtns(nav);
    const start = rb.find(b => b.dataset.module === (st.cfg.current && st.cfg.current.module)) || rb[0];
    rb.forEach(b => b.tabIndex = b === start ? 0 : -1);
    nav.querySelectorAll('.pds-main-menu__fly').forEach(f => { const r = visibleRows(f); r.forEach((x, i) => x.tabIndex = i ? -1 : 0); });

    /* Tooltips (kit Tooltip, Style=Text without title): rail items without a fly-out, Profile, Logout */
    if (window.pdsTooltip) {
      const tip = (el, text, beak) => pdsTooltip.attach(el, { text, showTitle: false, beak }).classList.add('pds-main-menu-tip');
      st.cfg.modules.filter(m => !(m.items && m.items.length)).forEach(m => tip(modBtn(nav, m.id), m.label, 9));
      tip(nav.querySelector('[data-profile]'), 'Profile', 9);
      nav.querySelectorAll('.pds-main-menu__logout').forEach(b => tip(b, 'Logout', 6));
    }

    /* Pointer */
    nav.querySelectorAll('.pds-main-menu__rail [data-module]').forEach(b => {
      b.addEventListener('mouseenter', () => { if (flyOf(nav, b.dataset.module)) showFly(nav, b.dataset.module, false); else if (!st.pinned) hideFly(nav); });
    });
    nav.addEventListener('mouseleave', () => { if (st.pinned) showFly(nav, st.pinned, false); else hideFly(nav); });
    document.addEventListener('click', e => { if (!nav.contains(e.target) && st.shown) hideFly(nav); });

    nav.addEventListener('click', e => {
      const b = e.target.closest('button,a'); if (!b || !nav.contains(b)) return;
      if (b.hasAttribute('data-close')) return close(nav);
      if (b.matches('.pds-main-menu__rail [data-module]')) {
        rove(rb, b);
        const id = b.dataset.module;
        if (flyOf(nav, id)) { if (st.pinned === id) hideFly(nav); else showFly(nav, id, true); }
        else { hideFly(nav); setCurrent(nav, id, null); fire(nav, 'navigate', { module: id, item: null, href: null }); }
        return;
      }
      if (b.hasAttribute('data-group')) return toggleGroup(b);
      if (b.classList.contains('pds-main-menu__logout')) return fire(nav, 'logout', {});
      if (b.matches('a[data-row]')) {
        const f = b.closest('.pds-main-menu__fly');
        setCurrent(nav, f.dataset.module, b.textContent.trim());
        fire(nav, 'navigate', { module: f.dataset.module, item: b.textContent.trim(), href: b.getAttribute('href') });
      }
    });

    function toggleGroup(b, force) {
      const want = force === undefined ? b.getAttribute('aria-expanded') !== 'true' : force;
      b.setAttribute('aria-expanded', String(want));
      document.getElementById(b.getAttribute('aria-controls')).hidden = !want;
    }

    /* Keyboard */
    nav.addEventListener('keydown', e => {
      const t = e.target, k = e.key;
      if (t.hasAttribute('data-rail')) {
        const i = rb.indexOf(t);
        if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); rove(rb, rb[(i + (k === 'ArrowDown' ? 1 : -1) + rb.length) % rb.length]); }
        else if (k === 'Home' || k === 'End') { e.preventDefault(); rove(rb, k === 'Home' ? rb[0] : rb[rb.length - 1]); }
        else if ((k === 'Enter' || k === ' ' || k === 'ArrowRight') && t.dataset.module && flyOf(nav, t.dataset.module)) { e.preventDefault(); enterFly(nav, t.dataset.module); }
        else if (k === 'Escape') { e.preventDefault(); if (st.shown) hideFly(nav); else close(nav); }
        return;
      }
      const f = t.closest('.pds-main-menu__fly'); if (!f) return;
      const back = () => { const id = f.dataset.module; hideFly(nav); rove(rb, modBtn(nav, id)); };
      if (t.classList.contains('pds-main-menu__logout')) { if (k === 'Escape') { e.preventDefault(); back(); } return; }
      const rows = visibleRows(f), i = rows.indexOf(t);
      if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); rove(rows, rows[(i + (k === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length]); }
      else if (k === 'Home' || k === 'End') { e.preventDefault(); rove(rows, k === 'Home' ? rows[0] : rows[rows.length - 1]); }
      else if (k === 'ArrowRight' && t.hasAttribute('data-group') && t.getAttribute('aria-expanded') !== 'true') { e.preventDefault(); toggleGroup(t, true); }
      else if (k === 'ArrowLeft') {
        e.preventDefault();
        if (t.hasAttribute('data-group') && t.getAttribute('aria-expanded') === 'true') toggleGroup(t, false);
        else { const g = t.closest('.pds-main-menu__children'); if (g) rove(visibleRows(f), f.querySelector(`[aria-controls="${g.id}"]`)); else back(); }
      }
      else if (k === 'Escape') { e.preventDefault(); back(); }
      else if (k === ' ' && t.tagName === 'A') { e.preventDefault(); t.click(); }
    });
  }

  window.pdsMainMenu = { create, open, close, toggle, showFly, hideFly, setCurrent };
})();
