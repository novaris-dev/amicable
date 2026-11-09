<?php
/**
 * Search page.
 *
 * The form works without JavaScript by reloading the page with `?q=`. The
 * results are found in the browser by resources/js/search.js, which loads
 * the search index (`search.json`), so search works the same on live sites
 * and static exports.
 */

use function Novaris\Theme\Site\{search_index_url, search_query, search_url};
?>
<section id="content" class="site-content">
	<main id="main" class="content-area">
		<div class="search">
			<header class="search__header">
				<h1 class="search__title">Search</h1>
			</header>

			<form class="search-form" role="search" action="<?= e( search_url() ) ?>" method="get" data-search-index="<?= e( search_index_url() ) ?>">
				<label class="screen-reader-text" for="search-field">Search posts and pages</label>
				<input class="search-form__field" id="search-field" type="search" name="q" value="<?= e( search_query() ) ?>" placeholder="Search posts and pages" autocomplete="off" spellcheck="false">
				<button class="search-form__submit" type="submit">Search</button>
			</form>

			<p class="search__status" role="status" aria-live="polite"></p>

			<ol class="search-results" hidden></ol>

			<noscript>
				<p class="search__status">Search needs JavaScript turned on.</p>
			</noscript>
		</div>
	</main>
</section>
