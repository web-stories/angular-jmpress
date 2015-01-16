/**
 * angular-jmpress <%= pkg.version %>
 *
 * Copyright 2014-<%= grunt.template.today("yyyy") %> Fagner Brack (@FagnerMartinsBrack)
 *
 * Released under the MIT license.
 */
(function( factory ) {
	// There's no specific reason for the current dependency ordering.
	// It just seems semantically correct to load "jquery" first, then the "jquery.jmpress" plugin,
	// and then the "angular-jmpress" wrapper.
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "jquery.jmpress", "angular" ], factory );
	} else {
		factory( window.jQuery, undefined, window.angular );
	}
}(function( $, undefined, angular ) {
	"use strict";

if ( !$ ) {
	throw new Error( "angular-jmpress requires jQuery" );
}

if ( !angular ) {
	throw new Error( "angular-jmpress requires angular" );
}

var jQuery = $;
