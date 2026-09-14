<footer id="colophon" class="site-footer">
	<div class="site-info">
		<?= Novaris\PoweredBy::render(); ?><br />
		Powered By <a href="https://github.com/novaris-dev">Novaris</a> and <a href="https://github.com/novaris-dev/amicable"><?= e( config( 'app.title' ) ); ?></a>
	</div>
</footer>
</div>
<script src="<?= e( asset( 'resources/js/app.js' ) ) ?>"></script>
</body>
</html>