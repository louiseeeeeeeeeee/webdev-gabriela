
<?php
session_start();
require 'db.php';

// Get POST data safely
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Capture logged-in user ID if exists
$user_id = $_SESSION['id'] ?? NULL;

// Basic validation
if(empty($name) || empty($email) || empty($subject) || empty($message)){
    $_SESSION['contact_error'] = "All fields are required.";
    header('Location: contact.php');
    exit;
}

// Prepare statement
$stmt = $conn->prepare("INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)");
if($stmt === false){
    $_SESSION['contact_error'] = "Database error: " . $conn->error;
    header('Location: contact.php');
    exit;
}

// Bind params (NULL user_id works)
$stmt->bind_param("issss", $user_id, $name, $email, $subject, $message);

if($stmt->execute()){
    $_SESSION['contact_success'] = "Message sent successfully!";
} else {
    $_SESSION['contact_error'] = "Failed to send message. Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

header('Location: contact.php');
exit;
