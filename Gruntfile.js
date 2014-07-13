module.exports = function(grunt) {

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
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/node-sqlserver/',
                        src: ['**'], 
                        dest: 'build_modules/node-sqlserver/'
                    }
                ]
            }
        },
        watch: {
            ts: {
                files: tsFiles.concat('node_modules/node-sqlserver/**'),
                tasks: ['ts:build', 'copy'],
                options: {
                    livereload: true,
                    debug: false,
                    debounceDelay: 100
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'typescript:build', 'copy', 'watch'
    ]);

};
