<?php
//Database connection settings (localhost is used for local development)
$servername = "localhost";
$dbname = "gabriella_db"; // this is the name of the database for this website 
$dbusername = "root"; // default for XAMPP
$dbpassword = "";     // default is empty

//Create connection using the credentials above
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

//Check connection. If it fails, output the error message
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// if connection is successful, do nothing and continue loading the page
?>
