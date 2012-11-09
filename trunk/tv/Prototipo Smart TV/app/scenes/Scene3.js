function SceneScene3(options) {
	this.options = options;
	this.programaSeleccionado;
	this.Encuestas;
	this.EncuestaSeleccionada;
	
	this.variableConfAviso;
	this.variableConfvarLocal;
	
	this.configuro;
	this.activo;
	
}


function encuesta(id, idP, nombre, descripcion){
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

function validarPoderVotarConfigurado(idEncuesta,valorConfiguracion,idTV){
	
	if(valorConfiguracion == false)
		{
			var urlValidar = "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=5&id_e="+idEncuesta+"&idTV="+idTV+""
			
			// Consulto si ya voto //
			
			$('#cargandoEncuestas').sfLoading('show');
			
			$.ajax({
			type:"GET",
			async:true,
			dataType:"json",
			url:urlValidar,
			success:function(data){
				
				$('#cargandoEncuestas').sfLoading('hide');
				
				if(data.tipo == 'ERROR')
				{
					if(data.desc== 'REPETIDO')
					{
						this.error="Usted ya voto esta encuesta..";
						
						$('#popErrorE').sfPopup({text:this.error, num:'1', callback:null});
						
						$('#popErrorE').sfPopup('show');
					}
				}
				else
				{
					$.sfScene.hide('Scene3');
					$.sfScene.show('Scene4');
					$.sfScene.focus('Scene4');
				}
								
			}, 
			error:function(jqXHR, textStatus, errorThrown){
					
					$('#cargandoEncuestas').sfLoading('hide');
					
					this.error="Ocurrio un ERROR: ";
					
					if (jqXHR.status === 0) {
						this.error=this.error + '\nNot connect.\n Verify Network.';
					} else {
						this.error= this.error + "\nIntentelo mas tarde.Gracias."
					}
					
					//$('#cargandoEncuestas').sfLoading('hide');
					
					$('#popErrorE').sfPopup({text:this.error, num:'1', callback:function(){
					
						$.sfScene.hide('Scene3');
						$.sfScene.show('Scene2');
						$.sfScene.focus('Scene2');
					
					}});
					$('#popErrorE').sfPopup('show');
				}
			}); 
		}
		else
		{
		  // Consulto variable local //
		  
			this.error="La autenticaciòn local aun esta sin desarrollar, cambie su configuraciòn.\n ¿ Desea hacerlo ahora ?";
			
			$('#popErrorE').sfPopup({text:this.error, num:'2', callback:function(data){
			
				if(data)
				{
					$.sfScene.hide('Scene3');
					$.sfScene.show('Scene5');
					$.sfScene.focus('Scene5');
				}
			}});
			
			$('#popErrorE').sfPopup('show');
		}
}

function validarPoderVotarSinConfiguracion(idEncuesta,idTV){
		
		var urlValidar = "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=5&id_e="+idEncuesta+"&idTV="+idTV+""
		
		// Consulto si ya voto //
		
		$('#cargandoEncuestas').sfLoading('show');
		
		$.ajax({
		type:"GET",
		async:true,
		dataType:"json",
		url:urlValidar,
		success:function(data){
			
			$('#cargandoEncuestas').sfLoading('hide');
			
			if(data.tipo == 'ERROR')
			{
				if(data.desc== 'REPETIDO')
				{
					this.error="Usted ya voto esta encuesta, seleccone otra.";
					
					$('#popErrorE').sfPopup({text:this.error, num:'1', callback:null});
					
					$('#popErrorE').sfPopup('show');
				}
			}
			else
			{
				$.sfScene.hide('Scene3');
				$.sfScene.show('Scene4');
				$.sfScene.focus('Scene4');
			}
							
		}, 
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
}

SceneScene3.prototype.initialize = function () {
	alert("SceneScene3.initialize()");
	
	
	// Se ejecuta una sola vez, al principio 
	
	
	$('#lbEncuesta').sfLabel({text:'Sección Encuestas', width:'440px'});
	$('#helpBar3').sfKeyHelp({'UPDOWN':'Moverse en la lista','LEFTRIGHT':'Moverse entre escenas(solo para atras)','ENTER':'Enter','INFO':'Informacion del Sistema','return':'Rregresar al Hub'});
	
	$('#cargandoEncuestas').sfLoading('show');
	$('#lbTituloDescripcionEncuesta').sfLabel({text:'Desccipción', width:'200px'});
	$('#fotoREncuesta').sfImage({src:'images/survey-checkboxes.jpg'});
	$('#svecImage_XY3F').sfImage({src:'images/encuestas-265x300.jpg'});
	
	$('#popUpRegresoEncuesta').sfPopup({text:'¿ Seguro desea regresar a la pantalla anterior ?', num:'2', callback:function(data){
			
				if(data)
				{
					$.sfScene.hide('Scene3');
					$.sfScene.show('Scene2');
					$.sfScene.focus('Scene2');
				}
	}});
	
} // fin initialize

SceneScene3.prototype.handleShow = function () {
	alert("SceneScene3.handleShow()");
	// this function will be called when the scene manager show this scene 

	$('#lbDescripcionEncuestas').sfLabel({text:'Info Encuesta', width:'750px'});

	$('#popUpRegresoEncuesta').sfPopup('hide');
	
}

SceneScene3.prototype.handleHide = function () {
	alert("SceneScene3.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene3.prototype.handleFocus = function () {
	alert("SceneScene3.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	$('#cargandoEncuestas').sfLoading('show');
	
	this.activo=false;
	
	// Tomo info de la anterior escena //
	
	var VariablesEscena2 = $.sfScene.get('Scene2');
	this.programaSeleccionado = VariablesEscena2.ProgramaSeleccionado;

	var VariablesEscena1 = $.sfScene.get('Scene1');
	var configuracionOK = VariablesEscena1.configuracion;
	
	this.configuro = configuracionOK;
	
	if(configuracionOK)
	{
		var VariablesEscena5 = $.sfScene.get('Scene5');
		this.variableConfvarLocal = VariablesEscena5.configuracionVariableLocal;
	}
	
	// Formo lo url de consulta //

	var urlBD = "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=2&paged=0&id_p=" +  this.programaSeleccionado.getId();
	
	var arrayEncuestas = new Array();
	var arrayNombresEnc = new Array();
	
	$.ajax({
	type:"GET",
	async:true,
	dataType:"json",
	url:urlBD,
	success:function(data){
		 
			var tam = data.encuestas.length;
			
			// Analizo si hay encuestas o no //
			
			$('#cargandoEncuestas').sfLoading('hide');
			
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
 
				/* Analisis del numero a mostrar */

				if(tam>5)
				{
					$('#listaEncuestas').sfListbox2({data:arrayNombresEnc, width:'200', height:'31', itemsPerPage:'5', horizontal:'false'});	
					//$('#listaEncuestas').sfListbox2('focus');
				}
				else
				{
				   $('#listaEncuestas').sfListbox2({data:arrayNombresEnc, width:'200', height:'31', itemsPerPage:tam, horizontal:'false'});
				   //$('#listaEncuestas').sfListbox2('focus');
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
	
	/*var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
	
	var ema = seleccion;
	
	var descripcion = this.Encuestas[seleccion].getDescripcion();
	
	$('#lbDescripcionEncuestas').sfLabel({text:descripcion});*/
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
			
			$('#popUpRegresoEncuesta').sfPopup('show');
				
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
		
			this.activo = true;
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
		
			this.activo = true;
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
		
			if( this.activo==false)
			{
				this.error = "Seleccione alguna encuesta de la lista";
				$('#popErrorE').sfPopup({text:this.error, num:'1', callback:'null'});
				$('#popErrorE').sfPopup('show');
			}
			else
			{
				var seleccion = $('#listaEncuestas').sfListbox2('getIndex');
				 
				/* Me paso a la proxima escena  */
				
				this.EncuestaSeleccionada = this.Encuestas[seleccion];
				
				var aux = this.EncuestaSeleccionada;
				
				// Parametros para validar //
				
				var idE = aux.getId();
				
				var idTV = getIdentificador();
				
				if(this.configuro)
				{
					validarPoderVotarConfigurado(idE,this.variableConfvarLocal,idTV);
				}
				else
				{
					validarPoderVotarSinConfiguracion(idE,idTV);
				}
			}

			break;
	}
}
