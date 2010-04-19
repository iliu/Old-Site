
function importXML()
{
	if (document.implementation && document.implementation.createDocument)
	{
		xmlDoc = document.implementation.createDocument("", "", null);
		xmlDoc.onload = createTable;
	}
	else if (window.ActiveXObject)
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.onreadystatechange = function () {
			if (xmlDoc.readyState == 4) createTable()
		};
 	}
	else
	{
		alert('Your browser can\'t handle this script');
		return;
	}
	xmlDoc.load("news.xml");
}

function createTable()
{
	var newstitle=new Array();
	var newsdate=new Array();
	var x = xmlDoc.getElementsByTagName('item');
	for (i=0; i<2; i++)
	{
		var j = 0;
		<!-- skip over empty childs -->
		while (x[0].childNodes[j].nodeType !=1) j++;
		
		<!-- Append the Title to first row -->
		newstitle[i]= document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		
		j++;
		while (x[0].childNodes[j].nodeType !=1) j++;
		<!-- Append the date to first row -->
		newsdate[i]= document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		<!-- Append the news to next row -->
	} 
	
	document.getElementById('newstitle0').appendChild(newstitle[0]);
	document.getElementById('newsdate0').appendChild(newsdate[0]);	
	document.getElementById('newstitle1').appendChild(newstitle[1]);
	document.getElementById('newsdate1').appendChild(newsdate[1]);	
}
