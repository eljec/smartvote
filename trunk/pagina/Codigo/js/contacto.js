 function successEmail(data)
{
	if(data.tipo == "OK")
	{
		$('#nombreContacto').val("");
		$('#correoContacto').val("");
		$('#consultaContacto').val("");
	}
	else
	{
		// Muestro Alerta //
	}
	return false ;
}

 function errorEmail()
{
  // Muestro Alerta //
  
  $('#alertaEmail').removeClass('ocultar');
  
  return false;
  
}


$(function() {
	$('#formContacto').submit(function(){
		
		$('#alertaEmail').addClass('ocultar');
		
		var nombreContacto = $('#nombreContacto').val();
		var correoContacto = $('#correoContacto').val();
		var consultaContacto = $('#consultaContacto').val();
		
		$.post("phpHelper/SmartVoteServices.php",{ tipo:'contacto',nombreC: nombreContacto, correoC:correoContacto, consultaC: consultaContacto}, successEmail, "json").error(errorEmail);
		
		return false;
	});
});