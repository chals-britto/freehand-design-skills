/* Pando DS V1 — Condition (rule builder). Requires condition.css, input.css + input.js, tag.css.

   pdsCondition.build(o) → HTMLElement
     type    'single' | 'linked' | 'andor' | 'brackets'          (default 'single')
     logic   'And' | 'Or'   — the tag on And/Or                    (default 'And')
     rows    optional, array of rows; a row is an array of fields:
               { kind: 'select', value: 'Condition', disabled, label }   → Input - Dropdown Select · Type=Condition
               { kind: 'text',   placeholder: 'Value', prefix: '$', label } → Input - Text · Type=Condition
             Defaults are Figma's own rows (see ROWS below).
     static  true → kit markup without behaviour (documentation)

   pdsCondition.addRow(el, row?)   adds a row to a Linked / And/Or condition (default: Figma's
                                   second row "Condition · operator · Value"); returns the row
   pdsCondition.removeRow(el, row?) removes that row (default: the last); a group keeps one row
   pdsCondition.setLogic(el, 'And' | 'Or')
   Every field is a kit input (pdsInput.build), so open/close/select and keyboard come from input.js. */
(function () {
  const C  = (extra) => Object.assign({ kind: 'select', value: 'Condition' }, extra);
  const OP = (extra) => Object.assign({ kind: 'select', value: 'operator', disabled: true }, extra);
  const V  = (extra) => Object.assign({ kind: 'text', placeholder: 'Value', prefix: '$' }, extra);

  /* Figma sample rows, in Figma order */
  const ROWS = {
    single:   [[C(), OP(), C(), C(), OP(), V(), { kind: 'select', value: 'Value', disabled: true }]],
    linked:   [[C(), OP(), C(), C(), OP(), V()], [C(), OP(), C({ value: 'Value' })]],
    brackets: [[C({ label: 'Label' }), OP(), C(), C({ label: 'Label' }), V()], [OP(), V({ label: 'Label' })]]
  };
  const NEW_ROW = () => [C(), OP(), C({ value: 'Value' })];
  const NAMES = { Condition: 'Field', operator: 'Operator', Value: 'Value' };

  function field(f, o, labelled) {
    const opts = f.kind === 'text'
      ? { type: 'condition', size: 'auto', prefix: f.prefix || '$', placeholder: f.placeholder || 'Value', value: f.value || '' }
      : { type: 'select-condition', size: 'auto', value: f.value, disabled: !!f.disabled, menu: 'single' };
    opts.label = labelled ? (f.label || '') : '';
    opts.static = !!o.static;
    const w = window.pdsInput.build(opts);
    const ctl = w.querySelector('.pds-input__control');
    if (ctl && !f.label) ctl.setAttribute('aria-label', NAMES[f.value] || NAMES[f.placeholder] || 'Value');
    return w;
  }

  function row(fields, o, labelled) {
    const r = document.createElement('div');
    r.className = 'pds-condition__row' + (labelled ? '' : ' pds-condition__row--nolabel');
    r.setAttribute('role', 'group');
    r.setAttribute('aria-label', 'Condition');
    fields.forEach(f => r.appendChild(field(f, o, labelled)));
    return r;
  }

  function linked(rows, o) {
    const l = document.createElement('div');
    l.className = 'pds-condition pds-condition--linked';
    rows.forEach(fs => l.appendChild(row(fs, o, false)));
    return l;
  }

  function bracket(ch) {
    const b = document.createElement('span');
    b.className = 'pds-condition__bracket'; b.setAttribute('aria-hidden', 'true'); b.textContent = ch;
    return b;
  }

  function build(o = {}) {
    const type = ['single', 'linked', 'andor', 'brackets'].includes(o.type) ? o.type : 'single';
    let el;
    if (type === 'single') {
      el = row((o.rows || ROWS.single)[0], o, true);
      el.classList.add('pds-condition', 'pds-condition--single');
    } else if (type === 'linked') {
      el = linked(o.rows || ROWS.linked, o);
    } else if (type === 'andor') {
      el = document.createElement('div');
      el.className = 'pds-condition pds-condition--andor';
      el.setAttribute('role', 'group');
      const tag = document.createElement('span');
      tag.className = 'pds-tag pds-tag--nimbus pds-tag--default pds-condition__logic';
      tag.innerHTML = '<span class="pds-tag__text"></span>';
      el.appendChild(tag);
      el.appendChild(linked(o.rows || ROWS.linked, o));
      setLogic(el, o.logic || 'And');
    } else {
      const rows = o.rows || ROWS.brackets;
      el = document.createElement('div');
      el.className = 'pds-condition pds-condition--brackets';
      el.appendChild(bracket('('));
      el.appendChild(row(rows[0], o, true));
      el.appendChild(bracket(')'));
      if (rows[1]) el.appendChild(row(rows[1], o, true));
    }
    el.dataset.type = type;
    return el;
  }

  const group = el => el.classList.contains('pds-condition--linked') ? el : el.querySelector('.pds-condition--linked');

  function addRow(el, fields) {
    const g = group(el); if (!g) return null;
    const r = row(fields || NEW_ROW(), {}, false);
    g.appendChild(r);
    return r;
  }

  function removeRow(el, r) {
    const g = group(el); if (!g) return false;
    const rows = g.querySelectorAll(':scope > .pds-condition__row');
    if (rows.length <= 1) return false;
    (r || rows[rows.length - 1]).remove();
    return true;
  }

  function setLogic(el, logic) {
    const v = logic === 'Or' ? 'Or' : 'And';
    const t = el.querySelector('.pds-condition__logic .pds-tag__text');
    if (t) t.textContent = v;
    el.dataset.logic = v;
    el.setAttribute('aria-label', 'Conditions joined by ' + v.toUpperCase());
  }

  window.pdsCondition = { build, addRow, removeRow, setLogic, ROWS };
})();
