module.exports = function( grunt ) {
	"use strict";

	var srcFiles = [
		"Gruntfile.js",
		"src/**/*.js",
		"!src/partials/intro.js",
		"!src/partials/outro.js"
	];

	var configs = {
		pkg: grunt.file.readJSON( "bower.json" ),
		jscs: {
			files: srcFiles
		},
		jshint: {
			options: {
				"browser": true,
				"loopfunc": true
			},
			files: srcFiles
		},
		concat: {
			angular: {
				options: {
					banner: grunt.file.read( "src/partials/intro.js" ),
					footer: grunt.file.read( "src/partials/outro.js" )
				},
				files: {
					"dist/<%= pkg.name %>.js": "src/main/angular-jmpress.js"
				}
			},
			jmpressDEFAULT: {
				files: {
					"dist/jquery.jmpress.default.js": [
						"lib/jmpress/core.js",
						"lib/jmpress/near.js",
						"lib/jmpress/transform.js",
						"lib/jmpress/active.js",
						"lib/jmpress/circular.js",
						"lib/jmpress/start.js",
						"lib/jmpress/hash.js",
						"lib/jmpress/keyboard.js",
						"lib/jmpress/mobile.js"
					]
				}
			},
			jmpressAMD: {
				files: {
					"dist/jquery.jmpress.js": "src/main/jquery.jmpress.js"
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
						"http://localhost:8000/src/test/directive.html",
						"http://localhost:8000/src/test/requirejs.html"
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
				files: srcFiles.concat([
					"src/partials/**/*.js"
				]),
				tasks: [ "validate", "concat" ]
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
	grunt.registerTask( "ci", [ "validate", "bower", "concat", "test" ] );
	grunt.registerTask( "default", [ "bower", "concat" ] );
	grunt.registerTask( "dev", [ "connect:dev", "watch:dev" ] );
	grunt.registerTask( "release", [ "bower" ] );
};
