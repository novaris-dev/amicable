<section id="content" class="site-content">
	<main id="main" class="content-area">
		<article id="" class="<?= e( post_class() ) ?>">
		<header class="entry-header">
			<h1 class="entry-title"><?= e( $error->title() ); ?></h1>
		</header>
		<div class="entry-content">
			<?= $error->content() ?>
		</div>
		</article>
	</main>
</section>