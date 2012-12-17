<?php

include("phpHelper/Usuario.php");

$usuario = new Usuario('jemac');
	
$categoria = $usuario->getCategoriaUsuario();

echo $categoria;

?>