
<!DOCTYPE html>
 <html class="no-js">
    <head>
        <meta charset="utf-8">
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
        </style>
		
		<link type="text/css" href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet"/>
        <link rel="stylesheet" href="css/bootstrapCustom3.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
		<link rel="stylesheet" href="css/common.css">
		<link rel="stylesheet" href="css/resultado.css">
		
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
                        <ul class="nav">
                            <li><a href="informacion.html">Que es SmartVote?</a></li>
                            <li><a href="contactanos.html">Contactanos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
		  <div class="row-fluid">
			<div class="span4">
			  <div class="azulado bordeRedondo">
					<h3 id="tituloAcordion" align="center">Menu</h3>
				</div>
			  <div id="accordion">
				<h2>Programas</h2>
				<ul class="nav nav-pills nav-stacked">
					<li><a href="#" id="listadoProgramas" ><i class="icon-list"></i>  Lista</a></li>
					<li><a href="#" id="masVotadosProgramas"><i class="icon-plus"></i>  Mas votados</a></li>
				</ul>
				<h2>Encuestas</h2>
				<ul class="nav nav-pills nav-stacked">
					<li><a href="#" id="listadoEncuestas"><i  class="icon-list"></i>  Lista</a></li>
					<li><a href="#" id="masVotadosEncuestas"><i class="icon-plus"></i>  Votos en general</a></li>
					<li><a href="#" id="masVotadosEncuestaPorPrograma"><i class="icon-plus"></i>  Votos por programa</a></li>
				</ul>
			</div>
			<br>
			</div>
			<div class="span8">
				<div class="azulado bordeRedondo">
					<h3 id="tituloAccion" align="center">Seleccione una opcion del menu</h3>
				</div>
				<div align="center">
					<img id="gifLoading"src="img/ajax-loaderBlanco.gif" style="display: none;" alt="Loading..."/>
				</div>
				<div id="contenido" align="center">
					<table id='tablaContenido' align="center"></table>
					<div id='paginacion'></div>
				</div>
			</div>
		  </div>
        </div> 

		<script src="js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
		<script src="js/jquery-ui-1.8.23.custom.min.js"></script>
		
		<script src="js/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="js/jquery.jqGrid.min.js" type="text/javascript"></script>

		<script src="js/resultado.js" type="text/javascript"></script>
 
    </body>
</html>
