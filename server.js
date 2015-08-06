var express = require('express');
  app = express(),
  favicon = require('serve-favicon'),
  chalk = require('chalk'),
  config = require('config'),
  path = require('path'),
  httpProxy = require('http-proxy'),
  http = require('http'),
  proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    ws: true
  }),
  config = require('config'),
  isProduction = process.env.NODE_ENV === 'production';

app.use(express.static('build'));
//app.use(favicon(path.resolve(__dirname, 'build', 'images', 'favicon.ico')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

if (!isProduction) {

  var bundle = require('./webpack.server.js');

  bundle();

  app.all('/static/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'
    });
  });

  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });


  proxy.on('error', function(e) {
    // TODO: catch it
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(config.port, function () {
     console.log(chalk.green('Application is running on port %s. Ctrl + C to exit...'), config.port);
  });

} else {

  app.all('/static/:file', function (req, res) {
    var params = req.params;

    if(!Object.keys(params).length) {
      res.status(404).send('Not found');
      return;
    }

    res.sendFile(path.resolve(path.resolve(__dirname, 'build', params.file)));
  });

  var server = app.listen(config.port, function () {
    var host = server.address().address,
      port = server.address().port;

    console.log(chalk.green('Application is running on %s:%s. Ctrl + C to exit...'), host, port);
  });

}