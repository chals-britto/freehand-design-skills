/* Freehand V1 Enhanced Studio: list-inside-a-detail-page behaviours
   (the dispute docket pattern; reuse for any list inside a scrolling detail column).

   Markup this expects:
     <section class="scroll">                 the scrolling column (overflow:auto)
       <div class="tabs" style="position:sticky;top:0">…</div>   optional pinned tabs
       …content above the list…
       <section class="list">
         <div class="fh-cbar">…title, search, filters, sort…</div>   position:sticky
         …cards…
       </section>
     </section>
     <div class="fh-foot list-foot">…pager…</div>  sibling of .scroll, inside a position:relative parent
     <button class="fh-ask">…</button>             Ask Freehand (position:fixed)

   What it does, and why:
   1. Pinned state: the bar is "stuck" once the list has scrolled under it. Only then does the
      divider show, the pager slide in, and Ask Freehand move up (so the pager never covers it).
   2. Minimum space: the list always keeps just enough height for the bar to reach its pinned spot,
      measured from the real elements (never a fixed number), so a short result never pulls the page up.
   3. Anchoring: after a search, filter, sort, rows-per-page or page change made while pinned,
      the bar stays where it is and results start right below it. No jump.
   4. Re-renders keep state: call watch() after every render; it restores the pinned state and size. */

function fhListWatch({scroll, list, bar, foot, ask, state}){
  // state is a plain object you keep across renders: {stuck:false, anchor:false, minH:0}
  if(!scroll||!list||!bar) return;
  const tabs = scroll.querySelector('.tabs');
  const pinTop = () => tabs ? tabs.offsetHeight : 0;

  // keep the footer on the bottom edge of the column (outside the scroll area), measured
  const place = () => {
    if(!foot) return;
    foot.style.position = 'absolute';
    foot.style.left = scroll.offsetLeft + 'px';
    foot.style.width = scroll.clientWidth + 'px';
    const parent = foot.offsetParent || document.body;
    foot.style.bottom = Math.max(0, Math.round(parent.getBoundingClientRect().bottom - innerHeight)) + 'px';
  };

  // (2) minimum space = visible column height − pinned tabs − column bottom padding
  const size = () => {
    const padB = parseFloat(getComputedStyle(scroll).paddingBottom) || 0;
    state.minH = Math.max(0, Math.round(scroll.clientHeight - pinTop() - padB));
    list.style.minHeight = state.minH + 'px';
    place();
  };

  // (1) pinned when the list's top has gone above the bar
  const check = () => {
    const stuck = list.getBoundingClientRect().top < bar.getBoundingClientRect().top - 1;
    state.stuck = stuck;
    bar.classList.toggle('stuck', stuck);
    if(foot) foot.classList.toggle('show', stuck);
    if(ask) ask.classList.toggle('up', stuck && !!foot);
  };

  size();
  // (3) anchor after a list change made while pinned (+2px keeps it counted as pinned)
  if(state.anchor){
    state.anchor = false;
    if(state.stuck) scroll.scrollTop += list.getBoundingClientRect().top - scroll.getBoundingClientRect().top - pinTop() + 2;
  }
  check();
  scroll.addEventListener('scroll', check, {passive:true});
  if(state.ro) state.ro.disconnect();
  state.ro = new ResizeObserver(() => { size(); check(); });
  state.ro.observe(scroll);
}

/* CSS that goes with it:
   .list-foot{transform:translateY(100%);opacity:0;pointer-events:none;transition:transform .28s ease,opacity .2s ease}
   .list-foot.show{transform:none;opacity:1;pointer-events:auto}
   .fh-ask{position:fixed;right:24px;bottom:20px;transition:bottom .28s ease}
   .fh-ask.up{bottom:76px}          footer 52px + 24px gap
   Render tip: when your markup is rebuilt, write min-height:${state.minH}px on the list in the template
   so restoring the scroll position never gets clamped, then call fhListWatch() again.
   Opening a different record: set scrollTop = 0 and reset state.stuck before rendering. */
