(function() {
	angular.module( "example", [ "jmpress" ] )
		.filter( "htmlTrusted", function( $sce ) {
			return function( content ) {
				return $sce.trustAsHtml( content );
			};
		})
		.controller( "Controller", function( $scope ) {
			$scope.steps = [{
				id: "bored",
				type: "slide",
				data: {
					x: -1000,
					y: -1500
				},
				content: "" +
					"<q>" +
						"Aren't you just <b>bored</b> with all those slides-based presentations?" +
					"</q>"
			}, {
				type: "slide",
				data: {
					x: 0,
					y: -1500
				},
				content: "" +
					"<q>" +
						"Don't you think that presentations given " +
						"<strong>in modern browsers</strong> shouldn't " +
						"<strong>copy the limits</strong> of 'classic' slide decks?" +
					"</q>"
			}, {
				type: "slide",
				data: {
					x: 1000,
					y: -1500
				},
				content: "" +
					"<q>" +
						"Would you like to <strong>impress your audience</strong> with " +
						"<strong>stunning visualization</strong> of your talk?" +
					"</q>"
			}, {
				id: "title",
				type: "title",
				data: {
					x: 0,
					y: 0,
					scale: 4
				},
				content: "" +
					"<span class='try'>then you should try</span>" +
					"<h1>impress.js<sup>*</sup></h1>" +
					"<span class='footnote'><sup>*</sup> no rhyme intended</span>"
			}, {
				id: "its",
				data: {
					x: 850,
					y: 3000,
					rotate: 90,
					scale: 5
				},
				content: "" +
					"<p>" +
						"It's a <strong>presentation tool</strong> <br>" +
						"inspired by the idea behind <a href='http://prezi.com'>prezi.com</a><br>" +
						"and based on the <strong>power of CSS3 transforms and " +
						"transitions</strong> in modern browsers." +
					"</p>"
			}, {
				id: "big",
				data: {
					x: 3500,
					y: 2100,
					rotate: 180,
					scale: 6
				},
				content: "<p>visualize your <b>big</b> <span class='thoughts'>thoughts</span></p>"
			}, {
				id: "tiny",
				data: {
					x: 2825,
					y: 2325,
					z: -3000,
					rotate: 300,
					scale: 1
				},
				content: "<p>and <b>tiny</b> ideas</p>"
			}, {
				id: "ing",
				data: {
					x: 3500,
					y: -850,
					rotate: 270,
					scale: 6
				},
				content: "" +
					"<p>" +
						"by <b class='positioning'>positioning</b>, " +
						"<b class='rotating'>rotating</b> and <b class='scaling'>scaling</b> " +
						"them on an infinite canvas" +
					"</p>"
			}, {
				id: "imagination",
				data: {
					x: 6700,
					y: -300,
					scale: 6
				},
				content: "" +
					"<p>" +
						"the only <b>limit</b> is your <b class='imagination'>imagination</b>" +
					"</p>"
			}, {
				id: "source",
				data: {
					x: 6300,
					y: 2000,
					rotate: 20,
					scale: 4
				},
				content: "" +
					"<p>want to know more?</p>" +
					"<q>" +
						"<a href='https://github.com/web-stories/angular-jmpress'>" +
							"use the source" +
						"</a>" +
						", Luke!" +
					"</q>"
			}, {
				id: "one-more-thing",
				data: {
					x: 6000,
					y: 4000,
					scale: 2
				},
				content: "<p>one more thing...</p>"
			}, {
				id: "its-in-3d",
				data: {
					x: 6200,
					y: 4300,
					z: -100,
					rotateX: -40,
					rotateY: 10,
					scale: 2
				},
				content: "" +
					"<p>" +
						"<span class='have'>have</span> <span class='you'>you</span> " +
						"<span class='noticed'>noticed</span> <span class='its'>it's</span> " +
						"<span class='in'>in</span> <b>3D<sup>*</sup></b>?" +
					"</p>" +
					"<span class='footnote'>* beat that, prezi ;)</span>"
			}, {
				id: "overview",
				data: {
					x: 3000,
					y: 1500,
					scale: 10
				}
			}];
		});
}());
