/* Pando DS V1 — List behaviour (window.pdsList)
   1. Row select: the kit checkbox in .pds-list__check. On change the row gets
      aria-selected + .is-selected (no visual in Figma) and the closest
      [data-pds-list] container fires "pds-list-select" with the selected rows.
      Figma has no header checkbox, so there is no select-all.
   2. Expand/Collapse: .pds-list__toggle swaps the Navigation/List-Type icon
      (List Expand ↔ List Collapse) and flips aria-expanded. What expands is not
      defined in Figma — listen for "pds-list-toggle" on the row.
   Hover is CSS only (:hover → Hover variant). */
(function () {
  function rowOf(el) { return el.closest('.pds-list'); }

  function syncRow(input) {
    const row = rowOf(input);
    if (!row) return;
    row.classList.toggle('is-selected', input.checked);
    row.setAttribute('aria-selected', String(input.checked));
  }

  function selected(container) {
    return Array.from(container.querySelectorAll('.pds-list .pds-list__check input:checked')).map(rowOf);
  }

  function toggle(btn, force, silent) {
    const open = typeof force === 'boolean' ? force : btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    const exp = btn.querySelector('[data-icon="expand"]');
    const col = btn.querySelector('[data-icon="collapse"]');
    if (exp) exp.hidden = open;
    if (col) col.hidden = !open;
    const row = rowOf(btn);
    if (row && !silent) row.dispatchEvent(new CustomEvent('pds-list-toggle', { bubbles: true, detail: { expanded: open } }));
  }

  function init(root) {
    root = root || document;
    root.querySelectorAll('.pds-list__check input[type="checkbox"]').forEach(input => {
      if (input.__pdsList) return; input.__pdsList = true;
      syncRow(input);
      input.addEventListener('change', () => {
        syncRow(input);
        const box = input.closest('[data-pds-list]');
        if (box) box.dispatchEvent(new CustomEvent('pds-list-select', { detail: { rows: selected(box) } }));
      });
    });
    root.querySelectorAll('.pds-list__toggle').forEach(btn => {
      if (btn.__pdsList) return; btn.__pdsList = true;
      if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
      toggle(btn, btn.getAttribute('aria-expanded') === 'true', true);
      btn.addEventListener('click', () => toggle(btn));
    });
  }

  window.pdsList = { init, selected, toggle };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
