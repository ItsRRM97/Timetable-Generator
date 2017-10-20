const http = require('http');
const fs = require('fs');
const url = require('url');
// const events = require('events');
const database = require('./database');

//var eventEmitter = new events.EventEmitter();

var q;

http.createServer(function (req, res) {
	q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	fs.readFile(filename, function(err, data) {
		if(err) {
			res.writeHead(404, {'Content-Type':'text/html'});
			return res.end('404 Not Found!');
		}
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(8080);
console.log('Project running at http://localhost:8080/');

/*
var myEventHandler = function() {
	console.log('I hear a scream!');
}

eventEmitter.on('scream', myEventHandler);

eventEmitter.emit('scream');
*/
