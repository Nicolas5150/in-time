<?php
$username = strtolower($_POST['username']);
$password = $_POST['password'];
$email = $_POST['email'];
$phone = $_POST['phone'];

// Check to see if username is only numbers.
if (is_numeric($username)) {
  $returnArray["status"] = "400";
  $returnArray["message"] = "User name must contain characters";
  echo $returnArray["status"];
  echo $returnArray["message"];
}

// Passes all intial checks
else {
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

  // Check if user is in database before entering the registraion
  $profile = $access->getUser($username);
  if ($username == $profile["username"]){
    $returnArray["status"] = "400";
    $returnArray["message"] = "Username taken";
  }

  else
  {
    // 3 Insert user info into database
    $result = $access->registerUser($username ,$password, $email, $phone);
    if($result)
    {
        // Get user profile from access.php function
        $profile = $access->getUser($username);
        if ($username == $profile["username"]) {
          // Start a new session bassed off the users new account.
          $_SESSION['userDetails'] = array();
          $_SESSION['userDetails'][] = $profile["username"];
          $_SESSION['userDetails'][] = $profile["email"];
          $_SESSION['userDetails'][] = $profile["phone"];

          $returnArray["status"] = "200";
          $returnArray["message"] = "User account created";
        }
    }

    // User account can not be created.
    else {
        $returnArray["status"] = "400";
        $returnArray["message"] = "User account not created";
    }
  }

    // 4 Close connection
    $access->dissconnect();
    //return $returnArray;
    echo $returnArray["status"];
    echo $returnArray["message"];
}
?>
