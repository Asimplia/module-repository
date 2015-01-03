module.exports = function (grunt) {
	var GruntConfiguration = require('asimplia-util').GruntConfiguration;

	var typescriptBuildFiles = ["src/**/*.ts", "tests/**/*.ts", "!node_modules/**/*.ts"];

	// Project configuration.
	var config = GruntConfiguration([], [], [], [
		'typescript:build', 'jasmine_node:unit'
	], typescriptBuildFiles, typescriptBuildFiles, []);
	grunt.initConfig(config);

	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-typescript');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-jasmine-node');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-contrib-watch');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-tsd');

	grunt.registerTask('default', [
		'tsd:reinstall', 'typescript:build', 'jasmine_node:unit'
	]);
	grunt.registerTask('dev', [
		'typescript:build', 'jasmine_node:unit', 'watch:ts'
	]);
	grunt.registerTask('postinstall', function () {
		grunt.task.run('default');
	});
	grunt.registerTask('test', [
		'jasmine_node:unit'
	]);

};
