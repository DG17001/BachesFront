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
    xhttp.open("GET", "https://267f-168-243-180-166.ngrok.io/BachesRest/resources/objetoestado");
    xhttp.send();
    
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var trHTML = ''; 
			const objects = JSON.parse(this.responseText);
			console.log(objects);
			for (let object of objects) {
				trHTML += '<tr>'; 
				trHTML += '<td>'+object['idObjetoEstado']+'</td>';
				trHTML += '<td>'+object['idEstado']+'</td>';
				trHTML += '<td>'+object['idObjeto']+'</td>';
				trHTML += '<td>'+object['actual']+'</td>';
				trHTML += '<td>'+object['fechaAlcanzado']+'</td>';
				trHTML += '<td>'+object['observaciones']+'</td>';
				trHTML += '<td><boton-editar label="🖋" valueid='+object['idObjetoEstado']+'></boton-editar></td>';
				trHTML += '<td><boton-eliminar label="⛔" valueid='+object['idObjetoEstado']+'></boton-eliminar></td>';
				trHTML += "</tr>";
			}
			document.getElementById("table").innerHTML = trHTML;
		}
	};
}
export {loadTable};

window.customElements.define("f-", formulario);
