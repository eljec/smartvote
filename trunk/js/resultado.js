
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
		
		var data = [
				    ['SI', 12],['NO', 9]
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
	      legend: { show:true, location: 'e' },
	      title: {
        		text: 'Programas mas consultados',  
        		show: true,
    			}
	    }
	  );
	})
	
	$('#listadoEncuestas').click(function(){
		 
        /*$.getJSON("phpHelper/SmartVoteServices.php?action=1&paged=0'", function(data) {
        	
        	$('#contenido').html("<div class='ui-widget'><label for='programa'>Nombre del Programa: </label><input id='programa' /></div>");
        	
        	var ju = new Array();
        	
        	for(var i=0;i<data.programas.length;i++)
        	{
        		ju.push(data.programas[i].nombre);
        	}
        	
        	$( "#programa" ).autocomplete({
            source: ju
        	
        	});
   				
 		});*/
 		
 		$('#contenido').html("<div class='ui-widget'><label for='programa'>Nombre del Programa: </label><input id='programa' /></div>");
 		
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