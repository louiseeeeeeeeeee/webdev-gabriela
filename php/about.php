<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Gabriella Healthcare</title>
    <link rel="stylesheet" href="../css/about.css">
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

    <!-- Hero / Banner -->
    <section class="about-hero">
        <div class="about-hero-content">
            <h1>About Gabriella Healthcare</h1>
            <p>Gabriella Reproductive Health draws inspiration from the GABRIELA organization in the Philippines. 
                Building on their advocacy for women’s rights and welfare, we extend this mission to 
                all Filipino youth, providing accessible, accurate, and stigma-free sexual health education.</p>
        </div>
        </div>
    </section>

    <!-- MISSION (Hover Zoom + Image Slide Animation) -->
    <section class="mission-section">
        <div class="mission-content">
            <h2>Our Mission</h2>
            <p>
                The mission of the project is to educate young Filipinos by promoting awareness and prevention regarding reproductive health. 
                It also aims to reduce discrimination surrounding the topic and to provide accessible 
                information about various reproductive health products.
            </p>
        </div>

        <div class="mission-image">
            <img src="../assets/Banana_nobg.png" alt="Mission Image">
        </div>
    </section>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const mission = document.querySelector('.mission-section');
            const vision = document.querySelector('.vision-section');

            // Mission hover
            mission.addEventListener('mouseenter', () => {
                mission.classList.add('hovered');
            });
            mission.addEventListener('mouseleave', () => {
                mission.classList.remove('hovered');
            });

         // Vision hover
            vision.addEventListener('mouseenter', () => {
                vision.classList.add('hovered');
            });
            vision.addEventListener('mouseleave', () => {
                vision.classList.remove('hovered');
            });
        });
    </script>


    <!-- VISION (Hover Zoom + Image Slide Animation) -->
    <section class="vision-section">
        <div class="vision-image">
            <img src="../assets/vision.jpg" alt="Vision Image">
        </div>

        <div class="vision-content">
            <h2>Our Vision</h2>
            <p>
             To completely eradicate the stigma in HIV patients and to create a future for young Filipinos
             where no one suffers in silence, and where compassion, education, 
             and healthcare are within reach of everyone in need.
            </p>
        </div>
    </section>


    <!-- OUR VALUES -->
    <section class="section">
        <div class="container values">
            <h2>Our Values</h2>

            <div class="value-grid">
                <div class="value-card">Empowerment</div>
                <div class="value-card">Inclusivity</div>
                <div class="value-card">Safety</div>
                <div class="value-card">Confidentiality</div>
                <div class="value-card">Accessibility</div>
                <div class="value-card">Accuracy</div>
            </div>
        </div>
    </section>


    <!-- MEET THE TEAM -->
    <section class="section alt">
        <div class="container team">
            <h2>Meet the Team</h2>

            <div class="team-grid">

                <div class="team-card">
                    <div class="avatar" style="background-image: url('../assets/Racy.jpg');"></div>
                    <h3>Racy Ledres</h3>
                    <p>Project Manager</p>
                    <p>Researcher</p>
                    <p>Designer</p>
                    <p>Developer</p>
                </div>

                <div class="team-card">
                    <div class="avatar" style="background-image: url('../assets/Lex.png');"></div>
                    <h3>Alexis Arcenal</h3>
                    <p>Developer</p>
                    <p>Content writer</p>
                    <p>Designer</p>
                </div>

                <div class="team-card">
                    <div class="avatar" style="background-image: url('../assets/Andrea.jpg');"></div>
                    <h3>Andrea Concepcion</h3>
                    <p>Developer</p>
                    <p>Designer</p>
                    <p>Content Writer</p>
                    <p>Researcher</p>
                </div>

            </div>
        </div>
    </section>

    <!-- Credibility / Partners Section -->
    <section class="credibility-section">
        <div class="credibility-container">
            <h2>Trusted By</h2>
            <p>We work closely with organizations dedicated to women's health, education, and empowerment.</p>

            <div class="credibility-logos">
                <div class="credibility-card">Partnered with NGOs</div>
                <div class="credibility-card">Collaboration with Health Experts</div>
                <div class="credibility-card">Community Education Programs</div>
                <div class="credibility-card">Verified Medical Information</div>
            </div>
        </div>
    </section>

        <!-- Contact CTA (New Redesign) -->
    <section class="questions-section">
    
        <!-- Floating river of question marks -->
        <div class="floating-icons">
            <span>?</span><span>?</span><span>?</span><span>?</span><span>?</span>
            <span>?</span><span>?</span><span>?</span><span>?</span><span>?</span>
            <span>?</span><span>?</span><span>?</span><span>?</span><span>?</span>
        </div>

        <!-- NEW hero-like container box -->
        <div class="questions-box">
            <div class="questions-content">
                <h2>Have Questions?</h2>
                <p>We’re here for you!</p>
                <p>We’re here to guide you with accurate, empowering, and judgment-free information.</p>
                <a href="contact.html" class="contact-btn">Contact Us</a>
            </div>
        </div>

    </section>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const animatedElements = document.querySelectorAll(".fade-up");

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            }, { threshold: 0.2 });

            animatedElements.forEach(el => observer.observe(el));
        });
    </script>


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

    <!-- Mission Hover Script -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const mission = document.querySelector('.mission-section');

            mission.addEventListener('mouseenter', () => {
                mission.classList.add('hovered');
            });

            mission.addEventListener('mouseleave', () => {
                mission.classList.remove('hovered');
            });
        });
    </script>

    <script src="../js/ctaphp.js"></script>
    <script src="../js/nav.js"></script>

</body>
</html>

