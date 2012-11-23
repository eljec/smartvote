<?php
	/*date_default_timezone_set('UTC');

	$fecha_actual = date("Y-m-d H:i:s");
	echo $fecha_actual;*/
	
	/*$arrayPreguntas = "1-2;";
	
	$filas = explode(";", $arrayPreguntas);
	
	foreach($filas as &$fila)
			{  
			   echo $fila;

			}*/
	
	/*$array = array(
    "foo" => "bar",
    "bar" => "foo",
);*/

/*$array["foo"] = "ema";
$array["ju"] = 1;
	
	var_dump($array);*/
	
?>

<html>
  <head>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="chart_div" style="width: 900px; height: 500px;"></div>
  </body>
</html>