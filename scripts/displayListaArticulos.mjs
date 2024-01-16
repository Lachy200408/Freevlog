export function displayListaArticulos(listaArticulos){
	let menu = document.getElementById('navArticulosDetails').children[1];
	listaArticulos.forEach(articulo => {
		menu.innerHTML = (menu.innerHTML !== "")?
			menu.innerHTML + '<li>' + articulo.slice(0, articulo.indexOf('.')) + '</li>' :
			'<li>' + articulo.slice(0, articulo.indexOf('.')) + '</li>';
	});
}