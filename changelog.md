# Changelog

All notable changes to Amicable will be documented in this file.

## [Unreleased]

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

## [0.1.8 ]- 09.30.2026
## Fixed
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