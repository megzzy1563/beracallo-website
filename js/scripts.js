// DOM Elements
const header = document.querySelector('header');
const backToTopBtn = document.querySelector('.back-to-top');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .fade-right, .fade-left');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Animation on scroll
    animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.8) {
            el.classList.add('appear');
        }
    });
});

// Back to top button click
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission with functional email sending
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Disable submit button and show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Using EmailJS to send the form with your configured service and template
            await emailjs.send('Bececal202$', 'template_icwo3zh', {
                from_name: name,
                from_email: email,
                subject: subject || 'Contact Form Submission',
                message: message,
                reply_to: email  // Add this line to set the reply-to address
            });
            
            // Show success message
            showFormMessage('success', 'Your message has been sent successfully!');
            contactForm.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            showFormMessage('error', 'There was a problem sending your message. Please try again.');
        } finally {
            // Restore submit button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Function to show form success/error messages
function showFormMessage(type, text) {
    // Check if a message already exists
    let messageEl = document.querySelector('.form-message');
    
    // If not, create one
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'form-message';
        contactForm.appendChild(messageEl);
    }
    
    // Set message style and content
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = text;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            messageEl.remove();
        }, 300); // Match transition duration
    }, 5000);
}

// Initialize videos when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing videos');
    
    // Get all video elements
    const videos = document.querySelectorAll('video');
    console.log(`Found ${videos.length} video elements`);
    
    videos.forEach((video, index) => {
        console.log(`Initializing video ${index + 1}`);
        
        // Force videos to load
        video.load();
        
        // Handle loading indicator
        const videoContainer = video.closest('.video-container');
        if (videoContainer) {
            // Check if loading indicator already exists
            let loadingIndicator = videoContainer.querySelector('.video-loading');
            
            if (!loadingIndicator) {
                loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'video-loading';
                loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                videoContainer.appendChild(loadingIndicator);
            }
            
            // Add event listeners
            video.addEventListener('canplay', function() {
                console.log(`Video ${index + 1} can play now`);
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
            });
            
            video.addEventListener('error', function(e) {
                console.error(`Error with video ${index + 1}:`, e);
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                }
            });
        }
    });
});

// Add this code to your existing scripts.js

// Mobile menu close button functionality
const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        e.target !== mobileMenuBtn &&
        !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// Handle touch events for better mobile experience
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    // Determine if it's a horizontal swipe (left or right)
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swiped left, close menu
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        } else {
            // Swiped right, open menu if near edge
            if (!nav.classList.contains('active') && xDown < 50) {
                nav.classList.add('active');
            }
        }
    }

    // Reset values
    xDown = null;
    yDown = null;
}

// Fix for project images on mobile
window.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project-img img');
    
    projectImages.forEach(img => {
        // Remove inline width that might be causing issues
        if (img.style.width) {
            img.style.removeProperty('width');
            img.parentElement.classList.add('fixed-img');
        }
    });
});

// Optimize video loading on mobile
function optimizeVideoForMobile() {
    const videos = document.querySelectorAll('video');
    const isMobile = window.innerWidth <= 768;
    
    videos.forEach(video => {
        if (isMobile) {
            // Set lower quality for mobile devices
            video.setAttribute('playsinline', '');
            
            // Only load video when in viewport on mobile
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.load();
                        if (video.hasAttribute('autoplay')) {
                            video.play().catch(e => console.log('Autoplay prevented:', e));
                        }
                        observer.unobserve(video);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(video);
        }
    });
}

// Call on load and resize
window.addEventListener('DOMContentLoaded', optimizeVideoForMobile);
window.addEventListener('resize', optimizeVideoForMobile);