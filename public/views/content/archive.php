<section id="content" class="site-content">
	<main id="main" class="content-area">
		<header class="archive-header">
			<h1 class="archive-title"><a href="<?= e( $single->url() ); ?>"><?= e( $single->title() ); ?></a></h1>
		</header>
		<section class="archive-content">
			<?= $single->content(); ?>
		</section>
		<?php $engine->each( 'entry.archive', $collection, 'entry' ) ?>
	</main>
</section>