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
            pre_build:      [ 'public/built/*.js' ],
            after_build:    ['public/built/app.js', 'public/built/templates.js']
        },

        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/underscore.string/dist/underscore.string.min.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/momentjs/min/moment.min.js',
                    'bower_components/soundmanager2/script/soundmanager2-nodebug-jsmin.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/backbone.stickit/backbone.stickit.js',
                    'bower_components/typeahead.js/dist/bloodhound.min.js',
                    'bower_components/typeahead.js/dist/typeahead.bundle.min.js',
                    'app/lib/namespace.js',
                    'app/lib/*.js',
                    'app/models/**/*.js',
                    'app/**/*.js'
                ],
                dest: 'public/built/app.js'
            },
            templates: {
                src:    [
                    'bower_components/handlebars/handlebars.min.js',
                    'public/built/templates.js',
                    'public/built/app.js'
                ],
                dest:   'public/built/built.js'
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
                files: { 'public/built/templates.js': [ 'app/templates/**/*.hbs' ]}
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            release: {
                files: {
                    'public/built/built.min.js': [ 'public/built/built.js' ]
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'app/**/*.js',
                    'app/templates/**/*.hbs'
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
        'clean:after_build'//,
        //'uglify'
    ]);

    //
    grunt.registerTask('default', ['build', 'watch']);
};
