function SceneScene4(options) {
	this.options = options;
	this.btnGuardar;
	

}

SceneScene4.prototype.initialize = function () {
	alert("SceneScene4.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#bntGuardar').sfButton({text:'Guardar Datos', width:'150px'});
	$('#btnVerGrafico').sfButton({text:'Grafico', width:'140px'});
	$('#svecImage_OHGE').sfImage({src:'images/images.jpg'});
	$('#blTitulo4').sfLabel({text:'Paso Final..', width:'240px'});
	
	$('#bntGuardar').sfButton('focus');
	this.btnGuardar=true;
}




SceneScene4.prototype.handleShow = function () {
	alert("SceneScene4.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene4.prototype.handleHide = function () {
	alert("SceneScene4.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene4.prototype.handleFocus = function () {
	alert("SceneScene4.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene4.prototype.handleBlur = function () {
	alert("SceneScene4.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene4.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene4.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:
			if(this.btnGuardar==true)
			{
			  /* esta sobre el botn guardar */
			  
			}
			else
			{
			   /* esta sobre el boton grafico */
			}
			break;
	}
}
