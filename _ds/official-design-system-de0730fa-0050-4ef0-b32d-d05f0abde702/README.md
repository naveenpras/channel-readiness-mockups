# Cloudinary Design System

> Official design system for Cloudinary product interfaces — dashboards, media libraries, AI chat surfaces, and PLG flows.

## About Cloudinary

Cloudinary is a cloud-based media management platform: image & video upload, transformation, optimization, and delivery at scale. Products covered by this design system include:

- **Cloudinary Product Dashboard** — asset management, upload, transformations, settings
- **AI Chat UI** — conversational interface for media intelligence / AI assistant
- **PLG (Product-Led Growth) surfaces** — onboarding, upgrade flows, usage dashboards

## Sources

| File | Description |
|---|---|
| `DS colors (foundations).fig` | Full color palette and semantic token definitions |
| `DS - components.fig` | Core component library (buttons, inputs, navigation, tables, modals, menus) |
| `Button.fig` | Button component variants and states |
| `INPUT.fig` | Input field variants and states |
| `Modal.fig` | Modal dialog patterns |
| `Menu.fig` | Dropdown and context menu patterns |
| `Table.fig` | Data table component |
| `navigation component.fig` | Top nav and sidebar navigation |
| `toasts based on banner...fig` | Toast / snackbar / banner notification system |
| `ai chat ui.fig` | AI chat interface components |
| `PLG CLD.fig` | Product-led growth UI flows |
| `uploads/Inter-VariableFont_opsz,wght.ttf` | Inter variable font (primary typeface) |
| `uploads/cloudinary-icon.svg` | Cloudinary logo icon |
| `uploads/674f5ebd0de31390e6f53218_3-logo-brand-square.svg` | Full Cloudinary wordmark on white |

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Professional but approachable.** Cloudinary speaks like a knowledgeable colleague, not a formal manual.
- **Action-oriented.** UI copy leads with verbs: *Upload*, *Transform*, *Deliver*, *Connect*.
- **Concise.** Toast/banner messages are short, specific, and scannable (e.g., *"The asset's contextual metadata was updated successfully."*)
- **No emoji in UI.** Emoji are absent from product interfaces; status is communicated via icon + color.
- **Sentence case** for UI labels, headings, and messages. ALL-CAPS only for status badges where space is very tight.
- **1st/2nd person**: The product speaks to *you*; documentation uses *we* sparingly. Example copy from Figma: *"Media sources tell Cloudinary about your media storage locations and how to access them."*
- **Error messages** are direct and suggest resolution: *"Oops"* paired with contextual detail.
- **Success messages** confirm the specific action completed, not generic *"Success!"*.

### Specific Copy Examples (from Figma)
- Toast success: *"The asset's contextual metadata was updated successfully."*
- Banner info: *"Media sources tell Cloudinary about your media storage locations and how to access them"*
- Toast action label: *"action"*, *"Primary"*, *"Upload"*
- Toast error: *"Oops"*, *"Also bad"*, *"text"*

---

## VISUAL FOUNDATIONS

### Colors
- **Primary**: Blue `#3448C5` (rgb 52,72,197) — all primary actions, links, focus rings
- **Primary subtle**: `rgba(52,72,197,0.12)` — tinted backgrounds for info banners, hover states
- **Error**: `#CE190D` — destructive actions, error banners
- **Error subtle**: `rgba(206,25,13,0.12)` — error banner backgrounds
- **Success**: `#22AA00` — success toasts, confirmation states
- **Success subtle**: `rgba(34,170,0,0.12)` — success banner backgrounds
- **Text primary**: `#0A0C0F` — body text, headings
- **Text secondary**: `#323A45` — supporting text, captions
- **Border default**: `#D1D6E0` — input borders, dividers, card outlines
- **Surface dark**: `#090C0F` — dark-mode backgrounds, inverse surfaces
- **Accent pink**: `#DD58BD` — gradient endpoint, decorative only (cover art, marketing)
- **Brand gradient**: `linear-gradient(#3448C5 → #DD58BD)` — cover frames only

### Typography
- **Primary typeface**: **Inter** (variable, 100–900 weight range)
  - All UI text: buttons, labels, body, headings
  - Key sizes: 12, 13, 14, 16, 20, 24, 28, 32, 40px
  - Key weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Secondary typeface**: **Fira Sans** — seen in toast body text (16px Regular); likely used for longer reading contexts or legacy components. Not in the uploaded font set.
- **Line heights**: 1.25 (headings), 1.4 (body), 1.55 (relaxed body)
- **Letter spacing**: slightly negative (-0.01 to -0.02em) for display/heading sizes; normal for body

### Spacing
- **Base unit**: 4px grid
- **Compact padding**: 8–12px (toasts, badges, chips)
- **Standard padding**: 12–16px (cards, inputs, buttons)
- **Section padding**: 24–32px (panels, modals)
- **Page margins**: 32–64px

### Backgrounds & Surfaces
- **White dominant**: Main content areas are `#FFFFFF`
- **Subtle off-white**: `#F7F8FA` for sidebars, secondary panels, hover states
- **Dark mode**: Pure near-black `#090C0F` backgrounds with white text (seen in dark toast examples)
- **No gradients on UI surfaces** — gradients only appear on decorative/marketing frames

### Corner Radii
- **Default component radius**: `4px` — buttons, inputs, toasts, cards, banners
- **Large containers**: `8px` — modal dialogs, larger cards
- **Pills/tags**: `9999px` for badge/tag components

### Shadows
- **XSmall** `0 1px 2px rgba(0,0,0,0.10)` — subtle lift for inputs
- **Small** `0 1px 4px rgba(0,0,0,0.20)` — dropdown menus, inline cards
- **Medium** `0 4px 6px rgba(0,0,0,0.20)` — toasts, floating elements
- **Large** `0 8px 24px rgba(0,0,0,0.16)` — modals, focused drawers
- No colored/tinted shadows; all shadows are neutral black with low opacity

### Borders
- Default: `1px solid #D1D6E0`
- Focus: `1px solid #3448C5` (sometimes with a 2px offset ring)
- No borders on solid-filled components (buttons, tags)

### Icons
- Size: **16px** standard, **24px** for navigation/large contexts
- Style: **outline/linear**, single-weight strokes — not filled
- Color: inherits text color (or explicit semantic color for status icons)
- No icon fonts; SVG-based

### Hover & Press States
- **Hover**: background darkens one step (e.g., blue-500 → blue-600); no opacity tricks
- **Ghost/outline hover**: subtle tinted bg (`rgba(primary, 0.08)`)
- **Press/active**: darkens further (blue-600 → blue-700); slight scale not observed
- **Disabled**: `--neutral-400` text, `--neutral-100` background, no pointer events

### Animation
- **Fast transitions**: 100–150ms ease for hover/focus states
- **No bounce or spring** animations observed — clean linear/ease
- **Toast entry**: slide-in from edge, fade; exit: fade out

### Component Patterns
- **Toast/Snackbar**: 352px wide, 36–48px height, `border-radius: 4px`, shadow-md, 12px padding. Left-accent-strip for subtle variants (48px wide tinted block). Actions are ghost buttons inline.
- **Banner/Alert**: Full-width or 402px, left color strip (48px) + icon + text + optional action + close button. White background.
- **Buttons**: Text-only (most common), Icon-only, Icon+Text. Two sizes: `sm` (28px height), `md` (40px height).
- **Cards**: White bg, `border-radius: 4px`, `1px solid #D1D6E0`, shadow-sm

### Imagery & Color Vibe
- UI screenshots in Figma show asset management interfaces — media thumbnails, grid/list views
- Color vibe: **cool and neutral** — predominantly blues, grays, white
- No warm gradients in product UI; gradient is brand/decorative only

---

## ICONOGRAPHY

**Cloudinary standardizes on Material Symbols** (Google's Material Symbols set), extended with a set of **Cloudinary custom glyphs** for media-specific actions. This was confirmed by the attached `2025 icons.fig` library, which contains the full Material Symbols set (2,380 families across 7 optical weights) plus a `Cloudinary-Icons` frame of custom glyphs and a `SDKs-Brands-Logos` frame.

> **Use ONLY icons from this library in any Cloudinary design.** Do not hand-draw SVGs, use emoji, or pull from other icon packs.

### How to use — the `CldIcon` component
The icon set is materialized from the Figma file as SVG path data and exposed through one component:

```jsx
import { CldIcon } from './icons/CldIcon.jsx';

<CldIcon name="cloud_upload" weight={400} size={24} />
<CldIcon name="add_tag" weight={500} size={20} color="#3448C5" />
```

- **`name`** — clean `snake_case` glyph name (e.g. `search`, `cloud_upload`, `background_remove`)
- **`weight`** — optical weight `100 · 200 · 300 · 400 · 500 · 600 · 700` (default `400`, the Material standard). Falls back to the nearest available weight.
- **`size`** — pixel size (default `24`). Common UI sizes: **16px** inline/buttons, **20px** dense UI, **24px** nav/section.
- **`color`** — icons are single-color and paint with `currentColor`; set `color` or inherit from text.

In `.dsCard` / bundle contexts the component is on the namespace: `window.OfficialDesignSystem_de0730.CldIcon`.

### What's included
- **~192 Material Symbols families** — the working UI/media/document/e-commerce/navigation set (search, settings, folder, image, cloud_upload, play_arrow, crop, tune, palette, shopping_cart, code, …), each in all 7 weights. See `icons/gallery.html`.
- **16 Cloudinary custom glyphs** — `add_tag`, `remove_tag`, `asterisk_crossed`, `background_remove`, `generative_fill`, `folder_cloud`, `folder_search_alt`, `query_search`, `radius_top_right`, `auto_awesome`, `person_filled`, `no_accounts`, `remove_done`, `more`, `cancel`, `add`.

**Style**: Material Symbols — geometric, single-weight-per-optical-axis, mostly outline with some filled variants. Sizes align to a 16/20/24px grid. **No emoji, no Unicode-char icons.**

### Coverage note
The source Figma contains all **2,380** Material Symbols families. Rather than generate 2,378 redundant per-family component files (Material Symbols is a well-known public set and this would massively bloat every consumer bundle), the design system materializes a curated **working set** of ~207 glyphs as compact `icon-data` maps. To add a glyph that isn't yet included, re-run `fig_materialize` on that family name into `icons/material/` — the `CldIcon` API picks it up automatically. The full Material Symbols set can also be referenced by name via Google's Material Symbols font if a design needs a glyph outside the extracted set.

### Files
| File | Use |
|---|---|
| `icons/CldIcon.jsx` | The icon component — **use this for all icons** |
| `icons/icon-data.js` | Cloudinary custom glyphs (path data) |
| `icons/material/icon-data.js` | Material Symbols working set (path data) |
| `icons/gallery.html` | Live icon gallery / weight-axis demo |
| `assets/cloudinary-icon.svg` | Brand cloud/upload icon (blue) — favicons, app icons |
| `assets/logo-square.svg` | Full Cloudinary wordmark on white |
| `assets/cloudinary-wordmark.svg` | **Primary wordmark lockup** (500×96.77 viewBox). Paths carry no fill rule — set the colour at the usage site: white on dark/brand surfaces, `#3448C5` on light. |

---

## FILES INDEX

```
/
├── README.md                     ← This file
├── SKILL.md                      ← Agent skill definition
├── colors_and_type.css           ← All CSS custom properties (tokens)
├── fonts/
│   ├── Inter-VariableFont.ttf
│   └── Inter-Italic-VariableFont.ttf
├── assets/
│   ├── cloudinary-icon.svg       ← Brand icon (blue cloud/upload)
│   ├── cloudinary-wordmark.svg  ← Primary wordmark lockup (fill set at usage)
│   └── logo-square.svg           ← Full wordmark on white
├── preview/                      ← Design System tab cards
│   ├── 01-brand-colors.html
│   ├── 02-neutral-scale.html
│   ├── 03-semantic-colors.html
│   ├── 04-type-scale.html
│   ├── 05-type-styles.html
│   ├── 06-spacing-tokens.html
│   ├── 07-radii-shadows.html
│   ├── 08-buttons.html
│   ├── 09-inputs.html
│   ├── 10-banners-toasts.html
│   ├── 11-cards-surfaces.html
│   ├── 12-brand-logo.html
│   └── 14-brand-wordmark.html
└── ui_kits/
    ├── cloudinary-product/
    │   ├── README.md
    │   └── index.html            ← Cloudinary dashboard prototype
    └── ai-chat/
        ├── README.md
        └── index.html            ← AI Chat interface prototype
```

---

## COMPONENTS

334 components materialized from **Cloudinary Design System (Copy).fig** into `components/` as `<Name>.jsx` + `<Name>.d.ts`.
Load via the compiled bundle: `const { Button, Chip } = window.OfficialDesignSystem_de0730`.

`AICoverIcon` · `Accordion` · `AccordionGroup` · `AccountCircleFilled` · `ActionBlock` · `ActionInfooutlineDefaultSymbolsAction` · `Add` · `Add2` · `AdornmentIcon` · `AiSparks1` · `Alert` · `AppLogos` · `Apps` · `ArrowBackIosNew` · `ArrowDownwardFilled` · `ArrowDropDownAlt` · `ArrowDropDownArrowDrop` · `ArrowDropDownFilled` · `ArrowDropUpFilled` · `ArrowForwardIos` · `Arrows2020Arrowpicker` · `Arrows2020Expandless` · `Arrows2020Expandmore` · `Asterisk` · `Autocomplete` · `Avatar` · `Avatar5` · `Avatar7` · `AxisLabel` · `BGPatern` · `Backdrop` · `BackgroundRemove` · `BackgroundReplace` · `Badge` · `Badge2` · `BadgeAvatar` · `Banners` · `BannersWarningFalseFalse` · `BannersWarningTrueFalse` · `BaseBlock` · `BasicMenu` · `Block` · `BottomNavigation` · `BottomNavigationAction` · `Breadcrumbs` · `BreadcrumbsEntity` · `BreakdownInfo` · `Bullet` · `Button` · `Button11` · `Button4` · `Button6` · `Button7` · `Button9` · `ButtonGroup` · `ButtonMediumPrimaryEnabledOutlined` · `ButtonSmallInheritEnabledText` · `CancelFilled` · `CanvasGuides` · `CanvasGuidesStatusUrgent` · `CardActions` · `CardContent` · `CardElements` · `CardHeader` · `CardMedia` · `Cell` · `Check` · `Check2` · `CheckBoxAlt` · `CheckBoxIndeterminateAlt` · `CheckBoxOutlineBlank` · `CheckCircle` · `CheckCircleFilled` · `CheckCircleOutlined` · `CheckFilled` · `CheckUseThis` · `Checkbox` · `Checkbox2` · `CheckboxFalseMediumEnabled` · `CheckboxLabel` · `CheckboxUseThis` · `CheckboxUseThis2` · `CheckcardGreyCheckcard` · `ChevronLeft` · `ChevronLeftFilled` · `ChevronLeftFilled2` · `ChevronRight` · `ChevronRight2` · `ChevronRightFilled` · `ChevronRightFilled2` · `Chip` · `Chip7` · `ChipIndicator` · `Close` · `Close4` · `CloseAlt` · `Code` · `CodeSnippetText` · `Column` · `Component1` · `ComponentsStatisticsGraphLine` · `ContentCopy` · `Crop` · `Cursor` · `CustomIntegrationSwitch` · `CustomPageHeading` · `CustomSettingsPayment` · `DateDateDate` · `Delete` · `DesktopStepper` · `DevModeIcon` · `Divider` · `DividerHorizontal` · `DividerHorizontal2` · `DocumentationToolKit` · `Done` · `Done2` · `Download` · `DragHandleDrag` · `DragIndicator` · `Draggable` · `Drawer` · `DropdownMenu` · `Edit` · `EffectSelector` · `Error` · `Error2` · `ErrorFilled` · `ErrorOutline` · `ExpandLess` · `ExpandMore` · `Extension` · `FavoriteFilled` · `Filter` · `FilterCenterFocus` · `FocusComponent` · `Folder` · `FormBillingInfoFilled3` · `FormHelperText` · `FormHelperText2` · `FormPattern` · `FormatColorText` · `FormatNew` · `Frame8` · `FromFooter` · `GenerativeFill` · `GroupedAvatars` · `Help` · `Hidden` · `HideImage` · `HorizontalRule` · `Icon` · `Icon10` · `Icon2` · `Icon3` · `Icon5` · `Icon7` · `IconButton` · `IconButton3` · `IconButtonMediumDefaultEnabled` · `IconChooser2` · `IconNewValueSVGIcon` · `IconPlatformLink` · `ImageBlock` · `Info` · `Info2` · `InfoFilled` · `InfoOutlineInfo` · `InfoOutlined` · `InputChips` · `InputLabel` · `InputStates` · `ItemAction2` · `ItemHeader` · `ItemHeader2` · `KeyboardArrowDown` · `KeyboardArrowDownLarge` · `KeyboardArrowDownLarge2` · `KeyboardArrowRightAlt` · `KeyboardArrowRightLarge` · `KeyboardArrowUp` · `L2NavigationPanel` · `Label` · `LeftAction` · `Legend` · `LibraryComponentInformation` · `LibraryComponentProperties` · `LibraryInstanceSlot` · `LibraryInstanceSlot3` · `LibraryPlaceholderImage` · `Lightbulb` · `LineChartNode` · `Link` · `List` · `ListItem` · `ListItem2` · `ListSubheader` · `Loader` · `Lock` · `LockFilledLock` · `Logos` · `LogosCloudinary` · `LogosFont` · `MagicButton` · `MailOutlineFilled` · `Menu` · `Menu3` · `MenuIcons` · `MenuItem` · `MenuKebabEmphasis` · `MenuRowStates` · `MenuRowStates2` · `MenuTabs` · `MobileStepper` · `Modal` · `MoreHorizFilled` · `MoreVertAlt` · `NativeBrowserScroll` · `NewNavigationPrimaryShell` · `NotelyComponentWhichControlsAll` · `Notes` · `OpenInNew` · `OverlayButton` · `Pagination` · `Palette` · `Paper` · `PermMedia` · `Person` · `PersonAdd` · `PetSupplies` · `PhotoOutlined` · `Popover` · `PrimaryMenu` · `ProductChooser` · `ProductEnv2024` · `ProductLogo` · `ProductLogosMarketingEdition` · `ProgressBar` · `ProgressLinear` · `ProgressPie` · `RadioButton` · `RadioOption` · `RadiusRound` · `RectangleLarge` · `RemoveRedEyeFilled2` · `Resizer` · `ResourceIcons` · `RoundedSquareAvatar` · `Schedule` · `SearchSearch` · `SecondaryMenu` · `Section` · `Select` · `SelectPattern` · `Send` · `Separator` · `SeriesColorCheckbox` · `SeriesTotal` · `SeriesTotal2` · `Settings` · `Skeleton` · `Skeleton2` · `Slider` · `SliderLabel` · `SliderMark` · `SliderRail` · `SliderThumb` · `SliderTrack` · `SliderValueLabel` · `SlotGeneric` · `Snackbar` · `SpacingHorizontal` · `SpacingHorizontal3` · `SpacingVertical` · `SpacingVertical2` · `SpinnerInteractive` · `SplitButton` · `Stack` · `Star` · `StarSharp` · `StarSharp2` · `Status` · `Status2` · `Status3` · `Step` · `StrokeIcons` · `Stylus` · `SubBlock` · `SubdirectoryArrowRight` · `Switch` · `Switch2` · `TACONextStep` · `TACORefinersIcon` · `TACOSection` · `TACOStep` · `TACOSubStep` · `TACOTabLink` · `Tab` · `TabPanel` · `Table` · `TableCell` · `TableCellRow` · `TableHead` · `Tabs` · `TextBlock` · `TextField` · `TextField2` · `TextFields` · `Thumbnail` · `ToggleButton` · `ToggleSwitch` · `Tooltip` · `TransformImage` · `TransparentButton` · `TreeItem` · `TreeView` · `TypeIconNew` · `TypeImage` · `Typography` · `Typography3` · `Undo` · `Upload` · `Validation` · `Validation3` · `ValidationWarningfilled2020` · `VibeLogo` · `Visibility` · `VisibilityOff` · `Warning` · `Warning2` · `WarningFilled` · `WarningWarning` · `ZArchiveCheckboxDesktopLabel` · `ZPropsPeopleWoman01`

### Coverage note — why 336 components for 377 kit "families"

The Figma file counts every **variant set** separately, including sets that share a name across pages. Those collapse to a single component here:

| Kit name | Sets in file | Components built |
|---|---|---|
| `Button` | 7 | 1 |
| `Chip` | 6 | 1 |
| `avatar` | 5 | 1 |
| `close` | 4 | 1 |
| `?Button?` | 4 | 1 |
| `?Typography?`, `?ListItem?`, `?Skeleton?`, `?Icon?`, `?Alert?`, `add`, `Cursor`, `?TextField?` | 3 each | 1 each |
| `?Avatar?`, `?Badge?`, `?Breadcrumbs?`, `?Link?`, `?Stack?`, `check`, `chevron_left`, `banners`, … | 2 each | 1 each |

Every **distinct** family the compiler can name is built — its "not yet built" list is empty. Nothing was intentionally skipped.

### Icons

Icon glyph families are ALSO available as icon data — `icons/icon-data.js` (kit glyphs across 7 weight axes) and `icons/material/icon-data.js` (Material Symbols working set). Render with `<FigIcon name="CheckWeight400" size={20} />` from `icons/FigIcon.jsx`. Use icon data when you need a specific weight; use the named components above for the default weight.

### Naming note

`Arrows2020Arrowpicker`, `Arrows2020Expandless` and `Arrows2020Expandmore` are the kit's `2020/arrows/*` components. The digit-leading path segment can't start a JS identifier, so it moves after the first word.
