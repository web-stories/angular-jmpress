function camelCase( str ) {
	str = str.replace( /([A-Z])/g, function( $1 ) {
		return "-" + $1.toLowerCase();
	});
	return str.charAt( 0 ) == "-" ? str.substr( 1 ) : str;
}

function jmpress( $timeout ) {
	var element, methodName;
	var instance = this;
	var publicMethods = {
		getActiveReference: function( steps ) {
			var result;
			var index = 0;
			for ( ; index < steps.length; index += 1 ) {
				if ( steps[ index ].active ) {
					result = {
						step: steps[ index ],
						index: index
					};
					break;
				}
			}
			return result;
		},
		method: function() {
			var args = [].slice.call( arguments );
			element.jmpress.apply( element, args );
		}
	};

	this.init = function( initializedElement ) {
		element = initializedElement;
	};

	for ( methodName in publicMethods ) {
		instance[ methodName ] = (function( methodName ) {
			return function() {
				var args = [].slice.call( arguments );
				if ( !element ) {
					console.error( "jmpress not initialized when calling '" + methodName + "'" );
				}
				return publicMethods[ methodName ].apply( instance, args );
			};
		}( methodName ));
	}
}

function jmpressRoot( $timeout, $compile, jmpress ) {
	return {
		restrict: "A",
		transclude: true,
		scope: {
			init: "&jmpressInit",
			steps: "=jmpressSteps"
		},
		controller: function( $scope, $element ) {
			this.getStep = function( index ) {
				return $scope.steps[ index ];
			};
			this.getRootElement = function() {
				return $element;
			};
		},
		link: function( scope, element, attrs, controller, linker ) {

			// We can't make sure angular picks jquery when using shim (see requireJS test)
			element = $( element );

			scope.$watchCollection( "steps", function( steps, previousSteps ) {
				if ( !steps ) {
					return;
				}

				if ( !element.jmpress( "initialized" ) ) {
					$.jmpress( "beforeInit", function() {
						linker( scope, function( clone ) {
							var canvas = element.jmpress( "canvas" );
							var compiledContent = $compile( clone )( scope );
							canvas.append( compiledContent );
						});
					});

					element.jmpress();
					jmpress.init( element );

					element.jmpress( "setActive", function( step, eventData ) {
						scope.steps[ step.index() ].active = true;
					});

					element.jmpress( "setInactive", function( step, eventData ) {
						delete scope.steps[ step.index() ].active;
					});

					scope.init();
				}
			});
		}
	};
}

function jmpressStep( jmpress ) {
	return {
		restrict: "A",
		require: "^^jmpressRoot",
		link: function( scope, stepElement, attrs, rootController ) {
			var currentStep = rootController.getStep( scope.$index );
			var rootElement = rootController.getRootElement();

			if ( currentStep.id ) {
				stepElement.attr(  "id", currentStep.id );
			}

			if ( currentStep.data ) {
				$.each( currentStep.data, function( key, value ) {
					stepElement.attr( "data-" + camelCase( key ), value + "" );
				});
			}

			rootElement.jmpress( "init", stepElement );

			if ( currentStep.active ) {
				rootElement.jmpress( "goTo", stepElement );
			}
		}
	};
}

angular.module( "jmpress", [] )
	.directive( "jmpressRoot", [ "$timeout", "$compile", "jmpress", jmpressRoot ] )
	.directive( "jmpressStep", [ "jmpress", jmpressStep ] )
	.service( "jmpress", [ "$timeout", jmpress ] );
