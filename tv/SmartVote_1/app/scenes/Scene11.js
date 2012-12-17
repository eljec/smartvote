function SceneScene11(options) {
	this.options = options;
	
	this.tipo;
	this.error;
}

SceneScene11.prototype.initialize = function () {
	alert("SceneScene11.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#help_bar_tutoriales').sfKeyHelp({'LEFTRIGHT':'Regresar al menu de ayuda','INFO':'Info','RED':'Ir a Inicio','return':'Regresar al Hub'});
	$('#itutlo_imagesn_tuto').sfLabel({text:'', width:'880px'});
	$('#label_instrucciones').sfLabel({text:'', width:'670px'});
	$('#svecImage_ZJYI').sfImage({src:'images/imagen_instruccion.png'});
	$('#imagen_instruccion2').sfImage({src:'images/imagen_instruccion2.png'});
	
	$('#popUp_retorno_instrucciones').sfPopup({text:'¿ Desea regresar a la pantalla inicial ?', num:'2', callback:function(data){
		
		if(data)
		{
			$.sfScene.hide('Scene11');
			$.sfScene.show('Scene1');
			$.sfScene.focus('Scene1');
		}
	}});
	
	
}




SceneScene11.prototype.handleShow = function () {
	alert("SceneScene11.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene11.prototype.handleHide = function () {
	alert("SceneScene11.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

function textoInstruccionVotar()
{
	var texto = "<ol>";
		texto = texto +  "<li><p>Inicie la aplicación.</p></li>";
		texto = texto +  "<li><p>Seleccione un PROGRAMA de la lista y oprimir el boton Enter.</p></li>";
		texto = texto +  "<li><p>Seleccione una ENCUESTA de la lista y oprimir el boton Enter.</p></li>";
		texto = texto +  "<li><p>Vote la pregunta usando los botones ROJO y AZUL, segun su elección.</p></li>";
		texto = texto +  "<li><p>Pase de preguntas con los botones izquierda y derecha del control.</p></li>";
		texto = texto +  "<li><p>Una vez terminada la votacion de todas las preguntas, el sistema emite un cartel avisando que guardo sus datos.</p></li>";
		texto = texto +  "<li><p>Fin de la votación.</p></li>";
	texto = texto +  "</ol>";

	return texto;
}

function textoInstruccionVerGrafico1()
{
	var texto = "<ol>";
		texto = texto +  "<li><p>Oprimir el boton Ver Gráfico.</p></li>";
		texto = texto +  "<li><p>Pase de preguntas con los botones izquierda y derecha del control.</p></li>";
		texto = texto +  "<li><p>Una vez terminadas todas las preguntas, el sistema emite un cartel avisandole que ya vio todos los gráficos.</p></li>";
		texto = texto +  "<li><p>Fin.</p></li>";
	texto = texto +  "</ol>";

	return texto;
}

function textoInstruccionVerGrafico2()
{
	var texto = "<ol>";
		texto = texto +  "<li><p>Inicie la aplicación.</p></li>";
		texto = texto +  "<li><p>Seleccione un PROGRAMA de la lista y oprimir el boton Enter.</p></li>";
		texto = texto +  "<li><p>Seleccione una ENCUESTA de la lista.</p></li>";
		texto = texto +  "<li><p>Oprimir el boton VERDE para ver el gráfico de la encuesta.</p></li>";
		texto = texto +  "<li><p>Pase de preguntas con los botones izquierda y derecha del control.</p></li>";
		texto = texto +  "<li><p>Una vez terminadas todas las preguntas, el sistema emite un cartel avisandole que ya vio todos los gráficos.</p></li>";
		texto = texto +  "<li><p>Fin.</p></li>";
	texto = texto +  "</ol>";

	return texto;
}

SceneScene11.prototype.handleFocus = function () {
	alert("SceneScene11.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	$('#label_instrucciones').hide();
	
	var VariablesEscena10 = $.sfScene.get('Scene10');
	this.tipo = VariablesEscena10.TipoSeleccion;
	
	var html = "";
	
	switch(this.tipo)
	{
		case 'votar':
				$('#itutlo_imagesn_tuto').text('¿ Como votar una encuesta ?');
				html = textoInstruccionVotar();
				$('#label_instrucciones').css("font-size","15pt");
			break;
		case 'grafico1':
				$('#itutlo_imagesn_tuto').text('¿ Como ver gráfico de encuesta ? (luego de votar)');
				html = textoInstruccionVerGrafico1();
				$('#label_instrucciones').css("font-size","17pt");
			break;
		case 'grafico2':
				$('#itutlo_imagesn_tuto').text('¿ Como ver gráfico de encuesta ? (sin votar)');
				html = textoInstruccionVerGrafico2();
				$('#label_instrucciones').css("font-size","15pt");
			break;
	}

	
	$('#label_instrucciones').html(html);
	
	$("#label_instrucciones").fadeIn(400);
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
			
				$.sfScene.hide('Scene11');
				$.sfScene.show('Scene10');
				$.sfScene.focus('Scene10');
				
			break;
		case $.sfKey.RIGHT:
			break;
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:
			break;
		case $.sfKey.RED:
			$('#popUp_retorno_instrucciones').sfPopup('show');
			break;
		case $.sfKey.INFO:
		
			$.sf.setData('llamadaPaginaInfo', 'Scene11');
			
			$.sfScene.hide('Scene11');
			$.sfScene.show('Scene5');
			$.sfScene.focus('Scene5');
		
		break;
	}
}
