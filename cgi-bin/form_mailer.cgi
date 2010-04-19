#!/usr/bin/perl

use CGI;

# Create the CGI object
my $query = new CGI;

# Output the HTTP header
print "Content-type: text/html\n\n";

# Capture the form results
my $yourname = $query->param("yourname");
my $email_address = $query->param("email_address");
my $comments = $query->param("comments");

# Filter the form results
$yourname = filter_header_field($yourname);
$email_address = filter_header_field ( $email_address );
$comments = filter_field ( $comments );

if ($yourname && $email_address && $comments )
{
# Email the form results
open ( MAIL, "| /usr/lib/sendmail -t" );
print MAIL "From: $email_address\n";
print MAIL "To: liu.isaac\@gmail.com\n";
print MAIL "Subject: isaacliu.info form Submission from $yourname\n\n";
print MAIL "$comments\n";
print MAIL "\n.\n";
close ( MAIL );

# Thank the user
print "Your enquiry has been submitted!";

}
else
{
print "Please fill in all fields!";
}

# Functions for filtering user input

sub filter_field
{
  my $field = shift;
  $field =~ s/From://gi;
  $field =~ s/To://gi;
  $field =~ s/BCC://gi;
  $field =~ s/CC://gi;
  $field =~ s/Subject://gi;
  $field =~ s/Content-Type://gi;
  return $field;
}

sub filter_header_field
{
  my $field = shift;
  $field =~ s/From://gi;
  $field =~ s/To://gi;
  $field =~ s/BCC://gi;
  $field =~ s/CC://gi;
  $field =~ s/Subject://gi;
  $field =~ s/Content-Type://gi;
  $field =~ s/[\0\n\r\|\!\/\<\>\^\$\%\*\&]+/ /g;
  return $field;
}