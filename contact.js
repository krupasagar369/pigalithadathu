// Contact Form Submission to WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.char-count');

    // ✅ Allow only digits and limit to 10 numbers
    phoneInput.addEventListener('input', function(e) {
        // Remove all non-digit characters
        let value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        e.target.value = value;
    });

    // ✅ Character counter for message
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = `${currentLength}/500 characters (minimum 10 characters)`;

        if (currentLength < 10) {
            charCount.style.color = '#dc3545';
        } else if (currentLength > 450) {
            charCount.style.color = '#ff6600';
        } else {
            charCount.style.color = '#999';
        }
    });

    // ✅ Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // ✅ Phone validation (must be 10 digits)
        if (!/^\d{10}$/.test(phone)) {
            showError('Please enter a valid 10-digit phone number');
            return;
        }

        // ✅ Message validation
        if (message.length < 10) {
            showError('Message should be at least 10 characters long');
            return;
        }

        // Format phone for display
        const formattedPhone = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*%0A%0A` +
            `*Name:* ${encodeURIComponent(firstName + ' ' + lastName)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Phone:* ${encodeURIComponent(formattedPhone)}%0A` +
            `*Subject:* ${encodeURIComponent(subject)}%0A%0A` +
            `*Message:*%0A${encodeURIComponent(message)}`;

        // Your WhatsApp number (with country code, no '+' or spaces)
        const whatsappNumber = '919611059935';

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');

        // Show success message
        showSuccessMessage();

        // Reset form
        contactForm.reset();
        charCount.textContent = '0/500 characters (minimum 10 characters)';
        charCount.style.color = '#999';
    });

    // ✅ Show error message
    function showError(message) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `<span>${message}</span>`;
        submitBtn.style.background = '#dc3545';
        submitBtn.disabled = true;

        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '#6d5d4b';
            submitBtn.disabled = false;
        }, 3000);
    }

    // ✅ Show success message
    function showSuccessMessage() {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>MESSAGE SENT SUCCESSFULLY! ✓</span>';
        submitBtn.style.background = '#28a745';
        submitBtn.disabled = true;

        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '#6d5d4b';
            submitBtn.disabled = false;
        }, 3000);
    }

    // ✅ Input field styling on focus/blur
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#ddd';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#ff6600';
        });
    });
});
