<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gabriella - Healthcare Home</title>
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="css/main.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
            <?php
        if (isset($_SESSION['error'])) {
            echo "<div class='error-msg'>{$_SESSION['error']}</div>";
            unset($_SESSION['error']);
        }
        ?>

  <header class="header">
    <div class="header-inner">
        <div class="logo">Gab<span class="logo-text-main">ri</span><span class="accent">ella</span></div>
        <nav class="nav">
            <a href="index.php?">Home</a>
            <a href="php/about.php">About Us</a>
            <a href="php/services.php">Membership</a>
            <a href="php/learn.php">Learn</a>
            <a href="php/contact.php">Contact</a>
        </nav>

        <?php if(isset($_SESSION['username'])): ?>
            <!-- Dropdown UI -->
            <div class="user-dropdown">
                <button class="user-btn btn" type="button" aria-expanded="false">
                    <?= htmlspecialchars($_SESSION['username']); ?>
                </button>
                <div class="user-menu" style="display:none;">
                    <a href="/profile.php" class="profile-link">Visit profile</a>
                    <a href="php/logout.php" class="logout-btn">Logout</a>
                </div>
            </div>
        <?php else: ?>
            <button class="btn login">Log In</button>
        <?php endif; ?>
    </div>
</header>

  <!-- Hero Section -->
<section class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1>Empowering Filipino Youth for HIV Awareness and Safe Sexual Health</h1>
        <p>Get reliable, youth-friendly guidance on HIV prevention, testing, 
            treatment, and safe-sex essentials—built for Filipinos, backed by trusted partners.</p>
        <div class="hero-buttons">
            <a href="#features" class="btn warm">Explore more</a>
            <a href="php/learn.php" class="btn outline">Learn About HIV</a>
        </div>
    </div>
</section>


    <!-- Features / Info Section -->
    <section class="features" id="features">
        <h2 class="features-title" id="features-title">Our Key Features</h2>
       
        <div class="feature-grid">
            <div class="feature-card">
                <img src="assets/education-cap-svgrepo-com.svg" alt="Education Icon">
                <h3>Education</h3>
                <p>Access easy-to-understand articles about HIV, safe sex, prevention, STIs, and medication guidance.</p>
            </div>
            <div class="feature-card">
                <img src="assets/health-center-clinic-svgrepo-com.svg" alt="Support Icon">
                <h3>Testing Centers</h3>
                <p>Find nearby HIV testing and treatment facilities through our referral directory.</p>
            </div>
            <div class="feature-card">
                <img src="assets/feature-condom-svgrepo-com.svg" alt="Membership Icon">
                <h3>Safe-Sex Essentials</h3>
                <p>Explore our membership plans offering affordable and discreet safe-sex products.</p>
            </div>
        </div>
    </section>

    <!-- Info Cards -->
    <section class="info">
        
        <div class="info-card left">
            <h2>Who We Are</h2>
            <p>Gabriella is a youth-focused reproductive health platform dedicated to HIV awareness, 
                education, and accessible care. We partner with local and international NGOs to deliver trusted information for Filipino communities.</p>
        </div>
         
        
        <div class="info-card right">
            <h2>Your Guide to HIV Awareness</h2>
            <p>Understand the causes, symptoms, myths, risks, and prevention methods of HIV through evidence-based resources designed for young Filipinos.</p>
        </div>

    <div class="info-card left">
        <h2>Membership Plans</h2>

            <div class="plan-container">
                <div class="info-card plan">
                    <h3>Basic Plan</h3>
                     <p><i>Great for getting started.</i></p>
                </div>

                <div class="info-card plan">
                    <h3>Standard Plan</h3>
                    <p><i>Most loved by members.</i></p>
                </div>

                <div class="info-card plan">
                    <h3>Premium Plan</h3>
                    <p><i>Best value! Unlimited access.</i></p>
                </div>
            </div>
    </div>
        
    </section>

<!-- Call to Action -->
    <!-- CTA Action Cards: Learn, Get, Join -->
<section class="cta-cards">
    <div class="cta-card">
        <img src="assets/knowledgethin-svgrepo-com.svg" alt="Education Icon">
        <h3>Learn</h3>
        <p>Explore simplified guides and articles about HIV, STIs, safe sex, and healthcare access.</p>
        <a href="php/learn.php" class="btn warm">Start Learning</a>
    </div>
    <div class="cta-card">
        <img src="assets/support.svg" alt="Support Icon">
        <h3>Get Support</h3>
        <p>Connect with trained professionals and organizations that provide counseling, testing, and treatment support.</p>
        <a href="php/contact.php" class="btn warm">Get Support</a>
    </div>
    <div class="cta-card">
        <img src="assets/people-hugging.svg" alt="Membership Icon">
        <h3>Join</h3>
        <p>Subscribe to membership plans that give you tools and essentials for practicing safer sex.</p>
        <a href="php/services.php" class="btn warm">Join Now</a>
    </div>
</section>

    <section class="cta">
        <h2>Take Charge of Your Health Today!</h2>
         <div class="cta-content">
            <div class="cta-text">
            <h3>Become a Member</h3>
            <p>Celebrate love in all its forms while taking care of yourself. <strong>Join our membership</strong> to access <strong>HIV health centers</strong>, 
                connect with a supportive <strong>community</strong>, and enjoy exclusive <strong>health kits and products</strong>. Stay protected, stay informed, 
                and <strong>take control today!</strong>
            </p>
            <a href="php/services.php" class="btn warm">Join now</a>
            </div> 
             <img src="assets/man_lgbt.png" alt="blood Icon">
        </div>
        
       
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <p class="footer-logo">Gabriella</p>

            <nav class="footer-nav">
                <a href="index.php" class="gradient-underline">Home</a>
                <a href="php/about.php" class="active">About</a>
                <a href="php/services.php" class="gradient-underline">Membership</a>
                <a href="php/learn.php" class="gradient-underline">Learn</a>
                <a href="php/contact.php" class="gradient-underline">Contact</a>
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
        <form class="auth-form" id="loginForm" action="php/login.php" method="POST">
            <h2>Log In</h2>
            <label>Email</label>
            <input type="email" name="email" required>

            <label>Password</label>
            <input type="password" name="password" required>

            <button type="submit" class="btn auth-btn">Log In</button>
        </form>

        <!-- REGISTRATION FORM -->
        <form class="auth-form hidden" id="registerForm" action="php/register.php" method="POST">
            <h2>Create Account</h2>

            <label>Username</label>
            <input type="text" name="username" required>

            <label>First Name</label>
            <input type="text" name="firstname" required>

            <label>Last Name</label>
            <input type="text" name="lastname" required>

            <label>Birthday</label>
            <input type="date" name="birthday" required>

            <label>Email Address</label>
            <input type="email" name="email" required>

            <label>Password</label>
            <input type="password" name="password" required>

            <h3>Address</h3>

            <label>Street</label>
            <input type="text" name="street">

            <label>Barangay</label>
            <input type="text" name="barangay">

            <label>City</label>
            <input type="text" name="city">

            <label>Postal Code</label>
            <input type="text" name="postalcode">

            <button type="submit" class="btn auth-btn">Register</button>
        </form>

    </div>
</div>

<script src="js/ctaphp.js"></script>
<script src="js/nav.js"></script>

</body>
</html>
