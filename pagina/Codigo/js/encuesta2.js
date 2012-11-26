
function successLogon(data)
{
		$('.gifLoading').hide();
				
			if(data.tipo =="OK")
			{
				
				 window.location = "index.php";
			}
			else{
			
				$('.label-important').text('Ups!! Ocurrio, intentelo mas tarde.');		
				$('.label-important').removeClass('ocultar');
			}
	}
	
function errorLogon()
{
		$('.gifLoading').hide();
		$('.label-important').text('Ups!! Ocurrio, intentelo mas tarde.');		
		$('.label-important').removeClass('ocultar');
}

function successValidarEncuesta(data)
{
	$('#gifLoadingNuevaEncuesta').hide();
	
	if(data.tipo == "OK")
	{
		$('#alertaEncuestas').removeClass('alert-error');
		$('#alertaEncuestas').addClass('alert-success');	
		$('#alertaEncuestas').html("<strong><h2>Nombre Valido</h2></strong> ");	
		$('#alertaEncuestas').removeClass('ocultar');
		
		
		$('#nameNuevaEncuesta').attr('disabled', 'disabled');
		$('#textAreaNuevaEncuesta').attr('disabled', 'disabled');
		$('#validarEncuesta').attr('disabled', 'disabled');
		
		$("#resetDatos").removeAttr('disabled');
		
		$('#resultadoValidacion').val('1');
		
		//inicializarPanelPreguntas();
		
	}
	else
	{
		$('#alertaEncuestas').removeClass('alert-success');
		$('#alertaEncuestas').addClass('alert-error');	
		$('#alertaEncuestas').html("<strong>ERROR !!"+data.desc+"</strong> ");	
		$('#alertaEncuestas').removeClass('ocultar');
		
		$('#resultadoValidacion').val('0');

	}
}

function errorValidarEncuesta(jqXHR, textStatus, errorThrown)
{
	$('#alertaEncuestas').removeClass('alert-success');
	$('#alertaEncuestas').addClass('alert-error');	
	$('#alertaEncuestas').html("<strong>ERROR !!</strong> Intentalo mas tarde.");	
	$('#alertaEncuestas').removeClass('ocultar');
		
	$('#resultadoValidacion').val('0');
}

function successEncuesta(data)
{
	if(data.tipo == "OK"){
	
		// Redirecciono a la pagina de Portada
		
		$('#mensajeFinal').removeClass('alert-error')
		$('#mensajeFinal').addClass("alert-info");
		$('#mensajeFinal').html("<strong><h2>FELICITACIONES!</h2></strong>Preguntas cargadas correctamente.");
		
		$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"Ir a portada": function() 
			{ 
				window.location = "portada.php";
			},
			"Creae nueva encuesta": function()
			{
				window.location = "encuestas.php";
			}
		});

		
	}
	else{
		
		// Le consulto si quiere redireccionar 
		
		$('#mensajeFinal').removeClass('alert-info')
		$('#mensajeFinal').addClass("alert-error");
		$('#mensajeFinal').html("<strong><h2>OCURRIO UN ERROR!</h2></strong>");
		
		$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"Intenar mas tarde": function() { 
											window.location = "portada.php";
										},
			"Volver a intentar": function(){
				$( this ).dialog( "close" ); 
			}
		});
	}

	$("#mensajeFinal" ).dialog( "option", "title", "Resultado de la creación" );
	$('#mensajeFinal').dialog('open');
}

function errorEncuesta(jqXHR, textStatus, errorThrown)
{
	var textToShow="";
	
	if (jqXHR.status === 0) {
		textToShow="<div align='center'><image src='img/rss_alt_32x32.png'/></div><strong><h2>OCURRIO UN ERROR!</h2></strong><p>Al parecer no esta conectado a Internet.</p><p>Verifique su conexion</p>";
	} else {
		textToShow="<div align='center'><image src='img/x_alt_32x32.png'/></div><strong><h2>OCURRIO UN ERROR!</h2></strong><p>Intentelo mas tarde...</p>";
	}

	$('#mensajeFinal').removeClass("alert-info");
	$('#mensajeFinal').addClass("alert-error");
	$('#mensajeFinal').html(textToShow);
	
	$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"OK": function() 
			{ 
				window.location = "encuestas.php";
			}
	});
	
	$("#mensajeFinal" ).dialog( "option", "title", "Resultado de la creación" );
	$('#mensajeFinal').dialog('open');
}

function ajaxSuccessBajaEncuesta(data)
{
	if(data.tipo == "OK"){
	
		// Redirecciono a la pagina de Portada
		
		$('#mensajeFinal').removeClass('alert-error')
		$('#mensajeFinal').addClass("alert-info");
		$('#mensajeFinal').html("<strong><h2>FELICITACIONES!</h2></strong>Encuesta dada de baja correctamente.");
		
		$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"Ir a portada": function() 
			{ 
				window.location = "portada.php";
			},
			"Dar de baja otra encuesta": function()
			{
				window.location = "encuestas.php";
			}
		});

		
	}
	else{
		
		// Le consulto si quiere redireccionar 
		
		$('#mensajeFinal').removeClass('alert-info')
		$('#mensajeFinal').addClass("alert-error");
		$('#mensajeFinal').html("<strong><h2>OCURRIO UN ERROR!</h2></strong>");
		
		$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"Intenar mas tarde": function() { 
											window.location = "portada.php";
										},
			"Volver a intentar": function(){
				$( this ).dialog( "close" ); 
			}
		});
	}

	$("#mensajeFinal" ).dialog( "option", "title", "Resultado de la operación" );
	$('#mensajeFinal').dialog('open');
}

function ajaxErrorBajaEncuesta(jqXHR, textStatus, errorThrown)
{
	var textToShow="";
	
	if (jqXHR.status === 0) {
		textToShow="<div align='center'><image src='img/rss_alt_32x32.png'/></div><strong><h2>OCURRIO UN ERROR!</h2></strong><p>Al parecer no esta conectado a Internet.</p><p>Verifique su conexion</p>";
	} else {
		textToShow="<div align='center'><image src='img/x_alt_32x32.png'/></div><strong><h2>OCURRIO UN ERROR!</h2></strong><p>Intentelo mas tarde...</p>";
	}

	$('#mensajeFinal').removeClass("alert-info");
	$('#mensajeFinal').addClass("alert-error");
	$('#mensajeFinal').html(textToShow);
	
	$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"OK": function() 
			{ 
				window.location = "encuestas.php";
			}
	});
	
	$("#mensajeFinal" ).dialog( "option", "title", "Resultado de la creación" );
	$('#mensajeFinal').dialog('open');
}


function ajaxErrorCargaListaProgramas(jqXHR, textStatus, errorThrown)
{
	var textToShow="";
	
	if (jqXHR.status === 0) {
		textToShow="<div align='center'><image src='img/rss_alt_32x32.png'/></div><strong><h2>OCURRIO UN ERROR!</h2></strong><p>Al parecer no esta conectado a Internet.</p><p>Verifique su conexion</p>";
	} else {
		textToShow="<div align='center'><image src='img/x_alt_32x32.png'/></div><strong><h2>OCURRIO UN ERROR!</h2></strong><p>Intentelo mas tarde...</p>";
	}

	$('#mensajeFinal').removeClass("alert-info");
	$('#mensajeFinal').addClass("alert-error");
	$('#mensajeFinal').html(textToShow);
	
	$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"OK": function() 
			{ 
				window.location = "encuestas.php";
			}
	});
	
	$("#mensajeFinal" ).dialog( "option", "title", "Aviso" );
	$('#mensajeFinal').dialog('open');
}

function validarEncuesta()
{
	$('#validarEncuesta').click(function(){
		
		$('#alertaEncuestas').addClass('ocultar');

		var idPrograma = $('#hdnIdPrograma').val(); 
		
		var nombreNuevaEncuesta = $("#nameNuevaEncuesta").val();
		
		var descNuevaEncuesta = $("#textAreaNuevaEncuesta").val();
		
		if(nombreNuevaEncuesta=="" && descNuevaEncuesta=="")
		{
			$('.control-group').addClass('error');
			$('.help-inline').show();
		}
		else
		{
			if(nombreNuevaEncuesta == "")
			{
				// Alerta
				
				$('#controlNombre .help-inline').show();
				$('#controlNombre').addClass('error');
			}
			else
			{
				if(descNuevaEncuesta == "")
				{
					// Alerta
					
					$('#controlDesc .help-inline').show();
					$('#controlDesc').addClass('error');
					
				}
				else
				{
					$('#gifLoadingNuevaEncuesta').show();
					
					$.getJSON("phpHelper/SmartVoteServices.php?action=4",{id_p:idPrograma,nombre:nombreNuevaEncuesta},successValidarEncuesta).error(errorValidarEncuesta); 
				}
			}
		}	
	});
	
	$('#resetDatos').click(function(){
		
		$("#nameNuevaEncuesta").removeAttr('disabled');
		
		$("#textAreaNuevaEncuesta").removeAttr('disabled');
		
		$("#validarEncuesta").removeAttr('disabled');
		
		$('#resultadoValidacion').val('0');
	});
	
}

function inicializarPanelEncuesta()
{
	$('.foco').focus(function() {
		$('.control-group').removeClass('error');
		$('.help-inline').hide();
	});
	
	$('.help-inline').hide();
	
	$('#alertaEncuestas').addClass('ocultar');
	
	$('.foco').val('');
	
	$("#nameNuevaEncuesta").removeAttr('disabled');
		
	$("#textAreaNuevaEncuesta").removeAttr('disabled');
	
	$("#validarEncuesta").removeAttr('disabled');
	
	$('#resetDatos').attr('disabled','disabled');
	
	$('#resultadoValidacion').val('0');
}

function validarPreguntas()
{
	$('.controls').removeClass('mal');
	
	$('.controlPregunta').removeClass('bad');
	
	$('.controlPregunta').removeClass('error');
	
	$('.controlPregunta .help-inline').hide();
	
	
	
	var arrayPreguntas = $('.pregunta');
	
	var padre;
	
	var abuelo;
	
	var flag = true;
	
	var i = 0;
	
	var vacias = 0;
	
	for(i=0;i<arrayPreguntas.length;i++)
	{
		if(arrayPreguntas[i].value == null || arrayPreguntas[i].value.length == 0)
		{			
			vacias ++;
		}
		
		if(/^\s+$/.test(arrayPreguntas[i].value))
		{
			
			flag = false;
			
			padre = arrayPreguntas[i].parentNode;
		
			padre.className = padre.className + " mal";
			
			abuelo = padre.parentNode;
			
			abuelo.className = abuelo.className + " bad";
		}
	}
	
	// Veo si todas estan vacias //
	
	if(vacias == arrayPreguntas.length)
	{
		$('#alertaPreguntas').removeClass('alert-success');
		$('#alertaPreguntas').addClass('alert-error');	
		$('#alertaPreguntas').html("<strong>Debe poner al menos una pregunta</strong>");	
		$('#alertaPreguntas').removeClass('ocultar');
		
		return false;
	}
	else
	{
		// Veo cual tiene espacios en blanco 
		
		if(!flag)
		{
			$('.controlPregunta').each(function() {
			if ($(this).hasClass("bad")) {
				$(this).addClass('error');
				}
			});
		
			$('.mal .help-inline').show();
		}
		
		return flag;
	}
	
	return 'vacias';	
}

function inicializarPanelPreguntas()
{
	$('.pregunta').val('');
	
	$('#alertaPreguntas').addClass('ocultar');
	
	$('.pregunta').focus(function() {
		$('.control-group').removeClass('error');
		$('.help-inline').hide();
		$('#alertaPreguntas').addClass('ocultar');
	});
}

function formarDatos()
{
	var arrayPreguntas = $('.pregunta');
	
	var cadena="";
	
	var auxCadena="";
	
	var auxArray = new Array();
	
	for(var i=0; i<arrayPreguntas.length;i++)
	{
		if(arrayPreguntas[i].value == null || arrayPreguntas[i].value.length == 0 || /^\s+$/.test(arrayPreguntas[i].value))
		{
			
		}
		else
		{	
			auxCadena = "";
			
			auxCadena = auxCadena + arrayPreguntas[i].name;
		
			auxCadena = auxCadena + "-";
		
			auxCadena = auxCadena + arrayPreguntas[i].value;
		
			auxArray.push(auxCadena);
		}	
	}
	
	for(var e = 0; e < auxArray.length;e++)
	{
		
		if(auxArray.length == 1)
		{
			cadena = cadena + auxArray[e];
		}
		else
		{
			if(e == 0)
			{
				cadena = cadena + auxArray[e];
			}
			else
			{
				cadena = cadena +";"+ auxArray[e];
			}
		}
		
	}
	
	return cadena;
}


function llenaListaEncuestas()
{

	$('#gifLoading').show();
	
	$('#bajaEncuesta').attr('disabled','disabled');
	
	$('#listaEncuesta').attr('disabled','disabled');
	
	var idPrograma = $('#hdnIdPrograma').val(); 
	
	$.getJSON('phpHelper/SmartVoteServices.php?action=2&paged=0&activos=true&id_p='+idPrograma, function(data) {
		  
			$('#gifLoading').hide();

			$('#listaEncuesta').removeAttr('disabled','disabled');
			
			var nuevoObjeto;
			var ddData = new Array();
			
			if(data.encuestas.length > 0)
			{
				for(var i=0;i<data.encuestas.length;i++)
				{
					
					nuevoObjeto = { text:data.encuestas[i].nombre,
									value:data.encuestas[i].id,
									}
					
					ddData[i] = nuevoObjeto;
				}
			 
			 	$('#listaEncuesta').ddslick('destroy');
			 	
			 	$('#listaEncuesta').ddslick({
				    data:ddData,
				    width:230,
				    selectText: "Seleccione una encuesta",
				    onSelected: function(selectedData){
							$('#bajaEncuesta').removeAttr('disabled','disabled');
							$('#alertaBajaEncuesta').addClass('ocultar');
				    }    
				});
			}
			else
			{
				// Alerta que ya no hay mas encuestas
				
				$('#alertaPreguntas').addClass('alert-error');	
				$('#alertaBajaEncuesta').html("<strong>No hay encuestas.</strong>");	
				$('#alertaBajaEncuesta').removeClass('ocultar');
					
			}	 
	});
	
}

function inicializarPanelBajaEncuesta()
{
	$('#gifLoading').show();
	
	$('#alertaBajaEncuesta').addClass('ocultar');

	$('#listaPrograma_BajaEncusta').attr('disabled','disabled');
	
	$('#bajaEncuesta').attr('disabled','disabled');
	
	$('#listaEncuesta').ddslick('destroy');
	
	$.getJSON('phpHelper/SmartVoteServices.php?action=1&paged=0',successListaPrograma_BajaEncuesta);
	
	
	
	
	
	// CLick del Boton Baja Encuesta//
	
	$('#bajaEncuesta').click(function(){
		
		var ddData = $('#listaEncuesta').data('ddslick');
		
		var idEncuesta = ddData.selectedData.value; 
		
		// Muetro cartel de Procesando //
		
		var textToShow="<div align='center'><img src='img/ajax-loaderBlanco.gif' alt='Loading...'/></div>";
		$('#mensajeFinal').html(textToShow);
		$("#mensajeFinal" ).dialog( "option", "title", "Procesando");
		$('#mensajeFinal').dialog('open');
		
		$.post("phpHelper/SmartVoteServices.php",{tipo:'baja',de:'encuesta',id_e: idEncuesta},ajaxSuccessBajaEncuesta,'json').error(ajaxErrorBajaEncuesta);

	});
}

function successListaPrograma_BajaEncuesta(data)
{
		  
		$('#gifLoading').hide();

		$('#listaPrograma_BajaEncusta').removeAttr('disabled','disabled');
		
		var nuevoObjeto;
		var ddData = new Array();
		
		if(data.programas.length > 0)
		{
			for(var i=0;i<data.programas.length;i++)
			{
				
				nuevoObjeto = { text:data.programas[i].nombre,
								value:data.programas[i].id,
								}
				
				ddData[i] = nuevoObjeto;
			}
		 
		 	$('#listaPrograma_BajaEncusta').ddslick('destroy');
		 	
		 	$('#listaPrograma_BajaEncusta').ddslick({
			    data:ddData,
			    width:230,
			    selectText: "Seleccione un programa",
			    onSelected: function(selectedData)
			    {
					var idPrograma = selectedData.selectedData.value;
					
					$('#hdnIdPrograma').val(idPrograma); 
					
					$('#listaEncuesta').ddslick('destroy');
					
					llenaListaEncuestas();
			    }    
			});
		}
		else
		{
			// Alerta que ya no hay mas encuestas
			
			$('#alertaPreguntas').addClass('alert-error');	
			$('#alertaBajaEncuesta').html("<strong>No hay encuestas activas para este programa.</strong>");	
			$('#alertaBajaEncuesta').removeClass('ocultar');
				
		}	 
}

function successListaPrograma_AltaEncuesta(data)
{
		//$('#gifLoading').hide();

		$('#listaPrograma').removeAttr('disabled','disabled');
		
		var nuevoObjeto;
		var ddData = new Array();
		
		if(data.programas.length > 0)
		{
			for(var i=0;i<data.programas.length;i++)
			{
				
				nuevoObjeto = { text:data.programas[i].nombre,
								value:data.programas[i].id,
								}
				
				ddData[i] = nuevoObjeto;
			}
		 
		 	$('#listaPrograma').ddslick('destroy');
		 	
		 	$('#listaPrograma').ddslick({
			    data:ddData,
			    width:230,
			    selectText: "Seleccione un programa",
			    onSelected: function(selectedData)
			    {
					var idPrograma = selectedData.selectedData.value;
					
					$('#hdnIdPrograma').val(idPrograma); 
					
					$('#seleccionPrograma').val('1');
					
					inicializarPanelEncuesta();
			    }    
			});
		} 
}

function inicializarPanelProgramas()
{

	//$('#listaPrograma').attr('disabled','disabled');
	
	$('#hdnIdPrograma').val('');
	
	$('#listaPrograma').html('<img src="img/gifBarrasLoading.gif" alt="Loading..."/>');
	
	$.getJSON('phpHelper/SmartVoteServices.php?action=1&paged=0&activos=true',successListaPrograma_AltaEncuesta).error(ajaxErrorCargaListaProgramas);
}

$(function() {
	
	// Boton Log on 
	
	$('#btnLogOn').click(function(){

		$('.gifLoading').show();

		$.post("phpHelper/nologin.php",successLogon, "json").error(errorLogon);
		
	}); // fin click log on 
	
	// Dialog Mensaje Final 

	$('#mensajeFinal').dialog({
		autoOpen: false,
		width: 400,
		modal: true,
		title: "Procesando"
	});
	
	$('.foco').focus(function() {
		$('.control-group').removeClass('error');
		$('.help-inline').hide();
	});
	
	
	// Panel Alta Encuesta 
	
	// Pestaña: Programas 
	
	inicializarPanelProgramas();
	
	validarEncuesta();
	
	// Logica de Validacion 
	
	// Selecciona el programa y luego pasa a la otra pestaña 
	
	$('#myTabDos a[href="#partePrograma"]').click(function (e) 
		{
   			$('#hdnIdPrograma').val(''); 
	});
		
	$('#myTabDos a[href="#parteEncuesta"]').click(function (e) 
		{
   			var programa = $('#hdnIdPrograma').val(); 
  			
  			if(programa != "")
  			{
  				// Panel Nueva Encuesta
	
				inicializarPanelEncuesta();
				
  			}
  			else
  			{
  				return false;
  			}	
	});
	
	$('#myTabDos a[href="#partePregunta"]').click(function (e) 
		{
   			var validacionEncuesta = $('#resultadoValidacion').val(); 
  			
  			if(validacionEncuesta > 0)
  			{
  				inicializarPanelPreguntas();
  				return true; 
  			}
  			else
  			{
  				return false;
  			}	
	});
	
	
	// Boton Creacion Encuesta //
	
	$('#crearEncuesta').click(function(){
		
		// Veo si el panel anterior esta completo 
		
		var panelUno = $('#resultadoValidacion').val();
		
		if(panelUno == 0)
		{
			$('#alertaPreguntas').removeClass('alert-success');
			$('#alertaPreguntas').addClass('alert-error');	
			$('#alertaPreguntas').html("<strong>El Panel anterior no esta completo.</strong>");	
			$('#alertaPreguntas').removeClass('ocultar');
		}
		else
		{
			var validacion = validarPreguntas();
			
			if(validacion)
			{
				// Inserto
				
				var arrayPreguntasDatos = formarDatos();
				
				var textToShow="<div align='center'><img id='gifLoadingPreguntas2'src='img/ajax-loaderBlanco.gif' alt='Loading...'/></div>";
				$('#mensajeFinal').html(textToShow);
				$("#mensajeFinal" ).dialog( "option", "title", "Procesando");
				$('#mensajeFinal').dialog('open');
				
				var idPrograma = $('#hdnIdPrograma').val(); 
	
				var nombreNuevaEncuesta = $("#nameNuevaEncuesta").val();
			
				var descNuevaEncuesta = $("#textAreaNuevaEncuesta").val();

				$.post("phpHelper/SmartVoteServices.php",{ tipo:'encuesta',nombreE: nombreNuevaEncuesta, descE:descNuevaEncuesta, id_p: idPrograma,Arr_preguntas: arrayPreguntasDatos}, successEncuesta, "json").error(errorEncuesta);

			}
		}
		
	});	
	
	
	// Panel Baja de Encuestas //
	
	$('#myTab a[href="#panelBajaEncuesta"]').click(function (e) 
		{
  
  			inicializarPanelBajaEncuesta();

		});

});