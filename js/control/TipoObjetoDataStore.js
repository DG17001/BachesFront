import BachesDataAcces from "./BachesDataAcces.js";

class TipoObjetoDataStore extends BachesDataAcces {
	constructor(){
		super();
	}
	findRange(_first=0,_pageSize=50){
		let promesa=fetch(`${this.BASE_URL}tipoobjeto?first=${_first}&pagesize=${_pageSize}`);
		return promesa;
	}

	async contar(){
		let promesa=fetch(this.BASE_URL+"tipoobjeto/contar",
			{method:"GET"}
		);
		await promesa.then(respuesta=>respuesta.json())
		.then(j=>console.log(j))
		.catch(err=>console.error(err));
		console.log("Entro al metodo contar");
	}
}

export default TipoObjetoDataStore;
console.log("antes de contar");
let t=new TipoObjetoDataStore();
t.contar();
console.log("despues de contar");

/*
//Promesas
let promise=new Promise((resolve,reject)=>{
	setTimeout(_=>{resolve("Se completo la promesa");},2000)
});

promise.then(e=>{console.log("manejo la promesa "+e)})

console.log("despues de la promesa")
Arrow Funcionts
//JS5
var funcionzota=function(){
	console.log("funcionzota");
};

//ES6
const funcioncita=()=>{console.log("funcioncita");};

funcioncita;
funcionzota;
*/