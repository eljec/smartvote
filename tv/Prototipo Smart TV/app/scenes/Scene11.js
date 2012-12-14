function SceneScene11(options) {
	this.options = options;
	
	this.tipo;
	this.error;
}


function ImagenTuto(tipo,num_imagen)
{
	$.ajax({
			type: "GET",
			async:true,
			url: "http://localhost:8000/paginaSV/phpHelper/SmartVoteServices.php",
			data:{action:8,tipo_tuto:tipo,num_imagen:num_imagen},
			dataType: "json",
			success: function(data){				

				if(data.anterior == null)
				{
					$('#anteriorTuto').val('0');
				}
				else					
				{
					$('#anteriorTuto').val(data.anterior);
				}
				
				if(data.siguiente == null)
				{
					
					$('#siguienteTuto').val('0');
				}
				else					
				{
					$('#siguienteTuto').val(data.siguiente);
				}
				
				if(data.url === "" || data.url === null || data.url === undefined )
				{
					// Error
					
					this.error= "Ocurrio un error, intentelo mas tarde";
					
					$('#popUp_tutoriales_im').sfPopup({text:this.error, num:'1', callback:function(){
				
						$.sfScene.hide('Scene11');
						$.sfScene.show('Scene1');
						$.sfScene.focus('Scene1');
				
					}});
					$('#popUp_tutoriales_im').sfPopup('show');
				}
				else
				{
					// Pongo Imagen 
					
					$('#imagenes_tutos').sfImage({src:data.url});
					
					$('#cargaImagenTuto').sfLoading('hide');
				}
				
				if(data.actual === 0)
				{
					$('#info_instruccion').text('Inicio Instrucciones');
				}
				else
				{
					var totalreal = data.total - 1;
					
					if(data.actual == totalreal )
					{
						$('#info_instruccion').text('Fin Instrucciones');
					}
					else
					{
						var total = data.total - 2;
						
						$('#info_instruccion').text('Instrucción '+ data.actual + ' de ' + total );
					}
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
			
				this.error="Ocurrio un ERROR: ";
				
				if (jqXHR.status === 0) {
					this.error=this.error + '\nVerifique su conexión a Internet';
				} else {
					this.error= this.error + "\nIntentelo mas tarde.Gracias."
				}
				
				$('#cargaImagenTuto').sfLoading('hide');
				
				$('#popUp_tutoriales_im').sfPopup({text:this.error, num:'1', callback:function(){
				
					$.sfScene.hide('Scene11');
					$.sfScene.show('Scene1');
					$.sfScene.focus('Scene1');
				
				}});
				$('#popUp_tutoriales_im').sfPopup('show');
			}
		});
}

SceneScene11.prototype.initialize = function () {
	alert("SceneScene11.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#imagenes_tutos').sfImage({src:'images/06_05_World-IPv6-Launch.jpg'});
	$('#help_bar_tutoriales').sfKeyHelp({'RED':'Volver a pantalla inicial','LEFTRIGHT':'Cambiar de Instrucción','return':'Regresar al Hub'});
	$('#itutlo_imagesn_tuto').sfLabel({text:'label', width:'880px'});
	$('#cargaImagenTuto').sfLoading();
	$('#info_instruccion').sfLabel({text:'label', width:'520px'});
	$('#test').sfLabel({text:'', width:'640px'});
	
	//$('#test').sfLabel({text:'', width:'130px'});
	
}




SceneScene11.prototype.handleShow = function () {
	alert("SceneScene11.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene11.prototype.handleHide = function () {
	alert("SceneScene11.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene11.prototype.handleFocus = function () {
	alert("SceneScene11.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	var VariablesEscena10 = $.sfScene.get('Scene10');
	this.tipo = VariablesEscena10.TipoSeleccion;
	
	switch(this.tipo)
	{
		case 'votar':
				$('#itutlo_imagesn_tuto').text('Como votar una encuesta');
			break;
		case 'grafico1':
				$('#itutlo_imagesn_tuto').text('Como ver grafico de encuesta');
			break;
		case 'grafico2':
			$('#itutlo_imagesn_tuto').text('Como ver grafico de encuesta 2');
			break;
	}
	
	$('#cargaImagenTuto').sfLoading('show');
	
	$.ajax({
			type: "GET",
			async:false,
			url: "http://localhost:8000/paginaSV/phpHelper/SmartVoteServices.php?action=8&tipo_tuto=votar&num_imagen=0",
			dataType: "json",
			success: function(data){				

				var ema = data.anterior;
				var ju = data.actual;
				var cas = data.siguiente;
				var max = data.url;
				
				if(data.anterior == null)
				{
					$('#anteriorTuto').val('0');
				}
				else					
				{
					$('#anteriorTuto').val(data.anterior);
				}
				
				if(data.siguiente == null)
				{
					
					$('#siguienteTuto').val('0');
				}
				else					
				{
					$('#siguienteTuto').val(data.siguiente);
				}
				
				if(data.actual === 0)
				{
					$('#info_instruccion').text('Inicio Instrucciones');
				}
				else
				{
					var totalreal = data.total - 1;
					
					if(data.actual == totalreal )
					{
						$('#info_instruccion').text('Fin Instrucciones');
					}
					else
					{
						$('#info_instruccion').text('Instrucción '+ data.actual + 'de ' + data.total);
					}
				}
				
				if(data.url === "" || data.url === null || data.url === undefined )
				{
					// Error
					
					this.error= "Ocurrio un error, intentelo mas tarde";
					
					$('#popUp_tutoriales_im').sfPopup({text:this.error, num:'1', callback:function(){
				
						$.sfScene.hide('Scene11');
						$.sfScene.show('Scene1');
						$.sfScene.focus('Scene1');
				
					}});
					$('#popUp_tutoriales_im').sfPopup('show');
				}
				else
				{
					// Pongo Imagen 
					
					$('#imagenes_tutos').sfImage({src:data.url});
					
					$('#cargaImagenTuto').sfLoading('hide');
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
			
				this.error="Ocurrio un ERROR: ";
				
				if (jqXHR.status === 0) {
					this.error=this.error + '\nVerifique su conexión a Internet';
				} else {
					this.error= this.error + "\nIntentelo mas tarde.Gracias."
				}
				
				$('#cargaImagenTuto').sfLoading('hide');
				
				$('#popUp_tutoriales_im').sfPopup({text:this.error, num:'1', callback:function(){
				
					$.sfScene.hide('Scene11');
					$.sfScene.show('Scene1');
					$.sfScene.focus('Scene1');
				
				}});
				$('#popUp_tutoriales_im').sfPopup('show');
			}
		});
}

SceneScene11.prototype.handleBlur = function () {
	alert("SceneScene11.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene11.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene11.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			
			var anterior = $('#anteriorTuto').val();
			
			if(anterior === '0')
			{
				this.error="No hay mas instruciones";
					
				$('#popUp_tutoriales_im').sfPopup({text:this.error, num:'1', callback:null});
				$('#popUp_tutoriales_im').sfPopup('show');
			}
			else
			{
				$('#cargaImagenTuto').sfLoading('show');
				
				ImagenTuto(this.tipo,anterior);
			}
			
			break;
		case $.sfKey.RIGHT:
			
			var siguiente = $('#siguienteTuto').val();
			
			if(siguiente === '0')
			{
				this.error="No hay mas instruciones";
					
				$('#popUp_tutoriales_im').sfPopup({text:this.error, num:'1', callback:null});
				$('#popUp_tutoriales_im').sfPopup('show');
			}
			else
			{
				$('#cargaImagenTuto').sfLoading('show');
				
				ImagenTuto(this.tipo,siguiente);
			}
			
			/*$('#cargaImagenTuto').sfLoading('show');
			
			$('#info_instruccion').text('Dos');
			
			$('#imagenes_tutos').sfImage({src:'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_1.PNG'});
			
			$('#cargaImagenTuto').sfLoading('hide');
			
			$('#info_instruccion').text('Dos');*/
			
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			
			$('#cargaImagenTuto').sfLoading('show');
			
			var img = new Image();
			img.src = 'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_2.PNG';
			img.height='100%';
			img.width= '100%';
			img.onload = function() {
				
				$('#cargaImagenTuto').sfLoading('hide');
				
				$('#test').html('');
			
				document.getElementById("test").appendChild( img );
				
				$('#info_instruccion').text('Tres');

			}
			
			break;

		case $.sfKey.ENTER:
			
			var img = new Image();
			img.src = 'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_1.PNG';
			img.height='100%';
			img.width= '100%';
			img.onload = function() {
				
				document.getElementById("test").appendChild( img );
				
				$('#info_instruccion').text('Dos');
			}
			
			break;
	}
}
