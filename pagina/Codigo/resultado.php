<?php
	/*include("phpHelper/RenderPagina.php");

	session_start();
	$reg=$_SESSION['user'];
	
	if(!isset($reg)) //sino hay usuario que inicio sesion se pasa a la pantalla de login
	{
	    header("Location: index.php");
	}
	else 
	{
	
		$categoria = $_SESSION["categoria"];
	}*/

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

		<!--<link rel="stylesheet" type="css" href="css/jquery.jqplot.css" />-->
		
		<link rel="stylesheet" type="text/css" media="screen" href="css/ui.jqgrid.css" />

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
                    <a class="brand" href="index.php">SmartVote</a>
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
				<div class="span3">
					<div class="negro bordeRedondoGral">
						<h3 id="tituloAcordion" align="center">Menu</h3>
					</div>
			  		<ul class="nav nav-tabs nav-stacked">
 						<li><a href="#" id="nuevaEncuesta"><img src='img/list_12x11.png' alt='Loading...'/>  Mis Encuestas</a></li>
  						<li><a href="#" id="bajaEncuesta"><img src='img/chart_12x12.png' alt='Loading...'/>  Grafico Gral</a></li>
  						<li><a href="#" id="modEncuesta"><img src='img/chart_12x12.png' alt='Loading...'/>  Grafico por Pregunta</a></li>
					</ul>
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
		
		<script src="js/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="js/jquery.jqGrid.min.js" type="text/javascript"></script>
        
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
