<?php
		// Carrier and number to send text message to.
		$number = htmlspecialchars($_POST['number']);
		$carrier = htmlspecialchars($_POST['carrier']);
		// Create one string for phone to email type purposes.
		$numberAndCarrier = $number ."@". $carrier;

		// Event details and time.
		$events = htmlspecialchars($_POST['events']);
		$momentObj = htmlspecialchars($_POST['momentObj']);

		// Create a message for the user.
		$subject = 'In-Time Alert';
		$message = "Hey there, here's a notification letting you know to leave for ". $events ." at ". $momentObj;

		// Current Location, to destination. As well as gps route.
		$urlLink = htmlspecialchars($_POST['googleURL']);

		// Send off the text message
		mail($numberAndCarrier, $message, $urlLink);

		//echo $numberAndCarrier ."\n". $message ."\n". $urlLink ."\n". $momentObj;
		echo $urlLink;

?>
