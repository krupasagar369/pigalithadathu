// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
    initializeScrollEffects();
    initializeCardInteractions();
    initializeMobileMenu();
    console.log('Company Page Loaded Successfully!');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Adjust based on your navbar height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize scroll animations with Intersection Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animateElements = document.querySelectorAll(
        '.stat-card, .mv-card, .capability-card, .leader-card, .advantage-card, .tech-card, .industry-item'
    );
    
    animateElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.3s ease ${index * 0.02}s`; // Faster stagger animation
        observer.observe(el);
    });
}

// Counter animation for statistics
function initializeCounters() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent.trim();
                    let target = 0;
                    let suffix = '';
                    
                    // Handle different formats (100+, 20K, etc.)
                    if (text.includes('+')) {
                        target = parseInt(text.replace(/\D/g, ''));
                        suffix = '+';
                    } else if (text.includes('K')) {
                        target = parseInt(text.replace(/\D/g, ''));
                        suffix = 'K';
                    } else if (!isNaN(text)) {
                        target = parseInt(text);
                    } else {
                        // For year format like "2024"
                        target = parseInt(text);
                    }
                    
                    if (!isNaN(target) && target > 0) {
                        animateCounter(stat, target, suffix, 1000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Animate counter with suffix support
function animateCounter(element, target, suffix = '', duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();
    
    const counter = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        start = Math.floor(progress * target);
        element.textContent = start + suffix;
        
        if (progress >= 1) {
            element.textContent = target + suffix;
            clearInterval(counter);
        }
    }, 16);
}

// Initialize scroll effects
function initializeScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Hero parallax effect (optional - enable if needed)
        // const hero = document.querySelector('.hero-section');
        // if (hero && currentScroll <= hero.offsetHeight) {
        //     hero.style.transform = `translateY(${currentScroll * 0.3}px)`;
        // }
        
        // Update active navigation link
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Initialize card interactions
function initializeCardInteractions() {
    // Leader cards z-index management
    const leaderCards = document.querySelectorAll('.leader-card');
    leaderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Industry items hover effect
    const industryItems = document.querySelectorAll('.industry-item');
    industryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Mobile touch effects for cards
    const allCards = document.querySelectorAll('.stat-card, .mv-card, .capability-card, .leader-card, .advantage-card');
    allCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Check if Bootstrap is available
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                } else {
                    // Fallback for manual close
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// Add CSS class for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Utility function for debouncing scroll events (performance optimization)
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optional: Print page functionality
function printPage() {
    window.print();
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'P' to print
    if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        printPage();
    }
    
    // Press 'Home' to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Handle visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause any ongoing animations if needed
        console.log('Page hidden - animations paused');
    } else {
        console.log('Page visible - animations resumed');
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // Optionally add a placeholder or fallback image
            // this.src = 'path/to/fallback-image.jpg';
        });
    });
});