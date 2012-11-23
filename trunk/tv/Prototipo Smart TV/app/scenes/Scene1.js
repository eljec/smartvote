function SceneScene1(options) {
	this.options = options;
	this.btnIniciar;
	this.configuracion;
	

}

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	
	// Se llama cuando se Crea por Primera Vez--Nada Mas  
	
	$('#lbTituloSistema').sfLabel({text:'Smart Vote', width:'320px'});
	$('#B_CargaProgramas').sfButton({text:'Iniciar', width:'109px'});
	$('#btnPresentacion').sfButton({text:'Configuración', width:'122px'});
	$('#logo').sfImage({src:'images/logoTV.png'});
	$('#helpBar').sfKeyHelp({'return':'Return'});
	
	//this.btnIniciar = true;
	
	
}

SceneScene1.prototype.handleShow = function () {
	alert("SceneScene1.handleShow()");
	
	// Se llama cuando se hace Foco, a als cosas que pongo o defino aca se les ejecuta su metodo show.
}

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	this.btnIniciar = true;
	$('#B_CargaProgramas').sfButton('focus');
	$('#btnPresentacion').sfButton('blur');
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
				
				this.configuracion = false;
			}
			else
			{
				$.sfScene.hide('Scene1');
				//$.sfScene.show('Scene5');
				//$.sfScene.focus('Scene5');
				
				$.sfScene.show('Scene8');
				$.sfScene.focus('Scene8');
				
				this.configuracion = true;
			}

		break;
	}
}

//"http://75.126.62.178/~jemac/json.txt"