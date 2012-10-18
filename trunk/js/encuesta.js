
// .js para el control de la pagina encuesta.php 

$(document).ready(function() {
				
/* FUNCIONES */

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

function funcionError(jqXHR, textStatus, errorThrown)
{
	$('#gifLoadingNewItem').hide();
						
	var textToShow="<strong>Error!</strong>";
	
	if (jqXHR.status === 0) {
		textToShow=textToShow + '\n Not connect.\n Verify Network.';
	} else if (jqXHR.status == 404) {
		textToShow=textToShow+'\n Requested page not found. [404]';
	} else if (jqXHR.status == 500) {
		textToShow=textToShow+'\n Internal Server Error [500].';
	} else if (textStatus === 'parsererror') {
		textToShow=textToShow+'\n Requested JSON parse failed.';
	} else if (textStatus === 'timeout') {
		textToShow=textToShow+'\n Time out error.';
	} else if (textStatus === 'abort') {
		textToShow=textToShow+'\n Ajax request aborted.';
	} else {
		textToShow=textToShow+'\n Uncaught Error.\n' + jqXHR.responseText;
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
  $("#panelPreguntas2").addClass("ocultar");
  $("#panelPreguntas3").addClass("ocultar");
  $("#tituloPanelPreguntas").addClass("ocultar");
  
  $('.pregunta').val('');
	
}

function mostrarPanelesPreguntas()
{
	$("#panelPreguntas").removeClass("ocultar");
	$("#panelPreguntas2").removeClass("ocultar");
	$("#panelPreguntas3").removeClass("ocultar");
	$("#tituloPanelPreguntas").removeClass("ocultar");
	
	$('.pregunta').val('');
}

function validarPreguntas()
{
	var arrayPreguntas = $('.pregunta');
	
	
	var i = 0;
	var flag = true;
	
	while (i< arrayPreguntas.length && flag==true)
	{
		if(arrayPreguntas[i].value == "")
			flag=false;
		i++;
	}
	
	if(flag)
		return true;
	else
		return false;
}
				
function successEncuesta(data)
{
	$('#gifLoadingPreguntas').hide();
	
	if(data.tipo == "OK"){
	
		$('#alertaPreguntas').addClass("alert-info");
		$('#alertaPreguntas').html("<strong>FELICITACIONES!</strong><br><i class='icon-thumbs-up'></i><p>Las preguntas fueron cargadas correctamente.</p>");
		$('#alertaPreguntas').removeClass("ocultar");
	}
	else{
		
		$('#alertaPreguntas').addClass("alert-error");
		$('#alertaPreguntas').html("<strong>OCURRIO UN ERROR!</strong><br><i class='icon-thumbs-down'></i><p>Intentelo mas tarde...</p>");
		$('#alertaPreguntas').removeClass("ocultar");
	
	}

}

function errorEncuesta(jqXHR, textStatus, errorThrown)
{
	$('#gifLoadingPreguntas').hide();
	
	var textToShow="<strong>OCURRIO UN ERROR!</strong>";
	
	if (jqXHR.status === 0) {
		textToShow=textToShow + "<br><i class='icon-thumbs-down'></i><p>Al parecer no esta conectado a Internet.</p><p>Verifique su conexion</p>";
	} else {
		textToShow=textToShow + "<br><i class='icon-thumbs-down'></i><p>Intentelo mas tarde...</p>";
	}

	$('#alertaPreguntas').addClass("alert-error");
	$('#alertaPreguntas').html(textToShow);
	$('#alertaPreguntas').removeClass("ocultar");
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
		
	$( "#btnOkNewItem").button();
	
	// Dialog
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
	
	
	
	// Boton Log on 
	
	$('#btnLogOn').click(function(){

		$('.gifLoading').show();

		$.post("nologin.php",function(data){ 
		
			$('.gifLoading').hide();
				
			if(data.respuesta =="OK")
			{
				// Redirecciono a la pagina de portada 
				
				 window.location = "index.php";
			}
			else{
				alert("error de log in");
			}
		}, "json").error(function() { alert("error"); });
		
	}); // fin click log on 

	

    // Click boton Crear nuevas preguntas para encuesta
	
    $('#crear').click(function(){
	
		$('#alertaPreguntas').addClass("ocultar");
		
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

			$.post("phpHelper/SmartVoteServices.php",{ tipo:'encuesta',nombreE: nombreNuevaEncuesta, descE:descNuevaEncuesta, id_p: idPrograma,Arr_preguntas: arrayPreguntasDatos}, successEncuesta, "json").error(errorEncuesta);
			
		}
		else
		{
			// Muestro alertas 
			
			$('#alertaPreguntas').addClass("alert-error");
			$('#alertaPreguntas').html("<strong>OOOHH !!!</strong><br><i class='icon-warning-sign'></i><p>Al parecer te falta completar algun campo..</p>");
			$('#alertaPreguntas').removeClass("ocultar");
			
		}
		
		
	
	});
	
}); // Fin ready 