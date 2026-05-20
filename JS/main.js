
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. MOBILE MENU TOGGLE ==========
    // This makes the hamburger menu work on mobile devices
    
    // Get references to the hamburger button and navigation menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if hamburger exists (only runs on pages that have one)
    if (hamburger) {
        // Add click event listener to hamburger button
        hamburger.addEventListener('click', function() {
            // Toggle the 'active' class on the navigation menu
            // This shows/hides the menu on mobile
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu automatically when a user clicks a navigation link
    // This provides a better user experience
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            // Remove the 'active' class to hide the menu
            navMenu.classList.remove('active');
        });
    });
    
    // ========== 2. COUNTER ANIMATION FOR STATISTICS ==========
    // This animates the numbers counting up when the user scrolls to the stats section
    
    // Get all elements with class 'stat-number'
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Function to animate the numbers
    function animateNumbers() {
        // Loop through each stat number element
        statNumbers.forEach(stat => {
            // Get the target number from the 'data-target' attribute
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            
            // Calculate increment - number of steps to reach target
            // Dividing by 50 creates a smooth 50-frame animation
            const increment = target / 50;
            
            // Set up an interval that updates the number every 30 milliseconds
            const updateCounter = setInterval(() => {
                current += increment;
                
                // If we've reached or passed the target number
                if (current >= target) {
                    // Display the final target number with commas (e.g., 5,000)
                    stat.innerText = target.toLocaleString();
                    // Stop the interval animation
                    clearInterval(updateCounter);
                } else {
                    // Display the current number (rounded down)
                    stat.innerText = Math.floor(current).toLocaleString();
                }
            }, 30); // Update every 30ms for smooth animation
        });
    }
    
    // Check if stats section exists on this page
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        // Create an Intersection Observer - detects when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the stats section is visible on screen
                if (entry.isIntersecting) {
                    // Start the counter animation
                    animateNumbers();
                    // Stop observing after animation starts (only animate once)
                    observer.unobserve(entry.target);
                }
            });
        });
        // Start observing the stats section
        observer.observe(statsSection);
    }
    
    // ========== 3. TESTIMONIAL SLIDER ==========
    // This creates a rotating testimonial slider with dot navigation
    
    let currentTestimonial = 0;  // Track which testimonial is currently visible
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Exit if there are no testimonials (prevents errors)
        if (testimonials.length === 0) return;
        
        // Hide all testimonials and deactivate all dots
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        // Show the selected testimonial and activate its dot
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
    
    // Only set up slider if there are dots (prevents errors on pages without testimonials)
    if (dots.length > 0) {
        // Add click event to each navigation dot
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update current testimonial to clicked index
                currentTestimonial = index;
                // Show the corresponding testimonial
                showTestimonial(currentTestimonial);
            });
        });
        
        // Auto-rotate testimonials every 5 seconds (5000 milliseconds)
        setInterval(() => {
            // Move to next testimonial (loop back to beginning when reaching the end)
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // ========== 4. ENQUIRY FORM VALIDATION ==========
    // This validates the volunteer/sponsor enquiry form
    
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        // Add submit event listener to the form
        enquiryForm.addEventListener('submit', function(event) {
            // Prevent the default form submission (which would refresh the page)
            event.preventDefault();
            
            let isValid = true;
            let errorMessage = '';
            
            // Get form field values and trim whitespace
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const enquiryType = document.getElementById('enquiryType').value;
            const message = document.getElementById('message').value.trim();
            
            // Validate Full Name - cannot be empty
            if (fullName === '') {
                isValid = false;
                errorMessage += '• Please enter your full name\n';
                // Highlight the field with red border
                document.getElementById('fullName').style.border = '2px solid #E76F51';
            } else {
                // Reset border if valid
                document.getElementById('fullName').style.border = '1px solid #ddd';
            }
            
            // Validate Email - must match email pattern
            // Regular expression checks for valid email format: name@domain.com
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailPattern.test(email)) {
                isValid = false;
                errorMessage += '• Please enter a valid email address\n';
                document.getElementById('email').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('email').style.border = '1px solid #ddd';
            }
            
            // Validate Enquiry Type - must be selected
            if (enquiryType === '') {
                isValid = false;
                errorMessage += '• Please select an enquiry type\n';
                document.getElementById('enquiryType').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('enquiryType').style.border = '1px solid #ddd';
            }
            
            // Validate Message - minimum 10 characters
            if (message === '' || message.length < 10) {
                isValid = false;
                errorMessage += '• Please enter a message (at least 10 characters)\n';
                document.getElementById('message').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('message').style.border = '1px solid #ddd';
            }
            
            // Display success or error message
            const formMessage = document.getElementById('formMessage');
            if (isValid) {
                // Show success message
                formMessage.innerHTML = '<div class="success-message">✓ Thank you! Your enquiry has been sent. We\'ll contact you within 48 hours.</div>';
                // Reset the entire form
                enquiryForm.reset();
                // Clear the success message after 5 seconds
                setTimeout(() => {
                    formMessage.innerHTML = '';
                }, 5000);
            } else {
                // Show error message with all issues
                formMessage.innerHTML = '<div class="error-message">❌ Please fix the following errors:<br>' + errorMessage.replace(/\n/g, '<br>') + '</div>';
            }
        });
    }
    
    // ========== 5. CONTACT FORM VALIDATION ==========
    // This validates the contact form on the contact page
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add submit event listener to the contact form
        contactForm.addEventListener('submit', function(event) {
            // Prevent page refresh on submit
            event.preventDefault();
            
            let isValid = true;
            let errorMessage = '';
            
            // Get form field values
            const contactName = document.getElementById('contactName').value.trim();
            const contactEmail = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const contactMessage = document.getElementById('contactMessage').value.trim();
            
            // Validate Name
            if (contactName === '') {
                isValid = false;
                errorMessage += '• Please enter your name\n';
                document.getElementById('contactName').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('contactName').style.border = '1px solid #ddd';
            }
            
            // Validate Email using same pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (contactEmail === '' || !emailPattern.test(contactEmail)) {
                isValid = false;
                errorMessage += '• Please enter a valid email address\n';
                document.getElementById('contactEmail').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('contactEmail').style.border = '1px solid #ddd';
            }
            
            // Validate Subject
            if (subject === '') {
                isValid = false;
                errorMessage += '• Please enter a subject\n';
                document.getElementById('subject').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('subject').style.border = '1px solid #ddd';
            }
            
            // Validate Message - minimum 10 characters
            if (contactMessage === '' || contactMessage.length < 10) {
                isValid = false;
                errorMessage += '• Please enter a message (at least 10 characters)\n';
                document.getElementById('contactMessage').style.border = '2px solid #E76F51';
            } else {
                document.getElementById('contactMessage').style.border = '1px solid #ddd';
            }
            
            // Display result message
            const contactFormMessage = document.getElementById('contactFormMessage');
            if (isValid) {
                contactFormMessage.innerHTML = '<div class="success-message">✓ Thank you! Your message has been sent successfully. We\'ll respond within 48 hours.</div>';
                contactForm.reset();
                setTimeout(() => {
                    contactFormMessage.innerHTML = '';
                }, 5000);
            } else {
                contactFormMessage.innerHTML = '<div class="error-message">❌ Please fix the following errors:<br>' + errorMessage.replace(/\n/g, '<br>') + '</div>';
            }
        });
    }
    
    // ========== 6. SMOOTH SCROLLING (Optional Enhancement) ==========
    // This adds smooth scrolling when clicking anchor links (if any exist)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "" && href !== "#0") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
}); // End of DOMContentLoaded

/* ========== END OF JAVASCRIPT ========== */