<?php
session_start();

// Check if user is logged in
if(!isset($_SESSION['username'])) {
    // Redirect back to home page with a flag to auto-open login overlay
    header("Location: ../index.php?showLogin=true");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gabriella - Membership</title>
    <link rel="stylesheet" href="../css/services.css">
    <link rel="stylesheet" href="../css/main.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
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
            <!-- Dropdown UI -->
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

<!-- Hero -->
<section class="hero">
    <h1>Membership Plans</h1>
    <p>Choose a healthcare plan that fits your lifestyle and needs.</p>
</section>

<?php
if (isset($_GET['membership']) && $_GET['membership'] === 'success') {
    echo '
    <div class="success-msg-overlay">
        <div class="success-icon">✔</div>
        <div class="success-text">
            Membership subscribed successfully!
        </div>
        <button id="closeSuccess">&times;</button>
    </div>
    ';
}
?>

<!-- Membership Cards -->
<section class="membership">
    <div class="plan-card">
        <h2>Basic Plan</h2>
        <p class="price">₱499/month</p>
        <ul>
            <li>✔ Trust Condoms (5 packs)</li>
            <li>✔ Trust Lubricant (3 bottles)</li>
            <li>✔ Oral Contraceptive Pills (3 packs)</li>
            <li>✔ Trust Hygiene Kit (soap, wipes, sanitizer)</li>
            <li>✔ Educational Brochures from Trust</li>
            <li>✔ 20% Discount on All Trust Products (valid for 3 months)</li>

        </ul>
        <button class="btn warm">Choose Plan</button>
    </div>

    <div class="plan-card highlight">
        <h2>Standard Plan</h2>
        <p class="price">₱999/month</p>
        <ul>
            <li>✔ Trust Condoms (10 packs)</li>
            <li>✔ Trust Lubricant (5 bottles)</li>
            <li>✔ Oral Contraceptive Pills (5 packs)</li>
            <li>✔ Trust Hygiene Kit (soap, wipes, sanitizer)</li>
            <li>✔ Educational Brochures from Trust</li>
            <li>✔ 25% Discount on All Trust Products (valid for 3 months)</li>
        </ul>
        <button class="btn warm">Choose Plan</button>
    </div>
    
    <div class="plan-card">
        <h2>Premium Plan</h2>
        <p class="price">₱1,499/month</p>
        <ul>
            <li>✔ Trust Condoms (15 packs)</li>
            <li>✔ Trust Lubricant (10 bottles)</li>
            <li>✔ Oral Contraceptive Pills (10 packs)</li>
            <li>✔ Trust Hygiene Kit (soap, wipes, sanitizer)</li>
            <li>✔ Educational Brochures from Trust</li>
            <li>✔ 30% Discount on All Trust Products (valid for 6 months)</li>
        </ul>
        <button class="btn warm">Join Premium</button>
    </div>
</section>

<!-- Testing Centers Section -->
<section class="testing-centers">
    <h2>Nearest HIV Testing Centers</h2>
    <p>Based on your current location</p>

    <div class="map-container">
        <div id="map"></div>

        <div id="centerList" class="center-list">
            <p>Loading nearby centers...</p>
        </div>
    </div>
</section>


<!-- Membership Overlay -->
<div id="membershipOverlay">
    <div class="overlay-content">
        <span id="closeMembership">&times;</span>
         <form id="membershipForm" method="POST" action="submit_membership.php">
    <h2>
        Subscribe to:<br>
        <span id="selectedPlan">Plan Name</span>
        <span id="selectedPrice"></span>
    </h2>

    <!-- Hidden inputs for plan and price -->
    <input type="hidden" name="plan" id="formPlan">
    <input type="hidden" name="price" id="formPrice">

    <label for="paymentMethod">Payment Method</label>
    <select name="paymentMethod" id="paymentMethod" required>
        <option value="">Select a method</option>
        <option value="paypal">PayPal</option>
        <option value="gcash">Gcash</option>
        <option value="Maya">Maya</option>
    </select>

    <input type="text" name="paymentDetail" id="paymentDetail" placeholder="" style="display:none;" required>

    <button type="submit" class="btn">Submit</button>
</form>

    </div>
</div>

    <!-- Footer -->
<footer class="footer">
    <div class="footer-container">
        <p class="footer-logo">Gabriella</p>
        
        <nav class="footer-nav">
            <a href="index.html" class="gradient-underline">Home</a>
            <a href="about.html" class="active">About</a>
            <a href="services.html" class="gradient-underline">Membership</a>
            <a href="learn.html" class="gradient-underline">Learn</a>
            <a href="contact.html" class="gradient-underline">Contact</a>
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

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="../js/testing-centers.js"></script>
<script src="../js/planphp.js"></script>
<script src="../js/nav.js"></script>
<script src="../js/ctaphp.js"></script>

</body>
</html>