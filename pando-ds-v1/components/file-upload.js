/* Pando DS V1 — File Upload behaviour. Requires file-upload.css and the kit atoms
   (button.css, readonly.css, progress.css + progress.js, empty-state.css, tag.css, icons.css).

   Local only: files are never sent anywhere. Progress is simulated with the kit
   Progress Indicator, using its Figma step text ("0/5 steps complete" … "Complete").

   pdsFileUpload.build(opts) → element
     theme   'light' | 'dark'                          (default 'light')
     type    'not-uploaded' | 'uploaded' | 'verified'  (Dark exists only as 'not-uploaded' in Figma)
     name    file name for Uploaded / Verified         (Figma: "Lanes Sample Format" / "Lanes-Mar-22")
     fileType xls | csv | pdf | doc | image | txt | zip | json | …  (icons/file-<type>.svg)
     entries Verified only: value for "Total entries : n" (Figma sample 50); omit to hide
     interactive true → wire browse, drag-and-drop, progress, remove (Not Uploaded only)
     accept  value for <input type=file accept>        (Figma gives none)
     multiple default true
     iconBase   path to components/icons/        (default 'icons/')
     artBase    path to components/empty-state/  (default 'empty-state/')
   pdsFileUpload.init(root) → wires every [data-pds-file-upload] inside root.
   pdsFileUpload.reset(el) → back to Not Uploaded.
   Events on the component: 'pds-file-upload:change' (detail.files), 'pds-file-upload:upload' (detail.files). */
(function () {
  const STEP_TEXT = ["0/5 steps complete", "1/5 steps", "2/5 steps", "3/5 steps", "4/5 steps", "Complete"]; // progress.md, Figma text
  const STEP_MS = 280;
  /* Kit icon SVGs, copied from components/icons/ (inline so currentColor works) */
  const CHECK = '<svg class="pds-file-upload__check" viewBox="0 0 10 8" aria-hidden="true" focusable="false"><path d="M3.44 5.50L8.36 0.57C8.46 0.47 8.63 0.47 8.73 0.57L9.42 1.25C9.52 1.36 9.52 1.53 9.42 1.64L3.63 7.42C3.53 7.52 3.36 7.52 3.26 7.42L0.57 4.74C0.47 4.63 0.47 4.46 0.57 4.35L1.24 3.67C1.35 3.57 1.51 3.57 1.62 3.67L3.44 5.50Z" fill="currentColor"/></svg>'; // system-status-selected-multi.svg
  const CLOSE = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M9.88 2.11C9.69 1.91 9.37 1.91 9.18 2.11L6.00 5.29L2.81 2.11L2.74 2.05C2.55 1.91 2.28 1.93 2.11 2.11C1.91 2.30 1.91 2.62 2.11 2.81L5.29 6.00L2.11 9.18L2.05 9.25C1.91 9.44 1.93 9.71 2.11 9.88C2.30 10.08 2.62 10.08 2.81 9.88L6.00 6.70L9.18 9.88L9.25 9.94C9.44 10.08 9.71 10.06 9.88 9.88C10.08 9.69 10.08 9.37 9.88 9.18L6.70 6.00L9.88 2.81L9.94 2.74C10.08 2.55 10.06 2.28 9.88 2.11Z"/></svg>'; // nav-close-tag.svg

  const EXT = { xls: "xls", xlsx: "xls", xlsm: "xls", csv: "csv", pdf: "pdf", doc: "doc", docx: "doc",
    png: "image", jpg: "image", jpeg: "image", gif: "image", svg: "image", webp: "image",
    txt: "txt", zip: "zip", json: "json", edi: "edi", eml: "eml", msg: "msg", zpl: "zpl" };
  const typeOf = name => EXT[(String(name).split(".").pop() || "").toLowerCase()] || "txt";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let uid = 0;

  function opt(el) { return el._pdsFU || (el._pdsFU = {}); }

  function emptyRow(o) {
    const dark = o.theme === "dark";
    const art = `${o.artBase}no-file-uploaded-small-${dark ? "dark" : "light"}.png`;
    const actions = dark
      ? `<button type="button" class="pds-button pds-button--small" data-fu="upload">Upload</button>`
      : `<button type="button" class="pds-button pds-button--secondary pds-button--small" data-fu="browse">Add Files</button>` +
        `<button type="button" class="pds-button pds-button--small" data-fu="upload" disabled>Upload</button>`;
    return `<div class="pds-file-upload__row">
  <div class="pds-file-upload__status">
    <div class="pds-empty pds-empty--small pds-empty--${dark ? "dark" : "light"}"><img class="pds-empty__art" src="${art}" alt=""></div>
    <p class="pds-file-upload__empty-text">No File Uploaded</p>
  </div>
  <div class="pds-file-upload__actions">${actions}</div>
</div>`;
  }

  function uploadedRow(o) {
    return `<div class="pds-file-upload__row">
  <div class="pds-file-upload__status">
    <img class="pds-file-upload__type" src="${o.iconBase}file-${o.fileType || typeOf(o.name)}.svg" alt="">
    <p class="pds-file-upload__name">${esc(o.name)}</p>
  </div>
  <button type="button" class="pds-button pds-button--secondary pds-button--small" data-fu="download">Download</button>
</div>`;
  }

  function verifiedRow(o) {
    const total = o.entries != null
      ? `<div class="pds-readonly pds-readonly--light"><span class="pds-readonly__label">Total entries</span><span class="pds-readonly__sep">:</span><span class="pds-readonly__value">${esc(o.entries)}</span></div>`
      : "";
    return `<div class="pds-file-upload__row">
  <div class="pds-file-upload__status">
    <img class="pds-file-upload__type" src="${o.iconBase}file-${o.fileType || typeOf(o.name)}.svg" alt="">
    <span class="pds-file-upload__file-link"><span class="pds-readonly pds-readonly--light"><span class="pds-readonly__label">${esc(o.name)}</span></span></span>
    ${CHECK}<span class="pds-file-upload__sr">Verified</span>
  </div>
  ${total}
</div>`;
  }

  function build(o = {}) {
    o = Object.assign({ theme: "light", type: "not-uploaded", iconBase: "icons/", artBase: "empty-state/", multiple: true }, o);
    const el = document.createElement("div");
    const empty = o.type === "not-uploaded";
    el.className = "pds-file-upload" + (o.theme === "dark" ? " pds-file-upload--dark" : "") +
      (empty ? " pds-file-upload--empty" : o.type === "verified" ? " pds-file-upload--verified" : " pds-file-upload--uploaded");
    el.innerHTML = empty ? emptyRow(o) : o.type === "verified" ? verifiedRow(o) : uploadedRow(o);
    el.querySelectorAll(".pds-file-upload__sr").forEach(s => s.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"));
    if (empty && o.interactive) { el.setAttribute("data-pds-file-upload", ""); wire(el, o); }
    return el;
  }

  /* ── Interactive Not Uploaded ── */
  function wire(el, o) {
    if (el._pdsFUwired) return el;
    el._pdsFUwired = true;
    const st = opt(el);
    st.o = Object.assign({ theme: el.classList.contains("pds-file-upload--dark") ? "dark" : "light", iconBase: "icons/", artBase: "empty-state/", multiple: true },
      o || {}, { accept: (o && o.accept) || el.dataset.accept || "", iconBase: (o && o.iconBase) || el.dataset.iconBase || "icons/", artBase: (o && o.artBase) || el.dataset.artBase || "empty-state/" });
    st.files = []; // {id, file, value, timer, li, bar}
    const id = "pds-fu-" + (++uid);

    const input = document.createElement("input");
    input.type = "file"; input.className = "pds-file-upload__input"; input.tabIndex = -1; input.id = id + "-input";
    input.setAttribute("aria-hidden", "true");
    if (st.o.multiple) input.multiple = true;
    if (st.o.accept) input.accept = st.o.accept;
    el.appendChild(input);

    const list = document.createElement("ul");
    list.className = "pds-file-upload__list"; list.setAttribute("aria-label", "Chosen files");
    el.appendChild(list);

    const live = document.createElement("div");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)");
    el.appendChild(live);
    st.live = live; st.list = list; st.input = input;

    el.addEventListener("click", e => {
      const b = e.target.closest("[data-fu]"); if (!b || !el.contains(b) || b.disabled) return;
      const act = b.dataset.fu;
      if (act === "browse") { st.opener = b; input.click(); }
      else if (act === "upload") {
        if (st.o.theme === "dark" && !st.files.length) { st.opener = b; input.click(); }
        else if (allDone(st)) commit(el);
      }
      else if (act === "remove") remove(el, b.closest("li").dataset.id);
    });
    input.addEventListener("change", () => { add(el, input.files); input.value = ""; if (st.opener) st.opener.focus(); });

    let depth = 0;
    el.addEventListener("dragenter", e => { if (!hasFiles(e)) return; e.preventDefault(); depth++; el.classList.add("is-dragover"); });
    el.addEventListener("dragover", e => { if (!hasFiles(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = "copy"; });
    el.addEventListener("dragleave", () => { if (--depth <= 0) { depth = 0; el.classList.remove("is-dragover"); } });
    el.addEventListener("drop", e => { if (!hasFiles(e)) return; e.preventDefault(); depth = 0; el.classList.remove("is-dragover"); add(el, e.dataTransfer.files); });
    return el;
  }
  const hasFiles = e => e.dataTransfer && Array.from(e.dataTransfer.types || []).includes("Files");
  const allDone = st => st.files.length > 0 && st.files.every(f => f.value >= 100);

  function accepts(st, file) {
    if (!st.o.accept) return true;
    const name = file.name.toLowerCase(), type = (file.type || "").toLowerCase();
    return st.o.accept.split(",").map(s => s.trim().toLowerCase()).filter(Boolean).some(a =>
      a.startsWith(".") ? name.endsWith(a) : a.endsWith("/*") ? type.startsWith(a.slice(0, -1)) : type === a);
  }

  function add(el, fileList) {
    const st = opt(el);
    let files = Array.from(fileList || []);
    const skipped = files.filter(f => !accepts(st, f)).length;
    files = files.filter(f => accepts(st, f));
    if (!st.o.multiple) { st.files.slice().forEach(f => remove(el, f.id, true)); files = files.slice(0, 1); }
    const dark = st.o.theme === "dark";
    files.forEach(file => {
      const fid = "f" + (++uid);
      const li = document.createElement("li");
      li.className = "pds-file-upload__item"; li.dataset.id = fid;
      li.innerHTML = `<span class="pds-tag ${dark ? "pds-tag--attachment pds-tag--dark" : "pds-tag--file"}"><img class="pds-tag__file-icon" src="${st.o.iconBase}file-${typeOf(file.name)}.svg" alt=""><span class="pds-tag__text">${esc(file.name)}</span><button type="button" class="pds-tag__remove" data-fu="remove" aria-label="Remove ${esc(file.name)}">${CLOSE}</button></span>`;
      const bar = window.pdsProgress
        ? window.pdsProgress.build({ theme: dark ? "dark" : "light", value: 0, text: STEP_TEXT[0], label: file.name })
        : document.createElement("span");
      li.appendChild(bar);
      st.list.appendChild(li);
      const rec = { id: fid, file, value: 0, li, bar, step: 0 };
      st.files.push(rec);
      rec.timer = setInterval(() => {
        rec.step++; rec.value = rec.step * 20;
        if (window.pdsProgress) window.pdsProgress.set(bar, rec.value, STEP_TEXT[rec.step]);
        if (rec.step >= 5) { clearInterval(rec.timer); rec.timer = null; sync(el); if (allDone(st)) say(el, "All files ready"); }
      }, STEP_MS);
    });
    if (files.length) say(el, `${files.length} file${files.length > 1 ? "s" : ""} added`);
    if (skipped) say(el, `${skipped} file${skipped > 1 ? "s" : ""} not added: type not accepted`);
    sync(el); emit(el, "change");
  }

  function remove(el, fid, quiet) {
    const st = opt(el);
    const i = st.files.findIndex(f => f.id === fid); if (i < 0) return;
    const rec = st.files[i];
    if (rec.timer) clearInterval(rec.timer);
    rec.li.remove(); st.files.splice(i, 1);
    if (!quiet) {
      say(el, `${rec.file.name} removed`);
      const next = st.list.querySelector(".pds-tag__remove") || el.querySelector('[data-fu="browse"]') || el.querySelector('[data-fu="upload"]');
      if (next) next.focus();
    }
    sync(el); emit(el, "change");
  }

  /* Upload button: enabled once every chosen file reaches "Complete" (Light). */
  function sync(el) {
    const st = opt(el);
    const up = el.querySelector('[data-fu="upload"]');
    if (up && st.o.theme !== "dark") up.disabled = !allDone(st);
  }

  /* Local "upload": each chosen file becomes a Verified row. */
  function commit(el) {
    const st = opt(el);
    const files = st.files.map(f => f.file);
    st.files = [];
    el.className = "pds-file-upload pds-file-upload--verified" + (st.o.theme === "dark" ? " pds-file-upload--dark" : "");
    el.innerHTML = files.map(f => verifiedRow({ name: f.name, iconBase: st.o.iconBase })).join("");
    el.querySelectorAll(".pds-file-upload__sr").forEach(s => s.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"));
    el.appendChild(st.live);
    say(el, `${files.length} file${files.length > 1 ? "s" : ""} uploaded`);
    emit(el, "upload", files);
  }

  function reset(el) {
    const st = opt(el);
    (st.files || []).forEach(f => f.timer && clearInterval(f.timer));
    const o = st.o || {};
    el._pdsFUwired = false; el._pdsFU = null;
    el.className = "pds-file-upload pds-file-upload--empty" + (o.theme === "dark" ? " pds-file-upload--dark" : "");
    el.innerHTML = emptyRow(Object.assign({ artBase: "empty-state/" }, o));
    wire(el, o);
    return el;
  }

  function say(el, msg) { const st = opt(el); if (st.live) { st.live.textContent = ""; setTimeout(() => { st.live.textContent = msg; }, 30); } }
  function emit(el, name, files) {
    el.dispatchEvent(new CustomEvent("pds-file-upload:" + name, { bubbles: true, detail: { files: files || opt(el).files.map(f => f.file) } }));
  }

  function init(root) {
    (root || document).querySelectorAll("[data-pds-file-upload]").forEach(el => wire(el));
    return root;
  }

  window.pdsFileUpload = { build, init, reset, add };
})();
