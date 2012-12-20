function SceneScene1(options) {
	this.options = options;
	this.btnIniciar;
	this.configuracion;
	
	this.error;
}


function buscarNuevasEncuestas()
{
	$.ajax({
		type:"GET",
		async:true,
		dataType:"json",
		url:"http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=9",
		success:function(data){
			 
			if(data.cantidad >0)
			{
				// Aviso que  hay nuevas encuestas
				
				$('#popUp_aviso_NE').sfPopup({text:'Se cargaron nuevas encuestas !!.Cantidad: '+data.cantidad, num:'1', callback:function(){
					
					$.sfScene.hide('Scene1');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
				
				}});
			}
			else
			{
				// Aviso que no hay nuevas encuestas
				
				$('#popUp_aviso_NE').sfPopup({text:'No hay nuevas encuestas cargadas.', num:'1', callback:function(){
					
					$.sfScene.hide('Scene1');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
				
				}});
			}
			
			$('#cargando_ver_NE').sfLoading('hide');
			
			$.sf.setData('aviso', '0');
			
			$('#popUp_aviso_NE').sfPopup('show');

		  }, // fin success
		error:function(jqXHR, textStatus, errorThrown){
		
			$.sf.setData('aviso', '0');
			
			$('#cargando_ver_NE').sfLoading('hide');

			if (jqXHR.status === 0) {
                this.error=this.error + '\n Verifique su Conexión a Internet .';
            } 
			else {
				this.error= this.error + "\n Ocurrio un error obteniendo los dato.Intentelo mas tarde.Gracias.";
            }

			$('#popUp_aviso_NE').sfPopup({text:this.error, num:'1', callback:function(){
			
				$.sfScene.hide('Scene1');
				$.sfScene.show('Scene2');
				$.sfScene.focus('Scene2');
			
			}});
			
			$('#popUp_aviso_NE').sfPopup('show');
	 }
	}); 

}

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	
	// Se llama cuando se Crea por Primera Vez--Nada Mas  
		
	$('#lbTituloSistema').sfLabel({text:'Smart Vote', width:'320px'});
	$('#B_CargaProgramas').sfButton({text:'Iniciar', width:'109px'});
	$('#btnTest').sfButton({text:'Ayuda', width:'122px'});
	$('#logo').sfImage({src:'images/logoTV.png'});
	$('#helpBar').sfKeyHelp({'LEFTRIGHT':'Moverse entre botones','ENTER':'Enter','return':'Rregresar al Hub'});

	$('#popUp_regresar').sfPopup({text:'¿ Seguro desea salir de la aplicación y regresar al Hub ?', num:'2', callback:function(data){
		if(data)
		{
			$.sf.exit(false);
		}	
	}});	
	
	$('#popUp_aviso_NE').sfPopup({text:'popup text', num:'1', callback:'null'});
	
	$('#cargando_ver_NE').sfLoading();
	
	$.sf.setData('aviso', '1');
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
	
	this.error = "";
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
				
				var aviso = $.sf.getData('aviso');
				
				if( aviso == '1')
				{
					$('#cargando_ver_NE').sfLoading('show');
					
					buscarNuevasEncuestas();
				}
				else
				{
					$.sfScene.hide('Scene1');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
				}
				
				
				this.configuracion = false;
			}
			else
			{
				$.sfScene.hide('Scene1');
				
				$.sfScene.show('Scene10');
				$.sfScene.focus('Scene10');
				
				this.configuracion = true;
			}

		break;
		
		case $.sfKey.RETURN:
			$.sf.exit(false);
		break;
	}
}

//"http://75.126.62.178/~jemac/json.txt"