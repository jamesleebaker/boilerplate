var express = require('express');
  app = express(),
  favicon = require('serve-favicon'),
  chalk = require('chalk'),
  config = require('config'),
  path = require('path');

app.use(express.static('.build'));
app.use(favicon(path.resolve(__dirname, '.build', 'images', 'favicon.ico')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

var server = app.listen(config.port, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log(chalk.green('Application is running on %s:%s. Ctrl + C to exit...'), host, port);
});