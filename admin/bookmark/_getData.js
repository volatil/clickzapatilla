var mayus = (s) => { 
	if (typeof s !== 'string') { 
		return '' 
	} else { 
		return s.charAt(0).toUpperCase() + s.slice(1) 
	} 
}; 
var zapatilla = { 
	"marca"             : $( ".getDetalle > div > p.marca" ).html() , 
	"modelo": $( ".getDetalle > div > p.modelo" ).html() , 
	"precio": $( ".getDetalle > div > p.precio" ).html() , 
	"link"              : location.origin , 
	"marca_hashtag": $( ".getDetalle > div > p.marca" ).html().replaceAll( " " , "" ) , 
	"modelo_hashtag": $( ".getDetalle > div > p.modelo" ).html().replaceAll( " " , "" ) , 
}; 

var tallas = "";
$.each( $( ".talla ul li.enable" ) , function(){
	tallas += $( this ).html() + " ";
});

var template = "\n"; 
template += `${mayus(zapatilla.marca)} - ${mayus(zapatilla.modelo)} 👟`; 
template += `\n`; 
template += `${zapatilla.precio}.`; 
template += `\n`; 
template += `Tallas: ${tallas}`; 
template += `\n `; 
template += `\n `; 
template += `*Revisa disponibilidad de tallas y colores en ${zapatilla.link}`; 
template += `\n`; 
template += `\n`; 
template += `#zapatilla #zapatillas #moda #estilo #outfit #sneakers #outfitoftheday #importados #nike #adidas #streetwear #tendencias #replica #replicaaaa #${zapatilla.marca_hashtag} #${zapatilla.modelo_hashtag} `; 
$( "body" ).prepend( `
	<div style="margin: 50px auto;">
		<textarea id="codigoListo" style="height: 105px;width: 420px;display: block;margin: 0 auto;">${template}</textarea>
		<button id="copiarCodigo" onclick="myFunction()" style="cursor:pointer;background: #7fddf9;border: 1px solid black;padding: 5px 15px;margin: 10px auto 0;width: 80px;display: block;">Copiar</button>
	</div>
	<script type="text/javascript"> document.querySelector("#copiarCodigo").onclick=function(){ document.querySelector("#codigoListo").select(), document.execCommand("copy") } </script> 
` );
