<?php
/**
 * Content configuration for Novaris.
 *
 * This configuration file defines how blog posts and categories are structured and managed 
 * within the Novaris. The settings below specify content paths, taxonomy rules, and 
 * URL routing for posts and categories.
 *
 * @package   Novaris
 * @author    Benjamin Lu <benlumia007@gmail.com>
 * @copyright 2024 Benjamin Lu
 * @license   https://www.gnu.org/licenses/gpl-2.0.html
 * @link      https://github.com/novaris-dev/framework
 */


return [

	// Create custom content type and taxonomy for blog posts.
	'post' => [
		'path'          => '_posts',
		'collection'    => [ 'order' => 'desc' ],
		'date_archives' => true,
		'feed'          => [ 'taxonomy' => 'category' ],
		'routing' => [
			'prefix' => 'blog',
			'paths'  => [
				'single' => '{year}/{month}/{day}/{name}'
			]
		]
	],
	'category' => [
		'path'            => '_categories',
		'collection'      => [ 'number' => 9999 ],
		'taxonomy'        => true,
		'term_collect'    => 'post',
		'term_collection' => [ 'order' => 'desc' ],
		'routing' => [
			'prefix' => 'category',
		]
	], 
];