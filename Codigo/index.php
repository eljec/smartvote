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
		<link type="text/css" href="css/jquery-ui-1.9.0.custom.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
				background-color:#EDEDED;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/common.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->
        <div class="container">
            <!-- Example row of columns -->
            <div class="row">
                <div class="span4 offset4" class="divLogo" align="center">
					<image src="img/logoTV.png"/> 
					<a id="dialog_link" class="boton">Sig In</a>
					<a href="informacion.php" id="btnResultado" class="boton">¿Que es SmartVote?</a>
					<div id="dialog">
						<table>
							<tr>
								<td>Username:</td>
								<td><input type="text" name="usrname" id="username"/></td>
							</tr>
							<tr>
								<td>Password:</td>
								<td><input type="password" name="password"  id="password"/></td>
							</tr>
						</table>
						<input id="btnSubLogin" type="button" value="OK"/>
						<br>
						<div align="center">
							<img id="gifLoadingIndex"src="img/ajax-loaderBlanco.gif" style="display: none;" alt="Loading..."/>
						</div>
						<br>
						<div id="alertLogin" class="alert ocultar">
						</div>
					</div>
				</div>
            </div>
			<br>
			<br>
			<br>
			<div class="row">
				<div class="span12">
					<div align="center">
						<h4>&copy; Production JEMAC 2012</h4>
					</div>
				</div>
			</div>
        </div> 
        
		<script src="js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
        <script src="js/jqueryCrypt.js"></script>
		<script src="js/index.js"></script>
		<script src="js/jquery-ui-1.9.0.custom.min.js"></script>
    </body>
</html>
