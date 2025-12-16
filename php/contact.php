<?php
session_start();
require 'db.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gabriella - Contact Us</title>
    <link rel="stylesheet" href="../css/contact.css">
    <link rel="stylesheet" href="../css/main.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>

    <!-- Header -->
    <header class="header">
        <div class="header-inner">
            <div class="logo">Gab<span class="logo-text-main">ri</span><span class="accent">ella</span></div>
            <nav class="nav">
                <a href="../index.php">Home</a>
                <a href="about.php">About Us</a>
                <a href="services.php">Membership</a>
                <a href="learn.php">Learn</a>
                <a href="contact.php">Contact</a>
            </nav>

            <?php if(isset($_SESSION['username'])): ?>
                <div class="user-dropdown">
                    <button class="user-btn btn" type="button" aria-expanded="false">
                        <?= htmlspecialchars($_SESSION['username']); ?>
                    </button>
                    <div class="user-menu" style="display:none;">
                        <a href="/profile.php" class="profile-link">Visit profile</a>
                        <a href="logout.php" class="logout-btn">Logout</a>
                    </div>
                </div>
            <?php else: ?>
                <button class="btn login">Log In</button>
            <?php endif; ?>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero contact-hero">
        <h1>Get in Touch</h1>
        <p>Have a question or suggestion? Reach out to us and we’ll respond as soon as possible.</p>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
        <div class="contact-container">

            <!-- Contact Info -->
            <div class="contact-info">
                <h2>Contact Information</h2>
                <p>We’d love to hear from you! Here’s how to reach us:</p>
                <div class="info-item">
                    <span>Email:</span> support@gabriellahealthcare.com
                </div>
                <div class="info-item">
                    <span>Phone:</span> +63 912 345 6789
                </div>
                <div class="info-item">
                    <span>Address:</span> 123 Health St, Manila, Philippines
                </div>
            </div>

            <!-- Contact Form -->
            <div class="contact-form-card">
                <h2>Send a Message</h2>

                <!-- Success/Error Messages -->
                <?php if(isset($_SESSION['contact_success'])): ?>
                    <p class="success"><?= $_SESSION['contact_success']; unset($_SESSION['contact_success']); ?></p>
                <?php endif; ?>
                <?php if(isset($_SESSION['contact_error'])): ?>
                    <p class="error"><?= $_SESSION['contact_error']; unset($_SESSION['contact_error']); ?></p>
                <?php endif; ?>

                <form class="contact-form" method="POST" action="submit_contact.php">
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Full Name" required>
                    
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Email Address" required>
                     
                    </div>
                    <div class="form-group">
                        <input type="text" id="subject" name="subject" placeholder="Enter the subject of your message " required>
                       
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="5" placeholder="Write your message here... " required></textarea>
                    
                    </div>
                    <button type="submit" class="btn warm">Send Message</button>
                </form>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <p class="footer-logo">Gabriella</p>
            <nav class="footer-nav">
                <a href="../index.php" class="gradient-underline">Home</a>
                <a href="about.php" class="active">About</a>
                <a href="services.php" class="gradient-underline">Membership</a>
                <a href="learn.php" class="gradient-underline">Learn</a>
                <a href="contact.php" class="gradient-underline">Contact</a>
            </nav>
            <p class="footer-copy">© 2025 Gabriella Healthcare. All rights reserved.</p>
        </div>
    </footer>

    <!-- LOGIN / REGISTER OVERLAY -->
    <div class="overlay" id="authOverlay">
        <div class="auth-container">
            <button class="close-btn" id="closeAuth">&times;</button>

            <div class="auth-tabs">
                <button class="tab active" id="loginTab">Log In</button>
                <button class="tab" id="registerTab">Register</button>
            </div>

            <!-- LOGIN FORM -->
            <form class="auth-form" id="loginForm">
                <h2>Log In</h2>
                <label>Email</label>
                <input type="email" required>
                <label>Password</label>
                <input type="password" required>
                <button type="submit" class="btn auth-btn">Log In</button>
            </form>

            <!-- REGISTRATION FORM -->
            <form class="auth-form hidden" id="registerForm">
                <h2>Create Account</h2>
                <label>Username</label>
                <input type="text" required>
                <label>First Name</label>
                <input type="text" required>
                <label>Last Name</label>
                <input type="text" required>
                <label>Birthday</label>
                <input type="date" required>
                <label>Email Address</label>
                <input type="email" required>
                <h3>Address</h3>
                <label>Street</label>
                <input type="text">
                <label>Barangay</label>
                <input type="text">
                <label>City</label>
                <input type="text">
                <label>Postal Code</label>
                <input type="text">
                <button type="submit" class="btn auth-btn">Register</button>
            </form>
        </div>
    </div>

    <script src="../js/nav.js"></script>
    <script src="../js/ctaphp.js"></script>
</body>
</html>
