// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Toggle
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intake Form Submission
const intakeForm = document.getElementById('intake-form');
if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = intakeForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'PROCESSING...';
        btn.disabled = true;
        
        // Simulate secure submission
        setTimeout(() => {
            alert('Thank you for your inquiry. A member of our legal team will review your submission and contact you within 1-2 business days.');
            intakeForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 2000);
    });
}

// Fade-in Scroll Observer
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Apply initial styles and observe
document.querySelectorAll('section > .container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    fadeObserver.observe(el);
});
