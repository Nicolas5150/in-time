<?php
// Access functions
// Declare class to access this php file
class access{
    // Global connection variables
    var $serverHost = null;
    var $username = null;
    var $password = null;
    var $dbName = null;
    var $connection = null;
    var $result = null;

    // Construction function for class
    function __construct($dbhost, $dbuser, $dbpass, $dbname){
        // Use oop procedure to declare instance of global variables
        $this->serverHost = $dbhost;
        $this->username = $dbuser;
        $this->password = $dbpass;
        $this->dbName = $dbname;
    }

    // Connection to server function
    public function connect(){
        // This will store our connection to the database as a var called connection
        $this->connection = new mysqli($this->serverHost, $this->username, $this->password, $this->dbName);

        if(mysqli_connect_errno()){
            echo"Could not connect to the database";
        }
        else {
            // Allow all languages
            $this->connection->set_charset("utf8");
        }
    }

    // Dissonnection to server function
    public function dissconnect(){
        if($this->connection != null) {
            $this->connection->close();
        }
    }

    // Insert user details to the database
    public function registerUser($username ,$password, $email, $phone){
        // INSERT INTO users SET   This is SQL syntax and "users" in the table name
        $sql ="INSERT INTO users SET username =?, password=?, email=?, phone=?";
        // Store query result in statement var
        $statement = $this->connection->prepare($sql);

        //Check for statment
        if(!$statement){
            throw new Exception($statement->error);
        }
        // Bind as strings with all 5 variables - prepairing
        $statement->bind_param("ssss", $username ,$password, $email, $phone);

        $returnValue = $statement->execute();

        // Create a new table in the database corresponding to the new user created.
        // This will be how the users table can reach its corresponding user table (relation)
        $newTable = " CREATE TABLE $username (
          id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          event VARCHAR(30) NOT NULL,
          dates VARCHAR(30) NOT NULL,
          departing VARCHAR(50),
          depart VARCHAR(50),
          arriving VARCHAR(50),
          arrival VARCHAR(50),
          durration VARCHAR(50)
          )";

        $tableResult = mysqli_query($this->connection, $newTable);
        if ($tableResult === TRUE) {
          return $returnValue;
        }

        return false;
    }

    // Select user data via usernames in database
    public function getUser($username){
        // Select INTO users SET   This is SQL syntax and "users" in the table name
        // http://php.net/manual/en/function.mysql-fetch-array.php
        $sql = "SELECT * FROM users WHERE username='".$username."'";
        // Assign result from $sql into $result var
        $result = $this->connection->query($sql);

        // If at least one result is returned from the database
        if($result != null && mysqli_num_rows($result) >= 1)
        {
            // Store all selected data in result to the $row var
            $row = $result->fetch_array(MYSQLI_ASSOC);
            return $row;
        }

        // No name was found in the database retun null.
        $row = false;
        return $row;
    }
}
?>
