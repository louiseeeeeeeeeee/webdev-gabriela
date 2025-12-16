
// 1. DOM CONTENT LOADED
// This will hover the image animation when in view in home page cta section
document.addEventListener('DOMContentLoaded', () => {
    // IntersectionObserver for any .cta-content animations
    const targets = document.querySelectorAll('.cta-content');
    if (targets.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -10% 0px'
        });

        targets.forEach(t => io.observe(t));
    }
});

// 2. LOGIN / REGISTER OVERLAY
// this finds elements related to login/register functionality from the index.html
const loginBtnSelector = ".login";
let loginBtn = document.querySelector(loginBtnSelector);
const authOverlay = document.getElementById("authOverlay");
const closeAuth = document.getElementById("closeAuth");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Open overlay
//The ?. means “only do this if loginBtn exists. When the button is clicked, it shows the auth overlay.
loginBtn?.addEventListener("click", () => authOverlay.style.display = "flex");

// Close overlay
// When the X button is clicked, it hides the auth overlay.
closeAuth?.addEventListener("click", () => authOverlay.style.display = "none");

// Switch tabs
//When you switch to Register: Hide login form, Show register form, Highlight the correct tab
registerTab?.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
});

//Same but for Login tab
loginTab?.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    registerTab.classList.remove("active");
    loginTab.classList.add("active");
});

// AUTO-OPEN LOGIN WHEN ?showLogin=true
// this is for membership page where it auto opens the login overlay when the url has ?showLogin=true
//  or when the user doesn't have an account yet and clicks the membership button
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("showLogin") === "true") {
        document.getElementById("authOverlay").style.display = "flex";
        document.getElementById("loginTab").click();
    } else if (params.get("showRegister") === "true") {
        document.getElementById("authOverlay").style.display = "flex";
        document.getElementById("registerTab").click();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const userBtn = document.querySelector('.user-btn');
    const userMenu = document.querySelector('.user-menu');

    if(userBtn && userMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = userBtn.getAttribute('aria-expanded') === 'true';
            userBtn.setAttribute('aria-expanded', String(!expanded));
            userMenu.style.display = expanded ? 'none' : 'block';
        });

        // Close dropdown on outside click
        document.addEventListener('click', (ev) => {
            if (!userBtn.parentElement.contains(ev.target)) {
                userBtn.setAttribute('aria-expanded', 'false');
                userMenu.style.display = 'none';
            }
        });
    }
});
