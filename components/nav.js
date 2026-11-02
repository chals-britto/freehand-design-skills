/* Pando DS V1 — shared page chrome for every component page.
   • Left sidebar: home link, theme switch, component search (synonyms), Foundations + all components
     grouped by level (from registry.js). Current page highlighted.
   • Right pane: "Also known as" line under the title, and a sticky "On this page" bar
     that jumps to each section and highlights the one in view.
   • Desktop: sidebar and content scroll independently. Narrow screens: a "Go to" menu instead.
   Loads registry.js and search.js itself if the page hasn't. */
(function () {
  function load(src) { return new Promise(r => { const s = document.createElement('script'); s.src = src; s.onload = r; s.onerror = r; document.head.appendChild(s); }); }
  async function start() {
    if (!window.PDS_REGISTRY) await load('registry.js');
    if (!window.pdsSearch) await load('search.js');
    build();
  }

  function build() {
    const FOUNDATIONS = [
      ['roles', 'Colour roles'], ['palette', 'Palette'], ['status', 'Status & tags'],
      ['gradients', 'Gradients'], ['type', 'Type scale'], ['elevation', 'Elevation'], ['pairs', 'Contrast pairs']
    ];
    const REG = window.PDS_REGISTRY || [];
    const LEVELS = window.PDS_LEVELS || ['Atoms', 'Molecules', 'Organisms'];
    const here = (location.pathname.split('/').pop() || '').replace('.html', '');
    const me = REG.find(c => c.id === here);
    const wrap = document.querySelector('body > .wrap');
    if (!wrap || document.querySelector('.ds-side')) return;

    const css = document.createElement('style');
    css.textContent = `
    .ds-shell{max-width:1260px;margin:0 auto;display:grid;grid-template-columns:220px minmax(0,1fr);gap:32px}
    .ds-shell > .wrap{max-width:none;margin:0;min-width:0}
    .ds-side{position:sticky;top:env(safe-area-inset-top,0px);align-self:start;max-height:100vh;overflow:auto;padding:24px 0 24px;display:flex;flex-direction:column;gap:2px}
    .ds-side a{color:var(--pg-muted);text-decoration:none;font-size:13px;padding:4px 8px;border-radius:6px}
    .ds-side a:hover{background:var(--pg-soft);color:var(--pg-ink)}
    .ds-side a[aria-current="page"]{background:var(--pg-soft);color:var(--pg-ink);font-weight:600;box-shadow:inset 2px 0 0 var(--pg-accent)}
    .ds-side a.ds-item{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
    .ds-side .ds-lvl{flex:none;font-size:10px;letter-spacing:.02em;color:var(--pg-muted);opacity:.8}
    .ds-side .grp{font:500 10.5px var(--pg-ui);letter-spacing:.08em;text-transform:uppercase;color:var(--pg-muted);margin:14px 8px 4px}
    .ds-top{display:flex;flex-direction:column;gap:10px;padding:0 8px 8px;margin-bottom:4px;border-bottom:1px solid var(--pg-line);position:sticky;top:0;z-index:2;background:var(--pg-bg);padding-top:24px}
    .ds-top-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
    .ds-side .home{font-weight:600;color:var(--pg-ink);padding:4px 0;font-size:14px}
    .ds-top .theme{flex:none}
    .ds-search{position:relative}
    .ds-search input{width:100%;box-sizing:border-box;font:400 13px var(--pg-ui);padding:7px 28px 7px 9px;border:1px solid var(--pg-line);border-radius:6px;background:var(--pg-panel);color:var(--pg-ink)}
    .ds-search input:focus-visible{outline:2px solid var(--pg-accent);outline-offset:1px}
    .ds-search kbd{position:absolute;right:7px;top:50%;transform:translateY(-50%);font:500 11px var(--pg-mono,monospace);color:var(--pg-muted);border:1px solid var(--pg-line);border-radius:4px;padding:0 4px;pointer-events:none}
    .ds-results{display:flex;flex-direction:column;gap:2px}
    .ds-results a{display:flex;flex-direction:column;gap:1px}
    .ds-results a.is-first{background:var(--pg-soft);color:var(--pg-ink)}
    .ds-results .lvl{font-size:10.5px;color:var(--pg-muted)}
    .ds-results .aka{font-size:11px;color:var(--pg-accent)}
    .ds-results .none{font-size:12.5px;color:var(--pg-muted);padding:4px 8px}
    .ds-aka{font-size:12.5px;color:var(--pg-muted);margin:4px 0 0;max-width:72ch}
    .ds-aka b{font-weight:600;color:var(--pg-ink)}
    .ds-onpage{position:sticky;top:0;z-index:20;display:flex;gap:6px;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;align-items:center;margin:14px 0 0;padding:8px 0;background:var(--pg-bg);border-bottom:1px solid var(--pg-line)}
    .ds-onpage::-webkit-scrollbar{display:none}
    .ds-onpage .lbl{font:500 10.5px var(--pg-ui);letter-spacing:.08em;text-transform:uppercase;color:var(--pg-muted);flex:none;margin-right:2px}
    .ds-onpage a{flex:none;font-size:12.5px;color:var(--pg-ink);text-decoration:none;border:1px solid var(--pg-line);background:var(--pg-panel);padding:4px 10px;border-radius:999px;white-space:nowrap}
    .ds-onpage a:hover{border-color:var(--pg-accent)}
    .ds-onpage a[aria-current="true"]{background:var(--pg-ink);color:var(--pg-bg);border-color:var(--pg-ink)}
    .ds-shell [data-ds-section]{scroll-margin-top:56px}
    .ds-jump{display:none;margin-top:16px;gap:8px;align-items:center}
    .ds-jump select{font:400 13px var(--pg-ui);padding:6px 8px;border:1px solid var(--pg-line);border-radius:6px;background:var(--pg-panel);color:var(--pg-ink);flex:1;min-width:0}
    @media (min-width:821px){
      html,body{height:100%;overflow:hidden}
      body{padding-block:0}
      .ds-shell{height:100%}
      .ds-side{position:static;height:100%;max-height:none;padding-top:0;overflow-y:auto;overscroll-behavior:contain;padding-right:8px}
      .ds-shell > .wrap{height:100%;overflow-y:auto;overscroll-behavior:contain;padding-bottom:64px;padding-right:4px}
      .ds-side,.ds-shell > .wrap{scrollbar-width:thin;scrollbar-color:var(--pg-line) transparent}
      .ds-side::-webkit-scrollbar,.ds-shell > .wrap::-webkit-scrollbar{width:8px}
      .ds-side::-webkit-scrollbar-thumb,.ds-shell > .wrap::-webkit-scrollbar-thumb{background:var(--pg-line);border-radius:8px}
      .ds-side::-webkit-scrollbar-track,.ds-shell > .wrap::-webkit-scrollbar-track{background:transparent}
    }
    @media (max-width:820px){.ds-shell{grid-template-columns:1fr}.ds-side{display:none}.ds-jump{display:flex}.ds-shell > .wrap{overflow-x:auto}}`;
    document.head.appendChild(css);

    /* ── sidebar ── */
    const side = document.createElement('nav');
    side.className = 'ds-side';
    side.setAttribute('aria-label', 'Design system');
    const top = document.createElement('div');
    top.className = 'ds-top';
    top.innerHTML = '<div class="ds-top-row"><a class="home" href="../index.html">Pando DS V1</a><span class="ds-theme-slot"></span></div>' +
      '<div class="ds-search" role="search"><input type="search" id="ds-search-input" placeholder="Search components…" aria-label="Search components (synonyms work: dialog, pop-up, chip…)" autocomplete="off"><kbd>/</kbd></div>';
    side.appendChild(top);
    const results = document.createElement('div');
    results.className = 'ds-results'; results.hidden = true; results.setAttribute('aria-live', 'polite');
    side.appendChild(results);
    const listBox = document.createElement('div');
    listBox.className = 'ds-list';
    // Two groups: Foundation, then every component A–Z with its level as a small label
    const SORTED = REG.slice().sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    const lvlTag = l => ({ Atoms: 'Atom', Molecules: 'Molecule', Organisms: 'Organism' }[l] || l);
    let html = '<div class="grp">Foundation</div>';
    FOUNDATIONS.forEach(([id, n]) => { html += `<a href="../index.html#${id}">${n}</a>`; });
    html += `<div class="grp">Components · ${SORTED.length}</div>`;
    SORTED.forEach(c => { html += `<a class="ds-item" href="${c.id}.html"${c.id === here ? ' aria-current="page"' : ''}><span>${c.name}</span><span class="ds-lvl">${lvlTag(c.level)}</span></a>`; });
    listBox.innerHTML = html;
    listBox.style.display = 'flex'; listBox.style.flexDirection = 'column'; listBox.style.gap = '2px';
    side.appendChild(listBox);

    const shell = document.createElement('div');
    shell.className = 'ds-shell';
    wrap.parentNode.insertBefore(shell, wrap);
    shell.appendChild(side);
    shell.appendChild(wrap);

    /* ── search ── */
    const input = top.querySelector('#ds-search-input');
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    function runSearch() {
      const q = input.value.trim();
      if (!q) { results.hidden = true; listBox.hidden = false; results.innerHTML = ''; return; }
      const hits = window.pdsSearch ? window.pdsSearch(q) : [];
      listBox.hidden = true; results.hidden = false;
      results.innerHTML = `<div class="grp">${hits.length} result${hits.length === 1 ? '' : 's'}</div>` + (hits.length
        ? hits.map((r, i) => `<a href="${r.c.id}.html"${i === 0 ? ' class="is-first"' : ''}${r.c.id === here ? ' aria-current="page"' : ''}><span>${esc(r.c.name)}</span><span class="lvl">${esc(r.c.level)}</span>${r.hit ? `<span class="aka">also called “${esc(r.hit)}”</span>` : ''}</a>`).join('')
        : '<div class="none">No component matches. Try another word, e.g. dialog, chip, drawer.</div>');
    }
    input.addEventListener('input', runSearch);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { const a = results.querySelector('a'); if (a) location.href = a.getAttribute('href'); }
      if (e.key === 'Escape') { input.value = ''; runSearch(); input.blur(); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !/^(input|textarea|select)$/i.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { e.preventDefault(); input.focus(); }
    });

    /* ── theme switch: fixed spot in the sidebar (or next to the Go-to menu on narrow screens) ── */
    const theme = wrap.querySelector('.theme');
    const slot = top.querySelector('.ds-theme-slot');

    /* ── narrow screens: Go-to menu ── */
    const jump = document.createElement('div');
    jump.className = 'ds-jump';
    let opts = '<option value="../index.html">Pando DS V1 — home</option><optgroup label="Components (A–Z)">' +
      SORTED.map(c => `<option value="${c.id}.html"${c.id === here ? ' selected' : ''}>${c.name}</option>`).join('') + '</optgroup>';
    jump.innerHTML = '<label style="flex:1;display:flex;min-width:0"><span style="position:absolute;left:-9999px">Go to</span><select>' + opts + '</select></label><span class="ds-theme-slot-m"></span>';
    wrap.insertBefore(jump, wrap.firstChild);
    jump.querySelector('select').addEventListener('change', e => { location.href = e.target.value; });
    if (theme) {
      const mq = matchMedia('(max-width:820px)');
      const place = () => (mq.matches ? jump.querySelector('.ds-theme-slot-m') : slot).appendChild(theme);
      place(); mq.addEventListener ? mq.addEventListener('change', place) : mq.addListener(place);
    }

    /* ── "Also known as" under the title ── */
    const h1 = wrap.querySelector('h1');
    if (h1 && me && me.aka && me.aka.length && !wrap.querySelector('.ds-aka')) {
      const p = document.createElement('p');
      p.className = 'ds-aka';
      p.innerHTML = '<b>Also known as:</b> ' + me.aka.slice(0, 10).map(esc).join(' · ');
      h1.insertAdjacentElement('afterend', p);
    }

    /* ── "On this page": sticky section bar with scroll-spy ── */
    const secs = [...wrap.querySelectorAll('section')].filter(s => s.querySelector(':scope > h2'));
    if (secs.length > 1) {
      secs.forEach((s, i) => { if (!s.id) s.id = 'sec-' + (i + 1); s.setAttribute('data-ds-section', ''); });
      const bar = document.createElement('nav');
      bar.className = 'ds-onpage'; bar.setAttribute('aria-label', 'On this page');
      bar.innerHTML = '<span class="lbl">On this page</span>' + secs.map(s => {
        const h = s.querySelector(':scope > h2').cloneNode(true);
        h.querySelectorAll('[data-flag]').forEach(b => b.remove());
        return `<a href="#${s.id}">${esc(h.textContent.trim())}</a>`;
      }).join('');
      const oldToc = wrap.querySelector('nav.toc');
      if (oldToc) { oldToc.replaceWith(bar); }
      else { const hd = wrap.querySelector('header'); (hd || wrap.firstElementChild).insertAdjacentElement('afterend', bar); }
      const links = [...bar.querySelectorAll('a')];
      const setActive = id => links.forEach(a => {
        const on = a.getAttribute('href') === '#' + id;
        if (on && a.getAttribute('aria-current') !== 'true') a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
      bar.addEventListener('click', e => {
        const a = e.target.closest('a'); if (!a) return;
        const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t) return;
        e.preventDefault(); t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        setActive(t.id); history.replaceState(null, '', '#' + t.id);
      });
      const scroller = () => (getComputedStyle(wrap).overflowY === 'auto' ? wrap : window);
      const spy = () => {
        const sc = scroller(); const topY = (sc === window ? 0 : wrap.getBoundingClientRect().top) + bar.offsetHeight + 24;
        let cur = secs[0].id;
        secs.forEach(s => { if (s.getBoundingClientRect().top <= topY) cur = s.id; });
        const atEnd = sc === window ? (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) : (wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight - 2);
        if (atEnd) cur = secs[secs.length - 1].id;
        setActive(cur);
      };
      wrap.addEventListener('scroll', spy, { passive: true });
      window.addEventListener('scroll', spy, { passive: true });
      spy();
    }

    const cur = side.querySelector('[aria-current="page"]');
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
  }

  start();
})();
