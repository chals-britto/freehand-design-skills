/* Pando DS V1 — Side Nav behaviour. Requires side-nav.css.
   Markup:
     <nav class="pds-side-nav" aria-label="…" data-pds-side-nav>
       <ul class="pds-side-nav__list">
         <li><a class="pds-side-nav__item" href="#cost" aria-label="Cost">…icon…</a></li>
         …
   Behaviour:
     · One item is active (State=Active): white fill + aria-current.
     · Click / Enter (and Space on a <button>) makes an item active.
     · The rail is one Tab stop (roving tabindex): ↑ / ↓ move focus between
       items and wrap at the ends; Enter activates the focused item.
     · Fires "pds-side-nav:change" on the <nav> with detail { item, index }.
   API (window.pdsSideNav):
     init(nav)               wire one rail (auto-run for every [data-pds-side-nav])
     setActive(nav, target)  target = item element or index
     getActive(nav)          → active item element or null
   aria-current value: "page" by default; set data-current="location" (or
   another token) on the <nav> for in-page section navigation. */
(function () {
  const ITEM = '.pds-side-nav__item';
  const items = nav => Array.from(nav.querySelectorAll(ITEM)).filter(i => !i.hidden && !i.disabled);

  function getActive(nav) {
    return nav.querySelector(ITEM + '.pds-side-nav__item--active') || null;
  }

  function setActive(nav, target, silent) {
    const list = items(nav);
    const it = typeof target === 'number' ? list[target] : target;
    if (!it) return null;
    const value = nav.dataset.current || 'page';
    list.forEach(i => {
      const on = i === it;
      i.classList.toggle('pds-side-nav__item--active', on);
      if (on) i.setAttribute('aria-current', value); else i.removeAttribute('aria-current');
      i.tabIndex = on ? 0 : -1;
    });
    if (!silent) nav.dispatchEvent(new CustomEvent('pds-side-nav:change', { bubbles: true, detail: { item: it, index: list.indexOf(it) } }));
    return it;
  }

  function init(nav) {
    if (!nav || nav.__pdsSideNav) return;
    nav.__pdsSideNav = true;
    const list = items(nav);
    const start = list.find(i => i.classList.contains('pds-side-nav__item--active') || (i.hasAttribute('aria-current') && i.getAttribute('aria-current') !== 'false')) || list[0];
    if (start) setActive(nav, start, true);

    nav.addEventListener('click', e => {
      const it = e.target.closest(ITEM);
      if (!it || !nav.contains(it)) return;
      if (it.tagName === 'A' && it.getAttribute('href') === '#') e.preventDefault();
      setActive(nav, it);
    });

    nav.addEventListener('keydown', e => {
      const it = e.target.closest(ITEM);
      if (!it) return;
      const l = items(nav), i = l.indexOf(it);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = l[(i + (e.key === 'ArrowDown' ? 1 : -1) + l.length) % l.length];
        l.forEach(x => { x.tabIndex = x === next ? 0 : -1; });
        next.focus();
      } else if (e.key === 'Enter' && it.tagName !== 'A' && it.tagName !== 'BUTTON') {
        e.preventDefault();
        setActive(nav, it);
      }
    });

    /* When focus leaves the rail, the next Tab into it lands on the active item. */
    nav.addEventListener('focusout', e => {
      if (nav.contains(e.relatedTarget)) return;
      const a = getActive(nav);
      if (a) items(nav).forEach(x => { x.tabIndex = x === a ? 0 : -1; });
    });
  }

  window.pdsSideNav = { init, setActive: (nav, t) => setActive(nav, t), getActive };
  const boot = () => document.querySelectorAll('[data-pds-side-nav]').forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
