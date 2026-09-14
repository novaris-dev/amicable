# Amicable

Amicable is the default theme for the Novaris Content Management System. It provides a clean starting point for building websites powered by the Novaris Framework.

## About

Amicable is designed to demonstrate the standard structure and features of a Novaris theme while remaining simple enough to customize for your own project.

When using the standard Novaris starter application, Amicable is the default configured theme. If the theme is not installed, Novaris can automatically retrieve and install the appropriate release.

## Requirements

- PHP 8.0 or later
- Novaris Framework
- Node.js and npm for theme development

## Theme Structure

A packaged Amicable theme uses the following structure:

```text
amicable/
├── app/
├── public/
├── user/
└── theme.json
```

### `app`

Contains the theme's PHP application files, templates, and other theme-specific functionality.

### `public`

Contains compiled assets that are publicly accessible, including CSS, JavaScript, images, and the Vite manifest.

### `user`

Contains theme content and other user-facing resources provided by the theme.

### `theme.json`

Contains metadata about the theme, including its name, slug, version, and repository.

```json
{
    "name": "Amicable",
    "slug": "amicable",
    "version": "0.0.1",
    "repository": "novaris-dev/amicable"
}
```

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

Amicable releases follow semantic versioning.

Before publishing a new release, update the version in `theme.json`.

For example:

```json
"version": "0.0.2"
```

The GitHub release tag should match the version defined in `theme.json`.

Release packages use the following naming convention:

```text
{theme}.{version}.zip
```

For example:

```text
amicable.0.0.1.zip
amicable.0.0.2.zip
```

## Novaris

Amicable is built for the Novaris Content Management System and Novaris Framework.

- Novaris: `novaris-dev/novaris`
- Framework: `novaris-dev/framework`
- Amicable: `novaris-dev/amicable`

## License

Amicable is licensed under the GNU General Public License v2.0 or later.