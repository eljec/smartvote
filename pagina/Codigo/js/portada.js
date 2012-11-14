
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
		
		/*$('#example').popover({
		 	html:true,
		 	title: "Referencias Mapas",
		 	placement:"right",
		 	trigger:"hover",
            content:function () {
            	
                var contenido ="";
                
                 contenido = contenido + "<table>";
                 	
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/celeste.png" alt="Celeste" width="30px" height="30px"/></td><td>Nuevas Ordenes</td></tr>';
                     
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/azul.png" alt="Azul" width="30px" height="30px"/></td><td>Geofencing</td></tr>';
                     
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/rosa.png" alt="Rosa" width="30px" height="30px"/></td><td>Salio de Qorden</td></tr>';
                    
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/verde.png" alt="Verde" width="30px" height="30px"/></td><td>GPS</td></tr>';
                     
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/verdeconcuadrado.png" alt="VerdeConCuadrado" width="30px" height="30px"/></td><td>Ordenes Resueltas</td></tr>';
                    
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/verdeconcirculo.png" alt="VerdeConCirculo" width="30px" height="30px"/></td><td>Ordenes Resueltas</td></tr>';
                    
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/rojoconcuadrado.png" alt="Rojo" width="30px" height="30px"/></td><td>Detencion</td></tr>';
                    
                    contenido = contenido +'<tr><td><img src="../Emser/Files/Imagenes/amarillo.png" alt="Amarillo" width="30px" height="30px"/></td><td>Ordenos con Problemas</td></tr>';
                
                 contenido = contenido +'</table>';
                 
                 return contenido;
                 
            }
        });*/
       
       	$('.label-important').addClass('ocultar');
       	
       	var categoriaUsuario = $('#hdnCategoria').val();
       	
       	if(categoriaUsuario == 'administrador')
       	{
       		$('#encuesta').click(function(){
			window.location ="encuestasadmin.php";
			});
		
			$('#usuario').click(function(){
			window.location ="administracionusuario.php";
			});
			
			// Falta Resultado
       	}
       	else
       	{
       		$('#encuesta').click(function(){
			window.location ="encuestas.php";
			});
		
       	}
		
}); // Fin ready 