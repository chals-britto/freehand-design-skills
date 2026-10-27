# File Upload — Pando DS V1

**Status:** Built from Figma 2026-10-28, not yet reviewed (every published item treated as Keep) · **Figma:** DS V2 – Molecules › ✏️ File Upload (2463:9238) › `File Upload` (2466:10340)
**Files:** `file-upload.css` (styles + component tokens) · `file-upload.js` (`pdsFileUpload`) · `file-upload.html` (live doc)
**Built from kit:** `button.css` · `readonly.css` · `progress.css` + `progress.js` · `empty-state.css` + `empty-state/no-file-uploaded-small-*.png` · `tag.css` (file tag, × remove) · `icons/` (`file-*.svg`, `system-status-selected-multi.svg`, `nav-close-tag.svg`)

## What it is
A single row that shows whether a file has been uploaded, with the actions to add, upload or download it. Figma has no description text for this component.

## Variants
`Theme` × `Type`, 4 published variants (Dark exists only as Not Uploaded).

| Variant | Node | Size | Fill | Padding | Content |
|---|---|---|---|---|---|
| Theme=Dark, Type=Not Uploaded | 2466:10323 | 280 × 40 | none | 0 | Empty art (Dark) · “No File Uploaded” `--dark-input-text` #8A8A9E · Primary Small “Upload” with fill `--dark-light` #343440 |
| Theme=Light, Type=Not Uploaded | 2466:10324 | 380 × 56 | `--white` | 8 / 10 | Empty art (Light) · “No File Uploaded” #616161 (off-token) · Secondary Small “Add Files” + Primary Small Disabled “Upload” |
| Theme=Light, Type=Uploaded | 2466:10325 | 380 × 54 | `--white` | 15 / 10 | `file-xls` 20 × 24 · “Lanes Sample Format” #404040 (off-token) · Secondary Small “Download” |
| Theme=Light, Type=Verified | 2466:10334 | 380 × 54 | `--white` | 15 / 10 | `file-xls` · Label Readonly Text “Lanes-Mar-22” underlined #404040 · `system-status-selected-multi` in `--dark-highlight-green` #1FCD93 · Label Readonly Text “Total entries : 50” #404040 |

Classes: `.pds-file-upload` + `--empty` / `--uploaded` / `--verified`, `--dark`. Parts: `__row`, `__status`, `__empty-text`, `__name`, `__type`, `__check`, `__file-link`, `__actions`, `__list`, `__item`.

## Anatomy & spacing
- Row: auto-layout horizontal, space-between, centred. Item spacing 61 (Not Uploaded, Verified) / 24 (Uploaded) — used as the minimum gap `--file-upload-min-gap` 24px; space-between decides the rest.
- Status: art/icon + text, gap 9px (Not Uploaded, Uploaded); Verified gap 10px (`--space-10`).
- Buttons (Light Not Uploaded): gap 20px.
- Empty text: Open Sans SemiBold 12 / auto → `.type-12-semibold` (12/17).
- File name: style 12px/Body, Open Sans Regular 12/16 → component font `400 12px/16px` (nearest `.type-12-regular` is 12/17).
- Buttons: kit `.pds-button--small` (Button/Small-Bold 10/14, 24 tall, padding 5/10, radius 4).

## Behaviour
- Static rows: `pdsFileUpload.build({ theme, type, name, fileType, entries })`.
- Interactive (Not Uploaded, `interactive: true` or `[data-pds-file-upload]` + `pdsFileUpload.init()`) — local only, nothing is sent:
  - **Add Files** opens the browser file picker (`multiple` by default, `accept` optional). Dark has only **Upload**; it opens the picker while nothing is chosen.
  - **Drag and drop** files onto the row. While dragging, the row shows a 2px `--pando-blue` outline. *Added in build — not in Figma.*
  - Each chosen file is listed under the row as a kit file tag (Dark: attachment tag Dark) with a × remove button and a kit Progress Indicator named after the file. Progress is simulated in 20% steps using the Figma step text (“0/5 steps complete” … “Complete”). *Added in build — not in Figma.*
  - **Upload** (Light) is disabled until every chosen file reads “Complete”; it then turns the files into Verified rows (no “Total entries”, the browser has no entry count).
  - **×** cancels and removes a file; focus moves to the next × or to Add Files.
  - Events: `pds-file-upload:change` and `pds-file-upload:upload`, `detail.files` = `File[]`. `pdsFileUpload.reset(el)` returns to Not Uploaded.
- Accepted types / size: Figma shows **no** accepted types, size limit or helper text, so none is shown. `accept` only filters the picker and dropped files.

## When (not) to use
Figma has no usage text for this component.

## Accessibility
- Add Files, Upload, Download and × are real `<button>`s; the hidden file input is not in the tab order. Focus returns to the opener after the picker closes.
- × buttons are named “Remove <file name>”. Progress bars are named by the file name (`aria-label`) and expose the step text as `aria-valuetext`.
- A polite live region announces files added, all files ready, a file removed, files uploaded and files skipped by `accept`.
- The green check has hidden text “Verified”. The empty art and file icons are decorative (`alt=""`) because text sits next to them.
- Drag-and-drop is an extra path; browsing does the same job.
- Contrast for the accessibility pass: Dark “No File Uploaded” #8A8A9E on #393945 3.37:1; “Add Files”/“Download” #0076DD on #EEF2F4 4.02:1; green check #1FCD93 on white 2.06:1 (< 3:1 graphics).
- Focus ring on buttons inside the component: `outline: 2px solid var(--pando-blue); outline-offset: 2px`. *Added in build — not in Figma.*

## Open issues
- Figma has no accepted-types, size-limit, helper or error text, no drop zone, no in-progress state and no remove control. The chosen-file list, × (kit file tag), drop outline and simulated progress are added in build at the caller’s request.
- Dark exists only as Not Uploaded (no Dark Uploaded / Verified). Its Upload button is a **Light Primary instance with a #343440 fill override** — atom variant missing in kit; built as a component override.
- Off-token colours: empty text #616161 (style named “Text/Medium-#737373”); file name #404040 (style “Text/Dark-#404040”, while tokens.css Text/Dark and the kit Label Readonly Text use #313131).
- Line heights differ from the type scale: empty text 12/auto vs `.type-12-semibold` 12/17; file name 12/16 vs `.type-12-regular` 12/17.
- “Total entries : 50” needs data the browser does not have; not shown after a local upload.
- Download has no file behind it (sample only). Uploaded has no remove or replace action.
- Light and Dark empty-state art are different drawings (glyph 22.7 × 27.7 vs 25.6 × 31.3, different magnifier image) — kept as the kit PNGs.
- Chosen-file list spacing (10px gap, 0 10 15 padding) is a build choice — not in Figma.

## Not adopted
- Hidden layers inside the variants: “Last Uploaded: 10 June 2021” (8px), two hidden buttons and a second hidden Label Readonly Text in Verified, hidden “no-file-uploaded” image in Dark.
- `Progress Indicator` (3164:1340) on the same page — built separately as `progress`, linked here.
- Rectangle 4428 (3164:4130), the #393945 backdrop behind the Progress Indicator dark variants.

## Industry gaps — not added
- Visible drag-and-drop zone whose border changes on drag-over, labelled “drag and drop or click” (Carbon, Ant).
- Description text that states size and format limits (Carbon).
- Invalid / error state per file with a message (Carbon, Ant).
- Uploading state with progress in the file list and a × on each file (Carbon, Ant) — partly covered by the build-added list.
- Max file count; single file replaces the current one (Ant).

## Sources
Figma — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=2466-10340
Carbon File uploader usage — https://carbondesignsystem.com/components/file-uploader/usage/
Ant Design Upload — https://ant.design/components/upload
