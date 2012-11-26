
// archivo js de la pagina protada.php 

$(document).ready(function() {

	function showAlert()
	{
		$('.label-important').text('Ups!! Ocurrio, intentelo mas tarde.');		
		$('.label-important').removeClass('ocultar');	
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
				showAlert();
			}
	}
	
	function errorLogon()
	{
		$('.gifLoading').hide();
		showAlert();
	}
	// Boton Logon 
	
	$('#btnLogOn').click(function(){
		
		$('.gifLoading').show();
		
			$.post("phpHelper/nologin.php",successLogon, "json").error(errorLogon);
		
		}); // fin click log on 	
		
       	$('.label-important').addClass('ocultar');
       	
       	var categoriaUsuario = $('#hdnCategoria').val();
       	
       	if(categoriaUsuario == 'administrador')
       	{
       		$('#encuesta').click(function(){
			window.location ="encuestas.php";
			});
		
			$('#usuario').click(function(){
			window.location ="administracionusuario.php";
			});
			
			$('#resultado').click(function(){
			window.location ="resultadoadmin.php";
			});
       	}
       	else
       	{
       		$('#encuesta').click(function(){
			window.location ="encuestas.php";
			});
			
			$('#resultado').click(function(){
			window.location ="resultado.php";
			});
		
       	}
		
}); // Fin ready 