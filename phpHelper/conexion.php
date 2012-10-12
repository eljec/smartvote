<?php

class DBase {  

// Casa //

private $db_host="localhost"; 
private $db_usuario="jemac"; 
private $db_password="0702364"; 
private $db_nombre="jemac_tesis";

// Trabajo //

/*private $db_host="localhost";
private $db_usuario="root"; 
private $db_password=""; 
private $db_nombre="tesis"; */

// Curso 

/*private $db_host="localhost"; 
private $db_usuario="root"; 
private $db_password=""; 
private $db_nombre="jemac_tesis";*/

private $db_conexion;
private $db_conexionTran;
  
private function conectar ()
{    
    $this->db_conexion = mysql_connect($this->db_host, $this->db_usuario, $this->db_password) or die(mysql_error());
    mysql_select_db($this->db_nombre,$this->db_conexion);   
}

private function conectarTran ()
{    
    $this->db_conexionTran = mysqli_connect($this->db_host, $this->db_usuario, $this->db_password,$this->db_nombre); 
}

public function consultar($sqlConsulta)
{
    // Me uno a la Base //
    $this->conectar();
	
	try{
	
		$resEmp = mysql_query($sqlConsulta, $this->db_conexion);
		
		// Cierro la conexion //

		mysql_close($this->db_conexion);

		// Retorno la respuesta //

		return $resEmp;	
	
	}catch (Exception $e) {

		throw new Exception('Error MySQL');
	}
} // consultar 

public function insertarTransaccion($arrayIdPr,$arrayVotacion,$idEncuesta,$idTv)
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
    
            mysqli_commit($this->db_conexionTran);
        
            $retorno="ok";

        } else
        {
            mysqli_rollback($this->db_conexionTran);

            $retorno="error";
        }

        mysqli_close($this->db_conexionTran);

        return $retorno;

}catch (Exception $e) {
    throw new Exception('Ocurrio un error ');
}
} // fin funcion

public function insertarTransaccionPreguntas($arrayOrden,$arrayDesc,$idEncuesta)
{
try{

        $this->conectarTran();

        mysqli_autocommit($this->db_conexionTran, false);

        $flag = true;
	$flagRepetido=false;

        $lengtArray = count($arrayDesc);

        $i=0;
        while ($i < $lengtArray and $flag = true):
		
            // Valido si ya hay uno registro cargado con los mismos valores //

            $cadenaValidar ="SELECT * FROM preguntas WHERE id_e='".$idEncuesta."' and descripcion='".$arrayDesc[$i]."'";

            $existe = $this->validarExistencia($cadenaValidar);

            if($existe)
            {
                    $flag = false;
                    $flagRepetido=true;
            }
            else
            {
                    $cadenaInsersion= "Insert into preguntas (id,id_e,descripcion,orden) values ( '','".$idEncuesta."','".$arrayDesc[$i]."','".$arrayOrden[$i]."')";

                    $flag = mysqli_query($this->db_conexionTran,$cadenaInsersion);
            }

            $i++;
        endwhile;

        if ($flag) {

            mysqli_commit($this->db_conexionTran);

            $retorno="ok";

        } else
        {
            mysqli_rollback($this->db_conexionTran);

            $retorno="error";
        }

        mysqli_close($this->db_conexionTran);

        return $retorno;

}catch (Exception $e) {
    throw new Exception('Ocurrio un error ');
}
} // fin funcion

public function validarExistencia($stringConsultar)
{

	$resultado = $this->consultar($stringConsultar);
	
	$numFilas = mysql_num_rows($resultado);
	
	if($numFilas > 0)
		return true;
	else
		return false;
}

public function insertar($cadenaInsersion)
{
	
	$this->conectar();
	 
	try{
	
		$flag = mysql_query($cadenaInsersion);
		
		mysql_close($this->db_conexion);

	}catch (Exception $e) {

		throw new Exception('Error MySQL');
	}
		
}

public function deletePreguntasTransaccion($id_Encuesta)
{
    $cadenaConsultar = "SELECT pr.id FROM preguntas as pr WHERE e.id='".$id_Encuesta."'";

    try{
        
        $IdPreguntasBorrar = $this->consultar($cadenaConsultar);

        // Inicializo variables para hacer transaccion

        $this->conectarTran();

        mysqli_autocommit($this->db_conexionTran, false);

        $flag = true;

         while ($fila = mysql_fetch_assoc($datos))
         {
            $idToDelete = $fila["id"];

            $cadenaDelete = "DELETE FROM preguntas WHERE id='".$idToDelete."'";

            $flag = mysqli_query($this->db_conexionTran,$cadenaDelete);
         }


            if ($flag) {

                mysqli_commit($this->db_conexionTran);

                $retorno="ok";

            } else
            {
                mysqli_rollback($this->db_conexionTran);

                $retorno="error";
            }

            mysqli_close($this->db_conexionTran);

            return $retorno;
            
    }catch (Exception $e){
        echo "{\"respuesta\":\"ERROR\"}";
    }
}


}

?>