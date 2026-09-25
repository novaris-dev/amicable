<section id="content" class="site-content">
	<main id="main" class="content-area">
		<article class="<?=e( post_class() ); ?>">
		<header class="entry__header">
			<h1 class="entry__title"><?= e( $home->title() ); ?></h1>
		</header>
		<div class="entry__content">
			<?= $home->content(); ?>
		</div>
		</article>
	</main>
</section>