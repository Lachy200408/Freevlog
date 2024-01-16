//? Funcion que pide la lista de articulos
export function getListaArticulos(){
	return new Promise((res, rej) => {
		let lista = [];

		fetch(window.location.origin + '/messages~~listArt', {method : 'POST'})
		.then(res => {
			//* Compruebo que funciona
			if(!res.ok) throw new Error('Network response was not ok');

			return res.text();
		})
		.then(data => {
			lista = data.split(",");
			res(lista);
		})
		.catch(error => {
			console.log(error);
		});

	});
}