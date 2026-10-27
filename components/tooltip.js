/* Pando DS V1 — Tooltip behaviour. Requires tooltip.css (+ status.css for style 'track').
   pdsTooltip.attach(trigger, { style, title, text, beak, showTitle, content, status, rows })
     style      'text' (default) | 'custom' (Figma "Custom Content") | 'track' (Figma "Info + Status (Map Tracking)")
     title      string (Figma "Tooltip Title")                       — style text
     text       string (Figma "Tooltip content.")                    — style text
     showTitle  false hides the title (Figma "Show Title", default true) — style text
     content    Node — replaces the ".Swappable Content" placeholder  — style custom
     status     string, dark blue #Status label (Figma "Delayed"); null hides it — style track
     rows       [[label, value], …] (Figma 5 × ["Label Text", "Information Text"]) — style track
     beak       clock position of the beak: 1–12 (default 12 → tooltip below the target)
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

  const STYLES = ['text', 'custom', 'track'];
  /* Icons exported from Figma: refresh-line (3472:3224) and Status/Track "GPS Tracking" (112:5) */
  const ICON_REFRESH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.463 4.433C7.27756 2.86066 9.59899 1.99665 12 2C17.523 2 22 6.477 22 12C22 14.136 21.33 16.116 20.19 17.74L17 12H20C20.0001 10.4316 19.5392 8.8978 18.6747 7.58926C17.8101 6.28071 16.5799 5.25516 15.1372 4.64012C13.6944 4.02509 12.1027 3.8477 10.56 4.13002C9.0172 4.41233 7.59145 5.1419 6.46 6.228L5.463 4.433ZM18.537 19.567C16.7224 21.1393 14.401 22.0033 12 22C6.477 22 2 17.523 2 12C2 9.864 2.67 7.884 3.81 6.26L7 12H4C3.99987 13.5684 4.46075 15.1022 5.32534 16.4107C6.18992 17.7193 7.42007 18.7448 8.86282 19.3599C10.3056 19.9749 11.8973 20.1523 13.44 19.87C14.9828 19.5877 16.4085 18.8581 17.54 17.772L18.537 19.567Z"/></svg>';
  const ICON_GPS = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M12.5047 1.4953C12.4085 1.39916 12.2622 1.3728 12.1385 1.42988L1.58908 6.28818C1.46822 6.34363 1.39361 6.46726 1.40042 6.60011C1.40678 6.73293 1.49374 6.84817 1.6198 6.89129L4.86145 8.00013C5.39595 8.18325 5.81597 8.60324 5.99906 9.13775L7.10871 12.3802C7.15178 12.5059 7.26707 12.5928 7.39989 12.5996C7.53273 12.6064 7.65637 12.5314 7.7118 12.4109L12.5701 1.86144C12.6271 1.73781 12.6008 1.59142 12.5047 1.4953Z"/></svg>';

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function build(o = {}) {
    const beak = BEAKS.includes(String(o.beak)) ? String(o.beak) : '12';
    const style = STYLES.includes(o.style) ? o.style : 'text';
    const t = document.createElement('div');
    t.className = 'pds-tooltip pds-tooltip--' + style + ' pds-tooltip--beak-' + beak;
    t.dataset.beak = beak;
    if (style === 'custom') {
      if (o.content instanceof Node) t.appendChild(o.content);
      else { // Figma placeholder ".Swappable Content"
        const c = el('div', 'pds-tooltip__swap');
        const h = el('p', 'pds-tooltip__swap-title');
        h.innerHTML = '<span class="pds-tooltip__swap-icon">' + ICON_REFRESH + '</span>';
        h.appendChild(el('span', null, 'Swappable Content'));
        c.appendChild(h);
        c.appendChild(el('p', 'pds-tooltip__swap-text', 'Swap this component out with another.'));
        t.appendChild(c);
      }
    } else if (style === 'track') {
      const status = o.status === undefined ? 'Delayed' : o.status;
      if (status) {
        const s = el('span', 'pds-status pds-status--dark pds-status--blue');
        s.appendChild(el('span', 'pds-status__label', status));
        const i = el('span', 'pds-status__icons'); i.innerHTML = ICON_GPS; s.appendChild(i);
        t.appendChild(s);
      }
      const rows = o.rows || Array.from({ length: 5 }, () => ['Label Text', 'Information Text']);
      rows.forEach(([l, v]) => {
        const r = el('p', 'pds-tooltip__row');
        if (l) { r.appendChild(el('span', 'pds-tooltip__row-label', l)); r.appendChild(el('span', null, ':')); }
        r.appendChild(el('span', 'pds-tooltip__row-value', v));
        t.appendChild(r);
      });
    } else {
      if (o.showTitle !== false && o.title) t.appendChild(el('p', 'pds-tooltip__title', o.title));
      if (o.text) t.appendChild(el('p', 'pds-tooltip__text', o.text));
    }
    return t;
  }

  function setBeak(t, b) { t.className = t.className.replace(/pds-tooltip--beak-\d+/, 'pds-tooltip--beak-' + b); }

  /* Point the beak at the centre of the trigger. The beak's own position is
     read from the rendered ::before, so placement follows tooltip.css exactly. */
  function place(t, trigger, beak) {
    const r = trigger.getBoundingClientRect();
    const w = t.offsetWidth, h = t.offsetHeight;
    const off = css('--tooltip-offset');
    const bs = getComputedStyle(t, '::before');
    const bx = parseFloat(bs.left) + parseFloat(bs.width) / 2;   // beak centre from bubble's left
    const by = parseFloat(bs.top) + parseFloat(bs.height) / 2;   // beak centre from bubble's top
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const b = Number(beak);
    let x, y;
    if ([11,12,1].includes(b) || [5,6,7].includes(b)) {
      x = cx - bx;
      y = [11,12,1].includes(b) ? r.bottom + off : r.top - off - h;
    } else {
      y = cy - by;
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
      attach(el, { text: el.dataset.pdsTooltip, title: el.dataset.tooltipTitle, beak: el.dataset.beak, showTitle: el.dataset.showTitle !== 'false' });  // style 'text' only; use attach() for custom / track
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();

  window.pdsTooltip = { build, attach, show, hide, init };
})();
