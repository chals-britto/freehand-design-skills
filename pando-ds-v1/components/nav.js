/* Pando DS V1 — shared page chrome for every component page.
   Layout (desktop):  [ header: Pando DS V1 / <component> <level>          Light|Dark ]
                      [ left sidebar | content (scrolls) | on-this-page rail          ]
   • Left sidebar: search (synonyms), Foundation, Components A–Z with level labels.
   • Right rail: sections (h2) and sub-sections (h3) of the page; marker follows the scroll; click jumps.
   • Back-to-top button once the content is scrolled.
   • < 1100px: rail hidden.  < 820px: sidebar replaced by a "Go to" menu.
   Loads registry.js and search.js itself if the page hasn't. */
(function () {
  function load(src) { return new Promise(r => { const s = document.createElement('script'); s.src = src; s.onload = r; s.onerror = r; document.head.appendChild(s); }); }
  async function start() {
    if (!window.PDS_REGISTRY) await load('registry.js');
    if (!window.pdsSearch) await load('search.js');
    build();
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const lvlTag = l => ({ Atoms: 'Atom', Molecules: 'Molecule', Organisms: 'Organism' }[l] || l);

  function build() {
    const FOUNDATIONS = [
      ['roles', 'Colour roles'], ['palette', 'Palette'], ['status', 'Status & tags'],
      ['gradients', 'Gradients'], ['type', 'Type scale'], ['elevation', 'Elevation'], ['pairs', 'Contrast pairs']
    ];
    const REG = window.PDS_REGISTRY || [];
    const SORTED = REG.slice().sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    const here = (location.pathname.split('/').pop() || '').replace('.html', '');
    const me = REG.find(c => c.id === here);
    const wrap = document.querySelector('body > .wrap');
    if (!wrap || document.querySelector('.ds-side')) return;

    const css = document.createElement('style');
    css.textContent = `
    .ds-header{display:flex;align-items:center;gap:10px;height:52px;box-sizing:border-box;padding:0 max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));margin:0 calc(-1 * max(16px,env(safe-area-inset-right,0px))) 0 calc(-1 * max(16px,env(safe-area-inset-left,0px)));border-bottom:1px solid var(--pg-line);background:var(--pg-panel)}
    .ds-header .brand{font:600 15px var(--pg-ui);color:var(--pg-ink);text-decoration:none;white-space:nowrap}
    .ds-header .brand:hover{color:var(--pg-accent)}
    .ds-header .sep{color:var(--pg-muted)}
    .ds-header .cur{font:500 14px var(--pg-ui);color:var(--pg-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
    .ds-header .lvl{font-size:11px;color:var(--pg-muted);border:1px solid var(--pg-line);border-radius:999px;padding:1px 8px;white-space:nowrap}
    .ds-header .sp{flex:1}
    .ds-header .theme{margin:0;flex:none}
    .ds-shell{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:220px minmax(0,1fr) 200px;gap:28px}
    .ds-shell > .wrap{max-width:none;margin:0;min-width:0}
    .ds-side{padding:20px 0 24px;display:flex;flex-direction:column;gap:2px}
    .ds-side a{color:var(--pg-muted);text-decoration:none;font-size:13px;padding:4px 8px;border-radius:6px}
    .ds-side a:hover{background:var(--pg-soft);color:var(--pg-ink)}
    .ds-side a[aria-current="page"]{background:var(--pg-soft);color:var(--pg-ink);font-weight:600;box-shadow:inset 2px 0 0 var(--pg-accent)}
    .ds-side a.ds-item{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
    .ds-side .ds-lvl{flex:none;font-size:10px;color:var(--pg-muted);opacity:.8}
    .ds-side .grp{font:500 10.5px var(--pg-ui);letter-spacing:.08em;text-transform:uppercase;color:var(--pg-muted);margin:14px 8px 4px}
    .ds-top{padding:20px 8px 10px;margin:-20px 0 4px;border-bottom:1px solid var(--pg-line);position:sticky;top:0;z-index:2;background:var(--pg-bg)}
    .ds-search{position:relative}
    .ds-search input{width:100%;box-sizing:border-box;font:400 13px var(--pg-ui);padding:7px 28px 7px 9px;border:1px solid var(--pg-line);border-radius:6px;background:var(--pg-panel);color:var(--pg-ink)}
    .ds-search input:focus-visible{outline:2px solid var(--pg-accent);outline-offset:1px}
    .ds-search kbd{position:absolute;right:7px;top:50%;transform:translateY(-50%);font:500 11px var(--pg-mono,monospace);color:var(--pg-muted);border:1px solid var(--pg-line);border-radius:4px;padding:0 4px;pointer-events:none}
    .ds-results,.ds-list{display:flex;flex-direction:column;gap:2px}
    .ds-results[hidden],.ds-list[hidden]{display:none}
    .ds-results a{display:flex;flex-direction:column;gap:1px}
    .ds-results a.is-first{background:var(--pg-soft);color:var(--pg-ink)}
    .ds-results .lvl{font-size:10.5px;color:var(--pg-muted)}
    .ds-results .aka{font-size:11px;color:var(--pg-accent)}
    .ds-results .none{font-size:12.5px;color:var(--pg-muted);padding:4px 8px}
    .ds-aka{font-size:12.5px;color:var(--pg-muted);margin:4px 0 0;max-width:72ch}
    .ds-aka b{font-weight:600;color:var(--pg-ink)}
    .ds-toc{padding:24px 0;font-size:13px}
    .ds-toc .ttl{font:500 10.5px var(--pg-ui);letter-spacing:.08em;text-transform:uppercase;color:var(--pg-muted);margin:0 0 10px 14px}
    .ds-toc ul{list-style:none;margin:0;padding:0}
    .ds-toc > ul{border-left:1px solid var(--pg-line)}
    .ds-toc a{display:block;color:var(--pg-ink);text-decoration:none;padding:4px 8px 4px 14px;margin-left:-1px;border-left:2px solid transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ds-toc ul ul a{padding-left:28px;color:var(--pg-muted);font-size:12.5px}
    .ds-toc a:hover{color:var(--pg-accent)}
    .ds-toc a[aria-current="true"]{color:var(--pg-accent);border-left-color:var(--pg-accent)}
    .ds-toc a:focus-visible{outline:2px solid var(--pg-accent);outline-offset:-2px;border-radius:4px}
    .ds-totop{position:fixed;right:max(24px,env(safe-area-inset-right,0px));bottom:max(24px,env(safe-area-inset-bottom,0px));width:44px;height:44px;border-radius:50%;border:1px solid var(--pg-line);background:var(--pg-panel);color:var(--pg-ink);box-shadow:0 4px 14px rgb(0 0 0 / .12);cursor:pointer;display:grid;place-items:center;z-index:30;opacity:0;pointer-events:none;transition:opacity .15s}
    .ds-totop.on{opacity:1;pointer-events:auto}
    .ds-totop:hover{color:var(--pg-accent)}
    .ds-totop:focus-visible{outline:2px solid var(--pg-accent);outline-offset:2px}
    .ds-shell [data-ds-anchor]{scroll-margin-top:16px}
    .ds-jump{display:none;margin-top:16px}
    .ds-jump select{font:400 13px var(--pg-ui);padding:6px 8px;border:1px solid var(--pg-line);border-radius:6px;background:var(--pg-panel);color:var(--pg-ink);width:100%}
    @media (min-width:821px){
      html,body{height:100%;overflow:hidden}
      body{padding-block:0;display:flex;flex-direction:column}
      .ds-header{flex:none}
      .ds-shell{flex:1;min-height:0;width:100%}
      .ds-side,.ds-toc,.ds-shell > .wrap{height:100%;box-sizing:border-box;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--pg-line) transparent}
      .ds-side{padding-right:8px}
      .ds-shell > .wrap{padding-bottom:64px;padding-right:4px}
      .ds-side::-webkit-scrollbar,.ds-toc::-webkit-scrollbar,.ds-shell > .wrap::-webkit-scrollbar{width:8px}
      .ds-side::-webkit-scrollbar-thumb,.ds-toc::-webkit-scrollbar-thumb,.ds-shell > .wrap::-webkit-scrollbar-thumb{background:var(--pg-line);border-radius:8px}
    }
    @media (max-width:1100px){.ds-shell{grid-template-columns:220px minmax(0,1fr)}.ds-toc{display:none}}
    @media (max-width:820px){.ds-shell{grid-template-columns:1fr}.ds-side{display:none}.ds-jump{display:block}.ds-shell > .wrap{overflow-x:auto}.ds-header .lvl{display:none}}`;
    document.head.appendChild(css);

    /* ── header: Pando DS V1 / Component …… theme ── */
    const header = document.createElement('header');
    header.className = 'ds-header';
    header.innerHTML = `<a class="brand" href="../index.html">Pando DS V1</a>` +
      (me ? `<span class="sep" aria-hidden="true">/</span><span class="cur">${esc(me.name)}</span><span class="lvl">${lvlTag(me.level)}</span>` : '') +
      `<span class="sp"></span>`;
    const theme = wrap.querySelector('.theme');
    if (theme) header.appendChild(theme);

    /* ── left sidebar ── */
    const side = document.createElement('nav');
    side.className = 'ds-side';
    side.setAttribute('aria-label', 'Design system');
    side.innerHTML = `<div class="ds-top"><div class="ds-search" role="search"><input type="search" id="ds-search-input" placeholder="Search components…" aria-label="Search components (synonyms work: dialog, pop-up, chip…)" autocomplete="off"><kbd>/</kbd></div></div>
      <div class="ds-results" hidden aria-live="polite"></div>
      <div class="ds-list"><div class="grp">Foundation</div>${FOUNDATIONS.map(([id, n]) => `<a href="../index.html#${id}">${n}</a>`).join('')}
      <div class="grp">Components · ${SORTED.length}</div>${SORTED.map(c => `<a class="ds-item" href="${c.id}.html"${c.id === here ? ' aria-current="page"' : ''}><span>${esc(c.name)}</span><span class="ds-lvl">${lvlTag(c.level)}</span></a>`).join('')}</div>`;

    /* ── right rail ── */
    const toc = document.createElement('nav');
    toc.className = 'ds-toc';
    toc.setAttribute('aria-label', 'On this page');

    const shell = document.createElement('div');
    shell.className = 'ds-shell';
    wrap.parentNode.insertBefore(header, wrap);
    wrap.parentNode.insertBefore(shell, wrap);
    shell.appendChild(side); shell.appendChild(wrap); shell.appendChild(toc);

    /* ── search ── */
    const input = side.querySelector('#ds-search-input'), results = side.querySelector('.ds-results'), listBox = side.querySelector('.ds-list');
    function runSearch() {
      const q = input.value.trim();
      if (!q) { results.hidden = true; listBox.hidden = false; results.innerHTML = ''; return; }
      const hits = window.pdsSearch ? window.pdsSearch(q) : [];
      listBox.hidden = true; results.hidden = false;
      results.innerHTML = `<div class="grp">${hits.length} result${hits.length === 1 ? '' : 's'}</div>` + (hits.length
        ? hits.map((r, i) => `<a href="${r.c.id}.html"${i === 0 ? ' class="is-first"' : ''}${r.c.id === here ? ' aria-current="page"' : ''}><span>${esc(r.c.name)}</span><span class="lvl">${lvlTag(r.c.level)}</span>${r.hit ? `<span class="aka">also called “${esc(r.hit)}”</span>` : ''}</a>`).join('')
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

    /* ── narrow screens: Go-to menu ── */
    const jump = document.createElement('label');
    jump.className = 'ds-jump';
    jump.innerHTML = '<span style="position:absolute;left:-9999px">Go to</span><select><option value="../index.html">Pando DS V1 — home</option><optgroup label="Components (A–Z)">' +
      SORTED.map(c => `<option value="${c.id}.html"${c.id === here ? ' selected' : ''}>${esc(c.name)}</option>`).join('') + '</optgroup></select>';
    wrap.insertBefore(jump, wrap.firstChild);
    jump.querySelector('select').addEventListener('change', e => { location.href = e.target.value; });

    /* ── the page's own crumbs and section links now live in the header and rail ── */
    const crumbs = wrap.querySelector('.crumbs'); if (crumbs) crumbs.style.display = 'none';
    const oldToc = wrap.querySelector('nav.toc'); if (oldToc) oldToc.style.display = 'none';

    /* ── "Also known as" under the title ── */
    const h1 = wrap.querySelector('h1');
    if (h1 && me && me.aka && me.aka.length && !wrap.querySelector('.ds-aka')) {
      const p = document.createElement('p');
      p.className = 'ds-aka';
      p.innerHTML = '<b>Also known as:</b> ' + me.aka.slice(0, 10).map(esc).join(' · ');
      h1.insertAdjacentElement('afterend', p);
    }

    /* ── right rail: sections (h2) + sub-sections (h3), scroll-spy ── */
    const label = h => { const c = h.cloneNode(true); c.querySelectorAll('[data-flag],button').forEach(b => b.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
    const secs = [...wrap.querySelectorAll('section')].filter(s => s.querySelector(':scope > h2'));
    const anchors = [];
    let tocHtml = '<div class="ttl">On this page</div><ul>';
    secs.forEach((s, i) => {
      if (!s.id) s.id = 'sec-' + (i + 1);
      s.setAttribute('data-ds-anchor', '');
      anchors.push(s);
      const title = label(s.querySelector(':scope > h2'));
      const subs = [...s.querySelectorAll('h3')].filter(h => label(h)).slice(0, 14);
      let sub = '';
      if (subs.length > 1) {
        sub = '<ul>' + subs.map((h, j) => {
          if (!h.id) h.id = s.id + '-' + (j + 1);
          h.setAttribute('data-ds-anchor', ''); anchors.push(h);
          const t = label(h); return `<li><a href="#${h.id}" title="${esc(t)}">${esc(t)}</a></li>`;
        }).join('') + '</ul>';
      }
      tocHtml += `<li><a href="#${s.id}" title="${esc(title)}">${esc(title)}</a>${sub}</li>`;
    });
    toc.innerHTML = secs.length > 1 ? tocHtml + '</ul>' : '';

    const links = [...toc.querySelectorAll('a')];
    const scroller = () => (getComputedStyle(wrap).overflowY === 'auto' ? wrap : window);
    const smooth = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const setActive = id => links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      if (on && a.getAttribute('aria-current') !== 'true') {
        const r = a.getBoundingClientRect(), t = toc.getBoundingClientRect();
        if (r.top < t.top || r.bottom > t.bottom) toc.scrollTop += r.top - t.top - t.height / 2;
      }
      on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
    });

    /* ── back to top ── */
    const totop = document.createElement('button');
    totop.type = 'button'; totop.className = 'ds-totop'; totop.setAttribute('aria-label', 'Back to top');
    totop.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h10M8 14V5M4 9l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    totop.addEventListener('click', () => { const sc = scroller(); sc.scrollTo({ top: 0, behavior: smooth() }); });
    document.body.appendChild(totop);

    let lock = 0;
    toc.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a) return;
      const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t) return;
      e.preventDefault(); lock = Date.now(); setActive(t.id);
      t.scrollIntoView({ behavior: smooth(), block: 'start' });
      history.replaceState(null, '', '#' + t.id);
    });
    const spy = () => {
      const sc = scroller();
      totop.classList.toggle('on', (sc === window ? scrollY : wrap.scrollTop) > 400);
      if (Date.now() - lock < 800 || !anchors.length) return;
      const topY = (sc === window ? 0 : wrap.getBoundingClientRect().top) + 40;
      let cur = anchors[0].id;
      anchors.forEach(a => { if (a.getBoundingClientRect().top <= topY) cur = a.id; });
      const atEnd = sc === window ? (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) : (wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight - 2);
      if (atEnd) { const last = secs[secs.length - 1]; if (last && last.getBoundingClientRect().top > topY) cur = last.id; }
      setActive(cur);
    };
    wrap.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('scroll', spy, { passive: true });
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView({ block: 'start' }); }
    spy();

    const cur = side.querySelector('[aria-current="page"]');
    if (cur) { const r = cur.getBoundingClientRect(), sr = side.getBoundingClientRect(); if (r.bottom > sr.bottom || r.top < sr.top + 60) side.scrollTop += r.top - sr.top - sr.height / 2; }
  }

  start();
})();
