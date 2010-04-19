var xmlDoc2;
function importBoard()
{
	if (document.implementation && document.implementation.createDocument)
	{
		xmlDoc2 = document.implementation.createDocument("", "", null);
		xmlDoc2.onload = createMain;
	}
	else if (window.ActiveXObject)
	{
		xmlDoc2 = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc2.onreadystatechange = function () {
			if (xmlDoc2.readyState == 4) createMain()
		};
 	}
	else
	{
		alert('Your browser can\'t handle this script');
		return;
	}
	xmlDoc2.load("board/data/board.xml");
}

function createMain()
{
	var xb = xmlDoc2.getElementsByTagName('MESSAGE');
	var para = document.createElement('p');
	var len = xb.length<20 ? xb.length:20;
	for (i=0; i<len; i++)
	{
		<!-- Grab the data -->
		var j = 0;
		<!-- skip over empty childs -->
		while (xb[i].childNodes[j].nodeType !=1) j++;
		var theDate = document.createTextNode(xb[i].childNodes[j].firstChild.nodeValue);
		j++;
		while (xb[i].childNodes[j].nodeType !=1) j++;
		var author = document.createTextNode(xb[i].childNodes[j].firstChild.nodeValue);
		var authemail = "mailto:";
		authemail += xb[i].childNodes[j].attributes.getNamedItem('email').nodeValue;
		j++;
		while (xb[i].childNodes[j].nodeType !=1) j++;
		var msgtext = document.createTextNode(xb[i].childNodes[j].firstChild.nodeValue);
		
		<!-- Create the table -->
		var newEl = document.createElement('TABLE');
		newEl.setAttribute('cellPadding',1);
		newEl.setAttribute('width', '95%');
		var tmp = document.createElement('TBODY');
		newEl.appendChild(tmp);
		para.appendChild(newEl);
		var row = document.createElement('TR');
		var container = document.createElement('TH');
		var elink = document.createElement('A');
		elink.setAttribute('href', authemail);
		elink.appendChild(author);
		container.appendChild(elink);
		row.appendChild(container);
		var container2 = document.createElement('TD');
		container2.appendChild(theDate);
		container2.setAttribute('align', 'right');
		row.appendChild(container2);
		tmp.appendChild(row);

		var row2 = document.createElement('TR');
		var container3 = document.createElement('TD');
		container3.setAttribute('ColSpan', '2');
		container3.appendChild(msgtext);
		row2.appendChild(container3);
		tmp.appendChild(row2);
		para.appendChild(newEl);
	} 
	document.getElementById('maincontent').appendChild(para);	
}
