/* Pando DS V1 — Actions (inline action forms) behaviour. Requires action-panel.css and the kit:
   button.css, button-group.css, input.css + input.js, icons.css + icons/icons-data.js.
   Optional: calendar.js (date fields open the kit Calendar), attachments.js (Document row).

   pdsActions.build(options) → HTMLElement (.pds-actions)
     legacy     false → newer set (Actions 3544:1036) · true → older set (Actions 2384:5702)
     type       'default' | 'swappable'                      (newer: Type)
     state      'default' | 'hover' | 'active'               (newer: State — static docs only)
     title      header text                                  ('Header Text')
     fields     [{ label, placeholder, value, icon: 'calendar' | 'geofence', state }]
                newer default: 4 × Input - Text (Input Label / Placeholder Ghost Text)
     cancel     secondary label  (newer 'Button Text' · older 'Clear')
     submit     primary label    (newer 'Button Text' · older 'Save')
     alert      text → older-set Alert row (Alert = true)
     document   { label } → older-set Document row with Misc/Add-Attachment (hidden layer in Figma)
     static     true → markup only, no behaviour (docs)

   pdsActions.init(root) wires every [data-pds-actions] inside root:
     · Newer set: click or focus inside makes the card Active; only one card is Active per stack
       (parent [data-pds-actions-stack], else the card's parent). Esc or the secondary button
       leaves Active. Secondary clears nothing (Figma gives it no meaning) — it fires 'cancel'.
     · Older set: Save is disabled while any field is empty (State = Empty) and enabled once every
       field is filled (State = Filled). Clear empties the fields and disables Save again.
     · Date fields (Calendar-Input / GeoFence-Input icon) open the kit Calendar with time, if loaded.
     · Document row: the Add tile opens the file picker (attachments.js — names only, nothing is read).
   Events on the card (bubble): 'pds-actions:submit' (detail.values), 'pds-actions:cancel',
   'pds-actions:clear', 'pds-actions:activate', 'pds-actions:attach' (detail.files). */
(function () {
  const ICONS = {};
  (window.PDS_ICONS || []).forEach(i => { ICONS[i.n] = i.svg; });
  const icon = n => ICONS[n] || '';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // refresh-line (Figma 3472:3224) — not in the kit icon set; same path as tooltip.js uses
  const REFRESH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.463 4.433C7.27756 2.86066 9.59899 1.99665 12 2C17.523 2 22 6.477 22 12C22 14.136 21.33 16.116 20.19 17.74L17 12H20C20.0001 10.4316 19.5392 8.8978 18.6747 7.58926C17.8101 6.28071 16.5799 5.25516 15.1372 4.64012C13.6944 4.02509 12.1027 3.8477 10.56 4.13002C9.0172 4.41233 7.59145 5.1419 6.46 6.228L5.463 4.433ZM18.537 19.567C16.7224 21.1393 14.401 22.0033 12 22C6.477 22 2 17.523 2 12C2 9.864 2.67 7.884 3.81 6.26L7 12H4C3.99987 13.5684 4.46075 15.1022 5.32534 16.4107C6.18992 17.7193 7.42007 18.7448 8.86282 19.3599C10.3056 19.9749 11.8973 20.1523 13.44 19.87C14.9828 19.5877 16.4085 18.8581 17.54 17.772L18.537 19.567Z"/></svg>';
  const ICON_NAME = { calendar: 'nav-calendar-input', geofence: 'nav-geofence-input' };

  function field(f, isStatic) {
    const w = window.pdsInput.build({ type: 'text', size: 200, label: f.label, placeholder: f.placeholder, value: f.value, state: f.state, icon: f.icon ? 'calendar' : undefined, static: true });
    if (f.icon) {
      w.classList.add('pds-actions__tif');
      w.dataset.pdsActionsDate = f.icon;
      const old = w.querySelector('.pds-input__icon');
      const span = document.createElement('span');
      span.className = 'pds-icon pds-icon--10 pds-input__icon pds-actions__icon';
      span.dataset.icon = f.icon;
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = icon(ICON_NAME[f.icon]);
      old.replaceWith(span);
    }
    if (!isStatic) window.pdsInput.init(w);
    return w;
  }

  function build(o = {}) {
    const legacy = !!o.legacy;
    const swap = !legacy && o.type === 'swappable';
    const card = document.createElement('div');
    card.className = 'pds-actions' + (legacy ? ' pds-actions--legacy' : '') + (swap ? ' pds-actions--swappable' : '');
    if (!legacy && o.state === 'hover') card.classList.add('is-hover');
    if (!legacy && o.state === 'active') card.classList.add('is-active');
    card.setAttribute('role', 'group');
    card.dataset.pdsActions = legacy ? 'legacy' : 'default';
    const tid = 'pdsa' + Math.random().toString(36).slice(2, 8);
    card.setAttribute('aria-labelledby', tid);

    const cancel = o.cancel || (legacy ? 'Clear' : 'Button Text');
    const submit = o.submit || (legacy ? 'Save' : 'Button Text');
    const fields = o.fields || (legacy ? [{ label: 'PRO NUmber', placeholder: 'Enter PRO Number' }] : Array.from({ length: 4 }, () => ({ label: 'Input Label', placeholder: 'Placeholder Ghost Text' })));
    const empty = fields.some(f => !f.value);

    const content = document.createElement('div');
    content.className = 'pds-actions__content';
    content.innerHTML =
      `<div class="pds-actions__header"><h3 class="pds-actions__title" id="${tid}">${esc(o.title || 'Header Text')}</h3>` +
      `<div class="pds-button-group pds-actions__buttons">` +
      `<button type="button" class="pds-button pds-button--secondary pds-button--small" data-pds-actions-cancel>${esc(cancel)}</button>` +
      `<button type="button" class="pds-button pds-button--small" data-pds-actions-submit${legacy && empty ? ' disabled' : ''}>${esc(submit)}</button>` +
      `</div></div>`;

    if (legacy && o.alert) content.insertAdjacentHTML('beforeend', `<p class="pds-actions__alert" role="alert"><span class="pds-icon" aria-hidden="true">${icon('system-status-warning-circle')}</span>${esc(o.alert)}</p>`);

    if (legacy && o.document) {
      const d = document.createElement('div');
      d.className = 'pds-actions__doc';
      d.innerHTML = `<p class="pds-actions__doc-label">${esc(o.document.label || 'EPOD Copy')}</p><ul class="pds-attachments pds-attachments--tiles" data-pds-attachments aria-label="${esc(o.document.label || 'EPOD Copy')}"></ul>`;
      if (window.pdsAttachments) d.querySelector('ul').appendChild(window.pdsAttachments.addTile('Add ' + (o.document.label || 'EPOD Copy')));
      content.appendChild(d);
    }

    if (swap) {
      content.insertAdjacentHTML('beforeend',
        `<div class="pds-actions__slot"><div class="pds-actions__slot-local"><div class="pds-actions__slot-body">` +
        `<p class="pds-actions__slot-title">${REFRESH}<span>Swappable Content</span></p>` +
        `<p class="pds-actions__slot-text">Swap this component out with another.</p></div></div></div>`);
    } else {
      const wrap = document.createElement('div');
      wrap.className = 'pds-actions__fields';
      fields.forEach(f => wrap.appendChild(field(f, true)));
      content.appendChild(wrap);
    }
    card.appendChild(content);
    if (!o.static) init(card);
    return card;
  }

  /* ── Behaviour ─────────────────────────────────────────────────── */
  const fire = (el, type, detail) => el.dispatchEvent(new CustomEvent('pds-actions:' + type, { bubbles: true, detail }));
  const inputs = card => [...card.querySelectorAll('.pds-actions__fields input.pds-input__control')];
  const values = card => inputs(card).map(i => ({ label: (i.closest('.pds-input').querySelector('.pds-input__label') || {}).textContent, value: i.value }));

  function syncFilled(card) {
    inputs(card).forEach(i => i.closest('.pds-input').classList.toggle('pds-input--filled', !!i.value));
    if (card.classList.contains('pds-actions--legacy')) {
      const save = card.querySelector('[data-pds-actions-submit]');
      if (save) save.disabled = inputs(card).some(i => !i.value.trim());
    }
  }

  function stackOf(card) { return card.closest('[data-pds-actions-stack]') || card.parentElement; }
  function activate(card) {
    if (card.classList.contains('pds-actions--legacy') || card.classList.contains('is-active')) return;
    const stack = stackOf(card);
    if (stack) stack.querySelectorAll('.pds-actions.is-active').forEach(c => { if (c !== card) c.classList.remove('is-active'); });
    card.classList.add('is-active');
    fire(card, 'activate');
  }
  function deactivate(card) { card.classList.remove('is-active'); }

  function wire(card) {
    if (card.dataset.pdsActionsReady) return;
    card.dataset.pdsActionsReady = '1';
    const legacy = card.classList.contains('pds-actions--legacy');

    card.querySelectorAll('.pds-actions__fields .pds-input').forEach(w => window.pdsInput && window.pdsInput.init(w));
    card.querySelectorAll('[data-pds-actions-date] input.pds-input__control').forEach(i => {
      if (window.pdsCalendar) window.pdsCalendar.attach(i, { showTime: true });
    });
    if (window.pdsAttachments) window.pdsAttachments.init(card);

    card.addEventListener('input', () => syncFilled(card));
    card.addEventListener('change', () => syncFilled(card));
    if (!legacy) {
      card.addEventListener('pointerdown', () => activate(card));
      card.addEventListener('focusin', () => activate(card));
    }
    card.addEventListener('keydown', e => {
      if (e.key !== 'Escape' || legacy) return;
      if (card.querySelector('.pds-calendar--popup:not([hidden])')) return;
      deactivate(card); fire(card, 'cancel');
    });
    card.addEventListener('click', e => {
      const c = e.target.closest('[data-pds-actions-cancel]');
      const s = e.target.closest('[data-pds-actions-submit]');
      if (c) {
        if (legacy) { inputs(card).forEach(i => { i.value = ''; }); syncFilled(card); fire(card, 'clear'); const f = inputs(card)[0]; if (f) f.focus(); }
        else { deactivate(card); fire(card, 'cancel'); if (document.activeElement && card.contains(document.activeElement)) document.activeElement.blur(); }
      } else if (s && !s.disabled) {
        fire(card, 'submit', { values: values(card) });
      }
    });
    card.addEventListener('pds-attachments:add', e => fire(card, 'attach', { files: e.detail.files }));
    syncFilled(card);
  }

  function init(root) {
    root = root || document;
    const cards = root.matches && root.matches('[data-pds-actions]') ? [root] : root.querySelectorAll('[data-pds-actions]');
    cards.forEach(wire);
  }

  window.pdsActions = { build, init };
})();
