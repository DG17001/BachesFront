//Importamos las librerías necesarias
import { LitElement, html } from "https://unpkg.com/lit?module";

const MAX_MATCHES = 15;
const NO_RESULTS_MESSAGE_TIME = 5;

function obtenerJSON(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				reject(
					"Error al obtener el JSON, el servidor devuelve: " +
					response.status
				);
			})
			.then((json) => resolve(json))
			.catch((err) => reject(err));
	});
}

export class litAutocomplete extends LitElement {
	static get properties() {
		return {
			fulllist: { type: Array },
			opened: { type: Boolean, reflect: true },
			maxSuggestions: Number,
		};
	}

	get contentElement() {
		if (this._inputEl) {
			return this._inputEl;
		}

		var slotInputList = this.shadowRoot
			.getElementById("dropdown-input")
			.assignedNodes()[1];

		this._inputEl = slotInputList
			? slotInputList
			: this.shadowRoot.getElementById("defaultInput");

		return this._inputEl;
	}

	constructor() {
		super();

		this._eventReferences = {};

		this._matches = [];

		this.items = [];

		this.opened = false;

		this.maxSuggestions = MAX_MATCHES;
	}

	firstUpdated() {
		this._suggestionEl = this.shadowRoot.getElementById("suggestions");
		this._suggestionEl.style.width =
			this.contentElement.getBoundingClientRect().width + "px";

		this._eventReferences.onFocus = this._onFocus.bind(this);
		this._eventReferences.onBlur = this._onBlur.bind(this);

		this._eventReferences.onKeyDown = this._onKeyDown.bind(this);
		this._eventReferences.onKeyUp = this._onKeyUp.bind(this);

		this.contentElement.addEventListener(
			"focus",
			this._eventReferences.onFocus
		);
		this.contentElement.addEventListener("blur", this._eventReferences.onBlur);

		this.contentElement.addEventListener(
			"keydown",
			this._eventReferences.onKeyDown
		);
		this.contentElement.addEventListener(
			"keyup",
			this._eventReferences.onKeyUp
		);

    obtenerJSON("https://267f-168-243-180-166.ngrok.io/BachesRest/resources/objetoestado")
			.then((json) => {
				console.log("el json de respuesta es:", json);
				this.items = json;
			})
			.catch((err) => {
				console.log("Se ha producido el siguiente error:", err);
			});
	}
	
	updated(changed) {
		console.log("¡Actualizado!");
		if (
			changed.has("abierto") &&
			this.opened &&
			this._suggestionEl.childElementCount
		) {
			for (let item of this._suggestionEl.children) {
				item.classList.remove("activado");
			}
			this._highlightedEl = this._suggestionEl.children[0];
			this._highlightedEl.classList.add("activado");
		}
	}

	disconnectedCallback() {
		if (!this.contentElement) {
			return;
		}

		this.contentElement.removeEventListener(
			"keydown",
			this._eventReferences.onKeyDown
		);
		this.contentElement.removeEventListener(
			"keyup",
			this._eventReferences.onKeyUp
		);
		this.contentElement.removeEventListener(
			"focus",
			this._eventReferences.onFocus
		);
		this.contentElement.removeEventListener(
			"blur",
			this._eventReferences.onBlur
		);
	}

	/**********************************/
	/************Events****************/
	/**********************************/

	_onKeyDown(ev) {
		if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
			ev.preventDefault();
			ev.stopPropagation();
		}
	}

	_onKeyUp(ev) {
		switch (ev.key) {
			case "ArrowUp":
				ev.preventDefault();
				ev.stopPropagation();
				this._markPreviousElement();
				break;

			case "ArrowDown":
				ev.preventDefault();
				ev.stopPropagation();

				this._markNextElement();
				break;

			case "Enter":
				this._highlightedEl && this._highlightedEl.click();
				break;
			default:
				if (this.items.length) {
					var suggestions = [];
					var value = this.contentElement.value;

					suggestions =
						value &&
						this.items
							.filter(
								(item) =>
									item.nombre
										.replace(",", "")
										.replace(/\s/g, "")
										.toLowerCase()
										.search(
											value.replace(",", "").replace(/\s/g, "").toLowerCase()
										) != -1
							)
							.slice(0, this.maxSuggestions); // Limit results

					if (suggestions.length === 0) {
						suggestions = [];
						suggestions.push({ value: null, text: "Lo sentimos, no hay coincidencias" });
					}

					this.suggest(suggestions);
				}
				
		}
	}

	_markPreviousElement() {
		if (!this._highlightedEl || !this._highlightedEl.previousElementSibling) {
			return;
		}

		this._highlightedEl.classList.remove("activado");
		this._highlightedEl = this._highlightedEl.previousElementSibling;
		this._highlightedEl.classList.add("activado");
	}

	_markNextElement() {
		if (!this._highlightedEl || !this._highlightedEl.nextElementSibling) {
			return;
		}

		this._highlightedEl.classList.remove("activado");
		this._highlightedEl = this._highlightedEl.nextElementSibling;
		this._highlightedEl.classList.add("activado");
	}

	_onFocus(ev) {
		console.log("enfocado");
		this._blur = false;
		this._matches.length && this.open();
	}

	_onBlur(ev) {
		this._blur = true;
		!this._mouseEnter && this.close();
	}

	_handleItemMouseEnter(ev) {
		this._mouseEnter = true;
	}

	_handleItemMouseLeave(ev) {
		this._mouseEnter = false;
		this._blur && setTimeout((_) => this.close(), 500);
	}

	/*********************************/
	/**********Methods***************/
	/*********************************/

	open() {
		console.log("abierto()");
		if (this._matches.length) {
			this.opened = true;
		}
	}

	close() {
		console.log("cerrado()");
		this.opened = false;
		this._highlightedEl = null;
	}

	suggest(suggestions) {
		console.log("en uso");
		this._matches = suggestions || [];
		this._matches.length ? this.open() : this.close();
		this.requestUpdate();
	}

	autocomplete(value, text) {
		this.contentElement.value = value;

		this.close();
		this.dispatchEvent(
			new CustomEvent("selected-autocomplete", {
				detail: { value, text },
				composed: true,
				bubbles: true,
			})
		);
	}

	render() {
		return html`
		<style>
			ul {
			position: absolute;
			margin: 0;
			padding: 0;
			z-index: 5000;
			background: white;
			display: block;
			list-style-type: none;
			width: 100% !important;
			border: 1px solid black;
			}

			li {
			padding: 10px;
			}

			li.active {
			background: gray;
			}

			[hidden] {
			display: none;
			}
		</style>

		<slot id="dropdown-input">
			<input id="defaultInput" type="text" />
		</slot>

		<ul
			id="suggestions"
			?hidden=${!this.opened}
			@mouseenter=${this._handleItemMouseEnter}
			@mouseleave=${this._handleItemMouseLeave}
		>
			<!--50-->
			${this._matches.map(
				(item) => html`
				<li
				@click=${(ev) =>
						this.autocomplete(item.nombre, item.value ? item.value : null)}
				>
				${item.nombre}
				</li>
			`
			)}
		</ul>
    `;
	}
}

window.customElements.define("lit-autocomplete", litAutocomplete);
