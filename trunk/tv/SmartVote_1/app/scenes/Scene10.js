function SceneScene10(options) {
	this.options = options;
	
	this.listaImagen_votar;
	this.listaImagen_verGrafico1;
	this.listaImagen_verGrafico2;
	
	this.listaImagen_usando;
	
	this.listaVideos;
	
	this.selecciono;
	this.numeroInstruccion;
	
	this.activo;
	
	this.TipoSeleccion;
}

function regreso(respuesta){
	if(respuesta)
	{
		$.sfScene.hide('Scene10');
		$.sfScene.show('Scene1');
		$.sfScene.focus('Scene1');
	}
}

SceneScene10.prototype.initialize = function () {
	alert("SceneScene10.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
		
	
	
	$('#lb_titurial_titulo').sfLabel({text:'Instrucciones', width:'130px'});
	$('#lb_lista_tutos').sfLabel({text:'Seleccione un tutorial', width:'310px'});
	
	$('#popUp_aviso_tuto').sfPopup({text:'Se termino el tutorial', num:'1', callback:'null'});

	$('#helBar_tuto').sfKeyHelp({'RED':'Ir a Inicio','INFO':'Info','return':'Regresar al Hub'});
	
	$('#popUpRetorno_menu_ayuda').sfPopup({text:'¿ Desea regresar a la pantalla inicial ?', num:'2', callback: regreso });
	
	$('#cargando_losta_tutoriales').sfLoading();
	
	
	this.selecciono = false;
	this.numeroInstruccion =0;
	
	this.listaImagen_usando = new Array();
}




SceneScene10.prototype.handleShow = function () {
	alert("SceneScenlb_lista_tutos()");
	// this function will be called when the scene manager show this scene 
}

SceneScene10.prototype.handleHide = function () {
	alert("SceneScene10.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene10.prototype.handleFocus = function () {
	alert("SceneScene10.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	this.activo = false;
	
	$('#cargando_losta_tutoriales').sfLoading('show');
	
	var listbox2_data3XY0GN =[
		'¿ Como votar ?','¿ Como ver gráfico-opcion 1 ?','¿ Como ver gráficos-opcion 2 ?'
	];
	
	this.listaVideos = listbox2_data3XY0GN;
	
	$('#lista_tutoriales').sfListbox2({data:listbox2_data3XY0GN, width:'200', height:'31', itemsPerPage:'3', horizontal:'false'});
	
	$('#cargando_losta_tutoriales').sfLoading('hide');
}

SceneScene10.prototype.handleBlur = function () {
	alert("SceneScene10.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene10.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene10.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:

			var idx = $('#lista_tutoriales').sfListbox2('getIndex');
			this.activo = true;
			if(idx == 0)
			   break;
			$('#lista_tutoriales').sfListbox2('prev');

			break;
			
		case $.sfKey.DOWN:

			var idx = $('#lista_tutoriales').sfListbox2('getIndex');
			this.activo = true;
			if(idx == (this.listaVideos.length))
			   break;
			$('#lista_tutoriales').sfListbox2('next');

			break;

		case $.sfKey.ENTER:
			
			if(this.activo)
			{
				var seleccion = $('#lista_tutoriales').sfListbox2('getIndex');

				if(seleccion == '0')
					this.TipoSeleccion = 'votar'; 
				else
					if(seleccion == '1')
						this.TipoSeleccion ='grafico1'; 
					else
						this.TipoSeleccion= 'grafico2';
						
				$.sfScene.hide('Scene10');
				$.sfScene.show('Scene11');
				$.sfScene.focus('Scene11');
			}
			else
			{
				$('#popUp_aviso_tuto').sfPopup({text:'Seleccione una opción', num:'1', callback:'null'});
				$('#popUp_aviso_tuto').sfPopup('show');
			}
			
			break;
			
			case $.sfKey.RED:
					$('#popUpRetorno_menu_ayuda').sfPopup('show');
				break;
			case $.sfKey.INFO:
		
				$.sf.setData('llamadaPaginaInfo', 'Scene10');
				
				$.sfScene.hide('Scene10');
				$.sfScene.show('Scene5');
				$.sfScene.focus('Scene5');
			
			break;
	}
}

