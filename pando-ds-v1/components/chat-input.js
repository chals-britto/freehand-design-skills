/* Pando DS V1 — Chat Input Box behaviour. Requires chat-input.css and the atoms it links.
   Figma .documentation (2305:4671): Send button enables once the box has text or an
   attachment · Enter sends · Shift+Enter adds a new line.

   pdsChatInput.build(opts) → HTMLElement
     opts.theme       'light' | 'dark'                     (default 'light')
     opts.state       'empty' | 'filled'                   (static only; live boxes follow their content)
     opts.tag         'no' | 'yes' | 'edit'                (Figma Tag variant)
     opts.text        typed text (Filled)                  (default: Figma sample text)
     opts.tagText     committed tag text                   (default 'Text Input')
     opts.showAttachment  clip icon                        (default true, as Figma)
     opts.files       [names] attached file tags            (Figma "Show Attached File")
     opts.live        true → editable; wired by init()
   pdsChatInput.init(root) — wires a live box: typing grows the box, Enter sends,
     Shift+Enter new line, # Add Tag → type a tag → Enter, clip opens the file picker,
     attached file tags removable with ×. Fires 'pds-chat-input:send' on the root with
     detail { text, tag, files } and then clears the box. */
(function () {
  var CLIP = '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M8.14 1C7.37 1 6.66 1.28 6.12 1.79C5.58 2.31 5.28 2.99 5.28 3.72V8.63C5.28 9.53 6.05 10.27 7.00 10.27C7.94 10.27 8.71 9.53 8.71 8.63V5.80C8.71 5.50 8.45 5.25 8.14 5.25C7.82 5.25 7.57 5.50 7.57 5.80V8.63C7.57 8.93 7.31 9.18 7.00 9.18C6.68 9.18 6.42 8.93 6.42 8.63V3.72C6.42 3.29 6.60 2.87 6.93 2.57C7.250 2.26 7.68 2.09 8.14 2.09C9.08 2.09 9.85 2.82 9.85 3.72V9.18C9.85 10.68 8.57 11.90 7.00 11.90C6.23 11.90 5.51 11.62 4.97 11.11C4.44 10.59 4.14 9.91 4.14 9.18L4.14 3.72C4.14 3.42 3.88 3.18 3.57 3.18C3.25 3.18 3 3.42 3 3.72L3.00 9.18C3.00 10.20 3.41 11.16 4.17 11.88C4.92 12.60 5.930 13 7.00 13C9.20 13 10.99 11.28 11 9.18V3.72C11 2.22 9.71 1 8.14 1Z" fill="currentColor"/></svg>';
  /* Same caret and × the Tag atom page uses (tag.html) */
  var CARET = '<svg class="pds-tag__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M7.5 1.20834L6.75041 0.5L4 3.10005L1.24907 0.500985L0.5 1.20834L3.62547 4.16183L4 4.5L4.37453 4.16183L7.5 1.20834Z"/></svg>';
  var XPATH = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M9.88911 2.1109C9.69385 1.91564 9.37727 1.91564 9.18201 2.1109L6.00001 5.29289L2.81803 2.11091L2.74878 2.05305C2.55391 1.91806 2.28449 1.93734 2.11092 2.11091C1.91566 2.30617 1.91566 2.62275 2.11092 2.81802L5.29291 6L2.11094 9.18197L2.05308 9.25122C1.91809 9.44608 1.93737 9.71551 2.11094 9.88908C2.3062 10.0843 2.62278 10.0843 2.81805 9.88908L6.00001 6.70711L9.18199 9.88908L9.25124 9.94694C9.44611 10.0819 9.71553 10.0626 9.8891 9.88908C10.0844 9.69382 10.0844 9.37724 9.8891 9.18198L6.70712 6L9.88911 2.81801L9.94697 2.74876C10.082 2.55389 10.0627 2.28447 9.88911 2.1109Z"/></svg>';
  var PDF = '<svg class="pds-tag__file-icon" viewBox="0 0 10 12" aria-hidden="true"><path d="M1.38339 0C0.996092 0 0.679214 0.330655 0.679214 0.734789V11.0218C0.679214 11.426 0.996092 11.7566 1.38339 11.7566H8.42512C8.81241 11.7566 9.12929 11.426 9.12929 11.0218V2.93916L6.3126 0H1.38339Z" fill="#E2E5E7"/><path d="M7.01678 2.93916H9.1293L6.31261 0V2.20437C6.31261 2.6085 6.62948 2.93916 7.01678 2.93916Z" fill="#B0B7BD"/><path d="M9.85842 8.97225C9.85842 9.20636 9.67358 9.39791 9.44766 9.39791H0.410768C0.184845 9.39791 0 9.20636 0 8.97225V4.71569C0 4.48158 0.184845 4.29004 0.410768 4.29004H9.44766C9.67358 4.29004 9.85842 4.48158 9.85842 4.71569V8.97225Z" fill="#F15642"/><rect x="0.704178" y="9.39792" width="8.45008" height="0.26087" fill="#B5C3CB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.49522 8.11911C7.51388 8.13859 7.53655 8.14833 7.56322 8.14833H7.89522C7.92455 8.14833 7.94788 8.13859 7.96522 8.11911C7.98255 8.09963 7.99122 8.07598 7.99122 8.04815V6.4245H8.49122C8.51788 6.4245 8.54055 6.41476 8.55922 6.39528C8.57788 6.37581 8.58722 6.35215 8.58722 6.32433V6.07807C8.58722 6.05024 8.57788 6.02659 8.55922 6.00711C8.54055 5.98763 8.51788 5.97789 8.49122 5.97789H7.99122V5.83181C7.99122 5.7205 8.01255 5.63841 8.05522 5.58554C8.09788 5.53267 8.17122 5.50624 8.27522 5.50624H8.53122C8.55788 5.50624 8.58055 5.4965 8.59922 5.47702C8.61788 5.45754 8.62722 5.43389 8.62722 5.40607V5.15981C8.62722 5.13198 8.61788 5.10833 8.59922 5.08885C8.58055 5.06937 8.55788 5.05963 8.53122 5.05963H8.25522C7.99122 5.05963 7.79388 5.12154 7.66322 5.24537C7.53255 5.3692 7.46722 5.55772 7.46722 5.81094V5.97789H7.14322C7.11655 5.97789 7.09388 5.98763 7.07522 6.00711C7.05655 6.02659 7.04722 6.05024 7.04722 6.07807V6.32433C7.04722 6.35215 7.05655 6.37581 7.07522 6.39528C7.09388 6.41476 7.11655 6.4245 7.14322 6.4245H7.46722V8.04815C7.46722 8.07598 7.47655 8.09963 7.49522 8.11911ZM4.93922 7.92085C5.08322 8.10033 5.28988 8.19007 5.55922 8.19007C5.83655 8.19007 6.04855 8.09128 6.19522 7.89372V8.04815C6.19522 8.07598 6.20455 8.09963 6.22322 8.11911C6.24188 8.13859 6.26455 8.14833 6.29122 8.14833H6.61522C6.64455 8.14833 6.66788 8.13859 6.68522 8.11911C6.70255 8.09963 6.71122 8.07598 6.71122 8.04815V5.28502C6.71122 5.25441 6.70255 5.23007 6.68522 5.21198C6.66788 5.19389 6.64455 5.18485 6.61522 5.18485H6.26722C6.24055 5.18485 6.21788 5.19389 6.19922 5.21198C6.18055 5.23007 6.17122 5.25441 6.17122 5.28502V6.21163C6.01922 6.02798 5.81522 5.93615 5.55922 5.93615C5.28988 5.93615 5.08255 6.02728 4.93722 6.20954C4.79188 6.39181 4.71388 6.63041 4.70322 6.92537L4.69922 7.06311L4.70322 7.20085C4.71655 7.50137 4.79522 7.74137 4.93922 7.92085ZM2.36322 8.91424C2.38188 8.93233 2.40455 8.94137 2.43122 8.94137H2.77922C2.80855 8.94137 2.83188 8.93233 2.84922 8.91424C2.86655 8.89615 2.87522 8.87181 2.87522 8.8412V7.89372C3.01655 8.09128 3.22055 8.19007 3.48722 8.19007C3.75655 8.19007 3.96388 8.10033 4.10922 7.92085C4.25455 7.74137 4.33122 7.50555 4.33922 7.21337C4.34188 7.17998 4.34322 7.12989 4.34322 7.06311C4.34322 6.99633 4.34188 6.94624 4.33922 6.91285C4.32855 6.61511 4.25122 6.37789 4.10722 6.2012C3.96322 6.0245 3.75655 5.93615 3.48722 5.93615C3.20455 5.93615 2.99255 6.03911 2.85122 6.24502V6.07807C2.85122 6.05024 2.84188 6.02659 2.82322 6.00711C2.80455 5.98763 2.78055 5.97789 2.75122 5.97789H2.43122C2.40455 5.97789 2.38188 5.98694 2.36322 6.00502C2.34455 6.02311 2.33522 6.04746 2.33522 6.07807V8.8412C2.33522 8.87181 2.34455 8.89615 2.36322 8.91424ZM1.25922 8.11911C1.27788 8.13859 1.30055 8.14833 1.32722 8.14833H1.73122C1.76055 8.14833 1.78388 8.13859 1.80122 8.11911C1.81855 8.09963 1.82722 8.07598 1.82722 8.04815V7.62659C1.82722 7.59876 1.81788 7.57511 1.79922 7.55563C1.78055 7.53615 1.75788 7.52641 1.73122 7.52641H1.32722C1.30055 7.52641 1.27788 7.53615 1.25922 7.55563C1.24055 7.57511 1.23122 7.59876 1.23122 7.62659V8.04815C1.23122 8.07598 1.24055 8.09963 1.25922 8.11911ZM3.33522 7.73928C3.62055 7.73928 3.77255 7.55563 3.79122 7.18833C3.79388 7.1605 3.79522 7.11876 3.79522 7.06311C3.79522 7.00746 3.79388 6.96572 3.79122 6.93789C3.77255 6.57059 3.62055 6.38694 3.33522 6.38694C3.18322 6.38694 3.06988 6.43841 2.99522 6.54137C2.92055 6.64433 2.88055 6.76954 2.87522 6.91702C2.87255 6.95041 2.87122 7.00328 2.87122 7.07563C2.87122 7.14798 2.87255 7.20224 2.87522 7.23841C2.88055 7.37755 2.92188 7.4958 2.99922 7.5932C3.07655 7.69059 3.18855 7.73928 3.33522 7.73928ZM5.71122 7.73928C5.86322 7.73928 5.97588 7.6885 6.04922 7.58694C6.12255 7.48537 6.16322 7.35946 6.17122 7.2092C6.17388 7.17581 6.17522 7.12294 6.17522 7.05059C6.17522 6.97546 6.17388 6.9212 6.17122 6.88781C6.16588 6.74867 6.12455 6.63041 6.04722 6.53302C5.96988 6.43563 5.85788 6.38694 5.71122 6.38694C5.42588 6.38694 5.27388 6.57059 5.25522 6.93789L5.25122 7.06311L5.25522 7.18833C5.27388 7.55563 5.42588 7.73928 5.71122 7.73928Z" fill="#fff"/></svg>';
  var SAMPLE = {
    plain: 'Logtech ipsum, fficiency augmented reality advanced ocean eBooking. Machine learning agile freight unprecedented X-as-a-Service efficiency . Tech predictive analytics . Monitor cargo trends tech KPI real-time air track and trace.',
    tagged: 'has been increased due to labours shortage and we discussed the same in telephonic conversion'
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dk(o) { return o.theme === 'dark' ? ' pds-tag--dark' : ''; }

  function addTagHTML(o, live) {
    var inner = '<span><span class="pds-tag__hash">#</span> <span class="pds-tag__add">Add Tag</span></span>' + CARET;
    return live
      ? '<button type="button" class="pds-tag pds-tag--input pds-tag--input-dropdown' + dk(o) + ' pds-chat-input__tag" aria-label="Add tag">' + inner + '</button>'
      : '<span class="pds-tag pds-tag--input pds-tag--input-dropdown' + dk(o) + ' pds-chat-input__tag">' + inner + '</span>';
  }
  function editTagHTML(o, live) {
    return '<span class="pds-tag pds-tag--input pds-tag--input-dropdown' + dk(o) + ' pds-chat-input__tag pds-chat-input__tag--edit"><span><span class="pds-tag__hash">#</span> ' +
      (live ? '<input class="pds-chat-input__tag-input" type="text" aria-label="Tag name" autocomplete="off" spellcheck="false">' : '<span class="pds-chat-input__tag-caret">|</span>') +
      '</span></span>';
  }
  function committedTagHTML(o, text) {
    return '<span class="pds-tag pds-tag--input' + dk(o) + ' pds-comment__tag" contenteditable="false" data-tag="' + esc(text) + '"><span class="pds-tag__text">' + esc(text) + '</span></span>';
  }
  function fileTagHTML(o, name, i) {
    return '<span class="pds-tag pds-tag--attachment' + dk(o) + ' pds-chat-input__file" data-index="' + i + '"><span class="pds-tag__file">' + PDF +
      '<span class="pds-tag__text">' + esc(name) + '</span></span><button type="button" class="pds-tag__remove" aria-label="Remove ' + esc(name) + '">' + XPATH + '</button></span>';
  }

  function build(opts) {
    var o = Object.assign({ theme: 'light', state: 'empty', tag: 'no', tagText: 'Text Input', showAttachment: true, files: [], live: false }, opts || {});
    var dark = o.theme === 'dark';
    var filled = o.state === 'filled';
    var cmt = 'pds-comment' + (dark ? ' pds-comment--dark' : '');
    var text = '';

    if (o.live) {
      text = (o.tag === 'yes' ? addTagHTML(o, true) : o.tag === 'edit' ? editTagHTML(o, true) : '') +
        '<div class="' + cmt + ' pds-chat-input__field" role="textbox" aria-multiline="true" aria-label="Comment" tabindex="0" contenteditable="plaintext-only" data-placeholder="' +
        (o.tag === 'no' ? 'Add comment here' : '') + '"></div>';
    } else if (filled) {
      text = o.tag === 'yes'
        ? '<p class="' + cmt + ' pds-chat-input__field">' + committedTagHTML(o, o.tagText) + esc(o.text || SAMPLE.tagged) + '</p>'
        : '<p class="' + cmt + ' pds-chat-input__field">' + esc(o.text || SAMPLE.plain) + '</p>';
    } else {
      text = o.tag === 'yes' ? addTagHTML(o, false) : o.tag === 'edit' ? editTagHTML(o, false) : '<p class="pds-chat-input__placeholder">Add comment here</p>';
    }

    var btn = 'pds-button pds-button--text pds-button--small' + (dark ? ' pds-button--dark' : '');
    var sendOn = !o.live && filled;
    var el = document.createElement('div');
    el.className = 'pds-chat-input' + (dark ? ' pds-chat-input--dark' : '');
    el.dataset.state = filled ? 'filled' : 'empty';
    el.innerHTML =
      '<div class="pds-chat-input__text">' + text + '</div>' +
      '<div class="pds-chat-input__bar">' +
        '<div class="pds-chat-input__attach">' +
          (o.showAttachment ? '<button type="button" class="pds-chat-input__clip" aria-label="Attach file"' + (o.live ? '' : ' tabindex="-1"') + '>' + CLIP + '</button>' : '') +
          (o.live ? '<input type="file" multiple class="pds-chat-input__file-input" tabindex="-1" aria-hidden="true">' : '') +
          o.files.map(function (f, i) { return fileTagHTML(o, f, i); }).join('') +
        '</div>' +
        '<div class="pds-button-group pds-chat-input__actions">' +
          '<button type="button" class="' + btn + ' pds-chat-input__cancel" disabled>Cancel</button>' +
          '<button type="button" class="' + btn + ' pds-chat-input__send"' + (sendOn ? '' : ' disabled') + '>Add</button>' +
        '</div>' +
      '</div>';
    if (o.live) init(el, o);
    return el;
  }

  function init(root, opts) {
    if (!root || root.__pdsChat) return root;
    var o = Object.assign({ theme: root.classList.contains('pds-chat-input--dark') ? 'dark' : 'light', tag: 'no' }, opts || {});
    var files = [];
    var field = root.querySelector('.pds-chat-input__field');
    var send = root.querySelector('.pds-chat-input__send');
    var picker = root.querySelector('.pds-chat-input__file-input');
    var clip = root.querySelector('.pds-chat-input__clip');
    var attach = root.querySelector('.pds-chat-input__attach');
    var textBox = root.querySelector('.pds-chat-input__text');
    root.__pdsChat = true;

    function plain() { // text without the committed tag
      var c = field.cloneNode(true);
      c.querySelectorAll('.pds-comment__tag').forEach(function (t) { t.remove(); });
      return c.innerText.replace(/\n+$/, '');
    }
    function tagValue() { var t = field.querySelector('.pds-comment__tag'); return t ? t.dataset.tag : ''; }
    function update() {
      // contenteditable leaves a lone <br> when cleared — empty it so the placeholder returns
      if (!field.textContent && !field.querySelector('.pds-comment__tag')) field.innerHTML = '';
      var has = plain().trim().length > 0 || files.length > 0;
      send.disabled = !has;
      root.dataset.state = (plain().length || tagValue()) ? 'filled' : 'empty';
    }
    function renderFiles() {
      attach.querySelectorAll('.pds-chat-input__file').forEach(function (n) { n.remove(); });
      attach.insertAdjacentHTML('beforeend', files.map(function (f, i) { return fileTagHTML(o, f.name, i); }).join(''));
      update();
    }
    function resetTagRow() {
      var row = textBox.querySelector('.pds-chat-input__tag');
      if (row) row.remove();
      if (o.tag !== 'no') { textBox.insertAdjacentHTML('afterbegin', addTagHTML(o, true)); }
    }
    function doSend() {
      if (send.disabled) return;
      var detail = { text: plain(), tag: tagValue(), files: files.slice() };
      root.dispatchEvent(new CustomEvent('pds-chat-input:send', { bubbles: true, detail: detail }));
      field.innerHTML = ''; files = []; renderFiles(); resetTagRow(); update();
      field.focus();
    }
    function startTagEdit(btn) {
      btn.outerHTML = editTagHTML(o, true);
      var inp = textBox.querySelector('.pds-chat-input__tag-input');
      inp.focus();
    }
    function commitTag(inp) {
      var v = inp.value.trim();
      var row = inp.closest('.pds-chat-input__tag');
      if (!v) { row.outerHTML = addTagHTML(o, true); textBox.querySelector('.pds-chat-input__tag').focus(); return; }
      row.remove();
      var old = field.querySelector('.pds-comment__tag'); if (old) old.remove();
      field.insertAdjacentHTML('afterbegin', committedTagHTML(o, v));
      field.focus();
      var r = document.createRange(); r.selectNodeContents(field); r.collapse(false);
      var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      update();
    }

    field.addEventListener('input', update);
    field.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); doSend(); }
    });
    field.addEventListener('paste', function (e) { // keep text plain where plaintext-only is not supported
      if (field.contentEditable === 'true') { e.preventDefault(); document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain')); }
    });
    textBox.addEventListener('click', function (e) {
      var add = e.target.closest('button.pds-chat-input__tag');
      if (add) { startTagEdit(add); return; }
      if (e.target === textBox) field.focus();
    });
    textBox.addEventListener('input', function (e) {
      if (e.target.classList.contains('pds-chat-input__tag-input')) e.target.style.width = Math.max(1, e.target.value.length + 1) + 'ch';
    });
    textBox.addEventListener('keydown', function (e) {
      if (!e.target.classList.contains('pds-chat-input__tag-input')) return;
      if (e.key === 'Enter') { e.preventDefault(); commitTag(e.target); }
      else if (e.key === 'Escape') { e.preventDefault(); e.target.value = ''; commitTag(e.target); }
    });
    textBox.addEventListener('focusout', function (e) {
      if (e.target.classList && e.target.classList.contains('pds-chat-input__tag-input')) {
        var inp = e.target; setTimeout(function () { if (inp.isConnected) commitTag(inp); }, 0);
      }
    });
    if (clip && picker) {
      clip.addEventListener('click', function () { picker.click(); });
      picker.addEventListener('change', function () {
        Array.prototype.forEach.call(picker.files, function (f) { files.push({ name: f.name, file: f }); });
        picker.value = ''; renderFiles();
      });
    }
    attach.addEventListener('click', function (e) {
      var x = e.target.closest('.pds-tag__remove');
      if (!x) return;
      var i = +x.closest('.pds-chat-input__file').dataset.index;
      files.splice(i, 1); renderFiles();
      (clip || field).focus();
    });
    send.addEventListener('click', doSend);
    // test hook for pages without a real file picker
    root.pdsAddFiles = function (names) { names.forEach(function (n) { files.push({ name: n }); }); renderFiles(); };
    update();
    return root;
  }

  window.pdsChatInput = { build: build, init: init, SAMPLE: SAMPLE };
})();
