document.addEventListener('DOMContentLoaded', () => {
    const membershipOverlay = document.getElementById("membershipOverlay");
    const paymentMethod = document.getElementById("paymentMethod");
    const paymentDetail = document.getElementById("paymentDetail");
    const formPlan = document.getElementById("formPlan");
    const formPrice = document.getElementById("formPrice");
    const closeMembership = document.getElementById("closeMembership");

    // Open overlay when a plan button is clicked
    document.querySelectorAll(".plan-card button").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".plan-card");
            const planName = card.querySelector("h2").textContent;
            const planPrice = card.querySelector(".price").textContent.replace(/[^\d]/g,'');

            formPlan.value = planName;
            formPrice.value = planPrice;

            document.getElementById("selectedPlan").textContent = planName;
            document.getElementById("selectedPrice").textContent = ` (${planPrice})`;

            membershipOverlay.style.display = "flex";
        });
    });

    // Close overlay
    closeMembership.addEventListener("click", () => membershipOverlay.style.display = "none");
    membershipOverlay.addEventListener("click", e => {
        if (e.target === membershipOverlay) membershipOverlay.style.display = "none";
    });

    // Show/hide payment detail input
    paymentMethod.addEventListener("change", () => {
        if (!paymentMethod.value) {
            paymentDetail.style.display = "none";
            paymentDetail.required = false;
            paymentDetail.value = "";
            return;
        }
        paymentDetail.style.display = "block";
        paymentDetail.required = true;
        paymentDetail.placeholder =
            paymentMethod.value === "paypal" ? "Enter PayPal email" :
            paymentMethod.value === "gcash" ? "Enter Gcash number" :
            paymentMethod.value === "Maya" ? "Enter Maya number" :
            "Enter payment info";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeSuccess');
    const overlay = document.querySelector('.success-msg-overlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 500);
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 500);
        }, 5000);
    }
});

