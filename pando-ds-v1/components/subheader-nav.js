/* Pando DS V1 — Subheader Menu (organism, id subheader-nav). Requires ../tokens.css, menu-panels.css
   (the trigger classes) and subheader-nav.css.

   pdsSubheaderNav.build(o) → <nav>   (Figma "Subheader Menu" 2263:3752)
     label      trigger text (Figma sample 'setup')
     items      Level 1 list: [{ label, value, href?, children:[ Level 2 …{ label, value, href?, children:[ Tertiary … ] } ] }]
                default = the Figma component: 4 Level 1 rows (rows 3 and 4 carry the Right-Caret),
                Level 2 = Menu Option · Menu Option (+2 Tertiary) · Menu Option. Sample text 'Menu Option'.
     active     path of the Active item, e.g. [2, 1, 0] (Level 1 index, Level 2 index, Tertiary index)
     expanded   Level 1 index whose children fill Level 2 (default: the parent of `active`, else the first parent)
     showValue  default true — the trigger shows the Active label; a Tertiary shows 'Secondary - Tertiary'
                (Figma .documentation “Uses” text, see subheader-nav.md)
     open       true → starts open · static true → drawn open, no behaviour (documentation)
     onChange({ path, value, labels })
   Fires bubbling 'pds-change' { path, value, labels } on the <nav>.

   pdsSubheaderNav.item(o) → element   (Figma ".Secondary menu items" 2263:947)
     type 'secondary' | 'tertiary' · state 'default' | 'hover' | 'active' · caret (Secondary only) · label

   Keyboard (disclosure-navigation pattern, WAI-ARIA APG): trigger Enter / Space toggles, ↓ opens and focuses
   the first row; in the flyout ↑ ↓ move (wrap), Home / End; → or Enter / Space on a Level 1 row with a caret
   shows its children in Level 2 and moves focus there; ← in Level 2 returns to that parent; Enter / Space on
   any other row makes it Active and closes; Esc closes and returns focus to the trigger. Tab moves normally;
   focus or a click leaving the component closes it. */
(function () {
  let uid = 0;
  /* SVGs copied from components/icons/ (currentColor) */
  const ARROW_DOWN = '<svg class="pds-menu-panels__arrow pds-menu-panels__arrow--down" viewBox="0 0 8 5" aria-hidden="true"><path d="M8 0L0 0L3.99 5L4 4.99L4.00 5L8 0Z" fill="currentColor"/></svg>'; /* icons/nav-dropdown-arrow-solid.svg */
  const ARROW_UP = '<svg class="pds-menu-panels__arrow pds-menu-panels__arrow--up" viewBox="0 0 8 5" aria-hidden="true"><path d="M8 5L0 5L3.99 0L4 0.00L4.00 0L8 5Z" fill="currentColor"/></svg>'; /* icons/nav-dropdown-arrow-inverse-solid.svg */
  const CARET = '<svg class="pds-subheader-nav__caret" viewBox="0 0 5 8" aria-hidden="true"><path d="M1.20 0.5L0.5 1.24L3.10 4L0.50 6.75L1.20 7.5L4.16 4.37L4.5 4L4.16 3.62L1.20 0.5Z" fill="currentColor"/></svg>'; /* icons/nav-right-caret.svg */

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

  function sample() {
    const L2 = () => [{ label: 'Menu Option' }, { label: 'Menu Option', children: [{ label: 'Menu Option' }, { label: 'Menu Option' }] }, { label: 'Menu Option' }];
    return [{ label: 'Menu Option' }, { label: 'Menu Option' }, { label: 'Menu Option', children: L2() }, { label: 'Menu Option', children: L2() }];
  }

  /* one row of ".Secondary menu items" */
  function row(it, cfg) {
    const tag = it.href && !cfg.parent ? 'a' : 'button';
    const n = el(tag, 'pds-subheader-nav__item' + (cfg.tertiary ? ' pds-subheader-nav__item--tertiary' : '') + (cfg.state === 'hover' ? ' is-hover' : '') + (cfg.state === 'active' && cfg.solo ? ' is-active' : '') + (cfg.solo ? ' pds-subheader-nav__item--solo' : ''),
      `<span class="pds-subheader-nav__text">${esc(it.label)}</span>${cfg.caret ? CARET : ''}`);
    if (tag === 'a') n.href = it.href; else n.type = 'button';
    if (cfg.state === 'active' && !cfg.solo) n.setAttribute('aria-current', 'true');
    if (cfg.tabindex != null) n.tabIndex = cfg.tabindex;
    return n;
  }

  function item(o = {}) {
    const tertiary = o.type === 'tertiary';
    const n = row({ label: o.label || 'Menu Option' }, { tertiary, caret: !tertiary && !!o.caret, state: o.state || 'default', solo: true, tabindex: -1 });
    return n;
  }

  const same = (a, b) => !!a && !!b && a.length === b.length && a.every((x, i) => x === b[i]);

  function build(o = {}) {
    const id = 'pds-subheader-nav-' + (++uid);
    const items = o.items || sample();
    const label = o.label || 'setup';
    const showValue = o.showValue !== false;
    let active = o.active || null;
    const firstParent = items.findIndex(x => x.children && x.children.length);
    let expanded = o.expanded != null ? o.expanded : (active && items[active[0]] && items[active[0]].children ? active[0] : firstParent);

    const root = el('nav', 'pds-subheader-nav pds-menu-panels pds-menu-panels--subheader' + (o.static ? ' pds-subheader-nav--static' : ''));
    root.setAttribute('aria-label', o.ariaLabel || label);
    const trig = el('button', 'pds-menu-panels__trigger', `<span class="pds-menu-panels__label"></span>${ARROW_DOWN}${ARROW_UP}`);
    trig.type = 'button'; trig.id = id + '-trigger';
    trig.setAttribute('aria-controls', id + '-flyout');
    const lab = trig.querySelector('.pds-menu-panels__label');
    const fly = el('div', 'pds-subheader-nav__flyout'); fly.id = id + '-flyout';
    const col1 = el('ul', 'pds-subheader-nav__col pds-subheader-nav__col--1');
    const col2 = el('ul', 'pds-subheader-nav__col pds-subheader-nav__col--2'); col2.id = id + '-l2';
    fly.append(col1, col2);
    root.append(trig, fly);

    function labelsOf(path) {
      const a = items[path[0]], b = path.length > 1 ? a.children[path[1]] : null, c = path.length > 2 ? b.children[path[2]] : null;
      return [a, b, c].filter(Boolean).map(x => x.label);
    }
    function nodeOf(path) { let n = items[path[0]]; for (let i = 1; i < path.length; i++) n = n.children[path[i]]; return n; }
    function setLabel() {
      if (!showValue || !active) { lab.textContent = label; return; }
      const ls = labelsOf(active);
      lab.textContent = active.length === 3 ? ls[1] + ' - ' + ls[2] : ls[ls.length - 1]; /* “Secondary menu - Tertiary menu” */
    }
    const tab = o.static ? -1 : null;

    function render() {
      col1.replaceChildren(); col2.replaceChildren();
      items.forEach((it, i) => {
        const parent = !!(it.children && it.children.length);
        const b = row(it, { parent, caret: parent, state: same(active, [i]) ? 'active' : 'default', tabindex: tab });
        b.dataset.path = String(i);
        if (parent) { b.setAttribute('aria-expanded', i === expanded ? 'true' : 'false'); b.setAttribute('aria-controls', col2.id); }
        const li = el('li'); li.appendChild(b); col1.appendChild(li);
      });
      const p = items[expanded];
      col2.hidden = !(p && p.children && p.children.length);
      if (col2.hidden) return;
      col2.setAttribute('aria-label', p.label);
      p.children.forEach((c, j) => {
        const b = row(c, { state: same(active, [expanded, j]) ? 'active' : 'default', tabindex: tab });
        b.dataset.path = expanded + ',' + j;
        const li = el('li'); li.appendChild(b);
        if (c.children && c.children.length) {
          const ul = el('ul', 'pds-subheader-nav__col'); ul.setAttribute('aria-label', c.label);
          c.children.forEach((t, k) => {
            const tb = row(t, { tertiary: true, state: same(active, [expanded, j, k]) ? 'active' : 'default', tabindex: tab });
            tb.dataset.path = expanded + ',' + j + ',' + k;
            const tl = el('li'); tl.appendChild(tb); ul.appendChild(tl);
          });
          li.appendChild(ul);
        }
        col2.appendChild(li);
      });
    }
    setLabel(); render();

    if (o.static) {
      trig.setAttribute('aria-expanded', 'true'); trig.tabIndex = -1;
      return root;
    }

    const rows = col => [...col.querySelectorAll('.pds-subheader-nav__item')];
    const isOpen = () => !fly.hidden;
    function open(focusFirst) { fly.hidden = false; trig.setAttribute('aria-expanded', 'true'); if (focusFirst) rows(col1)[0]?.focus(); }
    function close(refocus) { fly.hidden = true; trig.setAttribute('aria-expanded', 'false'); if (refocus) trig.focus(); }
    function expand(i, focusL2) {
      expanded = i; render();
      if (focusL2) rows(col2)[0]?.focus(); else col1.querySelector(`[data-path="${i}"]`)?.focus();
    }
    function pick(path) {
      active = path; setLabel(); render(); close(true);
      const detail = { path: path.slice(), value: nodeOf(path).value, labels: labelsOf(path) };
      root.dispatchEvent(new CustomEvent('pds-change', { bubbles: true, detail }));
      if (o.onChange) o.onChange(detail);
    }
    const pathOf = b => b.dataset.path.split(',').map(Number);
    const isParent = b => b.hasAttribute('aria-expanded');

    fly.hidden = !o.open; trig.setAttribute('aria-expanded', o.open ? 'true' : 'false');

    trig.addEventListener('click', () => isOpen() ? close(false) : open(false));
    trig.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(true); }
      else if (e.key === 'Escape' && isOpen()) { e.preventDefault(); close(true); }
    });
    fly.addEventListener('click', e => {
      const b = e.target.closest('.pds-subheader-nav__item'); if (!b) return;
      const p = pathOf(b);
      if (isParent(b)) { expand(p[0], false); return; }
      if (b.tagName !== 'A') e.preventDefault();
      pick(p);
    });
    fly.addEventListener('keydown', e => {
      const b = e.target.closest('.pds-subheader-nav__item'); if (!b) return;
      const inL1 = col1.contains(b);
      const list = rows(inL1 ? col1 : col2), i = list.indexOf(b);
      let n = null;
      switch (e.key) {
        case 'ArrowDown': n = list[(i + 1) % list.length]; break;
        case 'ArrowUp': n = list[(i - 1 + list.length) % list.length]; break;
        case 'Home': n = list[0]; break;
        case 'End': n = list[list.length - 1]; break;
        case 'ArrowRight': if (inL1 && isParent(b)) { e.preventDefault(); expand(pathOf(b)[0], true); } return;
        case 'ArrowLeft': if (!inL1) { e.preventDefault(); col1.querySelector(`[data-path="${expanded}"]`)?.focus(); } return;
        case 'Enter': case ' ':
          if (isParent(b)) { e.preventDefault(); expand(pathOf(b)[0], true); }
          else if (e.key === ' ' || b.tagName !== 'A') { e.preventDefault(); b.click(); }
          return;
        case 'Escape': e.preventDefault(); close(true); return;
        default: return;
      }
      e.preventDefault(); n?.focus();
    });
    root.addEventListener('focusout', e => { if (isOpen() && e.relatedTarget && !root.contains(e.relatedTarget)) close(false); });
    document.addEventListener('pointerdown', e => { if (isOpen() && !root.contains(e.target)) close(false); });

    root._pds = { open: () => open(false), close: () => close(false), get active() { return active && active.slice(); } };
    return root;
  }

  window.pdsSubheaderNav = { build, item };
})();
