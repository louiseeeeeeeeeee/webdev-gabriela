<?php
session_start();

// Show errors for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php';

// Check if form submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // this are the values from the registration form. Collecting them into variables
    $username   = $_POST['username'];
    $firstname  = $_POST['firstname'];
    $lastname   = $_POST['lastname'];
    $birthday   = $_POST['birthday'];
    $email      = $_POST['email'];
    $password   = password_hash($_POST['password'], PASSWORD_DEFAULT); // hash password
    $street     = $_POST['street'];
    $barangay   = $_POST['barangay'];
    $city       = $_POST['city'];
    $postalcode = $_POST['postalcode'];

    // Check if email already exists. if it does, show error message
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();
    if ($check->num_rows > 0) {
        echo "Email already registered!";
        exit;
    }
    $check->close();

    // Insert new user
    $sql = "INSERT INTO users (username, firstname, lastname, birthday, email, password, street, barangay, city, postalcode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $username, $firstname, $lastname, $birthday, $email, $password, $street, $barangay, $city, $postalcode);

    if ($stmt->execute()) {
        $user_id = $conn->insert_id; 
        // Save user data in session after successful registration
        $_SESSION['logged_in'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['id']        = $user_id;
        $_SESSION['firstname'] = $firstname;
        $_SESSION['lastname']  = $lastname;
        $_SESSION['email']     = $email;
        header("Location: ../index.php"); // redirect to homepage
        exit();
    } else {
        $_SESSION['register_error'] = "Registration failed. Please try again.";
        header("Location: ../index.php?showRegister=true");
        exit();
    }

    $stmt->close();
    $conn->close();
}
?>
