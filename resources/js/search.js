/**
 * Search.
 *
 * Runs on the search page (content/search.php). It loads the search index
 * that the Novaris Framework builds (`search.json`), then shows the posts and
 * pages that match what's typed, as it's typed. Because the searching happens
 * here in the browser, it works the same on live sites and static exports.
 *
 * Every word must match somewhere in an entry. Matches in the title count
 * most, then categories, then the text. Accents are ignored, so "cafe" finds
 * "café", and words are matched anywhere, so Japanese and other languages
 * without spaces work too.
 *
 * It's wrapped in a function so nothing leaks into the page's globals, since
 * app.js is loaded with a plain script tag.
 */

( function() {
	'use strict';

	var SNIPPET_LENGTH = 160;

	/**
	 * Lowercases text and removes accents, for comparing.
	 */
	function normalize( text ) {
		return String( text || '' )
			.toLowerCase()
			.normalize( 'NFKD' )
			.replace( /[̀-ͯ]/g, '' );
	}

	/**
	 * Escapes text for use in HTML.
	 */
	function escapeHtml( text ) {
		return String( text || '' ).replace( /[&<>"']/g, function( character ) {
			return {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;'
			}[ character ];
		} );
	}

	/**
	 * Escapes text for use in a regular expression.
	 */
	function escapeRegExp( text ) {
		return text.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
	}

	/**
	 * Escapes text and wraps each search word in `<mark>`.
	 */
	function highlight( text, words ) {
		if ( ! words.length ) {
			return escapeHtml( text );
		}

		var pattern = new RegExp( '(' + words.map( escapeRegExp ).join( '|' ) + ')', 'gi' );

		// Split before escaping, so a match can never land inside an entity.
		// With a capturing group, the matches are at the odd positions.
		return String( text || '' ).split( pattern ).map( function( part, index ) {
			return index % 2 ? '<mark>' + escapeHtml( part ) + '</mark>' : escapeHtml( part );
		} ).join( '' );
	}

	/**
	 * Returns a short part of the text around the first search word, or the
	 * excerpt if none of the words are in the text as typed.
	 */
	function snippet( entry, words ) {
		var text  = entry.text || '';
		var lower = text.toLowerCase();
		var index = -1;

		words.some( function( word ) {
			index = lower.indexOf( word.toLowerCase() );
			return -1 !== index;
		} );

		if ( -1 === index ) {
			return entry.excerpt || text.slice( 0, SNIPPET_LENGTH );
		}

		var start = Math.max( 0, index - Math.round( SNIPPET_LENGTH / 3 ) );
		var end   = Math.min( text.length, start + SNIPPET_LENGTH );

		// Start and end on whole words where there are spaces.
		if ( start > 0 ) {
			var space = text.indexOf( ' ', start );
			start = -1 !== space && space < index ? space + 1 : start;
		}

		if ( end < text.length ) {
			var lastSpace = text.lastIndexOf( ' ', end );
			end = lastSpace > index ? lastSpace : end;
		}

		return ( start > 0 ? '… ' : '' ) + text.slice( start, end ) + ( end < text.length ? ' …' : '' );
	}

	/**
	 * Prepares index entries for searching.
	 */
	function prepare( entries ) {
		return entries.map( function( entry ) {
			var terms = [];

			Object.keys( entry.terms || {} ).forEach( function( taxonomy ) {
				terms = terms.concat( entry.terms[ taxonomy ] );
			} );

			return {
				entry: entry,
				title: normalize( entry.title ),
				terms: normalize( terms.join( ' ' ) ),
				text:  normalize( entry.excerpt + ' ' + entry.text )
			};
		} );
	}

	/**
	 * Returns the entries that match every word, best first.
	 */
	function search( prepared, words ) {
		var normalized = words.map( normalize );

		return prepared
			.map( function( item ) {
				var score = 0;

				var matchesAll = normalized.every( function( word ) {
					var found = false;

					if ( -1 !== item.title.indexOf( word ) ) {
						score += 0 === item.title.indexOf( word ) ? 15 : 10;
						found = true;
					}

					if ( -1 !== item.terms.indexOf( word ) ) {
						score += 4;
						found = true;
					}

					if ( -1 !== item.text.indexOf( word ) ) {
						score += 1 + Math.min( item.text.split( word ).length - 2, 5 ) * 0.2;
						found = true;
					}

					return found;
				} );

				return matchesAll ? { entry: item.entry, score: score } : null;
			} )
			.filter( Boolean )
			.sort( function( a, b ) {
				return b.score - a.score || String( b.entry.date ).localeCompare( String( a.entry.date ) );
			} )
			.map( function( result ) {
				return result.entry;
			} );
	}

	/**
	 * Formats a `Y-m-d` date for people, in the page's language.
	 */
	function formatDate( date ) {
		if ( ! date ) {
			return '';
		}

		var parsed = new Date( date + 'T12:00:00' );

		if ( isNaN( parsed ) ) {
			return date;
		}

		return parsed.toLocaleDateString( document.documentElement.lang || undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		} );
	}

	/**
	 * Returns the HTML for one result.
	 */
	function resultHtml( entry, words ) {
		var date = formatDate( entry.date );

		return '<li class="search-results__item">' +
			'<article class="search-result">' +
				( date ? '<div class="search-result__meta"><time datetime="' + escapeHtml( entry.date ) + '">' + escapeHtml( date ) + '</time></div>' : '' ) +
				'<h2 class="search-result__title"><a class="search-result__link" href="' + escapeHtml( entry.url ) + '">' +
					highlight( entry.title || 'Untitled', words ) +
				'</a></h2>' +
				'<p class="search-result__snippet">' + highlight( snippet( entry, words ), words ) + '</p>' +
			'</article>' +
		'</li>';
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		var form = document.querySelector( '.search-form[data-search-index]' );

		if ( ! form ) {
			return;
		}

		var field    = form.querySelector( '.search-form__field' );
		var status   = document.querySelector( '.search__status' );
		var list     = document.querySelector( '.search-results' );
		var prepared = null;
		var loading  = null;
		var timer;

		/**
		 * Loads the index once.
		 */
		function load() {
			if ( ! loading ) {
				loading = fetch( form.getAttribute( 'data-search-index' ), { credentials: 'same-origin' } )
					.then( function( response ) {
						if ( ! response.ok ) {
							throw new Error( 'HTTP ' + response.status );
						}

						return response.json();
					} )
					.then( function( data ) {
						prepared = prepare( data.entries || [] );
						return prepared;
					} );
			}

			return loading;
		}

		/**
		 * Keeps the query in the address, so results can be shared and the
		 * back button works.
		 */
		function updateAddress( query ) {
			var url = new URL( window.location.href );

			if ( query ) {
				url.searchParams.set( 'q', query );
			} else {
				url.searchParams.delete( 'q' );
			}

			window.history.replaceState( null, '', url );
		}

		function render( query ) {
			var words = query.split( /\s+/ ).filter( Boolean );

			if ( ! words.length ) {
				list.hidden      = true;
				list.innerHTML   = '';
				status.textContent = '';
				return;
			}

			var results = search( prepared, words );

			status.textContent = results.length
				? results.length + ( 1 === results.length ? ' result' : ' results' ) + ' for “' + query + '”'
				: 'No results for “' + query + '”';

			list.innerHTML = results.map( function( entry ) {
				return resultHtml( entry, words );
			} ).join( '' );

			list.hidden = ! results.length;
		}

		function run() {
			var query = field.value.trim();

			updateAddress( query );

			if ( ! query ) {
				render( '' );
				return;
			}

			if ( prepared ) {
				render( query );
				return;
			}

			status.textContent = 'Searching…';

			load().then( function() {
				// The field may have changed while the index loaded.
				render( field.value.trim() );
			} ).catch( function() {
				loading = null;
				status.textContent = 'Search isn’t available right now. Please try again later.';
			} );
		}

		// Static exports have no server to fill in the field, so read the
		// query from the address.
		var initial = new URLSearchParams( window.location.search ).get( 'q' );

		if ( initial ) {
			field.value = initial;
			run();
		} else {
			field.focus();
		}

		// Load the index as soon as someone starts to search.
		field.addEventListener( 'focus', function() {
			load().catch( function() {
				loading = null;
			} );
		}, { once: true } );

		field.addEventListener( 'input', function() {
			clearTimeout( timer );
			timer = setTimeout( run, 150 );
		} );

		form.addEventListener( 'submit', function( event ) {
			event.preventDefault();
			clearTimeout( timer );
			run();
		} );
	} );
}() );
