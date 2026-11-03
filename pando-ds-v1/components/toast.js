/* Pando DS V1 — Toast behaviour. Requires toast.css.
   pdsToast.show({ type, title, body, persistent, action, onAction })
     type        'success' | 'error' | 'warning' | 'info'   (default 'success')
     title/body  strings; omit either to hide it (Show Title / Show Description)
     persistent  true → close × shown, stays until closed (default false)
     action      optional label for ONE navigation link ("View" → take me there);
                 onAction is called on click. No undo.
   Rules from the review: newest on top · max 3 visible · 8px apart ·
   non-persistent toasts close after 4 s; hovering (or keyboard focus inside)
   keeps the toast on screen and the timer restarts on leave ·
   success/info announce politely (role=status), error/warning assertively (role=alert). */
(function () {
  const MAX = 3;
  const DURATION = 4000;
  const GLYPH = {
    success: '<path class="glyph" d="M7 12.5l3 3 7-7" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    error:   '<path class="glyph" d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke-width="2.2" stroke-linecap="round"/>',
    warning: '<rect class="glyph" x="10.8" y="6" width="2.4" height="8" rx="1.2" stroke="none"/><circle class="glyph" cx="12" cy="17.2" r="1.4" stroke="none"/>',
    info:    '<circle class="glyph" cx="12" cy="7" r="1.4" stroke="none"/><rect class="glyph" x="10.8" y="10" width="2.4" height="8" rx="1.2" stroke="none"/>'
  };
  const CLOSE = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function build(o) {
    const type = GLYPH[o.type] ? o.type : 'success';
    const t = el('div', 'pds-toast pds-toast--' + type);
    t.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
    t.insertAdjacentHTML('beforeend', '<svg class="pds-toast__icon" viewBox="0 0 24 24" aria-hidden="true"><circle class="bg" cx="12" cy="12" r="12"/>' + GLYPH[type] + '</svg>');
    const tx = el('div', 'pds-toast__text');
    if (o.title) tx.appendChild(el('p', 'pds-toast__title', o.title));
    if (o.body) tx.appendChild(el('p', 'pds-toast__body', o.body));
    t.appendChild(tx);
    if (o.action) {
      const a = el('button', 'pds-toast__action', o.action); a.type = 'button';
      a.addEventListener('click', () => { o.onAction && o.onAction(); });
      t.appendChild(a);
    }
    if (o.persistent) {
      const c = el('button', 'pds-toast__close'); c.type = 'button'; c.setAttribute('aria-label', 'Close');
      c.innerHTML = CLOSE; c.addEventListener('click', () => t.remove());
      t.appendChild(c);
    }
    return t;
  }

  function toaster() {
    let box = document.querySelector('.pds-toaster');
    if (!box) { box = el('div', 'pds-toaster'); document.body.appendChild(box); }
    return box;
  }

  /* Auto-close a non-persistent toast after DURATION; hover/focus holds it. */
  function autoClose(t, ms) {
    let timer = null;
    const start = () => { clearTimeout(timer); timer = setTimeout(() => t.remove(), ms); };
    const hold = () => clearTimeout(timer);
    t.addEventListener('mouseenter', hold);
    t.addEventListener('mouseleave', start);
    t.addEventListener('focusin', hold);
    t.addEventListener('focusout', start);
    start();
  }

  window.pdsToast = {
    build,
    autoClose,
    DURATION,
    show(o = {}, container) {
      const box = container || toaster(), t = build(o);
      box.prepend(t);
      while (box.children.length > MAX) box.lastElementChild.remove();
      if (!o.persistent) autoClose(t, DURATION);
      return t;
    },
    clear() { const b = document.querySelector('.pds-toaster'); if (b) b.replaceChildren(); }
  };
})();
