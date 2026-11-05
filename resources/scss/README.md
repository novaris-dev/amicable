# Amicable SCSS

Styles follow ITCSS. The numbered folders load in order (see `screen.scss`):

| Folder | Holds | Prints CSS? |
|---|---|---|
| `01.settings` | Amicable's design values: colors, fonts, spacing, breakpoints… | No |
| `02.tools` | `up()` / `down()` breakpoints and the `utility()` generator | No |
| `03.generics` | Reset, clearings, and `03.tokens`: colors and widths as CSS custom properties | Yes |
| `04.elements` | Bare HTML tags: defaults, headings, code | Yes |
| `05.objects` | Layout patterns (empty) | Yes |
| `06.layouts` | Header, content, footer | Yes |
| `07.components` | Navigation, entries, comments… | Yes |
| `08.utilities` | Helper classes, **generated from the settings** | Yes |

The theme's own look lives in `04`–`07` and in `screen.scss` (breadcrumbs, blockquotes). The generated helper classes are extra: use them in templates or content to adjust layouts without new CSS.

## Generated helper classes

Every helper class comes from a scale in `01.settings`, filled with the values Amicable's design uses. Change a scale and its classes change on the next build:

| Setting | Values | Classes |
|---|---|---|
| `$colors` (03.colors) | text, link, heading, muted, muted-dark, surface, divider, border, border-light, code-background, code-border, code-text, dark, light, gray, error, black, white | `.text-{color}`, `.bg-{color}`, `.border-{color}` |
| `$spacing-steps`, `$spacing-names` (08.spacings) | 0.25rem steps 0, 1, 2, 3, 4, 6, 8, 9, 12; `gutter` = 1.125rem; `px` | `.m-*`, `.p-*`, `.mt-*`… `.gap-*`, `.gap-gutter` |
| `$font-families` (06.fonts) | heading (Fira Sans), primary (Merriweather), date (Tangerine), code (JetBrains Mono) | `.font-heading`, `.font-date`… |
| `$font-sizes`, `$font-weights`, `$line-heights` | xs–5xl; normal, semibold, bold; none–relaxed | `.text-sm`, `.font-bold`, `.leading-tight` |
| `$border-widths`, `$radii` (01.borders) | 0, 1 (0.063rem hairline), 4, 6; none, sm, base, md, lg, full | `.border-1`, `.rounded-lg` |
| `$shadows`, `$opacities` (05.effects) | none, sm, md (menus); 0, 50, 70, 100 | `.shadow-md`, `.opacity-70` |
| `$sizes` (07.sizings) | full, half, third… | `.w-full`, `.h-auto` |
| `$content-widths` (04.dimensions) | narrow 640px, medium 896px, wide 1170px | `.max-w-narrow`, `.container` |
| `$breakpoints` (02.breaks) | sm 641px, md 769px, lg 1170px | the `md:` prefix |

### Responsive classes

Layout classes also get an `md:` copy that applies from 769px up, where Amicable switches to its desktop layout:

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">…</div>
<p class="text-center md:text-left">…</p>
```

To add more breakpoints, list them in `$utility-breakpoints` (`01.settings/09.utilities`). Each one adds a copy of every responsive class.

### The classes

| Folder | Classes |
|---|---|
| 01.a11y | `.screen-reader-text`, `.skip-link` (Amicable's own) |
| 02.alignments | `.alignleft`, `.alignright`, `.aligncenter`, `.alignwide`, `.alignfull` (Amicable's own) |
| 03.background | `.bg-{color}` |
| 04.borders | `.border`, `.border-{0,1,4,6}`, `.border-{color}`, `.rounded-*` |
| 05.effects | `.shadow-{none,sm,md}`, `.opacity-{0,50,70,100}` |
| 06.flexbox | `.flex-{row,col,wrap,…}`, `.items-*`, `.justify-*`, `.flex-1`, `.grow`, `.shrink-0` |
| 07.grid | Amicable's `.grid-col-{1–10}`, plus generated `.grid-cols-{1–12}`, `.col-span-{1–12,full}` |
| 08.helpers | `.clearfix`, `.truncate`, `.cursor-pointer`, `.select-none` |
| 09.layout | `.block`, `.flex`, `.grid`, `.hidden`…, `.relative`…, `.overflow-*`, `.container` |
| 10.list | `.list-none`, `.list-disc`, `.list-decimal`, `.list-inside` |
| 11.media | Amicable's `img` / `figure` defaults, plus `.object-cover`, `.aspect-video`… |
| 12.sizing | `.w-*`, `.h-*`, `.max-w-{narrow,medium,wide}`, `.min-h-screen` |
| 13.text | `.text-{left,center,right}`, `.text-{color}`, `.uppercase`, `.underline`, `.italic` |
| 14.typography | `.font-{role}`, `.text-{size}`, `.font-{weight}`, `.leading-*` |
| 15.spacings | `.m-*`, `.p-*` (all sides), `.mx-auto`, `.gap-*` |

## Make your own

```scss
@use '../../02.tools' as tools;

@include tools.utility( z, z-index, ( 0: 0, 10: 10, 50: 50 ) );
// .z-0, .z-10, .z-50
```

Arguments: class prefix (or `null` for the key alone), CSS property (or a list), a map of `suffix: value`, and `$responsive`.

## Colors

The theme's own styles read their colors from `$colors` through custom properties, so one change updates every place a color is used:

| Change | Updates |
|---|---|
| `text` | body text |
| `link` | links |
| `heading` | post and page titles |
| `muted` | dates, meta, header tagline, footer text |
| `surface` / `divider` | header and footer background and lines |
| `border` / `gray` | comment borders and backgrounds |
| `dark` / `light` / `border-light` | pagination |
| `black` / `white` | the menu |
| `code-background` / `code-border` / `code-text` | code blocks (`<pre>`) |

Edit the value in `01.settings/03.colors` and rebuild, or override it at run time without a rebuild:

```css
:root { --color-link: #e63946; }
```

## Fonts

Components use `fonts.font-family( 'heading' )` (and `primary`, `date`, `code`), as before. Each role can be changed at run time with its custom property, without a rebuild:

```css
:root { --font-family-heading: 'Lato', sans-serif; }
```

The `.font-*` classes use the same values, so they follow the change.

## Breakpoints in your own styles

```scss
@use '../../02.tools' as tools;

.entry {
	@include tools.up( md ) {     // 769px and wider
		padding: 2rem;
	}
}
```

A typo such as `tools.up( tablet )` stops the build and lists the valid names.
