function SceneScene2(options) {
	this.options = options;
	this.Programas;
	this.ProgramaSeleccionado;
	this.activo;
	this.llamadoPH_S2;
	this.error;
}

function programa(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;

    this.getId = function getId(){
       return this.id;
    }

    this.getNombre = function getNombre(){
       return this.nombre;
    }
	
	this.getDescripcion = function getDescripcion(){
       return this.descripcion;
    }
}

SceneScene2.prototype.initialize = function (aux) {
	alert("SceneScene2.initialize()");

	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	// Levatamos el archivo con los programas registrados //
	
	
	$('#TituloProgramas').sfLabel({text:'SmartVote-Programas-', width:'790px'});
	$('#helpBar2').sfKeyHelp({'UPDOWN':'Moverse en la lista','LEFTRIGHT':'Moverse entre escenas','ENTER':'Enter','INFO':'Informacion del Sistema','return':'Rregresar al Hub'});
	$('#logo2').sfImage({src:'images/logoTres.png'});
	$('#lbDescripcion').sfLabel({text:'Info del Programa', width:'430px'});
	$('#lbTituloDescripcion').sfLabel({text:'Descripcion', width:'430px'});

	$('#ListaProgramas').sfListbox2({data:arrayP, width:'200', height:'31', itemsPerPage:'5', horizontal:'false', data:arrayP, width:'200', height:'31', itemsPerPage:'5', horizontal:'false', data:arrayP, width:'200', height:'31', itemsPerPage:'tam', horizontal:'false'});
	$('#lbLista').sfLabel({text:'Lista', width:'240px'});
	
	
	var arrayPN = new Array();
	var arrayP = new Array();
	
	$.ajax({
	type:"GET",
	async:false,
	dataType:"json",
	url:"http://localhost/Tesis/ServicioEncuesta.php?action=1",
	success:function(data){
		 
			var tam = data.programas.length;
		 
			for(var i=0;i<tam;i++)
			{
				arrayPN.push(data.programas[i].nombre);
				
				/* Creo un nuevo programa */
				var programaAux = new programa(data.programas[i].id,data.programas[i].nombre,data.programas[i].descripcion);
				
				arrayP.push(programaAux);
				
			}
			
			/* Analisis del numero a mostrar */

			if(tam>5)
			{
				$('#ListaProgramas').sfListbox2({data:arrayPN, width:'200', height:'31', itemsPerPage:'5', horizontal:'false'});	
			}
			else
			{
			   $('#ListaProgramas').sfListbox2({data:arrayPN, width:'200', height:'31', itemsPerPage:tam, horizontal:'false'});	
			}
			
		
	  }, // fin success
	 error:function(jqXHR, textStatus, errorThrown){
	 
			this.error="Ocurrio un ERROR: ";
			
			if (jqXHR.status === 0) {
                this.error=this.error + '\nNot connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                this.error=this.error+'\nRequested page not found. [404]';
            } else if (jqXHR.status == 500) {
               this.error=this.error+'\nInternal Server Error [500].';
            } else if (exception === 'parsererror') {
                this.error=this.error+'\nRequested JSON parse failed.';
            } else if (exception === 'timeout') {
                this.error=this.error+'\nTime out error.';
            } else if (exception === 'abort') {
                this.error=this.error+'\nAjax request aborted.';
            } else {
                this.error=this.error+'\nUncaught Error.\n' + jqXHR.responseText;
            }
			
			this.error= this.error + "\nIntentelo mas tarde.Gracias."
			$('#popError').sfPopup({text:this.error, num:'1', callback:function(){
			
				$.sfScene.hide('Scene2');
				$.sfScene.show('Scene1');
				$.sfScene.focus('Scene1');
			
			}});
			$('#popError').sfPopup('show');
	 }
	}); // fin ajax 


 this.Programas=arrayPN;
 this.ProgramasObj=arrayP;
 this.activo=false;
 this.llamadoPH_S2=false;

} // Fin initialize


SceneScene2.prototype.handleShow = function () {
	alert("SceneScene2.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene2.prototype.handleHide = function () {
	alert("SceneScene2.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene2.prototype.handleFocus = function () {
	alert("SceneScene2.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene2.prototype.handleBlur = function () {
	alert("SceneScene2.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene2.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene2.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
			var idx = $('#ListaProgramas').sfListbox2('getIndex');
			this.activo = true;
			if(idx == 0)
			   break;
			$('#ListaProgramas').sfListbox2('prev');
			
			/* Muestro la descripcion en el cuadro de al lado */
			
			var seleccion = $('#ListaProgramas').sfListbox2('getIndex');
			 var indice=0;
			 
			 for(indice=0;indice<=this.Programas.length;indice++)
			 {
			   if ( indice == seleccion)
			   {
					/*Obtengo el nombre */
					
					var nombre = this.ProgramasObj[indice].getDescripcion();
					
					$('#lbDescripcion').sfLabel({text:nombre});
			   }
			 }
			 
			 
			 
			break;
		case $.sfKey.DOWN:
		    var idx = $('#ListaProgramas').sfListbox2('getIndex');
			this.activo = true;
			if(idx == this.Programas.length )
			   break;
			$('#ListaProgramas').sfListbox2('next');
			
			/* Muestro la descripcion en el cuadro de al lado */
			
			var seleccion = $('#ListaProgramas').sfListbox2('getIndex');
			var indice=0;
			 
			 for(indice=0;indice<=this.Programas.length;indice++)
			 {
			   if ( indice == seleccion)
			   {
					/*Obtengo el nombre */
					
					var nombre = this.ProgramasObj[indice].getDescripcion();
					
					$('#lbDescripcion').sfLabel({text:nombre});
			   }
			 }
			
			break;
		case $.sfKey.ENTER:
		
		if(this.activo == true)
		  {
			 var seleccion = $('#ListaProgramas').sfListbox2('getIndex');
			 var indice=0;
			 for(indice=0;indice<=this.Programas.length;indice++)
			 {
			   if ( indice == seleccion)
			   {
			      this.ProgramaSeleccionado = this.ProgramasObj[indice];
				  $.sfScene.hide('Scene2');
				  $.sfScene.show('Scene3');
				  $.sfScene.focus('Scene3');
			   }
			 }
		 }	 // Fin If	 
		 else
		 {
		    $('#AvisoProgramas').sfPopup({text:'Seleccione algun programa de la lista', num:'1', callback:'null'});
			$('#AvisoProgramas').sfPopup('show');
		 }
		break;
		
		case $.sfKey.INFO:
		
		this.llamadoPH_S2=true;
		
			$.sfScene.show('Scene6');
			$.sfScene.focus('Scene6');
		
		break;
		
		case $.sfKey.RETURN:
			 $.sf.exit(false);
		break;
	}
}


