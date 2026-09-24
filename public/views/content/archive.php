<section id="content" class="site-content">
	<main id="main" class="content-area">
		<header class="archive-header">
			<h1 class="archive-title"><?= e( $archive->title() ); ?></h1>
		</header>
		<section class="archive-content">
			<?= $archive->content(); ?>
		</section>
		<?php $engine->each( 'entry.archive', $entries, 'entry' ) ?>
	</main>
</section>
<?php dd( $data->all() ); ?>