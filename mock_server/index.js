var Pretender = require('pretender');
var path = require('path');
var fs = require('fs');
var mapsPath = path.join('__dirname', 'maps');
var files = [];

fs.readdirSync(mapsPath).forEach(function(file) {
  files.push(require('./maps/' + file));
});

if(!files.length) {
  files.push(function() {}); // so server will start
}

function createServer(Server) {
  return new (Function.prototype.bind.apply(Server, arguments));
}

module.exports = {
  start: function() {
    this.server = createServer(Pretender, files);
  }
};