window.addEventListener('DOMContentLoaded', () => {
    // Set up hooks for sending contact form.
    let contactForm = document.getElementById('enterprise-contact-form');
    let contactFieldset = document.getElementById('enterprise-contact-fieldset');
    let submitButton = document.getElementById('contact-submit-btn');
    let submitError = document.getElementById('submit-error');
    let submitSuccess = document.getElementById('submit-success');

    // Bind handleSubmit() to submit handler.
    contactForm.addEventListener('submit', handleSubmit);

    // Presentation helpers.
    function enableForm() {
        contactFieldset.removeAttribute('disabled');
        submitButton.textContent = 'Send';
    }

    function disableForm() {
        contactFieldset.setAttribute('disabled', 'disabled');
        submitButton.textContent = 'Sending...';
    }

    function showError() {
        submitError.classList.remove('d-none');
    }

    function hideError() {
        submitError.classList.add('d-none');
    }

    function showSuccess() {
        submitSuccess.classList.remove('d-none');
        contactFieldset.classList.add('d-none'); // hide input fields
    }

    // Form submit handler.
    function handleSubmit(token) {
        let endpoint = 'https://account.normalvr.com/api/enterprise-contact';
        let payload = {};

        // If we're passed an event handler, we're not using reCAPTCHA & it's our submit event,
        // so be sure to prevent defaults.
        if (typeof token !== "string") {
            token.preventDefault();
        }

        // Loop through elements in the form & serialize the values into `payload.[name]`.
        Object.values(contactForm.elements).forEach(el => {
            if (!el.name) return; // Skip any data without an explicit name.
            if (!el.value) return; // Skip any data without an explicit value.

            payload[el.name] = el.value;
        });

        // Make sure we add the reCAPTCHA token to the payload, if one is given.
        if (typeof token === "string") {
            payload['recaptcha_token'] = token;
        }

        // Finally, we're good to submit - let's disable the form, hide any previous errors, and send it off.
        disableForm();
        hideError();

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(res => res.json()).then(r => {
            if (r.error) throw new Error(r.error); // if payload contains an error, something broke
            showSuccess(); // otherwise we good
        }).catch(e => {
            console.error("Error occured submitting:", e);
            enableForm();
            showError();
        });
    }
}); 