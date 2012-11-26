<?php
include 'phpHelper/GChart.php';
	/*date_default_timezone_set('UTC');

	$fecha_actual = date("Y-m-d H:i:s");
	echo $fecha_actual;*/
	
	/*$arrayPreguntas = "1-2;";
	
	$filas = explode(";", $arrayPreguntas);
	
	foreach($filas as &$fila)
			{  
			   echo $fila;

			}*/
	
	/*$array = array(
    "foo" => "bar",
    "bar" => "foo",
);*/

/*$array["foo"] = "ema";
$array["ju"] = 1;
	
	var_dump($array);*/

	
	//echo $fecha_actual =  date("Y-m-d H:i:s");
	
	$pie2d=new GChart_Pie2D(150,150);  
$pie2d->add(50);  
$pie2d->add(25);  
$pie2d->add(6);
	
	
?>

