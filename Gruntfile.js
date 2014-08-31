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

        clean: [
            'public/*.js'
        ],

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/handlebars/handlebars.js',
                    'app/lib/*.js',
                    'app/**/*.js',
                    'app/*.js'
                ],
                dest: 'public/app.js',
            },
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'jst',
                    processContent: function(src) {
                            return src.replace(/(^\s+|\s+$)/gm, '');
                        }
                },
                files: { 'public/templates.js': [
                    'app/templates/*.hbs'
                ]}
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'public/app.min.js': [ 'public/app.js' ],
                    'public/templates.min.js': [ 'public/templates.js' ]
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'app/lib/*.js',
                    'app/*.js',
                    'app/**/*.js',
                    'app/templates/*.hbs'
                ],
                tasks: [
                    'build-prod'
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

    grunt.registerTask('build-dev', [
        'jshint',
        'clean',
        'handlebars',
        'concat'
    ]);

    // Задача на проверку и построение всего приложения
    grunt.registerTask('build-prod', [
        'build-dev',
        //'uglify'
    ]);

    //
    grunt.registerTask('default', ['build-prod', 'watch']);
};