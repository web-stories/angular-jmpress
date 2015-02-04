(function() {

	module( "Not passing steps" );

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

	module( "Passing steps", {
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

	test( "getActive( steps, index )", function() {
		expect( 2 );
		var steps = [{
			num: 1
		}, {
			num: 2,
			active: true
		}, {
			num: 3
		}];
		strictEqual( this.jmpress.getActive( steps, 1 ).num, 3, "Should return the third step" );
		strictEqual( this.jmpress.getActive( steps, -1 ).num, 1, "Should return the first step" );
	});

	test( "getActive( steps, index ) - when there's no active step", function() {
		var steps = [{ num: 1 }, { num: 2 }, { num: 3 }];
		strictEqual( this.jmpress.getActive( steps, -1 ), undefined, "Should return undefined" );
	});

	test( "getActive( steps, index ) - invalid range with active step", function() {
		var steps = [{ active: true }];
		strictEqual( this.jmpress.getActive( steps, -1 ), undefined, "Should return undefined" );
	});

	function setup( id, controller ) {
		var target = $( "#" + id );
		angular.module( "test", [ "jmpress" ] )
			.controller( "Controller", controller );
		angular.bootstrap( target[ 0 ], [ "test" ] );
		return target;
	}
}());
