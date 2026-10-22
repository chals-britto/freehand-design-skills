"""Build a batch review board from per-component JSON files.
usage: python3 build_batch.py <template.html> <json_dir> <out.html> <title> <eyebrow>"""
import sys, json, glob, os, re

tpl, jdir, out, title, eyebrow = sys.argv[1:6]
s = open(tpl).read()

ORDER = ["buttons", "inputs", "dropdown", "checkbox", "radio", "toggle", "range"]
files = sorted(glob.glob(os.path.join(jdir, "*.json")), key=lambda f: ORDER.index(os.path.basename(f)[:-5]) if os.path.basename(f)[:-5] in ORDER else 99)
GROUP_LABEL = {"variants": "Variants", "states": "States", "anatomy": "Anatomy & spacing", "docs": "Figma docs", "loose": "Loose / old frames", "gaps": "Industry gaps"}
GROUP_ORDER = ["variants", "states", "anatomy", "docs", "loose", "gaps"]
groups, missing = [], []
for f in files:
    try:
        d = json.load(open(f))
    except Exception as e:
        missing.append(f"{os.path.basename(f)}: {e}")
        continue
    cid = os.path.basename(f)[:-5]
    items = []
    for it in d.get("items", []):
        it = dict(it)
        it["id"] = cid + "--" + str(it.get("id", len(items)))
        it["grp"] = it.get("group", "variants")
        if it.get("html"):
            it["html"] = re.sub(r"<\s*script[\s\S]*?<\s*/\s*script\s*>", "", it["html"], flags=re.I)
            it["html"] = re.sub(r"\son\w+\s*=\s*(\"[^\"]*\"|'[^']*')", "", it["html"])
        if it.get("k") == "gap":
            it.pop("def", None)
        items.append(it)
    items.sort(key=lambda x: GROUP_ORDER.index(x["grp"]) if x["grp"] in GROUP_ORDER else 9)
    extra = []
    if d.get("newTextStyles"): extra.append("New text styles found: " + ", ".join(d["newTextStyles"]))
    if d.get("notReadable"): extra.append("Couldn’t read: " + "; ".join(d["notReadable"]))
    groups.append({"id": cid, "tab": d.get("component", cid), "title": d.get("component", cid) + f" · page {d.get('pageId','')}",
                   "sub": d.get("summary", "") + ((" " + " ".join(extra)) if extra else ""), "items": items})

data = "const FIG=\"https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=\";\nconst S={};\nconst GLABEL=" + json.dumps(GROUP_LABEL) + ";\nconst GROUPS=" + json.dumps(groups, ensure_ascii=False) + ";\n"
a = s.index("const FIG="); b = s.index("const ALL=")
s = s[:a] + data + s[b:]

# viz: render agent html
s = s.replace('  if(it.k==="toast")return', '  if(it.html)return `<div class="hz">${it.html}</div>`;\n  if(it.k==="toast")return', 1)
# sources as objects
s = s.replace('const src=(it.src||[]).map(k=>S[k][1]?`<a href="${S[k][1]}" target="_blank" rel="noopener">${S[k][0]} ↗</a>`:`<span>${S[k][0]}</span>`).join("");',
              'const src=(it.src||[]).map(x=>typeof x==="string"?(S[x]?`<span>${S[x][0]}</span>`:""):(x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label||x.url)} ↗</a>`:`<span>${esc(x.label)}</span>`)).join("");')
# pre-set defaults
s = s.replace('function card(it){\n  const d=state.dec[it.id]||{};',
              'function card(it){\n  const d=state.dec[it.id]||(it.def?{choice:it.def,pre:true}:{});')
s = s.replace('<div class="saved" id="s-${it.id}">${d.at?"Saved "+new Date(d.at).toLocaleString():""}</div>',
              '<div class="saved" id="s-${it.id}">${d.pre?"Pre-set: Keep (no issues found)":d.at?"Saved "+new Date(d.at).toLocaleString():""}</div>')
s = s.replace('const v=state.dec[i.id]?.choice;if(v){c[v]++;done++}', 'const v=(state.dec[i.id]?.choice)||(state.dec[i.id]?null:i.def);if(v){c[v]++;done++}')
s = s.replace('done=g.items.filter(i=>state.dec[i.id]?.choice).length', 'done=g.items.filter(i=>state.dec[i.id]?.choice||(!state.dec[i.id]&&i.def)).length')
s = s.replace('if(state.filter==="open")return !d||!d.choice;', 'if(state.filter==="open")return (!d||!d.choice)&&!(!d&&it.def);')
# grouped sub-headers inside a tab
s = s.replace('$("#main").innerHTML=`<section class="grp"><h2>${g.title}</h2><p class="sub">${esc(g.sub)}</p>${items.map(card).join("")||`<p class="sub">Nothing matches this filter.</p>`}</section>`;',
              'let last="";const body=items.map(it=>{const h=it.grp!==last?`<h3 class="gh">${GLABEL[it.grp]||it.grp}</h3>`:"";last=it.grp;return h+card(it)}).join("");$("#main").innerHTML=`<section class="grp"><h2>${esc(g.title)}</h2><p class="sub">${esc(g.sub)}</p>${body||`<p class="sub">Nothing matches this filter.</p>`}</section>`;')
s = s.replace('return `<article class="card${it.k==="gap"||it.k==="toast"?" gapc":""}"', 'return `<article class="card${it.k==="gap"||it.html?" gapc":""}"')
s = s.replace('.card.gapc{', '.hz{width:100%;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;font-family:"Open Sans",sans-serif;color:#313131;background:#fff;padding:10px;border-radius:6px;overflow:auto}\nh3.gh{font:600 12px var(--f-ui);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:18px 0 8px}\n.card.gapc{', 1)
# texts
s = s.replace("<title>V1 Toast Review</title>", f"<title>{title}</title>")
s = s.replace("Pando DS V1 · Step 2 · Atoms · Toast", eyebrow)
s = s.replace("<h1>V1 Toast Review</h1>", f"<h1>{title}</h1>")
s = re.sub(r'<div class="how">.*?</div>\n<div class="conn"', '''<div class="how">
  <p><strong>Source.</strong> Figma “DS V2 – Atoms”, one tab per page. Values were read from the components themselves (not layer names), in parallel, one reader per page.</p>
  <p><strong>Pre-set Keep.</strong> Cards with no issues start as Keep. You only need to act on flagged cards and the Industry gaps. Change any card if you disagree.</p>
  <p><strong>Flags.</strong> ▲ red = a problem found in Figma. Contrast failures are notes for the later accessibility pass.</p>
  <p><strong>When done.</strong> Tell Claude “reviewed batch A”. Kept items become components in the kit and the library.</p>
</div>
<div class="conn"''', s, flags=re.S)
s = s.replace('localStorage.getItem("v1-toast-tab")', 'localStorage.getItem("v1-batchA-tab")').replace('localStorage.setItem("v1-toast-tab"', 'localStorage.setItem("v1-batchA-tab"')
s = s.replace('state={dec:{},filter:"all",tab:"variants"', 'state={dec:{},filter:"all",tab:GROUPS[0]?GROUPS[0].id:""')
open(out, "w").write(s)
print("components:", [g["tab"] for g in groups], "items:", sum(len(g["items"]) for g in groups), "missing:", missing)
