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
		border-radius: 15px;
		outline: none;

		width: 100%;
		height: 40px;

		box-sizing: border-box;
		border: 1px solid #a1a1a1;
		background: #f5165d;
		box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
		color: #363636;
	}
	</style>

	<div class="container">
		<button>Label</button>
	</div>
	`;

	class Button extends HTMLElement {
	constructor() {
		super();

		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));
		this.$button = this._shadowRoot.querySelector('button');
		this.$button.addEventListener('click', () => {
		showUserCreateBox();
		});
	}
	get label() {
		return this.getAttribute('label');
	}
	set label(value) {
		this.setAttribute('label', value);
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

	window.customElements.define('boton-crear', Button);
	import {loadTable} from './formulario.js';
	function showUserCreateBox() {
		Swal.fire({
		title: 'Nuevo',
		html:
			'<input id="nombre" class="swal2-input" placeholder="Ingrese un nombre">' +
			'<input id="latitud" class="swal2-input" placeholder="Ingrese una latitud">' +
			'<input id="longitud" class="swal2-input" placeholder="Ingrese una longitud">' +
			'<input id="observacion" class="swal2-input" placeholder="Ingrese un texto">' ,
		focusConfirm: false,
		preConfirm: () => {
			userCreate();
		}
		})
	}
	
	function userCreate() {
		const nombre = document.getElementById("nombre").value;
		const latitud = document.getElementById("latitud").value;
		const longitud = document.getElementById("longitud").value;
		const observacion = document.getElementById("observacion").value;

		const xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://33df-168-243-185-61.ngrok.io/BachesRest/resources/objeto/crear?nombre="+nombre+"&latitud="+latitud+"&longitud="+longitud+"observacion="+observacion);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify({ 
			"nombre":{nombre}, "latitud":{latitud},"longitud":{longitud},"observacion":{observacion}
		}));
		
		xhttp.onreadystatechange = function() {
		console.log("Entro a crear nuevo");
			console.log("creado");
			Swal.fire("creado");
			loadTable();
		};
	}
