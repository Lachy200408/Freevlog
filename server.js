const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

//* Funciones del backend
const listarArticulos = require('./nodeScripts/listarArticulos');
const util = require('./nodeScripts/utilidades');

//* Creo el diccionario de funciones
const funciones = {
	listadoFunciones : ["listArt"], //* Listado de las funciones disponibles
	listArt : listarArticulos
};

//* Funcion que crea el servidor y donde se ejecuta la logica
const server = http.createServer((request, response) => {
	//* Atiendo el metodo post
	if(request.method === 'POST' && request.url.includes('/messages')){
		
		//* Guardo el mensaje
		const url = request.url;
		let message = url.slice(url.indexOf("~~")+2 , url.length);

		//* Aseguro el codigo contra errores
		if(!funciones.listadoFunciones.includes(message)){
			//* Este codigo se ejecuta si no se encuentra la accion requerida
			response.writeHead(404, {'Content-Type' : 'text'});
			response.end('No se encontro la accion requerida');
			return;
		}

		//* Ejecuto y envio el mensaje
		let respuesta = funciones[message]("./articulos/");
		respuesta.then(texto => {
			texto = util.arrayToText(texto);

			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.end(texto, 'utf-8');
		})

		return;
	}

	//* Tomo el path del recurso
	let filePath = "." + request.url;
	filePath = (filePath === "./")? "./main.html" : filePath;

	//* Tomo la extension del recurso y el tipo de contenido para que lo entienda el servidor
	let extname = String(path.extname(filePath)).toLowerCase();
	let contentType = {
		'.html' : 'text/html',
		'.js' : 'text/javascript',
		'.mjs' : 'text/javascript',
		'.css' : 'text/css',
		'.json' : 'application/json',
		'.png' : 'image/png',
		'.jpg' : 'image/jpg',
		'.gif' : 'image/gif',
		'.svg' : 'image/svg+xml',
	}[extname] || 'application/octet-stream';

	//* Leo el recurso y envio el contenido de este
	fs.readFile(filePath, (err, contenido)=>{
		//* Controlo los errores que pueden suceder
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
	console.info("Server is running on http://localhost:" + server.address().port);
})