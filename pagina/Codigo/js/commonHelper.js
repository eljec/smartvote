

	// Funcion para mostrar alertas 
	
	function showAlertById(id,type,text)
	{
		var ju = document.getElementById(id);
		
		$(ju).addClass('alert-error');
		$(ju).html("<strong>Error!</strong>  Username or password incorrecto...");
		$(ju).removeClass('ocultar');
	}
