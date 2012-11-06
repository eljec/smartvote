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
		$cadenaConsulta = "SELECT * FROM encuestas WHERE id_p='".$idPrograma."' and nombre='".$nombre."'";

		return $this->validarRepetido($cadenaConsulta);
	}
	
	
	// ------------------------------- METODOS PUBLICOS ------------------------------------------------------>
	
	//---> LOG IN 
	
	public function LogIn($user,$pass)
	{
	   try{
	   	
			$this->conectar();
			
			$user_escape = mysql_real_escape_string($user);
 			$pass_escape = mysql_real_escape_string($pass);
 
 			$consulta="SELECT nombre FROM usuarios WHERE nombre='".$user_escape."' and contraseña='".$pass_escape."'";
			
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
	
	public function BuscarProgramas()
	{

		$queEmp = "SELECT * FROM programas as p where p.activo=1";


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
	
	public function CantidadProgramasActivos($tipo)
	{
		if($tipo == 'programa')
			$queEmp ="SELECT COUNT(*) AS count FROM programas as p where p.activo=1";	
		else 
			$queEmp ="SELECT COUNT(*) AS count FROM encuestas as e where e.activo=1";	
		
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
	
	public function ObtenerPagina($start,$limit,$sidx,$sord,$tipo)
	{
			if($tipo=='programa')
		    	$consulta = "SELECT * FROM programas ORDER BY ".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
			else 
		    	$consulta = "SELECT e.id,e.nombre,e.descripcion,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;

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
	
	public function BuscarEncuestas($id_program)
	{
		$auxString = "select e.id, e.id_p, e.nombre, e.descripcion from programas as p,encuestas as e where e.id_p = p.id and p.activo=1 and e.activo=1 and p.id=";
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
		$auxString = "select pr.id, pr.descripcion, pr.orden from encuestas as e, preguntas as pr where e.id = pr.id_e and e.id='";
		
		$aux="order by pr.orden asc";

		$queEmp = $auxString . $id_encuesta . "'".  $aux;
		
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
	
	
	//--->INSERTAR 
	
	public function InsertarPrograma($nombre,$desc)
	{
		$cadenaInsertar="Insert into programas (id, nombre, descripcion,Activo) values ( '','".$nombre."','".$desc."',1)";
		$cadenaValidar ="SELECT * FROM programas WHERE nombre='".$nombre."'";
		
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
			
			$fecha_actual = date("Y-m-d");

			$existe = $this->validarRepetido($cadenaValidar);

			if($existe)
			{
				$flag = false;
				$flagRepetido=true;
			}
			else
			{
				$cadenaInsertar="Insert into encuestas (id,id_p,nombre,descripcion,fechainicio,fechafin,activo) values ('','".$id_p."','".$nombre."','".$desc."','".$fecha_actual."','',1)";

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
			
			$fecha_actual = date("Y-m-d");

			// Creo la Encuesta y Obtengo su Id--> En caso de error regreso todo al estado anterior 
			
			$cadenaInsertar="Insert into encuestas (id,id_p,nombre,descripcion,fechainicio,fechafin,activo) values ('','".$id_p."','".$nombre."','".$desc."','".$fecha_actual."','',1)";

			$flag = mysqli_query($this->db_conexionTran,$cadenaInsertar);
			
			if(!$flag)
			{
				mysqli_rollback($this->db_conexionTran);
					
				if($flagRepetido)
					$retorno= json_encode(new Respuesta("ERROR","REPETIDO"));
				else
					throw new Exception('Error MySQL ');
			}
			else
			{
				
				$queEmp = "Select e.id as Id from encuestas as e where e.nombre='".$nombre."' and e.id_p='".$id_p."'";
				
				$resultado = mysqli_query($this->db_conexionTran,$queEmp);
				
				if(!$resultado)
				{
					mysqli_rollback($this->db_conexionTran);
					
					if($flagRepetido)
						$retorno= json_encode(new Respuesta("ERROR","REPETIDO"));
					else
						throw new Exception('Error MySQL ');
				}
				else
				{
					$idEncuestaFetch = mysqli_fetch_array($resultado);

					$idEncuesta= $idEncuestaFetch['Id'];
					
				
					$lengtArray = count($arrayNumPreguntas);

					$i=0;
					while ($i < $lengtArray and $flag = true):

						$cadenaValidar ="SELECT * FROM preguntas WHERE id_e='".$idEncuesta."' and descripcion='".$arrayDescPreguntas[$i]."'";

						$existe = $this->validarRepetido($cadenaValidar);

						if($existe)
						{
								$flag = false;
								$flagRepetido=true;
						}
						else
						{
								$cadenaInsersion= "Insert into preguntas (id,id_e,descripcion,orden) values ( '','".$idEncuesta."','".$arrayDescPreguntas[$i]."','".$arrayNumPreguntas[$i]."')";

								$flag = mysqli_query($this->db_conexionTran,$cadenaInsersion);
						}

						$i++;
					endwhile;

					if ($flag) {

						mysqli_commit($this->db_conexionTran);

						$retorno= json_encode(new Respuesta("OK",""));

					} else
					{
						mysqli_rollback($this->db_conexionTran);
						
						if($flagRepetido)
							$retorno= json_encode(new Respuesta("ERROR","REPETIDO"));
						else
							throw new Exception('Error MySQL ');
					}

					mysqli_close($this->db_conexionTran);

					return $retorno;
				
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
	
	public function GraficoPreguntas($id_e)
	{
		//$arrayResultado = array();
				
		$cadenaConsulta = "SELECT count(calificacion) as cantidad from votos where calificacion=1 and id_e='".$id_e."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$row = mysql_fetch_array($resultado);
		
		$cantidadSI = $row['cantidad'];
			
			
		$cadenaConsulta = "SELECT count(calificacion) as cantidad from votos where calificacion=0 and id_e='".$id_e."'";
		
		$resultado = $this->buscar($cadenaConsulta);
		
		$row = mysql_fetch_array($resultado);
		
		$cantidadNO = $row['cantidad'];
		
		if($cantidadNO >0  && $cantidadSI >0)
		{
			$arrayResultado[0] = $cantidadSI;
			$arrayResultado[1] = $cantidadNO;
		}
		else 
		{
			$arrayResultado = array();
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
			
			echo $flag;
			
	        if ($flag) {
	    
				// Inserto en la Tabla de Encuestas Votadas //
				
				$cadenaInsertar="Insert into encuestasvotadas (id_tv,id_e,fecha) values ('".$idTv."','".$idEncuesta."','".$fecha_actual."')";

				$flag = mysqli_query($this->db_conexionTran,$cadenaInsertar);
				
				if($flag)
				{
					// SI todo sale bien hago comit de transaccion //
					
				echo $flag;
				
	            /*mysqli_commit($this->db_conexionTran);
	        
	            return json_encode(new Respuesta("OK",""));*/
	
				}
				else 
				{
					 mysqli_rollback($this->db_conexionTran);
	
	            	throw new Exception('Ocurrio un error ');
				}
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

	
}
?>