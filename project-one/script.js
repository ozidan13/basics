// المشروع الأول متعمد يكون JavaScript فيه بسيط جداً.

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const nameInput = document.querySelector("#name");
        const visitorName = nameInput.value.trim();

        formStatus.textContent = `شكراً يا ${visitorName}! الرسالة التجريبية اتسجلت بنجاح.`;
        contactForm.reset();
        nameInput.focus();
    });
}
