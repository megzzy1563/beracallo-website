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