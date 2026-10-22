/* Pando DS V1 — Checkbox behaviour
   Native <input type="checkbox"> does the work. This file only:
   1. sets the indeterminate property (it has no HTML attribute): data-indeterminate
   2. keeps a parent in sync with its children (Figma: "If a group contains a mix of
      checked and unchecked children, the parent will show an indeterminate state.")
      Parent: <input data-pds-parent="kids-id">  ·  children live inside #kids-id. */
(function () {
  function childInputs(parent) {
    const box = document.getElementById(parent.dataset.pdsParent);
    return box ? Array.from(box.querySelectorAll('input[type="checkbox"]:not(:disabled)')) : [];
  }
  function syncParent(parent) {
    const kids = childInputs(parent);
    if (!kids.length) return;
    const on = kids.filter(k => k.checked).length;
    parent.checked = on === kids.length;
    parent.indeterminate = on > 0 && on < kids.length;
  }
  function init(root) {
    root = root || document;
    root.querySelectorAll('input[data-indeterminate]').forEach(i => { i.indeterminate = true; });
    root.querySelectorAll('input[data-pds-parent]').forEach(parent => {
      if (parent.__pdsBound) return; parent.__pdsBound = true;
      const id = parent.dataset.pdsParent;
      parent.setAttribute('aria-controls', id);
      parent.addEventListener('change', () => {
        childInputs(parent).forEach(k => { k.checked = parent.checked; });
        parent.indeterminate = false;
      });
      const box = document.getElementById(id);
      if (box) box.addEventListener('change', e => { if (e.target !== parent) syncParent(parent); });
      syncParent(parent);
    });
  }
  window.pdsCheckbox = { init, syncParent };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
