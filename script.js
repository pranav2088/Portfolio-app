// Enhanced Professional Portfolio JavaScript

// Mobile menu toggle with smooth animations
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Enhanced hamburger icon animation
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        icon.style.transform = 'rotate(180deg)';
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        icon.style.transform = 'rotate(0deg)';
    });
});

// Enhanced contact form handling with validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Enhanced form validation
    if (!name || name.length < 2) {
        showNotification('Please enter a valid name (at least 2 characters)', 'error');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!message || message.length < 10) {
        showNotification('Please enter a message (at least 10 characters)', 'error');
        return;
    }
    
    // Simulate form submission with loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        
        // Add success animation
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 max-w-sm`;
    
    const colors = {
        success: 'bg-green-600 text-white border-l-4 border-green-400',
        error: 'bg-red-600 text-white border-l-4 border-red-400',
        info: 'bg-blue-600 text-white border-l-4 border-blue-400'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="${icons[type]} text-lg"></i>
            <p class="font-medium">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Smooth scrolling for navigation links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced header scroll effects
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove shadow based on scroll position
    if (scrollTop > 100) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    // Hide/show header on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for multiple elements
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-slide-up, .project-card, .skill-tag');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Enhanced typing effect for hero section
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            // Add blinking cursor effect
            element.innerHTML += '<span class="animate-pulse">|</span>';
            setTimeout(() => {
                element.querySelector('span').remove();
            }, 3000);
        }
    }
    
    type();
}

// Initialize typing effect when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heroTitle = entry.target.querySelector('h1');
            const originalText = heroTitle.innerHTML;
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 60);
            }, 500);
            heroObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation highlighting with smooth transitions
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill tags hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project cards enhanced hover effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation for page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 opacity-0 pointer-events-none';
scrollToTopBtn.style.transform = 'translateY(100px)';

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

// Add cursor trail effect (optional)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-50 opacity-50';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.animation = 'fadeOut 1s ease-out forwards';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add fadeOut animation for cursor trail
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
    }
`;
document.head.appendChild(style);