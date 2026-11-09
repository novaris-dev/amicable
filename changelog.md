# Changelog

All notable changes to Amicable will be documented in this file.

## [Unreleased]

### Added

- Feed links in the page `<head>` (RSS and Atom for each content type with a feed), so browsers and feed readers can find the blog's feed. Static exports link to the `.xml` files.
- Sitemaps are turned on (`'sitemap' => true` in `config/app.php`), at `/sitemap`, with a sitemap each for posts, categories and pages.

### Changed

- Releases are automatic: merging a pull request from a `release/x.y.z` branch tags the merged code `x.y.z`, publishes the release with notes from this changelog, and attaches the ZIP. Publishing a release by hand still builds the ZIP as before.
- Updated the Novaris Framework from 1.1.5 to 1.1.6 in `composer.lock`. Links from images to their full size now work when the content is in another folder (`NOVARIS_USER_PATH`), uncropped image sizes no longer share files with cropped ones, and video posts' excerpts no longer start with "Play video on YouTube".
- Every pull request is checked automatically (`.github/workflows/theme-check.yml`): Amicable is built with the theme test data, the whole test site is exported, and the check fails on PHP warnings, missing pages, broken links, invalid feeds or sitemaps, and HTML problems.

### Fixed

- `npm run dev` exported with a fixed address (`--url=https://novarisframework.codestacks.cc`), so exported pages linked to that domain wherever you ran it. It now uses `APP_URL` from `.env`.

## [0.2.8] - 11.09.2026

### Added

- Post formats (Novaris Framework 1.1.5 or newer), with all nine formats turned on in `config/app.php`. A post with `format:` in its front matter gets its own layout in lists and archives:
  - Aside, status, quote and link (`entry/collection-short.php`): the whole post in a light card, without a visible title, followed by the format and the date, which links to the post. Status posts are larger, quotes are large and italic with their source below, and the link stands out.
  - Image, gallery, video, audio and chat (`entry/collection-full.php`): the whole post under its title instead of an excerpt, so the media or conversation shows in the list.
  - A format can get its own list template, such as `entry/collection-quote.php`.
  - Posts get a `format-*` class (`format-standard` without a format) on lists and single posts.

### Changed

- Updated the Novaris Framework from 1.1.4 to 1.1.5 in `composer.lock`, which adds post formats.

## [0.2.7] - 11.09.2026

### Changed

- Updated the Novaris Framework from 1.1.3 to 1.1.4 in `composer.lock`. Feeds now have content, empty categories have a page instead of a 404 (so the category list has no broken links), and small images are no longer enlarged.

### Fixed

- A post or page with no title showed an empty heading, and its link in the blog list had no text, so it couldn't be clicked. It now shows "Untitled".
- Long words and URLs made posts and pages scroll sideways on phones. They now wrap.
- Wide tables made posts and pages scroll sideways on phones. They now scroll inside themselves (`07.components/03.contents/09.overflow`).

## [0.2.6] - 11.09.2026

### Added

- Embeds, using Novaris Framework's `supports.embeds` (framework 1.1.3 or newer). A YouTube, Vimeo, video or audio link on its own line in a post becomes a player.
  - YouTube and Vimeo show in a 16:9 frame with a play button, and YouTube also shows the video's thumbnail. The real player only loads when the button is clicked (`resources/js/embeds.js`), so YouTube's and Vimeo's scripts don't load for visitors who don't play the video. With a modifier key, or without JavaScript, the button opens the video on its own site.
  - Video and audio files use the browser's player, full width.

### Changed

- Updated the Novaris Framework from 1.1.2 to 1.1.3 in `composer.lock`, which adds embeds and stops wrapping linked images in `<p>`, so linked galleries no longer get empty grid cells.

## [0.2.5] - 11.09.2026

### Changed

- On desktop, a thin divider now separates the header's search icon from the menu, so it reads as its own control rather than another menu item. Phones are unchanged.

## [0.2.4] - 11.09.2026

### Added

- Search, using the search index from Novaris Framework 1.1.2. It's turned on in `config/app.php` with `supports.search`.
  - A search icon in the header links to the search page.
  - The search page (`content/search.php`) shows results as you type. Every word must match; matches in titles rank first, then categories, then the text. Matching words are highlighted, and each result shows its date and the part of the text around the match. Accents are ignored, and languages without spaces, such as Japanese, work too.
  - The query stays in the address (`/search?q=…`), so results can be shared and bookmarked. It works the same on static exports, since the searching happens in the browser (`resources/js/search.js`), without a library.
  - Without JavaScript, the form still submits and keeps the query, and the page says search needs JavaScript.

### Changed

- Updated the Novaris Framework from 1.0.9 to 1.1.2 in `composer.lock`.

## [0.2.3] - 11.04.2026

### Added

- A copy button on code blocks in posts and pages. It appears in the top-right corner when you hover over a block (always on touch screens), copies the code, and shows a check mark for two seconds. It stays in the corner when a long line is scrolled sideways, and announces the copy to screen readers.
- Gallery styles for `.gallery` and `.gallery-columns-2`, `-3` and `-4`: a grid of square-cropped images with centered captions. Galleries show two columns on phones and their own number of columns from 641px up. See `07.components/03.contents/07.gallery`.

### Changed

- Updated the Novaris Framework from 1.0.6 to 1.0.9 in `composer.lock`. 1.0.7 to 1.0.9 add `NOVARIS_USER_PATH`, an optional `.env` setting for testing the theme with content from another folder such as theme-test-data, a `novaris serve` command, and serving that folder's images on live sites.
- Code blocks (`<pre>`) are now a flat light panel with a thin border and rounded corners, set in the code font, replacing the inset shadow, text shadow and thick left border. Long lines scroll inside the block, and the block can no longer be wider than the page on phones.
- The `code` color is replaced by `code-background`, `code-border` and `code-text`. If you set `--color-code`, use those instead.

### Removed

- The old `.gallery-columns-3` rule in `08.utilities/07.grid`. The class still works, through the new gallery styles.

## [0.2.2] - 11.04.2026

### Changed

- Updated the Novaris Framework from 1.0.3 to 1.0.6 in `composer.lock`. 1.0.4 makes `featured_image()` honor `'featured-image' => false`; Amicable sets it to an array of image sizes, so featured images stay on. 1.0.5 and 1.0.6 make `novaris export --watch` re-export when a parent theme's files or the site's `config/` files change.

## [0.2.1] - 11.03.2026

### Changed

- Updated the Novaris Framework from 1.0.1 to 1.0.3 in `composer.lock`. 1.0.3 fixes `featured_image()`, which returned `null` for themes like Amicable that turn on featured images in `config/app.php`. Amicable's templates call `thumbnail()` directly, so nothing else changes.
- `theme.json` now has a `$schema` line, so editors such as VS Code autocomplete its fields and warn about missing or misspelled ones.

## [0.2.0] - 11.03.2026

### Changed

- The theme's styles now use the color settings instead of hard-coded colors (57 values in the elements, layouts, and components). Each one uses the setting with the same value, so the theme looks the same, but changing a color in `01.settings/03.colors` (or its `--color-*` property) now updates it everywhere. See the Colors section of `resources/scss/README.md`.
- Added a `border-light` color (`#dddddd`, pagination borders).

## [0.1.9] - 11.03.2026

### Added

- Helper classes generated from the SCSS settings, using the same generator as novaris-dev/novaris. The settings hold Amicable's own design values, so the classes match the theme: `.text-muted`, `.bg-surface`, `.border-divider`, `.font-date`, `.gap-gutter`, `.md:grid-cols-3`… See `resources/scss/README.md`.
- Settings scales in `resources/scss/01.settings`: Amicable's color palette, breakpoints (641px, 769px, 1170px), content widths (640px, 896px, 1170px), border widths and radii, shadows, opacities, font sizes, weights and line heights, and a spacing scale with a `gutter` (1.125rem) step.
- `up()` / `down()` breakpoint mixins and the `utility()` generator in `02.tools`.
- `03.generics/03.tokens`: the colors and content widths as CSS custom properties (`--color-muted`, `--width-wide`).

### Changed

- The SCSS folders use numbered folders with an `_index.scss` per piece, matching novaris-dev/novaris (`01.settings/03.colors/_index.scss` instead of `01.settings/_colors.scss`).
- The named color palette (aqua, coral…) moved from the spacings settings to the colors settings, where it belongs. `colors()` and `color()` work as before.
- Requires PHP 8.2 or later (`composer.json` and readme). The readme said 8.0, but the dependencies need 8.1 and the locked `nette/utils` needs 8.2.
- Updated `novaris-dev/framework` to 1.0.1.

The theme's look is unchanged: no existing styles were edited.

## [0.1.8] - 09.30.2026

### Fixed
CSS and JavaScript returned 404 when Amicable runs as a private app, such as its own development site, so pages were unstyled and the mobile menu button did not respond. Fixed by updating to the latest Novaris Framework, which serves private app assets from public/assets again and rewrites those URLs to /assets/ in static exports.

## [0.1.7] - 09.30.2026

### Added

- `.env.example` with `APP_URL` and `PURGE_KEY`, so a fresh clone can be set up with `cp .env.example .env`.
- Pagination on category and date archive pages. Previously only the first page of an archive was reachable.
- `lang="en"` on the `<html>` element.

### Changed

- The theme export (`npm run build`) now copies only `public/assets` instead of the whole `public` folder, so static HTML from `composer novaris export` is no longer included in the theme package.
- The theme export now removes the development-only `'private' => true` setting from the packaged `config/app.php`. Sites that install Amicable no longer need to set `'private' => false` themselves.
- The release workflow now accepts tags with or without a leading `v` (for example `0.1.7` or `v0.1.7`) and always names the package `amicable.{version}.zip`, which is the name Novaris looks for when installing.
- The release workflow now fails early if the release tag does not match the version in `theme.json`.
- The release workflow no longer installs Composer dependencies, which the build did not use.
- Code blocks now use JetBrains Mono, which the theme loads, instead of Source Code Pro, which it did not.
- `PURGE_KEY` now defaults to an empty value. A missing key disables cache purging instead of crashing every page.
- Updated `composer.json` (`novaris-dev/amicable`) and `package.json` (description, license, homepage and repository) to describe Amicable instead of the Novaris core and the former ClassicPress theme.
- Updated to the latest Novaris Framework, which installs a missing theme before reading it and shows a clear message when `APP_URL` is not set.

### Fixed

- Fonts on code blocks, the mobile menu button and post dates were not applied because `font-family()` was called without the `fonts.` namespace, which produced invalid CSS.
- Archive entries used the old `entry-*` class names and were unstyled; they now use the `entry__*` classes shared by the blog and single posts.
- The 404 page now uses the `entry__*` classes, so it is styled like other pages.
- The featured image hover zoom did not work because the image used the wrapper's class; it now uses `entry__thumbnail-image`.
- Items without a date, such as categories on `/category`, no longer show an empty date box.
- Removed empty `id=""` attributes from the 404, page and archive entry templates.
- Removed a `$engine->doctype()` call from the header that printed nothing.
- Headings in the "A Weekend Away" demo post were plain text; they are now Markdown headings.
- Removed placeholder text from the categories index page.

### Removed

- Unused WordPress and ClassicPress styles: `admin.scss`, `customize-controls.scss`, `customize-preview.scss` and `09.admin/`.
- Seven demo posts whose file names produced incorrect URLs, either with the date repeated in the URL or with a misspelled slug.