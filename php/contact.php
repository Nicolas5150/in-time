<?php
// Subject and Email Variables
	$emailSubject = 'Contact Form For In-Time Site';
	$webMaster = 'Nicolas5150@gmail.com';

// Grab items from the contact form html page
	$emailField = $_POST['email'];
	$topicField = $_POST['topic'];
	$messageField = $_POST['message'];

	$body = <<<EOD
<br><hr><br>
Email: $emailField <br>
Topic: $topicField <br>
Message: $messageField <br>
EOD;

	$headers = "From: $emailField\r\n";
	$headers .= "Content-type: text/html\r\n";
	// mail the email to the webMaster described above with following call and
	// mail the sender a copy of the message as well.
	$successRecipient = mail($webMaster, $emailSubject, $body, $headers);
	$successSender = mail($emailField, $emailSubject, $body, $headers);

// Results Rendered as HTML and refresh page to confirmation page
	$theResults = <<<EOD
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html;"><br />
<style type="text/css">
</body>
</html>
EOD;
echo "Your email has been sent.";

?>
