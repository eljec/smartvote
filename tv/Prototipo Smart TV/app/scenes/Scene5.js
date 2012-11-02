function SceneScene5(options) {
	this.options = options;
	this.chkIdentificador;
	this.listo;
	this.configuracionAvisos;
	this.configuracionIdentificadorUnico;
	this.estaMarcadoAvisos;
	this.estaMarcadoIdentificador;
	this.btnIniciar;
}

function respuestaPopUp(data)
{
	if(data)
	{
		$.sfScene.hide('Scene5');
		$.sfScene.show('Scene2');
		$.sfScene.focus('Scene2');
	}
}

SceneScene5.prototype.initialize = function () {
	alert("SceneScene5.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#lbTituloConfiguracion').sfLabel({text:'Configuraciòn', width:'340px'});
	$('#lbModoLpgueo').sfLabel({text:'Identificador Unico', width:'380px'});
	$('#imagenConfiguracion').sfImage({src:'images/configuracion2.jpg'});
	$('#checkIdentificador').sfCheckBox('focus');
	$('#checkAvisos').sfCheckBox();
	$('#lbAVisos').sfLabel({text:'Habilitar avisos', width:'380px'});
	$('#btnIniciarPantallaConf').sfButton({text:'Guardar Configuracion e Iniciar', width:'150px'});
		
}




SceneScene5.prototype.handleShow = function () {
	alert("SceneScene5.handleShow()");
	// this function will be called when the scene manager show this scene 
	
	$('#lbTituloConfiguracion').sfLabel({text:'Configuraciòn', width:'340px'});
	$('#lbModoLpgueo').sfLabel({text:'Identificador Unico', width:'380px'});
	$('#imagenConfiguracion').sfImage({src:'images/configuracion2.jpg'});
	$('#checkIdentificador').sfCheckBox('focus');
	$('#checkAvisos').sfCheckBox();
	$('#lbAVisos').sfLabel({text:'Habilitar avisos', width:'380px'});
	$('#btnIniciarPantallaConf').sfButton({text:'Guardar Configuracion e Iniciar', width:'150px'});
	
	
	
}

SceneScene5.prototype.handleHide = function () {
	alert("SceneScene5.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene5.prototype.handleFocus = function () {
	alert("SceneScene5.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	this.chkIdentificador = true;
	this.listo = false;
	
	this.estaMarcadoAvisos=false;
	this.estaMarcadoIdentificador=false;
	
	this.btnIniciar=false;
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

			$('#btnIniciarPantallaConf').sfButton('blur');
			this.btnIniciar= false ;
			
			$('#checkIdentificador').sfCheckBox('focus');
			$('#checkAvisos').sfCheckBox('blur');
			this.chkIdentificador = true;
			
			break;
			
		case $.sfKey.RIGHT:
				$('#btnIniciarPantallaConf').sfButton('focus');
				this.btnIniciar = true;
			break;
			
		case $.sfKey.UP:
		
			if(this.btnIniciar==false)
			{
				if(!this.chkIdentificador)
				{
					$('#checkIdentificador').sfCheckBox('focus');
					$('#checkAvisos').sfCheckBox('blur');
					this.chkIdentificador = true;
				}
			}

			break;
		case $.sfKey.DOWN:
			
			if(this.btnIniciar==false)
			{
				if(this.chkIdentificador)
				{
					$('#checkIdentificador').sfCheckBox('blur');
					$('#checkAvisos').sfCheckBox('focus');
					this.chkIdentificador = false;
				}
			}

			break;

		case $.sfKey.ENTER:
		
			if(this.btnIniciar)
			{
				if(this.estaMarcadoAvisos)
				{
					this.listo = true;				
				}
				else
				{
					if(this.estaMarcadoIdentificador)
					{
						this.listo = true ;
					}
					else
					{
						this.listo = false;
					}
				}
				
				
				if(this.listo)
				{
					$('#popUpAvisoConfiguracion').sfPopup({text:'Su configuracion fue guardada. Gracias.', num:'1', callback:'null'});
					$('#popUpAvisoConfiguracion').sfPopup('show');
					
					$.sfScene.hide('Scene5');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
					
				}
				else
				{
					$('#popUpConfiguracionConsulta').sfPopup({text:'No selecciono ninguna opcion,¿ esta seguro ?', num:'2', callback:respuestaPopUp});
					$('#popUpConfiguracionConsulta').sfPopup('show');
				}
			}
			else
			{
				if(this.chkIdentificador)
				{
					if(!this.estaMarcadoIdentificador)
					{
						$('#checkIdentificador').sfCheckBox('check');
						this.configuracionIdentificadorUnico = true;
						this.estaMarcadoIdentificador = true;
					}
					else
					{
						$('#checkIdentificador').sfCheckBox('uncheck');
						this.configuracionIdentificadorUnico = false;
						this.estaMarcadoIdentificador=false;
					}
				}
				else
				{
					if(!this.estaMarcadoAvisos)
					{
						$('#checkAvisos').sfCheckBox('check');
						this.configuracionAvisos=true;
						this.estaMarcadoAvisos = true;
					}
					else
					{
						$('#checkAvisos').sfCheckBox('uncheck');
						this.configuracionAvisos=false;
						this.estaMarcadoAvisos = false;
					}	
				}
			}
			
			break;
	}
}
