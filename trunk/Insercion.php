<?php

// Importo la clase que me permite conectarme con la base 

include("conexion.php");

// Variables por GET 

$varGet = $_GET;

$base = new DBase();

$datos=$varGet["votos"];

$idEncuesta =$varGet["idE"];

$idTv = $varGet["idTv"];

//Split de los votos 

$filas = explode(";", $datos);

$contador = -1;

foreach($filas as &$fila)
{  
   $votosIds=explode("-", $fila);
   
   $contador = $contador + 1;
   
   $arrayIdPregunta[$contador] = $votosIds[0];
   
   $arrayPuntuacion[$contador] = $votosIds[1];

 }

try{
    $resultado = $base->insertarTransaccion($arrayIdPregunta,$arrayPuntuacion,$idEncuesta,$idTv);

    echo $resultado;
    
 }catch (Exception $e) {
    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}

?>