// =======================
// 1. DOM CONTENT LOADED
// =======================
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

// =======================
// 2. LOGIN / REGISTER OVERLAY
// =======================
const loginBtnSelector = ".login";
let loginBtn = document.querySelector(loginBtnSelector);
const authOverlay = document.getElementById("authOverlay");
const closeAuth = document.getElementById("closeAuth");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Open overlay
loginBtn?.addEventListener("click", () => authOverlay.style.display = "flex");

// Close overlay
closeAuth?.addEventListener("click", () => authOverlay.style.display = "none");

// Switch tabs
registerTab?.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
});

loginTab?.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    registerTab.classList.remove("active");
    loginTab.classList.add("active");
});

// =======================
// 3. AUTH STATE MANAGEMENT
// =======================
function getStoredUser() {
    try { return JSON.parse(localStorage.getItem('auth_user')); }
    catch { return null; }
}

function setStoredUser(user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
}

function clearStoredUser() {
    localStorage.removeItem('auth_user');
}

// Update login button to user dropdown if logged in
function updateAuthButton() {
    loginBtn = document.querySelector(loginBtnSelector);
    const existingDropdown = document.querySelector('.user-dropdown');
    const user = getStoredUser();

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

    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.style.display = 'none';
    menu.innerHTML = `
        <a href="/profile.html" class="profile-link">Visit profile</a>
        <button type="button" class="logout-btn">Logout</button>
    `;

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        menu.style.display = expanded ? 'none' : 'block';
    });

    // Logout
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

    container.appendChild(btn);
    container.appendChild(menu);

    if (loginBtn && loginBtn.parentNode) loginBtn.parentNode.replaceChild(container, loginBtn);
    else document.querySelector('.header-inner')?.appendChild(container);
}

// Initialize auth UI
updateAuthButton();

// =======================
// 4. FORM SUBMISSION
// =======================
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

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    setStoredUser({ name: extractDisplayNameFrom(loginForm) });
    authOverlay.style.display = 'none';
    updateAuthButton();
});

registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    setStoredUser({ name: extractDisplayNameFrom(registerForm) });
    authOverlay.style.display = 'none';
    updateAuthButton();
});
// Membership Popup Functionality
const planButtons = document.querySelectorAll(".plan-card button");
const membershipOverlay = document.getElementById("membershipOverlay");
const closeMembership = document.getElementById("closeMembership");
const selectedPlanEl = document.getElementById("selectedPlan");

planButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const planName = btn.closest(".plan-card").querySelector("h2").textContent;
        selectedPlanEl.textContent = planName;
        membershipOverlay.style.display = "flex";
    });
});

// Close overlay
closeMembership.addEventListener("click", () => {
    membershipOverlay.style.display = "none";
});

// Close overlay if clicked outside the content
membershipOverlay.addEventListener("click", (e) => {
    if (e.target === membershipOverlay) {
        membershipOverlay.style.display = "none";
    }
});

const paymentMethod = document.getElementById("paymentMethod");
    const paymentDetail = document.getElementById("paymentDetail");

    paymentMethod.addEventListener("change", () => {
        const method = paymentMethod.value;

        if (!method) {
            paymentDetail.style.display = "none";
            paymentDetail.value = "";
            paymentDetail.placeholder = "";
            return;
        }

        paymentDetail.style.display = "block";

        switch(method) {
            case "creditCard":
                paymentDetail.placeholder = "Enter credit card number";
                break;
            case "paypal":
                paymentDetail.placeholder = "Enter PayPal email";
                break;
            case "gcash":
                paymentDetail.placeholder = "Enter Gcash number";
                break;
            case "bankTransfer":
                paymentDetail.placeholder = "Enter bank account number";
                break;
            default:
                paymentDetail.placeholder = "Enter payment info";
        }
    });
// Form submission (just simulate success)
document.getElementById("membershipForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.fullName.value;
    const email = e.target.email.value;
    const plan = document.getElementById("selectedPlan").textContent;
    const payment = e.target.paymentMethod.value;

    if (!payment) {
        alert("Please select a payment method.");
        return;
    }

    alert(`Thank you, ${name}! We will contact you at ${email}.\nPlan: ${plan}\nPayment Method: ${payment}.`);
    membershipOverlay.style.display = "none";
    e.target.reset();
});

