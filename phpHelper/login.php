<?php

session_start();

/* Login  */

/* Importo la clase que me permite conectarme con la base */

include_once("conexion.php");
include_once("Respuesta.php");

/* Variables por POST */

 $user=$_POST["user"]; //obtengo el usuario del formulario   //nombres por defecto German contra 12345678 y Leopoldo contra 'holamundo'
 $pass=$_POST["pass"]; //obtengo la contraseña del formulario

 $user_escape = mysql_real_escape_string($user);
 $pass_escape = mysql_real_escape_string($pass);
 
 $consulta="SELECT nombre FROM usuarios WHERE nombre='".$user_escape."' and contraseña='".$pass_escape."'";

 $base = new DBase();

 $respuesta = "";
 try{
	$resultado = $base->consultar($consulta);
	
	$count=mysql_num_rows($resultado);
	
	if($count > 0)
	{	
		while($reg=mysql_fetch_array($resultado)){
            $_SESSION["user"]=$reg[0];
        }
		
		$respuesta = new Respuesta("OK","");
		
		echo json_encode($respuesta);
	}
	else
	{
		$respuesta = new Respuesta("ERROR","VALORES INCORRECTOS");
		
		echo json_encode($respuesta);
	}
}catch (Exception $e) {

		$respuesta = new Respuesta("ERROR"," ERROR DE BASE DE DATOS ");
		
		echo json_encode($respuesta);
		
	}
?>