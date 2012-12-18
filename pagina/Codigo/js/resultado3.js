




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
					  
			$("#"+id_padre+" div").css("margin-left", ($("#"+id_padre).width() - $("#"+id_padre+" div").width()) / 2);
		}
		else
		{
			// Muestro alerta //
			
			$("#chartdiv" + idGrafico).html('<strong> NO hay votos para esta encuesta.</strong>');
		}
		
	}
	
	function ajaxSuccessGraficoGral(data)
	{
			$('#contenido').html("<h3>Gráfico general</h3><div id='chartdiv' style='height:300px;width:600px; '></div>");
			
			$('#chartdiv').html('');
	
			var datos = data.datosgrafico;
			 
			var cantidad = datos.length;
			
			if(cantidad == 0)
			{
				// Muetro alertas de que no hay programas con ese nombre //
				
  				$('#alertaCragaDatos').html('<strong>No se ha votado ninguna de sus encustas o No tiene encuestas cargadas aun.</strong>');
  				$('#alertaCragaDatos').removeClass('ocultar');
			}	
			else
			{
				
				var datosAux = Morris_Barras(datos);
				Morris.Bar({
						  element: 'chartdiv',
						  data: datosAux,
						  xkey: 'y',
						  ykeys: ['a'],
						  labels: ['Votos']
						});
			}	
	}
	
	function ajaxSuccessGraficoXPregunta(data)
	{
			
			var datos = data.encuestas;
			 
			var cantidad = datos.length;
			
			if(cantidad == 0)
			{
				
  				$('#alertaCragaDatos').html('<strong>No se ha votado ninguna de sus encustas</strong>');
  				$('#alertaCragaDatos').removeClass('ocultar');
  				
  				$('#contenido').html('');
			}	
			
			else
			{
				
				
				$('#contenido').html('<table style="width: 100%;"><tr><td style="width: 20px;"><h3>Encuestas</h3><ul class="nav nav-pills nav-stacked"  id="listaPregunta" style="width: 250px; height: 200px; overflow: auto"></ul></td><td style="text-align: center;"><h3>Preguntas</h3><div id="contenidoTabla" align="center"><br><table cellpadding="0" cellspacing="0" border="0" class="display" id="example" style="width: 100%;"></table></div></td></tr></table>');
			
				$('#listaPregunta').html('');
				
				// LLeno la lista 
				
				var opciones ="";
				
				for(var i=0;i<data.encuestas.length;i++)
				{
					 
					opciones = opciones + '<li></i> <a id="'+data.encuestas[i].id+'" href="#">'+data.encuestas[i].nombre+'</a></li>';
				}
				
				$('#listaPregunta').html(opciones);
				
				
				$('#listaPregunta a').click(function() {
					
					$('#alertaCragaDatos').addClass('ocultar');
					
					var idEncuesta = $(this).attr("id");
					
					$('#hdnIdEncuesta').val(idEncuesta);
					
					$('#contenidoTabla').html(cssLoading());
  						
  					var idPrograma = $('#hdnIdPrograma').val();
  					
  					var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
						$('#contenidoTabla').html(stringTabla);
						
						$("#tablaContenido").jqGrid({
							url:'phpHelper/SmartVoteServices.php?action=3&paged=1&id_p='+ idPrograma+'&id_e='+idEncuesta ,
							datatype: 'json',
							mtype: 'GET',
							colNames:['DESCRIPCION','ORDEN'],
							colModel:[
								{name:'descripcion', editable: true, index:'descripcion', align:"center",width:400, search:false},
								{name:'orden', editable: true, index:'orden',align:"center", width:100}
							],
							subGrid: true,
				           	subGridRowExpanded: function (subgrid_id, row_id) {
				           		
				           			var data =  jQuery('#tablaContenido').jqGrid('getRowData',row_id);

				           		  	var retorno = "<div align='center' id='chartdiv"+data.orden+"'><img src='img/gifBarrasLoading.gif'/></div>";
									
									var indice = data.orden;
									
									var idLimpio = $('#hdnIdEncuesta').val();
									
									$('#hdnIdGrafico').val(data.orden);
									
									$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'preguntas',id_e: idLimpio,indice: indice},ajaxSuccessGraficoPreguntas,"json").error(function()
									{
										var idGrafico = $('#hdnIdGrafico').val();
							
										$("#chartdiv" + idGrafico).html('<strong> ERROR, Intentelo mas tarde </strong>');
										$("#chartdiv" + idGrafico).css("background-color","#A60000");
										$("#chartdiv" + idGrafico).css("color","white");
										
									});
									
									$("#" + subgrid_id).html(retorno);
									
				           	},
				           	loadError: function (jqXHR, textStatus, errorThrown) {
				           			$("#tablaContenido").html("<div align='center'><strong>Ocurrio un Error, intentelo mas tarde.</strong></di>")
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
	
	function gifLoading()
	{
		 var icno = '<img src="img/gifBarrasLoading.gif"/>';
		 return icno;
	}
	
	
	// Click sobre las Opciones //
	
	// Mis Encuestas 
	
	// Activas:
	
	$('#misEncuestasActivas').click(function(){
		
		$('#contenido').html(cssLoading());
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var idPrograma = $('#hdnIdPrograma').val();
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=2&paged=1&activos=true&id_p='+ idPrograma ,
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
           		  
           		 $("#" + subgrid_id).html("<div><strong>Descripcion:</strong> "+data.descripcion+"<div>");
           		 
           		 $("#" + subgrid_id).css("text-align","left");
           		 
           		 $("#" + subgrid_id).css("word-wrap","break-word");
           	},
           	loadError: function (jqXHR, textStatus, errorThrown) {
           			$("#tablaContenido").html("<div align='center'><strong>Ocurrio un Error, intentelo mas tarde.</strong></di>")
           	},
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'ENCUESTAS ACTIVAS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('hideCol',"descripcion");
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
		
	});
	
	// Inactivas:
	
	$('#misEncuestasInactivas').click(function(){
		
		$('#contenido').html(cssLoading());
		
		$('#alertaCragaDatos').addClass('ocultar');
		
		var idPrograma = $('#hdnIdPrograma').val();
		
		var stringTabla = "<table id='tablaContenido' align='center'></table><div id='paginacion'></div>";
		$('#contenido').html(stringTabla);
		
		$("#tablaContenido").jqGrid({
			url:'phpHelper/SmartVoteServices.php?action=2&paged=1&activos=false&id_p='+ idPrograma ,
			datatype: 'json',
			mtype: 'GET',
			colNames:['NOMBRE','FECHA INICIO','FECHA FIN','NOMBRE PROGRAMA'],
			colModel:[
				{name:'nombre', editable: true, index:'nombre', width:200,resizable:true, sortable:true},
				{name:'fecha_inicio', editable: true, index:'fecha_inicio', width:000, search:false},
				{name:'fecha_fin', editable: true, index:'fecha_fin', width:200, search:false},
				{name:'nombrep', editable: true, index:'nombrep', width:300}
			],
			loadError: function (jqXHR, textStatus, errorThrown) {
           			$("#tablaContenido").html("<div align='center'><strong>Ocurrio un Error, intentelo mas tarde.</strong></di>")
           	},
			pager: '#paginacion',
			rowNum:5,
			rowList:[5,10],
			sortname: 'id',
			sortorder: 'asc',
			viewrecords: true,
			caption: 'ENCUESTAS INACTIVOS',
			width:700
		});
		
		jQuery("#tablaContenido").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});

	});
	
	// Grafico Gral
	
	$('#graficoGral').click(function(){
		
		//$('#contenido').html(cssLoading());
		
		$('#contenido').html("<img src='img/gifBarrasLoading.gif'/>");
				
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
			
			$.post("phpHelper/SmartVoteServices.php",{tipo:'grafico',de:'encuestas',nombreP: nombrePrograma} ,ajaxSuccessGraficoGral,"json").error(function(){
				$('#contenido').html('');
				$('#alertaCragaDatos').removeClass('ocultar');
			});
		}	
	});
	
	// Grafico por Pregunta 
	
	$('#graficoXPregunta').click(function(){
				
			// Le muestro una lista con las encuestas //
			
			//$('#contenido').html(cssLoading());
		
			$('#contenido').html("<img src='img/gifBarrasLoading.gif'/>");
			
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

				$.getJSON('phpHelper/SmartVoteServices.php?action=2&paged=0&id_p='+idPrograma,ajaxSuccessGraficoXPregunta,"json").error(function(){
					$('#alertaCragaDatos').html('<strong>ERROR, intentelo mas tarde.');
					$('#alertaCragaDatos').removeClass('ocultar');
					$('#contenido').html('');
				});
			}	
		
		
		});
	
	// Inicializar 
	
	$('.label-important').addClass('ocultar');
	
	// Boton Logon 
	
	$('#btnLogOn').click(function(){
		
		$('.gifLoading').show();
	
		$.post("phpHelper/nologin.php",successLogon, "json").error(errorLogon);
	
	});	
	
});