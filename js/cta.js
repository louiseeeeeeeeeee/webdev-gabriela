
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

// 3. AUTH STATE MANAGEMENT

// Simple localStorage-based auth state. It checks the browser storage for an item called 'auth_user'.
// If found, it assumes the user is logged in and displays their name in a dropdown menu.
// If not found, it shows the login button.
function getStoredUser() {
    try { return JSON.parse(localStorage.getItem('auth_user')); }
    catch { return null; }
}

// Store user object in localStorage
function setStoredUser(user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
}
// Clear stored user (logout)
function clearStoredUser() {
    localStorage.removeItem('auth_user');
}



// this is a function where it Updates login button to user dropdown if logged in
function updateAuthButton() {
    loginBtn = document.querySelector(loginBtnSelector);
    const existingDropdown = document.querySelector('.user-dropdown'); //will change css design for logged user state
    const user = getStoredUser();

    //if logged out, restore login button
    if (!user) {
        // Restore original login button if logged out
        if (existingDropdown) {
            const parent = existingDropdown.parentNode;
            existingDropdown.remove();
            if (parent && !parent.querySelector(loginBtnSelector)) {
                const btn = document.createElement('button');
                btn.className = 'login btn';
                btn.textContent = 'Login';
                btn.addEventListener('click', () => authOverlay.style.display = 'flex');
                parent.appendChild(btn);
            }
        }
        return;
    }

    // Update name if dropdown exists
    if (existingDropdown) {
        const nameEl = existingDropdown.querySelector('.user-btn');
        if (nameEl) nameEl.textContent = user.name || user.username || 'User';
        return;
    }

    // Create dropdown
    const container = document.createElement('div');
    container.className = 'user-dropdown';
    container.style.position = 'relative';
    container.style.display = 'inline-block';

    const btn = document.createElement('button');
    btn.className = 'user-btn btn';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = user.name || user.username || 'User';

    const menu = document.createElement('div'); //creating a new <div> element in the DOM using JavaScript.
    menu.className = 'user-menu';
    menu.style.display = 'none';
    menu.innerHTML = `
        <a href="/profile.html" class="profile-link">Visit profile</a>
        <button type="button" class="logout-btn">Logout</button>
    `; // this will write in the html file "Visit profile" and "Logout" buttons

    // Toggle dropdown
    //This prevents the click event from ALSO triggering the “close the dropdown” listener in the document click event.
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        menu.style.display = expanded ? 'none' : 'block';
    });

    // Logout
    // It removes user data from localStorage, hides the dropdown, and reloads the page to reflect the logged-out state.    
    menu.querySelector('.logout-btn').addEventListener('click', () => {
        clearStoredUser();
        authOverlay.style.display = 'none';
        location.reload();
    });

    // Close menu on outside click
    document.addEventListener('click', (ev) => {
        if (!container.contains(ev.target)) {
            btn.setAttribute('aria-expanded', 'false');
            menu.style.display = 'none';
        }
    });

    //This is the new container for the user dropdown menu. inattach inside the container the button and the menu
    container.appendChild(btn);
    container.appendChild(menu);

    //Replace the old “Login” button with the new dropdown
    if (loginBtn && loginBtn.parentNode) loginBtn.parentNode.replaceChild(container, loginBtn);
    else document.querySelector('.header-inner')?.appendChild(container);
}

// Initialize auth UI
updateAuthButton();

// 4. FORM SUBMISSION
//Extract the name to display from the form inputs
function extractDisplayNameFrom(form) {
    const candidates = form.querySelectorAll('input[name], input[id]');
    for (const input of candidates) {
        const nameAttr = (input.name || input.id || '').toLowerCase();
        if (['name','fullname','displayname','username'].some(k => nameAttr.includes(k)) && input.value.trim()) return input.value.trim();
    }
    const email = form.querySelector('input[type="email"]');
    if (email && email.value) return email.value.split('@')[0];
    for (const input of candidates) if (input.value && input.value.trim()) return input.value.trim();
    return 'User';
}

// Handle login form submission.It prevents the default form submission behavior,\
//  stores the user data in localStorage, hides the auth overlay, and updates the login button to reflect the logged-in state.
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    setStoredUser({ name: extractDisplayNameFrom(loginForm) });
    authOverlay.style.display = 'none';
    updateAuthButton();
});

// Handle register form submission. It does the same as the login form but for registration.
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    setStoredUser({ name: extractDisplayNameFrom(registerForm) });
    authOverlay.style.display = 'none';
    updateAuthButton();
});


// AUTO-OPEN LOGIN WHEN ?showLogin=true
// this is for membership page where it auto opens the login overlay when the url has ?showLogin=true
//  or when the user doesn't have an account yet and clicks the membership button
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("showLogin") === "true") {
        document.getElementById("authOverlay").style.display = "flex";
    }
});



