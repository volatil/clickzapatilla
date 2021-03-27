
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