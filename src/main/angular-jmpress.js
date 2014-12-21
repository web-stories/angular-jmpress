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
			scope.$watch( "steps", function( steps ) {
				var stepElement;
				var index = 0;
				var stepElements = element.find( ".step" );

				for ( ; index < stepElements.length; index += 1 ) {
					stepElement = stepElements.eq( index );
					if ( steps[ index ].id ) {
						stepElement.attr( "id", steps[ index ].id );
					}
					if ( steps[ index ].data ) {
						angular.forEach( steps[ index ].data, function( value, key ) {
							stepElement.attr( "data-" + camelCase( key ), value + "" );
						});
					}
				}

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
