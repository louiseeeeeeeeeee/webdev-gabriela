<?php
session_start();
require 'db.php'; // your database connection

//This part ensures only logged-in users can submit membership forms
if (!isset($_SESSION['username'])) {
    header("Location: ../index.php?showLogin=true");
    exit();
}

// When logged in, get username from session
$username = $_SESSION['username'];


//this part processes the membership form submission
// First, prepare a query to get user ID based on username
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

// Get the result of the query
$result = $stmt->get_result();
//if no user found, exit
if ($result->num_rows === 0) die("User not found");

// fetch the user ID
$user = $result->fetch_assoc();
$user_id = $user['id']; // Store user ID for membership record


//Next, process the membership form data. Retrieve membership details from POST
// Get POST data safely (fallback to empty string if not set)
$plan = $_POST['plan'] ?? '';
$price = $_POST['price'] ?? '';
$paymentMethod = $_POST['paymentMethod'] ?? '';
$paymentDetail = $_POST['paymentDetail'] ?? '';


// Basic validation
// This part ensures all fields are filled
if (!$plan || !$price || !$paymentMethod || !$paymentDetail){
    die("All fields are required");
}

// Finally, insert membership record into the database

// Prepare SQL statement to insert membership details.
$stmt = $conn->prepare("INSERT INTO memberships (user_id, plan, price, payment_method, payment_detail) VALUES (?, ?, ?, ?, ?)");

// Bind parameters to the prepared statement
// 'i' = integer (user_id), 's' = string (plan, price, payment_method, payment_detail)
$stmt->bind_param("issss", $user_id, $plan, $price, $paymentMethod, $paymentDetail);

// Execute the statement and check for success
if ($stmt->execute()) {
    // Redirect back to services.php with success flag
    header("Location: services.php?membership=success");
    exit();
} else {
    // On failure, show error message
    die("Error: " . $stmt->error);
}
?>
