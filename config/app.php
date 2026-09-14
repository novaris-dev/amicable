<?php
/**
 * App configuration.
 *
 * This file defines core settings for the Novaris, such as the site URL, title, 
 * tagline, timezone, and date/time formats. Additionally, it allows setting a custom 
 * homepage based on content type and includes primary navigation paths for the blog, 
 * portfolio, and about pages. The configuration also provides options to register 
 * service providers and static proxy classes, enabling extensions and custom functionality.
 *
 * @package   Novaris
 * @author    Benjamin Lu <benlumia007@gmail.com>
 * @copyright 2024 Benjamin Lu
 * @license   https://www.gnu.org/licenses/gpl-2.0.html
 * @link      https://github.com/novaris-dev/framework
 */


return [

	// Title
	'title' => 'Amicable',

	// Description
	'tagline' => 'A Novaris Theme',

	// URL to the site.
	'uri' => env( 'APP_URL' ),

	// Select from a list of supported timezones:
	// https://www.php.net/manual/en/timezones.php
	'timezone' => 'America/Los_Angeles',

	// Select from a list of supported date and time formats:
	// https://www.php.net/manual/en/datetime.formats.date.php
	'date_format' => 'F j, Y',
	'time_format' => 'g:i a',

	// Set the homepage to show a custom content type collection. This
	// should be the content type name/type (e.g., `post`) set in the
	// `/config/content.php` configuration file.  Leave empty to show the
	// normal homepage.
	'home_alias' => '',

    'primary' => [
        'Blog' => '/blog',
		'About' => '/about',
    ],

	// Register service providers.
	'providers' => [],

	// Register static proxies classes.
	'proxies' => [],
];