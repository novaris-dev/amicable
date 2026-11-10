# Amicable

Amicable is the default theme for the Novaris Content Management System. It provides a clean starting point for building websites powered by the Novaris Framework.

## About

Amicable is designed to demonstrate the standard structure and features of a Novaris theme while remaining simple enough to customize for your own project.

When using the standard Novaris starter application, Amicable is the default configured theme. If the theme is not installed, Novaris can automatically retrieve and install the appropriate release.

## Requirements

- PHP 8.2 or later
- Novaris Framework
- Node.js and npm for theme development

## Theme Structure

A packaged Amicable theme, as built by `npm run build`, contains:

```text
amicable/
├── config/
├── public/
│   └── assets/
├── resources/
└── theme.json
```

### `config`

The theme's configuration, such as `config/app.php`, which turns on features like search, embeds and post formats, and the content types in `config/content.php`.

### `public/assets`

The compiled CSS and JavaScript, and the Vite manifest Novaris uses to find them.

### `resources`

The theme's templates in `resources/views`, and the Sass and JavaScript sources the assets are built from.

### `theme.json`

The theme's metadata: its name, slug, version and repository. This is the version Novaris and the release workflow read.

```json
{
    "name": "Amicable",
    "slug": "amicable",
    "version": "x.y.z",
    "repository": "novaris-dev/amicable"
}
```

The repository's `user/` folder holds demo content for development and isn't part of the package. A theme with PHP classes of its own can add an `app/` folder, which the build includes when it exists. Amicable has none.

## Development

Install the PHP and Node.js dependencies:

```bash
composer install
npm install
```

Build the theme:

```bash
npm run build
```

The build process creates the distributable `amicable/` directory containing the files required by Novaris.

## Releases

Amicable releases follow semantic versioning, and are published automatically.

To make a release, open a pull request from a `release/x.y.z` branch into `develop` that sets the version in `theme.json` and moves the changelog notes under a `## [x.y.z]` heading. When it's merged, the release workflow tags the merge commit `x.y.z`, publishes the release with those changelog notes, builds the theme and attaches the package. Don't tag the release by hand.

Release packages use the following naming convention:

```text
{theme}.{version}.zip
```

For example:

```text
amicable.0.3.2.zip
amicable.0.3.3.zip
```

## Novaris

Amicable is built for the Novaris Content Management System and Novaris Framework.

- Novaris: `novaris-dev/novaris`
- Framework: `novaris-dev/framework`
- Amicable: `novaris-dev/amicable`

## License

Amicable is licensed under the GNU General Public License v2.0 or later.