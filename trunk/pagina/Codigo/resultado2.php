
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
        </style>
        
        <style type="text/css" title="currentStyle">
			/*@import "css/tabla/css/demo_page.css";*/
			@import "css/tabla/css/demo_table.css";
		</style>
		
		<link type="text/css" href="css/jquery-ui-1.9.0.custom.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/bootstrapCustom3.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
		<link rel="stylesheet" href="css/common.css">
		<link rel="stylesheet" href="css/resultado.css">
		
		

		<link rel="stylesheet" type="css" href="css/jquery.jqplot.css" />
		
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
                            <li><a href="informacion.php">Que es SmartVote?</a></li>
                            <li><a href="contactanos.php">Contactanos</a></li>
							<li class="active"><a href="resultado.php">Ejemplos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
		  <div class="row-fluid">
			<div class="span4">
			  <div class="negro bordeRedondoGral">
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
					<li><a href="#" id="masVotadosEncuestasPorPrograma"><i class="icon-plus"></i>  Votos por programa</a></li>
					<li><a href="#" id="masVotadosPreguntasPorEncuestas"><i class="icon-plus"></i>  Votos por enuesta</a></li>
					<br>
				</ul>
			</div>
			<br>
			</div>
			<div class="span8">
				<div class="negro bordeRedondoGral">
					<h3 id="tituloAccion" align="center">Resultados</h3>
				</div>
				<div id="alertaCragaDatos" class="alert ocultar TamAlerta">
					<strong>Warning!</strong> Ocurrio un Error, Intentelo mas tarde.
				</div>
				<br />	
				<div id="contenido" align="center">
					<table id='tablaContenido' align="center"></table>
					<div id='paginacion'></div>
				</div>
			</div>
		  </div>
        </div> 
		
		<input type="hidden" id="hdnIdPrograma" value="" />
		
		<script src="js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>
        <script src="js/vendor/jquery-1.8.0.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
		<script src="js/jquery-ui-1.9.0.custom.min.js"></script>
		
		<script src="js/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="js/jquery.jqGrid.min.js" type="text/javascript"></script>
        
		<script language="javascript" type="text/javascript" src="js/jquery.jqplot.min.js"></script>
		
		<script type="text/javascript" src="js/plugins/jqplot.pieRenderer.min.js"></script>
		<script type="text/javascript" src="js/plugins/jqplot.donutRenderer.min.js"></script>
		
		<script type="text/javascript" src="js/ddslick.js"></script>

		<script src="js/resultado2.js" type="text/javascript"></script>
		
		<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
 
    </body>
</html>
