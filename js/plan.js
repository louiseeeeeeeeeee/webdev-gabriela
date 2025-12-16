document.addEventListener("DOMContentLoaded", () => {
    const membershipOverlay = document.getElementById("membershipOverlay");
    const membershipForm = document.getElementById("membershipForm");
    const closeMembership = document.getElementById("closeMembership");

    const selectedPlan = document.getElementById("selectedPlan");
    const selectedPrice = document.getElementById("selectedPrice");

    const paymentMethod = document.getElementById("paymentMethod");
    const paymentDetail = document.getElementById("paymentDetail");

    if (!membershipOverlay || !membershipForm) return;

    let currentPlan = "";
    let currentPrice = "";

    // =========================
    // OPEN OVERLAY (PLAN SELECT)
    // =========================
    document.querySelectorAll(".plan-card button").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".plan-card");

            currentPlan = card.querySelector("h2").textContent.trim();
            currentPrice = card.querySelector(".price").textContent.trim();

            selectedPlan.textContent = currentPlan;
            selectedPrice.textContent = ` (${currentPrice})`;

            membershipOverlay.style.display = "flex";
        });
    });

    // =========================
    // CLOSE OVERLAY
    // =========================
    closeMembership.addEventListener("click", () => {
        membershipOverlay.style.display = "none";
    });

    membershipOverlay.addEventListener("click", (e) => {
        if (e.target === membershipOverlay) {
            membershipOverlay.style.display = "none";
        }
    });

    // =========================
    // PAYMENT METHOD HANDLING
    // =========================
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

        switch (method) {
            case "paypal":
                paymentDetail.placeholder = "Enter PayPal email";
                break;
            case "gcash":
                paymentDetail.placeholder = "Enter GCash number";
                break;
            case "Maya":
                paymentDetail.placeholder = "Enter Maya number";
                break;
            default:
                paymentDetail.placeholder = "Enter payment info";
        }
    });

    // =========================
    // SUBMIT (JS ONLY)
    // =========================
    membershipForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!paymentDetail.value.trim()) {
            alert("Please provide your payment details.");
            return;
        }

        const membershipData = {
            plan: currentPlan,
            price: currentPrice,
            paymentMethod: paymentMethod.value,
            paymentDetail: paymentDetail.value.trim(),
            subscribedAt: new Date().toISOString()
        };

        localStorage.setItem("membership", JSON.stringify(membershipData));

       // Show success overlay instead of alert
    const overlay = document.createElement("div");
    overlay.className = "success-msg-overlay";
    overlay.innerHTML = `
        <div class="success-icon">✔</div>
        <div class="success-text">
            Membership subscribed successfully!
        </div>
        <button id="closeSuccess">&times;</button>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector("#closeSuccess");
    closeBtn.addEventListener("click", () => {
        overlay.classList.add("fade-out");
        setTimeout(() => overlay.remove(), 500);
    });

    setTimeout(() => {
        overlay.classList.add("fade-out");
        setTimeout(() => overlay.remove(), 500);
    }, 5000);

        // Reset UI
        membershipForm.reset();
        paymentDetail.style.display = "none";
        paymentDetail.required = false;
        membershipOverlay.style.display = "none";
    });
}); 

