
$(document).ready(function() {

	
	// FUNCIONES DE MANEJO DE PETICIONES AJAXS //
	
	function ajaxErrorMasVotadosGeneral()
	{
		 $('#gifLoading').hide();
		 $('#alertaCargaDatos').html('<strong>Warning!</strong> Ocurrio un Error, Intentelo mas tarde.');
		 $('#alertaCragaDatos').removeClass('ocultar');
	}
	
	function ajaxSuccessMasVotadosProgramas(data) 
	{
	  	$('#gifLoading').hide();
	
		$('#contenido').html("<div id='chartdiv' style='height:400px;width:600px; '></div>");
				
		var datos = data.datosgrafico;
		   			
		var graficoMasVotadosProgramas = jQuery.jqplot ('chartdiv', [datos], 
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
		        		text: 'Programas mas consultados',  
		        		show: true,
		    			}
			    }
			  );
	}
	
	function ajaxSuccessMasVotadosEncuestas(data)
	{
		$('#gifLoading').hide();
			
			$('#chartdiv').html('');
			
			var datos = data.datosgrafico;
			 
			var cantidad = datos.length;
			
			if(cantidad == 0)
			{
				// Muetro alertas de que no hay programas con ese nombre //
				
  				$('#alertaCragaDatos').html('<strong>No Existe un programa con ese nombre</strong>');
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
			        		text: 'Encuestas mas votadas segun el programa seleccionado',  
			        		show: true,
			    			}
				    }
				  );
			}	
	}

	function ajaxSuccessComboProgramas(data)
	{
			$('#contenido').html("<table><tr><td style='width:310px'><div id='comboProgramas'></div></td><td style='width:50px'><div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div></td><td style='width:310px'><div id='comboEncuestas'></div></td></tr></table>");
			$('#contenido').append("<br><br><div align='center'><input id='vergrafico' type='button' style='display: none;' value='Ver Grafico'/><div>");
			$('#contenido').append("<br><div id='chartdiv' style='height:400px;width:600px; '></div>");
			
			$('#vergrafico').button();
			
			var nuevoObjeto;
			var ddData = new Array();
			
			for(var i=0;i<data.programas.length;i++)
			{
				
				nuevoObjeto = { text:"\""+data.programas[i].nombre + "\"",
								value:data.programas[i].id,
								}
				
				ddData[i] = nuevoObjeto;
			}
		 
		 	$('#comboProgramas').ddslick({
			    data:ddData,
			    width:300,
			    selectText: "Seleccione un programa..",
			    onSelected: function(selectedData){
			    	
			        var id = selectedData.selectedData.value; 
			        
			         var idLimpio = replaceAll(id,"\"",'');
			        
			        llenarComboEncuestas(idLimpio);
			    }   
			});
	}
	
	function ajaxSuccessComboEncuestas(data)
	{
		$('#gifLoading').hide();
		
		var nuevoObjeto;
		var ddData = new Array();
		
		for(var i=0;i<data.encuestas.length;i++)
		{
			
			nuevoObjeto = { text:"\""+data.encuestas[i].nombre + "\"",
							value:data.encuestas[i].id,
							}
			
			ddData[i] = nuevoObjeto;
		}
	 
	 	$('#comboEncuestas').ddslick({
		    data:ddData,
		    width:300,
		    selectText: "Seleccione una encuesta..",
		    onSelected: function(selectedData){
		    	
				// Activo el boton para ver grafico //
				
				$('#vergrafico').show();
				
				$('#vergrafico').click(graficoPreguntas);
		    }   
		});
	}
	
	function ajaxSuccessGraficoPreguntas(data)
	{
		$('#gifLoading').hide();
			
		$('#chartdiv').html('');
		
		var datos = data.datosgrafico;
		 
		var cantidad = datos.length;
		
		if(cantidad == 0)
		{
			// Muetro alertas de que no hay programas con ese nombre //
			
			$('#alertaCragaDatos').html('<strong>Aun no hay votos para esta encuesta..</strong>');
			$('#alertaCragaDatos').removeClass('ocultar');
		}	
		else
		{
			var graficoMasPreguntasXEncuesta = jQuery.jqplot ('chartdiv', [datos], 
    			{ 
      				seriesDefaults: {
        							renderer: jQuery.jqplot.PieRenderer, 
        							rendererOptions: {
          							showDataLabels: true
        			}	
			      }, 
			      legend: { show:true, location: 'e' },
			      title: {
		        		text: 'Distribucion de Preguntas por encuesta',  
		        		show: true,
		    			}
			    }
			  );
		}	
	}
	
	// FUNCIONES PARA OTRAS COSAS //
	
	function llenarComboEncuestas(idPrograma)
	{
		$('#gifLoading').show();
		$('#vergrafico').hide();
		$('#alertaCragaDatos').addClass('ocultar');
		
		$('#comboEncuestas').ddslick('destroy');
		
		$.getJSON('phpHelper/SmartVoteServices.php?action=2&paged=0&id_p='+idPrograma,ajaxSuccessComboEncuestas);
	}
	
	function graficoPreguntas()
	{
		$('#chartdiv').html('');
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var dataComboProgramas = $('#comboProgramas').data('ddslick');
    
    	var dataComboEncuestas = $('#comboEncuestas').data('ddslick');
    
		var idPrograma = dataComboProgramas.selectedData.value;
		
		var idEncuesta = dataComboEncuestas.selectedData.value;
	
		$('#gifLoading').show();
		
		$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'preguntas',id_e: idEncuesta} ,ajaxSuccessGraficoPreguntas,"json").error(ajaxErrorMasVotadosGeneral);
	}
	
	function replaceAll(text, search, newstring )
	{
		    while (text.toString().indexOf(search) != -1)
		        text = text.toString().replace(search,newstring);
		    return text;
	}


	// Click Listado de Programas 
	
	$('#listadoProgramas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=1&paged=1',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:160,resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion', width:400}
			],
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'LISTA PROGRAMAS',
			width:700
		});
	});

	// Click Mas votados seccion Programas
	
	$('#masVotadosProgramas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		// Cargo el gif de carga //
		
		$('#contenido').html("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
		
		$('#gifLoading').show();
		
	 	$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'programas'} ,ajaxSuccessMasVotadosProgramas,"json").error(ajaxErrorMasVotadosGeneral);

	});
	
	// Click Listado encuestas 
	
	$('#listadoEncuestas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=2&paged=1',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION','NOMBRE PROGRAMA'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:160,resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion', width:400},
				{name:'nombrep', editable: true, index:'nombrep', width:160}
			],
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'LISTA ENCUESTAS',
			width:700
		});
	});
	
	// Click mas votados seccion ecnuesta 
	
	$('#masVotadosEncuestas').click(function(){
		 
 		$('#alertaCragaDatos').addClass('ocultar');
 				
 		$('#contenido').html("<table id='graficoDos' style='width:100%;'><tr><td style='width:80%;'><div class='ui-widget'><label for='programa'>Nombre del Programa: </label><input class='inputLargo' id='programa' /></div></td><td style='width:20%;'><input type='button' value='Ver Grafico' id='vergrafico'/></td></tr></table> ");
 		$('#contenido').append("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
 		$('#contenido').append("<br><div id='chartdiv' style='height:400px;width:600px; '></div>");
 		
 		
 		$('#vergrafico').button();
 		
 		$( "#programa" ).autocomplete({
	
	 		source: function( request, response ) {
	                $.ajax({
	                    url: "phpHelper/SmartVoteServices.php",
	                    dataType: "json",
	                    data: {
	                        action: 1,
	                        paged: 0,
	                        autocomplete:1,
	                        like: request.term
	                    },
	                    success: function( data ) {
	                        response( $.map( data.programas, function( item ) {
	                            return {
	                                label: item.nombre,  
	                                //label: item.nombre.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" +$.ui.autocomplete.escapeRegex(request.term) +")(?![^<>]*>)(?![^&;]+;)", "gi"),request.term.bold() ),
	                                value: item.nombre,
	                                key: item.id
	                            }
	                        }));
	                    }
	                });
	            }
	      });
	      
	      
	    $('#programa').focus(function(){
	    	$('#alertaCragaDatos').addClass('ocultar');
	    });
	    
	    
      	$('#vergrafico').click(function(){
      		
      			$('#chartdiv').html('');

      			var nombrePrograma = $('#programa').val();
      			
      			if(nombrePrograma== null || nombrePrograma=="" || /^\s+$/.test(nombrePrograma))
      			{
      				// Muetro Alertas //
      				
      				$('#alertaCragaDatos').html('<strong>Ups!!</strong> Te falto ingresar el nombre del programa');
      				$('#alertaCragaDatos').removeClass('ocultar');
      			}
      			else
      			{

					$('#gifLoading').show();
					
					$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'encuestas',nombreP: nombrePrograma} ,ajaxSuccessMasVotadosEncuestas,"json").error(ajaxErrorMasVotadosGeneral);
      			}	
		});
	});
	
	// Click mas votados seccion pregunats 
	
	$('#masVotadosEncuestaPorPrograma').click(function(){
		
		$('#contenido').html("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
		$('#gifLoading').show();
		
		$.getJSON('phpHelper/SmartVoteServices.php?action=1&paged=0',ajaxSuccessComboProgramas);
				
	});
	
	
	// ****************** Inicio todo ************************* //
	
	// Acordion 
	
	$( "#accordion" ).accordion({
		autoHeight: true,
		navigation: true,
		collapsible: true
	});
	
	$( "#accordion" ).accordion( "option", "active", false );

}); // Fin ready 