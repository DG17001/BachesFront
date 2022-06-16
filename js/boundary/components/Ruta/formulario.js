class formulario extends HTMLElement {
    constructor() {
		super();
    }
    connectedCallback() {
		loadTable();
    }
	
	}
	addEventListener("load", ()=>{
		loadTable();
	})

    function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://267f-168-243-180-166.ngrok.io/BachesRest/resources/ruta");
    xhttp.send();
    
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var trHTML = ''; 
			const objects = JSON.parse(this.responseText);
			console.log(objects);
			for (let object of objects) {
				trHTML += '<tr>'; 
				trHTML += '<td>'+object['idRuta']+'</td>';
				trHTML += '<td>'+object['nombre']+'</td>';
				trHTML += '<td>'+object['fechaCreacion']+'</td>';
				trHTML += '<td>'+object['observaciones']+'</td>';
				trHTML += '<td><boton-editar label="🖋" valueid='+object['idRuta']+'></boton-editar></td>';
				trHTML += '<td><boton-eliminar label="⛔" valueid='+object['idRuta']+'></boton-eliminar></td>';
				trHTML += "</tr>";
			}
			document.getElementById("table").innerHTML = trHTML;
		}
	};
}
export {loadTable};

window.customElements.define("f-", formulario);
