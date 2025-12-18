<?php
// This file handles user login authentication. 
//Start a new session or resume existing
session_start();

require_once 'db.php';

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
            $_SESSION['id']        = $user['id'];
            $_SESSION['firstname'] = $user['firstname'];
            $_SESSION['lastname']  = $user['lastname'];
            $_SESSION['email']     = $user['email'];
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
