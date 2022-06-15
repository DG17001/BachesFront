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
	// modificar para nuestra api con respecto a los campos a enviar
	import {loadTable} from './formulario.js';
	function showUserCreateBox() {
		Swal.fire({
		title: 'Nuevo',
		html:
			'<input id="idEstado" class="swal2-input" placeholder="Ingrese un numero">' +
			'<input id="nombre" class="swal2-input" placeholder="Ingrese un nombre">' +
			'<input id="observacion" class="swal2-input" placeholder="ingrese un texto">' ,
		focusConfirm: false,
		preConfirm: () => {
			userCreate();
		}
		})
	}
	
	function userCreate() {
		const idEstado=document.getElementById("idEstado").value;
		const nombre = document.getElementById("nombre").value;
		const observaciones = document.getElementById("observaciones").value;

		const xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://62a89485ec36bf40bda96f1b.mockapi.io/Baches/resources/estado?nombre="+nombre+"&observacion="+observaciones);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify({ 
			"nombre":{nombre}, "observacion":{observaciones}
		}));
		
		xhttp.onreadystatechange = function() {
		console.log("Entro a crear nuevo");
			console.log("creado");
			Swal.fire("creado");
			loadTable();
		};
	}
