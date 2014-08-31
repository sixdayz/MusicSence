module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'Gruntfile.js',
                'lib/*.js',
                'app/*.js',
                'app/**/*.js'
            ]
        },

        clean: {
            pre_build:      [ 'public/*.js' ],
            after_build:    ['public/app.js', 'public/templates.js']
        },

        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/handlebars/handlebars.js',
                    'app/lib/namespace.js',
                    'app/lib/*.js',
                    'app/**/*.js'
                ],
                dest: 'public/app.js',
            },
            templates: {
                src:    ['public/app.js', 'public/templates.js'],
                dest:   'public/built.js',
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'jst',
                    processContent: function(src) {
                        return src.replace(/(^\s+|\s+$)/gm, '');
                    }
                },
                files: { 'public/templates.js': [ 'app/templates/**/*.hbs' ]}
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            release: {
                files: {
                    'public/built.min.js': [ 'public/built.js' ]
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'app/**/*.js',
                    'app/templates/*.hbs'
                ],
                tasks: [
                    'build'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'jshint',
        'clean:pre_build',
        'handlebars',
        'concat:app',
        'concat:templates',
        'clean:after_build',
        //'uglify'
    ]);

    //
    grunt.registerTask('default', ['build', 'watch']);
};