import {toggleMenu} from "./toggleMenu.mjs";
import {displayListaArticulos} from "./displayListaArticulos.mjs";
import {getListaArticulos} from "./request.mjs";

document.getElementById("menuNavegacion").onclick = toggleMenu;

window.onload = () => {
	//* Tomo la lista de articulos del blog
	let listArt = [];
	getListaArticulos()
		.then(response => {
			listArt = response;

			//* La inserto en la pagina
			displayListaArticulos(listArt);
		})
		.catch(error => {
			console.log(error);
		});
};