const fs = require('node:fs/promises');

async function listarArticulos(folder){
	try{
		return await fs.readdir(folder);
	}
	catch(error){
		return "Ha ocurrido un error: " + error;
	}
}

module.exports = listarArticulos;