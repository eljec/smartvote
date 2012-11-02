function SceneScene4(options) {
	this.options = options;
	this.numeroPregunta;
	this.DescripcionPreguntas;
	this.Preguntas;
	this.EncuestaS;
	this.yaVoto;
	this.textoPopUp;
	this.Votos;
	this.error;

}

function pregunta(id,descripcion) {
    this.id = id;
    this.descripcion = descripcion;

    this.getId = function getId(){
       return this.id;
    }
	this.getDescripcion = function getDescripcion(){
       return this.descripcion;
    }
}

function VotoPregunta(idP, voto) {
    this.idP = idP;
    this.voto = voto;

    this.getIdP = function getIdP(){
       return this.idP;
    }
	
	this.getVoto = function getVoto(){
       return this.voto;
    }
}

function GuardarVotos()
{

   /*Armo la url segun los votos que tengo */
   
   // Peticion Ajax
			
			$.ajax({
			   type: "GET",
			   async:false,
			   url: "http://localhost/Tesis/Insercion1.php",
			   dataType: "json",
			   success: function(data)
			   {				
				 $('#loadingVotos').sfLoading('hide');
				 
				 $('#lbTituloPreguntas').text(data);
				 
			   }
			 });
}
SceneScene4.prototype.initialize = function () {
	alert("SceneScene4.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	var VariablesEscena3 = $.sfScene.get('Scene3');
	this.EncuestaS = VariablesEscena3.EncuestaSeleccionada;
	this.yaVoto=false;
	
	//var urlPrg = "http://localhost/Tesis/ServicioEncuesta.php?action=3&id_p=" + this.EncuestaS.getIdP()+"&id_e="+ this.EncuestaS.getId();

	
	var urlPrg = "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=3&id_p=" + this.EncuestaS.getIdP()+ "&id_e="+ this.EncuestaS.getId();
	
	$('#lbTituloPreguntas').sfLabel({text:'Sección Preguntas', width:'500px'});
	$('#hrlpBar4').sfKeyHelp({'RED':'NO','BLUE':'SI','return':'Return'});
	
	/* Variables auiliares */
	
	var arrayPreguntasNombre = new Array();
	
	var arrayPreguntas= new Array();
	
	
	/* Consulto sobre las preguntas */
	
	$.ajax({
		type:"GET",
		async:false,
		dataType:"json",
		url:urlPrg,
		success:function(data){
			 
				var tam = data.preguntas.length;
				
				// Analizo si hay preguntas o no //
				
				if(tam > 0)
				{
				   // Tienen preguntas  	
				   
					for(var i=0;i<tam;i++)
					{
						arrayPreguntasNombre.push(data.preguntas[i].descripcion);
						
						// Creo una nueva encuesta 
						
						var preguntaAux = new pregunta(data.preguntas[i].id,data.preguntas[i].descripcion);
						
						arrayPreguntas.push(preguntaAux);
						
					}
				}
				else
				{
				   // No tiene encuetas, muestro popUp y cargo imagenes 

					$('#imagenError').sfImage('show');
				   
					$('#popErrorP').sfPopup({text:'Esta encuesta no tiene preguntas cargadas, elija otra de la lista', num:'1', callback:function(){
				
						$.sfScene.hide('Scene4');
						$.sfScene.show('Scene3');
						$.sfScene.focus('Scene3');
				
					}});
					
					$('#popErrorP').sfPopup('show');
				   
				}
							
		},
		error:function(jqXHR, textStatus, errorThrown){
			this.error="Ocurrio un ERROR: ";
			
			if (jqXHR.status === 0) {
				this.error=this.error + '\nNot connect.\n Verify Network.';
			} else {
				this.error= this.error + "\nIntentelo mas tarde.Gracias."
			}
			
			
			
			$('#popErrorP').sfPopup({text:this.error, num:'1', callback:function(){
			
				$.sfScene.hide('Scene3');
				$.sfScene.show('Scene2');
				$.sfScene.focus('Scene2');
			
			}});
			$('#popErrorP').sfPopup('show');
		}
	}); // fin ajax 
	
	
	this.DescripcionPreguntas=arrayPreguntasNombre;
	this.Preguntas=arrayPreguntas;
	
	var des = arrayPreguntasNombre[0];
	
	this.numeroPregunta=0;
		
	$('#lbTituloPregunta').sfLabel({text:'Pregunta: "+this.numeroPregunta', width:'210px'});
	$('#lbPregunta').sfLabel({text:des, width:'500px'});
	$('#signoPregunta').sfImage({src:'images/interrogacion.png'});
	$('#signoPregunta2').sfImage({src:'images/interrogacion.png'});
	
	this.Votos = new Array();
}




SceneScene4.prototype.handleShow = function () {
	alert("SceneScene4.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene4.prototype.handleHide = function () {
	alert("SceneScene4.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene4.prototype.handleFocus = function () {
	alert("SceneScene4.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene4.prototype.handleBlur = function () {
	alert("SceneScene4.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene4.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene4.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:		
			break;
		case $.sfKey.RIGHT:
			/* Analizo si voto */
				if(this.yaVoto==true)
				{
					this.numeroPregunta= this.numeroPregunta +1;
					if(this.numeroPregunta < this.DescripcionPreguntas.length)
					{
						$('#lbPregunta').text(this.DescripcionPreguntas[this.numeroPregunta]);
						this.yaVoto=false;
					}
					else
					{
					    
					   $('#loadingVotos').sfLoading('show');
					   
					   /* Guardo los votos */ 
					   
					    //GuardarVotos();
						
						/* No Hay Mas preguntas */
						this.textoPopUp= "Se han terminado las preguntas. EL sistema registro sus votos.";
					   $('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
					   $('#popUpAvisoGral').sfPopup('show'); 
					   
					}
				}else
				{
					this.textoPopUp= "Debe elegir una opcion..";
					$('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
					$('#popUpAvisoGral').sfPopup('show');
				}
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:
			break;
		case $.sfKey.RED:
		
				/* Votos */	
			if(this.yaVoto==false)
			{
				var texto = $('#lbPregunta').text();
				
				for(var i=0;i<this.Preguntas.length;i++)
				{
				   if(this.Preguntas[i].getDescripcion()==texto)
				   {
						votoAux= new VotoPregunta(this.Preguntas[i].getId(),1);
						this.Votos.push(votoAux);

						this.textoPopUp= "Gracias !!!";
						$('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
						$('#popUpAvisoGral').sfPopup('show');
				   }
				}
				
				this.yaVoto=true;
			}
			else
			{
			   	this.textoPopUp= "Ya Voto !!!";
				$('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
				$('#popUpAvisoGral').sfPopup('show');
			}
			break;
		case $.sfKey.BLUE:
				/* Votos */	
			if(this.yaVoto==false)
			{
				var texto = $('#lbPregunta').text();
				
				for(var i=0;i<this.Preguntas.length;i++)
				{
				   if(this.Preguntas[i].getDescripcion()==texto)
				   {
						votoAux= new VotoPregunta(this.Preguntas[i].getId(),1);
						this.Votos.push(votoAux);

						this.textoPopUp= "Su voto se registro !!!";
						$('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
						$('#popUpAvisoGral').sfPopup('show');
				   }
				}
				
				this.yaVoto=true;
			}
			else
			{
			   	this.textoPopUp= "Ya Voto !!!";
				$('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
				$('#popUpAvisoGral').sfPopup('show');
			}
			break;
	}
}
