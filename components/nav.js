/* Pando DS V1 — shared sidebar for every component page.
   Reads the component list from registry.js (loaded first, or loaded here).
   Current page is highlighted. On narrow screens it becomes a "Go to" menu. */
(function () {
  function start() {
    const FOUNDATIONS = [
      ['roles', 'Colour roles'], ['palette', 'Palette'], ['status', 'Status & tags'],
      ['gradients', 'Gradients'], ['type', 'Type scale'], ['elevation', 'Elevation'], ['pairs', 'Contrast pairs']
    ];
    const REG = window.PDS_REGISTRY || [];
    const LEVELS = window.PDS_LEVELS || ['Atoms', 'Molecules', 'Organisms'];
    const here = (location.pathname.split('/').pop() || '').replace('.html', '');
    const wrap = document.querySelector('body > .wrap');
    if (!wrap || document.querySelector('.ds-side')) return;

    const css = document.createElement('style');
    css.textContent = `
    .ds-shell{max-width:1260px;margin:0 auto;display:grid;grid-template-columns:200px minmax(0,1fr);gap:32px}
    .ds-shell > .wrap{max-width:none;margin:0;min-width:0}
    .ds-side{position:sticky;top:env(safe-area-inset-top,0px);align-self:start;max-height:100vh;overflow:auto;padding:24px 0 24px;display:flex;flex-direction:column;gap:2px}
    .ds-side a{color:var(--pg-muted);text-decoration:none;font-size:13px;padding:4px 8px;border-radius:6px}
    .ds-side a:hover{background:var(--pg-soft);color:var(--pg-ink)}
    .ds-side a[aria-current="page"]{background:var(--pg-soft);color:var(--pg-ink);font-weight:600;box-shadow:inset 2px 0 0 var(--pg-accent)}
    .ds-side .grp{font:500 10.5px var(--pg-ui);letter-spacing:.08em;text-transform:uppercase;color:var(--pg-muted);margin:14px 8px 4px}
    .ds-side .home{font-weight:600;color:var(--pg-ink)}
    .ds-jump{display:none;margin-top:16px}
    .ds-jump select{font:400 13px var(--pg-ui);padding:6px 8px;border:1px solid var(--pg-line);border-radius:6px;background:var(--pg-panel);color:var(--pg-ink);width:100%}
    /* Desktop: two independent scroll areas — sidebar and content. The page itself doesn't scroll. */
    @media (min-width:821px){
      html,body{height:100%;overflow:hidden}
      body{padding-block:0}
      .ds-shell{height:100%}
      .ds-side{position:static;height:100%;max-height:none;overflow-y:auto;overscroll-behavior:contain;padding-right:8px}
      .ds-shell > .wrap{height:100%;overflow-y:auto;overscroll-behavior:contain;padding-bottom:64px;padding-right:4px}
      .ds-side,.ds-shell > .wrap{scrollbar-width:thin;scrollbar-color:var(--pg-line) transparent}
      .ds-side::-webkit-scrollbar,.ds-shell > .wrap::-webkit-scrollbar{width:8px}
      .ds-side::-webkit-scrollbar-thumb,.ds-shell > .wrap::-webkit-scrollbar-thumb{background:var(--pg-line);border-radius:8px}
      .ds-side::-webkit-scrollbar-track,.ds-shell > .wrap::-webkit-scrollbar-track{background:transparent}
    }
    @media (max-width:820px){.ds-shell{grid-template-columns:1fr}.ds-side{display:none}.ds-jump{display:block}.ds-shell > .wrap{overflow-x:auto}}`;
    document.head.appendChild(css);

    const side = document.createElement('nav');
    side.className = 'ds-side';
    side.setAttribute('aria-label', 'Design system');
    let html = '<a class="home" href="../index.html">Pando DS V1</a><div class="grp">Foundations</div>';
    FOUNDATIONS.forEach(([id, n]) => { html += `<a href="../index.html#${id}">${n}</a>`; });
    LEVELS.forEach(level => {
      const items = REG.filter(c => c.level === level);
      if (!items.length) return;
      html += `<div class="grp">${level}</div>`;
      items.forEach(c => { html += `<a href="${c.id}.html"${c.id === here ? ' aria-current="page"' : ''}>${c.name}</a>`; });
    });
    side.innerHTML = html;

    const shell = document.createElement('div');
    shell.className = 'ds-shell';
    wrap.parentNode.insertBefore(shell, wrap);
    shell.appendChild(side);
    shell.appendChild(wrap);

    const jump = document.createElement('label');
    jump.className = 'ds-jump';
    let opts = '<option value="../index.html">Pando DS V1 — home</option>';
    LEVELS.forEach(level => {
      const items = REG.filter(c => c.level === level);
      if (!items.length) return;
      opts += `<optgroup label="${level}">` + items.map(c => `<option value="${c.id}.html"${c.id === here ? ' selected' : ''}>${c.name}</option>`).join('') + '</optgroup>';
    });
    jump.innerHTML = '<span style="position:absolute;left:-9999px">Go to</span><select>' + opts + '</select>';
    wrap.insertBefore(jump, wrap.firstChild);
    jump.querySelector('select').addEventListener('change', e => { location.href = e.target.value; });

    const cur = side.querySelector('[aria-current="page"]');
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
  }
  if (window.PDS_REGISTRY) { start(); return; }
  const s = document.createElement('script');
  s.src = 'registry.js';
  s.onload = start;
  s.onerror = start;
  document.head.appendChild(s);
})();
