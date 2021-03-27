
console.log( `Conectando ... ` );

// PUNTUACION PRECIOS
var puntuacion = function( uwu ){
	var uwu = String(uwu);
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

// CONTADOR DE RESULTADOS
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

// Calcula Fecha de Entrega
var fechaEntrega = function(){
	var fecha   = new Date();
	var dia     = fecha.getDate();
	var mes     = fecha.getMonth();
	switch ( mes ) {
		case 0:
			mes = "Enero";
			break;
		case 1:
			mes = "Febrero";
			break;
		case 2:
			mes = "Marzo";
			break;
		case 3:
			mes = "Abril";
			break;
		case 4:
			mes = "Mayo";
			break;
		case 5:
			mes = "Junio";
			break;
		case 6:
			mes = "Julio";
			break;
		case 7:
			mes = "Agosto";
			break;
		case 8:
			mes = "Septiembre";
			break;
		case 9:
			mes = "Octubre";
			break;
		case 10:
			mes = "Noviembre";
			break;
		case 11:
			mes = "Diciembre";
			break;
		default:
			mes = "2020";
	};
	
	if ( dia >= 15 ) {
		dia = dia-15;
	} else {
		dia = dia+15;
	};
	return `Fecha de entrega: ${dia} de ${mes}.`;
};

// MODAL
var modal = function(){
	/*
	$( ".productos li" ).click(function(){
		var imagen = $( this ).find( "img" ).attr( "src" );
		var marca = $( this ).find( ".marca" ).html();
		var modelo = $( this ).find( ".modelo" ).html();
		var color = $( this ).find( ".color" ).html();
		var precio = $( this ).find( ".precio" ).html();
		var talla = $( this ).find( ".talla" ).html();
		for( var i = 0; i <= talla.split( " " ).length-1; i++ ) {
			var tallaActiva = $( this ).find( ".talla" ).html().split( " " )[i];
			$( ".modal-contenido > div > .talla > ul > li[data-talla=talla-" + tallaActiva + "]" ).addClass( "enable" );
		}
		var id = $( this ).find( ".id" ).html().split( "#" )[1];
		$( ".modal-contenido img" ).attr( "src" , imagen );
		$( ".modal-contenido img" ).attr( "alt" , `${marca} ${modelo}` );
		$( ".modal-contenido p.modelo" ).html( `${modelo}` );
		$( ".modal-contenido p.marca" ).html( `${marca}` );
		$( ".modal-contenido p.color" ).html( `${color}` );
		$( ".modal-contenido p.precio" ).html( `${precio}` );
		$( ".modal-contenido p.fechaEntrega" ).html( `${fechaEntrega()}` );
		$( ".modal-contenido p.id" ).html( `#${id}` );
		$( ".modal-contenido a.comprar" ).attr( "href" , `https://api.whatsapp.com/send?phone=56996336330&text=Hola, tengo una duda sobre las ${marca.toUpperCase()} ${modelo} (ID:${id})` );
		$( ".modal-contenido" ).addClass( "mostrar" );
		$( ".modal-fondo" ).show();
		$( ".modal-contenido > div > .talla > ul > li.enable" ).click(function(){
			$( ".modal-contenido > div > .talla > ul > li.enable" ).removeClass( "select" );
			$( this ).addClass( "select" );
			$( ".modal-contenido a.comprar" ).attr( "href" , `https://api.whatsapp.com/send?phone=56996336330&text=Hola, tengo una duda sobre las ${marca} ${modelo} numero ${$( ".modal-contenido > div > .talla > ul > li.select" ).html()} (ID:${id})` );
		});
	});
	
	var cerrarModal = function(){
		$( ".modal-fondo" ).hide();
		$( ".modal-contenido" ).removeClass( "mostrar" );
		$( ".modal-contenido > div > .talla > ul > li.enable" ).removeClass( "select" );
	};
	
	$( ".modal-contenido > .cerrar, .modal-fondo" ).click(function(){
		cerrarModal();
	});
	
	document.onkeydown = function(evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
			isEscape = (evt.key === "Escape" || evt.key === "Esc");
		} else {
			isEscape = (evt.keyCode === 27);
		}
		if (isEscape) {
			cerrarModal();
		}
	};
	*/
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
		if ( stock == "1" ) {
			/*
			$( ".productos ul" ).append( `
			*/
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
	
	// modal();
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