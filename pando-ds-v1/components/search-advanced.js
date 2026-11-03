/* Pando DS V1 — Search Section + Search chat behaviour. Requires search-advanced.css,
   input.css/js (Search Section fields), button.css, search-input.css/js (chat field).
   Figma shows static frames only: everything below is added — not in Figma.

   pdsSearchAdvanced.initSection(root)   wire one .pds-search-advanced (Search Section)
     · CLEAR ALL empties every field in the block and refocuses the first one
     · SEARCH fires "pds-search-advanced:search" detail {values: [{label, value}]}
   pdsSearchAdvanced.initChat(root)      wire one .pds-search-advanced--chat
     · typing filters rows by title; CLEAR is disabled while the field is empty,
       enabled once there is text, and clears + refocuses
     · chips (All / Chats / Artifacts) are single-select (aria-pressed) and filter
       rows by data-kind ("chat" | "artifact")
     · ↓ / ↑ move the highlight (.is-active + aria-activedescendant; the highlighted
       row shows "↵ Enter"), Enter opens it → "pds-search-chat:open" {item, title}
     · × fires "pds-search-chat:close"
   pdsSearchAdvanced.initAll(scope = document)   every [data-pds-search-advanced] */
(function () {
  let uid = 0;

  function initSection(root) {
    if (!root || root.__pdsSA) return; root.__pdsSA = true;
    const fields = () => [...root.querySelectorAll('.pds-search-advanced__row:not([hidden]) .pds-input input, .pds-search-advanced__row:not([hidden]) .pds-input textarea')];
    const clear = root.querySelector('[data-action="clear"]');
    const go = root.querySelector('[data-action="search"]');
    if (clear) clear.addEventListener('click', () => {
      fields().forEach(i => { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); });
      const f = fields()[0]; if (f) f.focus();
    });
    if (go) go.addEventListener('click', () => {
      const values = fields().map(i => {
        const w = i.closest('.pds-input'), l = w && w.querySelector('.pds-input__label');
        return { label: l ? l.textContent.trim() : '', value: i.value };
      });
      root.dispatchEvent(new CustomEvent('pds-search-advanced:search', { bubbles: true, detail: { values } }));
    });
  }

  function initChat(root) {
    if (!root || root.__pdsSA) return; root.__pdsSA = true;
    const input = root.querySelector('.pds-search-input__input');
    const clear = root.querySelector('[data-action="clear"]');
    const close = root.querySelector('.pds-search-advanced__close');
    const list = root.querySelector('.pds-search-advanced__list');
    const chips = [...root.querySelectorAll('.pds-search-advanced__chip')];
    if (!input || !list) return;
    if (window.pdsSearchInput) pdsSearchInput.init(root.querySelector('.pds-search-input'));

    if (!list.id) list.id = 'pds-search-chat-' + (++uid);
    list.setAttribute('role', 'listbox');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-controls', list.id);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'true');
    const items = () => [...list.querySelectorAll('.pds-search-advanced__item')];
    const visible = () => items().filter(r => !r.hidden);
    items().forEach(r => { if (!r.id) r.id = list.id + '-i' + (++uid); r.setAttribute('role', 'option'); });

    let kind = (chips.find(c => c.getAttribute('aria-pressed') === 'true') || {}).dataset?.kind || 'all';

    function setActive(r) {
      items().forEach(x => { x.classList.toggle('is-active', x === r); x.setAttribute('aria-selected', String(x === r)); });
      if (r) { input.setAttribute('aria-activedescendant', r.id); r.scrollIntoView({ block: 'nearest' }); }
      else input.removeAttribute('aria-activedescendant');
    }
    function sync() { if (clear) clear.disabled = !input.value; }
    function filter() {
      const q = input.value.trim().toLowerCase();
      items().forEach(r => {
        const t = (r.querySelector('.pds-search-advanced__item-title') || r).textContent.toLowerCase();
        r.hidden = (kind !== 'all' && r.dataset.kind !== kind) || (!!q && !t.includes(q));
      });
      const a = list.querySelector('.is-active');
      if (a && a.hidden) setActive(null);
    }
    function move(d) {
      const v = visible(); if (!v.length) return;
      const i = v.indexOf(list.querySelector('.is-active'));
      setActive(v[i < 0 ? (d > 0 ? 0 : v.length - 1) : (i + d + v.length) % v.length]);
    }
    function open(r) {
      const title = (r.querySelector('.pds-search-advanced__item-title') || r).textContent.trim();
      root.dispatchEvent(new CustomEvent('pds-search-chat:open', { bubbles: true, detail: { item: r, title } }));
    }

    input.addEventListener('input', () => { sync(); filter(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { const a = list.querySelector('.is-active'); if (a && !a.hidden) { e.preventDefault(); open(a); } }
    });
    if (clear) clear.addEventListener('click', () => { input.value = ''; sync(); filter(); input.focus(); });
    if (close) close.addEventListener('click', () => root.dispatchEvent(new CustomEvent('pds-search-chat:close', { bubbles: true })));
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      kind = c.dataset.kind || 'all'; filter();
    }));
    list.addEventListener('mousemove', e => { const r = e.target.closest('.pds-search-advanced__item'); if (r && !r.classList.contains('is-active')) setActive(r); });
    list.addEventListener('mousedown', e => e.preventDefault());   // keep focus in the field
    list.addEventListener('click', e => { const r = e.target.closest('.pds-search-advanced__item'); if (r) open(r); });

    sync(); filter();
    const pre = list.querySelector('.is-active'); if (pre) setActive(pre);
  }

  function initAll(scope) {
    (scope || document).querySelectorAll('[data-pds-search-advanced]').forEach(r =>
      r.classList.contains('pds-search-advanced--chat') ? initChat(r) : initSection(r));
  }

  window.pdsSearchAdvanced = { initSection, initChat, initAll };
})();
