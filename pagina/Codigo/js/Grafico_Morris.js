

	function Morris_Donut(datos)
	{
		var datosAux = new Array();
		
		for(var i = 0;i<datos.length;i++)
		{
			var item=
					{
						label:datos[i][0],
						value:datos[i][1]
					}
			datosAux.push(item);
		}
		
		return datosAux;
	}
