(function() {
	module( "Basic usage" );

	test( "Initialization", function() {
		var root = setup( "initialization", function( $scope ) {
			$scope.steps = [{
				number: 1
			}, {
				number: 2
			}];
		});
		var steps = root.find( ".step" );

		strictEqual( steps.length, 2, "Should create a two steps" );
		strictEqual( steps.eq( 0 ).hasClass( "active" ), true, "Activate the first step" );
		strictEqual( steps.eq( 1 ).hasClass( "active" ), false, "Do not activate the second step" );
	});

	test( "Initialize with a different step activated", function() {
		var root = setup( "active-step", function( $scope ) {
			$scope.steps = [{
				number: 1
			}, {
				number: 2,
				active: true
			}];
		});
		var steps = root.find( ".step" );

		strictEqual( steps.eq( 0 ).hasClass( "active" ), false, "Do not activate the first step" );
		strictEqual( steps.eq( 1 ).hasClass( "active" ), true, "Activate the second step" );
	});

	test( "Initialize with data attributes", function() {
		var root = setup( "data-attributes", function( $scope ) {
			$scope.steps = [{
				number: 1,
				data: {
					x: 100
				}
			}];
		});
		var step = root.find( ".step" );

		strictEqual( step.attr( "data-x" ), "100", "Should add the data attribute" );
	});

	function setup( id, controller ) {
		var target = $( "#" + id );
		angular.module( "test", [ "jmpress" ] )
			.controller( "Controller", controller );
		angular.bootstrap( target[ 0 ], [ "test" ] );
		return target;
	}
}());
