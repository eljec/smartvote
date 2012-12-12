function SceneScene9(options) {
	this.options = options;
	
	this.btnMac;
	this.btnID;
	this.btnTIPO_CON;
}

SceneScene9.prototype.initialize = function () {
	alert("SceneScene9.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#btn_Mac').sfButton({text:'Dirección MAC', width:'150px'});
	$('#btn_TipoConeccion').sfButton({text:'Tipo Conección', width:'160px'});
	$('#btn_ID_TV').sfButton({text:'ID TV', width:'140px'});
	$('#hlpBar_test').sfKeyHelp({'LEFTRIGHT':'Moverse entre botones','ENTER':'Enter','INFO':'Informacion del Sistema','return':'Rregresar al Hub'});
	$('#img_test').sfImage({src:'images/engranajes.jpg'});
	$('#lb_tiutlo_test').sfLabel({text:'TEST', width:'720px'});
	$('#lb_resultado_test').sfLabel({text:'Resultado:.', width:'480px'});
	
	this.btnMac = true;
}




SceneScene9.prototype.handleShow = function () {
	alert("SceneScene9.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene9.prototype.handleHide = function () {
	alert("SceneScene9.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene9.prototype.handleFocus = function () {
	alert("SceneScene9.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	$('#btn_Mac').sfButton('focus');
	this.btnMac = true;
}

SceneScene9.prototype.handleBlur = function () {
	alert("SceneScene9.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene9.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene9.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			
			if(this.btnTIPO_CON)
			{
				$('#btn_Mac').sfButton('focus');
				$('#btn_ID_TV').sfButton('blur');
				$('#btn_TipoConeccion').sfButton('blur');
				
				this.btnMac = true;
				this.btnID = false;
				this.btnTIPO_CON = false;
			}
			
			if(this.btnID)
			{
				$('#btn_Mac').sfButton('blur');
				$('#btn_ID_TV').sfButton('blur');
				$('#btn_TipoConeccion').sfButton('focus');
				
				this.btnMac = false;
				this.btnID = false;
				this.btnTIPO_CON = true;
			}
			
			break;
		case $.sfKey.RIGHT:
			
			if(this.btnTIPO_CON)
			{
				$('#btn_Mac').sfButton('blur');
				$('#btn_ID_TV').sfButton('focus');
				$('#btn_TipoConeccion').sfButton('blur');
				
				this.btnMac = false;
				this.btnID = true;
				this.btnTIPO_CON = false;
			}
			
			if(this.btnMac)
			{
				$('#btn_Mac').sfButton('blur');
				$('#btn_ID_TV').sfButton('blur');
				$('#btn_TipoConeccion').sfButton('focus');
				
				this.btnMac = false;
				this.btnID = false;
				this.btnTIPO_CON = true;
			}
			
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;

		case $.sfKey.ENTER:
			
			var texto= ""; 
			
			var pluginNetWork_JS = document.getElementById("pluginNetWork");

			if(this.btnTIPO_CON)
			{
				texto = 'Tipo Conexión: ';
				
				var cType = pluginNetWork_JS.GetActiveType();
				
				switch(cType)
				{
					case 1:
						texto = texto + "wired";
						break;
					case 0:
						texto = texto + "wireless";
						break;
					case -1:
						texto = texto +"no active connection";
						break;
					default:
						texto = texto + "NO tiene, esta en emulador";
						break;
				}
				
			}
			else
			{
				if(this.btnID)
				{
					texto = 'ID TV : ';

					var ip = getSerialNumberTV();
						
					texto = texto + ip;
				}
				else
				{
					texto = 'MAC: ';
					
					var mac = getMACaddress();
						
					texto = texto + mac;
				}
			}
			
			$('#lb_resultado_test').text(texto);
			
			break;
			
			case $.sfKey.RETURN:
				$.sf.exit(false);
			break;
	}
}
