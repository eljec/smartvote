<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>DataTables example</title>
		<style type="text/css" title="currentStyle">
			/*@import "css/tabla/css/demo_page.css";*/
			@import "css/tabla/css/demo_table.css";
		</style>
		<script src="js/vendor/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
		<script type="text/javascript" charset="utf-8">
			$(document).ready(function() {
				$('#example').dataTable( {
					"bProcessing": true,
					"bServerSide": true,
					"sAjaxSource": "phpHelper/SmartVoteServices.php",
					"oLanguage": {
			            "sLengthMenu": "Mostar _MENU_ elementos por pagina",
			            "sZeroRecords": "No existe un programa con ese nombre",
			            "sInfo": "De _START_ Hasta _END_ DE _TOTAL_ elementos",
			            "sInfoEmpty": "De 0 Hasta 0 de 0 elementos",
			            "sInfoFiltered": "(filtrado, total de elementos: _MAX_ )"
			      	},
					"aLengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
					
					 "fnServerParams": function ( aoData ) {
			            aoData.push( { "name": "action", "value": 6 } );
			        }
				} );
			} );
		</script>
	</head>
	<body id="dt_example">
		<div id="container">
			<div class="full_width big">
				DataTables server-side processing example
			</div>

			<h1>Live example</h1>
			<div id="dynamic">
				<table cellpadding="0" cellspacing="0" border="0" class="display" id="example">
					<thead>
						<tr>
							<th>Nombre Programa</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="5" class="dataTables_empty">Loading data from server</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th>Nombre Programa</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</body>
</html>