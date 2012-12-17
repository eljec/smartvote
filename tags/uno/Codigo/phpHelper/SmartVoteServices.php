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
								
								$page = $_GET['page'];  // Almacena el numero de pagina actual
							    $limit = $_GET['rows']; // Almacena el numero de filas que se van a mostrar por pagina
							    $sidx = $_GET['sidx'];  // Almacena el indice por el cual se harï¿½ la ordenaciï¿½n de los datos
							    $sord = $_GET['sord'];  // Almacena el modo de ordenaciï¿½n
							
							    if(!$sidx) $sidx =1;
															
								$respuesta = $adminServicio->BuscarProgramas_Paginado($page,$limit,$sidx,$sord,$_GET);
							}
							else
							{
								/* Sin paginar */
								
								if(isset($_GET["autocomplete"]))
								{
									if(isset($_GET["like"]))
									{
										/* Auocomplete */
										
										$like = $_GET['like'];
										$respuesta = $adminServicio->BuscarProgramasAutoComplete($like);
									}
									else
									{
										errorParametros("LA URL NO CONTIENE PARAMETROS NECESARIOS");	
									}
								}
								else
								{
									/* Busqueda Común */
									
									if(isset($_GET["activos"]))
									{
										$respuesta = $adminServicio->BuscarProgramas($_GET["activos"]);
									}
									else {
										$respuesta = $adminServicio->BuscarProgramas("");
									}
										
									
								}								
							}
						}
						else
						{
							errorParametros("LA URL NO CONTIENE EL PARAMETRO paged");
						}
						break;
						
					case 2: // Obtiene todas las encuestas segun un programa especifico //

							if(isset($_GET["paged"]))
							{
								$flagPaged = $_GET["paged"];
							
								if($flagPaged == 1)
								{
									/* Paginada */
									
									$page = $_GET['page'];  // Almacena el numero de pagina actual
								    $limit = $_GET['rows']; // Almacena el numero de filas que se van a mostrar por pagina
								    $sidx = $_GET['sidx'];  // Almacena el indice por el cual se harï¿½ la ordenaciï¿½n de los datos
								    $sord = $_GET['sord'];  // Almacena el modo de ordenaciï¿½n

								    if(!$sidx) $sidx =1;
																
									$respuesta = $adminServicio->BuscarEncuestas_Paginado($page,$limit,$sidx,$sord,$_GET);
								}
								else
								{								
									if(isset($_GET["id_p"]))
									{
										$id_program=$_GET["id_p"]; 	
										
										 /* Busqueda Común */	
										 
										if(isset($_GET["activos"]))
										{
											$respuesta = $adminServicio->BuscarEncuestas($id_program,$_GET["activos"]);
										}
										else {
											$respuesta = $adminServicio->BuscarEncuestas($id_program, "");
										}
										 
										 
										
									}
									else
									{
										errorParametros("LA URL NO CONTIENE EL PARAMETRO id_p");
									}
																
								}
							}
							else
							{
								errorParametros("LA URL NO CONTIENE EL PARAMETRO paged");
							}	
					break;
						
					case 3: // Obtiene todas las preguntas segun una encuesta especifica //

						if(isset($_GET["id_p"], $_GET["id_e"]))
						{
							$id_program=$_GET["id_p"];
							
							$id_encuesta=$_GET["id_e"];
							
							if(isset($_GET["paged"]))
							{
								if($_GET["paged"] == 1)
								{
									$respuesta = $adminServicio->BuscarPreguntas_Paginado($_GET, $id_encuesta);
								}
								else
								{
									$respuesta = $adminServicio->BuscarPreguntas($id_program,$id_encuesta);
								}
							}
							else 
							{
								errorParametros("LA URL NO CONTIENE  PARAMETRO paged");
							}
								
							
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
					
					case 5:  // Validar votacion de una encuesta //
						
						if(isset($_GET["id_e"], $_GET["idTV"]))
						{
							$idEncuesta=$_GET["id_e"];
						 
							$idTv=$_GET["idTV"];
						 
							$respuesta = $adminServicio->ValidarVotoEncuesta($idEncuesta,$idTv);
						}
						else
						{
							errorParametros("LA URL NO CONTIENE ALGUNO DE LOS PARAMETRO id_E O IDtV");
						} 
						
					break;
					
					case 6:
							$varGet = $_GET;
						
							$respuesta = $adminServicio->programasNuevaTabla($varGet);
						break;
						
					case 7:
							$varGet = $_GET;
						
							$respuesta = $adminServicio->encuestasNuevaTabla($varGet);
						break;
					case 8:
							if(isset($_GET["tipo_tuto"], $_GET["num_imagen"]))
							{
								$tipo_tuto=$_GET["tipo_tuto"];
							 
								$id_imagen=$_GET["num_imagen"];
							 
								$respuesta = $adminServicio->GetUrlImagen($tipo_tuto,$id_imagen);
							}
							else
							{
								errorParametros("LA URL NO CONTIENE ALGUNO DE LOS PARAMETRO tipo_tuto O num_imagen");
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
					
						// Analizo si es un voto con el Identificador de Tv o no 
						
						if(isset( $_POST["votos"],$_POST["idE"]))
						{
							
							$datos=$_POST["votos"];

							$idEncuesta =$_POST["idE"];
									
							if(isset($_POST["idTv"]))
							{
								$idTv = $_POST["idTv"];
	
								$respuesta = $adminServicio->GuardarVotos($datos,$idEncuesta,$idTv);
							}
							else 
							{
								$respuesta = $adminServicio->GuardarVotosAux($datos,$idEncuesta);
							}									
						}
						else
						{
							errorParametros("LA URL NO CONTIENE LOS PARAMETRO CORRECTOS");
						} 
							
						

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
					
					case 'grafico':
						
						if(isset($_POST["de"]))
						{
							switch ($_POST["de"]) 
							{
								case 'programas':
										$respuesta = $adminServicio->GraficoPrograma();
									break;
								case 'encuestas':
										$nombre_p = $_POST['nombreP'];
										$respuesta = $adminServicio->GraficoEncuesta($nombre_p);
									break;
								case 'preguntas':
								
										$id_e = $_POST['id_e'];
										$indice= $_POST['indice'];
										
										$respuesta = $adminServicio->GraficoPreguntas($id_e,$indice);
										
									break;
								default:
										throw new Exception('Error MySQL');
									break;
							}
						}
						else {
							errorParametros("LA URL NO CONTIENE LOS PARAMETROS CORRECTOS");
						}
					break;
					case 'usuario':
						
							if(isset( $_POST["nombreU"],$_POST["contraU"], $_POST["programaU"],$_POST["accion"],$_POST["descPU"]))
							{
								$nombreU=$_POST["nombreU"];
	
								$contraU=$_POST["contraU"];
							 
								$programaU=$_POST["programaU"];
								
								$accion = $_POST["accion"];
								
								$descPU = $_POST["descPU"];
								
								switch ($accion) {
									case 'new':
											$respuesta = $adminServicio->CrearUsuario($nombreU,$contraU,$programaU,$descPU);
										break;
									
									default:
										
										break;
								}
								
							}
							else
							{
								errorParametros("PARAMETROS");
							} 
						break;
					case 'baja':
								if(isset($_POST["de"]))
								{
									switch ($_POST["de"]) 
									{
										case 'encuesta':
												$id_e = $_POST['id_e'];
												$respuesta = $adminServicio->BajaEncuesta($id_e);
											break;
										default:
												throw new Exception('Error MySQL');
											break;
									}
								}
								else {
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