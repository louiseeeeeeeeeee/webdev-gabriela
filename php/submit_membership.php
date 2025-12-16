<?php
session_start();
require 'db.php'; // your database connection

if (!isset($_SESSION['username'])) {
    header("Location: ../index.php?showLogin=true");
    exit();
}

$username = $_SESSION['username'];

// Get user ID
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) die("User not found");

$user = $result->fetch_assoc();
$user_id = $user['id'];

// Get POST data
$plan = $_POST['plan'] ?? '';
$price = $_POST['price'] ?? '';
$paymentMethod = $_POST['paymentMethod'] ?? '';
$paymentDetail = $_POST['paymentDetail'] ?? '';

if (!$plan || !$price || !$paymentMethod || !$paymentDetail){
    die("All fields are required");
}

// Insert into memberships
$stmt = $conn->prepare("INSERT INTO memberships (user_id, plan, price, payment_method, payment_detail) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $user_id, $plan, $price, $paymentMethod, $paymentDetail);

if ($stmt->execute()) {
    // Redirect back to services.php with success flag
    header("Location: services.php?membership=success");
    exit();
} else {
    die("Error: " . $stmt->error);
}
?>
