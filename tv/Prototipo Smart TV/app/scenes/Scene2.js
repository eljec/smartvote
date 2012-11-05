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

function regresoEncuesta(respuesta)
{
	if(respuesta)
	{
		$.sfScene.hide('Scene2');
		$.sfScene.show('Scene1');
		$.sfScene.focus('Scene1');
	}
}

SceneScene2.prototype.initialize = function (aux) {
	alert("SceneScene2.initialize()");

	// Levatamos el archivo con los programas registrados //	
	
	$('#TituloProgramas').sfLabel({text:'Sección Programas', width:'880px'});
	$('#helpBar2').sfKeyHelp({'UPDOWN':'Moverse en la lista','LEFTRIGHT':'Moverse entre escenas(solo para atras)','ENTER':'Enter','INFO':'Informacion del Sistema','return':'Rregresar al Hub'});
	$('#lbDescripcion').sfLabel({text:'Info del Programa', width:'430px'});
	$('#lbTituloDescripcion').sfLabel({text:'Descripcion', width:'430px'});
	$('#lbLista').sfLabel({text:'Lista', width:'240px'});
	$('#cargandoProgramas').sfLoading('show');
	
} // Fin initialize


SceneScene2.prototype.handleShow = function () {
	alert("SceneScene2.handleShow()");
	// this function will be called when the scene manager show this scene 
	
	$('#TituloProgramas').sfLabel({text:'Sección Programas', width:'410px'});
	$('#helpBar2').sfKeyHelp({'UPDOWN':'Moverse en la lista','LEFTRIGHT':'Moverse entre escenas(solo para atras)','ENTER':'Enter','INFO':'Informacion del Sistema','return':'Rregresar al Hub'});
	$('#lbDescripcion').sfLabel({text:'Info del Programa', width:'430px'});
	$('#lbTituloDescripcion').sfLabel({text:'Descripcion', width:'430px'});
	$('#lbLista').sfLabel({text:'Lista', width:'240px'});
	$('#cargandoProgramas').sfLoading('show');
}

SceneScene2.prototype.handleHide = function () {
	alert("SceneScene2.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene2.prototype.handleFocus = function () {
	alert("SceneScene2.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	//$('#cargandoProgramas').sfLoading('show');
	
	var arrayPN = new Array();
	var arrayP = new Array();
	
	$.ajax({
	type:"GET",
	async:false,
	dataType:"json",
	url:"http://www.tesiscastillo.com.ar/smartvote/phpHelper/SmartVoteServices.php?action=1&paged=0",
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
			
			$('#cargandoProgramas').sfLoading('hide');
		
	  }, // fin success
	error:function(jqXHR, textStatus, errorThrown){
	 
			$('#cargandoProgramas').sfLoading('hide');
			
			this.error="Ocurrio un ERROR: ";
			
			if (jqXHR.status === 0) {
                this.error=this.error + '\n Verifique su Conexión a Internet .';
            } 
			else {
				this.error= this.error + "\nIntentelo mas tarde.Gracias."
            }

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
				$('#popUpRegresoPaginaE').sfPopup({text:'¿ Seguro desea regresar a la pantalla anterior ?', num:'2', callback: regresoEncuesta});
				$('#popUpRegresoPaginaE').sfPopup('show');
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


