(function() {

	module( "Find" );

	test( "findActive()", function() {
		expect( 1 );
		var root = setup( "find-active", function( $scope, jmpress ) {
			$scope.steps = [{
				number: 1,
				active: true
			}, {
				number: 2
			}];
			$scope.execute = function() {
				var activeStep = jmpress.findActive();
				deepEqual( activeStep.number, 1, "Should find the correct active step" );
			};
		});
		root.find( ".execute" ).trigger( "click" );
	});

	module( "Get", {
		setup: function() {
			angular.module( "test", [ "jmpress" ] );
			var injector = angular.injector( [ "ng", "test" ] );
			this.jmpress = injector.get( "jmpress" );
		}
	});

	test( "getActive( steps )", function() {
		expect( 1 );
		var activeStep = this.jmpress.getActive([{
			number: 1,
			active: true
		}, {
			number: 2
		}]);
		strictEqual( activeStep.number, 1, "Should get the correct active step" );
	});

	test( "getActive( steps ) - when there's no active step", function() {
		expect( 1 );
		strictEqual( this.jmpress.getActive( [] ), undefined, "Should return undefined" );
	});

	function setup( id, controller ) {
		var target = $( "#" + id );
		angular.module( "test", [ "jmpress" ] )
			.controller( "Controller", controller );
		angular.bootstrap( target[ 0 ], [ "test" ] );
		return target;
	}
}());
