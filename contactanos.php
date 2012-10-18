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
		<link type="text/css" href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/common.css">
		<link rel="stylesheet" href="css/contacto.css">
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
                    <a class="brand" href="index.php">SmartVote</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li><a href="informacion.php">Que es SmartVote?</a></li>
                            <li class="active"><a href="contactanos.php">Contactanos</a></li>
							<li><a href="resultado.php">Ejemplos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
         <div class="container-fluid">
			<div class="row-fluid">
                <div class="span8 offset2 hero-unit">
					<div class="titulo bordeRedondoGral">
						Contactanos
					</div>
					<br>
					<br>
					<form id="formContacto"action="contactanos.html" autocomplete="on">
						<div id="alertaEmail" class="textoAlerta alert alert-error ocultar"><strong>Ups!! Ocurrió un error</strong><br>Intentelo las tarde.</div>
						<div id="bordeArribaAbajo">
							<table align="center" CELLPADDING="20">
								<tr>
									<td class="etiquetas">Nombre:</td>
									<td><input id="nombreContacto" type="text" name="fname" required="required" placeholder="Ej: Julio"></td>
								</tr>
								<tr>
									<td class="etiquetas"> E-mail:</td>
									<td><input id="correoContacto" type="email" name="email" autocomplete="off" required="required" placeholder="Ej: julio@.asdf.com"></td>
								</tr>
								<tr>
									<td class="etiquetas">Consulta:</td>
									<td><textarea id="consultaContacto" rows="5" placeholder="...." required="required"></textarea></td>
								</tr>
							</table>
						</div>
						<br>
						<div align="center">
							<input type="submit" class="btn btn-large">
						</div>
					</form>
				</div>
            </div>
			<div class="row">
				<div class="span12">
					<div align="center">
						<h4>&copy; Production JEMAC 2012</h4>
					</div>
				</div>
			</div>
        </div> 
		
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
		<script src="js/contacto.js"></script>
		<script src="js/jquery-ui-1.8.23.custom.min.js"></script>
    </body>
</html>
