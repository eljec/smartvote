
// Llenado de Lista 

function llenaListaEncuestas()
{

	$('#gifLoading').show();
	
	$('#bajaEncuesta').attr('disabled','disabled');
	
	$('#listaEncuesta').attr('disabled','disabled');
	
	var idPrograma = $('#hdnIdPrograma').val(); 
	
	$.getJSON('phpHelper/SmartVoteServices.php?action=2&paged=0&id_p='+idPrograma, function(data) {
		  
			$('#gifLoading').hide();

			$('#listaEncuesta').removeAttr('disabled','disabled');
			
			var nuevoObjeto;
			var ddData = new Array();
			
			if(data.encuestas.length > 0)
			{
				for(var i=0;i<data.encuestas.length;i++)
				{
					
					nuevoObjeto = { text:data.encuestas[i].nombre,
									value:data.encuestas[i].id,
									}
					
					ddData[i] = nuevoObjeto;
				}
			 
			 	$('#listaEncuesta').ddslick('destroy');
			 	
			 	$('#listaEncuesta').ddslick({
				    data:ddData,
				    width:230,
				    selectText: "Seleccione una encuesta",
				    onSelected: function(selectedData){
							$('#bajaEncuesta').removeAttr('disabled','disabled');
							$('#alertaBajaEncuesta').addClass('ocultar');
				    }    
				});
			}
			else
			{
				// Alerta que ya no hay mas encuestas
				
				$('#alertaPreguntas').addClass('alert-error');	
				$('#alertaBajaEncuesta').html("<strong>No hay encuestas.</strong>");	
				$('#alertaBajaEncuesta').removeClass('ocultar');
					
			}	 
	});
	
}