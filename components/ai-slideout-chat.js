/* Pando DS V1 — Slideout Chat (full AI drawer). Requires ai-slideout-chat.css and the kit:
   icons/icons-data.js, ai-insights.js, ai-chat-composer.js, ai-action-popup.js
   (slideout.js for the live drawer). Every piece inside is built by its own kit builder.

   pdsAiSlideoutChat.build(opts) → HTMLElement   (Slideout  Chat 4514:9012)
     type          'slideout' | 'full'                 (Figma Type = Slideout | Full page)
     swappable     false | true                         (Figma Swappable = No | Yes)
     insights      true  — boolean "Insights" (Swappable=No only)
     quickActions  true  — boolean "Quick Actions" (Swappable=No only)
     slot          Node | html — content of the "Swap" slot (Swappable=Yes)
     chatName      'Chat name' (PI title, Swappable=Yes)
     live          true → the .Input bar is a live textarea (composer behaviour)
   pdsAiSlideoutChat.setSwappable(root, on, slot?) — switches No ↔ Yes in place.
   pdsAiSlideoutChat.setSlot(root, node|html) — replaces the slot content.
   pdsAiSlideoutChat.bind(root) — wires header buttons, insight cards, Quick Actions and the kit
     Show More toggle (pdsAiInsights.bind(root)) — don't also bind the insights on document (idempotent).
     Events (bubble from the root):
       pds-ai-slideout-chat:menu · :new (Add) · :details · :expand · :artifacts · :chat-name (PI)
       pds-ai-slideout-chat:close           (Close-Tag; also [data-slideout-close] for slideout.js)
       pds-ai-slideout-chat:insight { title }  pds-ai-slideout-chat:quick-action { text }
     Figma has no prototype reactions on this set; all of the above is added in review.
   pdsAiSlideoutChat.demo(root) — DEMO ONLY, no AI connected: insight / Quick Action →
     Swappable=Yes with an Action - popup in the slot → Confirm → Responding;
     Skip → .Input Skipped; send from the bar → Responding. "+" (New) resets. */
(function () {
  var ICON = {};
  (window.PDS_ICONS || []).forEach(function (i) { ICON[i.n] = i.svg; });
  function icon(n) { return (ICON[n] || '').replace('<svg ', '<svg aria-hidden="true" focusable="false" '); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function fire(node, name, detail) { node.dispatchEvent(new CustomEvent('pds-ai-slideout-chat:' + name, { bubbles: true, detail: detail || {} })); }

  /* Figma sample content */
  var SAMPLE = {
    title: "Hi! I'm your freight invoice assistant",
    desc: 'Ask anything about your invoices - search, filter, update, and track across carriers, statuses, dates, and more.',
    qaLabel: 'Quick Actions',
    quickActions: ['What are my pending activities?', 'Show all invoices with carrier comments', 'Update [invoice parameter] to [new value]', 'Find all overdue invoices from [carrier name]'],
    insights: [
      { tone: 'cost', title: 'Tariff Name Mismatch', desc: '15 invoices  ·  $34,210 impact' },
      { tone: 'records', title: 'GL Code Unallocated', desc: '8 invoices  ·  $12,440 impact' },
      { tone: 'impact', title: 'Pending Approval', desc: '12 invoices  ·  $44,100 total' },
      { tone: 'calendar', title: 'Overdue Invoices', desc: '24 invoices  ·  $39,340 at risk' }
    ],
    chatName: 'Chat name',
    artifacts: 'Artifacts'
  };

  function btn(cls, name, label, ev) {
    return '<button type="button" class="pds-ai-slideout-chat__icon ' + cls + '" aria-label="' + label + '" title="' + label + '" data-ai-chat="' + ev + '">' + icon(name) + '</button>';
  }
  function pi(name) {
    /* kit PI (Theme=Dark, Type=FAP) with the Freehand AI icon hidden and the label overridden */
    return '<button type="button" class="pds-ai-pi pds-ai-pi--dark pds-ai-pi--fap pds-ai-slideout-chat__pi" data-ai-chat="chat-name">' +
      '<span class="pds-ai-pi__label">' + esc(name) + '</span><span class="pds-icon pds-ai-pi__arrow">' + icon('nav-dropdown-arrow-solid') + '</span></button>';
  }
  var CLOSE = '<button type="button" class="pds-ai-slideout-chat__icon pds-ai-slideout-chat__icon--close" aria-label="Close" title="Close" data-ai-chat="close" data-slideout-close>' + icon('nav-close-tag') + '</button>';
  var DIVIDER = '<span class="pds-ai-slideout-chat__divider" aria-hidden="true"></span>';

  function headerHTML(full, swap, name) {
    if (full && !swap) return '<div class="pds-ai-slideout-chat__header" hidden></div>';   /* hidden in Figma */
    if (full) {
      /* Full page · Yes: PI (Menu hidden) · Action Button "Artifacts" (Close hidden) */
      return '<div class="pds-ai-slideout-chat__header"><div class="pds-ai-slideout-chat__left">' + pi(name) + '</div>' +
        '<div class="pds-ai-slideout-chat__right"><button type="button" class="pds-button pds-button--action pds-ai-slideout-chat__artifacts" data-ai-chat="artifacts">' +
        '<span class="pds-icon pds-button__icon">' + icon('indicator-details-14') + '</span>' + esc(SAMPLE.artifacts) + '</button></div></div>';
    }
    var menu = btn('', 'indicator-menu-14', 'Menu', 'menu');
    if (!swap) {
      return '<div class="pds-ai-slideout-chat__header"><div class="pds-ai-slideout-chat__left">' + menu + '</div>' +
        '<div class="pds-ai-slideout-chat__right"><div class="pds-ai-slideout-chat__icons">' + btn('', 'indicator-expand-14', 'Expand', 'expand') + '</div>' + DIVIDER + CLOSE + '</div></div>';
    }
    return '<div class="pds-ai-slideout-chat__header"><div class="pds-ai-slideout-chat__left">' + menu + pi(name) + '</div>' +
      '<div class="pds-ai-slideout-chat__right"><div class="pds-ai-slideout-chat__icons">' +
      btn('', 'indicator-add-14', 'New chat', 'new') + btn('', 'indicator-details-14', 'Details', 'details') + btn('', 'indicator-expand-14', 'Expand', 'expand') +
      '</div>' + DIVIDER + CLOSE + '</div></div>';
  }

  function quickActions(list) {
    var ul = el('<div class="pds-ai-slideout-chat__qa" role="group" aria-labelledby=""><h3 class="pds-ai-slideout-chat__qa-label"></h3><ul class="pds-ai-slideout-chat__qa-list"></ul></div>');
    var id = 'pds-ai-sc-qa-' + Math.random().toString(36).slice(2, 8);
    var h = ul.querySelector('h3'); h.id = id; h.textContent = SAMPLE.qaLabel; ul.setAttribute('aria-labelledby', id);
    var u = ul.querySelector('ul');
    list.forEach(function (t) {
      /* kit .Option (pdsAiPopup.option) moved onto a <button> so it is reachable by keyboard */
      var opt = window.pdsAiPopup.option({ text: t });
      var b = document.createElement('button');
      b.type = 'button'; b.className = opt.className; b.setAttribute('data-ai-chat', 'quick-action');
      while (opt.firstChild) b.appendChild(opt.firstChild);
      var li = document.createElement('li'); li.appendChild(b); u.appendChild(li);
    });
    return ul;
  }

  function bodyNo(o, full) {
    var body = el('<div class="pds-ai-slideout-chat__body"></div>');
    body.appendChild(el('<section class="pds-ai-slideout-chat__welcome"><span class="pds-ai-slideout-chat__logo" aria-hidden="true">' + icon('logo-apps-freehand-logo') + '</span>' +
      '<h2 class="pds-ai-slideout-chat__title">' + esc(o.title || SAMPLE.title) + '</h2><p class="pds-ai-slideout-chat__desc">' + esc(o.desc || SAMPLE.desc) + '</p></section>'));
    if (o.insights !== false) {
      /* Slideout: .Insights Default (Show More); Full page: Expanded, Size=Large */
      var ins = window.pdsAiInsights.insights({ cards: o.cards || SAMPLE.insights, large: full });
      ins.querySelectorAll('.pds-ai-insight').forEach(function (c) {
        c.tabIndex = 0; c.setAttribute('role', 'button'); c.setAttribute('data-ai-chat', 'insight');   /* added in review */
      });
      body.appendChild(ins);
    }
    if (o.quickActions !== false) body.appendChild(quickActions(o.actions || SAMPLE.quickActions));
    return body;
  }

  function bodyYes(o) {
    var body = el('<div class="pds-ai-slideout-chat__body"><div class="pds-ai-slideout-chat__slot" aria-live="polite"></div></div>');
    if (o.slot) setSlotNode(body.firstChild, o.slot);
    return body;
  }
  function setSlotNode(slot, c) { slot.replaceChildren(); if (c == null) return; typeof c === 'string' ? (slot.innerHTML = c) : slot.appendChild(c); }

  function build(o) {
    o = o || {};
    var full = o.type === 'full', swap = !!o.swappable;
    var root = el('<aside class="pds-ai-slideout-chat' + (full ? ' pds-ai-slideout-chat--full' : '') + (swap ? ' pds-ai-slideout-chat--swappable' : '') + '" aria-label="' + esc(o.label || 'Freehand AI chat') + '">' +
      '<div class="pds-ai-slideout-chat__surface"><div class="pds-ai-slideout-chat__pattern" aria-hidden="true"></div><div class="pds-ai-slideout-chat__content"></div></div></aside>');
    root.__opts = o;
    var content = root.querySelector('.pds-ai-slideout-chat__content');
    content.appendChild(el(headerHTML(full, swap, o.chatName || SAMPLE.chatName)));
    content.appendChild(swap ? bodyYes(o) : bodyNo(o, full));
    content.appendChild(window.pdsAiPopup.input({ live: o.live !== false }));
    if (o.live !== false) window.pdsAiPopup.bind(content);
    return root;
  }

  function setSwappable(root, on, slot) {
    var o = root.__opts || {};
    var full = root.classList.contains('pds-ai-slideout-chat--full');
    root.classList.toggle('pds-ai-slideout-chat--swappable', on);
    var content = root.querySelector('.pds-ai-slideout-chat__content');
    content.querySelector('.pds-ai-slideout-chat__header').replaceWith(el(headerHTML(full, on, o.chatName || SAMPLE.chatName)));
    content.querySelector('.pds-ai-slideout-chat__body').replaceWith(on ? bodyYes({ slot: slot }) : bodyNo(o, full));
  }
  function setSlot(root, c) { var s = root.querySelector('.pds-ai-slideout-chat__slot'); if (s) setSlotNode(s, c); }

  function bind(root) {
    if (root.__pdsAiSc) return root; root.__pdsAiSc = true;
    window.pdsAiInsights.bind(root);   /* Show More / Show Less — kit behaviour, scoped to this chat */
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ai-chat]');
      if (!t || !root.contains(t)) return;
      var k = t.getAttribute('data-ai-chat');
      if (k === 'insight') fire(root, 'insight', { title: (t.querySelector('.pds-ai-insight__title') || t).textContent.trim() });
      else if (k === 'quick-action') fire(root, 'quick-action', { text: t.textContent.trim() });
      else fire(root, k);
    });
    root.addEventListener('keydown', function (e) {
      var t = e.target.closest && e.target.closest('.pds-ai-insight[data-ai-chat]');
      if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); t.click(); }
    });
    return root;
  }

  /* ── DEMO ONLY — no AI is connected. Uses the composed pieces' own APIs. ── */
  function demo(root) {
    bind(root);
    var input = function () { return root.querySelector('.pds-ai-input'); };
    function swapInput(variant, extra) {
      var n = window.pdsAiPopup.input(Object.assign({ variant: variant }, extra || {}));
      input().replaceWith(n); window.pdsAiPopup.bind(n.parentNode);
    }
    function responding() {
      var r = window.pdsAiPopup.responding({ live: true }); r.setAttribute('data-demo', '');
      setSlot(root, r);
    }
    function openPopup(type, context) {
      if (!root.classList.contains('pds-ai-slideout-chat--swappable')) setSwappable(root, true);
      var p = window.pdsAiPopup.popup({ type: type, footer: false }); p.setAttribute('data-demo', '');
      setSlot(root, p); window.pdsAiPopup.bind(p.parentNode);
      if (context) swapInput('tagged', { tag: { label: 'Context : ', value: context } });
      var first = p.querySelector('input, button'); if (first) first.focus();
    }
    root.addEventListener('pds-ai-slideout-chat:insight', function (e) { openPopup('option', e.detail.title); });
    root.addEventListener('pds-ai-slideout-chat:quick-action', function () { openPopup('default'); });
    root.addEventListener('pds-ai-popup:confirm', function () { swapInput('default'); responding(); });
    root.addEventListener('pds-ai-popup:skip', function () { setSlot(root, null); swapInput('skipped'); var ta = root.querySelector('.pds-ai-composer__field'); if (ta) ta.focus(); });
    root.addEventListener('pds-ai-composer:send', function () {
      if (!root.classList.contains('pds-ai-slideout-chat--swappable')) setSwappable(root, true);
      if (!input().classList.contains('pds-ai-input--tagged')) swapInput('default');
      responding();
    });
    root.addEventListener('pds-ai-input:suggest', function () { openPopup('default'); });
    root.addEventListener('pds-ai-slideout-chat:new', function () { setSwappable(root, false); swapInput('default'); });
    return root;
  }

  window.pdsAiSlideoutChat = { build: build, setSwappable: setSwappable, setSlot: setSlot, bind: bind, demo: demo, SAMPLE: SAMPLE };
})();
