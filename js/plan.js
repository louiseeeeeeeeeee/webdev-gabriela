document.addEventListener('DOMContentLoaded', () => {
    const membershipOverlay = document.getElementById("membershipOverlay");
    const membershipForm = document.getElementById("membershipForm");
    const selectedPlan = document.getElementById("selectedPlan");
    const selectedPrice = document.getElementById("selectedPrice");
    const paymentMethod = document.getElementById("paymentMethod");
    const paymentDetail = document.getElementById("paymentDetail");

    // Show paymentDetail input only when "method" is selected
    paymentMethod.addEventListener("change", () => {
        const method = paymentMethod.value;
        if (!method) {
            paymentDetail.style.display = "none";
            paymentDetail.value = "";
            paymentDetail.required = false;
            return;
        }
        paymentDetail.style.display = "block";
        paymentDetail.required = true;

        switch(method) {
            case "paypal": paymentDetail.placeholder = "Enter PayPal email"; break;
            case "gcash": paymentDetail.placeholder = "Enter Gcash number"; break;
            case "Maya": paymentDetail.placeholder = "Enter Maya number"; break;
            default: paymentDetail.placeholder = "Enter payment info";
        }
    });

    // show overlay with plan + price
const planButtons = document.querySelectorAll(".plan-card button");
planButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".plan-card");
        const planName = card.querySelector("h2").textContent;
        const planPrice = card.querySelector(".price").textContent;

        selectedPlan.textContent = planName;
        selectedPrice.textContent = ` (${planPrice})`; // show price next to plan name
        membershipOverlay.style.display = "flex";
    });
});


    // Form submission
    membershipForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = membershipForm.fullName.value.trim();
        const email = membershipForm.email.value.trim();
        const plan = selectedPlan.textContent.trim();
        const price = selectedPrice.textContent.trim();
        const payment = paymentMethod.value;
        const paymentInfo = paymentDetail.value.trim();

        if (!paymentInfo) {
            alert("Please provide your payment details.");
            return;
        }

        alert(
            `Thank you, ${name}!\n` +
            `We will contact you at ${email}.\n` +
            `Plan: ${plan} ${price}\n` +
            `Payment Method: ${payment}\n` +
            `Payment Info: ${paymentInfo}`
        );

        membershipOverlay.style.display = "none";
        membershipForm.reset();
        paymentDetail.style.display = "none";
        paymentDetail.required = false;
    });
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
