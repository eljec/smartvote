function SceneScene8(options) {
	this.options = options;
	
	this.si;
	this.no;
	
	this.error;
	
	this.idEncuestaSelect;
	
	this.EncuestaS;
}

function GraficoPregunta(idEncuesta,indice)
{
	var aux = 1;
	
	$.ajax({
			type: "POST",
			async:true,
			url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
			data:{tipo:'grafico',de:'preguntas',id_e: idEncuesta,indice:indice},
			dataType: "json",
			success: function(data){				

				var datos = data.votos;
				
				var cantidad = datos.length;
				
				// Guardo siguiente anterior en variables de la escena //

				if(data.anterior == null)
				{

					$('#anterior').val('0');
				}
				else					
				{
					$('#anterior').val(data.anterior);
				}
				
				if(data.siguiente == null)
				{
					
					$('#siguiente').val('0');
				}
				else					
				{
					$('#siguiente').val(data.siguiente);
				}
	
				if(cantidad == 0)
				{
					$('#CargandoGrafico').sfLoading('hide');
					
					this.error="Upss Vuelva a intentarlo...";
				
					$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:function(){
					
						$.sfScene.hide('Scene8');
						$.sfScene.show('Scene1');
						$.sfScene.focus('Scene1');
					
					}});
					$('#popUpErrorGraficoPregunta').sfPopup('show');
				}	
				else
				{
					// SI y NO 
				
					var SI = datos[0][1];
					var NO = datos[1][1];
				
					var total = SI + NO;

					this.si = (SI * 100)/total;
				
					this.no = 100-this.si;

					$('#lb_Desc_Pregunta').text("¿" + data.desc + "?");
					
					var dataGrafico = [$.gchart.series('Encuesta', [SI, NO],['blue','red'])]; 
					
					// Borro el viejo //
					
					$('#divGrafico').gchart('destroy')
					
					// Pinto el Nuevo //
					
					$('#divGrafico').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
						dataLabels: [this.si+"%", this.no+"%"], 
						extension: {chdl: 'SI|NO'}}); 
					
					$('#lb_contador_pregunta').sfLabel({text:'Pregunta '+ data.actual +" de "+data.total});
					
					$('#CargandoGrafico').sfLoading('hide');
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
			
				this.error="Ocurrio un ERROR: ";
				
				if (jqXHR.status === 0) {
					this.error=this.error + '\nVerifique su conexión a Internet';
				} else {
					this.error= this.error + "\nIntentelo mas tarde.Gracias."
				}
				
				$('#CargandoGrafico').sfLoading('hide');
				
				$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:function(){
				
					$.sfScene.hide('Scene8');
					$.sfScene.show('Scene1');
					$.sfScene.focus('Scene1');
				
				}});
				$('#popUpErrorGraficoPregunta').sfPopup('show');
			}
		});
}


SceneScene8.prototype.initialize = function () {
	alert("SceneScene8.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#lb_titulo_graficoPr').sfLabel({text:'Grafico Encuesta Por Pregunta', width:'880px'});
	$('#divGrafico').sfLabel({text:'', width:'590px'});
	$('#CargandoGrafico').sfLoading();
	$('#lb_Desc_Pregunta').sfLabel({text:'', width:'770px'});
	
	$('#popUpErrorGraficoPregunta').sfPopup({text:'', num:'1', callback:null});
	$('#help_bar_Grafico').sfKeyHelp({'LEFTRIGHT':'Pasar/Volver preguntas','INFO':'Info','return':'Regresar al Hub','RED':'Ir a Inicio'});
	$('#lb_contador_pregunta').sfLabel({text:'Pregunta', width:'320px'});
	$('#imagen_cargando_grafico').sfImage({src:'images/imagen_cargando.jpg'});
	
}




SceneScene8.prototype.handleShow = function () {
	alert("SceneScene8.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene8.prototype.handleHide = function () {
	alert("SceneScene8.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene8.prototype.handleFocus = function () {
	alert("SceneScene8.handleFocus()");
	// this function will be called when the scene manager focus this scene

	var VariablesEscena3 = $.sfScene.get('Scene3');
	this.EncuestaS = VariablesEscena3.EncuestaSeleccionada;
	
	var idEncuesta = this.EncuestaS.getId();
	
	this.idEncuestaSelect = idEncuesta;
	
	var indice = 1;
	
	var nombreEncuesta = this.EncuestaS.getNombre();
	
	$('#lb_titulo_graficoPr').sfLabel({text:'Grafico Encuesta Por Pregunta: ' + nombreEncuesta});
	
	$('#CargandoGrafico').sfLoading('show');
	
	$.ajax({
				type: "POST",
				async:true,
				url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
				data:{tipo:'grafico',de:'preguntas',id_e: idEncuesta,indice:indice},
				dataType: "json",
				success: function(data){				

					var datos = data.votos;
					
					var cantidad = datos.length;
					
					// Guardo siguiente anterior en variables de la escena //

					if(data.anterior == null)
					{

						$('#anterior').val('0');
					}
					else					
					{
						$('#anterior').val(data.anterior);
					}
					
					if(data.siguiente == null)
					{
						
						$('#siguiente').val('0');
					}
					else					
					{
						$('#siguiente').val(data.siguiente);
					}
		
					if(cantidad == 0)
					{
						$('#CargandoGrafico').sfLoading('hide');
						
						this.error="Upss Vuelva a intentarlo mas tarde...";
					
						$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:function(){
				
							$.sfScene.hide('Scene8');
							$.sfScene.show('Scene1');
							$.sfScene.focus('Scene1');
						
						}});
						$('#popUpErrorGraficoPregunta').sfPopup('show');
					}	
					else
					{
						// SI y NO 
					
						var SI = datos[0][1];
						var NO = datos[1][1];
					
						var total = SI + NO;

						this.si = (SI * 100)/total;
					
						this.no = 100-this.si;

						$('#lb_Desc_Pregunta').text("¿" + data.desc + "?");
						
						var dataGrafico = [$.gchart.series('Encuesta', [SI, NO],['blue','red'])]; 
	 
						$('#divGrafico').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
							dataLabels: [this.si+"%", this.no+"%"], 
							extension: {chdl: 'SI|NO'}}); 	
							
						$('#lb_contador_pregunta').sfLabel({text:'Pregunta '+ data.actual +" de "+data.total});
					}
					
					$('#CargandoGrafico').sfLoading('hide');
				},
				error:function(jqXHR, textStatus, errorThrown){
			
				this.error="Ocurrio un ERROR: ";
				
				if (jqXHR.status === 0) {
					this.error=this.error + '\nVerifique su conexión a Internet';
				} else {
					this.error= this.error + "\nIntentelo mas tarde.Gracias."
				}
				
				$('#CargandoGrafico').sfLoading('hide');
				
				$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:function(){
				
					$.sfScene.hide('Scene8');
					$.sfScene.show('Scene1');
					$.sfScene.focus('Scene1');
				
				}});
				$('#popUpErrorGraficoPregunta').sfPopup('show');
			}
		});
}

SceneScene8.prototype.handleBlur = function () {
	alert("SceneScene8.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene8.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene8.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	
	var idEncuesta = this.idEncuestaSelect;
	
	switch (keyCode) {
		case $.sfKey.LEFT:
			
			var anterior = $('#anterior').val();
			
			if(anterior == 0)
			{
				this.error="No hay mas preguntas..";
					
				$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:null});
				$('#popUpErrorGraficoPregunta').sfPopup('show');
			}
			else
			{
				$('#CargandoGrafico').sfLoading('show');
				GraficoPregunta(idEncuesta,anterior);
			}
			
			break;
		case $.sfKey.RIGHT:
			
			var siguiente = $('#siguiente').val();
			
			if(siguiente == 0)
			{
				this.error="No hay mas preguntas..";
					
				$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:null});
				$('#popUpErrorGraficoPregunta').sfPopup('show');
			}
			else
			{
				$('#CargandoGrafico').sfLoading('show');
				GraficoPregunta(idEncuesta,siguiente);
			}
			
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:
			break;
		case $.sfKey.RED:
		
			$('#popUp_regreso_grafico').sfPopup({text:'¿ Seguro desea regresar a la pantalla inicial ?', num:'2',callback:function(data){
			
				if(data)
				{
					$.sfScene.hide('Scene8');
					$.sfScene.show('Scene1');
					$.sfScene.focus('Scene1');
				}
			}});
			
			$('#popUp_regreso_grafico').sfPopup('show');
			break;
			
		case $.sfKey.RETURN:
			$.sf.exit(false);
		break;
		
		case $.sfKey.INFO:
		
			$.sf.setData('llamadaPaginaInfo', 'Scene8');
			
			$.sfScene.hide('Scene8');
			$.sfScene.show('Scene5');
			$.sfScene.focus('Scene5');
		
		break;
	}
}
