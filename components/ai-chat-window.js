/* Pando DS V1 — AI Chat window behaviour.
   Requires: ai-chat-composer.js (window.pdsAiComposer), icons/icons-data.js (window.PDS_ICONS),
   and the CSS listed in ai-chat-window.css.

   pdsAiChatWindow.build(opts) → HTMLElement
     opts.theme    'light' (Figma "Chat") | 'dark' (Figma "AI Chat")       default 'light'
     opts.variant  'prompt' | 'swappable' | 'conversation'                   default 'prompt'
     opts.live     true → live composer; sending runs the demo loop below
     opts.reply    text of the canned demo reply                             default Figma "Input text here"
     opts.delay    ms the loader shows before the demo reply                 default 1200
   Events (bubble from the window root):
     'pds-ai-chat-window:close'    Close-Tag pressed (both themes)
     'pds-ai-chat-window:new-tab'  Navigation/New Tab pressed (Light)
     'pds-ai-chat-window:new'      "New" pressed (Dark)
     'pds-ai-chat-window:more'     More Actions pressed (Light)
     'pds-ai-chat-window:send'     { text } — a message was added
   Demo loop (live only, not in Figma — no AI is connected): the sent text becomes a user
   bubble, a Loading bubble shows, then a canned AI bubble marked data-demo replaces it.
   Suggestion cards (composer Prompt cards in Light, Prompt cards in Dark) fill the composer.
   pdsAiChatWindow.suggestion(opts) → HTMLElement — one "Prompt" suggestion card
     opts.theme 'dark' | 'light' · opts.type 'simple' | 'icon' · opts.hover (doc only) · opts.text
   pdsAiChatWindow.addMessage(win, {from:'user'|'ai'|'loading', text, time}) → node */
(function () {
  var SAMPLE = 'Input text here';
  var TIME = '10:39 AM';
  var PROMPT_TEXT = 'Enter Prompt here';
  var SLOT_DESC = 'Swap this component out with another.';
  var LIGHT_INTRO = 'Ask Pando AI about your <placeholder text here>';
  var HEADING = 'How can I help you today?';

  /* Freehand_Ai_Icon 1 (copied from ai-chat-bubbles.html — PI dark icon) */
  var FH_AI='<svg class="pds-ai-pi__icon" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><g fill="currentColor"><path d="M11.8416 6.51935H10.3189C8.73278 6.51935 7.44272 5.2293 7.44272 3.64317V2.12048C7.44272 1.97244 7.31583 1.8667 7.18895 1.8667H4.96836C4.82032 1.8667 4.71458 1.99359 4.71458 2.12048V3.64317C4.71458 5.2293 3.42452 6.51935 1.83839 6.51935H0.294552C0.146513 6.51935 0.0407715 6.64625 0.0407715 6.77313V8.99372C0.0407715 9.14176 0.167662 9.2475 0.294552 9.2475H1.81724C3.40337 9.2475 4.69343 10.5376 4.69343 12.1237V13.6464C4.69343 13.7944 4.82032 13.9001 4.94721 13.9001H7.16779C7.31583 13.9001 7.42158 13.7733 7.42158 13.6464V12.1237C7.42158 10.5376 8.71163 9.2475 10.2978 9.2475H11.8205C11.9684 9.2475 12.0742 9.12061 12.0742 8.99372V6.77313C12.0742 6.62509 11.9473 6.51935 11.8205 6.51935H11.8416Z"/><path d="M13.8299 1.78935H13.2553C12.6567 1.78935 12.1698 1.30249 12.1698 0.703883V0.129224C12.1698 0.0733542 12.1219 0.0334473 12.074 0.0334473H11.236C11.1801 0.0334473 11.1402 0.0813355 11.1402 0.129224V0.703883C11.1402 1.30249 10.6534 1.78935 10.0548 1.78935H9.47212C9.41625 1.78935 9.37634 1.83724 9.37634 1.88513V2.72317C9.37634 2.77904 9.42424 2.81895 9.47212 2.81895H10.0468C10.6454 2.81895 11.1323 3.30581 11.1323 3.90442V4.47907C11.1323 4.53494 11.1801 4.57485 11.228 4.57485H12.066C12.1219 4.57485 12.1619 4.52696 12.1619 4.47907V3.90442C12.1619 3.30581 12.6487 2.81895 13.2473 2.81895H13.8219C13.8778 2.81895 13.9178 2.77106 13.9178 2.72317V1.88513C13.9178 1.82926 13.8699 1.78935 13.8219 1.78935H13.8299Z"/></g></svg>';
  /* refresh-line (copied from ai-chat-bubbles.html — Swappable Content slot icon) */
  var REFRESH='<svg class="pds-comment-thread__slot-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.5525 3.69417C6.06463 2.38388 7.99916 1.66388 10 1.66667C14.6025 1.66667 18.3333 5.3975 18.3333 10C18.3333 11.78 17.775 13.43 16.825 14.7833L14.1667 10H16.6667C16.6668 8.69302 16.2827 7.41484 15.5622 6.32438C14.8417 5.23392 13.8166 4.3793 12.6143 3.86677C11.412 3.35424 10.0856 3.20642 8.79996 3.44168C7.51433 3.67694 6.32621 4.28492 5.38333 5.19L4.5525 3.69417ZM15.4475 16.3058C13.9354 17.6161 12.0008 18.3361 10 18.3333C5.3975 18.3333 1.66667 14.6025 1.66667 10C1.66667 8.22 2.225 6.57 3.175 5.21667L5.83333 10H3.33333C3.33323 11.307 3.71729 12.5852 4.43778 13.6756C5.15827 14.7661 6.18339 15.6207 7.38568 16.1332C8.58798 16.6458 9.9144 16.7936 11.2 16.5583C12.4857 16.3231 13.6738 15.7151 14.6167 14.81L15.4475 16.3058Z"/></svg>';

  function icon(n, cls) {
    var i = (window.PDS_ICONS || []).find(function (x) { return x.n === n; });
    var svg = i ? i.svg.replace('<svg', '<svg aria-hidden="true" focusable="false"') : '';
    return '<span class="pds-icon' + (cls ? ' ' + cls : '') + '">' + svg + '</span>';
  }
  function rawIcon(n, cls) {
    var i = (window.PDS_ICONS || []).find(function (x) { return x.n === n; });
    return i ? i.svg.replace('<svg', '<svg class="' + (cls || '') + '" aria-hidden="true" focusable="false"') : '';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* Light "Pi" label icon — ring + sparkle, stroke #006265 → #19A476. Inlined from Figma vectors. */
  var piN = 0;
  function piIcon() {
    var id = 'pds-aiw-pi-' + (++piN);
    return '<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false"><defs><linearGradient id="' + id + '" x1="7" y1="14" x2="7" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#006265"/><stop offset="1" stop-color="#19A476"/></linearGradient></defs>' +
      '<circle cx="7" cy="7" r="6.5" stroke="url(#' + id + ')"/>' +
      '<path transform="translate(3.3 2.8)" d="M3.5 0L4.12 3.8L7 4.375L4.12 4.95L3.5 8.75L2.88 4.95L0 4.375L2.88 3.8Z" stroke="url(#' + id + ')" stroke-width="1.25" stroke-linejoin="round"/>' +
      '<path transform="translate(8.2 3.7)" d="M0.91 0L1.07 0.99L1.82 1.14L1.07 1.29L0.91 2.28L0.75 1.29L0 1.14L0.75 0.99Z" stroke="url(#' + id + ')" stroke-width=".325"/></svg>';
  }

  function slot() {
    return '<div class="pds-comment-thread__slot"><span class="pds-comment-thread__slot-title">' + REFRESH + 'Swappable Content</span><span>' + SLOT_DESC + '</span></div>';
  }

  /* ── Messages ── */
  function typing() {
    return '<span class="pds-ai-bubble__typing" role="status" aria-label="Loading"><span class="pds-ai-bubble__dot"></span><span class="pds-ai-bubble__dot"></span><span class="pds-ai-bubble__dot"></span></span>';
  }
  function message(theme, m) {
    var from = m.from || 'ai';
    var text = m.text == null ? SAMPLE : m.text;
    var time = m.time === false ? '' : (m.time || TIME);
    var el = document.createElement('div');
    if (theme === 'dark') {
      /* kit Chat bubble (ai-chat-bubbles.css), Theme=Dark; window instances have Date/ Time off */
      var avatar = '<span class="pds-ai-bubble__avatar" aria-hidden="true">' + rawIcon('logo-apps-freehand-logo') + '</span>';
      el.className = 'pds-ai-bubble pds-ai-bubble--dark pds-ai-bubble--' + from;
      if (from === 'loading') el.innerHTML = avatar + typing();
      else el.innerHTML = (from === 'ai' ? avatar : '') + '<div class="pds-ai-bubble__body"><div class="pds-ai-bubble__message"><p class="pds-ai-bubble__text">' + esc(text) + '</p></div>' + (m.showTime ? '<time class="pds-ai-bubble__time">' + esc(time) + '</time>' : '') + '</div>';
      return el;
    }
    /* Light "Vertical" bubble — built here (main component not in the file) */
    var who = '<span class="pds-ai-chat-window__who">' + piIcon() + 'Pi</span>';
    el.className = 'pds-ai-chat-window__msg pds-ai-chat-window__msg--' + (from === 'loading' ? 'ai pds-ai-chat-window__msg--loading' : from);
    if (from === 'loading') el.innerHTML = who + '<span class="pds-ai-bubble pds-ai-bubble--light">' + typing() + '</span>';
    else el.innerHTML = (from === 'ai' ? who : '') + '<div class="pds-ai-chat-window__bubble"><p class="pds-ai-chat-window__text">' + esc(text) + '</p></div>' + (time ? '<time class="pds-ai-chat-window__time">' + esc(time) + '</time>' : '');
    return el;
  }

  /* ── Suggestion card (Prompt 3572:14750) ── */
  function suggestion(o) {
    o = o || {};
    var light = o.theme === 'light';
    var ic = !light && o.type === 'icon';
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pds-ai-suggest' + (light ? ' pds-ai-suggest--light' : '') + (ic ? ' pds-ai-suggest--icon' : '') + (o.hover ? ' is-hover' : '');
    b.innerHTML = (ic ? '<span class="pds-avatar pds-avatar--purple pds-avatar--dark" aria-hidden="true">' + rawIcon('indicator-factory-14', 'pds-avatar__icon') + '</span>' : '') + '<span class="pds-ai-suggest__text">' + esc(o.text || PROMPT_TEXT) + '</span>';
    return b;
  }

  /* ── Header ── */
  function header(theme) {
    if (theme === 'dark') {
      return '<div class="pds-ai-chat-window__header">' +
        '<h2 class="pds-ai-pi pds-ai-pi--dark pds-ai-chat-window__pi">' + FH_AI + '<span class="pds-ai-pi__label">Chat</span></h2>' +
        '<div class="pds-ai-chat-window__right">' +
          '<button type="button" class="pds-button pds-button--action pds-ai-chat-window__new" data-act="new">' + rawIcon('action-add', 'pds-button__icon') + '<span class="pds-button__label">New</span></button>' +
          '<span class="pds-ai-chat-window__divider" aria-hidden="true"></span>' +
          '<button type="button" class="pds-ai-chat-window__icon-btn" data-act="close" aria-label="Close">' + icon('nav-close-tag') + '</button>' +
        '</div></div>';
    }
    return '<div class="pds-ai-chat-window__header"><h2 class="pds-ai-chat-window__title">Pi</h2><div class="pds-ai-chat-window__actions">' +
      '<button type="button" class="pds-ai-chat-window__icon-btn" data-act="more" aria-label="More actions">' + icon('action-more-actions') + '</button>' +
      '<button type="button" class="pds-ai-chat-window__icon-btn pds-ai-chat-window__icon-btn--10" data-act="new-tab" aria-label="Open in new tab">' + icon('nav-new-tab') + '</button>' +
      '<button type="button" class="pds-ai-chat-window__icon-btn" data-act="close" aria-label="Close">' + icon('nav-close-tag') + '</button>' +
      '</div></div>';
  }

  /* ── Content per variant ── */
  function fill(win) {
    var theme = win.__aiw.theme, variant = win.__aiw.variant;
    var content = win.querySelector('.pds-ai-chat-window__content');
    var bar = content.querySelector('.pds-ai-composer');
    Array.prototype.slice.call(content.children).forEach(function (c) { if (c !== bar) c.remove(); });
    var frag = document.createDocumentFragment();
    var log = document.createElement('div');
    log.className = 'pds-ai-chat-window__log';
    log.setAttribute('role', 'log'); log.setAttribute('aria-label', 'Conversation'); log.setAttribute('aria-live', 'polite');

    if (theme === 'dark' && variant === 'prompt') {
      var hello = document.createElement('div');
      hello.className = 'pds-ai-chat-window__hello';
      hello.innerHTML = '<span class="pds-ai-loader" aria-hidden="true"><img class="pds-ai-loader__art" src="brand/pi-with-halo-freehand.svg" alt=""></span><p class="pds-ai-chat-window__heading">' + HEADING + '</p><ul class="pds-ai-chat-window__prompts"></ul>';
      var ul = hello.querySelector('ul');
      for (var i = 0; i < 8; i++) { var li = document.createElement('li'); li.appendChild(suggestion({ theme: 'dark' })); ul.appendChild(li); }
      frag.appendChild(hello);
    } else if (variant === 'conversation') {
      var seq = theme === 'dark'
        ? ['user', 'ai', 'user', 'user', 'ai', 'user', 'ai', 'user', 'ai']
        : ['user', 'ai', 'user', 'ai', 'user', 'ai', 'loading'];
      seq.forEach(function (f) { log.appendChild(message(theme, { from: f })); });
      frag.appendChild(log);
    } else {
      if (variant === 'prompt') frag.appendChild(window.pdsAiComposer.prompt({ intro: LIGHT_INTRO }));
      else { var t = document.createElement('div'); t.innerHTML = slot(); frag.appendChild(t.firstChild); }
      if (theme === 'light') frag.appendChild(message('light', { from: 'loading' }));
    }
    content.insertBefore(frag, bar);
    var l = content.querySelector('.pds-ai-chat-window__log');
    if (l) { l.scrollTop = l.scrollHeight; requestAnimationFrame(function () { l.scrollTop = l.scrollHeight; }); } /* also once mounted */
  }

  function build(o) {
    o = o || {};
    var theme = o.theme === 'dark' ? 'dark' : 'light';
    var variant = o.variant || 'prompt';
    var win = document.createElement('section');
    win.className = 'pds-ai-chat-window pds-ai-chat-window--' + theme + ' pds-ai-chat-window--' + variant;
    win.setAttribute('aria-label', theme === 'dark' ? 'Chat' : 'Pi');
    win.__aiw = { theme: theme, variant: variant, reply: o.reply || SAMPLE, delay: o.delay == null ? 1200 : o.delay, busy: false };
    win.innerHTML = header(theme) + '<div class="pds-ai-chat-window__content"></div>';
    var bar = window.pdsAiComposer.build({ theme: theme, legacy: theme === 'light', live: !!o.live });
    win.querySelector('.pds-ai-chat-window__content').appendChild(bar);
    fill(win);
    if (o.live) init(win);
    return win;
  }

  function log(win) {
    var l = win.querySelector('.pds-ai-chat-window__log');
    if (!l) {
      /* first message: Prompt / Swappable content gives way to the conversation */
      win.__aiw.variant = 'conversation';
      var content = win.querySelector('.pds-ai-chat-window__content');
      var bar = content.querySelector('.pds-ai-composer');
      Array.prototype.slice.call(content.children).forEach(function (c) { if (c !== bar) c.remove(); });
      l = document.createElement('div');
      l.className = 'pds-ai-chat-window__log';
      l.setAttribute('role', 'log'); l.setAttribute('aria-label', 'Conversation'); l.setAttribute('aria-live', 'polite');
      content.insertBefore(l, bar);
      win.classList.remove('pds-ai-chat-window--prompt', 'pds-ai-chat-window--swappable');
      win.classList.add('pds-ai-chat-window--conversation');
    }
    return l;
  }

  function addMessage(win, m) {
    var l = log(win);
    l.querySelectorAll('.pds-ai-chat-window__msg--loading, .pds-ai-bubble--loading').forEach(function (n) { if (m.from !== 'loading') n.remove(); });
    var node = message(win.__aiw.theme, m);
    l.appendChild(node);
    l.scrollTop = l.scrollHeight;
    return node;
  }

  function now() {
    var d = new Date(), h = d.getHours(), mm = String(d.getMinutes()).padStart(2, '0');
    return (h % 12 || 12) + ':' + mm + ' ' + (h < 12 ? 'AM' : 'PM');
  }

  function fillComposer(win, text) {
    var ta = win.querySelector('textarea.pds-ai-composer__field');
    if (!ta) return;
    ta.value = text;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    ta.focus();
  }

  function init(win) {
    if (win.__aiwInit) return win;
    win.__aiwInit = true;
    win.addEventListener('click', function (e) {
      var a = e.target.closest('[data-act]');
      if (a && win.contains(a)) { win.dispatchEvent(new CustomEvent('pds-ai-chat-window:' + a.getAttribute('data-act'), { bubbles: true })); return; }
      var s = e.target.closest('.pds-ai-suggest');
      if (s) fillComposer(win, s.textContent);
    });
    win.addEventListener('pds-ai-composer:suggest', function (e) { fillComposer(win, e.detail.text); });
    win.addEventListener('pds-ai-composer:send', function (e) {
      var st = win.__aiw;
      if (st.busy) return;
      var text = e.detail.text;
      addMessage(win, { from: 'user', text: text, time: now() });
      win.dispatchEvent(new CustomEvent('pds-ai-chat-window:send', { bubbles: true, detail: { text: text } }));
      st.busy = true;
      addMessage(win, { from: 'loading' });
      setTimeout(function () {
        var n = addMessage(win, { from: 'ai', text: st.reply, time: now() });
        n.setAttribute('data-demo', '');
        n.setAttribute('title', 'Demo reply — no AI connected');
        st.busy = false;
      }, st.delay);
    });
    return win;
  }

  window.pdsAiChatWindow = { build: build, init: init, suggestion: suggestion, addMessage: addMessage };
})();
