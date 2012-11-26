
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
	
		$('#contenido').html("<div id='chartdiv' style='height:300px;width:600px; '></div>");
				
		var datos = data.datosgrafico;
 
		var datosAux = Morris_Barras(datos);
				Morris.Bar({
						  element: 'chartdiv',
						  data: datosAux,
						  xkey: 'y',
						  ykeys: ['a'],
						  labels: ['Votos']
						});
	}
	
	function ajaxSuccessMasVotadosEncuestas(data)
	{
		var idGrafico = $('#hdnIdPrograma').val();
		
		$("#chartdiv" + idGrafico).html('');
		
		var datos = data.datosgrafico;
			 
		var cantidad = datos.length;
		
		//var ema = $("#chartdiv" + idGrafico).parent();

		if(cantidad > 0)
		{
			// Le pongo el tamaño del div //
		
			$("#chartdiv" + idGrafico).css("height","300px");
			$("#chartdiv" + idGrafico).css("width","500px");
			
			 	var datosAux = Morris_Barras(datos);
				Morris.Bar({
						  element: 'chartdiv' + idGrafico,
						  data: datosAux,
						  xkey: 'y',
						  ykeys: ['a'],
						  labels: ['Votos']
						});
		}
		else
		{
			// Muestro alerta //
			
			$("#chartdiv" + idGrafico).html('<strong> NO hay votos para esta encuesta.</strong>');
		}
	}

	function ajaxSuccessComboProgramas(data)
	{
			$('#contenido').html("<table><tr><td style='width:310px'><div id='comboProgramas'></div></td><td style='width:50px'><div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div></td><td style='width:310px'><div id='comboEncuestas'></div></td></tr></table>");
			$('#contenido').append('<br><br><div id="contenidoTabla" align="center"><br><table cellpadding="0" cellspacing="0" border="0" class="display" id="example" style="width: 100%;"></table></div>');
			
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
				        
				        $('#hdnIdPrograma').val(idLimpio);
				        $('#contenidoTabla').html('');
				         
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
		
		var idGrafico = $('#hdnIdGrafico').val();
		
		$("#chartdiv" + idGrafico).html('');
		
		var datos = data.votos;
		
		var ema = $("#chartdiv" + idGrafico).parent();
		
		var id_padre = ema.attr("id");
		
		var cantidad = datos.length;
		
		if(cantidad > 0)
		{
			// Le pongo el tamaño del div //
		
			$("#chartdiv" + idGrafico).css("height","200px");
			$("#chartdiv" + idGrafico).css("width","200px");
			
			 	var datosAux = Morris_Donut_SINO(datos);
			 
				Morris.Donut({
					    element: 'chartdiv'+ idGrafico,
					    data: datosAux,
					    formatter: function (y) { return y + "%" },
					     colors: [
							      '#200772', // Color SI
							      '#A2000C'  // Color NO
							      ]
							   
							      
					  });
					  
			$("#"+id_padre+" div").css("margin-left", ($("#"+id_padre).width() - $("#"+id_padre+" div").width()) / 2)
		}
		else
		{
			// Muestro alerta //
			
			$("#chartdiv" + idGrafico).html('<strong> NO hay votos para esta encuesta.</strong>');
		}
	}
	
	function ListaPreguntas(id_encuesta)
	{
		
		 $('#gifLoading').hide();
		 
		var idEncuesta = id_encuesta;
					
		var idPrograma = $('#hdnIdPrograma').val();
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
			$('#contenidoTabla').html(stringTabla);
			
			$("#tablaContenido").jqGrid({
				url:'phpHelper/SmartVoteServices.php?action=3&paged=1&id_p='+ idPrograma+'&id_e='+idEncuesta ,
				datatype: 'json',
				mtype: 'GET',
				colNames:['DESCRIPCION','ORDEN'],
				colModel:[
					{name:'descripcion', editable: true, index:'descripcion', width:400, search:false},
					{name:'orden', editable: true, index:'orden',align:"center", width:100}
				],
				subGrid: true,
	           	subGridRowExpanded: function (subgrid_id, row_id) {
	           		
	           			var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);
	           			
	           		  	var retorno = "<div align='center' id='chartdiv"+data.orden+"'><img src='img/gifBarrasLoading.gif'/></div>";
						
						var indice = data.orden;
						
						var idLimpio = $('#hdnIdEncuesta').val();
						
						$('#hdnIdGrafico').val(data.orden);
						
						$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'preguntas',id_e: idLimpio,indice: indice},ajaxSuccessGraficoPreguntas,"json");
						
						$("#" + subgrid_id).html(retorno);
						
	           	},
				pager: '#paginacion',
				rowNum:2,
				rowList:[2,4,6,8,10],
				sortname: 'orden',
				sortorder: 'asc',
				viewrecords: true,
				caption: 'PREGUNTAS',
				width:630,
				height:'100%'
			});	
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
				    
				    $('#hdnIdEncuesta').val(idLimpio);
				    
				    $('#gifLoading').show();
				    
				    $('#contenidoTabla').html('');
				     
				    ListaPreguntas(idLimpio);
				    
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
			url:'phpHelper/SmartVoteServices.php?action=2&paged=1&activos=true',//&id_p=21',
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

		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		
		$('#contenido').html(stringTabla);
		//$('#contenido').append('<br><div align="center"><input type="button" value="Ver Grafico" id="vergrafico"/></div>');
 		$('#contenido').append("<div align='center'><img id='gifLoading'src='img/ajax-loaderBlanco.gif' style='display: none;' alt='Loading...'/></div>");
 		$('#contenido').append("<br><div id='chartdiv' style='height:400px;width:600px; '></div>");
 		
 		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=1&paged=1',
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','DESCRIPCION','USUARIO ASIGNADO','ESTADO'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:260,resizable:false, sortable:true},
				{name:'descripcion', editable: true, index:'descripcion', width:200,search:false},
				{name:'usuario', editable: true, index:'usuario', width:260,search:false,sortable:true},
				{name:'activo', editable: true, index:'activo', width:200,search:false,sortable:false}
			],
			subGrid: true,
           	subGridRowExpanded: function (subgrid_id, row_id) {
           		
           		var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);
	
				var retorno = "<div align='center' id='chartdiv"+row_id+"'><img src='img/gifBarrasLoading.gif'/></div>";
				
				$('#hdnIdPrograma').val(row_id);
				
				var nombrePrograma = data.nombre;
				
				$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'encuestas',nombreP: nombrePrograma} ,ajaxSuccessMasVotadosEncuestas,"json").error(ajaxErrorMasVotadosGeneral);
				
				$("#" + subgrid_id).html(retorno);
           	},          	
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'PROGRAMAS',
			width:700,
			height:'100%'
		});
		
		jQuery("#tablaContenido").jqGrid('hideCol',"descripcion");
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});

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