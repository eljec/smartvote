<?php
	
	include("SmartVoteDB.php");
	//include("Respuesta.php");
	
class SmartVoteManager {  
	
	private $baseSmartVote; 
	
	function __construct(){
     $this->baseSmartVote=new SmartVoteDB();
    }
	
	// -------------------------------   METODOS PUBLICOS  --------------------------------------------------  //
	
	public function BuscarProgramas()
	{
		$baseSmartVote = new SmartVoteDB();

		try{
		
			$datos = $baseSmartVote->BuscarProgramas();
			
			$respuesta = $this->transformarDatosProgramas($datos);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA BUSQUEDA");
			
			return json_encode($resp);
		}
	}
	
	public function BuscarEncuestas($id_program)
	{
		try{
		
			$datos = $this->baseSmartVote->BuscarEncuestas($id_program);
			
			$respuesta = $this->transformarDatosEncuestas($datos);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA BUSQUEDA");
			
			return json_encode($resp);
		}
	}
	
	public function BuscarPreguntas($id_program,$id_encuesta)
	{
		try{
		
			$datos = $this->baseSmartVote->BuscarPreguntas($id_program,$id_encuesta);
			
			$respuesta = $this->transformarDatosPreguntas($datos);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA BUSQUEDA");
			
			return json_encode($resp);
		}
	}
	
	public function ValidarExistencia($idPrograma,$nombre)
	{
		try{
			$flagValido = $this->baseSmartVote->ValidarExistencia($idPrograma,$nombre);
			
			if($flagValido)
				return json_encode(new Respuesta("ERROR","VALOR REPETIDO"));
			else
				return json_encode(new Respuesta("OK",""));
				
		}catch(Exception $e){
			
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA VALIDACION");
			
			return json_encode($resp);
		}
	}
	
	public function InsertarPrograma($nombre,$desc)
	{
		$baseSmartVote = new SmartVoteDB();

		try{

			$respuesta = $baseSmartVote->InsertarPrograma($nombre,$desc);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA INSERSION");
			
			return json_encode($resp);
		}
	}
	
	
	public function InsertarEncuesta($id_p,$nombre,$desc,$arrayPreguntas)
	{
		$baseSmartVote = new SmartVoteDB();

		try{
			
			$filas = explode(";", $arrayPreguntas);

			$contador = -1;

			foreach($filas as &$fila)
			{  
			   $numPreguntas=explode("-", $fila);
			   
			   $contador = $contador + 1;
			   
			   $arrayNumPreguntas[$contador] = $numPreguntas[0];
			   
			   $arrayDescPreguntas[$contador] = $numPreguntas[1];

			}
		 
			$respuesta = $baseSmartVote->InsertarEncuesta($id_p,$nombre,$desc,$arrayNumPreguntas,$arrayDescPreguntas);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA INSERSION");
			
			return json_encode($resp);
		}
	}
	
	
	// ------------------------------    METODOS PRIVADOS  --------------------------------------------------  //

	private function transformarDatosProgramas($datos)
	{
		$cadenaDevolver =  "{\"programas\":[";
		$count=0;

		while ($fila = mysql_fetch_assoc($datos))
		{
			if($count==0)
			{
				$cadenaDevolver = $cadenaDevolver."{\"id\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"nombre\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"descripcion\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['descripcion']));
				$cadenaDevolver = $cadenaDevolver. "}";
			}
			else
			{
				$cadenaDevolver = $cadenaDevolver. ",{\"id\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"nombre\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"descripcion\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['descripcion']));
				$cadenaDevolver = $cadenaDevolver. "}"; 
			}
			$count++;
		}
		$cadenaDevolver = $cadenaDevolver. "]}";
		
		return $cadenaDevolver;
	}
	
	private function transformarDatosEncuestas($datos)
	{
		$cadenaDevolver= "{\"encuestas\":[";
		
		$count=0;

		 while ($fila = mysql_fetch_assoc($datos))
		 {
			if($count==0)
			{
				$cadenaDevolver = $cadenaDevolver. "{\"id\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"idP\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id_p']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"nombre\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"descripcion\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['descripcion']));
				$cadenaDevolver = $cadenaDevolver. "}";
			}
			else
			{
					$cadenaDevolver = $cadenaDevolver. ",{\"id\":";
						$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id']));
					$cadenaDevolver = $cadenaDevolver. ",";
					   $cadenaDevolver = $cadenaDevolver. "\"idP\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id_p']));
					$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver. "\"nombre\":";
						$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['nombre']));
					$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver. "\"descripcion\":";
						$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['descripcion']));
					 $cadenaDevolver = $cadenaDevolver. "}";
			}
			$count++;
		}
		$cadenaDevolver = $cadenaDevolver. "]}";
		
		return $cadenaDevolver;
	}
	
	private function transformarDatosPreguntas($datos)
	{
		$cadenaDevolver = "{\"preguntas\":[";
		$count=0;

		 while ($fila = mysql_fetch_assoc($datos))
		 {
			if($count==0)
			{
				$cadenaDevolver = $cadenaDevolver. "{\"id\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"descripcion\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['descripcion']));
				$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver. "\"orden\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['orden']));
				$cadenaDevolver = $cadenaDevolver. "}";
			}
			else
			{
				$cadenaDevolver = $cadenaDevolver. ",{\"id\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['id']));
				$cadenaDevolver = $cadenaDevolver. ",";
				$cadenaDevolver = $cadenaDevolver. "\"descripcion\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['descripcion']));
				$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver. "\"orden\":";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['orden']));
				$cadenaDevolver = $cadenaDevolver. "}";  
			}
			$count++;
		}
		$cadenaDevolver = $cadenaDevolver. "]}";
		
		return $cadenaDevolver;
	}
	
	}
?>