/* Pando DS V1 — Toggle Tab (molecule) behaviour. Requires toggle-tab.css.
   Markup (any Type):
     <div class="pds-toggle-tabs pds-toggle-tabs--segment" role="radiogroup" aria-label="View">
       <button class="pds-toggle-tabs__option" role="radio" aria-checked="true">Option 1</button>
       <button class="pds-toggle-tabs__option" role="radio" aria-checked="false">Option 2</button>
     </div>
   Type = Single Selection with Description puts the radiogroup on the inner
   .pds-toggle-tabs__options and labels it with the description (aria-labelledby).

   Behaviour (segmented selection):
     - Exactly one option is selected (aria-checked="true").
     - One tab stop: roving tabindex, only the selected option has tabindex="0".
     - Click selects. ←/↑ previous, →/↓ next (wraps), Home / End first / last.
       Selection follows focus.
     - Fires a bubbling 'pds-change' on the radiogroup, detail = { index, value }
       (value = data-value, else the option's text, else aria-label).
   API (window.pdsToggleTab):
     init(root = document)   wire every radiogroup inside .pds-toggle-tabs (idempotent)
     select(group, index)    select option `index` in a radiogroup */
(function () {
  const OPTION = '.pds-toggle-tabs__option';
  const optionsOf = g => Array.from(g.querySelectorAll(OPTION));
  const valueOf = o => o.dataset.value || o.textContent.trim() || o.getAttribute('aria-label') || '';

  function groupsIn(root) {
    const out = [];
    (root || document).querySelectorAll('.pds-toggle-tabs').forEach(b => {
      if (b.getAttribute('role') === 'radiogroup') out.push(b);
      else { const inner = b.querySelector('.pds-toggle-tabs__options'); if (inner) out.push(inner); }
    });
    return out;
  }

  function select(group, index, focus) {
    const opts = optionsOf(group), opt = opts[index];
    if (!opt) return;
    opts.forEach((o, i) => {
      o.setAttribute('aria-checked', i === index ? 'true' : 'false');
      o.tabIndex = i === index ? 0 : -1;
    });
    if (focus) opt.focus();
    group.dispatchEvent(new CustomEvent('pds-change', { bubbles: true, detail: { index, value: valueOf(opt) } }));
  }

  function wire(group) {
    if (group.dataset.pdsToggleTab) return;
    group.dataset.pdsToggleTab = '1';
    group.setAttribute('role', 'radiogroup');
    const opts = optionsOf(group);
    if (group.dataset.pdsStatic) {          /* specimens on the doc page: keep their state, no wiring */
      opts.forEach(o => { o.setAttribute('role', 'radio'); if (o.tagName === 'BUTTON') o.type = 'button'; });
      return;
    }
    let cur = opts.findIndex(o => o.getAttribute('aria-checked') === 'true');
    if (cur < 0) cur = 0;
    opts.forEach((o, i) => {
      o.setAttribute('role', 'radio');
      if (o.tagName === 'BUTTON' && !o.hasAttribute('type')) o.type = 'button';
      o.setAttribute('aria-checked', i === cur ? 'true' : 'false');
      o.tabIndex = i === cur ? 0 : -1;
    });

    group.addEventListener('click', e => {
      const o = e.target.closest(OPTION);
      if (!o || !group.contains(o)) return;
      const i = optionsOf(group).indexOf(o);
      if (o.getAttribute('aria-checked') !== 'true') select(group, i, true);
    });
    group.addEventListener('keydown', e => {
      const opts = optionsOf(group), from = opts.indexOf(document.activeElement);
      if (from < 0) return;
      const n = opts.length;
      let to = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (from + 1) % n;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (from - 1 + n) % n;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to === null) return;
      e.preventDefault();
      select(group, to, true);
    });
  }

  function init(root) { groupsIn(root).forEach(wire); }

  window.pdsToggleTab = { init, select: (g, i) => select(g, i, false) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
