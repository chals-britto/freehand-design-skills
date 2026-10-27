/* Pando DS V1 — Table behaviour. Requires table.css + table-cell.css, checkbox.js (select all),
   skeleton.css (loading) and empty-state.css (empty). Every cell is a kit Table Cell; this file
   only wires the table-level behaviour. All of it is added — Figma's reference sets are static.

   pdsTable.init(root = document)
     Binds every .pds-table inside root (already-bound tables are skipped):
     · Select rows — the first checkbox in <thead> becomes "select all" for the <tbody>
       (checkbox.js data-pds-parent: indeterminate when some rows are ticked; disabled rows are
       skipped). Rows get aria-selected. Fires bubbling `pds-table-select` {count, rows}.
     · Sort — each header .pds-table-cell__sort-btn cycles none → ascending → descending → none.
       One column at a time; sets aria-sort on the <th>, swaps the kit Sort icon
       (Default / Ascending / Decending), reorders the rows (Child rows stay under their parent)
       and re-applies the alternate background (first body row = Alternate, as in Figma).
       Value = td[data-sort-value] → input value → .pds-table-cell__primary → text.
       Fires bubbling `pds-table-sort` {column, direction}.
   pdsTable.sort(table, columnIndex, 'ascending' | 'descending' | 'none')
   pdsTable.restripe(table)
   pdsTable.loading(table, rows = 10)    body → kit Skeleton rows, aria-busy="true"
   pdsTable.empty(table, {src, alt})      body → one row with the kit Empty State art
   pdsTable.restore(table)                back to the data rows */
(function () {
  /* kit icons — icons/nav-sort-default.svg · nav-sort-ascending-small-big.svg · nav-sort-decending-big-small.svg */
  const P1 = 'M0 5L8 5L4 0Z', P2 = 'M8 7L0 7L4 12Z';
  const icon = (a, b) => `<svg class="pds-table-cell__sort" viewBox="0 0 8 12" aria-hidden="true"><path d="${P1}" fill="${a}"/><path d="${P2}" fill="${b}"/></svg>`;
  const SORT_ICON = {
    none: icon('#E7E7E7', '#B5C3CB'),
    ascending: icon('#234357', '#B5C3CB'),
    descending: icon('#B5C3CB', '#234357')
  };
  const NEXT = { none: 'ascending', ascending: 'descending', descending: 'none' };
  let uid = 0;

  const isDark = t => t.classList.contains('pds-table--dark');
  const body = t => t.querySelector('tbody');
  const headCells = t => [...t.querySelectorAll('thead tr:first-child > th')];
  const rowsOf = t => [...body(t).rows];
  const isChild = r => r.classList.contains('pds-table__row--child');

  function cellValue(td) {
    if (!td) return '';
    if (td.dataset.sortValue != null) return td.dataset.sortValue;
    const inp = td.querySelector('input:not([type="checkbox"])');
    if (inp) return inp.value;
    const p = td.querySelector('.pds-table-cell__primary');
    return (p ? p.textContent : td.textContent).trim();
  }

  function restripe(t) {
    let i = 0;
    rowsOf(t).forEach(r => {
      if (isChild(r) || r.classList.contains('pds-table__state-row')) return;
      const alt = i++ % 2 === 0;                       /* Figma: first body row is Alternate */
      [...r.cells].forEach(td => { if (!td.classList.contains('pds-table-cell--child')) td.classList.toggle('pds-table-cell--alt', alt); });
    });
  }

  function sort(t, col, dir) {
    const tb = body(t);
    if (!tb || t.__pdsState) return;
    /* groups: a row plus the Child rows under it */
    const groups = [];
    rowsOf(t).forEach(r => {
      if (isChild(r) && groups.length) groups[groups.length - 1].push(r); else groups.push([r]);
    });
    groups.forEach((g, i) => { if (g[0].dataset.pdsIndex == null) g[0].dataset.pdsIndex = String(i); });
    const coll = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    groups.sort((a, b) => {
      if (dir === 'none') return a[0].dataset.pdsIndex - b[0].dataset.pdsIndex;
      const c = coll.compare(cellValue(a[0].cells[col]), cellValue(b[0].cells[col]));
      return (dir === 'descending' ? -c : c) || a[0].dataset.pdsIndex - b[0].dataset.pdsIndex;
    });
    groups.forEach(g => g.forEach(r => tb.appendChild(r)));
    headCells(t).forEach((th, i) => {
      const btn = th.querySelector('.pds-table-cell__sort-btn');
      const d = i === col ? dir : 'none';
      if (d === 'none') th.removeAttribute('aria-sort'); else th.setAttribute('aria-sort', d);
      if (btn) {
        const svg = btn.querySelector('svg'); if (svg) svg.outerHTML = SORT_ICON[d]; else btn.innerHTML = SORT_ICON[d];
        btn.dataset.sort = d;
      }
    });
    restripe(t);
    t.dispatchEvent(new CustomEvent('pds-table-sort', { bubbles: true, detail: { column: col, direction: dir } }));
  }

  function syncSelection(t) {
    const rows = rowsOf(t).filter(r => r.querySelector('.pds-checkbox__input'));
    const sel = [];
    rows.forEach(r => {
      const on = r.querySelector('.pds-checkbox__input').checked;
      r.setAttribute('aria-selected', String(on));
      if (on) sel.push(r);
    });
    t.dispatchEvent(new CustomEvent('pds-table-select', { bubbles: true, detail: { count: sel.length, rows: sel } }));
  }

  function bindSelection(t) {
    const tb = body(t), all = t.querySelector('thead .pds-checkbox__input');
    if (!tb || !all) return;
    if (!tb.id) tb.id = 'pds-table-body-' + (++uid);
    all.dataset.pdsParent = tb.id;
    if (window.pdsCheckbox) window.pdsCheckbox.init(t);
    t.addEventListener('change', e => { if (e.target.classList.contains('pds-checkbox__input')) syncSelection(t); });
    rowsOf(t).forEach(r => { if (r.querySelector('.pds-checkbox__input')) r.setAttribute('aria-selected', String(r.querySelector('.pds-checkbox__input').checked)); });
  }

  function bindSort(t) {
    headCells(t).forEach((th, i) => {
      const btn = th.querySelector('.pds-table-cell__sort-btn');
      if (!btn) return;
      btn.dataset.sort = btn.dataset.sort || 'none';
      btn.addEventListener('click', () => sort(t, i, NEXT[btn.dataset.sort || 'none']));
    });
  }

  function init(root = document) {
    const list = [...root.querySelectorAll('.pds-table:not([data-pds-bound])')];
    if (root.classList && root.classList.contains('pds-table') && !root.hasAttribute('data-pds-bound')) list.unshift(root);
    list.forEach(t => { t.setAttribute('data-pds-bound', ''); bindSelection(t); bindSort(t); });
    return list;
  }

  /* ── States ─────────────────────────────────────────────────── */
  function swapBody(t, tb, state) {
    const cur = body(t), grid = t.querySelector('.pds-table__grid');
    if (!t.__pdsBody) t.__pdsBody = cur;          /* keep the data rows */
    cur.replaceWith(tb);
    t.__pdsState = state;
    grid.setAttribute('aria-busy', String(state === 'loading'));
    const all = t.querySelector('thead .pds-checkbox__input');
    if (all) all.disabled = true;
  }

  function loading(t, n = 10) {
    const cols = headCells(t), dark = isDark(t);
    const tb = document.createElement('tbody');
    for (let r = 0; r < n; r++) {
      const tr = document.createElement('tr');
      tr.className = 'pds-table__state-row';
      cols.forEach(th => {
        const size = th.offsetWidth >= 136 || !th.offsetWidth ? 120 : 80;   /* fits the 0 / 8 padding */
        const td = document.createElement('td');
        td.className = 'pds-table-cell pds-table-cell--text' + (dark ? ' pds-table-cell--dark' : '') + (r % 2 === 0 ? ' pds-table-cell--alt' : '');
        td.innerHTML = `<div class="pds-skeleton pds-skeleton--${size} pds-skeleton--${dark ? 'dark' : 'light'}" aria-hidden="true"><span class="pds-skeleton__block"></span><span class="pds-skeleton__block"></span></div>`;
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    }
    swapBody(t, tb, 'loading');
  }

  function empty(t, o = {}) {
    const tb = document.createElement('tbody'), tr = document.createElement('tr'), td = document.createElement('td');
    tr.className = 'pds-table__state-row';
    td.className = 'pds-table__empty';
    td.colSpan = headCells(t).length || 1;
    const theme = isDark(t) ? 'dark' : 'light';
    const src = o.src || `empty-state/no-records-${theme}.png`;
    td.innerHTML = `<div class="pds-empty pds-empty--${theme}"><img class="pds-empty__art" src="${src}" alt="${o.alt == null ? 'no records' : o.alt}"></div>`;
    tr.appendChild(td); tb.appendChild(tr);
    swapBody(t, tb, 'empty');
  }

  function restore(t) {
    if (!t.__pdsBody) return;
    body(t).replaceWith(t.__pdsBody);
    t.__pdsBody = null; t.__pdsState = null;
    t.querySelector('.pds-table__grid').setAttribute('aria-busy', 'false');
    const all = t.querySelector('thead .pds-checkbox__input');
    if (all) { all.disabled = false; if (window.pdsCheckbox) window.pdsCheckbox.syncParent(all); }
  }

  window.pdsTable = { init, sort, restripe, loading, empty, restore };
})();
