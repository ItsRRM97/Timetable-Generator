const http = require('http');

const hostname = 'localhost';
const port = 8080;


const server = http.createServer((req,res) => { // what  does => mean?
	res.statusCode = 200;
	res.setHead('Content-Type', 'text/plain');
	res.end('Node.js http server running!');
});

server.listen(hostname, port, () => {
	console.log(`Server running at http://${hostname}:${port}/`); // why ` instead of ' here?
});