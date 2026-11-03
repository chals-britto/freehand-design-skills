/* Pando DS V1 — Search panel (molecule) behaviour + markup.
   Requires search-panel.css and the kit: tabs.js, toggle-tab.js, menu.js,
   icons/icons-data.js (window.PDS_ICONS).

   pdsSearchPanel.render(state) → HTML string (one panel, static or live)
     state = {
       tab: 0 | 1,  tabLabels: ['lane', 'vendor'],  tabDisabled: -1 | 0 | 1,
       both: true → render both tab panels (live); false → only the selected one (specimen)
       lane:   { placeholder, value,
                 types: [{ key, label, look:'active'|'default', tag:'Lot Name : HYD-DUB' }],
                 subs:  null | [{ label, look:'active'|'secondary'|'default' }],
                 rows:  null | ['Air', …],
                 enabled: bool (Clear / Apply) },
       vendor: { placeholder, value, header:'vendor name', tags:['…'], more: 2,
                 rows: [{ label, selected }], enabled: bool },
       static: true → kit JS leaves specimens alone
     }
   pdsSearchPanel.mount(host, opts) → live panel built from the Figma sample data
     · Tabs: kit Tab Group (click, ←/→, Home/End) switch lane ↔ vendor.
     · Type row + sub-type row: kit Toggle Tab radiogroups (click, arrows).
       Picking a type swaps the placeholder and shows its sub-types or its value rows.
     · Typing filters the value rows / vendor rows (case-insensitive).
       ↓ / ↑ move the highlight, Enter picks it. Picking a value row fills the field.
     · Apply: the typed value becomes an Input Tag "<Type> : <value>" in place of
       the type chip, and the next free type is selected. × on the tag removes it.
     · Clear: empties the field and removes every applied tag / vendor pick.
     · Vendor rows toggle (checkbox); the first 3 picks show as Input Tags in the
       field and the rest as a Multiselect Tag "+ n"; × deselects.
     · Clear / Apply are disabled until there is a value, a tag or a pick.
   Events (bubble from the panel):
     'pds-search-panel:apply' { tab, filters:[{type, label, value}], vendors:[…] }
     'pds-search-panel:clear' {} */
(function () {
  let uid = 0;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = n => {
    const i = (window.PDS_ICONS || []).find(x => x.n === n);
    return i ? i.svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" ') : '';
  };

  /* Figma sample data (Search 4894:18073) */
  const TYPES = [
    { key: 'lot', label: 'lot/ lane', subs: ['lot', 'lane'],
      ph: { lot: 'Search for a Lot Name', lane: 'Search for a Lane Name' }, tag: { lot: 'Lot Name', lane: 'Lane Name' } },
    { key: 'source', label: 'Source', subs: ['code', 'port', 'city', 'state', 'zip', 'region', 'country'],
      ph: 'Search for a Source City', tag: 'Source' },
    { key: 'destination', label: 'destination', subs: ['code', 'port', 'city', 'state', 'zip', 'region', 'country'],
      ph: 'Search for a Destination City', tag: 'Destination' },
    { key: 'mode', label: 'mode', rows: ['Air', 'Ocean', 'Road'], ph: 'Search for a Mode', tag: 'Mode' },
    { key: 'movement', label: 'movement type', rows: ['Door to Door', 'Door to Port', 'Port to Door', 'Port to Port'],
      ph: 'Search for a Movement Type', tag: 'Movement Type' },
    { key: 'delivery', label: 'Delivery type', rows: ['Cargo', 'FCL', 'LCL', 'TL', 'LTL'],
      ph: 'Search for a Delivery type', tag: 'Delivery type' }
  ];
  const VENDORS = ['Lufthansa Cargo', 'DB Schenker', 'Maersk', 'Crane', 'CEVA Logistics', 'Hellman Worldwide Logistics', 'KWE', 'FEDEX'];
  const TIP = '<b>Tip</b> : Search for a single value within a lane type, but combine searches across types';

  /* ── Markup ─────────────────────────────────────────────────── */
  function tag(text, removeLabel) {
    return `<span class="pds-tag pds-tag--input"><span class="pds-tag__text">${esc(text)}</span><button type="button" class="pds-tag__remove" aria-label="Remove ${esc(removeLabel || text)}" data-remove="${esc(removeLabel || text)}">${icon('nav-close-tag')}</button></span>`;
  }

  function search(id, p, tags, listId, live) {
    return `<div class="pds-search-panel__search"><div class="pds-search-input"><div class="pds-search-input__field">
      <span class="pds-icon pds-search-input__icon" aria-hidden="true">${icon('nav-search-10')}</span>
      <span class="pds-search-panel__tags">${tags || ''}</span>
      <input class="pds-search-input__input" type="search" id="${id}" aria-label="${esc(p.placeholder)}" placeholder="${tags ? '' : esc(p.placeholder)}" value="${esc(p.value)}"${listId ? ` role="combobox" aria-expanded="true" aria-controls="${listId}" aria-autocomplete="list"` : ''}${live ? '' : ' tabindex="-1"'}>
    </div></div></div>`;
  }

  function chip(label, look, extra) {
    const cls = 'pds-toggle-tabs__option' + (look === 'secondary' ? ' pds-search-panel__chip--secondary' : '');
    return `<button type="button" class="${cls}" role="radio" aria-checked="${look === 'active'}" tabindex="${look === 'active' ? 0 : -1}"${extra || ''}><span class="pds-toggle-tabs__label">${esc(label)}</span></button>`;
  }

  function buttons(enabled, cls) {
    const d = enabled ? '' : ' disabled';
    return `<div class="pds-button-group pds-search-panel__buttons${cls || ''}">
      <button type="button" class="pds-button pds-button--text pds-button--small" data-action="clear"${d}><span class="pds-button__label">Clear</span></button>
      <button type="button" class="pds-button pds-button--small" data-action="apply"${d}><span class="pds-button__label">Apply</span></button>
    </div>`;
  }

  function lanePanel(s, u, hidden) {
    const L = s.lane, st = s.static ? ' data-pds-toggle-tab="1"' : '';
    const listId = L.rows ? u + '-rows' : '';
    const types = L.types.map(t => t.tag ? tag(t.tag, t.tag).replace('class="pds-tag', `data-type="${esc(t.key || '')}" class="pds-tag`)
      : chip(t.label, t.look, ` data-type="${esc(t.key || '')}"`)).join('');
    let body = `<div class="pds-search-panel__header"><div class="pds-toggle-tabs pds-toggle-tabs--steps">
        <span class="pds-toggle-tabs__desc" id="${u}-type">Type</span>
        <div class="pds-toggle-tabs__options" role="radiogroup" aria-labelledby="${u}-type" data-group="type"${st}>${types}</div></div></div>`;
    if (L.subs) body += `<div class="pds-search-panel__subs"><div class="pds-toggle-tabs pds-toggle-tabs--steps">
        <div class="pds-toggle-tabs__options" role="radiogroup" aria-label="Search by" data-group="sub"${st}>${L.subs.map(x => chip(x.label, x.look, ` data-sub="${esc(x.label)}"`)).join('')}</div></div></div>`;
    if (L.rows) body += `<div class="pds-search-panel__results" role="listbox" id="${listId}" aria-label="Values">${L.rows.map((r, i) =>
        `<div class="pds-menu__row${i % 2 === 0 ? ' pds-menu__row--alt' : ''}" role="option" id="${u}-r${i}" aria-selected="false" data-value="${esc(r)}"><span class="pds-menu__cell"><span class="pds-menu__cell-text">${esc(r)}</span></span></div>`).join('')}</div>`;
    body += `<div class="pds-search-panel__foot"><p class="pds-search-panel__tip">${TIP}</p>${buttons(L.enabled)}</div>`;
    return `<div class="pds-tabs__panel pds-search-panel__panel" role="tabpanel" id="${u}-p0" aria-labelledby="${u}-t0" data-panel="lane"${hidden ? ' hidden' : ''}>
      ${search(u + '-q0', L, '', listId, !s.static)}${body}</div>`;
  }

  function vendorPanel(s, u, hidden) {
    const V = s.vendor;
    const tags = (V.tags || []).map(t => tag(t, t)).join('') + (V.more ? `<span class="pds-tag pds-tag--count">+ ${V.more}</span>` : '');
    const m = window.pdsMenu.build({ type: 'table', flat: true, multiple: true, static: true, label: 'Vendors',
      rows: V.rows.map(r => ({ cells: [r.label], selected: r.selected })) });
    const list = m._listbox; list.id = u + '-vrows';
    const head = window.pdsMenu.parts.head([V.header || 'vendor name']).outerHTML;
    return `<div class="pds-tabs__panel pds-search-panel__panel" role="tabpanel" id="${u}-p1" aria-labelledby="${u}-t1" data-panel="vendor"${hidden ? ' hidden' : ''}>
      ${search(u + '-q1', V, tags, list.id, !s.static)}
      <div class="pds-search-panel__table">${head}${m.outerHTML}</div>
      ${buttons(V.enabled)}</div>`;
  }

  function render(s) {
    const u = s.uid || ('pds-sp-' + (++uid));
    const labels = s.tabLabels || ['lane', 'vendor'];
    const tabs = labels.map((l, i) => `<button type="button" class="pds-tabs__tab" role="tab" id="${u}-t${i}"${s.both ? ` aria-controls="${u}-p${i}"` : ''} aria-selected="${s.tab === i}" tabindex="${s.tab === i ? 0 : -1}"${s.tabDisabled === i ? ' aria-disabled="true"' : ''}>${esc(l)}</button>`).join('');
    const panels = s.both ? lanePanel(s, u, s.tab !== 0) + vendorPanel(s, u, s.tab !== 1)
      : (s.tab === 0 ? lanePanel(s, u, false) : vendorPanel(s, u, false));
    return `<div class="pds-search-panel" role="search" aria-label="Search" data-uid="${u}">
      <div class="pds-tabs pds-search-panel__tabs" role="tablist" aria-label="Search in"${s.static ? ' data-pds-tabs="1"' : ''}>${tabs}</div>
      ${panels}</div>`;
  }

  /* ── Live panel ─────────────────────────────────────────────── */
  function mount(host, opts = {}) {
    const u = 'pds-sp-live-' + (++uid);
    const S = {
      tab: 0, labels: opts.tabLabels || ['lane', 'vendor'],
      type: 'lot', sub: { lot: 'lot', source: 'code', destination: 'code' },
      applied: [],                       /* [{ key, label, value, text }] in apply order */
      laneValue: '', vendorValue: '', picks: []
    };
    let active = -1;                     /* highlighted row index (visible rows) */

    const T = k => TYPES.find(t => t.key === k);
    const tagText = (t, sub) => (typeof t.tag === 'string' ? t.tag : t.tag[sub]) + ' : ';
    const placeholder = t => typeof t.ph === 'string' ? t.ph : t.ph[S.sub[t.key]];

    function state() {
      const t = T(S.type);
      return {
        uid: u, both: true, tab: S.tab, tabLabels: S.labels, tabDisabled: -1,
        lane: {
          placeholder: placeholder(t), value: S.laneValue,
          types: TYPES.map(x => { const a = S.applied.find(p => p.key === x.key);
            return { key: x.key, label: x.label, look: x.key === S.type ? 'active' : 'default', tag: a ? a.text : null }; }),
          subs: t.subs ? t.subs.map(x => ({ label: x, look: x === S.sub[t.key] ? 'active' : 'secondary' })) : null,
          rows: t.rows || null,
          enabled: !!(S.laneValue.trim() || S.applied.length)
        },
        vendor: {
          placeholder: 'Search for Vendors', value: S.vendorValue, header: 'vendor name',
          tags: S.picks.slice(0, 3), more: Math.max(0, S.picks.length - 3),
          rows: VENDORS.map(v => ({ label: v, selected: S.picks.includes(v) })),
          enabled: S.picks.length > 0
        }
      };
    }

    function draw(focusSel) {
      host.innerHTML = render(state());
      const root = host.firstElementChild;
      window.pdsTabs.init(root);
      window.pdsToggleTab.init(root);
      filter();
      if (focusSel) { const f = root.querySelector(focusSel); if (f) { f.focus(); if (f.select && f.tagName === 'INPUT') { const n = f.value.length; f.setSelectionRange(n, n); } } }
    }

    const root = () => host.firstElementChild;
    const panel = () => root().querySelector(S.tab === 0 ? '[data-panel="lane"]' : '[data-panel="vendor"]');
    const input = () => panel().querySelector('.pds-search-input__input');
    const rowsOf = () => [...panel().querySelectorAll('[role="option"]')];
    const visibleRows = () => rowsOf().filter(r => !r.hidden);

    function setActive(i) {
      const rows = visibleRows(), inp = input();
      rows.forEach(r => r.classList.remove('is-active'));
      active = rows.length ? Math.max(-1, Math.min(i, rows.length - 1)) : -1;
      if (active >= 0) { rows[active].classList.add('is-active'); inp.setAttribute('aria-activedescendant', rows[active].id); rows[active].scrollIntoView({ block: 'nearest' }); }
      else inp.removeAttribute('aria-activedescendant');
    }

    function filter() {
      const q = (input() ? input().value : '').trim().toLowerCase();
      rowsOf().forEach(r => { r.hidden = !!q && !r.dataset.value.toLowerCase().includes(q); });
      setActive(-1);
      syncButtons();
    }

    function syncButtons() {
      const lane = !!(S.laneValue.trim() || S.applied.length), ven = S.picks.length > 0;
      root().querySelectorAll('[data-panel="lane"] [data-action]').forEach(b => { b.disabled = !lane; });
      root().querySelectorAll('[data-panel="vendor"] [data-action]').forEach(b => { b.disabled = !ven; });
    }

    function nextFreeType() {
      const free = TYPES.filter(t => !S.applied.some(a => a.key === t.key));
      const after = free.find(t => TYPES.indexOf(t) > TYPES.findIndex(x => x.key === S.type));
      return (after || free[0] || TYPES[0]).key;
    }

    function apply() {
      if (S.tab === 0) {
        const v = S.laneValue.trim();
        if (v) {
          const t = T(S.type);
          S.applied = S.applied.filter(a => a.key !== t.key);
          S.applied.push({ key: t.key, label: tagText(t, S.sub[t.key]).slice(0, -3), value: v, text: tagText(t, S.sub[t.key]) + v });
          S.laneValue = '';
          S.type = nextFreeType();
        }
        draw('[data-panel="lane"] .pds-search-input__input');
      }
      root().dispatchEvent(new CustomEvent('pds-search-panel:apply', { bubbles: true, detail: {
        tab: S.labels[S.tab], filters: S.applied.map(a => ({ type: a.key, label: a.label, value: a.value })), vendors: S.picks.slice() } }));
    }

    function clear() {
      if (S.tab === 0) { S.laneValue = ''; S.applied = []; draw('[data-panel="lane"] .pds-search-input__input'); }
      else { S.vendorValue = ''; S.picks = []; draw('[data-panel="vendor"] .pds-search-input__input'); }
      root().dispatchEvent(new CustomEvent('pds-search-panel:clear', { bubbles: true, detail: {} }));
    }

    function pick(row) {
      if (!row) return;
      if (S.tab === 0) { S.laneValue = row.dataset.value; draw('[data-panel="lane"] .pds-search-input__input'); }
      else {
        const v = row.dataset.value;
        S.picks = S.picks.includes(v) ? S.picks.filter(x => x !== v) : S.picks.concat(v);
        const idx = visibleRows().indexOf(row);
        draw('[data-panel="vendor"] .pds-search-input__input'); setActive(idx);
      }
    }

    host.addEventListener('pds-tabs-change', e => { S.tab = e.detail.index; filter(); });
    host.addEventListener('pds-change', e => {
      const g = e.target.closest('[data-group]'); if (!g) return;
      const opt = g.querySelectorAll('.pds-toggle-tabs__option')[e.detail.index];
      if (g.dataset.group === 'type') { S.type = opt.dataset.type; S.laneValue = ''; draw(`[data-panel="lane"] [data-type="${S.type}"]`); }
      else { S.sub[S.type] = opt.dataset.sub; draw(`[data-panel="lane"] [data-sub="${opt.dataset.sub}"]`); }
    });
    host.addEventListener('input', e => {
      if (!e.target.matches('.pds-search-input__input')) return;
      if (S.tab === 0) S.laneValue = e.target.value; else S.vendorValue = e.target.value;
      filter();
    });
    host.addEventListener('keydown', e => {
      if (!e.target.matches('.pds-search-input__input')) return;
      const n = visibleRows().length;
      if (e.key === 'ArrowDown' && n) { e.preventDefault(); setActive(active < 0 ? 0 : (active + 1) % n); }
      else if (e.key === 'ArrowUp' && n) { e.preventDefault(); setActive(active <= 0 ? n - 1 : active - 1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (active >= 0) pick(visibleRows()[active]); else if (S.tab === 0 && S.laneValue.trim()) apply();
      }
      else if (e.key === 'Backspace' && !e.target.value && S.tab === 1 && S.picks.length) { S.picks.pop(); draw('[data-panel="vendor"] .pds-search-input__input'); }
    });
    host.addEventListener('mousedown', e => { if (e.target.closest('[role="option"]')) e.preventDefault(); });
    host.addEventListener('click', e => {
      const rm = e.target.closest('.pds-tag__remove');
      if (rm) {
        const v = rm.dataset.remove;
        if (S.tab === 0) S.applied = S.applied.filter(a => a.text !== v); else S.picks = S.picks.filter(x => x !== v);
        draw(`[data-panel="${S.tab === 0 ? 'lane' : 'vendor'}"] .pds-search-input__input`);
        return;
      }
      const row = e.target.closest('[role="option"]'); if (row) { pick(row); return; }
      const b = e.target.closest('[data-action]'); if (!b || b.disabled) return;
      if (b.dataset.action === 'apply') apply(); else clear();
    });

    draw();
    return { root: root(), state: S };
  }

  window.pdsSearchPanel = { render, mount, TYPES, VENDORS };
})();
