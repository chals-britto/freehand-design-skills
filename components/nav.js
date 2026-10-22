/* Pando DS V1 — shared sidebar for every component page.
   Same list as the library home (index.html). Current page is highlighted.
   On narrow screens the sidebar becomes a "Go to" menu at the top. */
(function () {
  const FOUNDATIONS = [
    ['roles', 'Colour roles'], ['palette', 'Palette'], ['status', 'Status & tags'],
    ['gradients', 'Gradients'], ['type', 'Type scale'], ['elevation', 'Elevation'], ['pairs', 'Contrast pairs']
  ];
  const COMPONENTS = [
    ['toast', 'Toast'], ['button', 'Buttons'], ['input', 'Inputs'], ['dropdown', 'Dropdown'],
    ['checkbox', 'Checkbox'], ['radio', 'Radio Buttons'], ['toggle', 'Toggle'], ['range', 'Range'],
    ['accordion', 'Accordion'], ['breadcrumb', 'Breadcrumb'], ['badge', 'Badges & Callouts'],
    ['avatar', 'Avatars'], ['tag', 'Tags'], ['status', 'Status'], ['tooltip', 'Tooltips'],
    ['icons', 'Icons'], ['scrollbar', 'Scrollbar']
  ];
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
  @media (max-width:820px){.ds-shell{grid-template-columns:1fr}.ds-side{display:none}.ds-jump{display:block}.ds-shell > .wrap{overflow-x:auto}}`;
  document.head.appendChild(css);

  const side = document.createElement('nav');
  side.className = 'ds-side';
  side.setAttribute('aria-label', 'Design system');
  let html = '<a class="home" href="../index.html">Pando DS V1</a><div class="grp">Foundations</div>';
  FOUNDATIONS.forEach(([id, n]) => { html += `<a href="../index.html#${id}">${n}</a>`; });
  html += '<div class="grp">Components</div>';
  COMPONENTS.forEach(([id, n]) => { html += `<a href="${id}.html"${id === here ? ' aria-current="page"' : ''}>${n}</a>`; });
  side.innerHTML = html;

  const shell = document.createElement('div');
  shell.className = 'ds-shell';
  wrap.parentNode.insertBefore(shell, wrap);
  shell.appendChild(side);
  shell.appendChild(wrap);

  // narrow screens: a select at the top of the page
  const jump = document.createElement('label');
  jump.className = 'ds-jump';
  jump.innerHTML = '<span class="sr-only" style="position:absolute;left:-9999px">Go to</span><select id="ds-jump-select"><option value="../index.html">Pando DS V1 — home</option>' +
    COMPONENTS.map(([id, n]) => `<option value="${id}.html"${id === here ? ' selected' : ''}>${n}</option>`).join('') + '</select>';
  wrap.insertBefore(jump, wrap.firstChild);
  jump.querySelector('select').addEventListener('change', e => { location.href = e.target.value; });

  const cur = side.querySelector('[aria-current="page"]');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
})();
