const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    
    e.preventDefault();
    status.textContent = "Sending...";

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.textContent = "✅ Message sent successfully! We'll get back to you soon.";
            form.reset();
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                status.textContent = result.errors.map(error => error.message).join(", ");
            } else {
                status.textContent = "⚠️ Oops! Something went wrong. Please try again later.";
            }
        }
    } catch (error) {
        status.textContent = "⚠️ Connection error. Please check your internet and try again.";
    }
});