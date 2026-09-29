<section id="content" class="site-content">
	<main id="main" class="content-area">
		<article class="<?= e( post_class() ) ?>">
			<header class="entry__header">
				<div class="entry__metadata">
					<?= $single->date(); ?>
				</div>

				<h1 class="entry__title">
					<?= e( $single->title() ); ?>
				</h1>
			</header>
			<?php if ( $thumbnail = $single->thumbnail( 'amicable-landscape-extra-large' ) ) : ?>
				<picture class="entry__thumbnail">
					<img class="entry__thumbnail" src="<?= e( $thumbnail->url() ); ?>" width="<?= $thumbnail->width(); ?>" height="<?= $thumbnail->height(); ?>" alt="">
				</picture>
			<?php endif ?>
			<div class="entry__content">
				<?= $single->content() ?>
			</div>

			<footer class="entry__footer">
				<?php if ( $tags = $single->terms( 'category' ) ) : ?>
					<div class="entry__terms">
						Tagged:

						<?php foreach ( $tags as $tag ) : ?>
							<a class="entry__term-anchor" href="<?= e( $tag->uri() ) ?>">
								#<?= e( $tag->name() ) ?>
							</a>
						<?php endforeach ?>
					</div>
				<?php endif ?>
			</footer>
		</article>
	</main>
</section>