<?php
$username = strtolower($_POST['username']);
$password = $_POST['password'];

// Secure password using sha1 encryption function
$password = sha1($password);

// 2 Build Connection
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

// Try and grab user from the database, if found check username and password
$profile = $access->getUser($username);
if ($username == $profile["username"] && $password == $profile["password"]){
  $returnArray["status"] = "200";
  $returnArray["message"] = "Username and password match";
}

// Username or password does not match.
else {
  $returnArray["status"] = "400";
  $returnArray["message"] = "Incorrect username or password";
}

// Echo back the results.
echo $returnArray["status"];
echo $returnArray["message"];
?>
