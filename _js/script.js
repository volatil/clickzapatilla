
console.log( `Conectando ... ` );

// TRAE DATA
Promise.all([
	fetch( `https://spreadsheets.google.com/feeds/list/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/1/public/values?alt=json` ).then(value => value.json())
])
.then((value) => {
	
	var data = value[0].feed.entry;
	
	for( var fila = 0; fila <= data.length-1; fila++ ) {
		
		var id  = data[fila].gsx$id.$t;
		var stock  = data[fila].gsx$stock.$t;
		var marca  = data[fila].gsx$marca.$t;
		var modelo  = data[fila].gsx$modelo.$t;
		var color  = data[fila].gsx$color.$t;
		
		// desde el valor "precio_cliente"
		// var preciocliente  = data[fila].gsx$preciocliente.$t;
		// desde el valor "precio_neto"
		var preciocliente  = data[fila].gsx$precioneto.$t;
		preciocliente = Number(preciocliente)+15000
		
		var talla  = data[fila].gsx$talla.$t;
		
		var imagen	= data[fila].gsx$imagen.$t;
		if ( imagen.split( " " ).length >= 2 ) {
			for ( var imgcount = 0; imgcount <= imagen.split( " " ).length-1; imgcount++ ) {
				$( ".getDetalle .galeria" ).append( `<img class="lazyload" src="${imagen.split( " " )[imgcount]}" alt="${marca} - ${modelo}" />` )
				
				$( ".getDetalle > .galeria > img" ).click(function(){
					let ruta = $( this ).attr( "src" );
					$( ".getDetalle > img" ).attr( "src" , ruta );
				});
				
			};
			imagen = imagen.split( " " )[0];
		};
		
		var descripcion  = data[fila].gsx$descripcion.$t;
		if( descripcion.length >= 1 ) {
			var descripcion = "("+descripcion+")";
		};
		
		// Agrega FILTROS
		if( !$( ".buscador .filtros ul" ).html().includes( marca ) ) {
			$( ".buscador .filtros ul" ).append( `<li>${marca}</li>` );
		};
		// Agrega PRODUCTOS
		if ( stock == "1" ) {
			$( ".productos ul" ).prepend( `
				<li data-stock="${stock}" data-id="${id}" data-zapatilla="${marca} ${modelo} ${color}">
					<a href="/detalle.html?id=${id}" title="${marca} ${modelo}">
						<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo} ${color}" /> 
						<span class="modelo">${modelo}</span>
						<span class="marca">${marca}</span>
						<span class="color">${color}</span>
						<span class="precio">${puntuacion(preciocliente)}</span>
						<span class="talla">${talla}</span>
						<span class="descripcion">${descripcion}</span>
						<span class="id">#${id}</span>
					</a>
				</li>
			` );
		}
		$( ".productos .cargando" ).hide();
	};
	
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

// ESCRIBIENDO EN EL BUSCADOR
$( "input.buscador" ).keyup(function() {
	$( ".buscador .filtros > ul > li" ).removeClass( "activo" );
	var valor = $( "input.buscador" ).val();
	buscar( valor );
	cuentaProductos();
});















console.log( `😀` );
console.log( `Conectado ✔️` );