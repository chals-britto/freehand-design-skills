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
  { id: 'menu',       name: 'Dropdown Menus',    level: 'Atoms', desc: '16 menus + 33 parts, light & dark', status: 'As in Figma' },
  { id: 'readonly',   name: 'Label Readonly Text', level: 'Atoms', desc: 'Label : value, light & dark', status: 'As in Figma' },
  { id: 'brand',      name: 'Brand',             level: 'Atoms', desc: 'Pi-Avatar, Pando-Logo (12 SVGs)', status: 'As in Figma' },
  // ── Molecules ──
  { id: 'button-group', name: 'Button Group',    level: 'Molecules', desc: 'Buttons and Action Buttons', status: 'As in Figma' },
  { id: 'skeleton',   name: 'Skeleton',          level: 'Molecules', desc: '5 sizes, light & dark, shimmer', status: 'As in Figma' },
  { id: 'tabs',       name: 'Tab Group',         level: 'Molecules', desc: '4 groups + 5 tab states', status: 'As in Figma' },
  { id: 'progress',   name: 'Progress Indicator', level: 'Molecules', desc: '12 states, light & dark', status: 'As in Figma' },
  { id: 'dropdown-option', name: 'Dropdown Option', level: 'Molecules', desc: 'Avatar + two-line option rows', status: 'As in Figma' },
  { id: 'toggle-tab', name: 'Toggle Tab',        level: 'Molecules', desc: 'Icon, steps, pills, segment', status: 'As in Figma' },
  { id: 'loader',     name: 'Loaders',           level: 'Molecules', desc: '4 animated GIFs + stills', status: 'As in Figma' },
  { id: 'empty-state', name: 'Empty State',      level: 'Molecules', desc: '38 illustrations, light & dark', status: 'As in Figma' },
  { id: 'search-input', name: 'Search Input',    level: 'Molecules', desc: 'Field + filtering option list', status: 'As in Figma' },
  { id: 'timepicker', name: 'Timepicker',        level: 'Molecules', desc: '24-hour, keyboard, Cancel/Apply', status: 'As in Figma' },
  { id: 'calendar',   name: 'Calendar',          level: 'Molecules', desc: 'Single, range, multi date, presets', status: 'As in Figma' },
  { id: 'comment-thread', name: 'Comments',      level: 'Molecules', desc: 'Comment, chat comment, user tag', status: 'As in Figma' },
  { id: 'chat-input', name: 'Chat Input Box',    level: 'Molecules', desc: '10 variants, tags, attachments', status: 'As in Figma' },
  { id: 'card',       name: 'Card',              level: 'Molecules', desc: 'Card, Consignment, Settings', status: 'As in Figma' },
  { id: 'condition',  name: 'Condition',         level: 'Molecules', desc: 'Rule rows: single, linked, and/or, brackets', status: 'As in Figma' },
  { id: 'top-header', name: 'Top Header',        level: 'Molecules', desc: 'Shipper, Gradient, Transporter, Consignee', status: 'As in Figma' },
  { id: 'file-upload', name: 'File Upload',      level: 'Molecules', desc: 'Not uploaded, uploaded, verified', status: 'As in Figma' },
  { id: 'subheader',  name: 'Subheader',         level: 'Molecules', desc: '6 variants: main, breadcrumb, back, light & dark', status: 'As in Figma' },
  { id: 'menu-panels', name: 'Subheader Menu + Sort', level: 'Molecules', desc: 'Subheader menu, Filter-by panel', status: 'As in Figma' },
  { id: 'column-picker', name: 'Column Picker',  level: 'Molecules', desc: 'Toggle, pin, advanced, reorder', status: 'As in Figma' },
];
window.PDS_EMPTY = [
  { name: 'Alerts', level: 'Atoms', note: 'The Figma page is empty — nothing to build yet.' },
];
window.PDS_LEVELS = ['Atoms', 'Molecules', 'Organisms'];
