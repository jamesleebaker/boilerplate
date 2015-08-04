module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['Chrome', 'PhantomJS'],
    frameworks: ['jasmine', 'browserify'],
    files: [
      '../app/**/*.js',
      './app/**/*.spec.js'
    ],
    preprocessors: {
      '../app/**/*.js': ['browserify'],
      './app/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    }
  });
};