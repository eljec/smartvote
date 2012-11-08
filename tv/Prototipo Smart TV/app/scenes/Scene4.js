function SceneScene4(options) {
	this.options = options;
	this.numeroPregunta;
	this.DescripcionPreguntas;
	this.Preguntas;
	this.EncuestaS;
	this.yaVoto;
	this.textoPopUp;
	this.Votos;
	
	this.votoCadena;
	
	this.configuro;
	this.variableConfvarLocal;
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

function GuardarVotos(votos,idEn,idTV)
{  
   var arrayVotos = votos;

   // Peticion Ajax
			
			$.ajax({
			   type: "POST",
			   async:true,
			   url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
			   data:{ tipo:'votos',votos:arrayVotos,idE:idEn,idTv:idTV},
			   dataType: "json",
			   success: function(data){				
				 $('#loadingVotos').sfLoading('hide');
				 
				 if(data.tipo == "OK")
				 {
					$.sfScene.hide('Scene4');
					$.sfScene.show('Scene7');
					$.sfScene.focus('Scene7');
				 } 
			   },
			   error:function(jqXHR, textStatus, errorThrown){
					
					$('#loadingVotos').sfLoading('hide');
					
					this.error="Ocurrio un ERROR: ";
					
					if (jqXHR.status === 0) {
						this.error=this.error + '\nNot connect.\n Verify Network.';
					} else {
						this.error= this.error + "\nIntentelo mas tarde.Gracias."
					}
										
					$('#popErrorPregunta').sfPopup({text:this.error, num:'1', callback:function(){
					
						$.sfScene.hide('Scene4');
						$.sfScene.show('Scene3');
						$.sfScene.focus('Scene3');
					
					}});
					$('#popErrorPregunta').sfPopup('show');
				}
			 });
}

function GuardarVotosConfiguracionOK(votos,idEn,idTV,varConfiguracion)
{
	var ema = 123;
	var arrayVotos = votos;
	
	if(varConfiguracion == false)
	{
		var ema2 = 123;
		
		$.ajax({
				type:"POST",
				async:true,
				url: "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php",
				data:{ tipo:'votos',votos:arrayVotos,idE:idEn,idTv:idTV},
				dataType: "json",
				success: function(data){				
				 
					$('#loadingVotos').sfLoading('hide');
				 
					var ju = 123;
				 
					if(data.tipo == 'OK')
					{
						$.sfScene.hide('Scene4');
						$.sfScene.show('Scene7');
						$.sfScene.focus('Scene7');
					}
				}, 
				error:function(jqXHR, textStatus, errorThrown){
					
					$('#loadingVotos').sfLoading('hide');
					
					this.error="Ocurrio un ERROR: ";
					
					if (jqXHR.status === 0) {
						this.error=this.error + '\nNot connect.\n Verify Network.';
					} else {
						this.error= this.error + "\nIntentelo mas tarde.Gracias."
					}					
					
					$('#popErrorPregunta').sfPopup({text:this.error, num:'1', callback:function(){
					
						$.sfScene.hide('Scene4');
						$.sfScene.show('Scene3');
						$.sfScene.focus('Scene3');
					
					}});
					$('#popErrorPregunta').sfPopup('show');
				}
			 });
	}
	else
	{
		// Consulto variable local //
	  
		this.error="La autenticaciòn local aun esta sin desarrollar, cambie su configuraciòn";
		
		$('#popErrorP').sfPopup({text:this.error, num:'1', callback:null});
		
		$('#popErrorP').sfPopup('show');
	}
}


SceneScene4.prototype.initialize = function () {
	alert("SceneScene4.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	var VariablesEscena3 = $.sfScene.get('Scene3');
	this.EncuestaS = VariablesEscena3.EncuestaSeleccionada;
	this.yaVoto=false;
	
	var urlPrg = "http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=3&id_p=" + this.EncuestaS.getIdP()+"&id_e="+ this.EncuestaS.getId();

	$('#lbTituloPreguntas').sfLabel({text:'Secciòn Preguntas', width:'500px'});
	$('#hrlpBar4').sfKeyHelp({'RED':'NO','BLUE':'SI','return':'Return'});
	$('#signoPregunta').sfImage({src:'images/interrogacion.png'});
	$('#signoPregunta2').sfImage({src:'images/interrogacion.png'});
	
	
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

			   	$('#popErrorPregunta').sfPopup({text:'Esta encuesta no tiene preguntas cargadas, elija otra de la lista', num:'1', callback:function(){
			
					$.sfScene.hide('Scene4');
					$.sfScene.show('Scene3');
					$.sfScene.focus('Scene3');
			
				}});
				
			    $('#popErrorPregunta').sfPopup('show');
			   
			}
						
	},
	error:function(jqXHR, textStatus, errorThrown){
					
			this.error="Ocurrio un ERROR: ";
			
			if (jqXHR.status === 0) {
				this.error=this.error + '\nNot connect.\n Verify Network.';
			} else {
				this.error= this.error + "\nIntentelo mas tarde.Gracias."
			}
					
			$('#popErrorPregunta').sfPopup({text:this.error, num:'1', callback:function(){
			
				$.sfScene.hide('Scene4');
				$.sfScene.show('Scene3');
				$.sfScene.focus('Scene3');
			
			}});
			$('#popErrorPregunta').sfPopup('show');
		}
	
	}); // fin ajax 
	
	
	this.DescripcionPreguntas=arrayPreguntasNombre;
	this.Preguntas=arrayPreguntas;
	
	var des = arrayPreguntasNombre[0];
	
	this.numeroPregunta=0;
		
	$('#lbTituloPregunta').sfLabel({text:"Pregunta: "+this.numeroPregunta +1, width:'210px'});
	$('#lbPregunta').sfLabel({text:des, width:'500px'});
	
	this.Votos = new Array();
	this.votoCadena = "";
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
	
	this.error = "";
	
	var VariablesEscena1 = $.sfScene.get('Scene1');
	var configuracionOK = VariablesEscena1.configuracion;
	
	this.configuro = configuracionOK;
	
	if(configuracionOK)
	{
		var VariablesEscena5 = $.sfScene.get('Scene5');
		this.variableConfvarLocal = VariablesEscena5.configuracionVariableLocal;
	}
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
						// No Hay Mas preguntas 
						
						$('#loadingVotos').sfLoading('show');
						
						/*this.textoPopUp= "Se han terminado las preguntas. EL sistema registrara sus votos. Espere un momento";
						$('#popUpAvisoGral').sfPopup({text:this.textoPopUp, num:'1', callback:null});
						$('#popUpAvisoGral').sfPopup('show'); */
					   
						var idTelevisor = getIdentificador();
					   
						if(this.configuro)
						{
							
							
							GuardarVotosConfiguracionOK(this.votoCadena,this.EncuestaS.getId(),idTelevisor,this.variableConfvarLocal);
						}
						else
						{
							GuardarVotos(this.votoCadena,this.EncuestaS.getId(),idTelevisor);
						}
					   
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
		
			if(this.yaVoto==false)
			{
				var texto = $('#lbPregunta').text();
				
				for(var i=0;i<this.Preguntas.length;i++)
				{
				   if(this.Preguntas[i].getDescripcion()==texto)
				   {
						if(this.votoCadena == "")
						{
							this.votoCadena =this.votoCadena + this.Preguntas[i].getId() + "-"+"1" ;
						}
						else
						{
							this.votoCadena =this.votoCadena + ";" + this.Preguntas[i].getId() +"-"+"1" ;
						}
						
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

			if(this.yaVoto==false)
			{
				var texto = $('#lbPregunta').text();
				
				for(var i=0;i<this.Preguntas.length;i++)
				{
				   if(this.Preguntas[i].getDescripcion()==texto)
				   {
						if(this.votoCadena == "")
						{
							this.votoCadena =this.votoCadena + this.Preguntas[i].getId() + "-"+"0" ;
						}
						else
						{
							this.votoCadena =this.votoCadena + ";" + this.Preguntas[i].getId() +"-"+"0" ;
						}

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
	}
}
