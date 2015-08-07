module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      './app/**/*.spec.js'
    ],
    preprocessors: {
      './app/**/*.js': ['webpack']
    },
    reporters: ['nyan'],
    plugins: [
      require('karma-webpack'),
      'karma-jasmine',
      'karma-nyan-reporter',
      'karma-phantomjs-launcher'
    ],
    colors: true,
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
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
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};