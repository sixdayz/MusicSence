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
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'app/lib/*.js',
                    'app/*.js',
                    'app/**/*.js'
                ],
                dest: 'public/app.<%= pkg.version %>.js',
            },
        },

        handlebars: {
            compile: {
                files: { 'public/templates.<%= pkg.version %>.js': [
                    'app/templates/*.hbs'
                ]}
            }
        },

        watch: {
            scripts: {
                files: [
                    'app/lib/*.js',
                    'app/*.js',
                    'app/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'handlebars',
                    'concat'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Задача на проверку и построение всего приложения
    grunt.registerTask('build', [
        'jshint',
        'clean',
        'handlebars',
        'concat'
    ]);

    //
    grunt.registerTask('default', ['build', 'watch']);
};