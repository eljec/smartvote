function SceneScene1(options) {
	this.options = options;
	this.btnIniciar;
	

}

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#lbTituloSistema').sfLabel({text:'Smart Vote', width:'320px'});
	$('#B_CargaProgramas').sfButton({text:'Iniciar', width:'109px'});
    $('#B_CargaProgramas').sfButton('focus');
	$('#btnPresentacion').sfButton({text:'Configuración', width:'122px'});
	$('#logo').sfImage({src:'images/logoTV.png'});
	$('#helpBar').sfKeyHelp({'return':'Return'});
	
	this.btnIniciar = true;
	
	
}




SceneScene1.prototype.handleShow = function () {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
	
		case $.sfKey.LEFT:
			
			if(!this.btnIniciar)
			{
				$('#B_CargaProgramas').sfButton('focus');
				$('#btnPresentacion').sfButton('blur');
				this.btnIniciar = true;
			}

			break;
		case $.sfKey.RIGHT:
			
			if(this.btnIniciar)
			{
				$('#B_CargaProgramas').sfButton('blur');
				$('#btnPresentacion').sfButton('focus');
				this.btnIniciar = false;
			}

			break;

		case $.sfKey.ENTER:
		
			if(this.btnIniciar)
			{
				$.sfScene.hide('Scene1');
				$.sfScene.show('Scene2');
				$.sfScene.focus('Scene2');
			}
			else
			{
				$.sfScene.hide('Scene1');
				$.sfScene.show('Scene5');
				$.sfScene.focus('Scene5');
			}

		break;
	}
}

//"http://75.126.62.178/~jemac/json.txt"