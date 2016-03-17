// Karma configuration
// Generated on Mon Dec 07 2015 17:53:35 GMT-0500 (Eastern Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'http://maps.googleapis.com/maps/api/js?sensor=false&language=en',
   'node_modules/angular/angular.js',
              'js/angular.js',
              'js/jquery-1.11.2.js',
              'node_modules/angular-mocks/jquery.geocomplete.min.js',
              'node_modules/angular-mocks/angular-mocks.js',
              //'js/jasmine-jquery-1.3.1.js',
              //'node_modules/angular-mocks/ngMock.js',
              'js/checklist-model.js',
              'js/validate.js',
              'js/angular-sanitize.min.js',
              'js/angular-route.js',
              'js/angular-ui-router.js',
              'js/ui-bootstrap-tpls-0.12.1.min.js',
              'index.js',
              'projectPages/home/home.js',
              'projectPages/login/login.js',
              'projectPages/register/register.js',
              'projectPages/profile/profile.js',
              'tests/index_test.js',
              'tests/projectPages/home/home_tests.js',
              'tests/projectPages/login/login_test.js',
              'tests/projectPages/register/register_test.js',
              'tests/projectPages/profile/profile_test.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        //plugins
        plugins: [
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine'
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
}
