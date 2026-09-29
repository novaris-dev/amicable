<?php

// Loads header/*.php template
$engine->include( 'header', $hierarchy );

// Loads content/*.php template
$engine->include( 'content', $hierarchy );

// Loads footer/*.php template
$engine->include( 'footer', $hierarchy );