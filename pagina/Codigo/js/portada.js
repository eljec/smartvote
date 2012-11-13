
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
		
		
		/*$('#btnProgramas').click(function(){
			
			var votos ="1-1;2-1;3-0;4-1;5-1";
			var idEn = 3;
			var idTVl = 56712;
			
			$.post("phpHelper/SmartVoteServices.php",{ tipo:'votos',votos:votos,idE:idEn, idTv:idTVl},function(data){
				
				var ju = "ema" ;
				
			}, "json").error(function(){
				
				var ema = "hola";
			});
			
		});
		
		// Inicializo 
		
		$('#btnProgramas').attr('disabled', 'disabled');*/
		
		$('.label-important').addClass('ocultar');
		
		$('#encuesta').click(function(){
			window.location ="encuestasadmin.php";
		});
		
		$('#usuario').click(function(){
			window.location ="administracionusuario.php";
		});
		
}); // Fin ready 