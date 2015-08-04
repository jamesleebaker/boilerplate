var express = require('express');
  app = express(),
  favicon = require('serve-favicon'),
  chalk = require('chalk'),
  config = require('config');

app.use(express.static('build'));
app.use(favicon(__dirname + '/build/images/favicon.ico'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(config.port, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log(chalk.green('Application is running on %s:%s. Ctrl + C to exit...'), host, port);
});