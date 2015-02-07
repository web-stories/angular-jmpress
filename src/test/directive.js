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
		expect( 4 );
		var root = setup( "initialization", function( $scope ) {
			$scope.steps = [{
				number: 1,
				active: true
			}, {
				number: 2
			}];
		});
		var steps = root.find( ".step" );

		ok(
			steps.parent().parent().is( "[data-jmpress-root]" ),
			"Ensure the steps are created inside the canvas element (2 levels below container)"
		);
		strictEqual( steps.length, 2, "Should create two steps" );
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
		strictEqual( steps.length, 0, "Should not create any steps aynchronously" );

		stop();
		setTimeout(function() {
			start();
			var steps = root.find( ".step" );
			strictEqual( steps.length, 2, "Should create the steps asynchronously" );
		}, 0 );
	});

	test( "Calling jmpress methods", function() {
		expect( 1 );
		var count = 0;
		var root = setup( "method-call", function( $scope, jmpress ) {
			$scope.steps = [{
				number: 1,
				active: true
			}, {
				number: 2
			}];
			$scope.init = function() {
				jmpress.method( "beforeChange", function( element, eventData ) {
					// We want to catch the "next" beforeChange trigger only
					if ( eventData.reason === "next" ) {
						count += 1;
					}
				});
				$scope.next = function() {
					jmpress.method( "next" );
				};
			};
		});

		root.find( ".method-call-trigger" ).trigger( "click" );
		strictEqual( count, 1, "Should trigger the 'next' beforeChange event once" );
	});

	test( "Watch changes in the steps array instance", function() {
		expect( 1 );
		var root = setup( "watch-changes-array", function( $scope ) {
			$scope.steps = [];
			$scope.addStep = function() {
				Array.prototype.push.apply( $scope.steps, [{
					number: 1
				}]);
			};
		});
		root.find( ".add-step-trigger" ).trigger( "click" );
		var steps = root.find( ".step" );
		strictEqual( steps.length, 1, "Should add steps if array is modified" );
	});

	test( "Activate the initial step from hashbang", function() {
		expect( 1 );
		window.location.hash = "#step-number-2";
		var root = setup( "initial-step-hash", function( $scope ) {
			$scope.steps = [{
				id: "step-number-1",
				number: 1
			}, {
				id: "step-number-2",
				number: 2
			}];
		});
		stop();
		setTimeout(function() {
			start();
			ok( $( "#step-number-2" ).hasClass( "active" ), "Should start in the second step" );
			window.location.hash = "#";
		}, 0 );
	});

	test( "Steps as children of a parent object", function() {
		expect( 1 );
		var root = setup( "steps-as-children", function( $scope ) {
			$scope.presentation = {
				slides: [{
					number: 1
				}]
			};
		});
		var steps = root.find( ".step" );
		strictEqual( steps.length, 1, "Should create one step" );
	});

	test( "Trigger watched steps when keyboard is used", function() {
		expect( 2 );
		var stepsModel;
		var watchTriggers = 0;
		var root = setup( "watch-keyboard", function( $scope ) {
			stepsModel = $scope.steps = [{
				number: 1,
				active: true
			}, {
				number: 2
			}];
			$scope.$watch( "steps", function() {
				watchTriggers += 1;
			}, true );
		});

		// Trigger keyboard ARROW_RIGHT to go to the next step
		$( document ).simulate( "keydown", {
			keyCode: 39
		});

		strictEqual( stepsModel[ 1 ].active, true, "Should change the active step in the model" );

		// 1. First watch execution
		// 2. setInactive for the first step
		// 3. setActive for the second step
		strictEqual( watchTriggers, 3, "Should execute the watched steps" );
	});

	test( "Define a custom initial step through a custom callback registration", function() {
		expect( 1 );
		var root = setup( "initial-step", function( $scope, jmpress ) {
			$scope.steps = [{
				number: 1
			}, {
				number: 2
			}];
			jmpress.register( "selectInitialStep", function( firstSteps ) {
				return firstSteps[ firstSteps.length - 1 ];
			});
		});
		var lastStep = root.find( ".step" ).last();
		ok( lastStep.hasClass( "active" ), "Should start with the last step activated" );
	});

	function setup( id, controller ) {
		var target = $( "#" + id );
		angular.module( "test", [ "jmpress" ] )
			.controller( "Controller", controller );
		angular.bootstrap( target[ 0 ], [ "test" ] );
		return target;
	}
}());
