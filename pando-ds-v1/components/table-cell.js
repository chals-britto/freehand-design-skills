/* Pando DS V1 — Table Cell behaviour. Requires table-cell.css; for Dropdown cells also
   menu.js + table-dropdown.js (and their CSS); checkbox.js only if you use parent/child sync.

   Input Text and Checkbox cells need no JS: Active = :focus-within, Empty = :placeholder-shown,
   Disabled = <input disabled>, the checkbox is the kit checkbox.

   pdsTableCell.init(root = document)
     Mounts a Table Dropdown in every  <td class="pds-table-cell pds-table-cell--dropdown"
     data-pds-dropdown='{"type":"none","options":[{"label":"…"}],"placeholder":"Select Dropdown"}'>
     (any pdsTableDropdown.build option; theme follows .pds-table-cell--dark) and keeps
     .pds-table-cell--active on the cell while its list is open (Figma State=Active).
     Already-mounted cells are skipped. Returns the cells it mounted.

   pdsTableCell.dropdown(cell, options) → the pdsTableDropdown root, mounted in that cell. */
(function () {
  function dropdown(cell, o = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'pds-table-cell__dropdown';
    const dd = window.pdsTableDropdown.build(Object.assign({
      size: 'small',
      placeholder: 'Select Dropdown',            /* Figma cell sample text */
      theme: cell.classList.contains('pds-table-cell--dark') ? 'dark' : 'light'
    }, o));
    wrap.appendChild(dd);
    cell.replaceChildren(wrap);
    cell.dataset.pdsMounted = '';
    const trig = dd.querySelector('.pds-table-dropdown__trigger');
    const sync = () => cell.classList.toggle('pds-table-cell--active', trig.getAttribute('aria-expanded') === 'true');
    new MutationObserver(sync).observe(trig, { attributes: true, attributeFilter: ['aria-expanded'] });
    sync();
    return dd;
  }

  function init(root = document) {
    const cells = [...root.querySelectorAll('.pds-table-cell--dropdown[data-pds-dropdown]:not([data-pds-mounted])')];
    cells.forEach(cell => {
      let o = {};
      try { o = JSON.parse(cell.dataset.pdsDropdown || '{}'); } catch (e) { o = {}; }
      dropdown(cell, o);
    });
    return cells;
  }

  window.pdsTableCell = { init, dropdown };
})();
