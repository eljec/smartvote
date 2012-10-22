
$(document).ready(function() {

		
	// Click Listado de Programas 
	
	$('#listadoProgramas').click(function(){
	
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
		
		$('#contenido').html("<div id='chartdiv' style='height:400px;width:600px; '></div>");
		
		/*var data = [
				    ['SI', 12],['NO', 9]
				  ];*/
				 
	 	$.post("phpHelper/SmartVoteServices.php",{tipo:grafico,de:programas} ,function(data) {
   			
   			 
   			 
   			 var dataGraficoRenderer = function() {
			    var datosListos = [];
			    for (var i=0; i<data.datosgrafico.length; i+=0.5) {
			      datosListos.push([data.datosgrafico[i].nombre, data.datosgrafico[i].cantidad]);
			    }
			    return datosListos;
			  };
			 
			 
			   			
   			var plot1 = jQuery.jqplot ('chartdiv', [], 
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
			    			},
			    	 dataRenderer: dataGraficoRenderer
				    }
				  );
 		},"json");

	})
	
	$('#masVotadosEncuestas').click(function(){
		 
 		$('#contenido').html("<table id='graficoDos' style='width:100%;'><tr><td style='width:80%;'><div class='ui-widget'><label for='programa'>Nombre del Programa: </label><input class='inputLargo' id='programa' /></div></td><td style='width:20%;'><input type='button' value='Ver Grafico' id='vergrafico'/></td></tr></table> ");
 		
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
	                                value: item.nombre,
	                                key: item.id
	                            }
	                        }));
	                    }
	                });
	            },
	            select: function( event, ui ) {
               
                    alert(ui.item.key);	
              	}
	      });
	      
	      	$('#vergrafico').click(function(){
		
					$('#contenido').append("<div id='chartdiv' style='height:400px;width:600px; '></div>");
		
					alert('hola');
	  
			});
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