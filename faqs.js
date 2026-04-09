// FAQ Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Highlight matching text
                    if (searchTerm.length > 0) {
                        item.style.borderColor = '#ff6600';
                        item.style.backgroundColor = '#fff8f3';
                    } else {
                        item.style.borderColor = '#e0e0e0';
                        item.style.backgroundColor = '#ffffff';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show message if no results found
            const visibleItems = Array.from(faqItems).filter(item => item.style.display !== 'none');
            
            // Remove existing "no results" message
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            if (visibleItems.length === 0 && searchTerm.length > 0) {
                const accordion = document.getElementById('faqAccordion');
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results-message';
                noResultsDiv.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; background: #f8f9fa; border-radius: 15px; border: 2px dashed #ddd;">
                        <i class="fas fa-search" style="font-size: 3rem; color: #ff6600; margin-bottom: 20px;"></i>
                        <h4 style="color: #000; margin-bottom: 10px;">No results found</h4>
                        <p style="color: #666; margin-bottom: 20px;">We couldn't find any FAQs matching "${searchTerm}"</p>
                        <a href="Contact Us.html" class="btn-cta" style="padding: 12px 30px; font-size: 0.95rem;">Contact Us for Help</a>
                    </div>
                `;
                accordion.appendChild(noResultsDiv);
            }
        });
        
        // Clear search on escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }
    
    // Smooth scroll to FAQ item when opened
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                if (!this.classList.contains('collapsed')) {
                    const offset = 100;
                    const elementPosition = this.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 350);
        });
    });
    
    // Track FAQ interactions for analytics (optional)
    accordionButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const faqQuestion = this.querySelector('.faq-question').textContent;
            console.log(`FAQ ${index + 1} clicked: ${faqQuestion}`);
            
            // Example (optional): gtag('event', 'faq_interaction', { question: faqQuestion });
        });
    });
});
