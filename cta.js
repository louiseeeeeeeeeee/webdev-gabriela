// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.cta-content');
    if (!targets.length) return;

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
});

// This is for Login/Register overlay functionality
const loginBtnSelector = ".login";
let loginBtn = document.querySelector(loginBtnSelector);
const overlay = document.getElementById("authOverlay");
const closeBtn = document.getElementById("closeAuth");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Open overlay
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
    });
}

// Close overlay
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });
}

// Switch to Register
if (registerTab) {
    registerTab.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        loginTab.classList.remove("active");
        registerTab.classList.add("active");
    });
}

// Switch to Login
if (loginTab) {
    loginTab.addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        registerTab.classList.remove("active");
        loginTab.classList.add("active");
    });
}

// ----------------------
// AUTH STATE & UI
// ----------------------
function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem('auth_user'));
    } catch (e) {
        return null;
    }
}
function setStoredUser(user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
}
function clearStoredUser() {
    localStorage.removeItem('auth_user');
}

// create user dropdown and replace the .login button
function updateAuthButton() {
    // re-query in case DOM changed
    loginBtn = document.querySelector(loginBtnSelector);
    const existingDropdown = document.querySelector('.user-dropdown');

    const user = getStoredUser();
    // if already replaced and logged out -> restore original login button (simple approach: reload)
    if (!user) {
        if (existingDropdown) {
            // restore a simple login button if desired (safe fallback reload)
            // location.reload();
            // Keep it simple: show original login button if present in DOM template
            const headerRight = existingDropdown.parentNode;
            existingDropdown.remove();
            // try re-create a .login button if headerRight exists
            if (headerRight && !headerRight.querySelector(loginBtnSelector)) {
                const btn = document.createElement('button');
                btn.className = 'login btn';
                btn.textContent = 'Login';
                btn.addEventListener('click', () => overlay.style.display = 'flex');
                headerRight.appendChild(btn);
            }
        }
        return;
    }

    // if dropdown already present, just update name
    if (existingDropdown) {
        const nameEl = existingDropdown.querySelector('.user-btn');
        if (nameEl) nameEl.textContent = user.name || user.username || 'User';
        return;
    }

    // replace login button with dropdown
    const container = document.createElement('div');
    container.className = 'user-dropdown';
    container.style.position = 'relative';
    container.style.display = 'inline-block';

    const btn = document.createElement('button');
    btn.className = 'user-btn btn';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = user.name || user.username || 'User';

    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.style.display = 'none';
    menu.innerHTML = `
        <a href="/profile.html" class="profile-link">Visit profile</a>
        <button type="button" class="logout-btn">Logout</button>
    `;

    // toggle menu
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        menu.style.display = expanded ? 'none' : 'block';
    });

    // logout handler
    menu.querySelector('.logout-btn').addEventListener('click', () => {
        clearStoredUser();
        overlay.style.display = 'none';
        // hide dropdown and restore login button (or reload to get original header)
        // simple approach: reload so header markup reverts to original template
        location.reload();
    });

    // profile click: navigate (if you have a route)
    menu.querySelector('.profile-link').addEventListener('click', (e) => {
        // if you have a SPA route, handle it here. otherwise allow normal navigation.
        // e.preventDefault();
        // window.location.href = '/profile.html';
    });

    // close menu when clicking outside
    document.addEventListener('click', (ev) => {
        if (!container.contains(ev.target)) {
            btn.setAttribute('aria-expanded', 'false');
            menu.style.display = 'none';
        }
    });

    container.appendChild(btn);
    container.appendChild(menu);

    if (loginBtn && loginBtn.parentNode) {
        loginBtn.parentNode.replaceChild(container, loginBtn);
    } else {
        // fallback: append to header (try to find header-inner)
        const headerInner = document.querySelector('.header-inner');
        if (headerInner) headerInner.appendChild(container);
    }
}

// try to initialize UI on load
updateAuthButton();

// ----------------------
// FORM SUBMISSION (simulate success)
// ----------------------
// Utility: pick a display name from the form (works whether input is name/username/email)
function extractDisplayNameFrom(form) {
    const candidates = form.querySelectorAll('input[name], input[id]');
    for (const input of candidates) {
        const nameAttr = (input.name || input.id || '').toLowerCase();
        if (['name','fullname','displayname','username'].some(k => nameAttr.includes(k)) && input.value.trim()) return input.value.trim();
    }
    // fallback to email prefix
    const email = form.querySelector('input[type="email"]');
    if (email && email.value) {
        return email.value.split('@')[0];
    }
    // last resort: any non-empty input
    for (const input of candidates) {
        if (input.value && input.value.trim()) return input.value.trim();
    }
    return 'User';
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In real app: verify with server, then store token/user from response
        const displayName = extractDisplayNameFrom(loginForm);
        setStoredUser({ name: displayName });
        overlay.style.display = 'none';
        updateAuthButton();
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In real app: send register request, then on success store user
        const displayName = extractDisplayNameFrom(registerForm);
        setStoredUser({ name: displayName });
        overlay.style.display = 'none';
        updateAuthButton();
    });
}
