<?php
/**
 * List item for short post formats: aside, status, quote and link.
 *
 * Shows the whole post without a visible title, followed by the format and
 * the date, which links to the post. The title is kept for screen readers.
 */

$labels = [ 'aside' => 'Aside', 'status' => 'Status', 'quote' => 'Quote', 'link' => 'Link' ];
?>
<article class="<?= e( post_class( [ 'entry--short' ], $entry ) ) ?>">
	<h2 class="screen-reader-text">
		<a href="<?= e( $entry->url() ); ?>"><?= e( $entry->title() ?: 'Untitled' ); ?></a>
	</h2>

	<div class="entry__content">
		<?= $entry->content() ?>
	</div>

	<footer class="entry__format-meta">
		<span class="entry__format-label"><?= e( $labels[ $entry->format() ] ?? ucfirst( $entry->format() ) ); ?></span>
		<?php if ( $entry->date() ) : ?>
			<span aria-hidden="true">·</span>
			<a class="entry__format-date" href="<?= e( $entry->url() ); ?>"><?= e( $entry->date() ); ?></a>
		<?php endif ?>
	</footer>
</article>
