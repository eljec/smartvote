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
	
	public function BuscarProgramasAutoComplete($like)
	{
		try{
		
			$datos = $this->baseSmartVote->BuscarProgramasAutoComplete($like);
			
			$respuesta = $this->transformarDatosProgramas($datos);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA BUSQUEDA");
			
			return json_encode($resp);
		}
	}
	
	private function filtrosPrograma($filters,$todos)
	{
		$ruls = $filters->rules;

		$where = "";
		
		if($todos == "1")
		{
			for($i=0;$i<count($ruls);$i++)
			{
				if($i == 0)
				{
					$where = "WHERE ".$ruls[$i]->field." LIKE '".$ruls[$i]->data."%'";
				}	
				else
				{
					$where = $where."AND ".$ruls[$i]->field." LIKE '".$ruls[$i]->data."%'";
				}	
				
			}
		}
		else
		{
			for($i=0;$i<count($ruls);$i++)
			{		
				$where = $where."AND ".$ruls[$i]->field." LIKE '".$ruls[$i]->data."%'";
			}
		}
		//echo $where;
		
		return $where;
	}
	
	private function formarConsulta_Paginado()
	{
			if($tipo=='programa')
		    {	
			
				$consulta = "SELECT * FROM programas ".$_where." ORDER BY ".$sidx." ".$sord." LIMIT ".$start." , ".$limit;	
			}
			else 
			{
				if($_where == "")
				{
					if($inactivo == "0")
					{						
						$consulta = "SELECT e.id,e.nombre,e.descripcion,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p and e.activo=1 ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
					}
					else {
						$consulta = "SELECT e.id,e.nombre,e.fechainicio,e.fechafin,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p and e.activo=0 ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
					}
				}					
				else 
				{
					
					if($inactivo == "0")
					{
						$consulta = "SELECT e.id,e.nombre,e.descripcion,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p ".$_where." ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
					}
					else {
						$consulta = "SELECT e.id,e.nombre,e.fechainicio,e.fechafin,p.nombre as nombrep FROM programas as p, encuestas as e WHERE p.id=e.id_p ".$_where." ORDER BY e.".$sidx." ".$sord." LIMIT ".$start." , ".$limit;
					}
					
				}
			}
	}
	
	public function BuscarProgramas_Paginado($page,$limit,$sidx,$sord,$varGet)
	{
		try{
		
			$count = $this->baseSmartVote->CantidadProgramasActivos('programa');
			
			// Formo parametros para traer la pagina 
			
			//En base al numero de registros se obtiene el numero de paginas
		    if( $count >0 ) 
			{
				$total_pages = ceil($count/$limit);
		    } else 
			{
				$total_pages = 0;
		    }
		    if ($page > $total_pages)
		        $page=$total_pages;
			
			// Analizo filtros //
			
			$_where="";
			$inactivo = "0";

			$todos = false ;

			if(isset($varGet["activos"]))
			{
				if($varGet["activos"] == 'true')
				{
					$_where ="WHERE activo=1 ";
				}
				else {
					$_where ="WHERE activo=0 ";
					$inactivo ='1';
				}
			}
			else {
				$todos =true;
			}
				
			if(isset($varGet["_search"]))
			{
				if($varGet["_search"] == 'true')
				{
					$_where = $_where . $this->filtrosPrograma(json_decode($varGet["filters"]),$todos);
				}
			}
			
			//echo $_where;
			
		    //Almacena numero de registro donde se va a empezar a recuperar los registros para la pagina
		    
		    $start = $limit*$page - $limit;
			
			$datos = $this->baseSmartVote->ObtenerPagina($start, $limit, $sidx, $sord,'programa',$_where,$inactivo);

			$respuesta = $this->transformarDatosProgramaPaginado($datos,$total_pages,$page,$count,$inactivo);
			
			return $respuesta;
	
		}catch (Exception $e) {
		
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA BUSQUEDA");
			
			return json_encode($resp);
		}
	}
	
	private function filtrosEncuesta($filters)
	{
		$ruls = $filters->rules;

		$where = "";
		
		for($i=0;$i<count($ruls);$i++)
		{
			if($ruls[$i]->field == "nombrep")
			{
				$where = $where."AND p.nombre LIKE '".$ruls[$i]->data."%'";
			}
			else
			{
				$where = $where."AND e.".$ruls[$i]->field." LIKE '".$ruls[$i]->data."%'";
			}
			
		}
		
		return $where;
	}
	
	public function BuscarEncuestas_Paginado($page,$limit,$sidx,$sord,$varGet)
	{
		try{
		
			$count = $this->baseSmartVote->CantidadProgramasActivos('encuesta');
			
			// Formo parametros para traer la pagina 
			
			//En base al numero de registros se obtiene el numero de paginas
		    if( $count >0 ) 
			{
				$total_pages = ceil($count/$limit);
		    } else 
			{
				$total_pages = 0;
		    }
		    if ($page > $total_pages)
		        $page=$total_pages;
			
			// Analizo si es una busqueda y formo los filtros //
			
			$_where="";
			$inactivo = "0";
			
			if(isset($varGet["id_p"]))
			{
				$_where ="AND e.id_p='".$varGet["id_p"]."' ";
			}
			
			if(isset($varGet["activos"]))
			{
				if($varGet["activos"] == 'true')
				{
					$_where = $_where."AND e.activo=1 ";
					
				}
				else {
					$_where = $_where . "AND e.activo=0 ";
					$inactivo ='1';
				}
			}
			else {
				$_where = $_where . "AND e.activo=1 ";
			}
				
			
			
			if(isset($varGet["_search"]))
			{
				if($varGet["_search"] == 'true')
				{
					//$_where ="AND e.activo=1 ";
					$_where = $_where . $this->filtrosEncuesta(json_decode($varGet["filters"]));
				}
				
			}
			
			//echo $_where;
			
		    //Almacena numero de registro donde se va a empezar a recuperar los registros para la pagina
		    
		    $start = $limit*$page - $limit;
			
			$datos = $this->baseSmartVote->ObtenerPagina($start, $limit, $sidx, $sord,'encuesta',$_where,$inactivo);

			$respuesta = $this->transformarDatosEncuestasPaginado($datos,$total_pages,$page,$count,$inactivo);
			
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
	
	public function EnviarCorreo($nombreC,$correoC,$consultaC)
	{
		$subject = "Nueva Consulta de ".$nombreC;

		try{
		
			mail("smartvote@tesiscastillo.com.ar", $subject,$consultaC, "From:" . $correoC);
			
			return json_encode(new Respuesta("OK","CORREO ENVIADO SATISFACTORIAMENTE"));
			
		}catch(Exception $e){
		
			return json_encode(new Respuesta("ERROR","PROBLEMA AL ENVIAR EL CORREO"));
		}
	}

	public function GraficoPrograma()
	{
		try{
			
			$datos = $this->baseSmartVote->GraficoPrograma();
			
			return ($this->transformarDatosGrafico($datos));
			
		}catch(Exception $e){
			
			return json_encode(new Respuesta("ERROR","PROBLEMA AL TRAER LOS DATOS PARA EL GRAFICO"));
		}
	}

	public  function GraficoEncuesta($nombre_p)
	{
		$datos = $this->baseSmartVote->GraficoEncuesta($nombre_p);
		$resultado = $this->transformarDatosGrafico($datos);
		
		//$resultado = $this->transformarDatosGraficoMorris($datos);
		
		return $resultado;
	}
	
	public function GraficoPreguntas($id_e,$indice)
	{
		try{
			
			$datos = $this->baseSmartVote->GraficoPreguntas($id_e,$indice);
			
			// Formo el objeto de regresar //
			
			$cadenaRetorno = "{\"anterior\":".json_encode($datos["anterior"]);
			$cadenaRetorno = $cadenaRetorno.",\"siguiente\":".json_encode($datos["siguiente"]);
			$cadenaRetorno = $cadenaRetorno.",\"desc\":".json_encode($datos["desc"]);
			$cadenaRetorno = $cadenaRetorno.",".$this->transformarDatosGraficoArray($datos["votos"]);
			$cadenaRetorno = $cadenaRetorno."}";
			echo $cadenaRetorno;
			
		}catch(Exception $e){
			
			return json_encode(new Respuesta("ERROR","PROBLEMA AL TRAER LOS DATOS PARA EL GRAFICO"));
		}
	}

	public function GuardarVotos($datos,$idEncuesta,$idTv)
	{
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
			$respuesta = $this->baseSmartVote->GuardarVotos($arrayIdPregunta,$arrayPuntuacion,$idEncuesta,$idTv);

			return $respuesta;
			
		 }catch (Exception $e) {
		 
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA INSERSION");
			
			return json_encode($resp);
		}
	}

	public function GuardarVotosAux($datos,$idEncuesta)
	{
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
			$respuesta = $this->baseSmartVote->GuardarVotosAux($arrayIdPregunta,$arrayPuntuacion,$idEncuesta);

			return $respuesta;
			
		 }catch (Exception $e) {
		 
			$resp = new Respuesta("ERROR","NO SE PUDO HACER LA INSERSION");
			
			return json_encode($resp);
		}
	}
	
	public function ValidarVotoEncuesta($idEncuesta,$idTv)
	{
		try{
			
			$respuesta = $this->baseSmartVote->ValidarVotoEncuesta($idEncuesta, $idTv);
			
			return $respuesta;
			
		}catch(exception $E)
		{
			$resp = new Respuesta("ERROR","");
			
			return json_encode($resp);
		}
	}
	
	// USUARIO 
	
	public function CrearUsuario($nombreU,$contraU,$programaU,$descPU)
	{
		try{
			
			$respuesta = $this->baseSmartVote->CrearUsuario($nombreU,$contraU,$programaU,$descPU);
			
			return $respuesta;
			
		}catch(exception $E)
		{
			$resp = new Respuesta("ERROR","EJECUCION");
			
			return json_encode($resp);
		}
	}
	
	public function BajaEncuesta($id_e)
	{
		try{
			
			$respuesta = $this->baseSmartVote->BajaEncuesta($id_e);
			
			return $respuesta;
			
		}catch(exception $E)
		{
			$resp = new Respuesta("ERROR","EJECUCION");
			
			return json_encode($resp);
		}
	} 
	
	public function programasNuevaTabla($varGet)
	{
		try{
			
			$respuesta = $this->baseSmartVote->programasNuevaTabla($varGet);
			
			return $respuesta;
			
		}catch(exception $E)
		{
			$resp = new Respuesta("ERROR","");
			
			return json_encode($resp);
		}
	}
	
	public function encuestasNuevaTabla($varGet)
	{
		try{
			
			$respuesta = $this->baseSmartVote->encuestasNuevaTabla($varGet);
			
			return $respuesta;
			
		}catch(exception $E)
		{
			$resp = new Respuesta("ERROR","");
			
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
	
	private function transformarDatosProgramaPaginado($datos,$total_pages,$page,$count,$inactivo)
	{
		$cadenaDevolver = "{";
		$cadenaDevolver = $cadenaDevolver." \"total\":\"".$total_pages."\",";
		$cadenaDevolver = $cadenaDevolver. " \"page\":\"".$page."\",";
		$cadenaDevolver = $cadenaDevolver. " \"records\":\"".$count."\",";
		$cadenaDevolver = $cadenaDevolver. "\"rows\":[";
	    $i=0;
		
		
	    while($fila = mysql_fetch_assoc($datos))
		{
	
			if($i == 0)
			{
				$cadenaDevolver = $cadenaDevolver."{\"id\":\"".$fila["id"]."\",";
				$cadenaDevolver = $cadenaDevolver. "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["descripcion"])."\",\"".utf8_encode($fila["usuario"])."\"]}";
			}
			else
			{
				$cadenaDevolver = $cadenaDevolver.",{\"id\":\"".$fila["id"]."\",";
				$cadenaDevolver = $cadenaDevolver. "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["descripcion"])."\",\"".utf8_encode($fila["usuario"])."\"]}";
			}
	        $i++;
	    }
		$cadenaDevolver = $cadenaDevolver. "]}";


		return $cadenaDevolver;
	}
	
	private function transformarDatosGrafico($datos)
	{
		$cadenaDevolver =  "{\"datosgrafico\":[";
		$count=0;

		while ($fila = mysql_fetch_assoc($datos))
		{
			if($count==0)
			{
				$cadenaDevolver = $cadenaDevolver."[";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver. $fila['cantidad'];
				$cadenaDevolver = $cadenaDevolver. "]";
			}
			else
			{
				$cadenaDevolver = $cadenaDevolver. ",[";
					$cadenaDevolver = $cadenaDevolver. json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver. $fila['cantidad'];
				$cadenaDevolver = $cadenaDevolver. "]";
			}
			$count++;
		}
		$cadenaDevolver = $cadenaDevolver. "]}";
		
		return $cadenaDevolver;	
	}
	
	private function transformarDatosGraficoMorris($datos)
	{
		$cadenaDevolver =  "{\"datosgrafico\":[";
		$count=0;

		while ($fila = mysql_fetch_assoc($datos))
		{
			if($count==0)
			{
				$cadenaDevolver = $cadenaDevolver."{";
					$cadenaDevolver = $cadenaDevolver.json_encode("label").":".json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver.json_encode("value").":".$fila['cantidad'];
				$cadenaDevolver = $cadenaDevolver. "}";
			}
			else
			{
				$cadenaDevolver = $cadenaDevolver. ",{";
					$cadenaDevolver = $cadenaDevolver.json_encode("label").":".json_encode(utf8_encode($fila['nombre']));
				$cadenaDevolver = $cadenaDevolver. ",";
					$cadenaDevolver = $cadenaDevolver.json_encode("value").":".$fila['cantidad'];
				$cadenaDevolver = $cadenaDevolver. "}";
			}
			$count++;
		}
		$cadenaDevolver = $cadenaDevolver. "]}";
		
		return $cadenaDevolver;	
	}
	
	private function transformarDatosEncuestasPaginado($datos,$total_pages,$page,$count,$inactivo)
	{
		$cadenaDevolver = "{";
		$cadenaDevolver = $cadenaDevolver." \"total\":\"".$total_pages."\",";
		$cadenaDevolver = $cadenaDevolver. " \"page\":\"".$page."\",";
		$cadenaDevolver = $cadenaDevolver. " \"records\":\"".$count."\",";
		$cadenaDevolver = $cadenaDevolver. "\"rows\":[";
	    $i=0;
		
		if($inactivo == '0')
		{
			while($fila = mysql_fetch_assoc($datos))
			{
		
				if($i == 0)
				{
					$cadenaDevolver = $cadenaDevolver."{\"id\":\"".$fila["id"]."\",";
					$cadenaDevolver = $cadenaDevolver. "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["descripcion"])."\",\"".utf8_encode($fila["nombrep"])."\"]}";
				}
				else
				{
					$cadenaDevolver = $cadenaDevolver.",{\"id\":\"".$fila["id"]."\",";
					$cadenaDevolver = $cadenaDevolver. "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["descripcion"])."\",\"".utf8_encode($fila["nombrep"])."\"]}";
				}
		        $i++;
		    }
			$cadenaDevolver = $cadenaDevolver. "]}";
		
		}
		else
		{
			while($fila = mysql_fetch_assoc($datos))
			{
		
				if($i == 0)
				{
					$cadenaDevolver = $cadenaDevolver."{\"id\":\"".$fila["id"]."\",";
					$cadenaDevolver = $cadenaDevolver. "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["fechainicio"])."\",\"".utf8_encode($fila["fechafin"])."\",\"".utf8_encode($fila["nombrep"])."\"]}";                                                                
				}
				else
				{
					$cadenaDevolver = $cadenaDevolver.",{\"id\":\"".$fila["id"]."\",";
					$cadenaDevolver = $cadenaDevolver. "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["fechainicio"])."\",\"".utf8_encode($fila["fechafin"])."\",\"".utf8_encode($fila["nombrep"])."\"]}";
				}
		        $i++;
		    }
			$cadenaDevolver = $cadenaDevolver. "]}";
		
		}
	    
		return $cadenaDevolver;
	}
	
	private function transformarDatosGraficoArray($datos)
	{
		$cadenaDevolver =  "\"votos\":[";
		
		if(count($datos) > 0)
		{
			$cadenaDevolver = $cadenaDevolver."[";
			$cadenaDevolver = $cadenaDevolver. json_encode('SI');
			$cadenaDevolver = $cadenaDevolver. ",";
			$cadenaDevolver = $cadenaDevolver. $datos[0];
			$cadenaDevolver = $cadenaDevolver. "]";
	
			$cadenaDevolver = $cadenaDevolver. ",[";
			$cadenaDevolver = $cadenaDevolver. json_encode('NO');
			$cadenaDevolver = $cadenaDevolver. ",";
			$cadenaDevolver = $cadenaDevolver. $datos[1];
			$cadenaDevolver = $cadenaDevolver. "]";
		}
		
		$cadenaDevolver = $cadenaDevolver. "]";
		
		return $cadenaDevolver;
	}
	
	
	
	
	}
?>