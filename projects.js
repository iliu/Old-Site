var xmlDoc2;
var proj;

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
	xmlDoc2.load("projects.xml");
	proj=str;
}

var ocontent;
function createMain()
{
	var browser=navigator.appName;
	var x = xmlDoc2.getElementsByTagName('project');
	var ncontent=document.createElement('p');
	
	if ( document.getElementById('maincontent').hasChildNodes() )
	{
		document.getElementById('maincontent').removeChild(ocontent);
	}
	
	var pageTitle=document.createElement('h1');
	switch(proj)
	{
		case "Software":
			var pageTitleText=document.createTextNode("Software Projects");
			break;
		case "Hardware":
			var pageTitleText=document.createTextNode("Hardware Projects");
			break;
		case "Web":
			var pageTitleText=document.createTextNode("Web Projects");
			break;
	}
	pageTitle.appendChild(pageTitleText);
	ncontent.appendChild(pageTitle);

	var menubar=document.createElement('div');
	menubar.setAttribute('align', 'RIGHT');
	ncontent.appendChild(menubar);		
	
	for (i=0; i<x.length; i++)
	{
		if ( x[i].parentNode.nodeName == proj )
		{
			var j = 0;
			var menuurl="#";
			<!-- skip over empty childs -->
			while (x[i].childNodes[j].nodeType !=1) j++;
		
			var utitle=document.createElement('u');
			var btitle=document.createElement('b');
			var menulink=document.createElement('a');
			var theTitle=document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
			btitle.appendChild(theTitle);
			utitle.appendChild(btitle);
			

			var theTitle2=document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
			var menuseperate=document.createTextNode(" | ");
			menulink.appendChild(theTitle2);
			menuurl+=x[i].childNodes[j].firstChild.nodeValue;
			menulink.setAttribute('href', menuurl);
			menubar.appendChild(menulink);
			if ( i != x.length-1)
			if( x[i+1].parentNode.nodeName == proj )
			{
				menubar.appendChild(menuseperate);
			}
			

			var project=document.createElement('p')
			project.appendChild(utitle);
			var entry=document.createElement('table');
			entry.setAttribute('cellpadding', '2');
			entry.setAttribute('width', "100%");
			var dummy=document.createElement('tbody');
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			td1.setAttribute('vAlign', 'TOP');
			td1.setAttribute('width', '33%');
			var td2 = document.createElement('td');
			td2.setAttribute('width', '67%');
			td2.setAttribute('vAlign', 'TOP');
			tr.appendChild(td1);
			tr.appendChild(td2);
			dummy.appendChild(tr);
			entry.appendChild(dummy);
			project.setAttribute('id', x[i].childNodes[j].firstChild.nodeValue);
			
			var len = (browser=="Microsoft Internet Explorer")? x[i].childNodes.length : x[i].childNodes.length-1;
			for ( j++ ;j<len; j++)
			{
				while (x[i].childNodes[j].nodeType != 1 )  j++;
				
				
				if ( x[i].childNodes[j].nodeName != "Link" )
				{	
					var field=document.createElement('div');
					var fieldtitle=document.createElement('b');
					var fieldname=document.createTextNode(x[i].childNodes[j].nodeName);
					fieldtitle.appendChild(fieldname);
					field.appendChild(fieldtitle);
					var fieldseperate=document.createTextNode(": ");
					field.appendChild(fieldseperate);
					var fieldData=document.createTextNode(x[i].childNodes[j].firstChild.nodeValue);
					field.appendChild(fieldData);
				}	
				else
				{
					var field=document.createElement('A');
					var fieldname=document.createTextNode(x[i].childNodes[j].nodeName);
					field.appendChild(fieldname);
					field.setAttribute('href', x[i].childNodes[j].firstChild.nodeValue);
					field.setAttribute('target', '_BLANK');
				}
	
				
				if ( x[i].childNodes[j].nodeName != "Summary" )
					td1.appendChild(field);
				else
					td2.appendChild(field);

			} 
			project.appendChild(entry)
			ncontent.appendChild(project);
			
		
		} 
	}
	document.getElementById('maincontent').appendChild(ncontent);
	ocontent=ncontent;
	
}

	