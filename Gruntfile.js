module.exports = function (grunt) {

	var tsFiles = ["**/*.ts", "!**/*.d.ts", "!node_modules/**/*.ts"];

	// Project configuration.
	grunt.initConfig({
		typescript: {
			// A specific target
			build: {
				src: ["tests/index.ts"],
				dest: '',
				options: {
					// 'es3' (default) | 'es5'
					target: 'es5',
					// 'amd' (default) | 'commonjs'
					module: 'commonjs',
					// true (default) | false
					sourceMap: false,
					// true | false (default)
					declaration: false,
					// true (default) | false
					removeComments: false
				},
				ignoreTypeCheck: true
			}
		},
		watch: {
			ts: {
				files: tsFiles,
				tasks: ['typescript:build'],
				options: {
					livereload: 35730,
					debug: false,
					debounceDelay: 100
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'typescript:build', 'watch'
	]);

};
