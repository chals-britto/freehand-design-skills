/* Pando DS V1 — Modal behaviour. Requires modal.css (+ button, button-group,
   input, icons CSS; input.js when the modal holds an input).

   pdsModal.build(options) → HTMLElement (.pds-modal, not yet in an overlay)
     theme       'light' | 'dark'                                  (default 'light')
     style       'text' | 'input' | 'swappable' | 'options'        (default 'text')
                 Figma: Text · Text with Input (Light) · Swappable · Text with Options (Dark)
     heading     string   (Figma default "Heading")
     message     string   (Figma default Lorem ipsum…)
     persistent  true → close × shown (Figma boolean "Persistence", default true)
     field       HTMLElement to put in the field slot (default: kit Input - Text
                 "reason" on Light, kit Text Area "Reject Reason" on Dark)
     content     HTMLElement for the Swappable slot (default: .Swappable Content placeholder)
     actions     [{ label, primary, danger, close }]  (default Cancel + Confirm)
                 close !== false → pressing it closes the modal; the modal fires
                 'pds-modal:action' with detail { label, index } first.
     static      true → markup for documentation (no ids wired for aria)

   pdsModal.open(modal, { trigger, position })
     trigger     element that opened it; focus returns here on close (default: document.activeElement)
     position    'center' (default) | 'anchor' → directly over the trigger, kept on screen
   pdsModal.close(modal, reason)  reason: 'close' | 'escape' | 'action'
     Fires 'pds-modal:close' with detail { reason }.

   Behaviour: overlay (--color-overlay), instant (no animation — Figma "Animation: Instant"),
   focus moves in and is trapped (Tab / Shift+Tab), Esc closes, focus returns to the trigger.
   The overlay click does NOT close (Figma lists × and the CTA as the ways to close). */
(function () {
  let uid = 0;
  const CLOSE = '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M9.88 2.11C9.69 1.91 9.37 1.91 9.18 2.11L6.00 5.29L2.81 2.11L2.74 2.05C2.55 1.91 2.28 1.93 2.11 2.11C1.91 2.30 1.91 2.62 2.11 2.81L5.29 6.00L2.11 9.18L2.05 9.25C1.91 9.44 1.93 9.71 2.11 9.88C2.30 10.08 2.62 10.08 2.81 9.88L6.00 6.70L9.18 9.88L9.25 9.94C9.44 10.08 9.71 10.06 9.88 9.88C10.08 9.69 10.08 9.37 9.88 9.18L6.70 6.00L9.88 2.81L9.94 2.74C10.08 2.55 10.06 2.28 9.88 2.11Z" fill="currentColor"/></svg>'; /* icons/nav-close-tag.svg */
  const REFRESH = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fill="currentColor" d="M4.5525 3.69417C6.06463 2.38388 7.99916 1.66388 10 1.66667C14.6025 1.66667 18.3333 5.3975 18.3333 10C18.3333 11.78 17.775 13.43 16.825 14.7833L14.1667 10H16.6667C16.6668 8.69302 16.2827 7.41484 15.5622 6.32438C14.8417 5.23392 13.8166 4.3793 12.6143 3.86677C11.412 3.35424 10.0856 3.20642 8.79996 3.44168C7.51433 3.67694 6.32621 4.28492 5.38333 5.19L4.5525 3.69417ZM15.4475 16.3058C13.9354 17.6161 12.0008 18.3361 10 18.3333C5.3975 18.3333 1.66667 14.6025 1.66667 10C1.66667 8.22 2.225 6.57 3.175 5.21667L5.83333 10H3.33333C3.33323 11.307 3.71729 12.5852 4.43778 13.6756C5.15827 14.7661 6.18339 15.6207 7.38568 16.1332C8.58798 16.6458 9.9144 16.7936 11.2 16.5583C12.4857 16.3231 13.6738 15.7151 14.6167 14.81L15.4475 16.3058Z"/></svg>'; /* Figma "refresh-line" placeholder — not in the kit icon set */
  const DEF_HEADING = 'Heading';
  const DEF_MESSAGE = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.';
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function slot() {
    const s = el('div', 'pds-modal__slot');
    const t = el('p', 'pds-modal__slot-title');
    t.innerHTML = '<span class="pds-icon pds-icon--20">' + REFRESH + '</span>';
    t.appendChild(el('span', null, 'Swappable Content'));
    s.appendChild(t);
    s.appendChild(el('p', 'pds-modal__slot-text', 'Swap this component out with another.'));
    return s;
  }

  function defaultField(theme) {
    if (!window.pdsInput) return null;
    return theme === 'dark'
      ? pdsInput.build({ type: 'textarea', label: 'Reject Reason', showInput: true, placeholder: ' ' })
      : pdsInput.build({ type: 'text', label: 'reason', placeholder: 'Placeholder Ghost Text' });
  }

  function build(o = {}) {
    const theme = o.theme === 'dark' ? 'dark' : 'light';
    let style = o.style || 'text';
    if (style === 'input' && theme === 'dark') style = 'options';   /* only these combinations exist in Figma */
    if (style === 'options' && theme === 'light') style = 'input';
    const id = 'pdsm' + (++uid);
    const m = el('div', 'pds-modal pds-modal--' + theme + ' pds-modal--' + style);
    if (!o.static) {
      m.setAttribute('role', 'dialog');
      m.setAttribute('aria-modal', 'true');
      m.setAttribute('aria-labelledby', id + '-title');
      m.tabIndex = -1;
    }

    const top = el('div', 'pds-modal__top');
    const h = el('h2', 'pds-modal__title', o.heading || DEF_HEADING); h.id = id + '-title';
    top.appendChild(h);
    if (o.persistent !== false) {
      const c = el('button', 'pds-modal__close'); c.type = 'button'; c.setAttribute('aria-label', 'Close');
      c.innerHTML = '<span class="pds-icon pds-icon--12">' + CLOSE + '</span>';
      c.addEventListener('click', () => close(m, 'close'));
      top.appendChild(c);
    }
    m.appendChild(top);

    if (style === 'swappable') {
      m.appendChild(o.content || slot());
    } else {
      const p = el('p', 'pds-modal__message', o.message || DEF_MESSAGE); p.id = id + '-msg';
      if (!o.static) m.setAttribute('aria-describedby', p.id);
      m.appendChild(p);
      if (style === 'input' || style === 'options') {
        const f = o.field || defaultField(theme);
        if (f) { const w = el('div', 'pds-modal__field'); w.appendChild(f); m.appendChild(w); }
      }
    }

    const acts = o.actions || [{ label: 'Cancel' }, { label: theme === 'dark' ? 'confirm' : 'Confirm', primary: true }];
    const row = el('div', 'pds-button-group pds-modal__actions');
    acts.forEach((a, i) => {
      const b = el('button', 'pds-button pds-button--small'
        + (theme === 'dark' ? ' pds-button--dark' : '')
        + (a.primary ? '' : ' pds-button--secondary')
        + (a.danger ? ' pds-button--danger' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'pds-button__label', a.label));
      b.addEventListener('click', () => {
        m.dispatchEvent(new CustomEvent('pds-modal:action', { bubbles: true, detail: { label: a.label, index: i } }));
        if (a.close !== false) close(m, 'action');
      });
      row.appendChild(b);
    });
    m.appendChild(row);
    return m;
  }

  /* ── open / close ── */
  const state = new WeakMap();

  function focusables(m) { return [...m.querySelectorAll(FOCUSABLE)].filter(n => n.offsetParent !== null || n === document.activeElement); }

  function onKey(e) {
    const m = this;
    if (e.key === 'Escape') { e.stopPropagation(); close(m, 'escape'); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(m);
    if (!f.length) { e.preventDefault(); m.focus(); return; }
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === m)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function place(m, ov, trigger) {
    const r = trigger.getBoundingClientRect();
    const edge = parseFloat(getComputedStyle(m).getPropertyValue('--modal-edge')) || 16;
    const w = m.offsetWidth, hh = m.offsetHeight;
    const left = Math.max(edge, Math.min(r.left, innerWidth - w - edge));
    const top = Math.max(edge, Math.min(r.top, innerHeight - hh - edge));
    m.style.left = left + 'px'; m.style.top = top + 'px';
  }

  function open(m, opt = {}) {
    if (state.has(m)) return m;
    const trigger = opt.trigger || document.activeElement;
    let ov = m.parentElement && m.parentElement.classList.contains('pds-modal-overlay') ? m.parentElement : null;
    if (!ov || !ov.isConnected) { if (ov) ov.removeChild(m); ov = el('div', 'pds-modal-overlay'); document.body.appendChild(ov); ov.appendChild(m); ov._pdsOwned = true; }
    ov.classList.toggle('pds-modal-overlay--anchored', opt.position === 'anchor' && !!trigger);
    ov.hidden = false;
    if (opt.position === 'anchor' && trigger) place(m, ov, trigger);
    const key = onKey.bind(m);
    m.addEventListener('keydown', key);
    /* keep focus inside if it escapes (e.g. a click on the overlay) */
    const guard = e => { if (!m.contains(e.target)) { const f = focusables(m); (f[0] || m).focus(); } };
    document.addEventListener('focusin', guard);
    const blockOverlay = e => { if (e.target === ov) e.preventDefault(); };
    ov.addEventListener('mousedown', blockOverlay);
    state.set(m, { trigger, key, guard, ov, blockOverlay });
    /* initial focus: first field, else the first action (Cancel), else the dialog */
    const field = m.querySelector('.pds-modal__field ' + FOCUSABLE) || m.querySelector('.pds-modal__slot ' + FOCUSABLE);
    const firstAction = m.querySelector('.pds-modal__actions button');
    (field || firstAction || m).focus();
    return m;
  }

  function close(m, reason = 'close') {
    const s = state.get(m);
    if (!s) return;
    state.delete(m);
    m.removeEventListener('keydown', s.key);
    document.removeEventListener('focusin', s.guard);
    s.ov.removeEventListener('mousedown', s.blockOverlay);
    s.ov.hidden = true;
    if (s.ov._pdsOwned) { s.ov.remove(); s.ov.removeChild(m); }
    m.style.left = m.style.top = '';
    m.dispatchEvent(new CustomEvent('pds-modal:close', { bubbles: true, detail: { reason } }));
    if (s.trigger && document.contains(s.trigger) && s.trigger.focus) s.trigger.focus();
  }

  window.pdsModal = { build, open, close, isOpen: m => state.has(m) };
})();
