export function toggleMenu(e){
            let menu = e.target.nextElementSibling;
            menu.classList = (menu.classList.contains("menuNavegacionDesplegado"))? "listaNavegacion" : "menuNavegacionDesplegado";
        }