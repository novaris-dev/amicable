<?php
/**
 * List item for media post formats: image, gallery, video, audio and chat.
 *
 * Like a standard list item, but shows the whole post instead of an
 * excerpt, so the image, gallery, player or conversation is visible.
 */
?>
<article class="<?= e( post_class( [ 'entry--full' ], $entry ) ) ?>">
	<header class="entry__header">
		<?php if ( $entry->date() ) : ?>
			<div class="entry__metadata">
				<?= $entry->date(); ?>
			</div>
		<?php endif ?>

		<h2 class="entry__title">
			<a class="entry__title-anchor" href="<?= e( $entry->url() ); ?>">
				<?= e( $entry->title() ?: 'Untitled' ); ?>
			</a>
		</h2>
	</header>

	<div class="entry__content">
		<?= $entry->content() ?>
	</div>
</article>
