
// Archivo js para la pagina index.php

$(document).ready(function() {
				
	function showAlert(type,text)
	{
		if(type=="error")
		{
			$('#alertLogin').addClass('alert-error');		
		}
		else
		{
			$('#alertLogin').removeClass('alert-error');
		}
		$('#alertLogin').html(text);
		$('#alertLogin').removeClass('ocultar');	
	}

	// Inicializo Todo
	
	$( "#btnSubLogin").button();
	$('.boton').button();
	
	// Dialog
	
	$('#dialog').dialog({
		autoOpen: false,
		width: 400,
		modal: true,
		title: "SIG IN",
		buttons: {						
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});

	// Dialog Link
	
	$('#dialog_link').click(function(){
	
		/* Limpio los valores */
		$('#usrname').val('');
		$('#password').val('');
		$('#dialog').dialog('open');
		
		return false;
	});
	
	// Boton para login 
	
	$('#btnSubLogin').click(function(){
		
		$('#alertLogin').addClass('ocultar');

		var userValue =$('#username').val();
		var passValue =$('#password').val();
		
		if(userValue=='')
		{
			showAlert("warning","<strong>Warning!</strong>  Falta completar algun dato, por favor revisar...");
		}
		else
		{
		  if(passValue=='')
		  {
			showAlert("warning","<strong>Warning!</strong>  Falta completar algun dato, por favor revisar...");
		  }
		  else
		  {
			$('#gifLoadingIndex').show();
		
			$.post("phpHelper/login.php",{ user: $('#username').val(), pass:$('#password').val() },function(data){ 
		
				$('#gifLoadingIndex').hide();
				
				if(data.respuesta =="OK")
				{
					window.location = "portada.php";
				}
				else
				{	
					showAlert("error","<strong>Error!</strong>  Username or password incorrecto...");
				}
			}, "json").error(function(jqXHR, textStatus, errorThrown) 
			{
				$('#gifLoadingIndex').hide();
				
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
			
				textToShow= textToShow + "\t Intentelo mas tarde.Gracias."
				
				showAlert("error",textToShow);
			});
		  }
		}
	}); // fin click log in 	
	
}); // Fin ready 