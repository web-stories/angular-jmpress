(function() {
	test( "Dependencies loading", function() {
		expect( 4 );
		strictEqual( !!window.jQuery, false, "Should not load jquery globally" );
		throws(function() {
			angular.module( "jmpress" );
		}, Error, "Should not load jmpress globally" );
		stop();
		require( [ "angular-jmpress" ], function() {
			start();
			// requirejs.org/docs/jquery.html#noconflictmap
			strictEqual( !!window.jQuery, false, "jQuery should still not be available globally" );
			strictEqual( !!angular.module( "jmpress" ), true, "Should load jmpress module" );
		});
	});

	asyncTest( "Initialization in requireJS environment",
		setup( "require-init", function controller( $scope ) {
			$scope.steps = [{
				number: 1
			}, {
				number: 2
			}];
		}, function test( root ) {
			expect( 1 );
			var steps = root.querySelectorAll( ".step" );
			strictEqual( steps.length, 2, "Should create two steps" );
		})
	);

	function setup( id, controller, testFunction ) {
		return function() {
			require( ["angular-jmpress"], function() {
				start();
				var target = document.getElementById( id );
				angular.module( "test", [ "jmpress" ] )
					.controller( "Controller", controller );
				angular.bootstrap( target, [ "test" ] );
				testFunction.call( null, target );
			});
		};
	}
}());
