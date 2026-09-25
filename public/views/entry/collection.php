<article class="<?= e( post_class() ) ?>">
	<header class="entry__header">
		<div class="entry__metadata">
			<?= $entry->date(); ?>
		</div>

		<h2 class="entry__title">
			<a class="entry__title-anchor" href="<?= e( $entry->url() ); ?>">
				<?= e( $entry->title() ); ?>
			</a>
		</h2>
	</header>

	<?php if ( $thumbnail = $entry->thumbnail( 'amicable-landscape-large' ) ) : ?>
		<picture class="entry__thumbnail">
			<img class="entry__thumbnail" src="<?= e( $thumbnail->url() ); ?>" width="<?= $thumbnail->width(); ?>" height="<?= $thumbnail->height(); ?>" alt="">
		</picture>
	<?php endif ?>

	<div class="entry__content">
		<?= $entry->excerpt( 50, sprintf(
			' &hellip; <a class="entry__more-link" href="%s">Continue reading&nbsp;&rarr;</a>',
			e( $entry->uri() )
		) ) ?>
	</div>
</article>