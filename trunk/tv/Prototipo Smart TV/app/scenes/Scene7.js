function SceneScene7(options) {
	this.options = options;
	
	this.botonVolver; 
	this.configuro;
	this.variableConfvarLocal;
	this.error;
	
	this.no;
	this.si;
	

}

function graficoConIdentificador(idEncuesta)
{
		var ema = 1;
	
		$.ajax({
			   type: "POST",
			   async:true,
			   url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
			   data:{tipo:'grafico',de:'preguntas',id_e: idEncuesta},
			   dataType: "json",
			   success: function(data)
			   {				

					var datos = data.datosgrafico;
				 
					var cantidad = datos.length;
		
					if(cantidad == 0)
					{
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
					
						
						$('#defaultChart').gchart({type: 'pie', series: dataGrafico, legend: 'right', 
							dataLabels: ['SI', 'NO'], 
							extension: {chdl: 'SI|NO'}});
					}
				} // Fin success
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
	
	$('#btnVolverVotar').sfButton('focus');
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
				$.sfScene.show('Scene2');
				$.sfScene.focus('Scene2');
			}
			else
			{
				$('#svecImage_4PVJ').sfImage('hide');
				$('#defaultChart').removeClass('ocultar');
				
				/* falta ver cuando apriete ver grafico por primera vez, 
				ya que si regresa se debe implementar el metodo change de grafico.
				 vamos bien*/
				 
				 
				graficoConIdentificador(3);
				
			}
			
			break;
	}
}
