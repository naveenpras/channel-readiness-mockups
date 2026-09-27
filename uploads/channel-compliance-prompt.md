# Design Prompt — Channel Compliance (Cloudinary DAM)

## Context
Design a feature called **Channel Compliance** inside Cloudinary's Digital Asset Management app. It helps the person who owns product media keep that media compliant across retail channels (Amazon, Amazon A+, Walmart, Target, Google Merchant, and the brand's own site). Products are identified by **SKU**; each SKU has several image/video assets; each channel is a named set of requirements (e.g. "pure white background", "square, 1000px minimum"). One asset can satisfy several channels, and one asset can belong to several SKUs.

Note: the product cannot generate missing images. Never offer "generate" affordances — the remedy for a gap is linking an existing asset.

---

## Visual language (Cloudinary product UI)

**Color**
- Primary / links / focus: `#3448C5` (hover `#2B3BAD`)
- Primary tint: `rgba(52,72,197,0.08–0.12)` — selected nav, selection bars, informational pills
- Success `#22AA00` on `rgba(34,170,0,0.12)`
- Error `#CE190D` on `rgba(206,25,13,0.12)`
- Text primary `#0A0C0F`, secondary `#323A45`, muted `#636D7E`, faint `#8A94A6`
- Hairline `#EAEDF2`, control fill `#F1F3F7`, input border `#D1D6E0`

**Surfaces — white, borderless**
- Everything sits on white. No gray page background, no card outlines, no boxed panels.
- Structure comes from hairline dividers, whitespace, and typography, not from borders.
- Exceptions that keep a border: text inputs (`1px solid #D1D6E0`), the dashed indicator for a "missing" state, the dashed "link more assets" tile, and the blue selection outline on asset tiles.
- Secondary buttons are borderless with an `#F1F3F7` fill; primary buttons are solid `#3448C5`.

**Type** — Inter. 22px/600 panel titles, 15px/600 row titles, 14px body, 13px controls, 11–12px captions. Sentence case everywhere; never uppercase micro-labels. Slightly negative letter-spacing on headings.

**Shape & depth** — 4px radius on controls, cards and inputs; 8px on modals; 9999px on pills. Shadows only on floating layers (modal `0 8px 24px rgba(0,0,0,0.16)`). No shadows on inline surfaces.

**Icons** — Material Symbols outline, 16–24px, inheriting text color. No emoji, no hand-drawn SVG.

**Motion** — 120–160ms ease. Fade for overlays, small rise for modals, continuous rotation for in-progress spinners. No bounce.

---

## Layout shell
Left icon rail (76px: Home, Assets, Image, Video, MediaFlows, Settings) + a 246px nav panel (Assets Home, Media Library group, then **Channel Compliance** highlighted in primary tint, then Structured Metadata / Assets Reports / Activity Reports). No breadcrumb bar — the page starts at the tab row.

The tab row holds **Products** and **Channels** on the left (active tab marked by a 2px `#3448C5` underline) and, right-aligned on the same line, a secondary **Link assets to SKU** and a primary **Create new SKU**.

---

## Screen 1 — Products tab
Toolbar: a bordered search field ("Search by SKU or asset name") followed by pill filter chips with `#F1F3F7` fill and a caret — Channel, Status, Media type, Category. A legend strip explains the four status marks.

Table (horizontally scrollable, header and rows locked to a shared min-width):
- Header: white, 60px tall, 14px/600 dark labels, all left-aligned.
- Columns: SKU · Images · Videos · one column per channel · trailing kebab.
- Rows: 72px, separated by 1px `#EAEDF2` hairlines, hover `#FAFBFC`. The SKU cell is two lines — SKU on top, product description in `#636D7E` below — preceded by an expand caret.
- **Four distinct status marks**, each a 26px circle: compliant = green check on green tint; non-compliant = red warning on red tint; missing = dashed gray ring with a short dash inside; in progress = blue rotating sync icon on blue tint.
- Expanding a row reveals a horizontal strip of that SKU's asset thumbnails with captions (`1024×1024 · lifestyle`), ending in a dashed **Link assets to this SKU** tile that opens the asset picker pre-scoped to that SKU.

Populate with 8 SKUs (enamel mugs, tees, a hoodie, a tumbler) mixing all four states — some fully compliant, some with gaps.

## Screen 2 — Channels tab
Heading **Channels** with the line "Each channel is a named set of requirements. Requirements are shared, so one generated asset can satisfy several channels at once." Primary **New internal channel** top-right.

Responsive grid of borderless channel cards: colored rounded square with the channel initial, name, small type label ("Marketplace", "Brand content", "Shopping feed", "Owned channel · based on Amazon"), an indigo on/off toggle top-right, requirement pills with a `+N` overflow pill, and a muted footer "N required asset types · min N images". Cards: Amazon, Amazon A+, Walmart, Target, Google Merchant, Brand Site & App.

## Flow — linking assets to a SKU
1. **Link assets to SKU** opens a **Select Assets** panel sliding in from the left (46% width, min 520px, white, the rest of the screen dimmed `rgba(10,12,15,0.45)`). This mirrors the existing media picker used for collections and folders: title + close, italic "Type to filter" field, Folders / Tags / Formats / Asset types dropdowns, a "Clear all" link, a 3-up thumbnail grid where clicking a tile toggles a blue outline and check badge, and a footer with the selection count, Cancel, and a primary **Link to SKU**.
2. That opens a centered modal, **Link assets to SKU**, over the dimmed page:
   - Subtitle "Linking N assets".
   - **1 · Assets** — a preview strip of the chosen thumbnails, each captioned, with an informational "Linked to 555" pill under any asset already attached elsewhere (informational only; assets can belong to several SKUs). A **Select assets / Change selection** button returns to the picker. With nothing chosen, show a dashed drag-and-drop upload zone: cloud-upload icon, "Drag and drop files here to upload", and beneath it "or select existing assets from your media library".
   - **2 · SKU** — one combined field, "Search an existing SKU or type a new one", with matching SKU rows beneath and a "Create new SKU '…'" row when the text matches nothing. All selected assets link to the same single SKU; no per-asset assignment.
   - Footer: secondary Cancel, primary Link — disabled until both steps are satisfied.

## Build notes
Cloudinary's Official Design System is bound to the project — load its bundle and use `CldIcon` (Material Symbols working set) for every icon. Icons used here: `cloud`, `home`, `photo_library`, `image`, `videocam`, `tune`, `settings`, `search`, `expand_more`, `chevron_right`, `check`, `check_circle`, `warning`, `sync`, `link`, `add_circle`, `close`, `arrow_back`, `more_vert`, `cloud_upload`.

No real product photography is available — asset thumbnails are flat tinted rectangles with a centered media icon, captioned with dimensions and a shot type.

Keep it quick and focused. Generous whitespace, no filler, no decorative gradients.
