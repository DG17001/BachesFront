class formulario extends HTMLElement {
    constructor() {
		super();
    }
    connectedCallback() {
		loadTable();
    }
}

    function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://62a89485ec36bf40bda96f1b.mockapi.io/Baches/resources/estado");
    xhttp.send();
    
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var trHTML = ''; 
			const objects = JSON.parse(this.responseText);
			console.log(objects);
			for (let object of objects) {
				trHTML += '<tr>'; 
				trHTML += '<td>'+object['idEstado']+'</td>';
				trHTML += '<td>'+object['nombre']+'</td>';
				trHTML += '<td>'+object['fechaCreacion']+'</td>';
				trHTML += '<td>'+object['observaciones']+'</td>';
				trHTML += '<td><boton-editar label="🖋" valueid='+object['idEstado']+'></boton-editar></td>';
				trHTML += '<td><boton-eliminar label="⛔" valueid='+object['idEstado']+'></boton-eliminar></td>';
				trHTML += "</tr>";
			}
			document.getElementById("table").innerHTML = trHTML;
		}
	};
}
export {loadTable};

window.customElements.define("f-", formulario);
