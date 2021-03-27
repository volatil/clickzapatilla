
console.log( `Conectando ... ` );

// PUNTUACION PRECIOS
var puntuacion = function( uwu ){
	if ( uwu.length == 0 ) {
		uwu = "";
		return uwu;
	} else if ( uwu.length == 4 ) {
		uwu = "$ " + uwu.slice( 0 , 1 ) + "." + uwu.slice( 1 );
		return uwu;
	} else if ( uwu.length == 5 ) {
		uwu = "$ " + uwu.slice( 0 , 2 ) + "." + uwu.slice( 2 );
		return uwu;
	} else if ( uwu.length == 6 ) {
		uwu = "$ " + uwu.slice( 0 , 2 ) + "." + uwu.slice( 2 );
		return uwu;
	} else {
		return uwu;
	};
};

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

	/*
	if ( $( window ).width() <= 500 ) {
		$( ".modal-contenido > img" ).width( "100%" );
	} else {
		$( ".modal-contenido" ).width( $( window ).width() - 300 );
		$( ".modal-contenido" ).css( "max-height" , 700 );
	};
	*/
	
	$( ".productos li" ).click(function(){
		var marca = $( this ).find( ".marca" ).html();
		var modelo = $( this ).find( ".modelo" ).html();
		var id = $( this ).find( ".id" ).html().split( "#" )[1];
		var imagen = $( this ).find( "img" ).attr( "src" );
		$( ".modal-contenido img" ).attr( "src" , imagen );
		$( ".modal-contenido img" ).attr( "alt" , `${marca} ${modelo}` );
		$( ".modal-contenido p.modelo" ).html( `${modelo}` );
		$( ".modal-contenido p.marca" ).html( `${marca}` );
		$( ".modal-contenido p.id" ).html( `#${id}` );
		$( ".modal-contenido a.whatsapp" ).attr( "href" , `https://api.whatsapp.com/send?phone=56996336330&text=Hola, tengo una duda sobre las ${marca.toUpperCase()} ${modelo} (ID:${id})` );
		$( ".modal-contenido" ).addClass( "mostrar" );
		$( ".modal-fondo" ).show();
	});
	$( ".modal-contenido > .cerrar, .modal-fondo" ).click(function(){
		$( ".modal-fondo" ).hide();
		$( ".modal-contenido" ).removeClass( "mostrar" );
	});
};

// BUSCADOR
var buscar = function( valor ){
	if( valor == "todo" ) {
		$( ".productos li" ).removeClass( "hide" );
		$( ".productos li" ).removeClass( "show" );
		$( ".buscador .filtros > ul > li" ).removeClass( "activo" );
	} else {
		$.each( $( ".productos li" ) , function(){
			var buscado = valor;
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
	}
};

// SI NO TIENE ID NO LO MUESTRA
var hideProdSinID = function(){
	$.each( $( ".productos > ul > li" ) , function(){
		var id = $( this ).attr( "data-id" );
		if ( id.length == 0 ) {
			$( this ).remove();
		}
	});
};

// TRAE DATA
Promise.all([
	fetch( `https://spreadsheets.google.com/feeds/list/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/1/public/values?alt=json` ).then(value => value.json())
])
.then((value) => {
	
	var data = value[0].feed.entry;
	
	for( var fila = 0; fila <= data.length-1; fila++ ) {
		
		var id  = data[fila].gsx$id.$t;
		var marca  = data[fila].gsx$marca.$t;
		var modelo  = data[fila].gsx$modelo.$t;
		var color  = data[fila].gsx$color.$t;
		var preciocliente  = data[fila].gsx$preciocliente.$t;
		var talla  = data[fila].gsx$talla.$t;
		var imagen  = data[fila].gsx$imagen.$t;
		var descripcion  = data[fila].gsx$descripcion.$t;
		if( descripcion.length >= 1 ) {
			var descripcion = "("+descripcion+")";
		};
		
		// Agrega FILTROS
		if( !$( ".buscador .filtros ul" ).html().includes( marca ) ) {
			$( ".buscador .filtros ul" ).append( `<li>${marca}</li>` );
		};
		// Agrega PRODUCTOS
		$( ".productos ul" ).append( `
			<li data-id="${id}" data-zapatilla="${marca} ${modelo} ${color}">
				<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo} ${color}" /> 
				<span class="modelo">${modelo}</span>
				<span class="marca">${marca}</span>
				<span class="color">${color}</span>
				<span class="precio">${puntuacion(preciocliente)}</span>
				<span class="talla">Talla: ${talla}</span>
				<span class="descripcion">${descripcion}</span>
				<span class="id">#${id}</span>
			</li>
		` );
		$( ".productos .cargando" ).hide();
	};
	
	modal();
	hideProdSinID();
	cuentaProductos();
	
	// FILTRO
	$( ".buscador .filtros > ul > li" ).click(function(){
		$( ".buscador > input" ).val( "" );
		$( ".buscador .filtros > ul > li" ).removeClass( "activo" );
		$( this ).addClass( "activo" );
		var filtrando = $( this ).text();
		buscar( filtrando );
		cuentaProductos();
	});
	
});	

$( "input.buscador" ).keyup(function() {
	$( ".buscador .filtros > ul > li" ).removeClass( "activo" );
	var valor = $( "input.buscador" ).val();
	buscar( valor );
	cuentaProductos();
});






console.log( `😀` );
console.log( `Conectado ✔️` );