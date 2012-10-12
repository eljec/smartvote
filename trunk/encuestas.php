<?php
session_start();
$reg=$_SESSION['user'];
if(!isset($reg)) //sino hay usuario que inicio sesion se pasa a la pantalla de login
    header("Location: index.php")
?>
<!DOCTYPE html>
 <html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
		<meta http-equiv="Access-Control-Allow-Origin" content="*"> 
        <meta name="viewport" content="width=device-width">
		<link type="text/css" href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
				background-color:#EDEDED;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/common.css">
		<link rel="stylesheet" href="css/encuestas.css">
        <script src="js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->
		<div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="portada.php">SmartVote</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li><a href="#about">Que es SmartVote?</a></li>
                            <li><a href="#contact">Contactanos</a></li>
                        </ul>
                        <div class="navbar-form pull-right">
							<img class="gifLoading"src="img/ajax-loaderNegro.gif" style="display: none;" alt="Loading..."/>
                            <input id="btnLogOn" type="button" class="btn" value="Sign on"/>
                        </div>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="span4 offset4">
					<image src="img/logoTV.png"/> 
				</div>
            </div>
			<div class="row-fluid">
                <div class="span6">
					<div class="azulado bordeRedondo">
						<h3 align="center">Programas</h3>
					</div>
					<div class="divBlanco">
						<div align="center">
							<image class="tamImage" src="img/programaTV.jpg"/> 
							<br>
							<br>
							<select id="listaProgramas"></select>
							<br>
							<input id="newPrograma" type="button" class="btn tamBoton" value="Nuevo"/>
							<br>
							<img id="gifLoading"src="img/ajax-loaderBlanco.gif" style="display: none;" alt="Loading..."/>
							<div id="alertaProgramas" class="alert ocultar">
							  <strong>Warning!</strong> Falta seleccionar un programa...
							</div>	
							<br>
						</div>
					</div>
				</div>
				<div class="span6">
					<div class="azulado bordeRedondo">
						<h3 align="center">Encuestas</h3>
					</div>
					<div class="divBlanco">
						<div align="center">
							<br>
								<table CELLPADDING="15">
									<tr>
										<td><h4>Nombre:</h4></td>
										<td><input type="text" name="name" id="nameNuevaEncuesta" placeholder="...."/></td>
									</tr>
									<tr>
										<td><h4>Descripcion:</h4></td>
										<td><textarea id="textAreaNuevaEncuesta" rows="4" placeholder="...."></textarea><br /></td>
									</tr>
								 </table>
							<input id="validarEncuesta" type="button" class="btn" value="Validar"/>
							<br>
							<img id="gifLoadingNuevaEncuesta"src="img/ajax-loaderBlanco.gif" style="display: none;" alt="Loading..."/>
							<br>
							<div id="alertaEncuestas" class="alert ocultar">
							  <strong>Atenci�n!!</strong> Ya existe una encuesta con ese nombre.
							</div>
							<br>
						</div>
					</div>
				</div>
			</div>
			<br>
			<br>
			<br>
			<div id="tituloPanelPreguntas" class="row">
				<div class="span12" align="center">
					<div class="verdeDos bordeRedondo">
						<h3 align="center">Preguntas</h3>
						<p align="center">(No incluir los signos)</p>
					</div>
				</div>
			</div>
			<br>
				<div id="panelPreguntas" class="row">
					<div class="span4 divGris">
						<div align="center">
							<h5>Pregunta 1</h5>
							<textarea class="pregunta" name="1" rows="4" placeholder="Texto de la pregunta.."></textarea>
						</div>
					</div>
					<div class="span4 divGris">
						<div align="center">
							<h5>Pregunta 2</h5>
							<textarea class="pregunta" name="2" rows="4" placeholder="Texto de la pregunta.."></textarea>
						</div>
					</div>
					<div class="span4 divGris">
						<div align="center">
							<h5>Pregunta 3</h5>
							<textarea class="pregunta" name="3" rows="4" placeholder="Texto de la pregunta.."></textarea>
						</div>
					</div>
				</div>
				<br>
				<div id="panelPreguntas2" class="row">
					<div class="span6 divGris">
						<div align="center">
							<h5>Pregunta 4</h5>
							<textarea class="pregunta" name="4" rows="4" placeholder="Texto de la pregunta.."></textarea>
						</div>
					</div>
					<div class="span6 divGris">
						<div align="center">
							<h5>Pregunta 5</h5>
							<textarea class="pregunta" name="5" rows="4" placeholder="Texto de la pregunta.."></textarea>
						</div>
					</div>
				</div>
			<br>
			<div id="panelPreguntas3" class="row">
				<div class="span12 verdeDos bordeRedondo" align="center">
					<input id="crear" type="button" class="btn tamBoton" value="Crear"/>
					<br>
					<img id="gifLoadingPreguntas"src="img/ajax-loaderVerdeDos.gif" style="display: none;" alt="Loading..."/>
					<br>
					<div id="alertaPreguntas" class="alertBtnCrear alert ocultar">
					</div>
				</div>
			</div>
			
			<div id="dialogNewItem">
				<table>
					<tr>
						<td>Nombre:</td>
						<td><input type="text" name="name" id="name"/></td>
					</tr>
					<tr>
						<td>Descripcion:</td>
						<td><textarea id="textAreaNI" rows="4" placeholder="Descripcion.."></textarea><br /></td>
					</tr>
				 </table>
				<input id="btnOkNewItem" type="button" value="OK"/>
				<input id="itemToInsert" type="hidden" name="" value="0"/>
				<div align="center">
					<img id="gifLoadingNewItem"src="img/ajax-loaderBlanco.gif" style="display: none;" alt="Loading..."/>
					<br>
					<div id="alertNewItem" class="alert ocultar">
					</div>
				</div>
			</div>
	
        </div> <!-- /container -->
		
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
		<script src="js/encuesta.js"></script>
		<script src="js/jquery-ui-1.8.23.custom.min.js"></script>
    </body>
</html>
