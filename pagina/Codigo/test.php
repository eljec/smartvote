<?php
	/*date_default_timezone_set('UTC');

	$fecha_actual = date("Y-m-d H:i:s");
	echo $fecha_actual;*/
	
	$arrayPreguntas = "1-2;";
	
	$filas = explode(";", $arrayPreguntas);
	
	foreach($filas as &$fila)
			{  
			   echo $fila;

			}
	
?>