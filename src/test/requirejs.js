QUnit.config.reorder = false;
test( "Dependencies loading", function() {
	expect( 6 );
	strictEqual( !!window.jQuery, false, "Should not load jquery globally" );
	strictEqual( !!window.angular, false, "Should not load angular globally" );
	throws(function() {
		angular.module( "jmpress" );
	}, Error, "Should not load jmpress globally" );
	stop();
	require( [ "angular-jmpress" ], function() {
		start();
		strictEqual( !!window.jQuery, true, "Should load jquery as a module dependency" );
		strictEqual( !!window.angular, true, "Should load angular as a module dependency" );
		strictEqual( !!angular.module( "jmpress" ), true, "Should load jmpress module" );
	});
});
