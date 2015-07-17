var express = require('express');
var app = express();
var favicon = require('serve-favicon');

app.use(express.static('build'));
app.use(favicon('./build/images/favicon.ico'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});