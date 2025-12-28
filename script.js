// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
const updateThemeIcon = (theme) => {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
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

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };

    updateCounter();
};

const checkStatsVisibility = () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const sectionTop = statsSection.offsetTop;
    const sectionHeight = statsSection.clientHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > sectionTop + sectionHeight / 2 && !animated) {
        animated = true;
        statNumbers.forEach(stat => animateCounter(stat));
    }
};

window.addEventListener('scroll', checkStatsVisibility);
window.addEventListener('load', checkStatsVisibility);

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(quoteForm);
    
    // Show success message (you can replace this with actual form submission)
    alert('Thank you for your inquiry! We will contact you soon.');
    
    // Reset form
    quoteForm.reset();
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Simple scroll reveal animation - Optimized
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements - reduced set for performance
const animatedElements = document.querySelectorAll('.service-card, .process-step, .gallery-item, .testimonial-card');
animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// Testimonial Carousel
let currentSlide = 0;
const slider = document.getElementById('testimonialsSlider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const totalSlides = testimonialCards.length;

// Calculate how many cards to show based on screen size
const getCardsPerView = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
};

const updateSlider = () => {
    const cardsPerView = getCardsPerView();
    const slideWidth = 100 / cardsPerView;
    const offset = -(currentSlide * slideWidth);
    slider.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update card sizes based on viewport
    testimonialCards.forEach(card => {
        if (window.innerWidth <= 768) {
            card.style.flex = '0 0 100%';
            card.style.maxWidth = '100%';
        } else if (window.innerWidth <= 1024) {
            card.style.flex = '0 0 calc(50% - 15px)';
            card.style.maxWidth = 'calc(50% - 15px)';
        } else {
            card.style.flex = '0 0 calc(33.333% - 20px)';
            card.style.maxWidth = 'calc(33.333% - 20px)';
        }
    });
};

const nextSlide = () => {
    const cardsPerView = getCardsPerView();
    const maxSlide = totalSlides - cardsPerView;
    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    updateSlider();
};

const prevSlide = () => {
    const cardsPerView = getCardsPerView();
    const maxSlide = totalSlides - cardsPerView;
    currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
    updateSlider();
};

// Event listeners for navigation buttons
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
    });
});

// Auto-slide functionality
let autoSlideInterval;

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

// Handle window resize
window.addEventListener('resize', () => {
    updateSlider();
});

// Initialize on page load
window.addEventListener('load', () => {
    updateSlider();
    startAutoSlide();
    console.log('Apoorva Packers and Movers website loaded successfully!');
});

