// Checks every library page in headless Chrome: no JS errors, no missing files, sidebar + flags present, no sideways scroll.
// Run from "Documents/Claude Code":  node pando-ds-v1/review/tools/check-pages.cjs
const { chromium } = require("/Users/Charles-Pando/Documents/Claude Code/node_modules/playwright");
const fs=require('fs');const dir="/Users/Charles-Pando/Documents/Claude Code/pando-ds-v1/components/";
(async()=>{const b=await chromium.launch({channel:'chrome'});const bad=[];let n=0;
const pages=fs.readdirSync(dir).filter(x=>x.endsWith('.html'));
for(const f of ['../index.html',...pages]){const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,90)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,90))});p.on('requestfailed',r=>{if(!r.url().includes('fonts.g'))errs.push('404 '+r.url().split('/').slice(-2).join('/'))});
await p.goto('file://'+encodeURI(dir+f));await p.waitForTimeout(700);
const r=await p.evaluate(()=>({side:!!document.querySelector('.ds-side,nav.side'),search:!!document.querySelector('#ds-search-input'),flags:document.querySelectorAll('[data-flag]').length,ox:document.documentElement.scrollWidth>innerWidth}));n++;
if(errs.length||!r.side||!r.search||r.ox||(f!=='../index.html'&&!r.flags))bad.push([f,r,errs]);await p.close()}
console.log(n+' pages checked', bad.length?JSON.stringify(bad,null,0):'— all clean');await b.close()})();
