/* Pando DS V1 — Slideout behaviour. Requires slideout.css (toast.js optional).

   Markup hooks
     [data-slideout-open="<id>"]  trigger: opens #<id> (a .pds-slideout-layer, or a .pds-slideout--push)
     [data-slideout-close]        inside a slideout: Cancel / × — just closes
     [data-slideout-cta]          inside a slideout: the action CTA — closes, then shows a toast
                                  (data-toast-type / data-toast-title / data-toast-body; needs toast.js)

   API (window.pdsSlideout)
     open(el, trigger?)   close(el)   toggle(el, trigger?)   init(root = document)

   Slide Overlay (modal): sits below the header with the overlay behind it,
     slides in right → left and out left → right; Esc closes; Tab is kept inside;
     focus moves to the first control on open and back to the trigger on close.
   Push Section (non-modal): sits beside the page content, which narrows; no overlay,
     no focus trap. Esc closes it while focus is inside.
   Events on the slideout element: pds-slideout:open · pds-slideout:close · pds-slideout:cta {cta} */
(function () {
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const DURATION = 260;            // a little over --slideout-motion, for hiding after the slide-out
  const stack = [];                // open overlay layers, topmost last
  const triggers = new WeakMap();

  const isLayer = el => el.classList.contains('pds-slideout-layer');
  const slideoutOf = el => (isLayer(el) ? el.querySelector('.pds-slideout') : el);
  const visible = n => n.offsetParent !== null || n.getClientRects().length > 0;
  const focusables = root => [...root.querySelectorAll(FOCUSABLE)].filter(n => !n.closest('[hidden]') && visible(n));
  const emit = (el, name, detail) => slideoutOf(el).dispatchEvent(new CustomEvent('pds-slideout:' + name, { bubbles: true, detail }));
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isOpen(el) { return isLayer(el) ? el.classList.contains('is-open') : el.getAttribute('aria-hidden') !== 'true'; }

  function setTrigger(el, expanded) {
    const t = triggers.get(el);
    if (t) t.setAttribute('aria-expanded', String(expanded));
  }

  function open(el, trigger) {
    if (!el || isOpen(el)) return;
    triggers.set(el, trigger || document.activeElement);
    if (isLayer(el)) {
      el.hidden = false;
      void el.offsetWidth;                        // start the slide from off-screen
      el.classList.add('is-open');
      stack.push(el);
      const so = slideoutOf(el);
      const first = focusables(so)[0] || so.querySelector('.pds-slideout__panel');
      (first || so).focus({ preventScroll: true });
    } else {
      el.setAttribute('aria-hidden', 'false');
      el.removeAttribute('inert');
    }
    setTrigger(el, true);
    emit(el, 'open');
  }

  function close(el) {
    if (!el || !isOpen(el)) return;
    const back = triggers.get(el);
    if (isLayer(el)) {
      el.classList.remove('is-open');
      const i = stack.indexOf(el); if (i > -1) stack.splice(i, 1);
      setTimeout(() => { if (!el.classList.contains('is-open')) el.hidden = true; }, reduced() ? 0 : DURATION);
    } else {
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('inert', '');
    }
    setTrigger(el, false);
    emit(el, 'close');
    if (back && document.contains(back) && typeof back.focus === 'function') back.focus({ preventScroll: true });
  }

  function toggle(el, trigger) { isOpen(el) ? close(el) : open(el, trigger); }

  function hostOf(node) { return node.closest('.pds-slideout-layer') || node.closest('.pds-slideout--push'); }

  function onClick(e) {
    const opener = e.target.closest('[data-slideout-open]');
    if (opener) {
      const el = document.getElementById(opener.getAttribute('data-slideout-open'));
      if (el) { e.preventDefault(); isLayer(el) ? open(el, opener) : toggle(el, opener); }
      return;
    }
    const closer = e.target.closest('[data-slideout-close]');
    if (closer) { const el = hostOf(closer); if (el) { e.preventDefault(); close(el); } return; }
    const cta = e.target.closest('[data-slideout-cta]');
    if (cta) {
      const el = hostOf(cta); if (!el) return;
      e.preventDefault();
      emit(el, 'cta', { cta });
      close(el);
      if (window.pdsToast && (cta.dataset.toastTitle || cta.dataset.toastBody)) {
        // optional: an ancestor with [data-slideout-toaster] holding its own .pds-toaster (doc-page stages)
        const scope = cta.closest('[data-slideout-toaster]');
        const box = scope ? scope.querySelector('.pds-toaster') : null;
        window.pdsToast.show({ type: cta.dataset.toastType || 'success', title: cta.dataset.toastTitle, body: cta.dataset.toastBody }, box || undefined);
      }
    }
  }

  function onKey(e) {
    const top = stack[stack.length - 1];
    if (e.key === 'Escape') {
      if (top) { e.preventDefault(); close(top); return; }
      const push = document.activeElement && document.activeElement.closest('.pds-slideout--push');
      if (push && isOpen(push)) { e.preventDefault(); close(push); }
      return;
    }
    if (e.key !== 'Tab' || !top) return;
    const items = focusables(slideoutOf(top));
    if (!items.length) { e.preventDefault(); return; }
    const first = items[0], last = items[items.length - 1];
    const inside = slideoutOf(top).contains(document.activeElement);
    if (e.shiftKey && (document.activeElement === first || !inside)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
  }

  let wired = false;
  function init(root) {
    (root || document).querySelectorAll('.pds-slideout-layer').forEach(l => {
      const so = slideoutOf(l); if (!so) return;
      so.setAttribute('role', 'dialog');
      so.setAttribute('aria-modal', 'true');
      const h = so.querySelector('.pds-slideout__heading');
      if (h && !so.hasAttribute('aria-labelledby')) { if (!h.id) h.id = 'pds-so-' + Math.random().toString(36).slice(2, 8); so.setAttribute('aria-labelledby', h.id); }
      const panel = so.querySelector('.pds-slideout__panel'); if (panel && !panel.hasAttribute('tabindex')) panel.tabIndex = -1;
      if (!l.classList.contains('is-open')) l.hidden = true;
    });
    (root || document).querySelectorAll('.pds-slideout-push-host > .pds-slideout--push').forEach(p => {
      if (!p.hasAttribute('aria-hidden')) p.setAttribute('aria-hidden', 'false');
      if (p.getAttribute('aria-hidden') === 'true') p.setAttribute('inert', '');
    });
    if (!wired) { document.addEventListener('click', onClick); document.addEventListener('keydown', onKey); wired = true; }
  }

  window.pdsSlideout = { open, close, toggle, init, isOpen };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();
