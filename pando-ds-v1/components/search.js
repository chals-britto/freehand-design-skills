/* Pando DS V1 — component search over registry.js (name, id, description, level, synonyms).
   window.pdsSearch(query) → [{ c, score, hit }] best first; hit = the synonym that matched, if any.
   Matching ignores case, spaces, hyphens and plurals: "pop ups" = "pop-up" = "popup". */
(function () {
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const stem = t => t.length > 4 && t.endsWith('es') && !t.endsWith('ses') ? t.slice(0, -2)
                  : t.length > 3 && t.endsWith('s') && !t.endsWith('ss') ? t.slice(0, -1) : t;
  window.pdsSearch = function (query) {
    const q = String(query || '').trim();
    if (!q) return [];
    const whole = stem(norm(q));
    const toks = q.toLowerCase().split(/[\s,]+/).map(norm).filter(Boolean).map(stem);
    // "word-start" match: the query must begin a word (or the whole phrase), so "log" ≠ "logo"/"dialog"
    const words = s => String(s || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const startsWord = (text, t) => { const n = norm(text); if (n === t || stem(n) === t) return 'exact';
      if (n.startsWith(t) && t.length >= 4) return 'start'; return words(text).some(w => w === t || stem(w) === t) ? 'word'
        : words(text).some(w => w.startsWith(t) && t.length >= 4 && w.length - t.length <= 2) ? 'word' : ''; };
    const out = [];
    (window.PDS_REGISTRY || []).forEach(c => {
      const aka = (c.aka || []).map(a => ({ raw: a, n: norm(a) }));
      const fields = [c.name, c.id, c.desc, c.level].concat(c.aka || []);
      let score = 0, hit = '';
      const nm = startsWord(c.name, whole) || startsWord(c.id, whole);
      if (nm === 'exact') score = 100; else if (nm === 'start') score = 80; else if (nm === 'word') score = 70;
      if (!score) {
        const ex = aka.find(a => a.n === whole || stem(a.n) === whole);
        const pt = ex ? null : aka.find(a => startsWord(a.raw, whole));
        if (ex) { score = 60; hit = ex.raw; } else if (pt) { score = 45; hit = pt.raw; }
        else if (startsWord(c.desc, whole)) score = 30;
        else if (toks.length > 1 && toks.every(t => fields.some(f => startsWord(f, t)))) {
          score = 20; const a = aka.find(a => toks.some(t => startsWord(a.raw, t))); if (a) hit = a.raw;
        }
      }
      if (score) out.push({ c, score, hit });
    });
    return out.sort((a, b) => b.score - a.score || a.c.name.localeCompare(b.c.name));
  };
})();
