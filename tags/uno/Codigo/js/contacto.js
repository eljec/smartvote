 function successEmail(data)
{
	if(data.tipo == "OK")
	{
		$('#nombreContacto').val("");
		$('#correoContacto').val("");
		$('#consultaContacto').val("");
		
		$('#alertaEmail').html('Su correo se envio sin problemas..')
		$('#alertaEmail').removeClass('alert-error');
		$('#alertaEmail').addClass('alert-info');
		
	}
	else
	{
		// Muestro Alerta //
		$('#alertaEmail').html('<strong>Ups!! Ocurrió un error</strong><br>Intentelo las tarde.')
		$('#alertaEmail').removeClass('alert-info');
		$('#alertaEmail').addClass('alert-error');
	}
	
	$('#alertaEmail').removeClass('ocultar');
	return false ;
	
}

 function errorEmail()
{
  // Muestro Alerta //
  
  	$('#alertaEmail').html('<strong>Ups!! Ocurrió un error</strong><br>Intentelo las tarde.')
	$('#alertaEmail').removeClass('alert-info');
	$('#alertaEmail').addClass('alert-error');
  	$('#alertaEmail').removeClass('ocultar');
  
  return false;
  
}


$(function() {
	
	$('input').focus(function(){
			
			$('#alertaEmail').addClass('ocultar');
	});
		
	$('#formContacto').submit(function(){
		
		$('#alertaEmail').addClass('ocultar');

		var nombreContacto = $('#nombreContacto').val();
		var correoContacto = $('#correoContacto').val();
		var consultaContacto = $('#consultaContacto').val();
		
		$.post("phpHelper/SmartVoteServices.php",{ tipo:'contacto',nombreC: nombreContacto, correoC:correoContacto, consultaC: consultaContacto}, successEmail, "json").error(errorEmail);
		
		return false;
	});
});