document.addEventListener( 'DOMContentLoaded', function() {
	var menuButton    = document.querySelector( '.menu-toggle' );
	var menuContainer = document.querySelector( '.primary-menu' );
	var lastScroll    = window.scrollY;

	if ( ! menuButton || ! menuContainer ) {
		return;
	}

	menuButton.addEventListener( 'click', function() {
		menuContainer.classList.toggle( 'toggled' );

		menuButton.setAttribute(
			'aria-expanded',
			menuContainer.classList.contains( 'toggled' ) ? 'true' : 'false'
		);

		menuButton.classList.remove( 'menu-toggle--hidden' );
	} );

	window.addEventListener( 'scroll', function() {
		var currentScroll = window.scrollY;

		// Keep the menu button visible while the menu is open.
		if ( menuContainer.classList.contains( 'toggled' ) ) {
			menuButton.classList.remove( 'menu-toggle--hidden' );
			lastScroll = currentScroll;

			return;
		}

		// Keep the menu button visible near the top of the page.
		if ( currentScroll <= 50 ) {
			menuButton.classList.remove( 'menu-toggle--hidden' );
		} else if ( currentScroll > lastScroll ) {
			// Hide while scrolling down.
			menuButton.classList.add( 'menu-toggle--hidden' );
		} else if ( currentScroll < lastScroll ) {
			// Show while scrolling up.
			menuButton.classList.remove( 'menu-toggle--hidden' );
		}

		lastScroll = currentScroll;
	} );
} );
/**
 * Copy buttons for code blocks.
 *
 * Wraps each code block in posts and pages in a `.code-block` container and
 * adds a button that copies the code. The button sits on the container, not
 * the `<pre>`, so it stays in the corner when a long line is scrolled
 * sideways. Without the Clipboard API (old browsers, or pages not served over
 * HTTPS), no buttons are added.
 */
document.addEventListener( 'DOMContentLoaded', function() {
	var blocks = document.querySelectorAll( '.entry__content pre, .entry-content pre' );

	if ( ! blocks.length || ! navigator.clipboard ) {
		return;
	}

	var icons = {
		copy:   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
		copied: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>'
	};

	blocks.forEach( function( pre ) {
		var wrapper = document.createElement( 'div' );
		var button  = document.createElement( 'button' );
		var status  = document.createElement( 'span' );
		var timer;

		wrapper.className = 'code-block';
		pre.parentNode.insertBefore( wrapper, pre );
		wrapper.appendChild( pre );

		button.type      = 'button';
		button.className = 'code-block__copy';
		button.title     = 'Copy code';
		button.setAttribute( 'aria-label', 'Copy code' );
		button.innerHTML = icons.copy;

		// Tells screen readers the code was copied.
		status.className = 'screen-reader-text';
		status.setAttribute( 'aria-live', 'polite' );

		wrapper.appendChild( button );
		wrapper.appendChild( status );

		button.addEventListener( 'click', function() {
			var code = pre.querySelector( 'code' ) || pre;

			navigator.clipboard.writeText( code.textContent.replace( /\n$/, '' ) ).then( function() {
				button.classList.add( 'is-copied' );
				button.innerHTML   = icons.copied;
				button.title       = 'Copied';
				status.textContent = 'Code copied to the clipboard';

				clearTimeout( timer );

				timer = setTimeout( function() {
					button.classList.remove( 'is-copied' );
					button.innerHTML   = icons.copy;
					button.title       = 'Copy code';
					status.textContent = '';
				}, 2000 );
			} );
		} );
	} );
} );
