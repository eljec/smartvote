function SceneScene3(options) {
	this.options = options;
	this.preguntas;
	this.DescPreg;
	this.numPregu;
	this.yaVoto;
	this.textoPopUp;
	this.Votos;
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

function voto(idP,voto) {
    this.idP = idP;
    this.voto = voto;

    this.getIdP = function getIdP(){
       return this.idP;
    }
	
	this.getVoto = function getVoto(){
       return this.voto;
    }
}


SceneScene3.prototype.initialize = function () {
	alert("SceneScene3.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#lbTitulo').sfLabel({text:'Preguntas', width:'220px'});
	$('#lbNumP').sfLabel({text:'Pregunta Numero:', width:'130px'});
	$('#lbPregunta').sfLabel({text:'label', width:'550px'});

	/* Hago la peticion */
	
	var preguntas = new Array();
	var DescPreguntas = new Array();
	
	this.yaVoto=false;
	
	$.ajax({
	type:"GET",
	async:false,
	dataType:"json",
	url:"http://localhost:8000/test/ServicioEncuesta.php?action=3&id_p=1&id_e=3",
	success:function(data){
		 
			var tam = data.preguntas.length;
		 
			for(var i=0;i<tam;i++)
			{
				DescPreguntas.push(data.preguntas[i].descripcion);
				
				/* Creo un nuevo programa */
				var preguntaAux = new pregunta(data.preguntas[i].id,data.preguntas[i].descripcion);
				
				preguntas.push(preguntaAux);
				
			}		
			$('#lbTitulo').text('Ajax bien');
	  } // fin success 
	}); // fin ajax 
	
	this.preguntas = preguntas;
	this.DescPreg= DescPreguntas;
	this.numPregu = 0;
	$('#lbPregunta').text(this.DescPreg[this.numPregu]);
	$('#popUpRevoto').sfPopup({text:'Puede volver a votar', num:'1', callback:'null'});
	
	this.Votos = new Array();
	
}	


SceneScene3.prototype.handleShow = function () {
	alert("SceneScene3.handleShow()");
	// this function will be called when the scene manager show this scene 

}

SceneScene3.prototype.handleHide = function () {
	alert("SceneScene3.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene3.prototype.handleFocus = function () {
	alert("SceneScene3.handleFocus()");
	// this function will be called when the scene manager focus this scene
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
			break;
		case $.sfKey.RIGHT:
				/* Analizo si voto */
				if(this.yaVoto==true)
				{
					this.numPregu= this.numPregu +1;
					if(this.numPregu < this.DescPreg.length)
					{
						$('#lbPregunta').text(this.DescPreg[this.numPregu]);
						this.yaVoto=false;
					}
					else
					{
					   /* No Hay Mas preguntas */
						this.textoPopUp= "No hya mas preguntas"
					   $('#popUpAvisoVoto').sfPopup({text:this.textoPopUp, num:'1', callback:function()
					   {
							$.sfScene.hide('Scene3');
							$.sfScene.show('Scene4');
							$.sfScene.focus('Scene4');
					   }
					   });
					   $('#popUpAvisoVoto').sfPopup('show');   
					}
				}else
				{
					this.textoPopUp= "Debe elegir una opcion.."
					$('#popUpAvisoVoto').sfPopup({text:this.textoPopUp, num:'1', callback:null});
					$('#popUpAvisoVoto').sfPopup('show');
				}
				
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:		
				var ju = $('#valorAux').val();	
			break;
		case $.sfKey.BLUE:
			/* Votos */
			if(this.yaVoto==false)
			{
				var texto = $('#lbPregunta').text();
				
				for(var i=0;i<this.preguntas.length;i++)
				{
				   if(this.preguntas[i].getDescripcion()==texto)
				   {
				      votoAux= new voto(this.preguntas[i].getId(),"1");
					  this.Votos.push(votoAux);
					  
					  var idP = votoAux.getIdP();
					  var vottacion= votoAux.getVoto();
					  
					  $('#lbTitulo').text("idPr:"+idP+"**"+"voto:"+vottacion);
				   }
				}
				
				this.yaVoto=true;
			}
			else
			{
			   	this.textoPopUp= "Ya Voto !!!"
				$('#popUpAvisoVoto').sfPopup({text:this.textoPopUp, num:'1', callback:null});
				$('#popUpAvisoVoto').sfPopup('show');
			}
			break;
		case $.sfKey.RED:
			break;
	}
}
