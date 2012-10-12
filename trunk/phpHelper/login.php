<?php

session_start();

/* Login  */

/* Importo la clase que me permite conectarme con la base */

include("conexion.php");

/* Variables por POST */

 $user=$_POST["user"]; //obtengo el usuario del formulario   //nombres por defecto German contra 12345678 y Leopoldo contra 'holamundo'
 $pass=$_POST["pass"]; //obtengo la contraseña del formulario

 $user_escape = mysql_real_escape_string($user);
 $pass_escape = mysql_real_escape_string($pass);
 
 $consulta="SELECT nombre FROM usuarios WHERE nombre='".$user_escape."' and contraseña='".$pass_escape."'";

 $base = new DBase();

 try{
	$resultado = $base->consultar($consulta);
	
	$count=mysql_num_rows($resultado);
	
	if($count > 0)
	{	
		while($reg=mysql_fetch_array($resultado)){
            $_SESSION["user"]=$reg[0];
        }
		echo "{\"respuesta\":\"OK\"}";
	}
	else
	{
		echo "{\"respuesta\":\"ERROR\"}";
	}
}catch (Exception $e) {

		echo "{\"respuesta\":\"ERROR\"}";
	}
?>