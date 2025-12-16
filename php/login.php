<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP default
$database = "gabriella_db"; // change to your actual DB name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Fetch user from database
    $sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            // Login success
            $_SESSION['logged_in'] = true;
            $_SESSION['username'] = $user['username'];
            header("Location: ../index.php");
            exit();
        } else {
            // Invalid password
            $_SESSION['login_error'] = "Invalid email or password.";
            header("Location: ../index.php?showLogin=true");
            exit();
        }
    } else {
        // User not found
        $_SESSION['login_error'] = "Invalid email or password.";
        header("Location: ../index.php?showLogin=true");
        exit();
    }
}

$conn->close();
?>
