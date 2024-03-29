<?php
session_start();
$reg=$_SESSION['user'];
if(!isset($reg)) //sino hay usuario que inicio sesion se pasa a la pantalla de login
    header("Location: index.php");

if($reg == 'jemac')
	header("Location: adminportada.php");
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <!--<meta charset="utf-8">-->
        <meta charset="ISO-8859-1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
		<link rel="stylesheet" href="css/common.css">
		<link rel="stylesheet" href="css/portada.css">
        <script src="js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->

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
									<td><input id="btnLogOn" type="button" class="btn" value="Sign on"/>	</td>
								</tr>
							</table>						
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">

            <!-- Main hero unit for a primary marketing message or call to action -->
            <div class="hero-unit">
                <h1>SmartVote</h1>
                <p>Es una aplicacion que te permite poner en la "nube" tus porpias encuestas y cuestionarios, asi toda la gente puede participar y responderlas.Es muy facil de usar y no te tomara mucho tiempo...</p>
            </div>

            <!-- Example row of columns -->
            <div class="row">
                <div class="span6 gris bordeRedondoGral">
					<div class="espacioPadin">
						<h2>Encuesta</h2>
						<p>En esta seccion podra dar de alta, baja y modificacion de las encuestas.</p>
						<div align="center">
							<p><a class="btn" href="encuestas.php">Entrar</a></p>
						</div>
					</div>
				</div>
				<div class="span6 gris bordeRedondoGral">
					<div class="espacioPadin">
						<h2>Resultados</h2>
						<p>En esta seccion podra consultar los resultados de la votacion de sus ecuestas.</p>
						<div align="center">
							<p><a class="btn" href="#">Entrar</a></p>
						</div>
					</div>
               </div>
            </div>

            <br>

            <div class="row">
				<div class="span12">
					<div align="center">
						<h4>&copy; Production JEMAC 2012</h4>
					</div>
				</div>
			</div>

        </div> <!-- /container -->
		
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
		<script src="js/portada.js"></script>

    </body>
</html>
