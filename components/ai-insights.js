/* Pando DS V1 — AI Insight cards and Artifacts
   Needs icons/icons-data.js (window.PDS_ICONS) loaded first.
   Behaviour from Figma: .Insights Show More ↔ Show Less (Default ↔ Expanded).
   window.pdsAiInsights = { card, insights, artifactList, artifactContext, actions, bind, setExpanded } */
(function () {
  const ICON = {};
  (window.PDS_ICONS || []).forEach(i => { ICON[i.n] = i.svg; });
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (name, size) => `<span class="pds-icon pds-icon--${size}" aria-hidden="true">${ICON[name] || ""}</span>`;
  const el = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  // Icon per tone — Figma instances: Load-Material (default), Cost, Records, Impact, Calendar
  const TONE_ICON = { "": "indicator-load-material-20", cost: "indicator-cost-20", records: "indicator-records-20", impact: "indicator-impact-20", calendar: "indicator-calendar-20" };
  const DEFAULT_LIMIT = 2; // Default shows two cards, Expanded shows all

  /* Insight card. opts: { title, desc, tone, state: 'default'|'hover'|'loading', details:[[label,value],…], actions:bool, artifact:bool, time } */
  function cardHTML(o) {
    o = o || {};
    const tone = o.tone || "";
    const cls = ["pds-ai-insight"];
    if (tone) cls.push("pds-ai-insight--" + tone);
    if (o.state === "hover") cls.push("is-hover");
    if (o.state === "loading") cls.push("pds-ai-insight--loading");
    if (o.artifact) cls.push("pds-ai-insight--artifact");
    const ic = o.artifact ? "" : `<span class="pds-ai-insight__icon">${icon(TONE_ICON[tone] || TONE_ICON[""], 20)}</span>`;
    if (o.state === "loading") {
      return `<article class="${cls.join(" ")}" aria-busy="true" aria-label="Loading insight">${ic}` +
        `<div class="pds-skeleton pds-skeleton--220 pds-skeleton--light"><span class="pds-skeleton__block"></span><span class="pds-skeleton__block"></span></div></article>`;
    }
    let details = "";
    if (o.details && o.details.length) {
      const rows = [];
      for (let i = 0; i < o.details.length; i += 2) {
        rows.push(`<div class="pds-ai-insight__detail-row">${o.details.slice(i, i + 2).map(([l, v]) =>
          `<div class="pds-readonly pds-readonly--light"><span class="pds-readonly__label">${esc(l)}</span><span class="pds-readonly__sep">:</span><span class="pds-readonly__value">${esc(v)}</span></div>`).join("")}</div>`);
      }
      details = `<div class="pds-ai-insight__details">${rows.join("")}</div>`;
    }
    const time = o.time ? `<div class="pds-ai-insight__time pds-readonly pds-readonly--light"><span class="pds-readonly__label">${esc(o.time)}</span></div>` : "";
    const actions = o.actions ? `<div class="pds-ai-insight__actions">` +
      `<button type="button" class="pds-ai-insight__action" aria-label="Download">${icon("indicator-download-14", 14)}</button>` +
      `<button type="button" class="pds-ai-insight__action" aria-label="View">${icon("indicator-view-14", 14)}</button></div>` : "";
    return `<article class="${cls.join(" ")}">${ic}<div class="pds-ai-insight__content">` +
      `<div class="pds-ai-insight__head"><h3 class="pds-ai-insight__title">${esc(o.title)}</h3></div>` +
      `<p class="pds-ai-insight__desc">${esc(o.desc)}</p>${details}${time}</div>${actions}</article>`;
  }
  const card = o => el(cardHTML(o));

  /* Insights list. opts: { label, cards:[…], expanded:bool, large:bool } */
  let uid = 0;
  function insights(o) {
    o = o || {};
    const id = "pds-ai-insights-" + (++uid);
    const cls = ["pds-ai-insights"];
    if (o.large) cls.push("pds-ai-insights--large");
    const toggle = o.large ? "" :
      `<button type="button" class="pds-button pds-button--text pds-button--small pds-ai-insights__toggle" aria-expanded="false" aria-controls="${id}">` +
      `<span class="pds-ai-insights__toggle-text">Show More</span>` +
      `<svg class="pds-ai-insights__caret" viewBox="0 0 10 8" aria-hidden="true">${(ICON["nav-button-down-caret"] || "").replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg></button>`;
    const items = (o.cards || []).map(c => `<li>${cardHTML(c)}</li>`).join("");
    const root = el(`<div class="${cls.join(" ")}" role="region" aria-label="${esc(o.label || "Quick Insights")}"><div class="pds-ai-insights__head"><h2 class="pds-ai-insights__label">${esc(o.label || "Quick Insights")}</h2>${toggle}</div><ul class="pds-ai-insights__list" id="${id}">${items}</ul></div>`);
    if (!o.large) setExpanded(root, !!o.expanded);
    return root;
  }
  function setExpanded(root, on) {
    if (root.classList.contains("pds-ai-insights--large")) return;
    root.classList.toggle("pds-ai-insights--expanded", on);
    const btn = root.querySelector(".pds-ai-insights__toggle");
    if (btn) {
      btn.setAttribute("aria-expanded", String(on));
      btn.querySelector(".pds-ai-insights__toggle-text").textContent = on ? "Show Less" : "Show More";
      const items = root.querySelectorAll(".pds-ai-insights__list > li");
      items.forEach((li, i) => { li.hidden = !on && i >= DEFAULT_LIMIT; });
      btn.hidden = items.length <= DEFAULT_LIMIT;
    }
  }
  function bind(scope) {
    (scope || document).addEventListener("click", e => {
      const btn = e.target.closest && e.target.closest(".pds-ai-insights__toggle");
      if (!btn) return;
      const root = btn.closest(".pds-ai-insights");
      setExpanded(root, !root.classList.contains("pds-ai-insights--expanded"));
    });
  }

  /* Artifacts — Type=List. opts: { label, cards:[{title,desc,time}] } */
  function artifactList(o) {
    o = o || {};
    const items = (o.cards || []).map(c => `<li>${cardHTML(Object.assign({ artifact: true }, c))}</li>`).join("");
    return el(`<aside class="pds-ai-artifact pds-ai-artifact--list" aria-label="${esc(o.label || "Artifacts")}">` +
      `<div class="pds-ai-artifact__head"><h2 class="pds-ai-artifact__label">${esc(o.label || "Artifacts")}</h2>` +
      `<button type="button" class="pds-ai-artifact__close" aria-label="Close">${icon("nav-close-tag", 12)}</button></div>` +
      `<ul class="pds-ai-artifact__list pds-scroll pds-scroll--light">${items}</ul></aside>`);
  }

  /* Artifacts — Type=Context. opts: { name, content: Node|html } */
  function artifactContext(o) {
    o = o || {};
    const root = el(`<div role="region" class="pds-ai-artifact pds-ai-artifact--context" aria-label="${esc(o.name)}">` +
      `<div class="pds-ai-artifact__head"><div class="pds-ai-artifact__lead">` +
      `<button type="button" class="pds-button pds-button--icon-plain pds-button--small" aria-label="Details" title="Details">${icon("indicator-details-14", 14).replace('class="pds-icon', 'class="pds-button__icon pds-icon')}</button>` +
      `<h2 class="pds-ai-artifact__name">${esc(o.name)}</h2></div>` +
      `<div class="pds-ai-artifact__tools">` +
      `<button type="button" class="pds-button pds-button--action">${icon("action-upload", 10).replace('class="pds-icon', 'class="pds-button__icon pds-icon')}Share</button>` +
      `<button type="button" class="pds-button pds-button--action">${icon("action-download", 10).replace('class="pds-icon', 'class="pds-button__icon pds-icon')}Download</button>` +
      `<span class="pds-ai-artifact__divider" aria-hidden="true"></span>` +
      `<button type="button" class="pds-ai-artifact__close" aria-label="Close">${icon("nav-close-tag", 12)}</button></div></div>` +
      `<div class="pds-ai-artifact__body pds-scroll pds-scroll--light"></div></div>`);
    if (o.content) { const b = root.querySelector(".pds-ai-artifact__body"); typeof o.content === "string" ? (b.innerHTML = o.content) : b.appendChild(o.content); }
    return root;
  }

  /* Action icon buttons — Clone · Accept · Reject · Upload */
  function actions() {
    const A = [["action-clone", "Clone"], ["action-accept", "Accept"], ["action-reject", "Reject"], ["action-upload", "Upload"]];
    return el(`<div class="pds-ai-insight-actions">${A.map(([n, l]) => `<button type="button" class="pds-ai-insight-actions__btn" aria-label="${l}" title="${l}">${icon(n, 12)}</button>`).join("")}</div>`);
  }

  window.pdsAiInsights = { card, insights, artifactList, artifactContext, actions, bind, setExpanded };
})();
