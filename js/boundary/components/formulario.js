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
    //cambiar para nuestra api
    xhttp.open("GET", "https://8540-168-243-185-61.ngrok.io/BachesRest/resources/estado");
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
				trHTML += '<td><my-button-edit label="Edit" valueid='+object['idEstado']+'></my-button-edit>';
				trHTML += '<my-button-del label="Del" valueid='+object['idEstado']+'></my-button-del></td>';
				trHTML += "</tr>";
			}
			document.getElementById("table").innerHTML = trHTML;
		}
	};
}
export {loadTable};

window.customElements.define("f-", formulario);
