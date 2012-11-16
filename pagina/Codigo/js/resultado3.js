




$(document).ready(function() {
	
	
	function fnFormatDetails ( oTable, nTr )
	{
	    var aData = oTable.fnGetData( nTr );
	    var sOut = '<div align="center">'+aData[2]+'</div>';

	    return sOut;
	}

	function obtenerGraficoPregunta( oTable, nTr)
	{

		var aData = oTable.fnGetData( nTr );
		
		var indice = aData[0];
		
		var idLimpio = $("#listaPregunta option:selected").val();

		var retorno = "<div align='center' id='chartdiv"+aData[0]+"' style='height:400px;width:600px; '>"+cssLoading()+"</div>";
		
		$('#hdnIdGrafico').val(aData[0]);
		
		$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'preguntas',id_e: idLimpio,indice: indice},ajaxSuccessGraficoPreguntas,"json");
	
		return retorno;
	}
	
	function ajaxSuccessGraficoPreguntas(data)
	{
		var idGrafico = $('#hdnIdGrafico').val();
		
		$("#chartdiv" + idGrafico).html('');
		
		//$('#chartdiv').html('');
		
		var datos = data.votos;
		
		var cantidad = datos.length;
		
		var graficoMasPreguntasXEncuesta = jQuery.jqplot ("chartdiv"+idGrafico, [datos], 
    			{ 
      				seriesDefaults: {
        							renderer: jQuery.jqplot.PieRenderer, 
        							rendererOptions: {
          							showDataLabels: true
        			}	
			      }, 
			      legend: { show:true, location: 'e' },
			      title: {
		        		text: '',  
		        		show: true,
		    			}
			    }
			  );
	}
	
	function ajaxSuccessMisEncuestas(data)
	{
	
		var ddData = new Array();
		
		if(data.encuestas.length > 0)
		{
			for(var i=0;i<data.encuestas.length;i++)
			{
				var nuevoObjeto = new Array();
				
				nuevoObjeto.push(data.encuestas[i].id);
				nuevoObjeto.push(data.encuestas[i].nombre);
				nuevoObjeto.push(data.encuestas[i].descripcion);
				nuevoObjeto.push('<img src="img/read_more_16x16.png"/>');

				ddData.push(nuevoObjeto);
			}
		 	
		 	// Pongo Tabla 
		 	
			$('#contenido').html('<div class="hero-unit"><h3>Mis Encuestas</h3><div class=""><br><table cellpadding="0" cellspacing="0" border="0" class="display" id="example">');
			$('#contenido').append('</table></div></div>');
			
		 	 var oTable = $('#example').dataTable( {
					"aaData": ddData,
					"bJQueryUI": true,
					"aoColumnDefs": [
                        { "bSearchable": false, "bVisible": false, "aTargets": [0,2] },
                        { "bVisible": false, "aTargets": [0,2] }
                    ],
					"aoColumns": [
			            { "sTitle": "Id" },
			            { "sTitle": "Nombre"},
			            { "sTitle": "Desc", "sClass": "center"},
			            { "sTitle": "Descripcion", "sClass": "center"}
			        ]	
			} );	
			
			 $('#example tbody td img').live('click', function () {
		        var nTr = $(this).parents('tr')[0];
		        if ( oTable.fnIsOpen(nTr) )
		        {
		            oTable.fnClose( nTr );
		        }
		        else
		        {		            
		            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
		        }
		    } );
		}
		else
		{
			// Alerta 
			$('#alertaCragaDatos').html('<strong>No hay encuestas cargadas.</strong>');
			$('#contenido').html('');
			$('#alertaCragaDatos').removeClass('ocultar');
		}
		
	}

	function ajaxSuccessObtenerPreguntas(data)
	{
		
		$('#contenidoTabla').html('<br><table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>');
		
		var ddData = new Array();
		
		if(data.preguntas.length > 0)
		{
			for(var i=0;i<data.preguntas.length;i++)
			{
				var nuevoObjeto = new Array();
				
				nuevoObjeto.push(data.preguntas[i].id);
				nuevoObjeto.push("¿"+data.preguntas[i].descripcion+"?");
				nuevoObjeto.push(data.preguntas[i].orden);
				nuevoObjeto.push('<img src="img/read_more_16x16.png"/>');

				ddData.push(nuevoObjeto);
			}
		 	
		 	 var oTable = $('#example').dataTable( {
					"aaData": ddData,
					"bJQueryUI": true,
					"aoColumnDefs": [
                        { "bSearchable": false, "bVisible": false, "aTargets": [0,2] },
                        { "bVisible": false, "aTargets": [0,2] }
                    ],
					"aoColumns": [
			            { "sTitle": "Id" },
			            { "sTitle": "Pregunta"},
			            { "sTitle": "Orden", "sClass": "center"},
			            { "sTitle": "Grafico", "sClass": "center"}
			        ]	
			} );	
			
			 $('#example tbody td img').live('click', function () {
		        var nTr = $(this).parents('tr')[0];
		        if ( oTable.fnIsOpen(nTr) )
		        {
		            oTable.fnClose( nTr );
		        }
		        else
		        {		            
		            oTable.fnOpen( nTr, obtenerGraficoPregunta(oTable, nTr), 'details' );
		        }
		    } );
		}
		else
		{
			// Alerta 
			$('#alertaCragaDatos').html('<strong>No hay preguntas cargadas.</strong>');
			$('#alertaCragaDatos').removeClass('ocultar');
		}
	}
	
	function ajaxSuccessGraficoGral(data)
	{
			$('#contenido').html("<div id='chartdiv' style='height:400px;width:600px; '></div>");
			
			$('#chartdiv').html('');
	
			var datos = data.datosgrafico;
			 
			var cantidad = datos.length;
			
			if(cantidad == 0)
			{
				// Muetro alertas de que no hay programas con ese nombre //
				
  				$('#alertaCragaDatos').html('<strong>No se ha votado ninguna de sus encustas</strong>');
  				$('#alertaCragaDatos').removeClass('ocultar');
			}	
			else
			{
				var graficoMasVotadosEncuestasXPrograma = jQuery.jqplot ('chartdiv', [datos], 
	    			{ 
	      				seriesDefaults: {
	        							// Make this a pie chart.
	        							renderer: jQuery.jqplot.PieRenderer, 
	        							rendererOptions: {
	        		 					 // Put data labels on the pie slices.
	          							// By default, labels show the percentage of the slice.
	          							showDataLabels: true
	        			}	
				      }, 
				      legend: { show:true, location: 'e' },
				      title: {
			        		text: 'Votos Encuesta',  
			        		show: true,
			    			}
				    }
				  );
			}	
	}
	
	function ajaxSuccessGraficoXPregunta(data)
	{
			$('#contenido').html('<table style="width: 100%;"><tr><td style="width: 20px;"><select id="listaPregunta"></select></td><td><h3>Encuestas</h3><div id="contenidoTabla"><br><table cellpadding="0" cellspacing="0" border="0" class="display" id="example" style="width: 100%;"></table></div></td></tr></table>');
			
			$('#listaPregunta').html('');
	
			var datos = data.encuestas;
			 
			var cantidad = datos.length;
			
			if(cantidad == 0)
			{
				// Muetro alertas de que no hay programas con ese nombre //
				
  				$('#alertaCragaDatos').html('<strong>No se ha votado ninguna de sus encustas</strong>');
  				$('#alertaCragaDatos').removeClass('ocultar');
			}	
			else
			{
				// LLeno la lista 
				
				var opciones = '<option value="0"SELECTED>Seleccione una encuesta</option>';
				
				for(var i=0;i<data.encuestas.length;i++)
				{
					opciones = opciones + '<option value="'+data.encuestas[i].id+'">'+data.encuestas[i].nombre+'</option>';
				}
				
				$('#listaPregunta').html(opciones);
				
				$('#listaPregunta').change(function() {
					
					$('#alertaCragaDatos').addClass('ocultar');
					
  					var idEncuesta = $("#listaPregunta option:selected").val();
  					
  					if(idEncuesta == 0)
  					{
  						// Alerta
  					}
  					else
  					{
  						// Cargar tabla de  
  						
  						$('#contenidoTabla').html(cssLoading());
  						
  						var idPrograma = $('#hdnIdPrograma').val();
  						
  						$.getJSON('phpHelper/SmartVoteServices.php?action=3&id_p='+idPrograma+'&id_e='+idEncuesta,ajaxSuccessObtenerPreguntas,"json");
  					}
				});
			}	
	}
	
	function cssLoading()
	{
		var icno = '<div id="squaresWaveG">';
				icno= icno +'<div id="squaresWaveG_1" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_2" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_3" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_4" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_5" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_6" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_7" class="squaresWaveG">';
				icno= icno+'</div>';
				icno= icno+'<div id="squaresWaveG_8" class="squaresWaveG">';
				icno= icno+'</div>';
			icno= icno+'</div>';
		return icno;
	}
	
	// Click sobre las Opciones //
	
	// Mis Encuestas 
	
	$('#misEncuestas').click(function(){
		
		$('#contenido').html(cssLoading());
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var idPrograma = $('#hdnIdPrograma').val();
		
		$.getJSON('phpHelper/SmartVoteServices.php?action=2&paged=0&id_p='+idPrograma,ajaxSuccessMisEncuestas);
		
	});
	
	
	// Grafico Gral
	
	$('#graficoGral').click(function(){
		
		$('#contenido').html(cssLoading());
				
		$('#alertaCragaDatos').addClass('ocultar');
		
		var nombrePrograma = $('#hdnNombrePrograma').val();

		if(nombrePrograma== null || nombrePrograma=="" || /^\s+$/.test(nombrePrograma))
		{
			// Muetro Alertas //
			
			$('#alertaCragaDatos').html('<strong>Ups!!</strong> No tiene Encuetas o votos');
			$('#alertaCragaDatos').removeClass('ocultar');
		}
		else
		{

			//$('#gifLoading').show();
			
			$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'encuestas',nombreP: nombrePrograma} ,ajaxSuccessGraficoGral,"json");
		}	
	});
	
	// Grafico por Pregunta 
	
	$('#graficoXPregunta').click(function(){
				
			// Le muestro una lista con las encuestas //
			
			$('#contenido').html(cssLoading());
		
			$('#alertaCragaDatos').addClass('ocultar');
		
			var idPrograma = $('#hdnIdPrograma').val();
			
			if(idPrograma== null || idPrograma=="" )
			{
				// Muetro Alertas //
				
				$('#alertaCragaDatos').html('<strong>Ups!!</strong> No tiene Encuetas o votos');
				$('#alertaCragaDatos').removeClass('ocultar');
			}
			else
			{

				$.getJSON('phpHelper/SmartVoteServices.php?action=2&paged=0&id_p='+idPrograma,ajaxSuccessGraficoXPregunta,"json");
			}	
		
		
		});
		
	
});