function SceneScene8(options) {
	this.options = options;
	
	this.no;
	this.si;
	
	this.primeraVez;
	
	this.idEncuesta;
	
	this.error;
	
	this.Anterior;
	this.Siguiente;
	

}

SceneScene8.prototype.initialize = function () {
	alert("SceneScene8.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#label_Titulo_Page_Grafico').sfLabel({text:'Gráfico Encuesta por pregunta', width:'940px'});

	$('#cargaGraficoPregunta').sfLoading();
	
	$('#popUpErrorGraficoPregunta').sfPopup({text:'popup text', num:'1', callback:null});
	$('#lb_Nombre_Pregunta').sfLabel({text:'label', width:'940px'});
	$('#lb_SI').sfLabel({text:'SI', width:'130px'});
	$('#lb_NO').sfLabel({text:'NO', width:'130px'});
	
	this.no=0;
	this.si=0;
	
	this.primeraVez=true;
	
	this.Anterior;
	this.Siguiente;
	
}

function TraerGraficoPregunta(idEncuesta,indice,primeravez)
{
		var ema = 1;
	
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
					
					var ema2 = data.anterior;
					
					var ema3 = data.siguiente;
					
					if(data.anterior == null)
					{
						//this.Anterior = null;
						
						$('#anterior').val('0');
					}
					else					
					{
						$('#anterior').val(data.anterior);
					}
					
					if(data.siguiente == null)
					{
						//this.Siguiente = null;
						
						$('#siguiente').val('0');
					}
					else					
					{
						$('#siguiente').val(data.siguiente);
					}
		
					if(cantidad == 0)
					{
						$('#cargaGraficoPregunta').sfLoading('hide');
						
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

						var dataGrafico = [$.gchart.series('Encuesta', [SI, NO])]; 
					
						//var ema = this.primeraVez;
				
						$('#defaultChart').removeClass('ocultar');
						
						$('#lb_Nombre_Pregunta').text("¿ " + data.desc + " ?");
						
						//if(primeravez)
						//{
							$('#defaultChart').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
									dataLabels: ['SI', 'NO'], 
									extension: {chdl: 'SI|NO'}
							});
							
							$('#cargaGraficoPregunta').sfLoading('hide');
						/*}
						else
						{
							var data2 = [$.gchart.series('Encuesta', [SI, NO])]; 
							
							$('#defaultChart').gchart('change', {series:data2});
							
							$('#cargaGraficoPregunta').sfLoading('hide');
						}*/
						
					}
				},
				error:function(jqXHR, textStatus, errorThrown){

					$('#cargaGraficoPregunta').sfLoading('hide');
					
					this.error="Ocurrio un ERROR: ";
					
					if (jqXHR.status === 0) {
						this.error=this.error + '\nVerifique su conexiòn a Internet.';
					} else {
						this.error= this.error + "\nIntentelo mas tarde.Gracias."
					}
					
					$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:'null'});
					$('#popUpErrorGraficoPregunta').sfPopup('show');
				}
		});
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
	
	//Traigo la primera Pregunta //
	
	$('#defaultChart').addClass('ocultar');
	
	$('#cargaGraficoPregunta').sfLoading('show');
	
	/*var VariablesEscena7 = $.sfScene.get('Scene7');
	this.idEncuesta = VariablesEscena7.idE;*/
	
	
	//TraerGraficoPregunta(3,1,this.primeraVez);
	
	//TraerGraficoPregunta(this.idEncuesta,1,this.primeraVez);
	
	var indice = 1;
	var idEncuesta = 3; //this.idEncuesta;
	
	var ju ="";
	
	$.ajax({
				type: "POST",
				async:true,
				//url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
				url: "http://localhost:8000/paginaSV/phpHelper/SmartVoteServices.php",
				
				data:{tipo:'grafico',de:'preguntas',id_e:idEncuesta,indice:indice},
				dataType: "json",
				success: function(data){				

					var datos = data.votos;
					
					var cantidad = datos.length;
					
					// Guardo siguiente anterior en variables de la escena //
					
					/*var ema2 = data.anterior;
					
					var ema3 = data.siguiente;*/
					
					if(data.anterior == null)
					{
						//this.Anterior = null;
						
						$('#anterior').val('0');
					}
					else					
					{
						$('#anterior').val(data.anterior);
					}
					
					if(data.siguiente == null)
					{
						//this.Siguiente = null;
						
						$('#siguiente').val('0');
					}
					else					
					{
						$('#siguiente').val(data.siguiente);
					}
		
					if(cantidad == 0)
					{
						$('#cargaGraficoPregunta').sfLoading('hide');
						
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

						var dataGrafico = [$.gchart.series('Encuesta', [SI, NO])]; 
					
						var primeraVez = this.primeraVez;
				
						$('#defaultChart').removeClass('ocultar');
						
						$('#lb_Nombre_Pregunta').text("¿ " + data.desc + " ?");
						
						
						$('#defaultChart').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
									dataLabels: ['SI', 'NO'], 
									extension: {chdl: 'SI|NO'}
							});
							
						$('#cargaGraficoPregunta').sfLoading('hide');						
					}
				},
				error:function(jqXHR, textStatus, errorThrown){

					$('#cargaGraficoPregunta').sfLoading('hide');
					
					this.error="Ocurrio un ERROR: ";
					
					if (jqXHR.status === 0) {
						this.error=this.error + '\nVerifique su conexiòn a Internet.';
					} else {
						this.error= this.error + "\nIntentelo mas tarde.Gracias."
					}
					
					$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:'null'});
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
	switch (keyCode) {
		case $.sfKey.LEFT:
		
			// Aalizo si Tiene Anterior //
			
			var anterior = $('#anterior').val();
			//var idE = this.EncuestaS.getId();
			
			if(anterior== '0')
			{
				this.error="No Hay mas Preguntas";
				$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:'null'});
				$('#popUpErrorGraficoPregunta').sfPopup('show');
			}
			else
			{
				this.primeraVez=false;
				$('#cargaGraficoPregunta').sfLoading('show');
				//TraerGraficoPregunta(idE,anterior,this.primeraVez);
			}
			break;
		case $.sfKey.RIGHT:
			
			var siguiente = $('#siguiente').val();
			//var idE = this.EncuestaS.getId();
			
			if(siguiente == '0')
			{
				this.error="No Hay mas Preguntas";
				$('#popUpErrorGraficoPregunta').sfPopup({text:this.error, num:'1', callback:'null'});
				$('#popUpErrorGraficoPregunta').sfPopup('show');
			}
			else
			{
				this.primeraVez=false;
				$('#cargaGraficoPregunta').sfLoading('show');
				//TraerGraficoPregunta(idE,siguiente,this.primeraVez);
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
