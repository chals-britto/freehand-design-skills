"""Synonyms ("also known as") for every kit component.
Names come from how the reference design systems name the same component
(Material = M, Carbon = C, Fluent 2 = F, Ant Design = A, Lightning = L, Apple HIG = H)
plus everyday product language. Category words (popup, input, button, dropdown, overlay…)
are included on purpose so a broad search finds every member of the family.
Run: python3 review/tools/synonyms.py  → adds `aka:[…]` to registry entries that have none
(existing aka lists are left unchanged) and writes review/synonyms.md."""
import re, json, os

AKA = {
 # ── Atoms ──
 'toast': ['snackbar (M)', 'toast notification (C)', 'notification (A)', 'message (A)', 'flash message', 'popup', 'pop-up', 'alert', 'status message', 'success message', 'error message', 'confirmation message'],
 'button': ['btn', 'CTA', 'call to action', 'action button', 'primary button', 'secondary button', 'icon button', 'link button', 'text button', 'split button (F)', 'dropdown button', 'submit', 'loading button'],
 'input': ['text field (M)', 'text input (C)', 'input (F, A)', 'textbox', 'text box', 'form field', 'field', 'input field', 'textarea', 'text area', 'number input', 'dropdown input', 'select field', 'form control', 'entry'],
 'dropdown': ['select (A)', 'combobox (F)', 'dropdown (C, F)', 'drop-down', 'picker', 'filter dropdown', 'listbox', 'multi-select', 'multiselect', 'dropdown input', 'option list', 'chooser'],
 'checkbox': ['check box', 'tick box', 'checkbox group', 'multi-select option', 'indeterminate', 'select all', 'form control', 'input'],
 'radio': ['radio button (C, M)', 'radio group (F)', 'option button', 'single select', 'choice', 'form control', 'input'],
 'toggle': ['switch (M, F, A, H)', 'toggle (C)', 'toggle switch', 'on/off', 'slide toggle', 'toggle tab', 'icon tab', 'segmented control', 'form control', 'input'],
 'range': ['slider (M, C, F, A, H)', 'range slider', 'dual slider', 'two-handle slider', 'track bar', 'scrubber', 'form control', 'input'],
 'accordion': ['collapsible', 'collapse (A)', 'expander', 'expansion panel (M)', 'disclosure', 'expand/collapse', 'details', 'foldout'],
 'breadcrumb': ['breadcrumbs', 'crumb trail', 'path', 'navigation trail', 'location trail', 'page trail'],
 'badge': ['count badge', 'notification badge', 'counter', 'indicator', 'pill', 'callout', 'inline notification (C)', 'message bar (F)', 'banner', 'ribbon', 'label'],
 'avatar': ['profile picture', 'user avatar', 'user icon', 'initials', 'persona (F)', 'icon avatar', 'text avatar', 'comment avatar'],
 'tag': ['chip (M)', 'tag (C, F, A)', 'pill', 'token', 'lozenge', 'label', 'keyword', 'filter tag', 'input tag', 'multiselect tag', 'attachment tag'],
 'status': ['status label', 'status pill', 'status tag', 'status indicator', 'state', 'lozenge', 'badge', 'workflow status'],
 'tooltip': ['tooltip (C, F, A)', 'hint', 'hover text', 'tip', 'info popup', 'popover (A)', 'toggletip (C)', 'popup', 'pop-up', 'flyout', 'coach mark'],
 'icons': ['icon', 'iconography', 'glyph', 'symbol', 'svg', 'pictogram'],
 'scrollbar': ['scroll bar', 'scroller', 'overflow', 'scroll'],
 'menu': ['dropdown menu', 'menu (M, F, A)', 'popover menu', 'popup menu', 'pop-up', 'popup', 'overlay', 'context menu', 'flyout menu', 'listbox', 'option list', 'select menu', 'options panel', 'dropdown', 'dropdown list'],
 'readonly': ['read-only field', 'read only', 'key value', 'label value', 'property', 'static text', 'description list', 'definition', 'display field'],
 'brand': ['logo', 'wordmark', 'Pando logo', 'Pi', 'mascot', 'Pi avatar', 'branding', 'brand assets'],
 # ── Molecules ──
 'button-group': ['button bar', 'button set', 'action bar', 'toolbar', 'footer buttons', 'CTA group', 'buttons'],
 'skeleton': ['skeleton (C, F, A)', 'skeleton loader', 'shimmer', 'placeholder', 'ghost loading', 'loading placeholder', 'content loader', 'loading'],
 'tabs': ['tabs (M, C, A)', 'tab list (F)', 'tab bar', 'tabset', 'tab navigation', 'pivot', 'tab group'],
 'progress': ['progress bar (C, M)', 'progress indicator', 'progress (A)', 'meter', 'completion bar', 'loading bar', 'steps complete'],
 'dropdown-option': ['option', 'select option', 'list item', 'menu item', 'option row', 'dropdown item', 'dropdown'],
 'toggle-tab': ['segmented control (H)', 'segmented button (M)', 'content switcher (C)', 'button toggle', 'radio button group', 'pill toggle', 'step selector', 'toggle buttons', 'button'],
 'loader': ['spinner', 'loading (C)', 'loading indicator', 'busy indicator', 'activity indicator (H)', 'progress circle', 'spin (A)', 'preloader', 'loading animation'],
 'empty-state': ['empty state', 'no data', 'no results', 'zero state', 'blank slate', 'nothing found', 'error page', '404', 'placeholder illustration', 'empty (A)'],
 'search-input': ['search box', 'search bar', 'search field', 'search (C, F)', 'autocomplete (A)', 'typeahead', 'combobox', 'find', 'input'],
 'timepicker': ['time picker (A, F)', 'time selector', 'time input', 'clock picker', 'time field', 'input'],
 'calendar': ['date picker (C, M, F, A)', 'datepicker', 'date range picker', 'date selector', 'calendar picker', 'date input', 'input'],
 'comment-thread': ['comments', 'comment (A)', 'discussion', 'chat message', 'messages', 'conversation', 'notes', 'activity feed', 'reply'],
 'chat-input': ['message composer', 'comment box', 'reply box', 'chat box', 'input box', 'compose', 'text area', 'textarea', 'input'],
 'card': ['card (M, F, A)', 'tile (C)', 'panel', 'container', 'consignment card', 'settings card', 'widget'],
 'condition': ['rule builder', 'query builder', 'condition builder', 'expression builder', 'filter logic', 'and/or rules', 'criteria'],
 'top-header': ['header', 'app bar (M)', 'top app bar', 'UI shell header (C)', 'top bar', 'navbar', 'global header', 'masthead', 'nav bar'],
 'file-upload': ['file uploader (C)', 'upload (A)', 'uploader', 'dropzone', 'drag and drop', 'file picker', 'attachment upload', 'browse files', 'input'],
 'subheader': ['page header', 'page title bar', 'title bar', 'secondary header', 'toolbar', 'action bar', 'page actions'],
 'menu-panels': ['subheader menu', 'sort menu', 'sort dropdown', 'filter by panel', 'view switcher', 'dropdown', 'menu'],
 'column-picker': ['column chooser', 'column settings', 'column visibility', 'customize columns', 'column manager', 'table settings', 'show/hide columns'],
 'table-dropdown': ['cell dropdown', 'inline select', 'grid dropdown', 'editable dropdown', 'table select', 'dropdown', 'dropdown input', 'input'],
 'table-cell': ['cell', 'data cell', 'grid cell', 'header cell', 'editable cell', 'table column', 'input cell'],
 'table': ['data table (C, M)', 'table (A)', 'data grid', 'datagrid', 'grid', 'details list', 'spreadsheet', 'list view'],
 'list-column': ['list cell', 'list field', 'row column', 'route column', 'data point'],
 'list': ['list (M, A)', 'list view', 'row list', 'record list', 'data list', 'item list', 'structured list (C)'],
 'filter-by': ['filters', 'filter bar', 'filter pills', 'quick filters', 'faceted filter', 'refine', 'filter chips', 'filter dropdown'],
 'metrics-widgets': ['KPI', 'KPI tiles', 'stats', 'statistic (A)', 'metric tile', 'scorecard', 'summary cards', 'dashboard widgets', 'counters', 'widgets'],
 'top-filter': ['filter header', 'KPI bar', 'metrics bar', 'dashboard header', 'summary bar', 'filters + metrics'],
 'filter-row': ['applied filters', 'filter chips row', 'filter bar (old)', 'filter row'],
 'filter-panel': ['filter panel', 'filter drawer', 'filter popup', 'filter overlay', 'faceted search', 'refine panel', 'advanced filters', 'popup', 'pop-up'],
 'search-advanced': ['advanced search', 'search section', 'search chat', 'global search', 'search menu'],
 'search-panel': ['search panel', 'lane search', 'vendor search', 'search overlay', 'search popup', 'omnibox', 'popup', 'pop-up'],
 'event-timeline': ['timeline (A)', 'activity log', 'log', 'history', 'audit trail', 'milestones', 'tracking events', 'event log', 'stepper'],
 'location-timeline': ['route timeline', 'journey', 'trip timeline', 'leg movement', 'stops', 'itinerary'],
 'attachments': ['files', 'documents', 'attached files', 'file list', 'thumbnails', 'gallery', 'file tags'],
 # ── Organisms ──
 'side-nav': ['sidebar', 'side navigation (C)', 'navigation rail (M)', 'nav rail', 'icon rail', 'left nav', 'vertical nav'],
 'subheader-nav': ['subheader menu', 'secondary navigation', 'sub navigation', 'flyout menu', 'mega menu', 'dropdown navigation', 'popup'],
 'left-panel': ['left panel', 'side panel', 'navigation panel', 'stages panel', 'steps panel', 'process navigation', 'wizard steps'],
 'modal': ['dialog (M, F, H)', 'modal (C, A)', 'modal dialog', 'dialog box', 'popup', 'pop-up', 'overlay', 'overlay popup', 'lightbox', 'confirm dialog', 'confirmation box', 'alert dialog', 'window'],
 'slideout': ['drawer (M, F, A)', 'side sheet', 'side panel', 'panel (F)', 'flyout', 'off-canvas', 'sliding panel', 'slide-in', 'overlay', 'popup', 'pop-up', 'push panel'],
 'action-panel': ['action form', 'inline form', 'quick action', 'action card', 'form panel', 'form', 'input'],
 'main-menu': ['main navigation', 'navigation menu', 'app menu', 'mega menu', 'sidebar menu', 'nav drawer (M)', 'hamburger menu', 'global navigation', 'flyout'],
 'main-menu-legacy': ['old menu', 'legacy navigation', 'side menu', 'legacy menu'],
 'ai-chat-bubbles': ['chat bubbles', 'message bubble', 'AI response', 'assistant message', 'typing indicator', 'Pi', 'AI loader'],
 'ai-chat-composer': ['prompt bar', 'chat bar', 'message input', 'AI input', 'composer', 'prompt box', 'ask bar', 'sender', 'input'],
 'ai-sidebar': ['chat history', 'conversation list', 'AI sidebar', 'history panel', 'threads'],
 'ai-insights': ['insights', 'insight cards', 'AI recommendations', 'artifacts', 'suggestions'],
 'ai-chat-window': ['AI chat', 'chatbot', 'assistant', 'copilot', 'chat window', 'conversation', 'Ask Freehand', 'Pi chat'],
 'ai-action-popup': ['AI popup', 'action popup', 'quick actions', 'options popup', 'AI prompt options', 'popover', 'popup', 'pop-up', 'overlay'],
 'ai-slideout-chat': ['AI drawer', 'assistant panel', 'copilot panel', 'chat drawer', 'AI slideout', 'drawer', 'popup', 'overlay'],
}

here = os.path.dirname(os.path.abspath(__file__))
reg = os.path.join(here, '..', '..', 'components', 'registry.js')
s = open(reg).read()
added, kept, missing = [], [], []
def repl(m):
    line = m.group(0); cid = m.group(1)
    if 'aka:' in line: kept.append(cid); return line
    if cid not in AKA: missing.append(cid); return line
    added.append(cid)
    plain = [re.sub(r'\s*\([A-Z, ]+\)$', '', a) for a in AKA[cid]]   # strip source tags for search
    return line.rstrip()[:-2].rstrip().rstrip(',') + ", aka: " + json.dumps(plain, ensure_ascii=False) + " },"
s = re.sub(r"^\s*\{ id: '([^']+)'.*\},\s*$", repl, s, flags=re.M)
open(reg, 'w').write(s)

md = ["# Component synonyms", "", "Used by the library search and the skill. Source tags: M = Material, C = Carbon, F = Fluent 2, A = Ant Design, L = Lightning, H = Apple HIG; untagged = common product language.", ""]
for cid, al in AKA.items():
    md.append(f"- **{cid}** — " + ", ".join(al))
open(os.path.join(here, '..', 'synonyms.md'), 'w').write("\n".join(md) + "\n")
print("added", len(added), "kept", kept, "missing", missing)
