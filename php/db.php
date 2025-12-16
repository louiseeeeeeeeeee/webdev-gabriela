<?php
$servername = "localhost";
$dbname = "gabriella_db";
$dbusername = "root"; // default for XAMPP
$dbpassword = "";     // default is empty

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
