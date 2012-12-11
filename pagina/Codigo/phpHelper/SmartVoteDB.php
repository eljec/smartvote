<?php

	include("Respuesta.php");
	
class SmartVoteDB {
	
	private $db_host="localhost"; 
	private $db_usuario="jemac"; 
	private $db_password="0702364"; 
	private $db_nombre="jemac_tesis";

	private $db_conexion;
	private $db_conexionTran;
	
	
	// ------------------------------  METODOS PRIVADOS (BASE DE DATOS)---------------------------------------->
	
	private function conectar ()
	{    
		$this->db_conexion = mysql_connect($this->db_host, $this->db_usuario, $this->db_password) or die(mysql_error());
		mysql_select_db($this->db_nombre,$this->db_conexion);   
	}

	private function conectarTran ()
	{    
		$this->db_conexionTran = mysqli_connect($this->db_host, $this->db_usuario, $this->db_password,$this->db_nombre); 
	}

	private function buscar($consulta)
	{
		try{
		
			$this->conectar();
			
			$result = mysql_query($consulta, $this->db_conexion);
			
			// Cierro la conexion //

			mysql_close($this->db_conexion);

			// Retorno la respuesta //
			
			return $result;	

		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}
	
	public function validarRepetido($stringConsultar)
	{
		try{
		
			$this->conectar();
			
			$resultado = mysql_query($stringConsultar, $this->db_conexion);
			
			$numFilas = mysql_num_rows($resultado);
		
			mysql_close($this->db_conexion);
			
			if($numFilas > 0)
				return true;
			else
				return false;
		
		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}

	public function insertar($cadenaInsersion)
	{
		try{
	
			$this->conectar();
			
			$flag = mysql_query($cadenaInsersion);
		
			mysql_close($this->db_conexion);

		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}	
	}
	
	public function ValidarExistencia($idPrograma,$nombre)
	{
		$cadenaConsulta = "SELECT * FROM encuestas WHERE id_p='".$idPrograma."' and nombre='".utf8_decode($nombre)."'";

		return $this->validarRepetido($cadenaConsulta);
	}
	
	private function validarNombreUsuario($user)
		{
			try{
		   	
				$this->conectar();
				
				$user_escape = mysql_real_escape_string($user);

	 			$consulta="SELECT nombre FROM usuarios WHERE nombre='".$user_escape."'";
				
				$resultado = mysql_query($consulta);
			
				mysql_close($this->db_conexion);
				
				return $resultado;
			
		   }catch(exception $e)
		   {
		   	 	mysql_close($this->db_conexion);
				
				throw new Exception('Error MySQL');
		   }
		}	
	
	// ------------------------------- METODOS PUBLICOS ------------------------------------------------------>
	
	//---> LOG IN 
	
	public function LogIn($user,$pass)
	{
	   try{
	   	
			$this->conectar();
			
			$user_escape = mysql_real_escape_string($user);
 			$pass_escape = mysql_real_escape_string($pass);
			
			if($user == 'jemac')
			{
				$consulta="SELECT nombre FROM usuarios WHERE nombre='".$user_escape."' and contraseña='".$pass_escape."'";
			}
			else {
				$consulta="SELECT u.nombre, p.nombre as nombrep, p.id as idPrograma FROM usuarios as u, programas as p WHERE u.nombre = p.usuario and u.activo='1' and u.nombre='".$user_escape."' and u.contraseña='".$pass_escape."'";
			}

			$resultado = mysql_query($consulta);
		
			mysql_close($this->db_conexion);
			
			return $resultado;
		
	   }catch(exception $e)
	   {
	   	 	mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
	   }
	}
	
	//--->BUSCAR 
	
	public function BuscarProgramas($tipo)
	{
		
		switch ($tipo) {
			case 'true':
					$queEmp = "SELECT * FROM programas as p where p.activo=1";
				break;
			case 'false':
					$queEmp = "SELECT * FROM programas as p where p.activo=0";
				break;
			default:
					$queEmp = "SELECT * FROM programas";
				break;
		}
		
		try{
		
			$this->conectar();
			
			$result = mysql_query($queEmp, $this->db_conexion);
			
			// Cierro la conexion //

			mysql_close($this->db_conexion);

			// Retorno la respuesta //
			
			return $result;	

		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}
	
	public function BuscarProgramasAutoComplete($like)
	{
	
		//$resultado = $this->buscar($queEmp);
		
		try{
		
			$this->conectar();
			
			$like_escape = mysql_real_escape_string($like);
		
			$queEmp = "SELECT * FROM programas as p where p.activo=1 and p.nombre like '%".$like_escape."%'";
			
			$result = mysql_query($queEmp, $this->db_conexion);
			
			// Cierro la conexion //

			mysql_close($this->db_conexion);

			// Retorno la respuesta //
			
			return $result;	

		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
		
		//return $resultado;
				
	}
	
	public function CantidadPreguntasActivas($id_e)
	{
		$queEmp ="SELECT COUNT(*) AS count FROM preguntas as pr where pr.id_e='".$id_e."'";
		
		$resultado = $this->buscar($queEmp);
		
		$row = mysql_fetch_array($resultado);
		
		$count = $row['count'];
		
		return $count;
	
	}
	
	public function CantidadEncuestas($_where)
	{
		$queEmp = "SELECT COUNT(*) AS count FROM programas as p, encuestas as e WHERE p.id=e.id_p ".$_where;
		
		//echo $queEmp;
		
		$resultado = $this->buscar($queEmp);
		
		$row = mysql_fetch_array($resultado);
		
		$count = $row['count'];
		
		return $count;
	}
	
	public function CantidadProgramas($clase)
	{
		
		switch ($clase) {
			case 'activos':
					$queEmp ="SELECT COUNT(*) AS count FROM programas as p where p.activo=1";
				break;
			case 'inactivos':
					$queEmp ="SELECT COUNT(*) AS count FROM programas as p where p.activo=0";
				break;
			default:
					$queEmp ="SELECT COUNT(*) AS count FROM programas";
				break;
		}

		try{
		
			$this->conectar();
			
			$resultado = mysql_query($queEmp, $this->db_conexion);
			
			// Cierro la conexion //

			mysql_close($this->db_conexion);

			// Se obtiene el resultado de la consulta
			
			$row = mysql_fetch_array($resultado);
			$count = $row['count'];
			
			// Retorno la respuesta //
		
			return $count;

		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}
	
	public function ObtenerPagina($start,$limit,$sidx,$sord,$tipo,$_where,$inactivo)
	{
				
			switch ($tipo) {
				case 'programa':
						$consulta = "SELECT * FROM programas ".$_where." ORDER BY ".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
					break;
				case 'encuesta':
						if($_where == "")
						{
							if($inactivo == "0")
							{						
								$consulta = "SELECT e.id,e.nombre,e.descripcion,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p and e.activo=1 ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
							}
							else {
								$consulta = "SELECT e.id,e.nombre,e.fecha_inicio,e.fecha_fin,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p and e.activo=0 ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
							}
						}					
						else {
							
							if($inactivo == "0")
							{
								$consulta = "SELECT e.id,e.nombre,e.descripcion,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p ".$_where." ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
							}
							else {
								
								$consulta = "SELECT e.id,e.nombre,e.fecha_inicio,e.fecha_fin,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p ".$_where." ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
							}
							
						}
					break;
				case 'preguntas':
							
							$consulta = $_where." ORDER BY ".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
					break;
			}		
					
		try{

			$this->conectar();
			
			//echo $consulta;
			
			$result = mysql_query($consulta, $this->db_conexion);
			
			// Cierro la conexion //

			mysql_close($this->db_conexion);
			
			
			// Retorno la respuesta //

			return $result;	
		
		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}
	
	public function BuscarEncuestas($id_program,$tipo)
	{
		switch ($tipo) {
			case 'true':
					$auxString = "select e.id, e.id_p, e.nombre, e.descripcion from programas as p,encuestas as e where e.id_p = p.id and e.activo=1 and p.id=";
				break;
			case 'false':
					$auxString = "select e.id, e.id_p, e.nombre, e.descripcion from programas as p,encuestas as e where e.id_p = p.id and e.activo=0 and p.id=";
				break;
				
			default:
					$auxString = "select e.id, e.id_p, e.nombre, e.descripcion from programas as p,encuestas as e where e.id_p = p.id and p.id=";
				break;
		}
		
		$queEmp = $auxString . $id_program;
		
		try{
		
			$this->conectar();
			
			$resultado = mysql_query($queEmp, $this->db_conexion);

			mysql_close($this->db_conexion);

			return $resultado;	
		
		}catch (Exception $e) {
		
			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}
		
	public function BuscarPreguntas($id_program,$id_encuesta)
	{
		
		// 1) Obtengo total de preguntas
		
		$consulta = "SELECT count(*) as cantidad FROM preguntas WHERE id_e='".$id_encuesta."'";
		
		$resultado = $this->buscar($consulta);
		
		$row = mysql_fetch_array($resultado);
		
		$total = $row['cantidad'];
		
		$auxString = "select pr.id, pr.descripcion, pr.orden from encuestas as e, preguntas as pr where e.id = pr.id_e and e.id='";
		
		$aux="order by pr.orden asc";

		$queEmp = $auxString . $id_encuesta . "'".  $aux;
		
		try{
		
			$this->conectar();
			
			$resultado = mysql_query($queEmp, $this->db_conexion);

			mysql_close($this->db_conexion);

			
			$datosret["total"] = $total;
			$datosret["preguntas"] = $resultado;
			
			//echo $datosret;
			
			return $datosret;	
		
		}catch (Exception $e) {
		
			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}

	}
	
	
	//--->INSERTAR 
	
	public function InsertarPrograma($nombre,$desc)
	{
		$cadenaInsertar="Insert into programas (id, nombre, descripcion,Activo) values ( '','".utf8_decode($nombre)."','".utf8_decode($desc)."',1)";
		$cadenaValidar ="SELECT * FROM programas WHERE nombre='".utf8_decode($nombre)."'";
		
		try{

			$existe = $this->validarRepetido($cadenaValidar);
			
			if($existe)
			{
				return json_encode(new Respuesta("ERROR","REPETIDO"));
			}
			else
			{
				$this->insertar($cadenaInsertar);
				
				return json_encode(new Respuesta("OK",""));
			}
		}
		catch (Exception $e) {

			throw new Exception('Error MySQL');
		}
	}
	
	private function InsertarEncuestaSola($id_p,$nombre,$desc)
	{
		try{

			$this->conectarTran();

			mysqli_autocommit($this->db_conexionTran, false);

			$flag = true;
			
			$flagRepetido=false;

			$cadenaValidar ="SELECT * FROM encuestas WHERE id_p='".$id_p."' and nombre='".$nombre."'";
			
			//$fecha_actual = new date("Y-m-d");

			$fecha_actual = new DateTime('Y-m-d H:i:s');
			
			$existe = $this->validarRepetido($cadenaValidar);

			if($existe)
			{
				$flag = false;
				$flagRepetido=true;
			}
			else
			{
				$cadenaInsertar="Insert into encuestas (id,id_p,nombre,descripcion,fecha_inicio,fecha_fin,activo) values ('','".$id_p."','".$nombre."','".$desc."','".$fecha_actual."','',1)";

				$flag = mysqli_query($this->db_conexionTran,$cadenaInsersion);
			}

			if ($flag) {

				mysqli_commit($this->db_conexionTran);
				
				mysqli_close($this->db_conexionTran);

				// Busco el Id de la Encuesta //
				
				$queEmp = "Select e.id as Id from encuestas as e where nombre='".$nombre."' and id_p='".$id_p."'";
				
				$this->conectar();
			
				$resultado = mysql_query($queEmp, $this->db_conexion);

				mysql_close($this->db_conexion);

				$idPrograma = mysql_fetch_array($resultado);
				
				return $idPrograma['Id'];

			} else
			{
				mysqli_rollback($this->db_conexionTran);
				
				mysqli_close($this->db_conexionTran);

				throw new Exception('Error MySQL ');
			}

		}catch (Exception $e) {
		
			throw new Exception('Error MySQL ');
		}
	}
	
	public function InsertarEncuesta($id_p,$nombre,$desc,$arrayNumPreguntas,$arrayDescPreguntas)
	{
		try{

			$this->conectarTran();

			mysqli_autocommit($this->db_conexionTran, false);

			$flag = true;
			
			$flagRepetido=false;
			
			$fecha_actual = date("Y-m-d H:i:s"); //date("Y-m-d");

			// Creo la Encuesta y Obtengo su Id--> En caso de error regreso todo al estado anterior 
			
			$cadenaInsertar="Insert into encuestas (id,id_p,nombre,descripcion,fecha_inicio,fecha_fin,activo) values ('','".$id_p."','".utf8_decode($nombre)."','".utf8_decode($desc)."','".$fecha_actual."', NULL,1)";

			$flag = mysqli_query($this->db_conexionTran,$cadenaInsertar);
			
			if(!$flag)
			{
				mysqli_rollback($this->db_conexionTran);
					
				throw new Exception('Error MySQL ');
			}
			else
			{
				
				$queEmp = "Select e.id as Id from encuestas as e where e.nombre='".utf8_decode($nombre)."' and e.id_p='".$id_p."'";
				
				$resultado = mysqli_query($this->db_conexionTran,$queEmp);
				
				if(!$resultado)
				{
					mysqli_rollback($this->db_conexionTran);
					
					throw new Exception('Error MySQL ');
				}
				else
				{
					$idEncuestaFetch = mysqli_fetch_array($resultado);

					$idEncuesta= $idEncuestaFetch['Id'];

					$lengtArray = count($arrayNumPreguntas);

					$i=0;
					while ($i < $lengtArray and $flag == true):

						$cadenaValidar ="SELECT * FROM preguntas WHERE id_e='".$idEncuesta."' and descripcion='".utf8_decode($arrayDescPreguntas[$i])."'";

						$existe = $this->validarRepetido($cadenaValidar);

						if($existe)
						{
								$flag = false;
								$flagRepetido=true;
						}
						else
						{
								$cadenaInsersion= "Insert into preguntas (id,id_e,descripcion,orden) values ( '','".$idEncuesta."','".utf8_decode($arrayDescPreguntas[$i])."','".$arrayNumPreguntas[$i]."')";

								$flag = mysqli_query($this->db_conexionTran,$cadenaInsersion);
						}

						$i++;
					endwhile;

					if ($flag) {

						mysqli_commit($this->db_conexionTran);
						
						//mysqli_close($this->db_conexionTran);

						return $retorno= json_encode(new Respuesta("OK",""));

					} else
					{
						mysqli_rollback($this->db_conexionTran);
						
						mysqli_close($this->db_conexionTran);
						
						if($flagRepetido)
							return $retorno= json_encode(new Respuesta("ERROR","REPETIDO"));
						else
							throw new Exception('Error MySQL ');
					}			
				}
			}
		}catch (Exception $e) {
			throw new Exception('Error MySQL ');
		}
	}
	
	
	//--->GRAFICO 
	 
	public function GraficoPrograma()
	{
		
		$cadenaConsulta = "SELECT p.nombre,COUNT(*)as cantidad FROM encuestasvotadas as ev, encuestas as e, programas as p WHERE e.id_p = p.id and e.id=ev.id_e GROUP BY p.id";
		
		return $resultado = $this->buscar($cadenaConsulta);
	}
	
	public function GraficoEncuesta($nombre_p)
	{

		$cadenaConsulta = "SELECT e.nombre,COUNT(*)as cantidad FROM encuestasvotadas as ev, encuestas as e, programas as p WHERE e.id_p = p.id and e.id=ev.id_e and p.nombre='".utf8_decode($nombre_p)."' GROUP BY ev.id_e";
		
		return $resultado = $this->buscar($cadenaConsulta);

	}
	
	public function GraficoPreguntas($id_encuesta,$indice)
	{
		$anterior ="";
		$siguiente="";
		$total = "";	
			
		if($indice == 1)
			$anterior = null;
		else 
			$anterior = $indice -1;
		
		
		// 1) Obtengo total de preguntas
		
		$consulta = "SELECT count(*) as cantidad FROM preguntas WHERE id_e='".$id_encuesta."'";
		
		$resultado = $this->buscar($consulta);
		
		$row = mysql_fetch_array($resultado);
		
		$total = $row['cantidad'];
		
		// 2) Obtengo el id de la encuesta 
		
		$consulta = "SELECT id,descripcion FROM preguntas WHERE id_e='".$id_encuesta."' and orden='".$indice."'";
		
		//echo $consulta;
		
		$resultado = $this->buscar($consulta);
		
		$row = mysql_fetch_array($resultado);
		
		$id_pr = $row['id'];
		
		$desc = utf8_encode($row['descripcion']);
		
		//echo $desc;
		
		// 3) Analizo si tiene siguiente
		
		$siguiente = $indice +1;
		
		$stringConsultar = "SELECT id FROM preguntas WHERE id_e='".$id_encuesta."' and orden='".$siguiente ."'";
		
		$resultado = $this->validarRepetido($stringConsultar);
		
		if(!$resultado)
		{
			$siguiente = null;
		}
		
		// 4) Obtengo votos para esa pregunta 
		
		$votos = $this->ObtenerVotosPorPregunta($id_pr);
		
		
		$datosret["anterior"] = $anterior;
		$datosret["actual"] = $indice;
		$datosret["siguiente"] = $siguiente;
		$datosret["total"] = $total;
		$datosret["desc"] = $desc;
		$datosret["votos"] = $votos;
		
		//var_dump($datosret);
		
		return $datosret;
						
	}
	
	public function ObtenerVotosPorPregunta($id_pr)
	{
		//$arrayResultado = array();
				
		//$cadenaConsulta = "SELECT count(calificacion) as cantidad from votos where calificacion=1 and id_e='".$id_e."'";
		
		$cadenaConsulta = "SELECT count(calificacion) as cantidad from votos where calificacion=1 and id_pr='".$id_pr."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$row = mysql_fetch_array($resultado);
		
		$cantidadSI = $row['cantidad'];
			
			
		//$cadenaConsulta = "SELECT count(calificacion) as cantidad from votos where calificacion=0 and id_e='".$id_e."'";
		
		$cadenaConsulta = "SELECT count(calificacion) as cantidad from votos where calificacion=0 and id_pr='".$id_pr."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$row = mysql_fetch_array($resultado);
		
		$cantidadNO = $row['cantidad'];
		
		if($cantidadNO ==0 && $cantidadSI ==0)
		{
			$arrayResultado = array();	
		}
		else 
		{
			$arrayResultado[0] = $cantidadSI;
			$arrayResultado[1] = $cantidadNO;
		}

		return $arrayResultado;
	}

	//--->VOTAR
	
	public function GuardarVotos($arrayIdPr,$arrayVotacion,$idEncuesta,$idTv)
	{
		try{
        
	        $this->conectarTran();
	        
	        mysqli_autocommit($this->db_conexionTran, false);
	
	        $flag = true;
	        
	        $lengtArray = count($arrayIdPr);
	
	        $fecha_actual = date("Y-m-d");
	        
	        for($i=0;$i<$lengtArray;$i++)
	        {
	            $cadenaInsersion= "Insert into votos (id_pr, id_e, calificacion,fecha,id_tv) values ( '".$arrayIdPr[$i]."','".$idEncuesta."','".$arrayVotacion[$i]."','".$fecha_actual."','".$idTv."')";
	
	            $flag = mysqli_query($this->db_conexionTran,$cadenaInsersion);
	        }

	        if ($flag) {
	    		
				// Inserto en la Tabla de Encuestas Votadas //
				
				$cadenaInsertar="Insert into encuestasvotadas (id_tv,id_e,fecha) values ('".$idTv."','".$idEncuesta."','".$fecha_actual."')";

				$flag = mysqli_query($this->db_conexionTran,$cadenaInsertar);
				
				if($flag)
				{
					// SI todo sale bien hago comit de transaccion //

	            mysqli_commit($this->db_conexionTran);
	        
				mysqli_close($this->db_conexionTran);
				
	            return json_encode(new Respuesta("OK",""));
	
				}
				else 
				{
					 mysqli_rollback($this->db_conexionTran);
					 
					 mysqli_close($this->db_conexionTran);
	
	            	throw new Exception('Ocurrio un error ');
				}
	        } 
	        else{

	            mysqli_rollback($this->db_conexionTran);
	            
				mysqli_close($this->db_conexionTran);
	
	            throw new Exception('Ocurrio un error ');
	        }
	
		}catch (Exception $e) 
		{
    		throw new Exception('Ocurrio un error ');
		}
	}
	
	public function ValidarVotoEncuesta($idEncuesta,$idTv)
	{
		$cadenaConsulta = "SELECT count(*) as cantidad from encuestasvotadas where id_tv='".$idTv."' and id_e='".$idEncuesta."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$row = mysql_fetch_array($resultado);
		
		$cantidad = $row['cantidad'];
		
		if($cantidad > 0)
		{
			return json_encode(new Respuesta("ERROR","REPETIDO"));
		}
		else {
			return json_encode(new Respuesta("OK",""));
		}
	}
	
	
	public function GuardarVotosAux($arrayIdPr,$arrayVotacion,$idEncuesta)
	{
		try{
        
	        $this->conectarTran();
	        
	        mysqli_autocommit($this->db_conexionTran, false);
	
	        $flag = true;
	        
	        $lengtArray = count($arrayIdPr);
	
	        $fecha_actual = date("Y-m-d");
	        
	        for($i=0;$i<$lengtArray;$i++)
	        {
	            $cadenaInsersion= "Insert into votosaux (id_pr, id_e, calificacion,fecha) values ('".$arrayIdPr[$i]."','".$idEncuesta."','".$arrayVotacion[$i]."','".$fecha_actual."')";
	
	            $flag = mysqli_query($this->db_conexionTran,$cadenaInsersion);
	        }
	
	        if ($flag) {
	   
	            mysqli_commit($this->db_conexionTran);
	        
	            return json_encode(new Respuesta("OK",""));
				
	        } else
	        {
	            mysqli_rollback($this->db_conexionTran);
	
	            throw new Exception('Ocurrio un error ');
	        }
	
	        mysqli_close($this->db_conexionTran);
	
	        return $retorno;

		}catch (Exception $e) 
		{
    		throw new Exception('Ocurrio un error ');
		}
	}

	public function CrearUsuario($nombreU,$contraU,$programaU,$descPU)
	{
		// Valido si ya existe ese programa //
		
		$cadenaConsulta = "SELECT * from programas where nombre='".utf8_decode($programaU)."'";
		
		$repetido = $this->validarRepetido($cadenaConsulta);
	
		if($repetido)
		{
			return json_encode(new Respuesta("ERROR","REPETIDO PROGRAMA"));
		}
		else
		 {
			
			// Valido si ya existe ese usuario //
			
			$existeUsuario = $this->validarNombreUsuario($nombreU);
			
			$numFilas = mysql_num_rows($existeUsuario);
			
			if($numFilas > 0)
				return json_encode(new Respuesta("ERROR","REPETIDO USUARIO"));
			else
			{
				try{
					
					$this->conectarTran();
	        
	        		mysqli_autocommit($this->db_conexionTran, false);
	
	        		$flag = true;
					
					// Creo Usuario //
					
					$cadenaInsertar="Insert into usuarios (nombre, contraseña,activo,categoria) values ('".$nombreU."','".$contraU."',1,2)";
					
					$flag = mysqli_query($this->db_conexionTran,$cadenaInsertar);
					
					if(!$flag)
					{
						mysqli_rollback($this->db_conexionTran);
						
						throw new Exception('Error MySQL');
					}
					else
					{
						// Creo programa //
						
						$cadenaInsertar="Insert into programas (id, nombre, descripcion,activo,usuario) values ( '','".utf8_decode($programaU)."','".utf8_decode($descPU)."',1,'".$nombreU."')";
					
						$flag = mysqli_query($this->db_conexionTran,$cadenaInsertar);
						
						if(!$flag)
						{
							mysqli_rollback($this->db_conexionTran);
							
							throw new Exception('Error MySQL');
						}
						else
						{
							mysqli_commit($this->db_conexionTran);
							
							return json_encode(new Respuesta("OK",""));
						}
					}	
				}
				catch(exception $e)
				{
					throw new Exception('Error MySQL');
				}
			}	
		}

	}

	public function BajaEncuesta($id_e)
	{
		$fecha_actual = date("Y-m-d H:i:s"); //new DateTime('Y-m-d H:i:s');
		
		$consulta = "UPDATE encuestas SET activo=0,fecha_fin='".$fecha_actual."' WHERE id='".$id_e."'";
		
		try{
		
			$this->conectar();
			
			$result = mysql_query($consulta, $this->db_conexion);
			
			// Cierro la conexion //

			mysql_close($this->db_conexion);

			// Retorno la respuesta //
			
			return json_encode(new Respuesta("OK",""));	

		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}
	
	private function procesosNuevaTabla($varGet,$aColumns,$sIndexColumn,$sTable)
	{
				
				/* 
				 * Paging
				 */
				$sLimit = "";
				if ( isset( $varGet['iDisplayStart'] ) && $varGet['iDisplayLength'] != '-1' )
				{
					$sLimit = "LIMIT ".intval( $varGet['iDisplayStart'] ).", ".
						intval( $varGet['iDisplayLength'] );
				}
				
			
				/*
				 * Ordering
				 */
				$sOrder = "";
				if ( isset( $varGet['iSortCol_0'] ) )
				{
					$sOrder = "ORDER BY  ";
					for ( $i=0 ; $i<intval( $varGet['iSortingCols'] ) ; $i++ )
					{
						if ( $varGet[ 'bSortable_'.intval($varGet['iSortCol_'.$i]) ] == "true" )
						{
							$sOrder .= "`".$aColumns[ intval( $varGet['iSortCol_'.$i] ) ]."` ".
							 	mysql_real_escape_string( $varGet['sSortDir_'.$i] ) .", ";
						}
					}
					
					$sOrder = substr_replace( $sOrder, "", -2 );
					if ( $sOrder == "ORDER BY" )
					{
						$sOrder = "";
					}
				}
			
			
				/* 
				 * Filtering
				 * NOTE this does not match the built-in DataTables filtering which does it
				 * word by word on any field. It's possible to do here, but concerned about efficiency
				 * on very large tables, and MySQL's regex functionality is very limited
				 */
				$sWhere = "";
				if ( isset($varGet['sSearch']) && $varGet['sSearch'] != "" )
				{
					$sWhere = "WHERE (";
					for ( $i=0 ; $i<count($aColumns) ; $i++ )
					{
						if ( isset($varGet['bSearchable_'.$i]) && $varGet['bSearchable_'.$i] == "true" )
						{
							$sWhere .= "`".$aColumns[$i]."` LIKE '%".mysql_real_escape_string( $varGet['sSearch'] )."%' OR ";
						}
					}
					$sWhere = substr_replace( $sWhere, "", -3 );
					$sWhere .= ')';
				}
			
				/* Individual column filtering */
				for ( $i=0 ; $i<count($aColumns) ; $i++ )
				{
					if ( isset($varGet['bSearchable_'.$i]) && $varGet['bSearchable_'.$i] == "true" && $varGet['sSearch_'.$i] != '' )
					{
						if ( $sWhere == "" )
						{
							$sWhere = "WHERE ";
						}
						else
						{
							$sWhere .= " AND ";
						}
						$sWhere .= "`".$aColumns[$i]."` LIKE '%".mysql_real_escape_string($varGet['sSearch_'.$i])."%' ";
					}
				}
				
				if($sWhere == "")
				{
					$sWhere = "WHERE activo=0";
				}
				else {
					
					$sWhere .= "activo=0 AND id_p";
				}
				
			
				/*
				 * SQL queries
				 * Get data to display
				 */
				$sQuery = "
					SELECT SQL_CALC_FOUND_ROWS `".str_replace(" , ", " ", implode("`, `", $aColumns))."`
					FROM   $sTable
					$sWhere
					$sOrder
					$sLimit
					";
				$rResult = mysql_query( $sQuery, $this->db_conexion) or fatal_error( 'MySQL Error: ' . mysql_errno() );
				
				/* Data set length after filtering */
				$sQuery = "
					SELECT FOUND_ROWS()
				";
				$rResultFilterTotal = mysql_query( $sQuery, $this->db_conexion ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
				$aResultFilterTotal = mysql_fetch_array($rResultFilterTotal);
				$iFilteredTotal = $aResultFilterTotal[0];
				
				/* Total data set length  SELECT COUNT(`".$sIndexColumn."`) */
				$sQuery = "
					SELECT COUNT(*)
					FROM   $sTable
				";
				$rResultTotal = mysql_query( $sQuery, $this->db_conexion ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
				$aResultTotal = mysql_fetch_array($rResultTotal);
				$iTotal = $aResultTotal[0];
			
			
				/*
				 * Output
				 */
				$output = array(
					"sEcho" => intval($varGet['sEcho']),
					"iTotalRecords" => $iTotal,
					"iTotalDisplayRecords" => $iFilteredTotal,
					"aaData" => array()
				);
				
				while ( $aRow = mysql_fetch_array( $rResult ) )
				{
					$row = array();
					for ( $i=0 ; $i<count($aColumns) ; $i++ )
					{
						if ( $aColumns[$i] == "version" )
						{
							/* Special output formatting for 'version' column */
							$row[] = ($aRow[ $aColumns[$i] ]=="0") ? '-' : $aRow[ $aColumns[$i] ];
						}
						else if ( $aColumns[$i] != ' ' )
						{
							/* General output */
							$row[] = utf8_encode($aRow[$aColumns[$i]]);
						}
					}
					$output['aaData'][] = $row;
				}
			
			 	return json_encode( $output);
				
	}
	
	public function programasNuevaTabla($varGet)
	{
		try{
		
				$this->conectar();
				
				//$aColumns = array('nombre','descripcion');
				
				$aColumns = array('id','nombre');
			
				/* Indexed column (used for fast and accurate table cardinality) */
				$sIndexColumn = "id";
				
				/* DB table to use */
				$sTable = "programas";
				
				/* 
				 * Paging
				 */
				$sLimit = "";
				if ( isset( $varGet['iDisplayStart'] ) && $varGet['iDisplayLength'] != '-1' )
				{
					$sLimit = "LIMIT ".intval( $varGet['iDisplayStart'] ).", ".
						intval( $varGet['iDisplayLength'] );
				}
				
			
				/*
				 * Ordering
				 */
				$sOrder = "";
				if ( isset( $varGet['iSortCol_0'] ) )
				{
					$sOrder = "ORDER BY  ";
					for ( $i=0 ; $i<intval( $varGet['iSortingCols'] ) ; $i++ )
					{
						if ( $varGet[ 'bSortable_'.intval($varGet['iSortCol_'.$i]) ] == "true" )
						{
							$sOrder .= "`".$aColumns[ intval( $varGet['iSortCol_'.$i] ) ]."` ".
							 	mysql_real_escape_string( $varGet['sSortDir_'.$i] ) .", ";
						}
					}
					
					$sOrder = substr_replace( $sOrder, "", -2 );
					if ( $sOrder == "ORDER BY" )
					{
						$sOrder = "";
					}
				}
			
			
				/* 
				 * Filtering
				 * NOTE this does not match the built-in DataTables filtering which does it
				 * word by word on any field. It's possible to do here, but concerned about efficiency
				 * on very large tables, and MySQL's regex functionality is very limited
				 */
				$sWhere = "";
				if ( isset($varGet['sSearch']) && $varGet['sSearch'] != "" )
				{
					$sWhere = "WHERE (";
					for ( $i=0 ; $i<count($aColumns) ; $i++ )
					{
						if ( isset($varGet['bSearchable_'.$i]) && $varGet['bSearchable_'.$i] == "true" )
						{
							$sWhere .= "`".$aColumns[$i]."` LIKE '%".mysql_real_escape_string( $varGet['sSearch'] )."%' OR ";
						}
					}
					$sWhere = substr_replace( $sWhere, "", -3 );
					$sWhere .= ')';
				}

				/* Individual column filtering */
				for ( $i=0 ; $i<count($aColumns) ; $i++ )
				{
					if ( isset($varGet['bSearchable_'.$i]) && $varGet['bSearchable_'.$i] == "true" && $varGet['sSearch_'.$i] != '' )
					{
						if ( $sWhere == "" )
						{
							$sWhere = "WHERE ";
						}
						else
						{
							$sWhere .= " AND ";
						}
						$sWhere .= "`".$aColumns[$i]."` LIKE '%".mysql_real_escape_string($varGet['sSearch_'.$i])."%' ";
					}
				}
				
			
				/*
				 * SQL queries
				 * Get data to display
				 */
				$sQuery = "
					SELECT SQL_CALC_FOUND_ROWS `".str_replace(" , ", " ", implode("`, `", $aColumns))."`
					FROM   $sTable
					$sWhere
					$sOrder
					$sLimit
					";
				$rResult = mysql_query( $sQuery, $this->db_conexion) or fatal_error( 'MySQL Error: ' . mysql_errno() );
				
				/* Data set length after filtering */
				$sQuery = "
					SELECT FOUND_ROWS()
				";
				$rResultFilterTotal = mysql_query( $sQuery, $this->db_conexion ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
				$aResultFilterTotal = mysql_fetch_array($rResultFilterTotal);
				$iFilteredTotal = $aResultFilterTotal[0];
				
				/* Total data set length  SELECT COUNT(`".$sIndexColumn."`) */
				$sQuery = "
					SELECT COUNT(*)
					FROM   $sTable
				";
				$rResultTotal = mysql_query( $sQuery, $this->db_conexion ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
				$aResultTotal = mysql_fetch_array($rResultTotal);
				$iTotal = $aResultTotal[0];
			
			
				/*
				 * Output
				 */
				$output = array(
					"sEcho" => intval($varGet['sEcho']),
					"iTotalRecords" => $iTotal,
					"iTotalDisplayRecords" => $iFilteredTotal,
					"aaData" => array()
				);
				
				while ( $aRow = mysql_fetch_array( $rResult ) )
				{
					$row = array();
					for ( $i=0 ; $i<count($aColumns) ; $i++ )
					{
						if ( $aColumns[$i] == "version" )
						{
							/* Special output formatting for 'version' column */
							$row[] = ($aRow[ $aColumns[$i] ]=="0") ? '-' : $aRow[ $aColumns[$i] ];
						}
						else if ( $aColumns[$i] != ' ' )
						{
							/* General output */
							$row[] = utf8_encode($aRow[$aColumns[$i]]);
						}
					}
					$output['aaData'][] = $row;
				}
			
			 	return json_encode( $output);
			 
		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}


	public function encuestasNuevaTabla($varGet)
	{
		try{
		
				$this->conectar();
				
				//$aColumns = array('nombre','descripcion');
				
				$aColumns = array('id','nombre','fecha_inicio','fecha_fin');
			
				/* Indexed column (used for fast and accurate table cardinality) */
				$sIndexColumn = "id";
				
				/* DB table to use */
				$sTable = "encuestas";
				
				return $this->procesosNuevaTabla($varGet, $aColumns, $sIndexColumn, $sTable);
				
		}catch (Exception $e) {

			mysql_close($this->db_conexion);
			
			throw new Exception('Error MySQL');
		}
	}

	// METODOS PARA TRAER DATOS DEL USUARIO //
	
	public function getCategoriaUsuario($user_name)
	{		
		$cadenaConsulta = "SELECT c.nombre as categoria FROM usuarios as u, categoria as c WHERE u.categoria = c.id and u.nombre = '".$user_name."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$row = mysql_fetch_array($resultado,MYSQL_ASSOC);
		
		$categoria = $row['categoria'];
		
		return $categoria;

	}
	
	public function getPermisosUsuario($user_name)
	{
		$cadenaConsulta = "SELECT op.nombre FROM usuarios as u, categoria as c,operaciones as op,operaciones_x_categoria as oxc
							WHERE u.categoria = c.id and oxc.id_c = c.id and oxc.id_op = op.id and u.nombre ='".$user_name."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$permisos = mysql_fetch_array($resultado,MYSQL_ASSOC);

		return $permisos;
	}
}
?>