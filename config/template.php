<?php

use Novaris\Template\Tag\{
	Archives,
	Breadcrumbs,
	Categories,
    RecentPosts,
	DocumentTitle,
};

return [
	'tags' => [
		'archives'   => Archives::class,
		'categories' => Categories::class,
		'recent_posts' => RecentPosts::class,
        'breadcrumbs' => Breadcrumbs::class,
        'document_title' => DocumentTitle::class	
	]
];