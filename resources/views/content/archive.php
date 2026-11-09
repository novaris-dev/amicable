<section id="content" class="site-content">
	<main id="main" class="content-area">
		<header class="archive-header">
			<h1 class="archive-title"><?= e( $archive->title() ); ?></h1>
		</header>
		<section class="archive-content">
			<?= $archive->content(); ?>
		</section>
		<?php
		// Like content/collection.php: posts with a post format use the
		// short or full list template, and the rest use entry/archive.php.
		$engine->each( 'entry', $entries, 'entry', fn( $entry ) => match ( $entry->format() ) {
			'aside', 'status', 'quote', 'link'            => [ 'archive-' . $entry->format(), 'collection-short', 'archive' ],
			'image', 'gallery', 'video', 'audio', 'chat' => [ 'archive-' . $entry->format(), 'collection-full', 'archive' ],
			default                                       => [ 'archive' ],
		} );
		?>
		<?= $engine->includeWhen( $pagination, 'menu.pagination' ); ?>
	</main>
</section>