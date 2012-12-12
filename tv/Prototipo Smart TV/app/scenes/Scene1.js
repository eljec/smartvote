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
	$('#btnTest').sfButton({text:'Test', width:'122px'});
	$('#logo').sfImage({src:'images/logoTV.png'});
	$('#helpBar').sfKeyHelp({'LEFTRIGHT':'Moverse entre botones','ENTER':'Enter','return':'Rregresar al Hub'});

	$('#popUp_regresar').sfPopup({text:'¿ Seguro desea salir de la aplicación y regresar al Hub ?', num:'2', callback:function(data){
		if(data)
		{
			$.sf.exit(false);
		}	
	}});
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
	$('#btnTest').sfButton('blur');
	
	$('#btnTest').sfButton({text:'Ayuda'});
	
	//$('#lbTituloSistema').sfLabel({text:''});
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
				$('#btnTest').sfButton('blur');
				this.btnIniciar = true;
			}

			break;
		case $.sfKey.RIGHT:
			
			if(this.btnIniciar)
			{
				$('#B_CargaProgramas').sfButton('blur');
				$('#btnTest').sfButton('focus');
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
				$.sfScene.show('Scene9');
				$.sfScene.focus('Scene9');
				
				//$.sfScene.show('Scene7');
				//$.sfScene.focus('Scene7');
				
				this.configuracion = true;
			}

		break;
		
		case $.sfKey.RETURN:
			$.sf.exit(false);
			//$('#popUp_regresar').sfPopup('show');
		break;
	}
}

//"http://75.126.62.178/~jemac/json.txt"