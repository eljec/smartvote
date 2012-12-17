<?php

// Importo la clase que me permite conectarme con la base 

include("conexion.php");

// Variables por GET 

$varPost = $_POST;

$base = new DBase();

// Insercion de un solo elemento, que puede ser encuesta, programa, pregunta o votos //

$tipoInsert = $varPost["tipo"];

switch($tipoInsert)
{
	case "programa":
		$nombre = $varPost["nombre"];
		$descripcion = $varPost["desc"];
		$cadenaInsertar="Insert into programas (id, nombre, descripcion,Activo) values ( '','".$nombre."','".$descripcion."',1)";
		$cadenaValidar ="SELECT * FROM programas WHERE nombre='".$nombre."'";
		
		try{

			 // Antes de insertar Valido 

			$existe = $base->validarExistencia($cadenaValidar);
			
			if($existe)
			{
				echo "{\"respuesta\":\"REPETIDO\"}";
			}
			else
			{
				$base->insertar($cadenaInsertar);
				
				echo "{\"respuesta\":\"OK\"}";
			}
		}
		catch (Exception $e) {

			echo "{\"respuesta\":\"ERROR\"}";
		}
		
	break;
	
	case "encuesta":
	
		$nombre = $varPost["nombre"];
		$descripcion = $varPost["desc"];
		$idP= $varPost["idp"];
		$fecha_actual = date("Y-m-d");
		$cadenaInsertar="Insert into encuestas (id,id_p,nombre,descripcion,fechainicio,fechafin,activo) values ('','".$idP."','".$nombre."','".$descripcion."','".$fecha_actual."','',1)";
		$cadenaValidar ="SELECT * FROM encuestas WHERE id_p='".$idP."' and nombre='".$nombre."'";
		
		try{
			
			$existe = $base->validarExistencia($cadenaValidar);
			
			if($existe)
			{
				echo "{\"respuesta\":\"REPETIDO\"}";
			}
			else
			{
				$base->insertar($cadenaInsertar);
				
				echo "{\"respuesta\":\"OK\"}";
			}
		}
		catch (Exception $e) {

			echo "{\"respuesta\":\"ERROR\"}";
		}
	break;
	
	case "pregunta":
		
		$datos=$varPost["Arr_preguntas"];

		$idEncuesta =$varPost["idE"];
		
		//Split de las preguntas 

		$filas = explode(";", $datos);

		$contador = -1;

		foreach($filas as &$fila)
		{  
		   $votosIds=explode("-", $fila);
		   
		   $contador = $contador + 1;
		   
		   $arrayNumPreguntas[$contador] = $votosIds[0];
		   
		   $arrayDescPreguntas[$contador] = $votosIds[1];

		 }

		try{

                        // Elimino las preguntas que ya estan

                        $resultadoEliminacion = $base->deletePreguntasTransaccion($id_Encuesta);

                        if(!$resultadoEliminacion)
                        {
                             echo "{\"respuesta\":\"ERROR\"}";
                        }
                        else
                        {
                            $resultado = $base->insertarTransaccionPreguntas($arrayNumPreguntas,$arrayDescPreguntas,$idEncuesta);

                            switch($tipoInsert)
                            {
                                    case 'ok':
                                            echo "{\"respuesta\":\"OK\"}";
                                    break;
                                    case 'error':
                                            echo "{\"respuesta\":\"ERROR\"}";
                                    break;
                                    case 'reperido':
                                            echo "{\"respuesta\":\"REPETIDO\"}";
                                    break;

                            }
                        }  
		 }catch (Exception $e) {
		 
			echo "{\"respuesta\":\"ERROR\"}";
		}
		
	
	break;
	
	case "votos":
	
		$datos=$varPost["votos"];

		$idEncuesta =$varPost["idE"];

		$idTv = $varPost["idTv"];

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

			if($resultado == 'ok')
			{
				echo "{\"respuesta\":\"OK\"}";
			}
			else
			{
				echo "{\"respuesta\":\"ERROR\"}";
			}
			
		 }catch (Exception $e) {
		 
			echo "{\"respuesta\":\"ERROR\"}";
		}
	break;	
}

?>