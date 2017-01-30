<?php
$event = $_POST['event'];
$date = $_POST['date'];
$departing = $_POST['departing'];
$depart = $_POST['depart'];
$arriving = $_POST['arriving'];
$arrival = $_POST['arrival'];
$arrival_chk = $_POST['arrival_chk'];
$travel = $_POST['travel'];
$phone = $_POST['phone'];
$carrier = $_POST['carrier'];

// Build connection in secure way
$file = parse_ini_file("waiting.ini");

// Store vars from file
$host = trim($file["dbHost"]);
$user = trim($file["dbUser"]);
$pass = trim($file["dbPass"]);
$name = trim($file["dbName"]);

require("../secure/access.php");
$access = new access($host, $user, $pass, $name);
$access->connect();

$event = $access->insertEvent($event, $date, $departing, $arriving, $arrival, $arrival_chk, $depart, $travel, $phone, $carrier);
if ($event) {
  $returnArray["status"] = "200";
  $returnArray["message"] = "Event added";
}
else {
  $returnArray["status"] = "400";
  $returnArray["message"] = "Event not added";
}

// Close connection
$access->dissconnect();
echo $returnArray["status"];
echo $returnArray["message"];
?>
