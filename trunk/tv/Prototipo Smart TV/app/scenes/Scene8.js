function SceneScene8(options) {
	this.options = options;
	
	this.si;
	this.no;
	
	this.error;
	
	this.idEncuestaSelect;
	
}

function GraficoPregunta(idEncuesta,indice)
{
	var aux = 1;
	
	$.ajax({
			type: "POST",
			async:true,
			url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
			//url: "http://localhost:8000/paginaSV/phpHelper/SmartVoteServices.php",
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
				
					$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:null});
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
					
					var dataGrafico = [$.gchart.series('Encuesta', [SI, NO])]; 
					
					// Borro el viejo //
					
					$('#divGrafico').gchart('destroy')
					
					// Pinto el Nuevo //
					
					$('#divGrafico').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
						dataLabels: [this.si+"%", this.no+"%"], 
						extension: {chdl: 'SI|NO'}}); 
					
					$('#CargandoGrafico').sfLoading('hide');
				}
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
	
	$('#popUpErrorGraficoPregunta').sfPopup({text:'popup text', num:'1', callback:null});
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
	
	var VariablesEscena7 = $.sfScene.get('Scene7');
	this.idEncuestaSelect = VariablesEscena7.idE;
	
	var idEncuesta = this.idEncuestaSelect;
	var indice = 1;
	
	$('#CargandoGrafico').sfLoading('show');
	
	$.ajax({
				type: "POST",
				async:true,
				url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
				//url: "http://localhost:8000/paginaSV/phpHelper/SmartVoteServices.php",
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
					
						$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:null});
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
						
						var dataGrafico = [$.gchart.series('Encuesta', [SI, NO])]; 
	 
						$('#divGrafico').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
							dataLabels: [this.si+"%", this.no+"%"], 
							extension: {chdl: 'SI|NO'}}); 							
					}
					
					$('#CargandoGrafico').sfLoading('hide');
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
	}
}
