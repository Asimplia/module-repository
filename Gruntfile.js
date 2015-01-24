module.exports = function (grunt) {
	var GruntConfiguration = require('asimplia-util').GruntConfiguration;

	var typescriptBuildFiles = ["src/**/*.ts", "tests/**/*.ts", "!node_modules/**/*.ts"];
	// Project configuration.
	var config = GruntConfiguration([], [], [], typescriptBuildFiles, typescriptBuildFiles, [
		'typings/tsd.d.ts',
		GruntConfiguration.resolveNodeModulePath('asimplia-util/asimplia-util.d.ts')
	], __dirname);
	grunt.initConfig(config);

	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-typescript');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-jasmine-node');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-contrib-watch');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-tsd');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-shell');
	GruntConfiguration.loadParentNpmTasks(grunt, 'grunt-wait');

	grunt.registerTask('default', [
		'shell:link_module:asimplia-util', 'tsd:reinstall', 'wait:typings', 'typescript:build', 'jasmine_node:unit'
	]);
	grunt.registerTask('dev', function () {
		GruntConfiguration.typescriptReferences(__dirname + '/build/references.ts', [
			__dirname + '/src', 
			__dirname + '/tests', 
			__dirname + '/typings',
			__dirname + '/node_modules/asimplia-util/asimplia-util.d.ts'
		]);
		grunt.task.run('default', 'watch:ts');
	});
	grunt.registerTask('prepublish', function () {
		grunt.task.run('default');
	});
	grunt.registerTask('test', function () {
		process.env.NODE_ENV = 'unit';
		grunt.task.run('jasmine_node:unit');
		process.env.NODE_ENV = 'integration';
		grunt.task.run('jasmine_node:integration');
	});

};
