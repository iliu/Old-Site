<?php
/****************************************
* XMB v1.0 (XmlMessageBoard)
* http://xmboard.sourceforge.net
*****************************************
* written by erwin vrolijk,
* aierwin@users.sourceforge.net
*****************************************
* this script is released under the GPL
* http://www.gnu.org/copyleft/gpl.html
****************************************/

/* print.php

   requires conf.php

this file containts print functions
*/

//set global array 
$temp;

/* print_from_file($file)
   string $file will be opened en be print out,
   returns false if $file cannot be opened.
*/
function print_from_file($file) {
	$infile = @fopen ($file, "r");
	if (!$infile) {
		return false;
	}
	
	while(!feof($infile)) {
		$line = fgets($infile, 4096); 
		print($line);
	}
	fclose($infile);
}

/* print_xml_starttag($tag, $attrs)
   string $tag
   array $attrs

   transforms XML to HTML and prints
*/
function print_xml_starttag($tag, $attrs) {
	global $temp;

	if ($tag == "MESSAGE") {
		print("<P>");
	}
	
	if ($tag == "IDENTIFIER") {
		print("<font size='1' face='Verdana, Arial, Helvetica, sans-serif'>");
	}

	if ($tag == "AUTHOR") {
		if ($attrs[EMAIL] != "") {
			print("<FONT size='2'><B><A href=mailto:$attrs[EMAIL]>");
			// remember we have opened a <A> tag so we can clos it later
			$temp[OPEN_A_TAG] = true;
		}else{
			print("<FONT size='2'><B>");
		}
	}

	if ($tag == "TEXT") { 
		// remember we are in the TEXT-tag
		$temp[IN_TEXT_TAG] = true;
	}
}
	
/* print_xml_endtag($tag, $attrs)
   string $tag
   array $attrs

   transforms XML to HTML and prints
*/	
function print_xml_endtag($tag, $attrs) {
	global $temp;


	if ($tag == "MESSAGE") {
		print("</P>");
	}
	
	if ($tag == "IDENTIFIER") {
		print("<BR>");
	}

	if ($tag == "AUTHOR") {
		if (isset($temp[OPEN_A_TAG])) {
			print("</A></B>:");
			unset($temp[OPEN_A_TAG]);
		}else{
			print("</B>:");
		}
	}

	if ($tag == "TEXT") {
		print("<BR>");
		unset($temp[IN_TEXT_TAG]);
	}
}


/* print_xml_characterdata($data)
   string $data

   formats and prints $data
*/	
function print_xml_characterdata($data) {
	global $temp;
	global $OUTPUT_LINE_WIDTH;

	if (isset($temp[IN_TEXT_TAG])) {
		print(wordwrap(nl2br($data), $OUTPUT_LINE_WIDTH, '<BR>', 1));
	} else {
		print($data);
	}
}

/* print_redirect($location)

   prints HTML-headers to redirect browser to $location
*/
function print_redirect($location) {
	header ("Location: ".$location);
	exit;
}

/* print_message_navigation($start, $messages_per_page)

   prints line which indicates which messages are displayed,
   and generate links to nex and previous pages
*/
function print_message_navigation($start, $messages_per_page){
	global $BASEFILE;

	print("<P>message ".$start." to ".($start+$messages_per_page)." ");
	if($start > 1) {
		print("<a href='".$BASEFILE."?start=".($start-$messages_per_page)."'>&lt;- newer</a> ");
	}
	print("<a href='".$BASEFILE."?start=".($start+$messages_per_page)."'>older -&gt;</a></P>");
}
?>
