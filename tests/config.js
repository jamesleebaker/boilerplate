module.exports = function(config) {
  config.set({
    basePath: '../',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'tests/specs/**/*.spec.js',
      'index.html'
    ],
    preprocessors: {
      'tests/specs/**/*.js': ['webpack'],
      'index.html': ['html2js']
    },
    reporters: ['nyan'],
    plugins: [
      require('karma-webpack'),
      'karma-jasmine',
      'karma-nyan-reporter',
      'karma-phantomjs-launcher',
      'karma-html2js-preprocessor'
    ],
    colors: true,
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            compact: false
          },
          exclude: ['node_modules']
        },
        {
          test: /\.scss$/,
          loader: 'null-loader'
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader'
        }]
      },
      resolve: {
        extensions: ['', '.js', '.scss', '.hbs'],
        modulesDirectories: ['assets', 'node_modules']
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};