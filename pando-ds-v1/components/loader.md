# Loaders — Pando DS V1

**Status:** Built 2026-10-28 · not reviewed · **Figma:** DS V2 – Molecules › 🟢 Empty States & Loaders (77:4762)
**Files:** `loader.css` · `loader.html` (live doc) · `loader/*.gif` (original animations) · `loader/*-still.png` (one frame each, for reduced motion)

## What it is
Four animated illustrations shown while something loads. In Figma each one is a single rectangle with an **animated GIF image fill** — no smart-animate, no prototype reactions, no vector layers. None of them is a spinner or a simple loop that CSS/SVG can rebuild, so the original GIFs are used as-is.

Figma copy shown with them: the section label **“LOADER - GIF”** (2529:9579) and the component descriptions below. No other copy sits with them.

## Variants

| Component | Node | Frame | Artwork rectangle | GIF file (native size) | Animation | Figma description | Class |
|---|---|---|---|---|---|---|---|
| Loaders-Gif | 3133:1029 | 200 × 200 | 200 × 200 at 0,0 | `loader/loader-gif.gif` 200 × 200 · 444 KB | 111 frames × 40 ms = 4.44 s, loops forever | *(none)* | `.pds-loader` |
| Loader-Box-Animation | 4626:2687 | 200 × 200 | 200 × 151.2, centred | `loader/loader-box.gif` 250 × 189 · 47 KB | 7 frames × 300 ms = 2.1 s, loops forever | “General Loader Animation - Temporary design” | `.pds-loader--box` |
| Upload-Data-Animation | 5095:331 | 200 × 200 | 200 × 198, bottom | `loader/upload-data.gif` 401 × 397 (2×) · 5.7 MB | 208 frames × 40 ms = 8.32 s, loops forever | “General Loader Animation - Temporary design” | `.pds-loader--upload` |
| Loader-Document-Processing | 4629:2697 | 200 × 160 | 200 × 160 at 0,0 | `loader/document-processing.gif` 200 × 160 · 27 KB | 7 frames × 220 ms = 1.54 s, loops forever | “To be used for Loading Animation where some document is being processed.” | `.pds-loader--document` |

Image hashes (Figma): Loaders-Gif `fe79d3034d268b2ab6699baa4d632dfdfe216c9f` · Box `de7c493f0d5173b1b16458ed535a39dc33c2e3a4` · Upload `334089ece2a25b3ba4d9e2f73130457c6173cc8d` · Document `9e485d8e0c21bee1faa33c084086af1d4a4101ee`. Byte sizes of the downloaded files match the Figma originals exactly.

What each shows: Loaders-Gif — plane, container ship and truck passing along a dashed green line under a cloud (photographic). Box — a person stacking cardboard boxes. Upload — a person filling dashboards and charts. Document — a sheet sliding down into a laptop screen.

Component tokens: `--loader-size` 200px · `--loader-height` 200px · `--loader-doc-height` 160px · `--loader-box-art-height` 151px · `--loader-upload-art-height` 198px. No colours (raster artwork).

## Anatomy & spacing
Frame (fixed size) › one image rectangle, `object-fit: cover` (Figma scale mode FILL). Box and Upload images are slightly smaller than the frame and positioned inside it as in Figma. No padding, radius, border or shadow.

## Behaviour
- The GIF plays and loops forever (loop count 0 in all four files).
- **Reduced motion:** markup uses `<picture>` with a `(prefers-reduced-motion: reduce)` source pointing at a still PNG of one representative frame. Added in review — not in Figma.

## When (not) to use
- Loader-Document-Processing: “To be used for Loading Animation where some document is being processed.” *(Figma)*
- Loader-Box-Animation and Upload-Data-Animation: “General Loader Animation - Temporary design” *(Figma)*
- Loaders-Gif: no guidance in Figma.

## Accessibility
- The illustration is decorative: `alt=""` on the image. The loading state must be announced by the region: `aria-busy="true"` on the area being loaded, plus a visible or `role="status"` text label. Figma has no label copy, so none is built.
- Looping animation longer than 5 s (Loaders-Gif 4.4 s loops; Upload 8.3 s) with no pause control — WCAG 2.2.2. The reduced-motion still covers users who set the preference only.

## Open issues
- All four are raster GIFs, not rebuildable in CSS/SVG; they are shipped as files. Upload-Data-Animation is 5.7 MB — very heavy for a loader.
- Box and Upload are described in Figma as “Temporary design”.
- No loading text or label in Figma for any of them; no size variants; no spinner for inline / button loading.
- Loaders-Gif has no Figma description and mixes photographic art with the flat illustration style of the others.
- Box GIF is 250 × 189 shown at 200 × 151 (0.8×); Loaders-Gif, Box and Document are 1× only (no 2× asset). Upload is 2×.
- Still frames (reduced motion) are chosen by hand: Loaders-Gif frame 74, Box frame 3, Upload frame 173, Document frame 3. Frame 0 of Loaders-Gif is nearly empty.
- No pause/stop control (WCAG 2.2.2) for long-running loops.

## Not adopted
- “Animation” frame 4636:2474 next to the loaders (loose frame, “Tracking Shipment” map illustration) — not a component, not built.

## Industry gaps — not added
- Spinner in two sizes (large for page/section with overlay, small inline beside a button). *(Carbon Loading)*
- Optional short status text under the indicator, e.g. an -ing phrase of three words or less. *(Carbon Loading; Fluent 2 Spinner)*
- Label wired with `aria-labelledby` when the wait is over 3 s. *(Fluent 2 Spinner)*
- Use a determinate progress bar when progress is known. *(Fluent 2 Spinner)*

## Sources
Figma file rd3gmPnjhPo1d2GAlNSJOn, page 77:4762, nodes 3133:1029, 4626:2687, 5095:331, 4629:2697, 2529:9579
Carbon Loading usage — https://carbondesignsystem.com/components/loading/usage/
Fluent 2 Spinner usage — https://fluent2.microsoft.design/components/web/react/core/spinner/usage
WCAG 2.2 2.2.2 — https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
