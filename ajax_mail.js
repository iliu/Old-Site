var xmlHttp;
var text;


function mailform()
{
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null)
{
alert ("Browser does not support HTTP Request")
return
} 

if ( document.getElementById("formstatus").hasChildNodes() )
{
	document.getElementById("formstatus").removeChild(text);
}
text=document.createTextNode("Sending....");
document.getElementById("formstatus").appendChild(text);


var name = document.email_form.yourname.value;
var email= document.email_form.email_address.value;
var comments = document.email_form.comments.value;
var url ="/mail.php";
url= url+"?yourname="+name+"&email_address="+email+"&comments="+comments;	
xmlHttp.onreadystatechange=stateChanged;
xmlHttp.open("GET",url,true);
xmlHttp.send(null);
} 


function stateChanged() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
{ 
if (xmlHttp.status==200)
{
document.email_form.yourname.value="";
document.email_form.email_address.value="";
document.email_form.comments.value="";
if ( document.getElementById("formstatus").hasChildNodes() )
{
	document.getElementById("formstatus").removeChild(text);
}
text=document.createTextNode(xmlHttp.responseText);
document.getElementById("formstatus").appendChild(text);
}
} 
} 

function GetXmlHttpObject()
{ 
var objXMLHttp=null
if (window.XMLHttpRequest)
{
objXMLHttp=new XMLHttpRequest()
}
else if (window.ActiveXObject)
{
objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
}
return objXMLHttp
} 
