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
}

SceneScene10.prototype.initialize = function () {
	alert("SceneScene10.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
		
	var listbox2_data3XY0GN =[
		'¿ Como votar ?','¿ Como ver gráfico ?','¿ Como ver gráficos 2 ?'
	];
	
	this.listaVideos = listbox2_data3XY0GN;
	
	this.listaImagen_votar=[
		'images/Tuto/votar/imagen_inicio.PNG',
		'images/Tuto/votar/instruccion_1.PNG',
		'images/Tuto/votar/instruccion_2.PNG',
		'images/Tuto/votar/instruccion_3.PNG',
		'images/Tuto/votar/instruccion_4.PNG',
		'images/Tuto/votar/instruccion_5.PNG',
		'images/Tuto/votar/instruccion_6.PNG',
		'images/Tuto/votar/instruccion_7.PNG',
		'images/Tuto/votar/imagen_fin.PNG'
	];
	
	this.listaImagen_verGrafico1=[
		'images/Tuto/grafico1/imagen_inicio.PNG',
		'images/Tuto/grafico1/instruccion_1.PNG',
		'images/Tuto/grafico1/instruccion_2.PNG',
		'images/Tuto/grafico1/instruccion_3.PNG',
		'images/Tuto/grafico1/instruccion_4.PNG',
		'images/Tuto/grafico1/instruccion_5.PNG',
		'images/Tuto/grafico1/instruccion_6.PNG',
		'images/Tuto/grafico1/instruccion_7.PNG',
		'images/Tuto/grafico1/instruccion_8.PNG',
		'images/Tuto/grafico1/imagen_fin.PNG'
	];
	
	this.listaImagen_verGrafico2=[
		'images/Tuto/grafico2/imagen_inicio.PNG',
		'images/Tuto/grafico2/instruccion_1.PNG',
		'images/Tuto/grafico2/instruccion_2.PNG',
		'images/Tuto/grafico2/instruccion_3.PNG',
		'images/Tuto/grafico2/instruccion_4.PNG',
		'images/Tuto/grafico2/instruccion_5.PNG',
		'images/Tuto/grafico2/instruccion_6.PNG',
		'images/Tuto/grafico2/instruccion_7.PNG',
		'images/Tuto/grafico2/imagen_fin.PNG'
	];
	
	$('#imagen_tuto').sfImage({src:'images/azul.jpg'});
	$('#lb_titurial_titulo').sfLabel({text:'Instrucciones', width:'130px'});
	$('#lb_lista_tutos').sfLabel({text:'Tutoriales', width:'190px'});
	
	$('#popUp_aviso_tuto').sfPopup({text:'Se termino el tutorial', num:'1', callback:'null'});
	
	$('#lista_tutoriales').sfListbox2({data:listbox2_data3XY0GN, width:'200', height:'31', itemsPerPage:'3', horizontal:'false'});
	$('#helBar_tuto').sfKeyHelp({'RED':'Volver a pantalla inicial','return':'Regresar al Hub'});
	
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
			
			if(this.selecciono)
			{
				if(this.numeroInstruccion == 0)
				{
					$('#popUp_aviso_tuto').sfPopup({text:'Se termino el tutorial', num:'1', callback:'null'});
					$('#popUp_aviso_tuto').sfPopup('show');
				}
				else
				{
					this.numeroInstruccion= this.numeroInstruccion -1;
					
					if(this.numeroInstruccion < this.listaImagen_usando.length)
					{
						changeImagen(this.listaImagen_usando[this.numeroInstruccion]);
					}
				}
			}
			
			break;
		case $.sfKey.RIGHT:
			
			if(this.selecciono)
			{

				if(this.numeroInstruccion == this.listaImagen_usando.length-1)
				{
					$('#popUp_aviso_tuto').sfPopup({text:'Se termino el tutorial', num:'1', callback:'null'});
					$('#popUp_aviso_tuto').sfPopup('show');
				}
				else
				{
					this.numeroInstruccion= this.numeroInstruccion + 1;

					if(this.numeroInstruccion < this.listaImagen_usando.length)
					{
						changeImagen(this.listaImagen_usando[this.numeroInstruccion]);
					}
				}

			}
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
					this.listaImagen_usando = this.listaImagen_votar;
				else
					if(seleccion == '1')
						this.listaImagen_usando = this.listaImagen_verGrafico1;
					else
						this.listaImagen_usando = this.listaImagen_verGrafico2;

				// Pongo la Primera Imagen 
				
				changeImagen(this.listaImagen_usando[0]);
				
				this.selecciono = true;
				
				this.numeroInstruccion = 0;
				
				//$('#lista_tutoriales').sfListbox2('hide');
			}
			else
			{
				$('#popUp_aviso_tuto').sfPopup({text:'Seleccione una opción', num:'1', callback:'null'});
				$('#popUp_aviso_tuto').sfPopup('show');
			}
			
			break;
			
			case $.sfKey.RED:
				/*$('#lista_tutoriales').sfListbox2('show');*/
				//$('#lista_tutoriales').sfListbox2('focus');
				$.sfScene.hide('Scene10');
				$.sfScene.show('Scene1');
				$.sfScene.focus('Scene1');
				break;
	}
}

function changeImagen(urlIm)
{
	$('#imagen_tuto').sfImage({src:urlIm});
}
