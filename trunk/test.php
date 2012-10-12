<?php

include("phpHelper/respuesta.php");

$test = new Respuesta("ERROR", "REPETIDO"); 

echo json_encode($test);

?>