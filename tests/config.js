module.exports = function(config) {
  config.set({
    browsers: ['Chrome', 'PhantomJS'],
    frameworks: ['mocha'],
    files: [
      '../app/**/*.js',
      './app/**/*.spec.js'
    ]
  });
};