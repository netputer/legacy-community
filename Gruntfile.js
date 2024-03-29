var lrSnippet = require('connect-livereload')();

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // log task running time
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathConfig = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        test: 'test'
    };

    grunt.initConfig({
        paths: pathConfig,
        watch: {
            compass: {
                files: ['<%= paths.app %>/compass/**/*'],
                tasks: ['compass:server']
            },
            test: {
                files: ['<%= paths.app %>/javascripts/**/*.js'],
                tasks: ['newer:jshint:test', 'karma:server:run'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                files: [
                    '<%= paths.app %>/**/*.html',
                    '<%= paths.app %>/javascripts/**/*.js',
                    '<%= paths.app %>/images/**/*',
                    '<%= paths.tmp %>/stylesheets/**/*.css',
                    '<%= paths.tmp %>/images/**/*'
                ],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },
        connect: {
            options: {
                port: 9999,
                hostname: '0.0.0.0'
            },
            server: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            require('connect-modrewrite')([
                                '^/$ /group/ [R]',
                                '^/group/?[^.]*$ /index.html [L]',
                                '^/group/?(.*)$ /$1 [L]'
                            ]),
                            mountFolder(connect, pathConfig.tmp),
                            mountFolder(connect, pathConfig.app)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://127.0.0.1:<%= connect.options.port %>',
                app: 'Google Chrome Canary'
            }
        },
        clean: {
            dist: ['<%= paths.tmp %>', '<%= paths.dist %>'],
            server: '<%= paths.tmp %>'
        },
        useminPrepare: {
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp %>',
                    src: [
                        '**/*.html',
                        '!components/**/*.html',
                        '!templates/**/*.html'
                    ],
                }]
            },
            options: {
                dest: '<%= paths.dist %>'
            }
        },
        usemin: {
            html: ['<%= paths.dist %>/**/*.html'],
            css: ['<%= paths.dist %>/stylesheets/**/*.css'],
            options: {
                dirs: ['<%= paths.dist %>'],
                assetsDirs: ['<%= paths.dist %>']
            }
        },
        htmlmin: {
            templates: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %>',
                    src: ['templates/**/*.html'],
                    dest: '<%= paths.tmp %>'
                }],
                options: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp %>',
                    src: [
                        '**/*.html',
                        '!components/**/*.html',
                        '!templates/**/*.html'
                    ],
                    dest: '<%= paths.dist %>'
                }]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.tmp %>',
                    src: [
                        '**/*.html',
                        '!templates/**/*.html',
                        '!compass/**/*.html',
                        'components/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.dist %>',
                    src: [
                        'images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf,svg}'
                    ]
                }]
            },
            sprites: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp %>',
                    dest: '<%= paths.dist %>',
                    src: [
                        'images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf,svg}'
                    ]
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= paths.app %>/compass/sass',
                imagesDir: '<%= paths.app %>/compass/images',
                fontsDir: '<%= paths.app %>/images/fonts',
                generatedImagesDir: '<%= paths.tmp %>/images',
                relativeAssets: true
            },
            dist: {
                options: {
                    cssDir: '<%= paths.dist %>/stylesheets',
                    httpGeneratedImagesPath: '../images/',
                    outputStyle: 'compressed',
                    environment: 'production',
                    relativeAssets: false
                }
            },
            server: {
                options: {
                    cssDir: '<%= paths.tmp %>/stylesheets',
                    debugInfo: true,
                    environment: 'development'
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= paths.dist %>/javascripts/**/*.js',
                        '<%= paths.dist %>/stylesheets/**/*.css',
                        '<%= paths.dist %>/images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf}'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist %>/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= paths.dist %>/images'
                }]
            }
        },
        requirejs: {
            options: {
                appDir: ['<%= paths.app %>/javascripts'],
                dir: ['<%= paths.tmp %>/javascripts'],
                baseUrl: './',
                mainConfigFile: ['<%= paths.app %>/javascripts/main.js'],
                optimize: 'none',
                removeCombined: true,
                wrap: true
            },
            build: {
                options: {
                    modules: [{
                        name: 'main'
                    }],
                    almond: true,
                    replaceRequireScript: [{
                        files: ['<%= paths.tmp %>/index.html'],
                        module: 'main'
                    }]
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            build: {
                tasks: [
                    'copy:build',
                    'compass:dist'
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            test: ['<%= paths.app %>/javascripts/**/*.js']
        },
        karma: {
            options: {
                configFile: '<%= paths.test %>/karma.conf.js',
                browsers: ['Chrome_without_security']
            },
            server: {
                reporters: ['progress'],
                background: true
            },
            test: {
                reporters: ['progress', 'junit', 'coverage'],
                preprocessors: {
                    '<%= paths.app %>/javascripts/**/*.js': 'coverage'
                },
                junitReporter: {
                    outputFile: '<%= paths.test %>/output/test-results.xml'
                },
                coverageReporter: {
                    type: 'html',
                    dir: '<%= paths.test %>/output/coverage/'
                },
                singleRun: true
            },
            travis: {
                browsers: ['PhantomJS'],
                reporters: ['progress'],
                singleRun: true
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false
            }
        },
        cdn: {
            options: {
                cdn: 'http://s.wdjimg.com/community',
                flatten: true
            },
            dist: {
                src: [
                    '<%= paths.dist %>/**/*.html',
                    '<%= paths.dist %>/**/*.css'
                ]
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp %>/javascripts',
                    src: '**/*.js',
                    dest: '<%= paths.tmp %>/javascripts'
                }],
            }
        },
        'wandoulabs_deploy': {
            options: grunt.file.readJSON('OathKeeper/frontend/ldap.json'),
            cdn: {
                deployCDN: {
                    src: '<%= paths.dist %>',
                    target: 'community'
                }
            }
        }
    });

    grunt.registerTask('serve', [
        'clean:server',
        'compass:server',
        'connect:server',
        // 'karma:server',
        // 'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint:test',
        'karma:test'
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
        'karma:travis'
    ]);

    grunt.registerTask('build:staging', [
        'clean:dist',
        'concurrent:build',
        'htmlmin:templates',
        'requirejs:build',
        'ngAnnotate:build',
        'useminPrepare',
        'concat',
        'uglify',
        'rev',
        'copy:sprites',
        'imagemin:dist',
        'htmlmin:dist',
        'usemin'
    ]);

    grunt.registerTask('build:production', [
        'build:staging',
        'cdn:dist',
        'wandoulabs_deploy:cdn'
    ]);

    grunt.registerTask(['update'], [
        'bump-only:patch',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:minor'], [
        'bump-only:minor',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:major'], [
        'bump-only:major',
        'changelog',
        'bump-commit'
    ]);
};
