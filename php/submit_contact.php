
<?php
session_start();
require 'db.php';


//This file processes the contact form submission

// Get form inputs safely and remove extra spaces
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Capture logged-in user ID if exists, else NULL
$user_id = $_SESSION['id'] ?? NULL;


// Basic validation for the contact form
if(empty($name) || empty($email) || empty($subject) || empty($message)){
    $_SESSION['contact_error'] = "All fields are required.";
    header('Location: contact.php');
    exit;
}

// Prepare SQL statement to safely insert the contact message into the database
$stmt = $conn->prepare("INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)");
if($stmt === false){
    $_SESSION['contact_error'] = "Database error: " . $conn->error;
    header('Location: contact.php');
    exit;
}

// Bind params parameters to the prepared statement
// 'i' = integer (user_id), 's' = string (name, email, subject, message)
// Null user_id for guests
$stmt->bind_param("issss", $user_id, $name, $email, $subject, $message);

// After that, execute the statement and check for success
if($stmt->execute()){
    //Success message stored in session
    $_SESSION['contact_success'] = "Message sent successfully!";
} else {
    // Error message stored in session
    $_SESSION['contact_error'] = "Failed to send message. Error: " . $stmt->error;
}

//close the statement and connection
$stmt->close();
$conn->close();

//Redirect back to contact page with success/error message
header('Location: contact.php');
exit;
