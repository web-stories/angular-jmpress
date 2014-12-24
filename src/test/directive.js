(function() {
	module( "Basic usage", {
		setup: function() {
			sinon.spy( console, "error" );
		},
		teardown: function() {
			console.error.restore();
		}
	});

	test( "Initialization", function() {
		expect( 3 );
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
		expect( 2 );
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
		expect( 1 );
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

	test( "Loading steps asynchrounously", function() {
		expect( 3 );
		var root = setup( "steps-async", function( $scope, $timeout ) {
			$timeout(function() {
				$scope.steps = [{
					number: 1
				}, {
					number: 2
				}];
			});
		});
		strictEqual( console.error.called, false, "Should not call console.error" );

		var steps = root.find( ".step" );
		strictEqual( steps.length, 0, "Should not create any steps aynchrounously" );

		stop();
		setTimeout(function() {
			start();
			var steps = root.find( ".step" );
			strictEqual( steps.length, 0, "Should create the steps asynchronously" );
		}, 0 );
	});

	function setup( id, controller ) {
		var target = $( "#" + id );
		angular.module( "test", [ "jmpress" ] )
			.controller( "Controller", controller );
		angular.bootstrap( target[ 0 ], [ "test" ] );
		return target;
	}
}());
