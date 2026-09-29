<section id="content" class="site-content">
	<main id="main" class="content-area">
		<?php $engine->each( 'entry.collection', $entries, 'entry' ); ?>
		<?= $engine->includeWhen( $pagination, 'menu.pagination' ); ?>
	</main>
</section>