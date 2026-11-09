<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="profile" href="https://gmpg.org/xfn/11" />
<link rel="stylesheet" href="<?= e( asset( 'resources/scss/screen.scss' ) ) ?>" />
<?= $doctitle->render(); ?>
<?= Novaris\Font\fonts(); ?>
</head>
<body class="<?= e( body_class() ) ?>">	
<div id="container" class="app">
	<header id="masthead" class="app__header">
		<div class="app__header-inner">
			<div class="branding">
				<?php Novaris\Theme\Site\display_site_title(); ?>
				<?php if ( config( 'app.tagline' ) ) { ?>
					<span class="branding__separator" aria-hidden="true">&middot;</span>
					<?php Novaris\Theme\Site\display_site_description(); ?>
				<?php } ?>
			</div>
			<div class="app__header-actions">
				<?= $engine->include( 'menu.primary' ) ?>
				<?php if ( Novaris\Theme\Site\search_enabled() ) : ?>
					<a class="search-link" href="<?= e( Novaris\Theme\Site\search_url() ) ?>">
						<svg class="search-link__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
						<span class="screen-reader-text">Search</span>
					</a>
				<?php endif ?>
			</div>
		</div>
	</header>