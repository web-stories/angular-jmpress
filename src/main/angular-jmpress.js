function camelCase( str ) {
	str = str.replace( /([A-Z])/g, function( $1 ) {
		return "-" + $1.toLowerCase();
	});
	return str.charAt( 0 ) == "-" ? str.substr( 1 ) : str;
}

function jmpress() {
	this.getActiveReference = function( steps ) {
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
	};
}

function jmpressRoot( $timeout, jmpress ) {
	return {
		restrict: "A",
		scope: {
			steps: "=jmpressSteps"
		},
		link: function( scope, element ) {
			// We can't make sure angular picks jquery when using shim (see requireJS test)
			element = $( element );

			scope.$watch( "steps", function( steps ) {
				if ( !steps ) {
					return;
				}

				var index = 0;
				var stepElements = element.find( ".step" );

				stepElements.each(function( index, stepElement ) {
					var step = steps[ index ];
					stepElement = $( stepElement );
					if ( step.id ) {
						stepElement.attr( "id", step.id );
					}
					if ( step.data ) {
						$.each( steps[ index ].data, function( key, value ) {
							stepElement.attr( "data-" + camelCase( key ), value + "" );
						});
					}
				});

				if ( !element.jmpress( "initialized" ) ) {
					element.jmpress();
					element.jmpress( "setActive", function( step, eventData ) {
						$timeout(function() {
							scope.steps[ step.index() ].active = true;
						});
					});
					element.jmpress( "setInactive", function( step, eventData ) {
						$timeout(function() {
							delete scope.steps[ step.index() ].active;
						});
					});
				}

				var active = jmpress.getActiveReference( steps );
				if ( active ) {
					element.jmpress( "goTo", stepElements.eq( active.index ) );
				}
			});
		}
	};
}

angular.module( "jmpress", [] )
	.directive( "jmpressRoot", [ "$timeout", "jmpress", jmpressRoot ] )
	.service( "jmpress", jmpress );
