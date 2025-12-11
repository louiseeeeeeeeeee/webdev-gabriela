// Para sa Membership Overlay / Popup effect: 
// handles membership plans (namee + price), pag-select ng plan, pag-input ng payment info, at form submission.

document.addEventListener('DOMContentLoaded', () => {
    const membershipOverlay = document.getElementById("membershipOverlay"); // buong overlay
    const membershipForm = document.getElementById("membershipForm");       // form sa overlay
    const selectedPlan = document.getElementById("selectedPlan");           // placeholder para sa plan name
    const selectedPrice = document.getElementById("selectedPrice");         // placeholder para sa plan price
    const paymentMethod = document.getElementById("paymentMethod");         // select dropdown
    const paymentDetail = document.getElementById("paymentDetail");         // input para sa payment info

    // Show paymentDetail input only kapag may napiling payment method
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

    // Show overlay kapag pinindot ang plan button, at i-display ang plan + price
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

    // Form submission handling
    membershipForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = membershipForm.fullName.value.trim();
        const email = membershipForm.email.value.trim();
        const plan = selectedPlan.textContent.trim();
        const price = selectedPrice.textContent.trim();
        const payment = paymentMethod.value;
        const paymentInfo = paymentDetail.value.trim();

        if (!paymentInfo) {
            alert("Please provide your payment details."); // kailangan may payment info
            return;
        }

        alert(
            `Thank you, ${name}!\n` +
            `We will contact you at ${email}.\n` +
            `Plan: ${plan} ${price}\n` +
            `Payment Method: ${payment}\n`
        );

        membershipOverlay.style.display = "none";
        membershipForm.reset();
        paymentDetail.style.display = "none";
        paymentDetail.required = false;
    });
});

// Additional functionality for closing overlay
const closeMembership = document.getElementById("closeMembership");

closeMembership.addEventListener("click", () => {
    membershipOverlay.style.display = "none"; // click X to close
});

membershipOverlay.addEventListener("click", (e) => {
    if (e.target === membershipOverlay) {
        membershipOverlay.style.display = "none"; // click outside content to close
    }
});
