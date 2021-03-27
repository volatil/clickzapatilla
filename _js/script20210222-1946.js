
console.log( `Conectado ...` );

// CONTADOR DE SERVICIOS
var cuentaProductos = function(){
	var cantidadResultados = $( '.productos li:visible' ).length;
	if ( cantidadResultados >= 2 ) {
		$( ".buscador span.cantidad" ).html( "<strong>" + cantidadResultados + "</strong> Resultados" );
	} else if ( cantidadResultados == 1 ) {
		$( ".buscador span.cantidad" ).html( "<strong>" + cantidadResultados + "</strong> Resultado" );
	} else {
		$( ".buscador span.cantidad" ).html( "No se encontrarón resultados" );
	};
};

// MODAL
var modal = function(){
	$( ".productos li" ).click(function(){
		var marca = $( this ).find( ".marca" ).html();
		var modelo = $( this ).find( ".modelo" ).html();
		var imagen = $( this ).find( "img" ).attr( "src" );
		$( ".modal-contenido img" ).attr( "src" , imagen );
		$( ".modal-contenido img" ).attr( "alt" , `${marca} ${modelo}` );
		$( ".modal-contenido p.modelo" ).html( `${modelo}` );
		$( ".modal-contenido p.marca" ).html( `${marca}` );
		$( ".modal-contenido" ).addClass( "mostrar" );
		$( ".modal-fondo" ).show();
	});
	$( ".modal-contenido > .cerrar, .modal-fondo" ).click(function(){
		$( ".modal-fondo" ).hide();
		$( ".modal-contenido" ).removeClass( "mostrar" );
	});
};

// TRAE DATA
Promise.all([
	fetch( `https://spreadsheets.google.com/feeds/list/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/1/public/values?alt=json` ).then(value => value.json())
])
.then((value) => {
	
	var data = value[0].feed.entry;
	
	for( var fila = 0; fila <= data.length-1; fila++ ) {
		
		var marca  = data[fila].gsx$marca.$t;
		var modelo  = data[fila].gsx$modelo.$t;
		var color  = data[fila].gsx$color.$t;
		var precio  = data[fila].gsx$precio.$t;
		var talla  = data[fila].gsx$talla.$t;
		var imagen  = data[fila].gsx$imagen.$t;
		var descripcion  = data[fila].gsx$descripcion.$t;
		if( descripcion.length >= 1 ) {
			var descripcion = "("+descripcion+")";
		};
		
		$( ".productos ul" ).append( `
			<li data-zapatilla="${marca} ${modelo} ${color}">
				<img src="${imagen}" alt="${marca} ${modelo} ${color}" /> 
				<span class="modelo">${modelo}</span>
				<span class="marca">${marca}</span>
				<span class="color">${color}</span>
				<span class="precio">US $${precio}.00</span>
				<span class="talla">Talla: ${talla}</span>
				<span class="descripcion">${descripcion}</span>
			</li>
		` );
		$( ".productos .cargando" ).hide();
	};
	
	cuentaProductos();
	modal();
	
});	

// BUSCADOR
$( "input.buscador" ).keyup(function() {
	$.each( $( ".productos li" ) , function(){
		var buscado = $( "input.buscador" ).val();
		if( buscado.length <= 1 ) {
			$( ".productos li" ).removeClass( "hide" );
			$( ".productos li" ).removeClass( "show" );
		} else if ( $( this ).attr( "data-zapatilla" ).indexOf( buscado ) >= 0 ){
			$( ".productos li" ).addClass( "hide" );
			$( this ).addClass( "show" );
		} else {
			$( this ).removeClass( "show" );
			$( this ).removeClass( "hide" );
			$( this ).addClass( "hide" );
		};
	});
	cuentaProductos();
});

// BUSQUEDA FORZADA
var busquedaForzada = function( uwu ){
	$.each( $( ".productos li" ) , function(){
		var buscado = uwu;
		if( buscado.length <= 1 ) {
			$( ".productos li" ).removeClass( "hide" );
			$( ".productos li" ).removeClass( "show" );
		} else if ( $( this ).attr( "data-zapatilla" ).indexOf( buscado ) >= 0 ){
			$( ".productos li" ).addClass( "hide" );
			$( this ).addClass( "show" );
		} else {
			$( this ).removeClass( "show" );
			$( this ).removeClass( "hide" );
			$( this ).addClass( "hide" );
		};
	});
};

// FILTRO
$( ".buscador .filtros > ul > li" ).click(function(){
	var filtrando = $( this ).text();
	console.log( `Click ! en ${filtrando}` );
	busquedaForzada( filtrando );
});

