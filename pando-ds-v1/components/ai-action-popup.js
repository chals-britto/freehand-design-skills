/* Pando DS V1 — AI Action popup, AI input, options. Requires ai-action-popup.css plus the kit:
   radio.css, button.css, button-group.css, input.css, ai-chat-composer.css + ai-chat-composer.js.

   pdsAiPopup.popup(opts) → HTMLElement   (Action - popup)
     type        'default' (summary of changes) | 'option' (pick one)
     heading     Figma sample by type
     summary     [[label, from, to], …]          (Type=Default)
     options     ['…', …]  selected  index (default 0; -1 = none)   (Type=Option)
     placeholder "Something else in mind"   footer  false hides the disclaimer
   pdsAiPopup.option(opts) → HTMLElement   (.Option)
     text, state 'default' | 'hover', radio true (popup use), checked, name, value
   pdsAiPopup.inputText(opts) → HTMLElement   (.Input - Text)
     placeholder, state 'default' | 'hover' (static Hover shows the Cursor/Typing caret)
   pdsAiPopup.input(opts) → HTMLElement   (.Input — prompt bar built with pdsAiComposer)
     variant 'default' | 'skipped' | 'tagged'
     chip { icon: 'impact' | 'details', text }    hint, link (Skipped)   tag { label, value } (Tagged)
     placeholder "Ask Freehand"
   pdsAiPopup.responding(opts) → HTMLElement   (.Responding_Text animation)
     frame 1–4 (static Figma frame) or live true (CSS loop; reduced motion holds frame 1)
   pdsAiPopup.bind(root) — wires every popup / input inside root (idempotent):
     picking an option clears the text field; typing in the field clears the option;
     Enter in the field = Confirm. Events (bubble):
       pds-ai-popup:select  { value }          pds-ai-popup:confirm { option, text }
       pds-ai-popup:skip                         pds-ai-input:chip { text }
       pds-ai-input:suggest  (Skipped link)      pds-ai-input:untag (Tagged ×, removes the tag)
     The bar's own events come from ai-chat-composer (pds-ai-composer:send / :add).
   Behaviour beyond .Option hover is added in review — Figma has no other reactions. */
(function () {
  /* Kit icons (components/icons/): indicator-edit-14, nav-filter-arrow, indicator-impact-14,
     indicator-details-14, nav-close-tag. Read from the manifest when it is loaded. */
  function icon(name) {
    var list = window.PDS_ICONS || [];
    for (var i = 0; i < list.length; i++) if (list[i].n === name) return list[i].svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
    return '';
  }
  /* Same vector as the kit Button spinner (button.js); Figma uses a 32 px GIF scaled to 12. */
  var SPINNER = '<svg class="pds-button__spinner" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
    '<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/>' +
    '<path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  var SAMPLE = {
    headingDefault: 'Confirm changes to update in 18 invoices.',
    headingOption: 'I found a few possible interpretations : Are you looking for ',
    summary: [['Payment due date :', 'Multiple', '25 Aug 2025'], ['Classification of goods :', 'NA', 'General Cargo(Non DG)']],
    options: ['Overdue invoices (unpaid past due date)', "Pending shipments that haven't been delivered on time", 'Items with overdue contract renewals'],
    option: 'Review Invoice level',
    other: 'Something else in mind',
    footer: 'Freehand can make mistakes. Please double-check responses.',
    ask: 'Ask Freehand',
    chip: 'Action', chipTagged: 'Insights',
    hint: 'Type a prompt to continue the follow-up action',
    link: 'Or Show freehand suggested actions',
    tag: ['Context : ', 'Tariff Name Mismatch'],
    responding: 'Processing'
  };
  var uid = 0;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  function optionHTML(o) {
    var hover = o.state === 'hover' ? ' is-hover' : '';
    if (o.radio) {
      return '<label class="pds-radio pds-ai-option pds-ai-option--radio' + hover + '">' +
        '<input type="radio" class="pds-radio__input" name="' + esc(o.name || 'pds-ai-opt') + '" value="' + esc(o.value != null ? o.value : o.text) + '"' + (o.checked ? ' checked' : '') + '>' +
        '<span class="pds-ai-option__text">' + esc(o.text) + '</span>' +
        '<span class="pds-ai-option__arrow" aria-hidden="true">' + icon('nav-filter-arrow') + '</span></label>';
    }
    return '<div class="pds-ai-option' + hover + '"><span class="pds-ai-option__text">' + esc(o.text || SAMPLE.option) + '</span>' +
      '<span class="pds-ai-option__arrow" aria-hidden="true">' + icon('nav-filter-arrow') + '</span></div>';
  }
  function option(o) { return el(optionHTML(o || {})); }

  function inputTextHTML(o) {
    o = o || {};
    var ph = o.placeholder || SAMPLE.other;
    return '<div class="pds-input pds-ai-input-text' + (o.state === 'hover' ? ' is-hover' : '') + '">' +
      '<label class="pds-input__box"><span class="pds-input__row"><span class="pds-input__icon">' + icon('indicator-edit-14') + '</span>' +
      '<input type="text" class="pds-input__control" placeholder="' + esc(ph) + '" aria-label="' + esc(o.label || ph) + '"></span>' +
      '<span class="pds-ai-input-text__caret" aria-hidden="true"></span></label></div>';
  }
  function inputText(o) { return el(inputTextHTML(o)); }

  function popup(o) {
    o = o || {};
    var isOpt = o.type === 'option';
    var id = 'pds-ai-popup-' + (++uid);
    var body;
    if (isOpt) {
      var sel = o.selected == null ? 0 : o.selected;
      body = '<fieldset class="pds-ai-popup__options"><legend class="pds-ai-popup__legend">' + esc(o.heading || SAMPLE.headingOption) + '</legend>' +
        (o.options || SAMPLE.options).map(function (t, i) { return optionHTML({ text: t, radio: true, checked: i === sel, name: id }); }).join('') + '</fieldset>';
    } else {
      body = '<ul class="pds-ai-popup__summary">' + (o.summary || SAMPLE.summary).map(function (r) {
        return '<li><span class="pds-ai-popup__label">' + esc(r[0]) + '</span> <span class="pds-ai-popup__from">' + esc(r[1]) + '</span> → <span class="pds-ai-popup__to">' + esc(r[2]) + '</span></li>';
      }).join('') + '</ul>';
    }
    var root = el('<section class="pds-ai-popup' + (isOpt ? ' pds-ai-popup--option' : '') + '" aria-labelledby="' + id + '-h">' +
      '<div class="pds-ai-popup__card">' +
        '<div class="pds-ai-popup__header"><h3 class="pds-ai-popup__heading" id="' + id + '-h">' + esc(o.heading || (isOpt ? SAMPLE.headingOption : SAMPLE.headingDefault)) + '</h3></div>' +
        '<div class="pds-ai-popup__body">' + body + inputTextHTML({ placeholder: o.placeholder }) + '</div>' +
        '<div class="pds-button-group pds-ai-popup__actions">' +
          '<button type="button" class="pds-button pds-button--secondary pds-ai-popup__skip"><span>Skip</span></button>' +
          '<button type="button" class="pds-button pds-ai-popup__confirm"><span>Confirm</span></button>' +
        '</div>' +
      '</div>' +
      (o.footer === false ? '' : '<p class="pds-ai-popup__footer">' + esc(SAMPLE.footer) + '</p>') +
    '</section>');
    return root;
  }

  function input(o) {
    o = o || {};
    var v = o.variant || 'default';
    if (!window.pdsAiComposer) throw new Error('pdsAiPopup.input needs ai-chat-composer.js');
    var bar = window.pdsAiComposer.build({ live: o.live !== false, placeholder: o.placeholder || SAMPLE.ask, label: o.label || SAMPLE.ask, sendOrange: true });
    var chip = o.chip || (v === 'tagged' ? { icon: 'details', text: SAMPLE.chipTagged } : { icon: 'impact', text: SAMPLE.chip });
    var left = bar.querySelector('.pds-ai-composer__left');
    left.insertBefore(el('<button type="button" class="pds-ai-input__chip">' + icon('indicator-' + chip.icon + '-14') + '<span>' + esc(chip.text) + '</span></button>'), left.firstChild);
    var root = el('<div class="pds-ai-input' + (v !== 'default' ? ' pds-ai-input--' + v : '') + '"></div>');
    if (v === 'skipped') {
      root.appendChild(el('<div class="pds-ai-input__float"><div class="pds-ai-input__float-inner"><p class="pds-ai-input__hint">' + esc(o.hint || SAMPLE.hint) + '</p>' +
        '<button type="button" class="pds-ai-input__link">' + esc(o.link || SAMPLE.link) + icon('nav-filter-arrow') + '</button></div></div>'));
    }
    if (v === 'tagged') {
      var t = o.tag || { label: SAMPLE.tag[0], value: SAMPLE.tag[1] };
      root.appendChild(el('<div class="pds-ai-input__tag"><div class="pds-ai-input__tag-inner"><p class="pds-ai-input__tag-text">' + esc(t.label) + '<b>' + esc(t.value) + '</b></p>' +
        '<button type="button" class="pds-ai-input__tag-close" aria-label="Remove context">' + icon('nav-close-tag') + '</button></div></div>'));
    }
    var wrap = el('<div class="pds-ai-input__chat"></div>');
    wrap.appendChild(bar);
    wrap.appendChild(el('<p class="pds-ai-input__footer">' + esc(SAMPLE.footer) + '</p>'));
    root.appendChild(wrap);
    return root;
  }

  function responding(o) {
    o = o || {};
    var cls = o.live ? ' pds-ai-popup-responding--live' : ' pds-ai-popup-responding--f' + (o.frame || 1);
    return el('<span class="pds-ai-popup-responding' + cls + '" role="status">' +
      '<span class="pds-ai-popup-responding__spinner">' + SPINNER + '</span>' +
      '<span class="pds-ai-popup-responding__text">' + esc(o.text || SAMPLE.responding) + '</span>' +
      '<span class="pds-ai-popup-responding__dots" aria-hidden="true">...</span></span>');
  }

  function fire(node, name, detail) { node.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail || {} })); }

  function bindPopup(p) {
    if (p.__pdsAiPopup) return; p.__pdsAiPopup = true;
    var field = p.querySelector('.pds-ai-input-text .pds-input__control');
    p.addEventListener('change', function (e) {
      if (!e.target.matches('.pds-radio__input')) return;
      if (field) field.value = '';
      fire(p, 'pds-ai-popup:select', { value: e.target.value });
    });
    if (field) {
      field.addEventListener('input', function () {
        if (!field.value) return;
        p.querySelectorAll('.pds-radio__input:checked').forEach(function (r) { r.checked = false; });
      });
      field.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); confirm(); } });
    }
    function confirm() {
      var r = p.querySelector('.pds-radio__input:checked');
      fire(p, 'pds-ai-popup:confirm', { option: r ? r.value : null, text: field ? field.value.trim() : '' });
    }
    p.addEventListener('click', function (e) {
      if (e.target.closest('.pds-ai-popup__confirm')) confirm();
      else if (e.target.closest('.pds-ai-popup__skip')) fire(p, 'pds-ai-popup:skip');
    });
  }

  function bindInput(n) {
    if (n.__pdsAiInput) return; n.__pdsAiInput = true;
    var bar = n.querySelector('.pds-ai-composer[data-live]');
    if (bar && window.pdsAiComposer) window.pdsAiComposer.init(bar);
    n.addEventListener('click', function (e) {
      var c = e.target.closest('.pds-ai-input__chip');
      if (c) { fire(n, 'pds-ai-input:chip', { text: c.textContent.trim() }); return; }
      if (e.target.closest('.pds-ai-input__link')) { fire(n, 'pds-ai-input:suggest'); return; }
      if (e.target.closest('.pds-ai-input__tag-close')) {
        var tag = n.querySelector('.pds-ai-input__tag');
        if (tag) tag.remove();
        n.classList.remove('pds-ai-input--tagged');
        fire(n, 'pds-ai-input:untag');
        var ta = n.querySelector('.pds-ai-composer__field'); if (ta) ta.focus();
      }
    });
  }

  function bind(root) {
    root = root || document;
    root.querySelectorAll('.pds-ai-popup').forEach(bindPopup);
    root.querySelectorAll('.pds-ai-input').forEach(bindInput);
    return root;
  }

  window.pdsAiPopup = { popup: popup, option: option, inputText: inputText, input: input, responding: responding, bind: bind, SAMPLE: SAMPLE };
})();
