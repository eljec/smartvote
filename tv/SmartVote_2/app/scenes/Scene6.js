function SceneScene6(options) {
	this.options = options;
	this.listaVideos;
	this.urlVideos;
	

}

SceneScene6.prototype.initialize = function () {
	alert("SceneScene6.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	var data = [
			'¿ Como votar una encuesta ?',
			'¿ Como ver gráfico ? opción 1',
			'¿ Como ver gráfico ? opción 2'
	];
	
	this.listaVideos = data;
	
	var url = [
			'http://www.tesiscastillo.com.ar/smartvote/videos/VotarEncuesta.mp4',
			'http://www.tesiscastillo.com.ar/smartvote/videos/VerGrafico_opcion1.mp4',
			'http://www.tesiscastillo.com.ar/smartvote/videos/VerGrafico_opcion2.mp4'
			];
	
	this.urlVideos = url;
	
	$('#Titulo_I').sfLabel({text:'Instrucciones ', width:'190px'});
	$('#lb_instruciones').sfLabel({text:'Seleccione un tutorial', width:'800px'});
	
	$('#lista_videos').sfList({data:data, index:'0', itemsPerPage:'3'});
	
	$('#pantalla_video').sfVideo2({urlMedia:'http://www.tesiscastillo.com.ar/VotarEncuesta.mp4', jumpSeconds:'0', idVideo2_controller:'controlador_video'});
	
	$('#controlador_video').sfVideo2_controller();
	
	$('#help_bar_ayuda').sfKeyHelp({'UPDOWN':'Moverse en la lista','RED':'Ir a Inicio','return':'Regresar al Hub'});
	
	
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

	$('#pantalla_video').sfVideo2('stop');
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
		
			var idx = $('#lista_videos').sfList('getIndex');
			if(idx == 0)
			   break;
			$('#lista_videos').sfList('prev');
			
			break;
		case $.sfKey.DOWN:
		
			var idx = $('#lista_videos').sfList('getIndex');
			if(idx == this.listaVideos.length )
			   break;
			$('#lista_videos').sfList('next');
			
			break;

		case $.sfKey.ENTER:
		
			// Paramos el video //
			
			$('#pantalla_video').sfVideo2('stop');
			
			// Obtenemos el index de la lista
			
			var seleccion = $('#lista_videos').sfList('getIndex');
			
			// Obtenemos la direccion del video 
			
			var urlVideo = this.urlVideos[seleccion];
			
			$('#pantalla_video').sfVideo2({urlMedia:urlVideo, jumpSeconds:'2', idVideo2_controller:'controlador_video'});
	
			$('#controlador_video').sfVideo2_controller();
			
			//$('#pantalla_video').sfVideo2('play');
			
			break;
			
		case $.sfKey.RETURN:
			$.sf.exit(false);
		break;
		
		case $.sfKey.RED:
		
			$('#popUp_aviso_videos').sfPopup({text:'¿ Desea regresar a la pantalla inicial ?', num:'2', callback:function(data){
				if(data)
				{
					$('#pantalla_video').sfVideo2('stop');
					
					$.sfScene.hide('Scene6');				
					$.sfScene.show('Scene1');
					$.sfScene.focus('Scene1');
				}
			}});	
			$('#popUp_aviso_videos').sfPopup('show');
		break;
		
		case $.sfKey.INFO:
		
			$.sf.setData('llamadaPaginaInfo', 'Scene6');
			
			$.sfScene.hide('Scene6');
			$.sfScene.show('Scene5');
			$.sfScene.focus('Scene5');
		
		break;
		
		default:
			$('#pantalla_video').sfVideo2('RCKeyDefined', keyCode);
	}
}
