var express = require('express');
var compress = require('compression');
var app = express();
var port = process.env.PORT || 8080;

//Gzip
app.use(compress());

//Serve Static Files
app.use('/static/media', express.static(__dirname + '/media'));
app.use('/static', express.static(__dirname + '/build'));
app.use('/data', express.static(__dirname + '/data'));

//Serve Html
app.use('/', express.static(__dirname + '/src/html'));


//Run server
app.listen(port);
console.log('Magic happens on port ' + port);
