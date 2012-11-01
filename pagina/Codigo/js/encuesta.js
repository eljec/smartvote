
// .js para el control de la pagina encuesta.php 

$(document).ready(function() {
				
/* FUNCIONES MANEJO AJAXS */

function funcionError(jqXHR, textStatus, errorThrown)
{
	$('#gifLoadingNewItem').hide();
						
	var textToShow="<strong>Error!</strong>";
	
	if (jqXHR.status === 0) {
		textToShow=textToShow + '\n Verifique su conexión a Internet.';
	} 

	textToShow= textToShow + "\t Intentelo mas tarde.Gracias.";
	
	showAlert("error",textToShow);
}	

function successProgram(data)
{
	$('#gifLoadingNewItem').hide();
	
	switch(data.tipo)
	{
		case "OK":	

			llenaListaProgramas();	
			
			$('#dialogNewItem').dialog('close');
		break;
		case "ERROR":
			if(data.desc == "REPETIDO")
			{
				showAlert("error","<strong>Ya existe un registro con estos valores!</strong><br><i class='icon-thumbs-down'></i>");
		break;
			}
			else
			{
				showAlert("error","<strong>OCURRIO UN ERROR!</strong><br><i class='icon-warning-sign'></i><p>Intentelo mas tarde...</p>");
			}
	}
}

function successEncuesta(data)
{
	$('#gifLoadingPreguntas').hide();
	
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

	$('#mensajeFinal').dialog('open');
}

function errorEncuesta(jqXHR, textStatus, errorThrown)
{
	$('#gifLoadingPreguntas').hide();
	
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
				window.location = "portada.php";
			}
	});
	
	$('#mensajeFinal').dialog('open');
}

function successValidarEncuesta(data)
{
	$('#gifLoadingNuevaEncuesta').hide();
	
	if(data.tipo == "OK")
	{
		$('#alertaEncuestas').removeClass('alert-error');
		$('#alertaEncuestas').addClass('alert-success');	
		$('#alertaEncuestas').html("<strong>OK!!</strong> Nombre Valido..");	
		$('#alertaEncuestas').removeClass('ocultar');
		
		mostrarPanelesPreguntas();
	}
	else
	{
		$('#alertaEncuestas').removeClass('alert-success');
		$('#alertaEncuestas').addClass('alert-error');	
		$('#alertaEncuestas').html("<strong>ERROR !!</strong> "+data.desc);	
		$('#alertaEncuestas').removeClass('ocultar');
		
		ocultarPanelesPreguntas();
	}
}

function errorValidarEncuesta(jqXHR, textStatus, errorThrown)
{
	$('#alertaEncuestas').removeClass('alert-success');
	$('#alertaEncuestas').addClass('alert-error');	
	$('#alertaEncuestas').html("<strong>ERROR !!</strong> Intentalo mas tarde.");	
	$('#alertaEncuestas').removeClass('ocultar');
		
		ocultarPanelesPreguntas();
}

function successLogon(data)
{
		$('.gifLoading').hide();
				
			if(data.tipo =="OK")
			{
				// Redirecciono a la pagina de portada 
				
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

	
/* OTRAS FUNCIONES */

function inicializarDialog(titulo)
{
	$('.claseNewEncuesta').click(function(){
	
		
		$('#alertNewItem').addClass("ocultar");
		
		/* Limpio los valores */
		
		$('#name').val('');
		$('#textAreaNI').val('');
		
		// Cargo valores al Hidden 
		
		$('#itemToInsert').attr("name","encuesta");
		
		var idp = $("#listaProgramas option:selected").val();
		
		$('#itemToInsert').val(idp)
		
		$("#dialogNewItem").dialog( "option", "title","Nueva Encuesta");
		
		$('#dialogNewItem').dialog('open');
		
		return false;
	});
}

function showAlert(type,text)
{
	if(type=="error")
	{
		$('#alertNewItem').addClass('alert-error');		
	}
	else
	{
		$('#alertNewItem').removeClass('alert-error');
	}
	$('#alertNewItem').html(text);
	$('#alertNewItem').removeClass('ocultar');	
}
	
function llenaListaProgramas()
{

	$('#gifLoading').show();
	
	$.getJSON('phpHelper/SmartVoteServices.php?action=1&paged=0', function(data) {
		  
			$('#gifLoading').hide();
			
			var stringSelect="<option value='0' selected='selected'> Seleccione..</option>";
		  
			for(var i=0;i<data.programas.length;i++)
			{
				stringSelect = stringSelect + "<option value='"+data.programas[i].id+"'>"+data.programas[i].nombre+"</option>";
			}
		 
			document.getElementById("listaProgramas").innerHTML=stringSelect;
		 
	});
}
				
function ocultarPanelesPreguntas()
{
	$("#panelPreguntas").addClass("ocultar");
	
	$("#panelPreguntas3").addClass("ocultar");
	
	$("#tituloPanelPreguntas").addClass("ocultar");
	  
	$('.pregunta').val('');
	  
	$('.controls').removeClass('mal');
	
	$('.controlPregunta').removeClass('bad');
	
	$('.controlPregunta').removeClass('error');
	
	$('.controlPregunta .help-inline').hide();
	
	
}

function mostrarPanelesPreguntas()
{
	$("#panelPreguntas").removeClass("ocultar");
	$("#panelPreguntas3").removeClass("ocultar");
	$("#tituloPanelPreguntas").removeClass("ocultar");
	
	$('.pregunta').val('');
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
	
	for(i=0;i<arrayPreguntas.length;i++)
	{
		if(arrayPreguntas[i].value == null || arrayPreguntas[i].value.length == 0 || /^\s+$/.test(arrayPreguntas[i].value))
		{
			flag = false;
			
			padre = arrayPreguntas[i].parentNode;
			
			padre.className = padre.className + " mal";
			
			abuelo = padre.parentNode;
			
			abuelo.className = abuelo.className + " bad";
		}
	}
	
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
				
function formarDatos()
{
	var arrayPreguntas = $('.pregunta');
	
	var cadena="";
	
	for(var i=0; i<arrayPreguntas.length;i++)
	{
		cadena = cadena + arrayPreguntas[i].name;
		
		cadena = cadena + "-";
		
		cadena = cadena + arrayPreguntas[i].value;
		
		if( i != arrayPreguntas.length-1)
			cadena = cadena + ";"; 
	}
	
	return cadena;
}

function ocultarPanelEncuesta()
{
	$("#validarEncuesta").attr('disabled','disabled');
	$("#nameNuevaEncuesta").attr('disabled','disabled');
	$("#textAreaNuevaEncuesta").attr('disabled','disabled');
	$('#alertaEncuestas').addClass("ocultar");
	
	$("#nameNuevaEncuesta").val('');
	$("#textAreaNuevaEncuesta").val('');
	
	$('.control-group').removeClass('error');
	$('.help-inline').hide();
}

function activarPanelEncuesta()
{
	$("#validarEncuesta").removeAttr('disabled','disabled');
	$("#nameNuevaEncuesta").removeAttr('disabled','disabled');
	$("#textAreaNuevaEncuesta").removeAttr('disabled','disabled');
	
	$("#nameNuevaEncuesta").val('');
	$("#textAreaNuevaEncuesta").val('');
	
	$('#alertaEncuestas').addClass('ocultar');
	
	$('.control-group').removeClass('error');
	$('.help-inline').hide();
}

// ---------------------------- MAIN ----------------------------------------------------------------------------------------- //
				
	llenaListaProgramas();
	
	// Oculto Paneles Encuesta y Preguntas 
	
	ocultarPanelesPreguntas();
	ocultarPanelEncuesta();
	
	$('.label-important').addClass('ocultar');
	
	$( "#btnOkNewItem").button();
	
	// Dialog Nuevo programa
	
	$('#dialogNewItem').dialog({
		autoOpen: false,
		width: 400,
		modal: true,
		title: "Nada",
		buttons: {						
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});
	
	$('.foco').focus(function() {
		$('.control-group').removeClass('error');
		$('.help-inline').hide();
	});
	
	$('.help-inline').hide();


	// Dialog Mensaje Final 

	$('#mensajeFinal').dialog({
		autoOpen: false,
		width: 400,
		modal: true,
		title: "Resultado creación",
		buttons: {						
			"OK": function() {
				//$(this).dialog("close");
				window.location = "portada.php";
			}
			
		}
	});
	
	$('.foco').focus(function() {
		$('.control-group').removeClass('error');
		$('.help-inline').hide();
	});
	
	
	// Dialog Boton nuevo programa
	
	$('#newPrograma').click(function(){
	
		$('#alertNewItem').addClass("ocultar");
		
		/* Limpio los valores */
		
		$('#name').val('');
		
		$('#textAreaNI').val('');
		
		$("#dialogNewItem").dialog( "option", "title","Nuevo Programa");
		
		$('#dialogNewItem').dialog('open');
		
		return false;
	});
	
	
	// Boton de nuevo programa..
	
	$('#btnOkNewItem').click(function(){

		$('#alertaProgramas').addClass("ocultar");
		
		$('#gifLoadingNewItem').show();
		
		var nameValue =$('#name').val();
		var textAreaValue =$('#textAreaNI').val();
		
		if(nameValue =='')
		{
			showAlert("warning","<strong>Warning!</strong>  Faltan datos.....");
			
			$('#gifLoadingNewItem').hide();
		}
		else
		{
			if(textAreaValue =='')
			{
				showAlert("warning","<strong>Warning!</strong>  Faltan datos.....");
				
				$('#gifLoadingNewItem').hide();
			}
			else
			{
				$.post("phpHelper/SmartVoteServices.php",{ tipo:'programa',nombre: nameValue, desc:textAreaValue }, successProgram, "json").error(funcionError);
			}
				
		}
		
	}); // fin click boton nuevo elelento
	
	
	
	
	// Cambio en el combo de programas...
	
	$('#listaProgramas').change(function(){
	
		$('#alertaProgramas').addClass("ocultar");
		
		var op = $("#listaProgramas option:selected").val();
		
		if(op==0)
		{
			$('#gifLoading').hide();
			$('#alertaProgramas').html("<strong>Warning!</strong>  Falta seleccionar un programa...");
			$('#alertaProgramas').removeClass('ocultar');
			
			ocultarPanelEncuesta();
			
			
		}
		else
		{
			activarPanelEncuesta();
		}
		
		ocultarPanelesPreguntas();
	});	

	
	
	// Boton Validar Encuesta 
	
	$('#validarEncuesta').click(function(){
		
		$('#alertaEncuestas').addClass('ocultar');

		var idPrograma = $("#listaProgramas option:selected").val();
		
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
				
				ocultarPanelesPreguntas();
			}
			else
			{
				if(descNuevaEncuesta == "")
				{
					// Alerta
					
					$('#controlDesc .help-inline').show();
					$('#controlDesc').addClass('error');
					
					ocultarPanelesPreguntas();
				}
				else
				{
					$('#gifLoadingNuevaEncuesta').show();
					
					$.getJSON("phpHelper/SmartVoteServices.php?action=4",{id_p:idPrograma,nombre:nombreNuevaEncuesta},successValidarEncuesta).error(errorValidarEncuesta); 
				}
			}
		}	
	});
	
	
	
	// Boton Log on 
	
	$('#btnLogOn').click(function(){

		$('.gifLoading').show();

		$.post("phpHelper/nologin.php",successLogon, "json").error(errorLogon);
		
	}); // fin click log on 

	

    // Click boton Crear nuevas preguntas para encuesta
	
    $('#crear').click(function(){
	
		var resultadoValidacion = validarPreguntas();
		
		if(resultadoValidacion)
		{
			// Guardo las preguntas 
			
			$('#itemToInsert').attr("name","pregunta");
		
			var arrayPreguntasDatos = formarDatos();
			
			$('#gifLoadingPreguntas').show();
			
			var idEncuesta = $("#listaEncuestas option:selected").val();
			
			var idPrograma = $("#listaProgramas option:selected").val();
			
			var nombreNuevaEncuesta = $("#nameNuevaEncuesta").val();
		
			var descNuevaEncuesta = $("#textAreaNuevaEncuesta").val();
			
			// Creo encuesta y Pregunta Juntas 

			$.post("phpHelper/1SmartVoteServices.php",{ tipo:'encuesta',nombreE: nombreNuevaEncuesta, descE:descNuevaEncuesta, id_p: idPrograma,Arr_preguntas: arrayPreguntasDatos}, successEncuesta, "json").error(errorEncuesta);
			
		}
	});
	
}); // Fin ready 