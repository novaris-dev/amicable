/**
 * Click to load for embeds.
 *
 * The Novaris Framework turns a YouTube or Vimeo link on its own line into a
 * play button (`.embed__play`) that links to the video, with the player's
 * address in `data-embed-src`. When the button is clicked, this swaps in the
 * player, so YouTube's and Vimeo's scripts only load for people who play the
 * video. Without this script, the button opens the video on its own site.
 */
( function() {
	'use strict';

	document.addEventListener( 'click', function( event ) {
		var link = event.target.closest ? event.target.closest( '.embed__play[data-embed-src]' ) : null;

		// Let people open the video in a new tab with a modifier key.
		if ( ! link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || 0 !== event.button ) {
			return;
		}

		var src;

		try {
			src = new URL( link.getAttribute( 'data-embed-src' ), window.location.href );
		} catch ( error ) {
			return;
		}

		// Only ever load the two players the framework makes.
		if ( 'https:' !== src.protocol || -1 === [ 'www.youtube-nocookie.com', 'www.youtube.com', 'player.vimeo.com' ].indexOf( src.hostname ) ) {
			return;
		}

		event.preventDefault();

		// They clicked play, so start the video straight away.
		src.searchParams.set( 'autoplay', '1' );

		var iframe = document.createElement( 'iframe' );

		iframe.className = 'embed__iframe';
		iframe.src       = src.toString();
		iframe.title     = link.getAttribute( 'data-embed-title' ) || 'Video';
		iframe.allow     = 'accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture';
		iframe.setAttribute( 'allowfullscreen', '' );
		iframe.setAttribute( 'referrerpolicy', 'strict-origin-when-cross-origin' );

		var figure = link.closest( '.embed' );

		link.replaceWith( iframe );

		if ( figure ) {
			figure.classList.remove( 'embed--click-to-load' );
			figure.classList.add( 'embed--loaded' );
		}

		iframe.focus();
	} );
}() );
