<?php

/* Funciona como una clase intermedia entre la base y la aplicacion */

/* Importo la clase que me permite conectarme con la base */

include("conexion.php");
include("respuesta.php");

/* Variables por GET */

$varGet = $_GET;

$obj = new DBase();

/* Analizo */

if(empty($varGet["action"]))
{

}
else
{
    switch ($varGet["action"]) 
	{
        case 1:
		
			$flagPaged = $varGet["paged"];
			
			if($flagPaged == 1)
			{
				/* Paginada */
				
				getAllprogramaPaged($obj);
			}
			else
			{
				/* Sin paginar */
            
				getAllprograms($obj);
			}
            break;
        case 2:
            
            /* Obtiene todas las encuestas segun un programa especifico */
            
            $id_program=$varGet["id_p"];      
            getSurveyAccordingProgram($obj,$id_program);
            
            break;
        case 3:
            /* Obtiene todas las preguntas segun una encuesta especifica */
            
            $id_program=$varGet["id_p"];
            
            $id_encuesta=$varGet["id_e"];
            
            getQuestionsAccordingSurvey($obj,$id_program,$id_encuesta);
            
            break;
		case 4:
			
			 $idPrograma=$varGet["id_p"];
			 
			 $nombre=$varGet["nombre"];
			 
			 validatarExistencia($obj,$idPrograma,$nombre);
			 
		break;
    }
}

function getAllprograms($base)
{
    
$queEmp = "SELECT * FROM programas as p where p.activo=1";

$datos = $base->consultar($queEmp);

//  Mestro los datos //

echo "{\"programas\":[";
$count=0;

 while ($fila = mysql_fetch_assoc($datos))
 {
    if($count==0)
    {
        echo "{\"id\":";
            echo json_encode(utf8_encode($fila['id']));
        echo ",";
        echo "\"nombre\":";
            echo json_encode(utf8_encode($fila['nombre']));
        echo ",";
        echo "\"descripcion\":";
            echo json_encode(utf8_encode($fila['descripcion']));
        echo "}";
    }
    else
    {
        echo ",{\"id\":";
            echo json_encode(utf8_encode($fila['id']));
        echo ",";
        echo "\"nombre\":";
            echo json_encode(utf8_encode($fila['nombre']));
        echo ",";
        echo "\"descripcion\":";
            echo json_encode(utf8_encode($fila['descripcion']));
        echo "}"; 
    }
    $count++;
}
echo "]}";

}

// Funcion para devolver resultado paginado 

function getAllprogramaPaged($base)
{
	$page = $_GET['page'];  // Almacena el numero de pagina actual
    $limit = $_GET['rows']; // Almacena el numero de filas que se van a mostrar por pagina
    $sidx = $_GET['sidx'];  // Almacena el indice por el cual se hará la ordenación de los datos
    $sord = $_GET['sord'];  // Almacena el modo de ordenación

    if(!$sidx) $sidx =1;

	
	// Se hace una consulta para saber cuantos registros se van a mostrar
	
	$query= "SELECT COUNT(*) AS count FROM programas as p where p.activo=1";
	
	$result = $base->consultar($query);
	
	// Se obtiene el resultado de la consulta
	
	$row = mysql_fetch_array($result);
	$count = $row['count'];

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
	
    //Almacena numero de registro donde se va a empezar a recuperar los registros para la pagina
    $start = $limit*$page - $limit;

    //Consulta que devuelve los registros de una sola pagina
    $consulta = "SELECT * FROM programas ORDER BY ".$sidx." ".$sord." LIMIT ".$start." , ".$limit;

	$result = $base->consultar($consulta);
	
	echo "{";
	echo " \"total\":\"".$total_pages."\",";
	echo " \"page\":\"".$page."\",";
	echo " \"records\":\"".$count."\",";
	echo "\"rows\":[";
    $i=0;
    while($fila = mysql_fetch_assoc($result))
	{

		if($i == 0)
		{
			echo"{\"id\":\"".$fila["id"]."\",";
			echo "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["descripcion"])."\"]}";
		}
		else
		{
			echo",{\"id\":\"".$fila["id"]."\",";
			echo "\"cell\":[\"".utf8_encode($fila["nombre"])."\",\"".utf8_encode($fila["descripcion"])."\"]}";
		}
        $i++;
    }
	echo "]}";
}

function getSurveyAccordingProgram($base,$id_program)
{
$auxString = "select e.id, e.id_p, e.nombre, e.descripcion from programas as p,encuestas as e where e.id_p = p.id and p.activo=1 and e.activo=1 and p.id=";
$queEmp = $auxString . $id_program;

$datos = $base->consultar($queEmp);

//  Mestro los datos //

echo "{\"encuestas\":[";
$count=0;

 while ($fila = mysql_fetch_assoc($datos))
 {
    if($count==0)
    {
        echo "{\"id\":";
            echo json_encode(utf8_encode($fila['id']));
        echo ",";
        echo "\"idP\":";
            echo json_encode(utf8_encode($fila['id_p']));
        echo ",";
        echo "\"nombre\":";
            echo json_encode(utf8_encode($fila['nombre']));
        echo ",";
        echo "\"descripcion\":";
            echo json_encode(utf8_encode($fila['descripcion']));
        echo "}";
    }
    else
    {
            echo ",{\"id\":";
                echo json_encode(utf8_encode($fila['id']));
            echo ",";
               echo "\"idP\":";
            echo json_encode(utf8_encode($fila['id_p']));
            echo ",";
            echo "\"nombre\":";
                echo json_encode(utf8_encode($fila['nombre']));
            echo ",";
            echo "\"descripcion\":";
                echo json_encode(utf8_encode($fila['descripcion']));
             echo "}";
    }
    $count++;
}
echo "]}";
}

function getQuestionsAccordingSurvey($base,$id_program,$id_encuesta)
{
$auxString = "select pr.id, pr.descripcion, pr.orden
from programas as p,encuestas as e, preguntas as pr, preguntasxencuesta as pxe 
where e.id_p = p.id and p.activo=1 and pxe.id_e = e.id and pxe.id_p=pr.id and e.id=";

$aux="order by pr.orden asc";

$queEmp = $auxString . $id_encuesta . " ".  $aux;


//echo $queEmp;

$datos = $base->consultar($queEmp);

//  Mestro los datos //

echo "{\"preguntas\":[";
$count=0;

 while ($fila = mysql_fetch_assoc($datos))
 {
    if($count==0)
    {
        echo "{\"id\":";
            echo json_encode(utf8_encode($fila['id']));
        echo ",";
        echo "\"descripcion\":";
            echo json_encode(utf8_encode($fila['descripcion']));
        echo ",";
            echo "\"orden\":";
            echo json_encode(utf8_encode($fila['orden']));
        echo "}";
    }
    else
    {
        echo ",{\"id\":";
            echo json_encode(utf8_encode($fila['id']));
        echo ",";
        echo "\"descripcion\":";
            echo json_encode(utf8_encode($fila['descripcion']));
        echo ",";
            echo "\"orden\":";
            echo json_encode(utf8_encode($fila['orden']));
        echo "}";  
    }
    $count++;
}
echo "]}";
} // fin funcion 

function validatarExistencia($base,$idPrograma,$nombre)
{
	$cadenaConsulta = "SELECT COUNT(*) as cantidad FROM encuestas WHERE id_p='".$idPrograma."' and nombre='".$nombre."'";
	  
	$resultado = $base->consultar($cadenaConsulta);
	  
	$row = mysql_fetch_array($resultado);
	
	$count = $row['cantidad'];
	
	if( $count >0 ) 
	{
		$respuesta = new Respuesta("ERROR","Una Encuesta ya tiene ese nombre..");
		
	} else 
	{
		$respuesta = new Respuesta("OK","");
	}	
	
	echo json_encode($respuesta);
}
?>