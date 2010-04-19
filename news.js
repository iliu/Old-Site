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
	var newEl = document.createElement('TABLE');
	newEl.setAttribute('cellPadding',0);
	var tmp = document.createElement('TBODY');
	newEl.appendChild(tmp);
	var len = x.length<5? x.length:5;
	for (i=0; i<len; i++)
	{
		var j = 0;
		var row = document.createElement('TR');
		var container = document.createElement('TH');
		<!-- skip over empty childs -->
		while (x[0].childNodes[j].nodeType !=1) j++;
		
		<!-- Append the Title to first row -->
		newstitle[i]= document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		var theData = document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		
		if( i == 0 )
		{
			container.setAttribute('id', "news0");
		}
		else if ( i == 1 )
		{
			container.setAttribute('id', "news1");
		}
		container.appendChild(theData);
		row.appendChild(container);
		j++;
		while (x[0].childNodes[j].nodeType !=1) j++;

		<!-- Append the date to first row -->
		var container = document.createElement('TD');
		newsdate[i]= document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		var theData = document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		container.appendChild(theData);
		container.setAttribute('align', "right");
		row.appendChild(container);
		tmp.appendChild(row);
		j++
		while (x[0].childNodes[j].nodeType !=1) j++;

		<!-- Append the news to next row -->
		var row = document.createElement('TR');
		var container = document.createElement('TD');
		var theData = document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
		container.appendChild(theData);
		container.setAttribute('colSpan', 2);
		row.appendChild(container);
		tmp.appendChild(row);
		<!-- Append empty row -->
		var row = document.createElement('TR');
		var container = document.createElement('TD');
		var theData = document.createTextNode("");
		container.setAttribute('height', 30);
		container.appendChild(theData);
		row.appendChild(container);
		tmp.appendChild(row);
	} 
	document.getElementById('writenews').appendChild(newEl);
	document.getElementById('newstitle0').appendChild(newstitle[0]);
	document.getElementById('newsdate0').appendChild(newsdate[0]);	
	document.getElementById('newstitle1').appendChild(newstitle[1]);
	document.getElementById('newsdate1').appendChild(newsdate[1]);	
}