<?php
	include("phpHelper/RenderPagina.php");

	session_start();
	$reg=$_SESSION['user'];
	
	if(!isset($reg)) //sino hay usuario que inicio sesion se pasa a la pantalla de login
	{
	    header("Location: index.php");
	}
	else 
	{
	
		$categoria = $_SESSION["categoria"];
	}

?>
<!DOCTYPE html>
 <html class="no-js">
    <head>
        <!--<meta charset="utf-8">-->
        <meta charset="ISO-8859-1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
		<meta http-equiv="Access-Control-Allow-Origin" content="*"> 
        <meta name="viewport" content="width=device-width">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
            
            .ui-dialog-titlebar-close{
    			display: none;
    		}
        </style>
		
		<link type="text/css" href="css/jquery-ui-1.9.0.custom.css" rel="stylesheet" />
		<link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
		<link rel="stylesheet" href="css/common.css">
		<link rel="stylesheet" href="css/encuesta2.css">
		
		<link rel="stylesheet" href="css/animate.css">
		
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
                        <div class="navbar-form pull-right">
							<table>
								<tr>
									<td><span class="label label-important ocultar"></span></td>
									<td><img class="gifLoading"src="img/ajax-loaderNegro.gif" style="display: none;" alt="Loading..."/></td>
									<td>										
										<div class="btn-group">
										  <a class="btn" href=""><i class="icon-user"></i><?php echo $reg; ?></a>
										  <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span></a>
										  <ul class="dropdown-menu">
										    <li><a href="#" id="btnLogOn"><i class="icon-minus"></i>Sign On </a></li>
										    <li class="divider"></li>
										  </ul>
										</div>
									</td>	
								</tr>
							</table>						
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
		  <div class="row-fluid">
			<!--<div class="span3">
				<div class="negro bordeRedondoGral">
					<h3 id="tituloAcordion" align="center">Menu</h3>
				</div>
			  	<ul class="nav nav-tabs nav-stacked">
 					<li><a href="#" id="nuevaEncuesta"><i class="icon-ok"></i> Nueva Encuesta</a></li>
  					<li><a href="#" id="bajaEncuesta"><i class="icon-remove"></i> Baja Encuesta</a></li>
  					<li><a href="#" id="modEncuesta"><i class="icon-refresh"></i> Modificación Encuesta</a></li>
				</ul>
			</div>--> 
			<div class="span12 tabbable tabs-left">
				<ul class="nav nav-tabs" id='myTab'>
					 <li class="active"><a href="#panelNuevaEncuesta" data-toggle="tab"><i class="icon-ok"></i> Nueva Encuesta</a></li>
					 <li><a href="#panelBajaEncuesta" data-toggle="tab"><i class="icon-remove"></i> Baja Encuesta</a></li>
				</ul>
				<div class="tab-content">
					    <div class="tab-pane active" id="panelNuevaEncuesta">
							<div class="negro bordeRedondoGral animated rotateIn">
								<h3 id="tituloAccion" align="center">Alta Encuestas</h3>
							</div>	
							<div id="contenido" align="center">	
								<div class="tabbable"> 
								  <ul class="nav nav-tabs" id='myTabDos'>
								  	<?php 
								  		if($categoria == 'administrador')
										{
											$render = new RenderPagina();
											echo $render->PaginaEncuesta_AltaEncuesta_Control_Programa();
											echo '<li class=""><a href="#parteEncuesta" data-toggle="tab"> Encuesta</a></li>';
										}
										else {
											echo '<li class=""><a href="#parteEncuesta" data-toggle="tab"> Encuesta</a></li>';
										}
									 ?>
								    <li><a href="#partePregunta" data-toggle="tab"> Preguntas</a></li>
								  </ul>
								  <div class="tab-content">
								  	<?php 
								  		if($categoria == 'administrador')
										{
											$render = new RenderPagina();
											echo $render->PaginaEncuesta_AltaEncuesta_Content_Control_Programa();																						
										}
										
									 ?>
								    <div class="tab-pane" id="parteEncuesta">
								      	<div class="hero-unit form-horizontal">
											<div class="negro bordeRedondoGral">
												<h3 align="center">Datos Nueva Encuesta</h3>
											</div>
											<div align="center">
												<div id="alertaEncuestas" class="alert ocultar TamAlerta"></div>
											</div>
											<div class="bordeArribaAbajo">
												<table align="center" CELLPADDING="20">
													<tr>
														<td>
															<div id="controlNombre" class="control-group">
																<label class="control-label" for="nameNuevaEncuesta">Nombre</label>
																<div class="controls">
																	<input class="foco" type="text" id="nameNuevaEncuesta" placeholder="....">
																	<span class="help-inline">Campo obligatorio.</span>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div id="controlDesc" class="control-group">
																<label class="control-label" for="textAreaNuevaEncuesta">Descripcion</label>
																<div class="controls">
																	<textarea class="foco" id="textAreaNuevaEncuesta" rows="4" placeholder="...."></textarea>
																	<span class="help-inline">Campo obligatorio.</span>
																</div>
															</div>
														</td>
													</tr>
												</table>
											</div>
											<br>
											<div align="center">
												<input id="validarEncuesta" type="button" class="btn" value="Validar"/>
												<input id="resetDatos" type="button" class="btn" value="Cambiar"/>
												<br>
												<img id="gifLoadingNuevaEncuesta"src="img/ajax-loaderTranparent.gif" style="display: none;" alt="Loading..."/>
												<br>
											</div>
										</div>
								    </div>
								    <div class="tab-pane" id="partePregunta">
								    	<div align="center" class="hero-unit">
								    		<div class="negro bordeRedondoGral">
												<h3 align="center">Datos de las preguntas(sin ?¿)</h3>
											</div>
											<div align="center">
												<div id="alertaPreguntas" class="alert ocultar TamAlerta"></div>
											</div>
								    		<div class="bordeArribaAbajo">
								    			<br>
										     	<table align="center">
													<tr>
														<td class="form-horizontal">
															<div class="control-group controlPregunta">
																<label class="control-label" for="inputWarning">Pregunta 1</label>
															  	<div class="controls">
															    	<input type="text" id="1" name="1" class="pregunta" placeholder="Texto de la pregunta..">
															    	<span class="help-inline">Campo Obligatorio, sin espacios.</span>
															  	</div>
															</div>
														</td>				
													</tr>
													<tr>
														<td class="form-horizontal">
															<div class="control-group controlPregunta">
																<label class="control-label" for="inputWarning">Pregunta 2</label>
															  	<div class="controls">
															    	<input type="text" id="2" name="2" class="pregunta" placeholder="Texto de la pregunta..">
															    	<span class="help-inline">Campo Obligatorio, sin espacios</span>
															  	</div>
															</div>
														</td>		
													</tr>
													<tr>
														<td class="form-horizontal">
															<div class="control-group controlPregunta">
																<label class="control-label" for="inputWarning">Pregunta 3</label>
															  	<div class="controls">
															    	<input type="text" id="3" name="3" class="pregunta" placeholder="Texto de la pregunta..">
															    	<span class="help-inline">Campo Obligatorio, sin espacios</span>
															  	</div>
															</div>
														</td>		
													</tr>
													<tr>
														<td class="form-horizontal">
															<div class="control-group controlPregunta">
																<label class="control-label" for="inputWarning">Pregunta 4</label>
															  	<div class="controls">
															    	<input type="text" id="4" name="4" class="pregunta" placeholder="Texto de la pregunta..">
															    	<span class="help-inline">Campo Obligatorio, sin espacios</span>
															  	</div>
															</div>
														</td>		
													</tr>
													<tr>
														<td class="form-horizontal">
															<div class="control-group controlPregunta">
																<label class="control-label" for="inputWarning">Pregunta 5</label>
															  	<div class="controls">
															    	<input type="text" id="5" name="5" class="pregunta" placeholder="Texto de la pregunta..">
															    	<span class="help-inline">Campo Obligatorio, sin espacios</span>
															  	</div>
															</div>
														</td>		
													</tr>
												</table>
											</div>
											<br>
											<div align="center">
												<input id="crearEncuesta" type="button" class="btn" value="Crear"/>
												<br>
												<img id="gifLoadingNuevaEncuesta"src="img/ajax-loaderTranparent.gif" style="display: none;" alt="Loading..."/>
												<br>
											</div>
										</div>	
								    </div>
								  </div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="panelBajaEncuesta">
							<div class="negro bordeRedondoGral animated rotateIn">
								<h3 align="center">Baja Encuestas</h3>
							</div>
								<br>
								<div id="alertaBajaEncuesta" class="alert ocultar">
									<strong>Warning!</strong> Ocurrio un Error, Intentelo mas tarde.
								</div>
								<br />
								<div align="center" style="height: 500px;">
									<table  align="center" CELLPADDING="20">
										<tr>
											<?php 
												if($categoria == 'administrador')
												{
													$render = new RenderPagina();
													echo $render->PaginaEncuesta_BajaEncuesta_Control_Programa();
												}
											?>
											<td><div id="listaEncuesta"></div></td>
											<td><input id="bajaEncuesta" type="button" class="btn" value="Desactivar"/></td>
										</tr>
									</table>								
									<br>	
									<img id="gifLoading"src="img/gifBarrasLoading.gif" style="display: none;" alt="Loading..."/>
									<br>
								</div>
						</div>
					</div>
					
			</div>
		  </div>
        </div> 
        
        <div id="mensajeFinal">
				
		</div>
		
		<input type="hidden" id="hdnIdPrograma" value="<?php  echo $_SESSION['idP']?>" />
		<input type="hidden" id="resultadoValidacion" value="0" />
		<input type="hidden" id="seleccionPrograma" value="0" />
		
		
		<script src="js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
		<script src="js/jquery-ui-1.9.0.custom.min.js"></script>
		     
        <?php 
			if($categoria == 'administrador')
			{
				echo '<script src="js/encuesta2.js" type="text/javascript"></script>';
			}
			else
			{
				echo '<script src="js/encuesta.js" type="text/javascript"></script>';
			}
		?>
	
		<script type="text/javascript" src="js/ddslick.js"></script>
 
    </body>
</html>
