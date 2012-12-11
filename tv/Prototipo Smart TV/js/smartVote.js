
function getIdentificador()
{
	return "3TV6" ;
}

function getMACaddress()
{
	var pluginNetWork_JS = document.getElementById("pluginNetWork");
	
	// Obtengo tipo conexxion 
	
	var cType = pluginNetWork_JS.GetActiveType();
	
	// Obtengo MAC
	
	var mac = pluginNetWork_JS.GetMAC(cType);
	
	return mac;
}

function getSerialNumberTV()
{
	var pluginNNavi_JS = document.getElementById("pluginNNavi");
	
	// Obtengo la MAC
	
	var mac = getMACaddress();
	
	// Obtengo el codigo del TV
	
	var ESNCode = pluginNNavi_JS.GetDUID(mac);
	
	return ESNCode;
}