
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
		
		$('#contenido').html("<div id='chartdiv' style='height:400px;width:500px; '></div>");
		
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
	})
	// ****************** Inicio todo ************************* //
	
	// Acordion 
	
	$( "#accordion" ).accordion({
		autoHeight: true,
		navigation: true,
		collapsible: true
	});
	
	$( "#accordion" ).accordion( "option", "active", false );

}); // Fin ready 