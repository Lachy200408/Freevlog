const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer((request, response) => {
	//* Tomo el path del recurso
	let filePath = "." + request.url;
	filePath = (filePath == "./")? "./main.html" : filePath;

	let extname = String(path.extname(filePath)).toLowerCase();
	let contentType = {
		'.html' : 'text/html',
		'.js' : 'text/javascript',
		'.css' : 'text/css',
		'.json' : 'application/json',
		'.png' : 'image/png',
		'.jpg' : 'image/jpg',
		'.gif' : 'image/gif',
		'.svg' : 'image/svg+xml',
	}[extname] || 'application/octet-stream';

	fs.readFile(filePath, (err, contenido)=>{
		if(err){
			response.writeHead(404, { 'Content-Type' : contentType});
			response.end('Error: ' + filePath + ' no se ha encontrado.');

			return;
		}

		response.writeHead(200, { 'Content-Type' : contentType});
		response.end(contenido, 'utf-8');
	});
});

server.listen(0, ()=>{
	console.info("Server is running on http://localhost:" + this.address().port);
})