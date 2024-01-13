import {toggleMenu} from "./toggleMenu.mjs";

document.getElementsByClassName("menuNavegacion")[0].onclick = toggleMenu;

window.onload = () => {
	const message = { text : "Hola server" };

	fetch(window.location.href + 'messages~~listArt', {method : 'POST'})
	.then(res => {
		//* Compruebo que funciona
		if(!res.ok) throw new Error('Network response was not ok');

		return res.text();
	})
	.then(data => {
		alert(data);
	})
	.catch(error => {
		console.log(error);
	});
};