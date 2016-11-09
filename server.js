// EXPRESS SERVEER & GZIP

//Require Express 
// var compression = require('compression');
var express = require('express');
var app = express();

//GZIP Compression
// app.use(compression());

//Folder to serve from
app.use(express.static('dist'));

//File to serve
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

//Bootstrap a server.
app.listen(3000, function () {
  console.log('Running & listening on port 3000!');
});