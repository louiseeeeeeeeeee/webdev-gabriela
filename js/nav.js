// Para sa navigation bar: nagse-set ng "active" class sa link na current page o kung na-click, para ma-highlight kung saan ang user sa site
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav a"); // kunin lahat ng nav links

    // Kapag na-click ang link → i-set as active
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(l => l.classList.remove("active")); // tanggalin ang active sa lahat
            this.classList.add("active"); // lagyan ng active yung na-click
        });
    });

    // Auto-set active base sa current page URL
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active"); // kung match ang URL, automatic maging active
        }
    });
});
