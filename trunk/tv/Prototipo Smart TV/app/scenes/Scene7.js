function SceneScene7(options) {
	this.options = options;
	
	this.botonVolver; 
	this.configuro;
	this.variableConfvarLocal;
	this.error;
	
	this.no;
	this.si;
	
	this.primeraVez;
	
	this.EncuestaS;
}

function graficoConIdentificador(idEncuesta,primeravez)
{
		var ema = 1;
	
		$.ajax({
				type: "POST",
				async:true,
				url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
				data:{tipo:'grafico',de:'preguntas',id_e: idEncuesta},
				dataType: "json",
				success: function(data){				

					var datos = data.datosgrafico;
				 
					var cantidad = datos.length;
		
					if(cantidad == 0)
					{
						$('#cargaGrafico').sfLoading('hide');
						
						this.error="Upss Vuelva a intentarlo...";
					
						$('#popErrorG').sfPopup({text:this.error, num:'1', callback:null});
						$('#popErrorG').sfPopup('show');
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
					
						var ema = this.primeraVez;
						
					
						$('#svecImage_4PVJ').sfImage('hide');
				
						$('#defaultChart').removeClass('ocultar');
					
						if(primeravez)
						{
							$('#defaultChart').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
									dataLabels: ['SI', 'NO'], 
									extension: {chdl: 'SI|NO'}
							});
							
							$('#cargaGrafico').sfLoading('hide');
						}
						else
						{
							var data2 = [$.gchart.series('Encuesta', [SI, NO])]; 
							
							$('#defaultChart').gchart('change', {series:data2});
							
							$('#cargaGrafico').sfLoading('hide');
						}
						
					}
				},
				error:function(jqXHR, textStatus, errorThrown){

					$('#cargaGrafico').sfLoading('hide');
					
					this.error="Ocurrio un ERROR: ";
					
					if (jqXHR.status === 0) {
						this.error=this.error + '\nVerifique su conexiòn a Internet.';
					} else {
						this.error= this.error + "\nIntentelo mas tarde.Gracias."
					}
					
					$('#popErrorG').sfPopup({text:this.error, num:'1', callback:'null'});
					$('#popErrorG').sfPopup('show');
					
					// Oculto el Grafico y Pongo la Imagen de Nuevo //
				}
		});
}

SceneScene7.prototype.initialize = function () {
	alert("SceneScene7.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#btnVolverVotar').sfButton({text:'Volver a Votar', width:'170px'});
	$('#btnGrafico').sfButton({text:'Ver Grafico', width:'170px'});
	$('#lbTituloPaginaOK').sfLabel({text:'Felicitaciones !! ', width:'370px'});
	$('#lbDescripcionPaginaOK').sfLabel({text:'Tus votos fueron cargados correctamente', width:'580px'});
	$('#svecImage_4PVJ').sfImage({src:'images/ok.jpg'});
	
	this.botonVolver = true;
	this.no=0;
	this.si=0;
	
	this.primeraVez=true;
	
	$('#btnVolverVotar').sfButton('focus');

	$('#cargaGrafico').sfLoading();
}




SceneScene7.prototype.handleShow = function () {
	alert("SceneScene7.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene7.prototype.handleHide = function () {
	alert("SceneScene7.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene7.prototype.handleFocus = function () {
	alert("SceneScene7.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	// Aca pongo la Imagen y oculto el panel de grafico y pongo foco en el boton vovler 
	
	this.botonVolver = true;
	$('#btnVolverVotar').sfButton('focus');
	
	$('#svecImage_4PVJ').sfImage('show');
				
	$('#defaultChart').addClass('ocultar');
	
	// Tomo los datos de la escena de encustas 
	
	var VariablesEscena3 = $.sfScene.get('Scene3');
	this.EncuestaS = VariablesEscena3.EncuestaSeleccionada;
}

SceneScene7.prototype.handleBlur = function () {
	alert("SceneScene7.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
	
}

SceneScene7.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene7.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			
			if(this.botonVolver == false)
			{
				$('#btnGrafico').sfButton('blur');
				$('#btnVolverVotar').sfButton('focus');
				this.botonVolver = true;
			}
			
			break;
		case $.sfKey.RIGHT:
			
			if(this.botonVolver == true)
			{
				$('#btnVolverVotar').sfButton('blur');
				$('#btnGrafico').sfButton('focus');
				this.botonVolver = false;
			}
			
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;

		case $.sfKey.ENTER:
			
			if(this.botonVolver)
			{
				$.sfScene.hide('Scene7');
				$.sfScene.show('Scene1');
				$.sfScene.focus('Scene1');
			}
			else
			{
				$('#cargaGrafico').sfLoading('show');
				
				var idE = this.EncuestaS.getId();
				
				graficoConIdentificador(idE,this.primeraVez);
				
				//graficoConIdentificador(3,this.primeraVez);
				
				this.primeraVez = false;
			}
			
			break;
	}
}