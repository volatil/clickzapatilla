
//- Capitalize()
const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}

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

// Calcula Fecha de Entrega
var fechaEntrega = function(){
	var fecha   = new Date();
	var dia     = fecha.getDate();
	var mes     = fecha.getMonth();
	
	if ( dia >= 15 ) {
		dia = dia-15;
		mes = mes+1;
	} else {
		dia = dia+15;
	};
	
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
	
	return `Fecha de entrega: ${dia} de ${mes}.`;
};

// CONTADOR DE RESULTADOS
var cuentaProductos = function( donde ){
	var cantidadResultados = $( '.productos li:visible' ).length;
	if ( cantidadResultados >= 2 ) {
		$( donde ).html( "<strong>" + cantidadResultados + "</strong> Resultados" );
	} else if ( cantidadResultados == 1 ) {
		$( donde ).html( "<strong>" + cantidadResultados + "</strong> Resultado" );
	} else {
		$( donde ).html( "No se encontrarón resultados" );
	};
}; 

// BUSCADOR
var buscar = function( valor ){
	if( valor == "todo" ) {
		$( ".productos li" ).removeClass( "hide" );
		$( ".productos li" ).removeClass( "show" );
		$( ".buscador .filtros > ul > li" ).removeClass( "activo" );
	} else {
		$.each( $( ".productos li" ) , function(){
			if ( valor.length <= 1 ) {
				$( ".productos li" ).removeClass( "hide" );
				$( ".productos li" ).removeClass( "show" );
			} else if ( $( this ).attr( "data-zapatilla" ).indexOf( valor ) >= 0 ){
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

// FILTRO TALLA
var filtrarPorTalla = function( tallaBuscada ) {
	
	$.each( $( ".productos > ul li" ) , function(){
	
		var tallas  = $( this ).attr( "data-talla" );
		
		if ( tallaBuscada == "todas" ) {
			$( ".productos > ul li" ).show();
		} else if ( tallas.includes( tallaBuscada ) ) {
			$( this ).show();
		} else {
			$( this ).hide();
		};
		
	})
	
};

// ENLISTA COLORES
var listaColor = function( selectColor , padre ){
					
	var colorTodos  = "";
	for( var cuentaColor = 0; cuentaColor <= selectColor.split( " " ).length-1; cuentaColor++ ) {
		
		switch( selectColor.split( " " ).length ) {
			case 1:
				var cantidadColores = "somos1";
				break;
			case 2:
				var cantidadColores = "somos2";
				break;
			case 3:
				var cantidadColores = "somos3";
				break;
			case 4:
				var cantidadColores = "somos4";
				break;
			case 5:
				var cantidadColores = "somos5";
				break;
			case 6:
				var cantidadColores = "somos6";
				break;
			default:
				var cantidadColores = "somosVarios";
		}
		
		let colorsete = selectColor.split( " " )[cuentaColor];
		switch( colorsete ) {
			case "negro":
				colorTodos += `<span style="background:black"></span>`;
				break;
			case "amarillo":
				colorTodos += `<span style="background:yellow"></span>`;
				break;
			case "rojo":
				colorTodos += `<span style="background:red"></span>`;
				break;
			case "blanco":
				colorTodos += `<span style="background:white"></span>`;
				break;
			case "rosado":
				colorTodos += `<span style="background:#fe89b2"></span>`;
				break;
			case "celeste":
				colorTodos += `<span style="background:#7fddf9"></span>`;
				break;
			case "naranjo":
				colorTodos += `<span style="background:#ff5a00"></span>`;
				break;
			case "menta":
				colorTodos += `<span style="background:#91c2a5"></span>`;
				break;
			case "morado":
				colorTodos += `<span style="background:#8e6f9e"></span>`;
				break;
			case "verde":
				colorTodos += `<span style="background:#77ca45"></span>`;
				break;
			case "fluor":
				colorTodos += `<span style="background:#00ef80"></span>`;
				break;
			case "burdeo":
				colorTodos += `<span style="background:#8c3750"></span>`;
				break;
			case "cafe":
				colorTodos += `<span style="background:brown"></span>`;
				break;
			case "gris":
				colorTodos += `<span style="background:#d4d4d4"></span>`;
				break;
			case "dorado":
				colorTodos += `<span style="background:#c39f77"></span>`;
				break;
			case "azul":
				colorTodos += `<span style="background:#4660cf"></span>`;
				break;
			case "arcoiris":
				colorTodos += `<span style="background: red;background: -webkit-linear-gradient(left, orange , yellow, green, cyan, blue, violet);background: -o-linear-gradient(right, orange, yellow, green, cyan, blue, violet);background: -moz-linear-gradient(right, orange, yellow, green, cyan, blue, violet);background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);"></span>`;
				break;
			case "transparente":
				colorTodos += `<span style="background:#eef8fb"></span>`;
				break;
			case "cyan":
				colorTodos += `<span style="background:cyan"></span>`;
				break;
			case "vainilla":
				colorTodos += `<span style="background:#f1da8a"></span>`;
				break;
			case "durazno":
				colorTodos += `<span style="background:#f9ccaf"></span>`;
				break;
			default:
				console.log( `NaaaN [${colorsete}]` );
				colorTodos += `<span class="nan">?</span>`;
		};
		
		if( cuentaColor == selectColor.split( " " ).length-1 ) {
			$( padre ).addClass( cantidadColores );
			return `${colorTodos}`;
		}
		
	}

}

// GET PRODUCTO BY ID
var getProdByID = function( owo , donde ) {
	owo = owo-1
	
	Promise.all([
		fetch( `https://spreadsheets.google.com/feeds/list/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/1/public/values?alt=json` ).then(value => value.json())
	])
	.then((value) => {
		
		var data			= value[0].feed.entry
		var id              = data[owo].gsx$id.$t;
		var stock		    = data[owo].gsx$stock.$t;
		var marca		    = data[owo].gsx$marca.$t;
		var modelo		    = data[owo].gsx$modelo.$t;
		var imagen		    = data[owo].gsx$imagen.$t;
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
		var preciocliente   = Number( data[owo].gsx$precioneto.$t ) + 15000;
		
		// Agrega PRODUCTOS
		if ( stock == 1 ) {
			$( `${donde}` ).append( `
				<li data-id="${id}">
					<a href="/detalle.html?id=${id}" title="${marca} ${modelo}">
						<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo}" /> 
						<span class="modelo">${modelo}</span>
						<span class="marca">${marca}</span>
						<span class="precio">${puntuacion(preciocliente)}</span>
					</a>
				</li>
			` );
		};
	});	
};