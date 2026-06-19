// Accordion Functionality using jQuery
$(document).ready(function() {
    // Initialize all accordion content as hidden
    $('.accordion-content').hide();
    
    // Click event for accordion headers
    $('.accordion-header').click(function() {
        const content = $(this).next('.accordion-content');
        const icon = $(this).find('.accordion-icon');
        
        // Close all other accordion items
        $('.accordion-content').not(content).slideUp();
        $('.accordion-icon').not(icon).text('+').removeClass('active');
        
        // Toggle current accordion
        content.slideToggle();
        icon.text(content.is(':visible') ? '−' : '+');
        icon.toggleClass('active');
    });
    
    // Open first accordion by default
    $('.accordion-content:first').slideDown();
    $('.accordion-icon:first').text('−').addClass('active');
});

// Search Functionality
function searchServices() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const items = document.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Debounce search for better performance
let searchTimeout;
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchServices, 300);
        });
    }
});