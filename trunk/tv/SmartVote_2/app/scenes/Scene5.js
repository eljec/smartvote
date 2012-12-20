function SceneScene5(options) {
	this.options = options;
	

}

SceneScene5.prototype.initialize = function () {
	alert("SceneScene5.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#lb_titulo_info_sistema').sfLabel({text:'Información del Sistema', width:'880px'});
	$('#texto_info_sistema').sfLabel({text:'', width:'660px'});
	$('#svecImage_J3C1').sfImage({src:'images/Imagen_informacion.png'});
	
	var texto = "<h2>SmartVote</h2>";
	
		texto = texto + "<p>Es una aplicación prototipo desarrollada para el Trabajo Final de grado de Julio Castillo.</p>";
		texto = texto +	"<p>El sistema tiene como principal objetivo permitir al usuario votar diferentes encuestas de sus programas favoritos, para lo cual";
		texto = texto +	" va navegando por las diferentes escenas que le presenta la aplicación  eligiendo  el programa y la encuesta que desea votar.</p>";
		texto = texto +	"<P>Las encuestas son cerradas y solo admiten las opciones de SI y NO. La votación se realiza mediante los botones ROJO y AZUL, del control remoto.</p>";
		texto = texto +	"<p>Además, el sistema permite la visualización de gráfico sobre la encuesta, mostrando los resultados de sus diferentes preguntas.</p>";
		texto = texto + "<p>Versión: 1.0</p>";
		texto = texto + "<p>Fecha: 20 -12 -2012</p>";
	
	$('#texto_info_sistema').css("font-size","12pt");
	
	$('#texto_info_sistema').html(texto);
	$('#helpBar_info').sfKeyHelp({'RED':'Ir a Inicio','LEFTRIGHT':'Regresar','return':'Regresar al Hub'});
	$('#pupUp-regreso_ayuda').sfPopup({text:'¿ Desea regresar a la pantalla inicial ?', num:'2', callback:function(data){
		if(data)
		{
			$.sfScene.hide('Scene5');
			$.sfScene.show('Scene1');
			$.sfScene.focus('Scene1');
		}
	}});
}




SceneScene5.prototype.handleShow = function () {
	alert("SceneScene5.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene5.prototype.handleHide = function () {
	alert("SceneScene5.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene5.prototype.handleFocus = function () {
	alert("SceneScene5.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene5.prototype.handleBlur = function () {
	alert("SceneScene5.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene5.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene5.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
		
				var idEscena = $.sf.getData('llamadaPaginaInfo');
				
				$.sfScene.hide('Scene5');
				$.sfScene.show(idEscena);
				$.sfScene.focus(idEscena);
				
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:
			break;
		case $.sfKey.RED:
			$('#pupUp-regreso_ayuda').sfPopup('show');
			break;
		
		
	}
}
