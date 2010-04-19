var xmlDoc2;
var exp;
function importMain(str)
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
	xmlDoc2.load("experience.xml");
	exp=str;
}

var otitle;
var odate;
var ocontent;
function createMain()
{
	var x = xmlDoc2.getElementsByTagName('experience');
	var ntitle=document.createElement('h1');
	var ndate=document.createElement('p');
	var nbold=document.createElement('b');
	var ncontent=document.createElement('p');
	
	if ( document.getElementById('maincontent').hasChildNodes() )
	{
		document.getElementById('maincontent').removeChild(otitle);
		document.getElementById('maincontent').removeChild(odate);
		document.getElementById('maincontent').removeChild(ocontent);
	}

	for (i=0; i<x.length; i++)
	{
		var j = 0;
		<!-- skip over empty childs -->
		while (x[i].childNodes[j].nodeType !=1) j++;
		
		<!-- Check if it's the correct XML -->
		if ( x[i].childNodes[j].firstChild.nodeValue == exp )
		{
			var theTitle=document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
			ntitle.appendChild(theTitle);
			
			j++;
			while (x[i].childNodes[j].nodeType !=1) j++;

			ndate.setAttribute("Size", 1);
			var theDate=document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
			ndate.appendChild(nbold);
			ndate.appendChild(theDate);
	

			j++;
			while (x[i].childNodes[j].nodeType !=1) j++;
			
			var theSummary=document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
			ncontent.appendChild(theSummary);
		}
	} 
	
	document.getElementById('maincontent').appendChild(ntitle);
	document.getElementById('maincontent').appendChild(ndate);
	document.getElementById('maincontent').appendChild(ncontent);
	otitle=ntitle;
	odate=ndate;
	ocontent=ncontent;
	
}
