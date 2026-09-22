<?php

use Novaris\Template\Tag\{
	Archives,
	Breadcrumbs,
	Categories,
    RecentPosts,
};

return [
	'tags' => [
		'archives'   => Archives::class,
		'categories' => Categories::class,
		'recent_posts' => RecentPosts::class,
        'breadcrumbs' => Breadcrumbs::class
	]
];