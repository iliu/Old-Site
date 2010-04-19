<?php
/****************************************
* XMB v1.0 (XmlMessageBoard)
*****************************************
* written by erwin vrolijk,
* erwin@redant.nl
*****************************************
* this script is released under the GPL
* http://www.gnu.org/copyleft/gpl.html
****************************************/

require("./scripts/conf.php");
require("./scripts/print.php");
require("./scripts/xmlparser.php");

if (!isset($start)) {
	$start = 1;
}

print_from_file("./data/top.inc");
print_message_navigation($start, $MESSAGES_PER_PAGE);
read_messages($XML_INPUTFILE, $start, $MESSAGES_PER_PAGE); 
print_from_file("./data/bottom.inc");

?>
