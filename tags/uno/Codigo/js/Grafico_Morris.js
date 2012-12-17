

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
	
	function Morris_Donut_SINO(datos)
	{
		var datosAux = new Array();
		
		var NO = datos[1][1];
		var SI = datos[0][1];
		
		var total = SI +NO;
		
		var SI_OK = (SI * 100)/ total;
		var NO_OK = 100 - SI_OK;
		
		
		var item=
				{
					label:datos[0][0],
					value:SI_OK
				}
		datosAux.push(item);
		
		var item2=
				{
					label:datos[1][0],
					value:NO_OK
				}
		datosAux.push(item2);
		
		return datosAux;
	}
	
	function Morris_Barras(datos)
	{
		var datosAux = new Array();
		
		for(var i = 0;i<datos.length;i++)
		{
			var item=
					{
						y:datos[i][0],
						a:datos[i][1]
					}
			datosAux.push(item);
		}
		
		return datosAux;
	}
	
	function Morris_Barras_SINO(datos)
	{
		var datosAux = new Array();
		
		var NO = datos[1][1];
		var SI = datos[0][1];
		
		var total = SI +NO;
		
		var SI_OK = (SI * 100)/ total;
		var NO_OK = 100 - SI_OK;
		
		var item=
				{
					y:"Votos",
					a: SI_OK,
					b:NO_OK
				}
		
		datosAux.push(item);
		
		return datosAux;
	}

