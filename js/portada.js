
// archivo js de la pagina protada.php 

$(document).ready(function() {

	function showAlert(type,text)
	{
		$('#alertLogon').addClass('alert-error');		
		$('#alertLogon').html("<strong>Ocurrio un Error!</strong>");
		$('#alertLogon').removeClass('ocultar');	
	}
	
	// Boton Logon 
	
	$('#btnLogOn').click(function(){
		$('.gifLoading').show();
		
		$.post("phpHelper/nologin.php",function(data){ 
		
			$('.gifLoading').hide();
				
			if(data.respuesta =="OK")
			{
				// Redirecciono a la pagina de portada 
				
				 window.location = "index.php";
			}
			else{
				showAlert();
			}
		}, "json").error(function() { showAlert(); });
		
		}); // fin click log on 	
				
}); // Fin ready 