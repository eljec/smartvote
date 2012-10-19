
$(document).ready(function() {

		
	// Click Listado de Programas 
	
	$('#listadoProgramas').click(function(){
	
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/servicioEncuesta.php?action=1&paged=1',
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
	
	// ****************** Inicio todo ************************* //
	
	// Acordion 
	
	$( "#accordion" ).accordion({
		autoHeight: true,
		navigation: true,
		collapsible: true
	});
	
	$( "#accordion" ).accordion( "option", "active", false );

}); // Fin ready 