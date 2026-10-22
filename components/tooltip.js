/* Pando DS V1 — Tooltip behaviour. Requires tooltip.css.
   pdsTooltip.attach(trigger, { title, text, beak, showTitle })
     title      string (Figma "Tooltip Title")
     text       string (Figma "Tooltip content.")
     beak       clock position of the beak: 1–12 (default 12 → tooltip below the target)
     showTitle  false hides the title (Figma "Show Title", default true)
   Or declaratively: <button data-pds-tooltip="Tooltip content." data-tooltip-title="Tooltip Title" data-beak="12">
   then pdsTooltip.init() (runs on DOMContentLoaded).

   Behaviour (Figma): triggered on hover or focus of the target; dismissed on
   blur or mouse-out of the target or tooltip container. Moving the pointer
   from the target onto the tooltip keeps it open.
   Added in review — not in Figma: Esc closes it (WCAG 1.4.13); the beak flips
   to the opposite side when the tooltip would leave the viewport (Figma
   "Placement & Convention" asks for auto-adjust but shows no rule). */
(function () {
  const BEAKS = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const FLIP = { '11':'7','12':'6','1':'5','7':'11','6':'12','5':'1','2':'10','3':'9','4':'8','10':'2','9':'3','8':'4' };
  let uid = 0, open = null;

  function css(name, el) { return parseFloat(getComputedStyle(el || document.documentElement).getPropertyValue(name)) || 0; }

  function build(o = {}) {
    const beak = BEAKS.includes(String(o.beak)) ? String(o.beak) : '12';
    const t = document.createElement('div');
    t.className = 'pds-tooltip pds-tooltip--beak-' + beak;
    t.dataset.beak = beak;
    if (o.showTitle !== false && o.title) {
      const h = document.createElement('p'); h.className = 'pds-tooltip__title'; h.textContent = o.title; t.appendChild(h);
    }
    if (o.text) { const p = document.createElement('p'); p.className = 'pds-tooltip__text'; p.textContent = o.text; t.appendChild(p); }
    return t;
  }

  function setBeak(t, b) { t.className = t.className.replace(/pds-tooltip--beak-\d+/, 'pds-tooltip--beak-' + b); }

  /* Point the beak at the centre of the trigger. */
  function place(t, trigger, beak) {
    const r = trigger.getBoundingClientRect();
    const w = t.offsetWidth, h = t.offsetHeight;
    const off = css('--tooltip-offset'), s = css('--tooltip-beak-start'), e = css('--tooltip-beak-end');
    const bw = css('--tooltip-beak-w');
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    // distance from the bubble's start edge to the beak's centre line
    const along = n => ({ start: s + bw / 2, center: n / 2 - 2, end: n - e - bw / 2 });
    let x, y;
    const b = Number(beak);
    if ([11,12,1].includes(b) || [5,6,7].includes(b)) {
      const a = along(w), k = b === 11 || b === 7 ? 'start' : b === 12 || b === 6 ? 'center' : 'end';
      x = cx - a[k];
      y = [11,12,1].includes(b) ? r.bottom + off : r.top - off - h;
    } else {
      const a = along(h), k = b === 10 || b === 2 ? 'start' : b === 9 || b === 3 ? 'center' : 'end';
      y = cy - a[k];
      x = [8,9,10].includes(b) ? r.right + off : r.left - off - w;
    }
    return { x, y, fits: x >= 0 && y >= 0 && x + w <= innerWidth && y + h <= innerHeight };
  }

  function show(t, trigger) {
    if (open && open.t !== t) hide(open.t);
    t.hidden = false;
    let beak = t.dataset.beak;
    setBeak(t, beak);
    let p = place(t, trigger, beak);
    if (!p.fits) { const f = FLIP[beak]; setBeak(t, f); const q = place(t, trigger, f); if (q.fits) p = q; else setBeak(t, beak); }
    t.style.left = Math.round(p.x) + 'px';
    t.style.top = Math.round(p.y) + 'px';
    open = { t, trigger };
  }

  function hide(t) { t.hidden = true; if (open && open.t === t) open = null; }

  function attach(trigger, o = {}) {
    const t = build(o);
    t.classList.add('pds-tooltip--floating');
    t.setAttribute('role', 'tooltip');
    t.id = 'pds-tooltip-' + (++uid);
    t.hidden = true;
    document.body.appendChild(t);
    const ids = (trigger.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    trigger.setAttribute('aria-describedby', ids.concat(t.id).join(' '));

    let overTrigger = false, overTip = false;
    const maybeHide = () => setTimeout(() => { if (!overTrigger && !overTip && document.activeElement !== trigger) hide(t); }, 0);
    trigger.addEventListener('mouseenter', () => { overTrigger = true; show(t, trigger); });
    trigger.addEventListener('mouseleave', () => { overTrigger = false; maybeHide(); });
    t.addEventListener('mouseenter', () => { overTip = true; });
    t.addEventListener('mouseleave', () => { overTip = false; maybeHide(); });
    trigger.addEventListener('focus', () => show(t, trigger));
    trigger.addEventListener('blur', () => hide(t));
    return t;
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) hide(open.t); });
  addEventListener('scroll', () => { if (open) show(open.t, open.trigger); }, true);
  addEventListener('resize', () => { if (open) show(open.t, open.trigger); });

  function init(root = document) {
    root.querySelectorAll('[data-pds-tooltip]:not([data-pds-tooltip-ready])').forEach(el => {
      el.setAttribute('data-pds-tooltip-ready', '');
      attach(el, { text: el.dataset.pdsTooltip, title: el.dataset.tooltipTitle, beak: el.dataset.beak, showTitle: el.dataset.showTitle !== 'false' });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();

  window.pdsTooltip = { build, attach, show, hide, init };
})();
