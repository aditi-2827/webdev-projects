document.addEventListener("DOMContentLoaded", () => {
    const navBar = document.querySelector("#navBar");
    const navLinks = document.querySelectorAll("#navBar a[href^='#']");
    const sections = document.querySelectorAll("section[id]");
    const orderButton = document.querySelector("#home .btn");
    const submitButton = document.querySelector(".button");

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                const offset = navBar.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight active nav link on scroll
    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                navLinks.forEach(l => l.classList.remove("active"));
                const activeLink = document.querySelector(
                    `#navBar a[href="#${section.id}"]`
                );
                if (activeLink) activeLink.classList.add("active");
            }
        });
    });

    // Scroll to services on "Order Now"
    if (orderButton) {
        orderButton.addEventListener("click", () => {
            const target = document.querySelector("#services-container");
            if (target) {
                const offset = navBar.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: "smooth"
                });
            }
        });
    }

    // Contact form validation + fake submit
    if (submitButton) {
        submitButton.addEventListener("click", e => {
            e.preventDefault();
            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const phone = document.querySelector("#phone").value.trim();
            const msg = document.querySelector("#msg").value.trim();

            if (!name || !email || !phone || !msg)
                return showNotification("⚠️ Please fill all fields.", "error");
            if (!validateEmail(email))
                return showNotification("⚠️ Invalid email address.", "error");
            if (!validatePhone(phone))
                return showNotification("⚠️ Invalid phone number.", "error");

            submitButton.innerHTML = "Sending...";
            submitButton.disabled = true;

            setTimeout(() => {
                showNotification(`✅ Thank you, ${name}! Message submitted.`, "success");
                document.querySelector("form").reset();
                submitButton.innerHTML = "Submit";
                submitButton.disabled = false;
            }, 1500);
        });
    }
});

// Helpers
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

function validatePhone(phone) {
    return phone.replace(/\D/g, "").length >= 10;
}

function showNotification(message, type) {
    let notification = document.querySelector(".notification");
    if (!notification) {
        notification = document.createElement("div");
        notification.className = "notification";
        document.body.appendChild(notification);

        const style = document.createElement("style");
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-family: sans-serif;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s, transform 0.3s;
            }
            .notification.success { background-color: #4CAF50; }
            .notification.error { background-color: #f44336; }
            .notification.show { opacity: 1; transform: translateY(0); }
        `;
        document.head.appendChild(style);
    }

    notification.textContent = message;
    notification.className = `notification ${type}`;
    setTimeout(() => notification.classList.add("show"), 10);
    setTimeout(() => notification.classList.remove("show"), 3000);
}
