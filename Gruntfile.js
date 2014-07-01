module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    ts: {
        // A specific target
        build: {
            // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
            src: ["**/*.ts", "!**/*.d.ts", "!node_modules/**/*.ts"],
            // If specified, the generate JavaScript files are placed here. Only works if out is not specified
            outDir: '',
            // If specified, watches this directory for changes, and re-runs the current target
            watch: '.',                     
            // Use to override the default options, http://gruntjs.com/configuring-tasks#options
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
        }
    },
  });

  grunt.loadNpmTasks('grunt-ts');

  grunt.registerTask('default', [
    'ts:build'
  ]);

};
