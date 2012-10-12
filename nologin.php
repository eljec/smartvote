<?php session_start();
 try{
	unset($_SESSION['user']);
	session_destroy();
	echo "{\"respuesta\":\"OK\"}";
	
}catch (Exception $e) {

		echo "{\"respuesta\":\"ERROR\"}";
	}
?>