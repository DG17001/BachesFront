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

		width: 100%;
		height: 40px;

		box-sizing: border-box;
		border: 1px solid #a1a1a1;
		background: #976bff;
		box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
		color: #363636;
	}
	</style>

	<div class="container">
	<button>Label</button>
	</div>
	`;

	class ButtonDel extends HTMLElement {

	constructor() {
	super();

	this._shadowRoot = this.attachShadow({ mode: 'open' });
	this._shadowRoot.appendChild(template.content.cloneNode(true));
	this.$button = this._shadowRoot.querySelector('button');
	this.$button.addEventListener('click', () => {
		console.log(this.valueid);
		userDelete(this.valueid);
	});
	}
	get label() {
	return this.getAttribute('label');
	}
	get valueid(){
	return this.getAttribute('valueid');
	}
	set valueid(value){
	this.setAttribute('valueid', value);    
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

	window.customElements.define('boton-eliminar', ButtonDel);
	
	import {loadTable} from './formulario.js';
	function userDelete(id) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("DELETE", "https://267f-168-243-180-166.ngrok.io/BachesRest/resources/estado/eliminar?id="+id);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify({ 
			"id": id
		}));
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
			const objects = JSON.parse(this.responseText);
			console.log("eliminado");
			loadTable();
		} 
	};
}
