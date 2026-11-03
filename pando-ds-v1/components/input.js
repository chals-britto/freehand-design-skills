/* Pando DS V1 — Inputs behaviour. Requires input.css.

   pdsInput.build(options) → HTMLElement (the .pds-input wrapper)
     type      'text' (Default) | 'inline' | 'condition' | 'formula' | 'tags' | 'searchtag'
               | 'select' | 'select-tags' | 'dropup' | 'select-condition' | 'nolabel' | 'textarea'
     theme     'light' | 'dark'                       (default 'light')
     size      100 | 200 | 225 | 250 | 310 | 400 | 600 | 'auto'
     state     'empty' | 'filled' | 'active' | 'hover' | 'error' | 'open' | 'focus'
     disabled, readonly (added in review), required (added in review on Input - Text)
     label, value, placeholder, prefix ('$'), icon ('search' | 'calendar')
     tags      ['Option 1', …]   count  '+ 2'   chip 'Name'   selected true (Search Tag)
     info      { title, text }  → info icon + tooltip on hover/focus (review change)
     message   helper text (added in review);  error message shown when state = 'error'
     menu      'single' | 'multi' | 'search' | 'table' | 'dark'   (list shown when state = 'open' or menuOpen)
     noArrow   true → no dropdown arrow (Condition + Icon)   tipOpen true → tooltip rendered visible (docs)
     actions   true → cancel / confirm buttons (Small Active)
     clear     true → clear × (Default Active Large)
     formula   [[text, cls], …]   result 'True'
     showCount, showInput (Text Area booleans)
     static    true → markup for documentation (no behaviour wiring)

   pdsInput.init(root) wires: tooltip (hover / focus / Esc), dropdown open/close/select
   (click, Enter/Space/ArrowDown, ArrowUp/ArrowDown in list, Esc, outside click), tag remove. */
(function () {
  let uid = 0;
  const ICON = {
    search: '<svg class="pds-input__icon" viewBox="0 0 11 11" aria-hidden="true"><path fill="currentColor" d="M3.785 0C5.88 0 7.57 1.686 7.57 3.755c0 .866-.297 1.665-.796 2.302l3.12 3.12c.184.183.173.49-.022.685-.174.174-.435.201-.62.077l-.065-.055-3.128-3.128c-.633.473-1.42.755-2.274.755C1.69 7.51 0 5.824 0 3.755 0 1.686 1.69 0 3.785 0Zm0 .805C2.17.805.85 2.121.85 3.755c0 1.634 1.32 2.951 2.935 2.951 1.616 0 2.935-1.317 2.935-2.951C6.72 2.121 5.4.805 3.785.805Z"/></svg>',
    calendar: '<svg class="pds-input__icon pds-input__icon--calendar" viewBox="0 0 10 10" aria-hidden="true"><path fill="currentColor" d="M3 7H2v1h1V7Zm1.5 0h1v1h-1V7ZM8 7H7v1h1V7ZM2 5h1v1H2V5Zm3.5 0h-1v1h1V5ZM7 5h1v1H7V5Z"/><path fill="currentColor" fill-rule="evenodd" d="M8.5 0h-7A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10h7A1.5 1.5 0 0 0 10 8.5v-7A1.5 1.5 0 0 0 8.5 0ZM9 3V1.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V3h8ZM1 4v4.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4H1Z"/></svg>'
  };
  const ARROW = '<svg class="pds-input__arrow" viewBox="0 0 8 5" aria-hidden="true"><path fill="currentColor" d="M8 0H0l4 5z"/></svg>';
  const CARET = '<svg class="pds-input__caret" viewBox="0 0 10 8" aria-hidden="true"><path fill="currentColor" d="M4.293 6.653.404 2.764a1 1 0 0 1 1.414-1.415L5 4.531l3.182-3.182a1 1 0 1 1 1.414 1.415L5.707 6.653a1 1 0 0 1-1.414 0Z"/></svg>';
  const CLOSE = '<svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M9.889 2.111a.5.5 0 0 0-.707 0L6 5.293 2.818 2.111a.5.5 0 0 0-.707.707L5.293 6 2.111 9.182a.5.5 0 0 0 .707.707L6 6.707l3.182 3.182a.5.5 0 0 0 .707-.707L6.707 6l3.182-3.182a.5.5 0 0 0 0-.707Z"/></svg>';
  const CHECK = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 6.2 4.6 9.3 10.5 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const SELECTED = '<svg class="pds-input__selected" viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm3.367-10.423L5.45 8.5 3.62 6.675a.27.27 0 0 0-.372.002l-.671.682a.27.27 0 0 0 .002.383l2.684 2.681a.26.26 0 0 0 .371 0l5.786-5.78a.27.27 0 0 0 0-.384l-.683-.682a.26.26 0 0 0-.371 0Z"/></svg>';
  const INFO = '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="6" fill="var(--input-info-bg)"/><path fill="var(--input-info-glyph)" d="M6.436 4.697c.037.002.075.007.113.017l.057.014c.31.08.5.403.423.723l-.433 1.796-.196.81c-.181.753.565-.163.72.184.102.229-.602.707-1.107 1.07 0 0-.26.178-.439.177l-.025.012v-.012a.6.6 0 0 1-.112-.016l-.057-.015c-.31-.08-.475-.397-.398-.717l.433-1.795.196-.811c.181-.752-.576.16-.731-.187-.103-.229.589-.71 1.094-1.073.01-.007.264-.177.439-.177l.025-.011v.012ZM6.32 2.5c.448 0 .812.374.812.835 0 .461-.364.836-.812.836-.448 0-.811-.375-.811-.836 0-.461.363-.835.811-.835Z"/></svg>';
  const DMULTI = '<svg viewBox="0 0 10 8" aria-hidden="true"><path d="M1 4l2.6 2.6L9 1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const SELECTS = ['select', 'select-tags', 'dropup', 'select-condition', 'nolabel'];

  function menuHTML(o, id) {
    const open = o.state === 'open' || o.menuOpen;
    const h = open ? '' : ' hidden';
    if (o.menu === 'table') return `<div class="pds-input__menu pds-input__menu--stub" style="--_mw:400px"${h}>Dropdown list · Table (400 wide). Reviewed with the dropdown parts, not part of Inputs.</div>`;
    if (o.menu === 'search') return `<ul class="pds-input__menu pds-input__menu--search" role="listbox" id="${id}-list"${h}><li class="pds-input__option is-active" role="option" aria-selected="false">in Name</li><li class="pds-input__option" role="option" aria-selected="false">in Ref ID</li></ul>`;
    if (o.menu === 'dark') {
      const names = ['Rivigo Pvt Ltd', 'Varuna Transporters Pvt Ltd', 'WHEELSEYE TECHNOLOGY IND…', 'CTI LOGISTICS PRIVATE LIMITED', 'ATC SUPPLY CHAIN SOLUTIONS', 'ATC SUPPLY CHAIN SOLUTIONS', 'RK LOGISTICS', 'KAPOOR DIESELS GARAGE PVT…', 'ARION LOGISTICS PRIVATE LIM…', 'ARION LOGISTICS PRIVATE LIM…'];
      return `<div class="pds-input__menu"${h}><ul class="pds-input__dlist" role="listbox" aria-multiselectable="true" id="${id}-list">${names.map((n, i) => { const sel = i === 1 || i === 3; return `<li class="pds-input__dopt" role="option" aria-selected="${sel}">${esc(n)}${sel ? DMULTI : ''}</li>`; }).join('')}</ul><span class="pds-input__dscroll" aria-hidden="true"></span></div>`;
    }
    const n = o.menuCount || (o.menu === 'multi' ? 3 : 10);
    let items = '';
    for (let i = 0; i < n; i++) {
      items += o.menu === 'multi'
        ? `<li class="pds-input__option pds-input__option--multi" role="option" aria-selected="false"><span class="pds-input__option-info"><span>Default Option</span><span class="pds-input__option-sub">Default Option</span></span><span class="pds-input__tag">Text</span></li>`
        : `<li class="pds-input__option" role="option" aria-selected="false">Default Option</li>`;
    }
    const mw = o.menuWidth ? ` style="--_mw:${o.menuWidth}px"` : '';
    return `<ul class="pds-input__menu" role="listbox" id="${id}-list"${mw}${h}>${items}</ul>`;
  }

  function build(o = {}) {
    const id = 'pdsi' + (++uid);
    const type = o.type || 'text';
    const theme = o.theme || 'light';
    const state = o.state || (o.value ? 'filled' : 'empty');
    const isSelect = SELECTS.includes(type);
    const cls = ['pds-input', 'pds-input--w' + (o.size || (theme === 'dark' || type === 'textarea' ? 310 : type === 'inline' ? 250 : type === 'formula' ? 600 : 200))];
    if (theme === 'dark' && type !== 'textarea') cls.push('pds-input--dark');
    if (o.size === 100) cls.push('pds-input--small');
    if (type === 'inline') cls.push('pds-input--inline');
    if (type === 'condition' || type === 'select-condition') cls.push('pds-input--condition');
    if (type === 'formula') cls.push('pds-input--formula');
    if (type === 'tags' || type === 'select-tags') cls.push('pds-input--tags');
    if (type === 'searchtag') cls.push('pds-input--searchtag');
    if (isSelect) cls.push('pds-input--select');
    if (type === 'dropup') cls.push('pds-input--dropup');
    if (type === 'nolabel') cls.push('pds-input--nolabel');
    if (type === 'textarea') cls.push('pds-input--textarea');
    if (!isSelect && o.menu) cls.push('pds-input--text-menu');
    if (o.right) cls.push('pds-input--right');
    if (['filled', 'active', 'hover', 'error', 'open', 'focus'].includes(state) && o.value) cls.push('pds-input--filled');
    if (['active', 'hover', 'error', 'open', 'focus'].includes(state)) cls.push('pds-input--' + state);
    if (o.disabled) cls.push('pds-input--disabled');
    if (o.readonly) cls.push('pds-input--readonly');

    const label = o.label == null ? (theme === 'dark' && !isSelect ? 'Label' : type === 'condition' || type === 'select-condition' ? 'Label' : 'Input Label') : o.label;
    const req = o.required ? '<span class="pds-input__req" aria-hidden="true">*</span>' : '';
    const tipId = id + '-tip';
    const info = o.info ? `<button type="button" class="pds-input__info" aria-label="More information" aria-describedby="${tipId}">${INFO}<span class="pds-input__tip" role="tooltip" id="${tipId}"${o.tipOpen ? '' : ' hidden'}>${o.info.title ? `<span class="pds-input__tip-title">${esc(o.info.title)}</span>` : ''}<span class="pds-input__tip-text">${esc(o.info.text)}</span></span></button>` : '';
    const msgText = state === 'error' && o.errorMessage ? o.errorMessage : o.message;
    const msgId = id + '-msg';
    const msg = msgText ? `<p class="pds-input__message" id="${msgId}"${state === 'error' ? ' role="alert"' : ''}>${esc(msgText)}</p>` : '';
    const described = msgText ? ` aria-describedby="${msgId}"` : '';
    const invalid = state === 'error' ? ' aria-invalid="true"' : '';
    const dis = o.disabled ? ' disabled' : '';
    const ro = o.readonly ? ' readonly' : '';
    const icon = o.icon ? ICON[o.icon] : '';
    const head = type === 'nolabel' ? '' : `<div class="pds-input__head"><label class="pds-input__label" for="${id}">${esc(label)}</label>${req}</div>`;

    let box = '', outside = '', after = '';

    if (type === 'formula') {
      const res = o.result ? `<span class="pds-input__result">Result<span>:</span><span class="pds-input__result-tag">${esc(o.result)}</span></span>` : '';
      outside = `<div class="pds-input__fhead"><div class="pds-input__head"><label class="pds-input__label" for="${id}">${esc(o.label || 'Formula Label')}</label>${req}</div>${res}</div>`;
      const ctl = o.formula
        ? `<div class="pds-input__formula" id="${id}" role="textbox" aria-readonly="true">${o.formula.map(([t, c]) => c ? `<span class="${c}">${esc(t)}</span>` : esc(t)).join('')}</div>`
        : `<input class="pds-input__control" id="${id}" placeholder="${esc(o.placeholder || 'Enter here')}"${dis}${ro}${invalid}${described}>`;
      box = `<div class="pds-input__box">${ctl}</div>`;
    } else if (type === 'textarea') {
      const ta = o.showInput ? `<textarea class="pds-input__control" id="${id}" rows="1" placeholder="${esc(o.placeholder || 'Placeholder Ghost Text')}"${dis}${ro}></textarea>` : `<textarea class="pds-input__control" id="${id}" rows="1" aria-label="${esc(label)}" style="opacity:0"${dis}${ro}></textarea>`;
      box = `<div class="pds-input__box">${head}${ta}${o.showCount ? '<span class="pds-input__tacount">160/160</span>' : ''}</div>`;
    } else if (theme === 'dark') {
      outside = head;
      if (isSelect) {
        const ph = !o.value;
        const val = `<span class="pds-input__value">${esc(o.value || o.placeholder || 'Select')}</span>`;
        const inner = type === 'select-tags'
          ? `<span class="pds-input__tag">${esc((o.tags || ['Text Input'])[0])}<span class="pds-input__tag-x" aria-hidden="true">${CLOSE}</span></span>`
          : `${icon}${val}${o.icon ? '' : ARROW}`;
        box = `<div class="pds-input__box"><button type="button" class="pds-input__control" id="${id}" aria-haspopup="listbox" aria-expanded="${state === 'open'}"${dis}${invalid}${described}>${inner}</button></div>`;
        if (o.menu) after = menuHTML(o, id);
        void ph;
      } else {
        box = `<div class="pds-input__box">${icon}<input class="pds-input__control" id="${id}" placeholder="${esc(o.placeholder || 'Placeholder Input')}" value="${esc(o.value || '')}"${dis}${ro}${invalid}${described}></div>`;
      }
    } else if (isSelect) {
      const ph = !o.value;
      const val = `<span class="pds-input__value${ph && o.italic !== false ? ' is-placeholder' : ''}">${esc(o.value || o.placeholder || 'Select')}</span>`;
      const ind = o.noArrow ? '' : type === 'nolabel' ? CARET : ARROW.replace('pds-input__arrow', 'pds-input__arrow' + (o.fadedArrow ? ' is-faded' : ''));
      const tags = type === 'select-tags' ? `<div class="pds-input__tags${o.size === 400 ? ' pds-input__tags--edge' : ''}">${(o.tags || []).map(t => `<span class="pds-input__tag">${esc(t)}<button type="button" class="pds-input__tag-x" aria-label="Remove ${esc(t)}"${dis}>${CLOSE}</button></span>`).join('')}</div>` : '';
      const ctl = `<button type="button" class="pds-input__control" id="${id}" aria-haspopup="listbox" aria-expanded="${state === 'open'}" aria-controls="${id}-list"${dis}${invalid}${described}>${icon}${type === 'select-tags' ? '<span class="pds-input__value"></span>' : val}${ind}</button>`;
      if (type === 'select-condition') { outside = head; box = `<div class="pds-input__box">${ctl}</div>`; }
      else box = `<div class="pds-input__box">${head}${info}<div class="pds-input__row">${ctl}</div>${tags}</div>`;
      if (o.menu) after = menuHTML(o, id);
    } else if (type === 'condition') {
      outside = head;
      box = `<div class="pds-input__box">${o.icon ? icon : `<span class="pds-input__prefix">${esc(o.prefix || '$')}</span>`}<input class="pds-input__control" id="${id}" placeholder="${esc(o.placeholder || 'Value')}" value="${esc(o.value || '')}"${dis}${ro}${invalid}${described}></div>`;
    } else {
      const hide = (type === 'tags' && o.tags && o.tags.length) ? ' is-hidden' : '';
      const ctl = (type === 'tags' && o.tags && o.tags.length && !o.icon) ? '' : `<input class="pds-input__control${hide}" id="${id}" placeholder="${esc(o.placeholder || 'Placeholder Ghost Text')}" value="${esc(o.value || '')}"${dis}${ro}${invalid}${described}${o.menu && o.menu !== 'table' ? ` role="combobox" aria-expanded="${state === 'open'}" aria-controls="${id}-list"` : ''}>`;
      const tags = o.tags ? `<div class="pds-input__tags${o.icon ? ' pds-input__tags--after-icon' : ''}">${o.tags.map(t => `<span class="pds-input__tag">${esc(t)}<button type="button" class="pds-input__tag-x" aria-label="Remove ${esc(t)}"${dis}>${CLOSE}</button></span>`).join('')}${o.count ? `<span class="pds-input__count">${esc(o.count)}</span>` : ''}</div>` : '';
      const chip = o.chip ? `<span class="pds-input__chip">${esc(o.chip)}</span>${o.selected ? SELECTED : ''}` : '';
      const clear = o.clear ? `<button type="button" class="pds-input__clear" aria-label="Clear">${CLOSE}</button>` : '';
      box = `<div class="pds-input__box">${head}${info}<div class="pds-input__row">${icon}${ctl}</div>${tags}${chip}${clear}</div>`;
      if (o.actions) box += `<div class="pds-input__actions"><button type="button" class="pds-input__action pds-input__action--cancel" aria-label="Cancel">${CLOSE}</button><button type="button" class="pds-input__action pds-input__action--confirm" aria-label="Confirm">${CHECK}</button></div>`;
      if (o.menu) after = menuHTML(o, id);
    }

    const wrap = document.createElement('div');
    wrap.className = cls.join(' ');
    wrap.innerHTML = outside + box + after + msg;
    if (o.width) wrap.style.setProperty('--_w', o.width);
    if (!o.static) init(wrap);
    return wrap;
  }

  /* ── Behaviour ──────────────────────────────────────────────── */
  function wireTooltip(btn) {
    const tip = btn.querySelector('.pds-input__tip');
    if (!tip || btn.dataset.pdsWired) return; btn.dataset.pdsWired = '1';
    const show = () => { tip.hidden = false; };
    const hide = () => { tip.hidden = true; };
    btn.addEventListener('mouseenter', show); btn.addEventListener('mouseleave', hide);
    btn.addEventListener('focus', show); btn.addEventListener('blur', hide);
    btn.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
    btn.addEventListener('click', e => e.preventDefault());
  }

  function wireSelect(wrap) {
    const ctl = wrap.querySelector('button.pds-input__control');
    const menu = wrap.querySelector('.pds-input__menu');
    if (!ctl || !menu || ctl.dataset.pdsWired) return; ctl.dataset.pdsWired = '1';
    const opts = () => [...menu.querySelectorAll('[role="option"]')];
    const valueEl = wrap.querySelector('.pds-input__value');
    let active = -1;
    const setOpen = open => {
      menu.hidden = !open; ctl.setAttribute('aria-expanded', open);
      wrap.classList.toggle('pds-input--open', open);
      if (!open) { opts().forEach(x => x.classList.remove('is-active')); active = -1; }
    };
    const move = d => { const list = opts(); if (!list.length) return; active = (active + d + list.length) % list.length; list.forEach((x, i) => x.classList.toggle('is-active', i === active)); list[active].scrollIntoView({ block: 'nearest' }); };
    const pick = li => {
      opts().forEach(x => x.setAttribute('aria-selected', x === li));
      if (valueEl) { valueEl.textContent = li.firstElementChild ? li.firstElementChild.firstElementChild?.textContent || li.textContent : li.textContent; valueEl.classList.remove('is-placeholder'); wrap.classList.add('pds-input--filled'); }
      setOpen(false); ctl.focus();
    };
    ctl.addEventListener('click', () => { if (!ctl.disabled) setOpen(menu.hidden); });
    ctl.addEventListener('keydown', e => {
      if (ctl.disabled) return;
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); if (menu.hidden) setOpen(true); move(e.key === 'ArrowDown' ? 1 : -1); }
      else if ((e.key === 'Enter' || e.key === ' ') && !menu.hidden && active > -1) { e.preventDefault(); pick(opts()[active]); }
      else if (e.key === 'Escape' && !menu.hidden) { e.preventDefault(); setOpen(false); }
    });
    menu.addEventListener('click', e => { const li = e.target.closest('[role="option"]'); if (li) pick(li); });
    document.addEventListener('click', e => { if (!wrap.contains(e.target) && !menu.hidden) setOpen(false); });
  }

  function wireTags(wrap) {
    wrap.querySelectorAll('.pds-input__tags .pds-input__tag-x').forEach(x => {
      if (x.dataset.pdsWired) return; x.dataset.pdsWired = '1';
      x.addEventListener('click', e => { e.stopPropagation(); const tag = x.closest('.pds-input__tag'); const box = x.closest('.pds-input__box'); tag.remove(); const next = box && box.querySelector('.pds-input__tag-x, .pds-input__control'); if (next) next.focus(); });
    });
  }

  function init(root) {
    root = root || document;
    const wraps = root.classList && root.classList.contains('pds-input') ? [root] : root.querySelectorAll('.pds-input');
    wraps.forEach(w => {
      w.querySelectorAll('.pds-input__info').forEach(wireTooltip);
      if (w.classList.contains('pds-input--select')) wireSelect(w);
      wireTags(w);
      const box = w.querySelector('.pds-input__box'), input = w.querySelector('input.pds-input__control, textarea.pds-input__control');
      if (box && input && !box.dataset.pdsWired) { box.dataset.pdsWired = '1'; box.addEventListener('mousedown', e => { if (e.target === box || e.target.classList.contains('pds-input__row')) { e.preventDefault(); input.focus(); } }); }
    });
  }

  window.pdsInput = { build, init };
})();
