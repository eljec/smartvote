function SceneScene3(options) {
	this.options = options;
	this.programaSeleccionado;
	this.Encuestas;
	this.EncuestaSeleccionada;

}


function encuesta(id, idP, nombre, descripcion)
 {
    this.id = id;
	this.idP = idP;
    this.nombre = nombre;
    this.descripcion = descripcion;

    this.getId = function getId(){
       return this.id;
    }
	
	this.getIdP = function getIdP(){
       return this.idP;
    }

    this.getNombre = function getNombre(){
       return this.nombre;
    }
	
	this.getDescripcion = function getDescripcion(){
       return this.descripcion;
    }
}

SceneScene3.prototype.initialize = function () {
	alert("SceneScene3.initialize()");
	
	$('#lbEncuesta').sfLabel({text:'Sección Encuestas', width:'440px'});
	$('#helpBar3').sfKeyHelp({'return':'Return'});
	$('#lbDescripcionEncuestas').sfLabel({text:'label', width:'750px'});
	$('#imagenError').sfImage('hide');
	
	$('#cargandoEncuestas').sfLoading('show');
	
	

} // fin initialize




SceneScene3.prototype.handleShow = function () {
	alert("SceneScene3.handleShow()");
	// this function will be called when the scene manager show this scene 
	
	$('#lbEncuesta').sfLabel({text:'SmartVote-Encuestas', width:'440px'});
	$('#helpBar3').sfKeyHelp({'return':'Return'});
	$('#lbDescripcionEncuestas').sfLabel({text:'label', width:'750px'});
	$('#imagenError').sfImage({src:'images/Imagen1sin onfo.png'});
	$('#imagenError').sfImage('hide');
}

SceneScene3.prototype.handleHide = function () {
	alert("SceneScene3.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene3.prototype.handleFocus = function () {
	alert("SceneScene3.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	// Tomo info de la anterior escena //
	
	var VariablesEscena2 = $.sfScene.get('Scene2');
	this.programaSeleccionado = VariablesEscena2.ProgramaSeleccionado;
	
	// Formo lo url de consulta //

	var urlBD = "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=2&paged=0&id_p=" +  this.programaSeleccionado.getId();
	
	var arrayEncuestas = new Array();
	var arrayNombresEnc = new Array();
	

	$.ajax({
	type:"GET",
	async:false,
	dataType:"json",
	url:urlBD,
	success:function(data){
		 
			var tam = data.encuestas.length;
			
			// Analizo si hay encuestas o no //
			
			if(tam > 0)
			{
			   /* Tienen encuestas  */	
			   
				for(var i=0;i<tam;i++)
				{
					arrayNombresEnc.push(data.encuestas[i].nombre);
					
					/* Creo una nueva encuesta */
					
					var encuestaAux = new encuesta(data.encuestas[i].id,data.encuestas[i].idP,data.encuestas[i].nombre,data.encuestas[i].descripcion);
					
					arrayEncuestas.push(encuestaAux);
					
				}
				 
				$('#cargandoEncuestas').sfLoading('hide');
				 
				/* Analisis del numero a mostrar */

				if(tam>5)
				{
					$('#listaEncuestas').sfListbox2({data:arrayNombresEnc, width:'200', height:'31', itemsPerPage:'5', horizontal:'false'});	
					$('#listaEncuestas').sfListbox2('focus');
				}
				else
				{
				   $('#listaEncuestas').sfListbox2({data:arrayNombresEnc, width:'200', height:'31', itemsPerPage:tam, horizontal:'false'});
				   $('#listaEncuestas').sfListbox2('focus');
				}
			}
			else
			{
			   /* No tiene encuetas, muestro popUp y cargo imagenes */

			   	$('#popErrorE').sfPopup({text:'Este programa no tiene encuestas cargadas, elija otro de la lista', num:'1', callback:function(){
			
					$.sfScene.hide('Scene3');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
			
				}});
				
			    $('#popErrorE').sfPopup('show');
			   
			}
						
	}, // fin success
	error:function(jqXHR, textStatus, errorThrown){
			
			this.error="Ocurrio un ERROR: ";
			
			if (jqXHR.status === 0) {
				this.error=this.error + '\nNot connect.\n Verify Network.';
			} else {
				this.error= this.error + "\nIntentelo mas tarde.Gracias."
			}
			
			$('#cargandoEncuestas').sfLoading('hide');
			
			$('#popErrorE').sfPopup({text:this.error, num:'1', callback:function(){
			
				$.sfScene.hide('Scene3');
				$.sfScene.show('Scene2');
				$.sfScene.focus('Scene2');
			
			}});
			$('#popErrorE').sfPopup('show');
		}
	}); 
	
	this.Encuestas = arrayEncuestas;
	
	/* Pongo la primera descripcion */
	
	var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
	var descripcion = this.Encuestas[seleccion].getDescripcion();
	$('#lbDescripcionEncuestas').sfLabel({text:descripcion});
}

SceneScene3.prototype.handleBlur = function () {
	alert("SceneScene3.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene3.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene3.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			
			$('#popUpRegresoEncuesta').sfPopup({text:'¿ Seguro desea regresar a la pantalla anterior ?', num:'2', callback:function(data){
			
				if(data)
				{
					$.sfScene.hide('Scene3');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
				}
			}});
				
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
			
			var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
			
			if(seleccion == 0)
			   break;
			$('#listaEncuestas').sfListbox2('prev');
			
			/* Muestro la descripcion en el cuadro de al lado */
			
			var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
			
			 var indice=0;
			 
			 for(indice=0;indice<=this.Encuestas.length;indice++)
			 {
			   if ( indice == seleccion)
			   {
					/*Obtengo el nombre */
					
					var descripcion = this.Encuestas[indice].getDescripcion();
					
					$('#lbDescripcionEncuestas').sfLabel({text:descripcion});
			   }
			 }
			break;
		case $.sfKey.DOWN:
			
			var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
			
			if(seleccion == this.Encuestas.length)
			   break;
			$('#listaEncuestas').sfListbox2('next');
			
			/* Muestro la descripcion en el cuadro de al lado */
			
			 var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
			 
			 var indice=0;
			 
			 for(indice=0;indice<=this.Encuestas.length;indice++)
			 {
			   if ( indice == seleccion)
			   {
					/*Obtengo el nombre */
					
					var descripcion = this.Encuestas[indice].getDescripcion();
					
					$('#lbDescripcionEncuestas').sfLabel({text:descripcion});
			   }
			 }
			break;

		case $.sfKey.ENTER:
		
			 var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
			 
			/* Me paso a la proxima escena  */
			
			this.EncuestaSeleccionada = this.Encuestas[seleccion];
			
			$.sfScene.hide('Scene3');
			$.sfScene.show('Scene4');
			$.sfScene.focus('Scene4');

			break;
	}
}
