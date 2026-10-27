/* Pando DS V1 — Attachments behaviour (pattern built from loose frames — confirm before treating as standard).
   Requires attachments.css and the kit pieces it assembles: icons.css + icons/icons-data.js, tag.css,
   card.css, badge.css, checkbox.css, tooltip.css + tooltip.js.

   Local only: chosen files are never read or sent anywhere — only their names are shown.

   pdsAttachments.chip({ name, type, removable, href })      → <li> link chip (Frame 1 / Frame 2)
   pdsAttachments.fileTag({ name, type, removable })         → <li> kit File tag (.pds-tag--file)
   pdsAttachments.tile({ name, type, image, count, removable }) → <li> filled tile (File or Image)
   pdsAttachments.addTile()                                  → <li> Add tile
   pdsAttachments.row({ label, checked, files, add })       → document row (checkbox + tiles)
   pdsAttachments.init(root)  wires every [data-pds-attachments] inside root (remove, preview, add).
   Events on the container: 'pds-attachments:remove' (detail.name), 'pds-attachments:preview' (detail.name),
   'pds-attachments:add' (detail.files). */
(function () {
  const ICON = {};
  (window.PDS_ICONS || []).forEach(i => { ICON[i.n] = i.svg; });
  const svg = n => ICON[n] || '';
  const TYPES = ['csv', 'doc', 'edi', 'eml', 'folder', 'image', 'json', 'msg', 'pdf', 'pending', 'txt', 'xls', 'zip', 'zpl'];
  const EXT = { xlsx: 'xls', xlsm: 'xls', docx: 'doc', png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', svg: 'image', webp: 'image' };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function typeOf(name, type) {
    if (type && TYPES.includes(type)) return type;
    const ext = (String(name).split('.').pop() || '').toLowerCase();
    const t = EXT[ext] || ext;
    return TYPES.includes(t) ? t : 'txt';
  }
  const CLOSE = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M9.88 2.11C9.69 1.91 9.37 1.91 9.18 2.11L6.00 5.29L2.81 2.11L2.74 2.05C2.55 1.91 2.28 1.93 2.11 2.11C1.91 2.30 1.91 2.62 2.11 2.81L5.29 6.00L2.11 9.18L2.05 9.25C1.91 9.44 1.93 9.71 2.11 9.88C2.30 10.08 2.62 10.08 2.81 9.88L6.00 6.70L9.18 9.88L9.25 9.94C9.44 10.08 9.71 10.06 9.88 9.88C10.08 9.69 10.08 9.37 9.88 9.18L6.70 6.00L9.88 2.81L9.94 2.74C10.08 2.55 10.06 2.28 9.88 2.11Z"/></svg>'; // icons/nav-close-tag.svg
  const PDF_10 = '<svg class="pds-tag__file-icon" viewBox="0 0 20 24" aria-hidden="true">' + svg('file-pdf').replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</svg>';
  const frag = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  function chip(o = {}) {
    const name = o.name || 'Attachment Name.ext', t = typeOf(name, o.type || 'xls');
    return frag(`<li class="pds-attachments__item" data-name="${esc(name)}"><span class="pds-attachments__chip">` +
      `<a class="pds-attachments__link" href="${esc(o.href || '#')}"><span class="pds-icon" aria-hidden="true">${svg('file-' + t)}</span><span class="pds-attachments__name">${esc(name)}</span></a>` +
      (o.removable ? `<span class="pds-attachments__divider" aria-hidden="true"></span><button type="button" class="pds-attachments__chip-remove" data-pds-attachments-remove aria-label="Remove ${esc(name)}">${CLOSE}</button>` : '') +
      `</span></li>`);
  }

  function fileTag(o = {}) {
    const name = o.name || 'Terms & Condition002.pdf';
    return frag(`<li class="pds-attachments__item" data-name="${esc(name)}"><span class="pds-tag pds-tag--file">${PDF_10}<span class="pds-tag__text">${esc(name)}</span>` +
      (o.removable ? `<button type="button" class="pds-tag__remove" data-pds-attachments-remove aria-label="Remove ${esc(name)}">${CLOSE}</button>` : '') + `</span></li>`);
  }

  function tile(o = {}) {
    const name = o.name || 'File name.ext';
    let inner, cls = 'pds-card__thumb pds-attachments__tile';
    if (o.image) {
      inner = `<span class="pds-icon pds-icon--40" aria-hidden="true">${svg('misc-add-attachment-light-40-default')}</span><span class="pds-card__thumb-img" aria-hidden="true"></span>`;
    } else { // kit icon misc-add-attachment-light-40-filled-file bakes in the remove dot, so the tile is composed as in Figma: frame + Misc/File-Types at (10,8)
      cls += ' pds-attachments__tile--file';
      inner = `<span class="pds-icon" aria-hidden="true">${svg('file-' + typeOf(name, o.type))}</span>`;
    }
    if (o.removable) cls += ' pds-attachments__tile--removable';
    const badge = o.count ? `<span class="pds-badge pds-badge--count">+${o.count}</span>` : '';
    return frag(`<li class="pds-attachments__item" data-name="${esc(name)}"><span class="${cls}">${inner}${badge}` +
      `<button type="button" class="pds-attachments__preview" data-pds-attachments-preview data-pds-tooltip="${esc(name)}" data-show-title="false" data-beak="12" aria-label="Preview ${esc(name)}"><span class="pds-icon" aria-hidden="true">${svg('nav-zoom-icon-plus')}</span></button>` +
      `<button type="button" class="pds-attachments__remove" data-pds-attachments-remove aria-label="Remove ${esc(name)}">${CLOSE}</button></span></li>`);
  }

  function addTile(label) {
    return frag(`<li class="pds-attachments__item"><button type="button" class="pds-attachments__add" data-pds-attachments-add aria-label="${esc(label || 'Add attachment')}"><span class="pds-icon pds-icon--40" aria-hidden="true">${svg('misc-add-attachment-light-40-default')}</span></button></li>`);
  }

  const CHECK = '<svg class="pds-checkbox__mark" viewBox="0 0 10 8" aria-hidden="true"><path d="M3.28 5.72L8.74.09c.12-.12.3-.12.41 0l.76.78c.12.12.12.32 0 .44L3.48 7.91c-.11.12-.3.12-.41 0L.09 4.85c-.12-.12-.12-.32 0-.44l.74-.78c.12-.12.3-.12.42 0z"/></svg>'; // as checkbox.html
  function row(o = {}) {
    const label = o.label || 'Packing List';
    const r = frag(`<div class="pds-attachments__row"><label class="pds-checkbox"><input type="checkbox" class="pds-checkbox__input"${o.checked ? ' checked' : ''}><span class="pds-checkbox__box" aria-hidden="true">${CHECK}<span class="pds-checkbox__dash"></span></span><span class="pds-checkbox__label">${esc(label)}</span></label><ul class="pds-attachments pds-attachments--tiles" data-pds-attachments aria-label="${esc(label)} attachments"></ul></div>`);
    const ul = r.querySelector('ul');
    (o.files || []).forEach(f => ul.appendChild(tile(f)));
    if (o.add !== false) ul.appendChild(addTile('Add ' + label));
    return r;
  }

  function fire(el, type, detail) { el.dispatchEvent(new CustomEvent('pds-attachments:' + type, { bubbles: true, detail })); }

  function wire(list) {
    if (list.dataset.pdsAttachmentsReady) return;
    list.dataset.pdsAttachmentsReady = '';
    let input = null;
    list.addEventListener('click', e => {
      const rm = e.target.closest('[data-pds-attachments-remove]');
      const pv = e.target.closest('[data-pds-attachments-preview]');
      const ad = e.target.closest('[data-pds-attachments-add]');
      if (rm && list.contains(rm)) {
        const item = rm.closest('.pds-attachments__item');
        const name = item && item.dataset.name;
        const next = item && (item.nextElementSibling || item.previousElementSibling);
        if (item) item.remove();
        const tip = document.querySelector('.pds-tooltip--floating:not([hidden])'); if (tip) tip.hidden = true;
        const focusEl = next && next.querySelector('button, a');
        if (focusEl) focusEl.focus();
        fire(list, 'remove', { name });
      } else if (pv && list.contains(pv)) {
        fire(list, 'preview', { name: pv.closest('.pds-attachments__item').dataset.name });
      } else if (ad && list.contains(ad)) {
        if (!input) {
          input = document.createElement('input');
          input.type = 'file'; input.multiple = true; input.hidden = true;
          input.addEventListener('change', () => {
            const files = Array.from(input.files || []);
            if (!files.length) return;
            const addItem = ad.closest('.pds-attachments__item');
            const existing = list.querySelector('.pds-attachments__tile');
            if (existing) { // the row keeps one tile and counts the rest (+n), as in the Material screen
              let b = existing.querySelector('.pds-badge');
              const n = (b ? parseInt(b.textContent.replace('+', ''), 10) || 0 : 0) + files.length;
              if (!b) { b = document.createElement('span'); b.className = 'pds-badge pds-badge--count'; existing.insertBefore(b, existing.querySelector('.pds-attachments__preview')); }
              b.textContent = '+' + n;
            } else {
              const first = files[0];
              const li = tile({ name: first.name, image: /^image\//.test(first.type), count: files.length - 1 || 0 });
              list.insertBefore(li, addItem);
              if (window.pdsTooltip) window.pdsTooltip.init(li);
            }
            fire(list, 'add', { files: files.map(f => f.name) });
            input.value = '';
          });
          document.body.appendChild(input);
        }
        input.click();
      }
    });
  }

  function init(root = document) {
    root.querySelectorAll('[data-pds-attachments]').forEach(wire);
    if (window.pdsTooltip) window.pdsTooltip.init(root);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();

  window.pdsAttachments = { chip, fileTag, tile, addTile, row, init };
})();
