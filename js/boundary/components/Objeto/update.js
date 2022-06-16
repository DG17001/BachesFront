const template = document.createElement('template');

	template.innerHTML = `
	<style>
	.container {
		padding: 8px;
	}

	button {
		display: block;
		overflow: hidden;
		position: relative;
		padding: 0 16px;
		font-size: 16px;
		font-weight: bold;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		outline: none;
		border-radius: 15px;

		width: 70%;
		height: 40px;

		box-sizing: border-box;
		border: 1px solid #a1a1a1;
		background: #19c9ff;
		box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
		color: #363636;
	}
	</style>

	<div class="container">
	<button>Label</button>
	</div>
	`;

	class ButtonUpdate extends HTMLElement {
		constructor() {
			super();
	
			this._shadowRoot = this.attachShadow({ mode: 'open' });
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this.$button = this._shadowRoot.querySelector('button');
			this.$button.addEventListener('click', () => {
				showUserUpdateBox(this.valueid);
			});
		}
		get label() {
			return this.getAttribute('label');
		}
		set label(value) {
			this.setAttribute('label', value);
		}
		get valueid(){
			return this.getAttribute('valueid');
		}
		set valueid(value){
			this.setAttribute('valueid', value);    
		}
		static get observedAttributes() {
			return ['label'];
		}
	
		attributeChangedCallback(name, oldVal, newVal) {
			this.render();
		}
		render() {
			this.$button.innerHTML = this.label;
		}
	}
	
	window.customElements.define('boton-editar', ButtonUpdate);
	import {loadTable} from './formulario.js';
	
	function showUserUpdateBox(id) {
		console.log(id)
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://267f-168-243-180-166.ngrok.io/BachesRest/resources/objeto/findById/"+id);
		xhttp.send();
		xhttp.onreadystatechange = function() {
			//if (this.readyState == 4 && this.status == 200) {
				const objects = JSON.parse(this.response);
				const user = objects;
				console.log(user);
				Swal.fire({
					title: 'Modificar',
					html:
					'<input id="idObjeto" class="swal2-input" placeholder="First" value="'+user['idObjeto']+'" disabled>' +
					'<input id="idTipoObjeto" class="swal2-input" placeholder="First" value="'+user['idTipoObjeto']+'" disabled>' +
					'<input id="nombre" class="swal2-input" placeholder="First" value="'+user['nombre']+'">'+
					'<input id="latitud" class="swal2-input" placeholder="First" value="'+user['latitud']+'">'+
					'<input id="longitud" class="swal2-input" placeholder="First" value="'+user['longitud']+'">'+
					'<input id="observaciones" class="swal2-input" placeholder="Ingrese una observacion" value="'+user["observaciones"]+'">',
				focusConfirm: false,
				preConfirm: () => {
					userUpdate();
				}
			})
		//}
	};
}
	
	function userUpdate() {
		const id=document.getElementById("idObjeto").value;
		const nombre = document.getElementById("nombre").value;
		const latitud = document.getElementById("latitud").value;
		const longitud = document.getElementById("longitud").value;
		const observaciones = document.getElementById("observaciones").value;

		const xhttp = new XMLHttpRequest();
		xhttp.open("PUT", "https://267f-168-243-180-166.ngrok.io/BachesRest/resources/objeto/crear/id="+id+"&nombre="+nombre+"&latitud="+latitud+"&longitud="+longitud);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify({ 
			"id":id,"nombre":{nombre}, "latitud":{latitud},"longitud":{longitud}
		}));
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			//const objects = JSON.parse(this.responseText);
			console.log("Entro a modificar");
			console.log("modificado");
			//
			loadTable();			
			};
	}
}
