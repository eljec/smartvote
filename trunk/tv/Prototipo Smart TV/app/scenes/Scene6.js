function SceneScene6(options) {
	this.options = options;
	this.EscenaPedido;
	

}

SceneScene6.prototype.initialize = function () {
	alert("SceneScene6.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#Titulo_I').sfLabel({text:'Instrucciones ', width:'190px'});
	$('#svecLabel_ZTZ3').sfLabel({text:'label', width:'410px'});
	
	
	
	var ScenneCall2 = $.sfScene.get('Scene2');
	
	//var ScenneCall3 = $.sfScene.get('Scene3');
	
	var call_S2 = ScenneCall2.llamadoPH_S2;
	
	//var call_S3 = ScenneCallllamadoPH_S3;
	
	if(call_S2 == true)
	{
	  this.EscenaPedido=2;
	  
	}
}




SceneScene6.prototype.handleShow = function () {
	alert("SceneScene6.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene6.prototype.handleHide = function () {
	alert("SceneScene6.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene6.prototype.handleFocus = function () {
	alert("SceneScene6.handleFocus()");
}

SceneScene6.prototype.handleBlur = function () {
	alert("SceneScene6.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene6.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene6.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	var esecenaRegreso;
	
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
		
		    if(this.EscenaPedido == 2)
			{
			      $.sfScene.hide('Scene6');
				  $.sfScene.show('Scene2');
				  $.sfScene.focus('Scene2');
			}
			break;
			
		case $.sfKey.RETURN:
			$.sf.exit(false);
		break;
	}
}