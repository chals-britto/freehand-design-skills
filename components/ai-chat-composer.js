/* Pando DS V1 — AI Chat composer behaviour. Requires ai-chat-composer.css + button.css,
   comment-thread.css (Typing slot).

   pdsAiComposer.build(opts) → HTMLElement
     opts.theme    'light' | 'dark'                        (default 'light')
     opts.state    'default' | 'active' | 'typing'         (Figma State; live bars follow their text)
     opts.layout   'stacked' | 'inline'                    (Chat Bar Default/Active·Light = stacked;
                                                            Active·Dark, Typing and every .Bottom Bar = inline)
     opts.legacy   true → .Bottom Bar (inline, Light placeholder #545454)
     opts.text     typed text (Active)                     (default Figma "Text to be typed or entered")
     opts.placeholder                                      (default Figma "Search here")
     opts.sendOrange  true → .send Active·Light main colour (#FE6505) instead of the Chat Bar blue
     opts.live     true → textarea; wired by init()
     opts.label    accessible name of the field           (default "Message")
   pdsAiComposer.init(root) — typing grows the field, send enables when there is text,
     Enter sends, Shift+Enter adds a new line, + fires 'pds-ai-composer:add'.
     Sending fires 'pds-ai-composer:send' on the root with detail { text }, then clears.
   pdsAiComposer.setTyping(root, on, node?) — Typing state: the field is swapped for the
     slot (node, or the Figma "Swappable Content" placeholder); send is disabled.
   pdsAiComposer.prompt(opts) → HTMLElement — the Prompt intro + "More Suggestions" cards.
     Card click fires 'pds-ai-composer:suggest' with { text } (no destination in Figma). */
(function () {
  /* Kit icons: icons/indicator-add-14.svg, icons/indicator-arrow-up-20.svg, icons/indicator-ai-20.svg, icons/refresh-line.svg */
  var ADD = '<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.49 0.41C7.44 0.17 7.24 0 7 0C6.72 0 6.5 0.22 6.5 0.5V6.5H0.5L0.41 6.50C0.17 6.55 0 6.75 0 7C0 7.27 0.22 7.5 0.5 7.5H6.5V13.5L6.50 13.58C6.55 13.82 6.75 14 7 14C7.27 14 7.5 13.77 7.5 13.5V7.5H13.5L13.58 7.49C13.82 7.44 14 7.24 14 7C14 6.72 13.77 6.5 13.5 6.5H7.5V0.5L7.49 0.41Z" fill="currentColor"/></svg>';
  var UP = '<svg class="pds-button__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.76 2.56C9.96 2.36 10.27 2.36 10.47 2.56L17.47 9.56C17.66 9.75 17.66 10.07 17.47 10.26C17.27 10.46 16.96 10.46 16.76 10.26L10.62 4.12V16.91C10.62 17.19 10.39 17.41 10.12 17.41C9.84 17.41 9.62 17.19 9.62 16.91V4.12L3.47 10.26C3.27 10.46 2.96 10.46 2.76 10.26C2.57 10.07 2.57 9.75 2.76 9.56L9.76 2.56Z" fill="currentColor"/></svg>';
  var REFRESH = '<svg class="pds-comment-thread__slot-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path d="M4.55 3.69C6.06 2.38 8.00 1.66 10 1.67C14.60 1.67 18.33 5.40 18.33 10C18.33 11.78 17.77 13.43 16.82 14.78L14.17 10H16.67C16.67 8.69 16.28 7.41 15.56 6.32C14.84 5.23 13.82 4.38 12.61 3.87C11.41 3.35 10.09 3.21 8.80 3.44C7.51 3.68 6.33 4.28 5.38 5.19L4.55 3.69ZM15.45 16.31C13.94 17.62 12.00 18.34 10 18.33C5.40 18.33 1.67 14.60 1.67 10C1.67 8.22 2.23 6.57 3.17 5.22L5.83 10H3.33C3.33 11.31 3.72 12.59 4.44 13.68C5.16 14.77 6.18 15.62 7.39 16.13C8.59 16.65 9.91 16.79 11.2 16.56C12.49 16.32 13.67 15.72 14.62 14.81L15.45 16.31Z" fill="currentColor"/></svg>';
  var AI = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.30 4.77C6.48 4.06 7.48 4.06 7.66 4.77L8.61 8.50C8.77 9.15 8.84 9.37 8.94 9.55C9.05 9.72 9.19 9.87 9.35 9.98C9.52 10.10 9.74 10.18 10.37 10.39L13.46 11.42C14.13 11.64 14.13 12.59 13.46 12.82L10.37 13.84C9.74 14.05 9.52 14.13 9.35 14.25C9.19 14.37 9.05 14.52 8.94 14.69C8.84 14.87 8.77 15.09 8.61 15.74L7.66 19.47C7.48 20.17 6.48 20.17 6.30 19.47L5.35 15.74C5.19 15.09 5.12 14.87 5.01 14.69C4.91 14.52 4.77 14.37 4.61 14.25C4.44 14.13 4.22 14.05 3.58 13.84L0.50 12.82C-0.16 12.59 -0.16 11.64 0.50 11.42L3.58 10.39C4.22 10.18 4.44 10.10 4.61 9.98C4.77 9.87 4.91 9.72 5.01 9.55C5.12 9.37 5.19 9.15 5.35 8.50L6.30 4.77ZM6.98 6.15L6.32 8.74C6.31 8.77 6.31 8.79 6.30 8.82C6.16 9.36 6.07 9.74 5.87 10.07C5.69 10.35 5.46 10.60 5.19 10.80C4.88 11.02 4.51 11.14 3.97 11.32C3.95 11.33 3.92 11.33 3.90 11.34L1.57 12.12L3.90 12.89C3.92 12.90 3.95 12.91 3.97 12.92C4.51 13.09 4.88 13.22 5.19 13.44C5.46 13.63 5.69 13.88 5.87 14.17C6.07 14.49 6.16 14.87 6.30 15.42C6.31 15.44 6.31 15.47 6.32 15.49L6.98 18.09L7.64 15.49C7.65 15.47 7.65 15.44 7.66 15.42C7.80 14.87 7.89 14.49 8.09 14.17C8.27 13.88 8.50 13.63 8.77 13.44C9.08 13.22 9.45 13.09 9.99 12.92C10.01 12.91 10.04 12.90 10.06 12.89L12.39 12.12L10.06 11.34C10.04 11.33 10.01 11.33 9.99 11.32C9.45 11.14 9.08 11.02 8.77 10.80C8.50 10.60 8.27 10.35 8.09 10.07C7.89 9.74 7.80 9.36 7.66 8.82C7.65 8.79 7.65 8.77 7.64 8.74L6.98 6.15Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.97 0.45C15.14 -0.15 15.99 -0.15 16.17 0.45L16.53 1.68C16.70 2.28 16.77 2.49 16.87 2.65C16.99 2.84 17.15 3.00 17.34 3.12C17.50 3.22 17.71 3.29 18.31 3.46L19.54 3.82C20.15 4.00 20.15 4.85 19.54 5.02L18.31 5.38C17.71 5.56 17.50 5.62 17.34 5.73C17.15 5.84 16.99 6.00 16.87 6.19C16.77 6.36 16.70 6.56 16.53 7.17L16.17 8.40C15.99 9.00 15.14 9.00 14.97 8.40L14.61 7.17C14.43 6.56 14.37 6.36 14.26 6.19C14.15 6.00 13.99 5.84 13.80 5.73C13.63 5.62 13.43 5.56 12.82 5.38L11.59 5.02C10.99 4.85 10.99 4.00 11.59 3.82L12.82 3.46C13.43 3.29 13.63 3.22 13.80 3.12C13.99 3.00 14.15 2.84 14.26 2.65C14.37 2.49 14.43 2.28 14.61 1.68L14.97 0.45ZM15.57 1.97C15.56 1.99 15.55 2.01 15.55 2.03C15.40 2.54 15.30 2.89 15.11 3.19C14.91 3.50 14.65 3.77 14.33 3.97C14.03 4.16 13.68 4.26 13.17 4.41C13.15 4.41 13.13 4.42 13.11 4.42C13.13 4.43 13.15 4.44 13.17 4.44C13.68 4.59 14.03 4.69 14.33 4.88C14.65 5.08 14.91 5.34 15.11 5.66C15.30 5.96 15.40 6.31 15.55 6.82C15.55 6.84 15.56 6.86 15.57 6.88C15.57 6.86 15.58 6.84 15.58 6.82C15.73 6.31 15.83 5.96 16.02 5.66C16.22 5.34 16.49 5.08 16.80 4.88C17.10 4.69 17.45 4.59 17.96 4.44C17.98 4.44 18.00 4.43 18.02 4.42C18.00 4.42 17.98 4.41 17.96 4.41C17.45 4.26 17.10 4.16 16.80 3.97C16.49 3.77 16.22 3.50 16.02 3.19C15.83 2.89 15.73 2.54 15.58 2.03C15.58 2.01 15.57 1.99 15.57 1.97Z" fill="currentColor"/></svg>';

  var SAMPLE = 'Text to be typed or entered';
  var PLACEHOLDER = 'Search here';
  var SLOT = '<div class="pds-comment-thread__slot pds-ai-composer__slot"><span class="pds-comment-thread__slot-title">' + REFRESH + 'Swappable Content</span></div>';
  var PROMPT = {
    intro: 'Ask Pando AI about your Procurement needs or pick a task from the calendar',
    label: 'More Suggestions:',
    cards: [
      'Create a Procurement event for a set of lanes that are expiring over the next 4 weeks',
      'Summarize the allocation and awarding of the last run event',
      'Suggest alternates based on Market rates and Volume forecasts for a lane'
    ]
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build(o) {
    o = o || {};
    var dark = o.theme === 'dark';
    var state = o.state || 'default';
    var inline = o.legacy || o.layout === 'inline' || (!o.layout && !o.live && (state === 'typing' || (dark && state === 'active')));
    var active = state === 'active';
    var root = document.createElement('div');
    root.className = 'pds-ai-composer' + (dark ? ' pds-ai-composer--dark' : '') + (inline ? ' pds-ai-composer--inline' : '') + (o.legacy ? ' pds-ai-composer--legacy' : '') + (state === 'typing' ? ' is-typing' : '');
    if (o.live) root.setAttribute('data-live', '');

    var field;
    if (state === 'typing') field = SLOT;
    else if (o.live) field = '<textarea class="pds-ai-composer__field" rows="1" placeholder="' + esc(o.placeholder || PLACEHOLDER) + '" aria-label="' + esc(o.label || 'Message') + '">' + esc(o.text || '') + '</textarea>';
    else field = active
      ? '<span class="pds-ai-composer__field">' + esc(o.text || SAMPLE) + '</span>'
      : '<span class="pds-ai-composer__field pds-ai-composer__field--ph">' + esc(o.placeholder || PLACEHOLDER) + '</span>';

    var add = '<button type="button" class="pds-ai-composer__add" aria-label="Add">' + ADD + '</button><span class="pds-ai-composer__divider" aria-hidden="true"></span>';
    var sendOn = active || (o.live && o.text && o.text.trim());
    var send = '<button type="button" class="pds-button pds-button--icon pds-ai-composer__send' + (dark ? ' pds-ai-composer__send--dark' : '') + (o.sendOrange ? ' pds-ai-composer__send--orange' : '') + (sendOn ? ' is-active' : '') + '" aria-label="Send"' + (sendOn ? '' : ' disabled') + '>' + UP + '</button>';

    root.innerHTML = inline
      ? '<div class="pds-ai-composer__inputs">' + add + field + '</div>' + send
      : '<div class="pds-ai-composer__inputs">' + field + '</div><div class="pds-ai-composer__actions"><div class="pds-ai-composer__left">' + add + '</div>' + send + '</div>';
    if (o.live) init(root);
    return root;
  }

  function grow(ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }

  function sync(root) {
    var ta = root.querySelector('textarea.pds-ai-composer__field');
    var btn = root.querySelector('.pds-ai-composer__send');
    var on = !!(ta && ta.value.trim()) && !root.classList.contains('is-typing');
    btn.disabled = !on;
    btn.classList.toggle('is-active', on);
    root.classList.toggle('is-active', on);
  }

  function send(root) {
    var ta = root.querySelector('textarea.pds-ai-composer__field');
    if (!ta || root.classList.contains('is-typing')) return;
    var text = ta.value.trim();
    if (!text) return;
    root.dispatchEvent(new CustomEvent('pds-ai-composer:send', { bubbles: true, detail: { text: text } }));
    ta.value = '';
    grow(ta); sync(root); ta.focus();
  }

  function init(root) {
    if (root.__pdsAiComposer) return root;
    root.__pdsAiComposer = true;
    root.addEventListener('input', function (e) {
      if (e.target.matches('textarea.pds-ai-composer__field')) { grow(e.target); sync(root); }
    });
    root.addEventListener('keydown', function (e) {
      if (!e.target.matches('textarea.pds-ai-composer__field')) return;
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(root); }
    });
    root.addEventListener('click', function (e) {
      if (e.target.closest('.pds-ai-composer__send')) send(root);
      else if (e.target.closest('.pds-ai-composer__add')) root.dispatchEvent(new CustomEvent('pds-ai-composer:add', { bubbles: true }));
    });
    var ta = root.querySelector('textarea.pds-ai-composer__field');
    if (ta) grow(ta);
    sync(root);
    return root;
  }

  /* Typing: Figma swaps the field for .typing dark/.Swappable Content and lays the bar out in one row. */
  function setTyping(root, on, node) {
    var ta = root.querySelector('textarea.pds-ai-composer__field');
    var inputs = root.querySelector('.pds-ai-composer__inputs');
    var old = root.querySelector('.pds-ai-composer__slot');
    if (on) {
      if (old) old.remove();
      var slot;
      if (node) { slot = document.createElement('div'); slot.className = 'pds-ai-composer__slot'; slot.appendChild(node); }
      else { var t = document.createElement('div'); t.innerHTML = SLOT; slot = t.firstChild; }
      root.classList.add('is-typing', 'pds-ai-composer--inline');
      if (ta) ta.hidden = true;
      /* one row: add · divider · slot · send */
      var left = root.querySelector('.pds-ai-composer__left');
      if (left) { while (left.firstChild) inputs.insertBefore(left.firstChild, inputs.firstChild); root.querySelector('.pds-ai-composer__actions').hidden = true; root.appendChild(root.querySelector('.pds-ai-composer__send')); }
      inputs.appendChild(slot);
    } else {
      if (old) old.remove();
      root.classList.remove('is-typing');
      if (ta) ta.hidden = false;
      var actions = root.querySelector('.pds-ai-composer__actions');
      if (actions) {
        var l = actions.querySelector('.pds-ai-composer__left');
        inputs.querySelectorAll('.pds-ai-composer__add, .pds-ai-composer__divider').forEach(function (n) { l.appendChild(n); });
        actions.appendChild(root.querySelector('.pds-ai-composer__send'));
        actions.hidden = false;
        root.classList.remove('pds-ai-composer--inline');
      }
    }
    sync(root);
  }

  function prompt(o) {
    o = o || {};
    var p = document.createElement('div');
    p.className = 'pds-ai-composer-prompt';
    var cards = (o.cards || PROMPT.cards).map(function (c) { return '<li><button type="button" class="pds-ai-composer__card">' + esc(c) + '</button></li>'; }).join('');
    p.innerHTML = '<div class="pds-ai-composer-prompt__inner"><p class="pds-ai-composer-prompt__intro"><span class="pds-ai-composer-prompt__icon">' + AI + '</span>' + esc(o.intro || PROMPT.intro) + '</p><p class="pds-ai-composer-prompt__label">' + esc(o.label || PROMPT.label) + '</p><ul class="pds-ai-composer-prompt__cards">' + cards + '</ul></div>';
    p.addEventListener('click', function (e) {
      var c = e.target.closest('.pds-ai-composer__card');
      if (c) p.dispatchEvent(new CustomEvent('pds-ai-composer:suggest', { bubbles: true, detail: { text: c.textContent } }));
    });
    return p;
  }

  window.pdsAiComposer = { build: build, init: init, setTyping: setTyping, prompt: prompt };
})();
