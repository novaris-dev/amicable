<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="profile" href="https://gmpg.org/xfn/11" />
<link rel="stylesheet" href="<?= e( asset( 'resources/scss/screen.scss' ) ) ?>" />
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
			<?= $engine->include( 'menu.primary' ) ?>
		</div>
	</header>