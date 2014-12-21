module.exports = function( grunt ) {
	"use strict";

	var validateFiles = [
		"Gruntfile.js",
		"src/main/**/*.js"
	];

	var configs = {
		pkg: grunt.file.readJSON( "bower.json" ),
		jscs: {
			files: validateFiles
		},
		jshint: {
			options: {
				"browser": true
			},
			files: validateFiles
		},
		concat: {
			options: {
				banner: grunt.file.read( "src/partials/intro.js" ),
				footer: grunt.file.read( "src/partials/outro.js" )
			},
			angular: {
				files: {
					"dist/<%= pkg.name %>.js": [
						"lib/jmpress/jmpress.js",
						"src/main/angular-jmpress.js"
					]
				}
			}
		},
		connect: {
			main: {},
			dev: {
				options: {
					open: "http://localhost:8000/src/test/"
				}
			}
		},
		qunit: {
			main: {
				options: {
					urls: [
						"http://localhost:8000/src/test/directive.html"
					]
				}
			}
		},
		bower: {
			install: {
				cleanTargetDir: true,
				layout: "byComponent"
			}
		},
		watch: {
			dev: {
				options: {
					spawn: false
				},
				files: [
					"src/main/**/*.js",
					"src/partials/**/*.js"
				],
				tasks: [ "jscs", "concat" ]
			}
		}
	};

	grunt.initConfig( configs );

	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );

	// Main tasks
	grunt.registerTask( "test", [ "connect:main", "qunit:main" ] );
	grunt.registerTask( "validate", [ "jscs", "jshint" ] );

	// Special tasks
	grunt.registerTask( "default", [ "bower", "concat" ] );
	grunt.registerTask( "dev", [ "connect:dev", "watch:dev" ] );
	grunt.registerTask( "release", [ "bower" ] );
};
