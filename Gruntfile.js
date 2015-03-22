module.exports = function (grunt) {
	var GruntConfiguration = require('asimplia-util').GruntConfiguration;

	var typescriptPublicFiles = ["src/**/*.ts"];
	var typescriptBuildFiles = ["tests/**/*.ts"].concat(typescriptPublicFiles);
	// Project configuration.
	var config = GruntConfiguration(typescriptPublicFiles, [
		'typings/tsd.d.ts'
	], [], typescriptBuildFiles, typescriptBuildFiles, [
		'typings/tsd.d.ts'
	], __dirname);
	grunt.initConfig(config);
	GruntConfiguration.registerTasks(__dirname, grunt);

	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-typescript');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-jasmine-node');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-contrib-watch');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-contrib-clean');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-tsd');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-shell');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-wait');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-tslint');

	grunt.registerTask('default', [
		'clean:build',
		'shell:link_module:asimplia-util',
		'tsd:link:build',
		'tsd:reinstall',
		'wait:typings',
		'typescript:build',
		'typescript:public',
		'tslint:all',
		'jasmine_node:unit',
	]);
	grunt.registerTask('dev', [
		'typescript:build',
		'typescript:public',
		'jasmine_node:unit',
		'watch:ts',
	]);
	grunt.registerTask('prepublish', ['default']);
	grunt.registerTask('test', function () {
		process.env.NODE_ENV = 'unit';
		grunt.task.run('jasmine_node:unit');

		process.env.NODE_ENV = 'integration';
		grunt.task.run('jasmine_node:integration');
	});

};
