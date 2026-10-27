/* Pando DS V1 — single list of every component page.
   Used by nav.js (sidebar on every page) and index.html (library home).
   Add one line per new component; nothing else needs editing.
   status: "Reviewed" | "As in Figma" | "Partial" | "Empty in Figma" */
window.PDS_REGISTRY = [
  // ── Atoms ──
  { id: 'toast',      name: 'Toast',             level: 'Atoms', desc: '4 types × persistent', status: 'Reviewed' },
  { id: 'button',     name: 'Buttons',           level: 'Atoms', desc: '88 variants + focus, danger, spinner', status: 'Reviewed' },
  { id: 'input',      name: 'Inputs',            level: 'Atoms', desc: '75 variants + focus, error, helper, info tooltip', status: 'Reviewed' },
  { id: 'dropdown',   name: 'Dropdown',          level: 'Atoms', desc: 'Filter menu, search, single & multi select', status: 'Reviewed' },
  { id: 'checkbox',   name: 'Checkbox',          level: 'Atoms', desc: '18 variants, light & dark, groups', status: 'Reviewed' },
  { id: 'radio',      name: 'Radio Buttons',     level: 'Atoms', desc: '8 variants + focus, groups', status: 'Reviewed' },
  { id: 'toggle',     name: 'Toggle',            level: 'Atoms', desc: 'Switch, Toggle Tab, Icon Tab', status: 'As in Figma' },
  { id: 'range',      name: 'Range',             level: 'Atoms', desc: '3 slider sets — pick one', status: 'As in Figma' },
  { id: 'accordion',  name: 'Accordion',         level: 'Atoms', desc: '19 variants', status: 'As in Figma' },
  { id: 'breadcrumb', name: 'Breadcrumb',        level: 'Atoms', desc: 'Default, hover, dropdown', status: 'As in Figma' },
  { id: 'badge',      name: 'Badges & Callouts', level: 'Atoms', desc: 'Badge, Callout, Ribbon', status: 'As in Figma' },
  { id: 'avatar',     name: 'Avatars',           level: 'Atoms', desc: 'Icon, text, comment avatars', status: 'As in Figma' },
  { id: 'tag',        name: 'Tags',              level: 'Atoms', desc: '93 variants across 6 sets', status: 'As in Figma' },
  { id: 'status',     name: 'Status',            level: 'Atoms', desc: '9 colours, light & dark', status: 'As in Figma' },
  { id: 'tooltip',    name: 'Tooltips',          level: 'Atoms', desc: 'Text, Custom Content, Map Tracking', status: 'As in Figma' },
  { id: 'icons',      name: 'Icons',             level: 'Atoms', desc: 'SVG icon set, searchable', status: 'As in Figma' },
  { id: 'scrollbar',  name: 'Scrollbar',         level: 'Atoms', desc: 'Light & dark', status: 'As in Figma' },
];
window.PDS_EMPTY = [
  { name: 'Alerts', level: 'Atoms', note: 'The Figma page is empty — nothing to build yet.' },
];
window.PDS_LEVELS = ['Atoms', 'Molecules', 'Organisms'];
