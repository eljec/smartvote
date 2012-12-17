<?php

session_start();

/* Login  */

/* Importo la clase que me permite conectarme con la base */

include_once("SmartVoteDB.php");
include_once("Respuesta.php");
include_once("Usuario.php");

/* Variables por POST */

 $user=$_POST["user"]; //obtengo el usuario del formulario  
 $pass=$_POST["pass"]; //obtengo la contraseña del formulario

 $base = new SmartVoteDB();
 try{
	
	$resultado = $base->LogIn($user, $pass);
	
	$count=mysql_num_rows($resultado);
	
	if($count > 0)
	{
		// Obtengo la categoria
		
		$usuario = new Usuario($user);

		$categoria = $usuario->getCategoriaUsuario();
		
		if($categoria == 'administrador')
		{
			while($reg=mysql_fetch_array($resultado)){
            	$_SESSION["user"]=$reg[0];
			}
        }	
		else {
			
			while($reg=mysql_fetch_array($resultado)){
            	$_SESSION["user"]=$reg[0];
				$_SESSION["programa"]=$reg[1];
				$_SESSION["idP"]=$reg[2];
			}
		}
		
		// Obtengo permisos 
		
		$permisos = $usuario->getPermisosUsuarios($user);
		
		// Guardo en sesion 
		
		$_SESSION["categoria"]=$categoria;
		$_SESSION["permisos"]=$permisos;
		
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