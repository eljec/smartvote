<?php
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
	
	//echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";

	/*$browser = get_browser(null, true);
	print_r($browser);*/
	
	$arrayURL = [ 
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/imagen_inicio.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_1.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_2.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_3.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_4.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_5.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_6.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/instruccion_7.PNG',
		'http://www.tesiscastillo.com.ar/smartvote/tutos/votar/imagen_fin.PNG'
		];
		
	//print_r($arrayURL);
	
	$ema = 1;
	
	/*try
	{
		$ema = $arrayURL[10];
		
	}catch(Exception $ex)
	{
		$ema = "and";
	}*/
	
	if( isset( $arrayURL[10]) )
	{
		 $ema="2";
	 }
	else
		{
			$ema = "and";
		}
	
	
	echo $ema;
?>

