<?php session_start();

include_once("Respuesta.php");

 try{
	unset($_SESSION['user']);
	session_destroy();
	echo json_encode(new Respuesta("OK",""));
	
}catch (Exception $e) {

		echo json_encode(new Respuesta("ERROR",""));
	}
?>