document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            let isValid = true;
            
            // Validate Name
            const name = document.getElementById('contactName');
            const nameError = document.getElementById('contactNameError');
            if (name.value.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                name.classList.add('input-error');
                isValid = false;
            }
            
            // Validate Email
            const email = document.getElementById('contactEmail');
            const emailError = document.getElementById('contactEmailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                emailError.textContent = 'Please enter a valid email';
                email.classList.add('input-error');
                isValid = false;
            }
            
            // Validate Subject
            const subject = document.getElementById('subject');
            const subjectError = document.getElementById('subjectError');
            if (!subject.value) {
                subjectError.textContent = 'Please select a subject';
                subject.classList.add('input-error');
                isValid = false;
            }
            
            // Validate Message
            const message = document.getElementById('contactMessage');
            const messageError = document.getElementById('contactMessageError');
            if (message.value.length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                message.classList.add('input-error');
                isValid = false;
            }
            
            if (isValid) {
                submitContactForm(form);
            }
        });
    }
});

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

function submitContactForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate email sending (replace with actual AJAX)
    setTimeout(() => {
        const responseDiv = document.getElementById('contactResponse');
        responseDiv.style.display = 'block';
        responseDiv.className = 'success-message';
        responseDiv.innerHTML = `
            <h3>✅ Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll respond within 24 hours.</p>
            <p><strong>Subject:</strong> ${document.getElementById('subject').value}</p>
        `;
        
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
        // Scroll to response
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2000);
}