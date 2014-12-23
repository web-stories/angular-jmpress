/**
 * angular-jmpress <%= pkg.version %>
 *
 * Copyright 2014-<%= grunt.template.today("yyyy") %> Fagner Brack (@FagnerMartinsBrack)
 *
 * Released under the MIT license.
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "angular" ], factory );
	} else {
		factory( window.jQuery, window.angular );
	}
}(function( $, angular ) {
	"use strict";

if ( !$ ) {
	throw new Error( "angular-jmpress requires jQuery" );
}

if ( !angular ) {
	throw new Error( "angular-jmpress requires angular" );
}

var jQuery = $;
