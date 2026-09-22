<?php
/**
 * Font configuration.
 *
 * Defines the fonts used by the theme.
 *
 * @package   Prismatic
 * @author    Benjamin Lu <benlumia007@gmail.com>
 * @copyright 2024 Benjamin Lu
 * @license   https://www.gnu.org/licenses/gpl-2.0.html
 * @link      https://github.com/novaris-dev/prismatic
 */

return [
	'fira-sans' => [
		'family' => 'Fira Sans',
		'stack'  => '"Fira Sans", sans-s erif',
		'google' => 'Fira+Sans',
		'styles' => [
			'100', '100i',
			'200', '200i',
			'300', '300i',
			'400', '400i',
			'500', '500i',
			'600', '600i',
			'700', '700i',
			'800', '800i',
			'900', '900i'
		]
	],

	'merriweather' => [
		'family' => 'Merriweather',
		'stack'  => 'Merriweather, serif',
		'google' => 'Merriweather',
		'styles' => [
			'300', '300i',
			'400', '400i',
			'700', '700i',
			'900', '900i'
		]
	],

	'tangerine' => [
		'family' => 'Tangerine',
		'stack'  => 'Tangerine, cursive',
		'google' => 'Tangerine',
		'styles' => [
			'400',
			'700'
		]
	],

	'source-code-pro' => [
		'family' => 'Source Code Pro',
		'stack'  => '"Source Code Pro", Monaco, Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
		'google' => 'Source+Code+Pro',
		'styles' => [
			'200',
			'300',
			'400',
			'500',
			'600',
			'700',
			'900'
		]
	]
];