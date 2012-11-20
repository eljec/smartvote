
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
				
		/*var datos = data.datosgrafico;
		   			
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
			  );*/
			 
		var data = [
	    ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
	    ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
	  ];
	  var plot1 = jQuery.jqplot ('chartdiv', [data], 
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
	      legend: { show:true, location: 'e' }
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
			        		text: 'Encuestas mas votadas-Programa: '+ $('#hdnIdPrograma').val(),  
			        		show: true,
			    			}
				    }
				  );
			}	
	}

	function ajaxSuccessComboProgramas(data)
	{
			$('#contenido').html("<table><tr><td style='width:310px'><div id='comboProgramas'></div></td><td style='width:50px'><div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div></td><td style='width:310px'><div id='comboEncuestas'></div></td></tr></table>");
			$('#contenido').append("<br><h4 id='textoPregunta'></h4><div id='chartdiv' style='height:400px;width:600px; '></div>");
			$('#contenido').append("<br><br><div align='center'><input id='vergraficoAnt' type='button' style='display: none;' value='Anterior Pregunta'/><input id='vergraficoSig' type='button' style='display: none;' value='Siguiente Pregunta'/><div>");
			
			$('#vergraficoAnt').button();
			$('#vergraficoSig').button();
			
			var nuevoObjeto;
			var ddData = new Array();
			
			if(data.programas.length > 0)
			{
				for(var i=0;i<data.programas.length;i++)
				{
					
					nuevoObjeto = { text:data.programas[i].nombre,
									value:data.programas[i].id,
									}
					
					ddData[i] = nuevoObjeto;
				}
			 
			 	$('#comboProgramas').ddslick({
				    data:ddData,
				    width:300,
				    selectText: "Seleccione un programa..",
				    imagePosition:"right",
				    onSelected: function(selectedData){
				    	
				        var id = selectedData.selectedData.value; 
				        
				        var idLimpio = replaceAll(id,"\"",'');
				        
				        llenarComboEncuestas(idLimpio);
				    }   
				});
			}
			else
			{
				// Alerta de que no hay encuestas //
				
				$('#alertaCragaDatos').html('<strong>No hay encuestas para este programa.</strong>');
				$('#alertaCragaDatos').removeClass('ocultar');
			}
			
	}
	
	function ajaxSuccessGraficoPreguntas(data)
	{
		// Inicializo los botones 		
						
		if(data.anterior == null)
		{
			$('#vergraficoAnt').attr('name', 0);
			$('#vergraficoAnt').hide();
		}
		else					
		{
			$('#vergraficoAnt').attr('name', data.anterior);
			$('#vergraficoAnt').show();
		}
		
		if(data.siguiente == null)
		{
			$('#vergraficoSig').attr('name', 0);
			$('#vergraficoSig').hide();
		}
		else					
		{
			$('#vergraficoSig').attr('name', data.siguiente);
			$('#vergraficoSig').show();
		}
		
		$('#vergraficoSig').click(graficoPreguntasSiguiente);
		$('#vergraficoAnt').click(graficoPreguntasAnterior);

		pintarMapaPregunta(data);
	}
	
	function ajaxSuccessComboEncuestas(data)
	{
		$('#gifLoading').hide();
		
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
		 
		 	$('#comboEncuestas').ddslick({
			    data:ddData,
			    width:300,
			    selectText: "Seleccione una encuesta..",
			    onSelected: function(selectedData){
			    	
					var num_pregunta = 1;
					
					$('#hdnNumPregunta').val(1);
					
					var id = selectedData.selectedData.value; 
				        
				    var idLimpio = replaceAll(id,"\"",'');
				    
				    $('#gifLoading').show();
				    
					$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'preguntas',id_e: idLimpio,indice: num_pregunta},ajaxSuccessGraficoPreguntas,"json");
			    }   
			});
		}
		else
		{
			// Alerta 
			$('#alertaCragaDatos').html('<strong>NO TIENE ENCUESTAS CARGADAS.</strong>');
			$('#alertaCragaDatos').removeClass('ocultar');
		}
		
	}
	
	// FUNCIONES PARA OTRAS COSAS //
	
	function llenarComboEncuestas(idPrograma)
	{
		$('#gifLoading').show();
		$('#alertaCragaDatos').addClass('ocultar');
		$('#chartdiv').html('');
		$('#textoPregunta').text('');
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
	
	function pintarMapaPregunta(data)
	{
		$('#gifLoading').hide();
			
		$('#chartdiv').html('');
		
		var datos = data.votos;
		
		var cantidad = datos.length;
		
		if(cantidad == 0)
		{
			// Muetro alertas de que no hay programas con ese nombre //
			
			if($('#hdnNumPregunta').val() ==1)
			{
				$('#alertaCragaDatos').html('<strong>Aun no hay votos para esta encuesta..</strong>');
				$('#alertaCragaDatos').removeClass('ocultar');
			}
			else
			{
				$('#alertaCragaDatos').html('<strong>No Tiene Votos </strong>');
				$('#alertaCragaDatos').removeClass('ocultar');
			}
	
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
		        		text: '',  
		        		show: true,
		    			}
			    }
			  );
			  
			  	// Muetro la pregunta 
			  	
				var numPregunta = $('#hdnNumPregunta').val();
				
				$('#textoPregunta').text('Pregunta '+numPregunta +':  '+ "¿"+ data.desc +"?");
		}	
	}
	
	function graficoPreguntasAnterior()
	{
		var anterior = $('#vergraficoAnt').attr('name');

		$('#hdnNumPregunta').val(anterior);
		
		pedirGraficoPregunta(anterior);
		
	}
	
	
	function graficoPreguntasSiguiente()
	{	

		var siguiente = $('#vergraficoSig').attr('name');

		$('#hdnNumPregunta').val(siguiente);
		
		pedirGraficoPregunta(siguiente);
		
	}
	
	function pedirGraficoPregunta(indice)
	{
		$('#gifLoading').show();
		
		$('#chartdiv').html("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' alt='Loading...'/></div>");
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var dataComboEncuestas = $('#comboEncuestas').data('ddslick');
		
		var id = dataComboEncuestas.selectedData.value;
				        
		var idLimpio = replaceAll(id,"\"",'');
		
		$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'preguntas',id_e: idLimpio,indice: indice},ajaxSuccessGraficoPreguntas,"json");

	}
	
	function replaceAll(text, search, newstring )
	{
		    while (text.toString().indexOf(search) != -1)
		        text = text.toString().replace(search,newstring);
		    return text;
	}


	// Click Listado de Programas activos
	
	$('#listadoProgramas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=1&paged=1&activos=true',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION','USUARIO ASIGNADO'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:260,resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion', width:200,search:false},
				{name:'usuario', editable: true, index:'usuario', width:260,search:false,sortable:true}
			],
			subGrid: true,
           	subGridRowExpanded: function (subgrid_id, row_id) {
           		
           		  var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);
           		  
           		 $("#" + subgrid_id).html("<div>Descripcion:"+data.descripcion+"<div>");
           	},
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'LISTA PROGRAMAS ACTIVOS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('hideCol',"descripcion");
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
	});

	//&activos=false

	// Programas Inactivos 
	
	$('#listadoProgramasInactivos').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=1&paged=1&activos=false',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION','USUARIO ASIGNADO'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre',resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion',search:false},
				{name:'usuario', editable: true, index:'usuario',search:false}
			],
			subGrid: true,
           	subGridRowExpanded: function (subgrid_id, row_id) {
           		
           		  var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);
           		  
           		 $("#" + subgrid_id).html("<div>Descripcion:"+data.descripcion+"<div>");
           	},
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'LISTA PROGRAMAS INACTIVOS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('hideCol',"descripcion");
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
	});
	
	// Click Mas votados seccion Programas
	
	$('#masVotadosProgramas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		// Cargo el gif de carga //
		
		$('#contenido').html("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
		
		$('#gifLoading').show();
		
	 	$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'programas'} ,ajaxSuccessMasVotadosProgramas,"json").error(ajaxErrorMasVotadosGeneral);

	});
	
	// Click Listado encuestas activas
	
	$('#listadoEncuestas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=2&paged=1&id_p=21',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION','NOMBRE PROGRAMA'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:300,resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion', width:400, search:false},
				{name:'nombrep', editable: true, index:'nombrep', width:300}
			],
			subGrid: true,
           	subGridRowExpanded: function (subgrid_id, row_id) {
           		
           		  var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);
           		  
           		 $("#" + subgrid_id).html("<div class='negro'>Descripcion:"+data.descripcion+"<div>");
           	},
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'LISTA ENCUESTAS ACTIVAS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('hideCol',"descripcion");
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
		
	});
	
	//Encuestas Inactivas 
	
	$('#listadoEncuestasInactivas').click(function(){
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=2&paged=1&activos=false',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','FECHA INICIO','FECHA FIN','NOMBRE PROGRAMA'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:200,resizable:false, sortable:true},
				{name:'fechainicio', editable: true, index:'fechainicio', width:000, search:false},
				{name:'fechafin', editable: true, index:'fechafin', width:200, search:false},
				{name:'nombrep', editable: true, index:'nombrep', width:300}
			],
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'LISTA ENCUESTAS INACTIVOS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
		
	});
	
	// Click mas votados seccion ecnuesta 
	
	$('#masVotadosEncuestasPorPrograma').click(function(){
		 
 		$('#alertaCragaDatos').addClass('ocultar');
 		
 		/*$('#contenido').html('<div class="hero-unit"><div class="bordeArribaAbajo"><br><table cellpadding="0" cellspacing="0" border="0" class="display" id="example"><thead><tr><th>Id</th><th>Nombre Programa</th></tr></thead>');
 		$('#contenido').append('<tbody></tbody>');
		$('#contenido').append('</table></div></div><br><div align="center"><input type="button" value="Ver Grafico" id="vergrafico"/></div>');
 		$('#contenido').append("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
 		$('#contenido').append("<br><div id='chartdiv' style='height:400px;width:600px; '></div>");
 		
 		$.extend( $.fn.dataTable.defaults, {
	        "bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": "phpHelper/SmartVoteServices.php",
			"aoColumnDefs": [
                        { "bSearchable": false, "bVisible": false, "aTargets": [ 0] },
                        { "bVisible": false, "aTargets": [ 0 ] }
                    ],
			"fnServerParams": function ( aoData ) {
	            aoData.push( { "name": "action", "value": 6 } );
	        },
	    } );
 		
		$('#example tbody tr').live('click', function (event) {        
		   if ( $(this).hasClass('row_selected') ) 
		   	{
				$(this).removeClass('row_selected');
				
				$('hdnIdPrograma').val('');
			}
			else {
				oTable.$('tr.row_selected').removeClass('row_selected');
				$(this).addClass('row_selected');
				
				var sData = oTable.fnGetData( this );

				$('#hdnIdPrograma').val(sData[1]);
				
			}

		});
		
		var oTable = $('#example').dataTable();*/
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		
		$('#contenido').html(stringTabla);
		$('#contenido').append('<br><div align="center"><input type="button" value="Ver Grafico" id="vergrafico"/></div>');
 		$('#contenido').append("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
 		$('#contenido').append("<br><div id='chartdiv' style='height:400px;width:600px; '></div>");
 		
 		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=1&paged=1',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION','USUARIO ASIGNADO'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:260,resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion', width:200,search:false},
				{name:'usuario', editable: true, index:'usuario', width:260,search:false,sortable:true}
			],
			subGrid: true,
           	subGridRowExpanded: function (subgrid_id, row_id) {
           		
           		var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);
           		$('#hdnIdPrograma').val(data.nombre);
           		$("#" + subgrid_id).html("<div>Descripcion:"+data.descripcion+"<div>");
           	},
           	onSelectRow: function(rowid) {
			    var data =  jQuery('#tablaContenido').jqGrid('getRowData',rowid);
           		$('#hdnIdPrograma').val(data.nombre);
			},
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'PROGRAMAS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('hideCol',"descripcion");
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
		
		
 		$('#vergrafico').button();
 		  
	    $('#example_filter input').focus(function(){
	    	$('#alertaCragaDatos').addClass('ocultar');
	    	$('#hdnIdPrograma').val('');
	    });
	    
	    
      	$('#vergrafico').click(function(){
      		
      			$('#chartdiv').html('');
				$('#alertaCragaDatos').addClass('ocultar');
				
      			var nombrePrograma = $('#hdnIdPrograma').val();

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
	
	$('#masVotadosPreguntasPorEncuestas').click(function(){
		
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