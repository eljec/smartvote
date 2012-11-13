
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


function successUsuario(data)
{
	if(data.tipo == "OK")
	{
		
		// Muestro aviso de creación 
		
		$('#mensajeFinal').removeClass('alert-error')
		$('#mensajeFinal').addClass("alert-info");
		$('#mensajeFinal').html("<strong><h2>FELICITACIONES!</h2></strong>Usuario creado correctamente.");
		
		$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"Ir a portada": function() 
			{ 
				window.location = "adminportada.php";
			},
			"Creae Nuevo Usuario": function()
			{
				window.location = "administracionusuario.php";
			}
		});
		
	}
	else
	{
		$('#mensajeFinal').removeClass('alert-info')
		$('#mensajeFinal').addClass("alert-error");
		$('#mensajeFinal').html("<strong><h2>OCURRIO UN ERROR!</h2></strong>");
		
		$( "#mensajeFinal" ).dialog( "option", "buttons", 
		{ 
			"Intenar mas tarde": function() { 
											window.location = "adminportada.php";
										},
			"Volver a intentar": function(){
				$( this ).dialog( "close" ); 
			}
		});
	}
	
	$("#mensajeFinal" ).dialog( "option", "title", "Resultado de la creación" );
	$('#mensajeFinal').dialog('open');
	
	return false ;
	
}

function errorUsuario(jqXHR, textStatus, errorThrown)
{
  // Muestro Alerta //
  
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
				window.location = "adminportada.php";
			}
	});
	
	$("#mensajeFinal" ).dialog( "option", "title", "Resultado de la creación" );
	$('#mensajeFinal').dialog('open');
  
  	return false;
  
}


function nuevoUsuario()
{
	$('#tituloAccion').text('Nuevo Usuario');
	$('#contenido').html("<form id='formUsuario' autocomplete='on' class='hero-unit'><div id='alertaNuevoUsuario' class='textoAlerta alert ocultar''><strong>Ups!! Ocurrió un error</strong><br>Intentelo las tarde.</div><div id='bordeArribaAbajo''><table align='center' CELLPADDING='20'><tr><td class='etiquetas'>Nombre de Usuario:</td><td><input id='nombreUsuario' type='text' name='fname' required='required' pattern='^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$' placeholder='Ej: Julio'></td></tr><tr><td class='etiquetas'>Contraseña</td><td><input id='contraUsuario' type='password' name='pass' autocomplete='off' required='required' placeholder=''></td></tr><tr><td class='etiquetas'>Nombre del Programa:</td><td><input id='programaUsuario' type='text' name='programa' autocomplete='off' required='required' placeholder='Ej: Show de la Mañana'></td></tr><tr><td class='etiquetas'>Descripcón:</td><td><textarea id='descProgramaU' rows='5' placeholder='....' required='required'></textarea></td></tr></table></div><br><div align='center'><input type='submit' class='btn btn-large' value='Crear'></div></form>");

	$('#formUsuario').submit(function(){
		
		$('#alertaNuevoUsuario').addClass('ocultar');

		var nombreU = $('#nombreUsuario').val();
		var contraU = $('#contraUsuario').val();
		var descPU = $('#descProgramaU').val();
		var programaU = $('#programaUsuario').val();

		$.post("phpHelper/1SmartVoteServices.php",{ tipo:'usuario', accion: 'new',nombreU: nombreU, contraU:contraU, programaU:programaU,descPU:descPU}, successUsuario, "json").error(errorUsuario);
		
		
		return false;
	});
}

function bajaUsuario()
{
	$('#tituloAccion').text('Baja Usuario');
	$('#contenido').html("<div class='hero-unit'> <h3>Aun sin desarrollar</h3> </div>");
}

function modUsuario()
{
	$('#tituloAccion').text('Modificación Usuario');
	$('#contenido').html("<div class='hero-unit'> <h3>Aun sin desarrollar</h3> </div>");
}

$(function() {
	
	
	// Inicializo eventos click del menu
	
	$('#nuevoUsuario').click(nuevoUsuario);
	$('#bajaUsuario').click(bajaUsuario);
	$('#modUsuario').click(modUsuario);
	
	// Boton Log on 
	
	$('#btnLogOn').click(function(){

		$('.gifLoading').show();

		$.post("phpHelper/nologin.php",successLogon, "json").error(errorLogon);
		
	}); // fin click log on 
	
	
	$('input').focus(function(){
			
			$('#alertaEmail').addClass('ocultar');
	});
	
	// Dialog Mensaje Final 

	$('#mensajeFinal').dialog({
		autoOpen: false,
		width: 400,
		modal: true,
		title: "Procesando"
	});

});