// nav-active.js
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav a");

    // Click: set active
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Auto-activate based on current page URL
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});
