<?php 

function is_valid_email ($address) {
    return (preg_match(
        '/^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+'.   // the user name
        '@'.                                     // the ubiquitous at-sign
        '([-0-9A-Z]+\.)+' .                      // host, sub-, and domain names
        '([0-9A-Z]){2,4}$/i',                    // top-level domain (TLD)
        trim($address)));
}

function fdate($country){
	if ($country == "") {
		$country = "en_US";
	}
	setlocale("LC_ALL", $country); 
	$time = strtolower(strftime("%d %B %Y, %H.%M"));
	return $time;
}

$EMAILADDRESS_WEBMASTER = "liu.isaac@gmail.com";

$naam = $_GET['yourname'];
$email = $_GET['email_address'];
$tekst = $_GET['comments'];
$REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];

if ($naam  == "" ||
    $tekst == "" ||
	$email == "") {
	die ("Please fill out all fields!");
}

if (!is_valid_email($email)) {
    die ("$email is not a valid email address!");
}

$naam  = htmlspecialchars(strip_tags(stripslashes($naam)));
$email = htmlspecialchars(strip_tags(stripslashes($email)));
$tekst = htmlspecialchars(strip_tags(stripslashes($tekst)));

$message = @fdate()." ip: ".$REMOTE_ADDR."\nAuthor: ".$naam."\n\n".$tekst;
$return = mail($EMAILADDRESS_WEBMASTER, "Email form from isaacliu.info" , $message, "From: $email");

if( $return == TRUE )
	echo "Message sent!";
else
	echo "Server error, message not sent!";



?>
