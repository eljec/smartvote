function SceneScene7(options) {
	this.options = options;
	

}

SceneScene7.prototype.initialize = function () {
	alert("SceneScene7.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
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
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;

		case $.sfKey.ENTER:
			break;
	}
}
