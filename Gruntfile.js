;(function(){
  'use strict';
  var path = require('path')
    , fs = require('fs-extra')
    , exec = require('child_process').exec
    , readline = require('readline')
    , config = {
      EXPRESS_PORT: 3000,
      BROWSERSYNC_PORT: 3001
    };

  module.exports = function(grunt){

    // Using jit-grunt means that we don't need to use  grunt.loadNpmTask
    require('jit-grunt')(grunt, {
      'scsslint': 'grunt-scss-lint',
      'express': 'grunt-express-server',
      'istanbul_check_coverage': 'grunt-mocha-istanbul',
      'protractor': 'grunt-protractor-runner'
    });

    // Output the build times after tasks have run
    require('time-grunt')(grunt);


    grunt.initConfig({

      config: config,

      // Empties folders to start fresh
      clean: {
        all: {
          files: [{
            dot: true,
            src: ['coverage/']
          }]
        },
        accessibility: {
          files: [{
            dot: true,
            src: ['reports/accessibility']
          }]
        },
        dev: {
          files: [{
            dot: true,
            src: ['dev/']
          }]
        },
        dist: {
          files: [{
            dot: true,
            src: ['dist/']
          }]
        },
        test: {
          files: [{
            dot: true,
            src: ['test/']
          }]
        }
      },

      // Templates
      sync: {
        dist: {
          files: [
            {expand: true, src: ['client/**/*.html', 'client/**/*.njk'], dest: 'dist'},
            {expand: true, src: ['server/**/*.js'], dest: 'dist'},
            {expand: true, src: ['package.json', 'Dockerfile', 'run.sh'], dest: 'dist'},
            {expand: true, cwd: 'client/js/', src: ['jquery.min.js', 'html5shiv.min.js', 'respond.min.js', 'svgxuse.min.js', 'ds-datepicker.js', 'cookies.js'], dest: 'dist/client/js'},
            {expand: true, cwd: 'client/assets/fonts/', src: ['*.ttf'], dest: 'dist/client/assets/fonts' },
            {expand: true, cwd: 'client/assets/documents/', src: ['*.pdf'], dest: 'dist/client/assets/documents'},
            
            {expand: true, cwd: 'node_modules/govuk-frontend/govuk/', src: ['all.js'], dest: 'dist/client/js/govuk'},
            {expand: true, cwd: 'node_modules/govuk-frontend/govuk/assets/fonts', src: ['**'], dest: 'dist/client/assets/fonts'},
            
            {expand: true, cwd: 'config/', src: ['*.*'], dest: 'dist/config'}
          ]
        },
        dev: {
          files: [
            {expand: true, src: ['client/**/*.html', 'client/**/*.njk'], dest: 'dev'},
            {expand: true, src: ['server/**/*.js'], dest: 'dev'},
            {expand: true, src: ['package.json', 'Dockerfile', 'run.sh'], dest: 'dev'},
            {expand: true, cwd: 'client/js/', src: ['jquery.min.js', 'html5shiv.min.js', 'respond.min.js', 'svgxuse.min.js', 'ds-datepicker.js', 'cookies.js'], dest: 'dev/client/js'},
            {expand: true, cwd: 'client/assets/fonts/', src: ['*.ttf'], dest: 'dev/client/assets/fonts' },
            {expand: true, cwd: 'client/assets/documents/', src: ['*.pdf'], dest: 'dev/client/assets/documents'},
            
            {expand: true, cwd: 'node_modules/govuk-frontend/govuk/', src: ['all.js'], dest: 'dev/client/js/govuk'},
            {expand: true, cwd: 'node_modules/govuk-frontend/govuk/assets/fonts', src: ['**'], dest: 'dev/client/assets/fonts'},

            {expand: true, cwd: 'config/', src: ['*.*'], dest: 'dev/config'}
          ]
        },
        test: {
          files: [
            {expand: true, src: ['client/**/*.html', 'client/**/*.njk'], dest: 'test'},
            {expand: true, src: ['server/**/*.js'], dest: 'test'},
            {expand: true, src: ['package.json', 'Dockerfile', 'run.sh'], dest: 'test'},
            {expand: true, cwd: 'client/js/', src: ['jquery.min.js', 'html5shiv.min.js', 'respond.min.js', 'svgxuse.min.js', 'ds-datepicker.js', 'cookies.js'], dest: 'test/client/js'},
            {expand: true, cwd: 'client/assets/fonts/', src: ['*.ttf'], dest: 'test/client/assets/fonts' },
            {expand: true, cwd: 'client/assets/documents/', src: ['*.pdf'], dest: 'test/client/assets/documents'},
            
            {expand: true, cwd: 'node_modules/govuk-frontend/govuk/', src: ['all.js'], dest: 'test/client/js/govuk'},
            {expand: true, cwd: 'node_modules/govuk-frontend/govuk/assets/fonts', src: ['**'], dest: 'test/client/assets/fonts'},

            {expand: true, cwd: 'config/', src: ['*.*'], dest: 'test/config'}
          ]
        },
        
        /*
        govuk: {
          files: [
            {expand: true, cwd: 'node_modules/govuk_frontend_toolkit/', src: '**', dest: 'govuk_modules/govuk_frontend_toolkit/'},
            {expand: true, cwd: 'node_modules/govuk_template_jinja/assets/', src: '**', dest: 'govuk_modules/govuk_template/assets/'},
            {expand: true, cwd: 'node_modules/govuk-elements-sass/public/sass/', src: '**', dest: 'govuk_modules/govuk-elements-sass/'}
          ]
        }
        */

      },


      accessibility: {
        options: {
          accessibilityLevel: 'WCAG2A',
          reportType: 'json',
          reportLocation: 'reports/accessibility',
          reportLevels: {
            notice: false,
            warning: true,
            error: true
          },
          force: true
        },
        all: {
          options: {
            urls: ['http://localhost:'+(process.env.PORT || config.EXPRESS_PORT)]
          },
          src: ['client/templates/**/*.njk']
        }
      },


      // Styles
      scsslint: {
        allFiles: [ 'client/scss/**/*.scss' ],
        options: {
          config: '.scss-lint.yml',
          quiet: true
        }
      },

      sass: {
        options: {
          includePaths: [
            'node_modules/@scottish-government'
          ]
        },
        dist: {
          options: { sourceMaps: true },
          files: {
            'client/css/style.css': 'client/scss/main.scss',
            'client/css/ds-style.css': 'node_modules/@scottish-government/pattern-library/src/pattern-library.scss',
          }
        },
        dev: {
          options: { sourceMaps: true },
          files: {
            'client/css/style.css': 'client/scss/main.scss',
            'client/css/ds-style.css': 'node_modules/@scottish-government/pattern-library/src/pattern-library.scss',
          }
        },
        test: {
          options: { sourceMaps: true },
          files: {
            'client/css/style.css': 'client/scss/main.scss',
            'client/css/ds-style.css': 'node_modules/@scottish-government/pattern-library/src/pattern-library.scss',
          }
        },
      },

      autoprefixer: {
        options: {
          browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] // Default.
        },
        all: {
          src: 'client/css/style.css'
        }
      },

      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        dist: {
          files: [
            {expand: true, cwd: 'client/css', src: ['*.css', '!*.min.css'], dest: 'dist/client/css', ext: '.css'},
          ],
          options: {sourceMap: true}
        },
        dev: {
          files: [
            {expand: true, cwd: 'client/css', src: ['*.css', '!*.min.css'], dest: 'dev/client/css', ext: '.css'}
          ],
          options: {sourceMap: true}
        },
        test: {
          files: [
            {expand: true, cwd: 'client/css', src: ['*.css', '!*.min.css'], dest: 'test/client/css', ext: '.css'},
          ],
          options: {sourceMap: true}
        }
      },


      // Scripts
      eslint: {
        options: {
          quiet: true
        },
        ignorePath: path.resolve(__dirname, '.eslintignore'),
        default: ['client/**/*.js', 'server/**/*.js']
      },

      browserify: {
        default: {
          files: {
            'client/js/bundle.js': ['./client/js/main.js'],
          }
        }
      },

      uglify: {
        dist: {
          files: {'dist/client/js/bundle.js': ['client/js/bundle.js'] },
          option: {sourceMap: false}
        },
        dev: {
          files: {'dev/client/js/bundle.js': ['client/js/bundle.js'] },
          option: {sourceMap: false}
        },
        test: {
          files: {'test/client/js/bundle.js': ['client/js/bundle.js'] },
          option: {sourceMap: false}
        }
      },

      /*
      babel: {
        options: {
          sourceMap: false,
          presets: ['@babel/preset-env']
        },
        dev: {
          files: {
            'dev/client/js/ds/new-ds-date-picker.js': 'client/js/ds-date-picker.js'
          },
        },
      },
      */



      // Check code against SonarQube
      sonarRunner: {
        analysis: {
          options: {
            debug: true,
            separator: '\n',
            dryRun: false,
            projectHome: './',
            sonar: {}
          }
        }
      },


      // Images
      imagemin: {
        dist: {
          options: {
            svgoPlugins: ['gifsicle', 'jpegtran', 'optipng', 'svgo']
          },
          files: [
            { expand: true, cwd: 'client/assets/images/', src: '**/*.{png,jpg,jpeg,gif,svg}', dest: 'dist/client/assets/images' },
            { expand: true, cwd: 'node_modules/govuk-frontend/govuk/assets/images/', src: ['**/**.*'], dest: 'dist/client/assets/images' },
            { expand: true, cwd: 'node_modules/@scottish-government/pattern-library/dist/images/icons/', src: ['**/**.*'], dest: 'dist/client/assets/images/icons' }
          ]
        },
        dev: {
          options: {
            svgoPlugins: ['gifsicle', 'jpegtran', 'optipng', 'svgo']
          },
          files: [
            { expand: true, cwd: 'client/assets/images/', src: '**/*.{png,jpg,jpeg,gif,svg}', dest: 'dev/client/assets/images' },
            { expand: true, cwd: 'node_modules/govuk-frontend/govuk/assets/images/', src: ['**/**.*'], dest: 'dev/client/assets/images' },
            { expand: true, cwd: 'node_modules/@scottish-government/pattern-library/dist/images/icons/', src: ['**/**.*'], dest: 'dev/client/assets/images/icons' }
          ]
        },
        test: {
          options: {
            svgoPlugins: ['gifsicle', 'jpegtran', 'optipng', 'svgo']
          },
          files: [
            { expand: true, cwd: 'client/assets/images/', src: '**/*.{png,jpg,jpeg,gif,svg}', dest: 'test/client/assets/images' },
            { expand: true, cwd: 'node_modules/govuk-frontend/govuk/assets/images/', src: ['**/**.*'], dest: 'test/client/assets/images' },
            { expand: true, cwd: 'node_modules/@scottish-government/pattern-library/dist/images/icons/', src: ['**/**.*'], dest: 'test/client/assets/images/icons' }
          ]
        }
      },


      // Browser dev tools
      browserSync: {
        bsFiles: {
          src : [
            './dev/client/css/**/*.css',
            './dev/client/**/*.html',
            './dev/client/**/*.njk',
            './dev/client/**/*.js',
            './dev/client/**/*.{png,jpg,jpeg,gif,svg}',
            './dev/client/js/i18n/*.json',
            './dev/.rebooted'
          ]
        },
        options: {
          proxy: "localhost:" + (process.env.PORT || config.EXPRESS_PORT),
          watchTask: true,
          port: config.BROWSERSYNC_PORT,
          open: false,
          notify: {
            styles: {
              top: 'auto',
              bottom: '0'
            }
          }
        }
      },



      // Run server
      express: {
        options: {
          port: process.env.PORT || config.EXPRESS_PORT
        },
        dev: {
          options: {
            script: './dev/server/index.js',
            node_env: 'development'
          }
        },
        dist: {
          options: {
            script: './dist/server/index.js',
            node_env: 'production',
            USE_AUTH: false,
            background: false
          }
        },
        test: {
          options: {
            script: './test/server/index.js',
            node_env: 'test',
            background: false
          }
        },
        jenkins: {
          options: {
            script: './test/server/index.js',
            node_env: 'test'
          }
        }
      },


      // Reload express when changes made
      nodemon: {
        dev: {
          script: 'dev/server/index.js',
          options: {
            watch: ['dev/server/'],
            delay: 1000,
          }
        }
      },


      // Watch
      watch: {
        sync: {
          files: ['client/**/*.html', 'client/**/*.njk', 'server/**/*.js', 'client/js/**/*.json'],
          tasks: ['build-files:dev'],
          options: {
            spawn: false
          }
        },
        styles: {
          files: ['client/scss/**/*.scss'],
          tasks: ['build-styles:dev'],
          options: {
            spawn: false
          }
        },
        images: {
          files: ['client/img/**/*.{png,jpg,jpeg,gif,svg}'],
          tasks: ['build-images:dev'],
          options: {
            spawn: false
          }
        },
        scripts: {
          files: ['client/**/*.js'],
          tasks: ['build-scripts:dev'],
          options: {
            spawn: false
          }
        },
        translations: {
          files: ['client/js/i18n/**/*.json'],
          tasks: ['build-translations:dev'],
          options: {
            spawn: false
          }
        },
        unitTest: {
          files: ['client/**/*.js', 'server/**/*.js'],
          tasks: ['mochaTest:unit']
        }
      },


      // Use concurrent to run nodemon and watch at same time
      // Concurrent tasks
      concurrent: {
        dev: ['nodemon', 'watch'],
        test: ['express:test'],
        options: { logConcurrentOutput: true }
      },


      // Test settings
      mochaTest: {
        options: {
          reporter: 'mochawesome',
          require: 'mocha.conf.js',
          timeout: 5000 // set default mocha spec timeout
        },
        unit: {
          src: ['client/**/*.spec.js', 'server/**/*.spec.js'],
          options: {
            reporterOptions: {
              reportDir: 'reports/tests/unit',
              reportName: 'mocha-unit-report',
              reportTitle: 'Mocha Unit Test Results'
            }
          }
        },
        integration: {
          src: ['client/**/*.integration.js', 'server/**/*.integration.js'],
          options: {
            reporterOptions: {
              reportDir: 'reports/tests/integration',
              reportName: 'mocha-integration-report',
              reportTitle: 'Mocha Integration Test Results'
            }
          }
        }
      },

      mocha_istanbul: {
        unit: {
          options: {
            excludes: ['**/*.{spec,integration}.js', 'mocha.conf.js'],
            reporter: 'spec',
            require: ['mocha.conf.js'],
            mask: '**/*.spec.js',
            coverageFolder: 'reports/coverage/server/unit'
          },
          src: './server'
        }
      },

      istanbul_check_coverage: {
        default: {
          options: {
            coverageFolder: 'reports/coverage/**',
            check: {
              lines: 80,
              statements: 80,
              branches: 80,
              functions: 80
            }
          }
        }
      },

      env: {
        test: { NODE_ENV: 'test' },
        dev: { NODE_ENV: 'development' },
        prod: { NODE_ENV: 'production' }
      },

      shell: {
        'translations-dev': { command: 'NODE_ENV=dev node ./compilelanguage.js' },
        'translations-test': { command: 'NODE_ENV=test node ./compilelanguage.js' },
        'translations-dist': { command: 'NODE_ENV=dist node ./compilelanguage.js' }
      },


      // Documentation
      jsdoc : {
        dist : {
          src: ['client/**/*.js', 'server/**/*.js'],
          options: {
            destination: 'reports/documentation',
            template: 'node_modules/docdash',
            readme: 'README.md'
          }
        }
      },


      // Security Scan
      nsp: {
        package: grunt.file.readJSON('./package.json')
      }

    });




    // Maintain code quality from command line
    grunt.registerTask('code-lint', ['scsslint', 'eslint']);

    // Maintain accessibility standards
    grunt.registerTask('accessibility-check', 'Remove old reports and run accessibility checks generating a report. Will start server itself so either run as single task or with PORT environment variable set', function() {
      return grunt.task.run([
        'serve:test',
        'clean:accessibility',
        'accessibility'
      ]);
    });

    // Package app
    grunt.registerTask('build-translations', 'Compile individual translations entry files into single [langname].json', function(env) {
      return grunt.task.run(['shell:translations-'+env]);
    });

    //grunt.registerTask('do-babel', ['babel']);

    grunt.registerTask('build-files', 'Copy application files to output folder using either; :dev or :dist', function(env) {
      //return grunt.task.run(['sync:govuk', 'sync:'+env]);
      return grunt.task.run(['sync:'+env]);
    });

    grunt.registerTask('build-styles', 'Compile SASS to output folder using either; :dev or :dist', function(env) {
      return grunt.task.run(['sass', 'autoprefixer', 'cssmin:'+env]);
    });

    grunt.registerTask('build-scripts', 'Compile JS to output folder using either; :dev or :dist', function(env) {
      return grunt.task.run(['browserify', 'uglify:'+env]);
    });

    grunt.registerTask('build-images', 'Compress images to output folder using either; :dev or :dist', function(env) {
      return grunt.task.run(['imagemin:'+env]);
    });


    grunt.registerTask('build', 'Build the application using either; :dev, :dist or :test', function(env) {
      if(env === 'test') {
        return grunt.task.run([
          'clean:test',
          'build-files:test',
          'build-styles:test',
          'build-scripts:test',
          'build-images:test',
          'build-translations:test'
        ]);
      } else if(env === 'dist') {
        return grunt.task.run([
          'clean:dist',
          'build-files:dist',
          'build-styles:dist',
          'build-scripts:dist',
          'build-images:dist',
          'build-translations:dist'
        ]);
      }

      return grunt.task.run([
        'clean:dev',
        //'do-babel:dev',
        'build-files:dev',
        'build-styles:dev',
        'build-scripts:dev',
        'build-images:dev',
        'build-translations:dev'
      ]);
    });




    // Serve packaged app
    grunt.registerTask('serve', 'Serve the application using either; :dev or :dist', function(env) {
      if (env === 'jenkins') {
        return grunt.task.run([
          'env:test',
          'build:test',
          'express:jenkins'
        ]);
      }

      if(env === 'dist') {
        return grunt.task.run([
          'env:prod',
          'build:dist',
          'express:dist'
        ]);
      }

      if(env === 'test') {
        return grunt.task.run([
          'env:test',
          'build:test',
          'concurrent:test'
        ]);
      }

      return grunt.task.run([
        'env:dev',
        'build:dev',
        'browserSync',
        'concurrent:dev'
      ]);
    });




    // Testing
    grunt.registerTask('test', 'Run test suite, will start server itself so either run as single task or with PORT environment variable set.', function(target, option) {

      grunt.task.run(['serve:jenkins']);

      if(target === 'coverage') {
        if(option === 'run') {
          return grunt.task.run([
            'mocha_istanbul:unit'
          ]);
        } else if(option === 'check') {
          return grunt.task.run([
            'istanbul_check_coverage'
          ]);
        } else {
          return grunt.task.run([
            'test:coverage:run',
            'test:coverage:check'
          ]);
        }
      } else if(target === 'unit') {
        grunt.task.run([
          'mochaTest:unit',
        ]);
      } else if(target === 'integration') {
        grunt.task.run([
          'mochaTest:integration'
        ]);
      } else {
        grunt.task.run([
          'test:unit',
          'test:integration'
        ]);
      }

    });

  };

})();
