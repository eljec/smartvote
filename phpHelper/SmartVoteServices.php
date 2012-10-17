<?php

	include_once("SmartVoteManager.php");
	//include("Respuesta.php");
	
	// Este archivo se encarga de analizar la URL y relacionarla con los metodos que corresponda //
	
	switch($_SERVER['REQUEST_METHOD'])
	{
		case 'GET': 
			metodoGet();
		break;
			
		case 'POST': 
			metodoPost();
		break;
		
		default:
			errorMetodo();
	}
	
	// Funciones 
	
	function metodoGet()
	{
		$adminServicio = new SmartVoteManager();
		
		if(empty($_GET)) 
		{
			$resp= new Respuesta("ERROR","URL CON PARAMETROS INCORRECTOS");
			echo json_encode($resp);
		}
		else
		{
			if(isset($_GET["action"]))
			{
				$respuesta ="";
				
				switch ($_GET["action"]) 
				{
					case 1: // Obtengo la Lista de Programas, puede ser paginado o no 
					
						if(isset($_GET["paged"]))
						{
							$flagPaged = $_GET["paged"];
							
							if($flagPaged == 1)
							{
								/* Paginada */
								
								$respuesta = $adminServicio->BuscarProgramas_Paginado();
							}
							else
							{
								/* Sin paginar */
							
								$respuesta = $adminServicio->BuscarProgramas();
							}
						}
						else
						{
							errorParametros("LA URL NO CONTIENE EL PARAMETRO paged");
						}
						break;
						
					case 2: // Obtiene todas las encuestas segun un programa especifico //
						
						if(isset($_GET["id_p"]))
						{
							$id_program=$_GET["id_p"]; 
						
							$respuesta = $adminServicio->BuscarEncuestas($id_program);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE EL PARAMETRO id_p");
						}

						break;
						
					case 3: // Obtiene todas las preguntas segun una encuesta especifica //

						if(isset($_GET["id_p"], $_GET["id_e"]))
						{
							$id_program=$_GET["id_p"];
						
							$id_encuesta=$_GET["id_e"];
						
							$respuesta = $adminServicio->BuscarPreguntas($id_program,$id_encuesta);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE ALGUNO DE LOS PARAMETRO id_p O id_e");
						}

						break;
						
					case 4: // Valida la existencia de una encuesta //
						
						if(isset($_GET["id_p"], $_GET["nombre"]))
						{
							$idPrograma=$_GET["id_p"];
						 
							$nombre=$_GET["nombre"];
						 
							$respuesta = $adminServicio->ValidarExistencia($idPrograma,$nombre);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE ALGUNO DE LOS PARAMETRO id_p O nombre");
						} 
					break;
				}
				
				echo $respuesta;
			}
			else
			{
				errorParametros("LA URL NO CONTIENE EL PARAMETRO action");
			}
		}
		
			
	
	}
	
	
	function metodoPost()
	{
		$adminServicio = new SmartVoteManager();
		
		if(empty($_POST)) 
		{
			$resp= new Respuesta("ERROR","URL CON PARAMETROS INCORRECTOS");
			echo json_encode($resp);
		}
		else
		{
			if(isset($_POST["tipo"]))
			{
				$respuesta ="";
				
				switch ($_POST["tipo"]) 
				{
					case "programa": // Insersion de un nuevo programa
					
						if(isset($_POST["nombre"], $_POST["desc"]))
						{
							$desc=$_POST["desc"];
						 
							$nombre=$_POST["nombre"];
						 
							$respuesta = $adminServicio->InsertarPrograma($nombre,$desc);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE ALGUNO DE LOS PARAMETRO id_p O nombre");
						} 
					break;
						
					case "encuesta": // Insersion de una nueva encuesta, incluye a las preguntas tambien
						
						if(isset( $_POST["id_p"],$_POST["nombreE"], $_POST["descE"], $_POST["Arr_preguntas"]))
						{
							$id_p=$_POST["id_p"];

							$descE=$_POST["descE"];
						 
							$nombreE=$_POST["nombreE"];
							
							$arrayPreguntas=$_POST["Arr_preguntas"];
						 
							$respuesta = $adminServicio->InsertarEncuesta($id_p,$nombreE,$descE,$arrayPreguntas);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE ALGUNO DE LOS PARAMETRO");
						} 
					break;
						
					case "votos": // Insertar votos por parte de la TV

					break;
					
					case "contacto":
						if(isset( $_POST["nombreC"],$_POST["correoC"], $_POST["consultaC"]))
						{
							$nombreC=$_POST["nombreC"];

							$correoC=$_POST["correoC"];
						 
							$consultaC=$_POST["consultaC"];
						 
							$respuesta = $adminServicio->EnviarCorreo($nombreC,$correoC,$consultaC);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE LOS PARAMETROS CORRECTOS");
						} 
					break;
					
					default:
						errorParametros("METODO NO ENCONTRADO");
				}
				
				echo $respuesta;
			}
			else
			{
				errorParametros("LA URL NO CONTIENE EL PARAMETRO tipo");
			}
		}
	}
	
	function errorMetodo()
	{
		$resp = new Respuesta("ERROR","METODO DE LA PETICION INCORRECTO");
		echo json_encode($resp);
	}
	
	function errorParametros($descripcionError)
	{
		$resp= new Respuesta("ERROR",$descripcionError);
		echo json_encode($resp);
	}
?>