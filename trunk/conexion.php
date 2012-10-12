<?php

class DBase {  

/* Casa */
//private $db_host="localhost"; 

/* Trabajo */
private $db_host="localhost:8000"; 

private $db_usuario="jemac"; 
private $db_password="0702364"; 
private $db_nombre="jemac_tesis"; 
private $db_conexion;
private $db_conexionTran;
  
private function conectar (){    
    $this->db_conexion = mysql_connect($this->db_host, $this->db_usuario, $this->db_password) or die(mysql_error());
    mysql_select_db($this->db_nombre,$this->db_conexion);   
}

private function conectarTran (){    
    $this->db_conexionTran = mysqli_connect($this->db_host, $this->db_usuario, $this->db_password,$this->db_nombre); 
}

public function consultar($sqlConsulta){
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

}
?>