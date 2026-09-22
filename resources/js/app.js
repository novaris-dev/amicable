document.addEventListener( 'DOMContentLoaded', function() {
	var menuButton    = document.querySelector( '.menu-toggle' );
	var menuContainer = document.querySelector( '#primary' );
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