/* global module */
(function () {
    'use strict';

    module.exports = function (grunt) {

        var config = {
            pkg: grunt.file.readJSON('package.json'),
            watch: {
                default: {
                    files: ['Gruntfile.js', 'bower.json', 'src/**/*'],
                    tasks: ['default']
                }
            },
            clean: {
                default: ['temp']
            },
            jinja: {
                options: {
                    templateDirs: ['src'],
                    contextRoot: 'src/data'
                },
                default: {
                    files: [{
                        expand: true,
                        cwd: 'src/',
                        src: '**/*.html',
                        dest: 'temp/'
                    }]
                }
            },
            copy: {
                before: {
                    files: [
                        {
                            src: 'bower_components/normalize.css/normalize.css',
                            dest: 'temp/css/normalize.css'
                        },
                        {
                            expand: true,
                            cwd: 'src/',
                            src: '**/*.{js,css,svg,ico,ttf,eot,woff,txt}',
                            dest: 'temp/'
                        }
                    ]
                },
                after: {
                    files: [
                        {
                            src: 'bower_components/jquery/dist/jquery.min.js',
                            dest: 'public/js/vendor/jquery-2.1.1.js'
                        },
                        {
                            expand: true,
                            cwd: 'temp/',
                            src: '**',
                            dest: 'public/'
                        }
                    ]
                }
            },
            less: {
                default: {
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.less',
                    dest: 'temp/',
                    ext: '.css'
                }
            },
            imagemin: {
                options: {
                    progressive: true
                },
                default: {
                    files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'temp/'
                    }]
                }
            },
            uglify: {
                default: {
                    files: [
                        {
                            src: ['temp/**/*.js', '!temp/**/*.min.js'],
                            dest: 'temp/js/scripts.min.js'
                        }
                    ]
                }
            },
            cssmin: {
                combine: {
                    files: {
                        //'temp/css/style.css': ['temp/css/normalize.css', 'temp/css/main.css'],
                    }
                },
                minify: {
                    files: [{
                        expand: true,
                        cwd: 'temp/',
                        src: ['**/*.css', '!**/*.min.css'],
                        dest: 'temp/',
                        ext: '.min.css'
                    }]
                }
            },
            hashres: {
                options: {
                    encoding: 'utf8',
                    fileNameFormat: '${name}.${hash}.${ext}',
                    renameFiles: true
                },
                default: {
                    src: 'temp/**/*.{js,css,svg,png,jpg,gif,ico}',
                    dest: [
                        'temp/**/*.{js,css,html}'
                    ]
                }
            },
            htmlmin: {
                default: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [{
                        expand: true,
                        cwd: 'temp/',
                        src: '**/*.html',
                        dest: 'temp/'
                    }]
                }
            }
        };

        grunt.initConfig(config);

        [
            'grunt-contrib-jshint',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-contrib-copy',
            'grunt-contrib-less',
            'grunt-contrib-clean',
            'grunt-contrib-imagemin',
            'grunt-contrib-cssmin',
            'grunt-hashres',
            'grunt-jinja',
            'grunt-contrib-htmlmin'
        ].forEach(grunt.loadNpmTasks);

        grunt.registerTask(
            'build',
            [
                'clean',
                'jinja',
                'copy:before',
                'less',
                'imagemin',
                //'cssmin:combine',
                'cssmin:minify',
                'uglify',
                'hashres',
                'htmlmin',
                'copy:after'
            ]
        );

        grunt.registerTask(
            'dev',
            [
                'clean',
                'jinja',
                'copy:before',
                'less',
                //'imagemin',
                //'cssmin:combine',
                'cssmin:minify',
                'uglify',
                'hashres',
                //'htmlmin',
                'copy:after'
            ]
        );

        grunt.registerTask('default', ['dev']);
        grunt.registerTask('dist', ['build']);

    };
}());