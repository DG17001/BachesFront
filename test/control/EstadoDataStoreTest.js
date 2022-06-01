import EstadoDataStore from "../../js/control/EstadoDataStore.js";

describe("EstadoDataStore",function(){
	var cut;
	it ("Deberia instanciarse",function(){
		cut= new EstadoDataStore();
		assert.isDefined(cut,"El objeto no esta instanciado");
	});
	it ("Deberia buscar primeros 50",function(){
		cut.findRange(0,50).then(function(respuesta){
			assert.equal(respuesta.status,200);
		});
	});
});
