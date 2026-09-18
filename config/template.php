<?php

use Novaris\Template\Tag\{
	Archives,
	Categories,
    RecentPosts,
};

return [
	'tags' => [
		'archives'   => Archives::class,
		'categories' => Categories::class,
		'recent_posts' => RecentPosts::class    
	]
];