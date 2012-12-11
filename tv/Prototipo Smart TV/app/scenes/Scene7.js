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
	
	this.idE;
}

SceneScene7.prototype.initialize = function () {
	alert("SceneScene7.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#btnVolverVotar').sfButton({text:'Votar otra encuesta', width:'170px'});
	$('#btnGrafico').sfButton({text:'Ver Grafico', width:'170px'});
	$('#lbTituloPaginaOK').sfLabel({text:'Felicitaciones !! ', width:'370px'});
	$('#lbDescripcionPaginaOK').sfLabel({text:'Tus votos fueron cargados correctamente', width:'580px'});
	$('#svecImage_4PVJ').sfImage({src:'images/ok.png'});
	
	this.botonVolver = true;
	this.no=0;
	this.si=0;
	
	this.primeraVez=true;
	
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
	
	// Aca pongo la Imagen y oculto el panel de grafico y pongo foco en el boton vovler 
	
	this.botonVolver = true;
	
	$('#btnVolverVotar').sfButton('focus');
	
	$('#svecImage_4PVJ').sfImage('show');
				
	$('#defaultChart').addClass('ocultar');
	
	// Tomo los datos de la escena de encustas 
	
	var VariablesEscena3 = $.sfScene.get('Scene3');
	this.EncuestaS = VariablesEscena3.EncuestaSeleccionada;
	
	this.idE = this.EncuestaS.getId();
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

				/*var idE = this.EncuestaS.getId();
				
				graficoConIdentificador(idE,this.primeraVez);
				
				//graficoConIdentificador(3,this.primeraVez);
				
				this.primeraVez = false;*/
				
				$.sfScene.hide('Scene7');
				$.sfScene.show('Scene8');
				$.sfScene.focus('Scene8');
			}
			
			break;
	}
}
