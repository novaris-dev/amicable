<section id="content" class="site-content">
	<main id="main" class="content-area">
		<?php
		// Each post picks its list template by post format: short formats
		// (aside, status, quote, link) show their whole content without a
		// title, and media formats (image, gallery, video, audio, chat) show
		// their whole content under the title, so the media is visible.
		// A format can have its own template first, such as
		// entry/collection-quote.php.
		$engine->each( 'entry', $entries, 'entry', fn( $entry ) => match ( $entry->format() ) {
			'aside', 'status', 'quote', 'link'            => [ 'collection-' . $entry->format(), 'collection-short', 'collection' ],
			'image', 'gallery', 'video', 'audio', 'chat' => [ 'collection-' . $entry->format(), 'collection-full', 'collection' ],
			default                                       => [ 'collection' ],
		} );
		?>
		<?= $engine->includeWhen( $pagination, 'menu.pagination' ); ?>
	</main>
</section>