<?php
		// Carrier and number to send text message to.
		// Create one string for phone to email type purposes.
		$number = htmlspecialchars($_POST['number']);
		$carrier = htmlspecialchars($_POST['carrier']);
		$numberAndCarrier = $number ."@". $carrier;

		// Event details and time / momentObj.
		$events = htmlspecialchars($_POST['events']);
		$momentObj = htmlspecialchars($_POST['momentObj']);

		// Create a message with subject for the user.
		// Concat the message with the compressed google url for the message.
		$subject = 'In-Time Alert';
		$message = "This is a reminder letting you know to leave for ". $events ." at ". $momentObj ."  ";
		$message .= htmlspecialchars($_POST['googleURL']);

		// Send off the text message
		mail($numberAndCarrier, $subject, $message);
?>
