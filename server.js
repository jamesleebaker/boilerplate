var express = require('express'),
  app = express(),
  //favicon = require('serve-favicon'),
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
  isProduction = process.env.NODE_ENV === 'production',
  //mockServer = require('./mock_server'),
  bundle,
  server;

app.use(express.static('build'));
//app.use(favicon(path.resolve(__dirname, 'build', 'images', 'favicon.ico')));

if (!isProduction) {

  bundle = require('./webpack.server.js');
  bundle();

  // enable once you make a mock
  //mockServer.start();

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
}

if(isProduction) {
  app.all('/static/:file', function (req, res) {
    var params = req.params;

    if(!Object.keys(params).length) {
      res.status(404).send('Not found');
      return;
    }

    res.sendFile(path.resolve(path.resolve(__dirname, 'build', params.file)));
  });
}

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

server = http.createServer(app);

if(!isProduction) {
  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });
}

server.listen(config.port, function () {
   console.log(chalk.green('Application is running on port %s. Ctrl + C to exit...'), config.port);
});
