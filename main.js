// main.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up, .fade-up-word');
    fadeElements.forEach((el, index) => {
        // Add staggering delay to words if not explicitly set
        if (el.classList.contains('fade-up-word')) {
            el.style.transitionDelay = `${index * 0.15}s`;
        }
        observer.observe(el);
    });

    // Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Hero Slideshow Logic
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlideIndex = 0;
        setInterval(() => {
            heroSlides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
            heroSlides[currentSlideIndex].classList.add('active');
        }, 4000);
    }
    
    // Modal Click-Outside Logic
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Modal Functions for Certificates
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Theme Toggle Logic
const toggleButtons = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');

function setTheme(theme) {
    if (theme === 'kids') {
        document.body.setAttribute('data-theme', 'kids');
        localStorage.setItem('portfolio-theme', 'kids');
        spawnInitialButterflies();
        if (typeof addPageDecorations === 'function') addPageDecorations();
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        removeButterflies();
        if (typeof removePageDecorations === 'function') removePageDecorations();
    }
}

// Load saved theme or default to kids
const savedTheme = localStorage.getItem('portfolio-theme') || 'kids';
setTheme(savedTheme);

toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'kids') {
            setTheme('dark');
        } else {
            setTheme('kids');
        }
    });
});

// Butterfly Logic
let butterflyInterval;

function spawnSingleButterfly(x, y, isSmall = false) {
    const butterfly = document.createElement('div');
    butterfly.classList.add('butterfly');
    if (isSmall) butterfly.classList.add('small-butterfly');
    
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const butterflySvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="${randomColor}"><path d="M12 15C10 11 3 8 3 13C3 17 9 20 12 21C15 20 21 17 21 13C21 8 14 11 12 15Z"/><path d="M11 2C11 1.4 11.4 1 12 1C12.6 1 13 1.4 13 2V12C13 12.6 12.6 13 12 13C11.4 13 11 12.6 11 12V2Z" fill="#333"/></svg>`;
    const teddySvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="${randomColor}"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="12" r="8"/><circle cx="12" cy="14" r="3" fill="white"/><circle cx="12" cy="13" r="1.5" fill="#333"/><circle cx="9" cy="10" r="1.5" fill="#333"/><circle cx="15" cy="10" r="1.5" fill="#333"/></svg>`;
    const flowerSvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="${randomColor}"><circle cx="12" cy="6" r="5"/><circle cx="12" cy="18" r="5"/><circle cx="6" cy="12" r="5"/><circle cx="18" cy="12" r="5"/><circle cx="12" cy="12" r="4" fill="#fcd34d"/></svg>`;
    const carSvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="${randomColor}"><path d="M4 11V15H20V11H16L13 7H8L5 11H4Z"/><circle cx="7" cy="15" r="2.5" fill="#333"/><circle cx="17" cy="15" r="2.5" fill="#333"/></svg>`;
    
    const shapes = [butterflySvg, teddySvg, flowerSvg, carSvg];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    butterfly.innerHTML = randomShape;
    
    document.body.appendChild(butterfly);
    
    if (isSmall) {
        // Small butterflies fly up from the button and fade
        const endY = y - 100 - Math.random() * 50;
        const endX = x + (Math.random() * 100 - 50);
        butterfly.style.left = `${x}px`;
        butterfly.style.top = `${y}px`;
        butterfly.style.setProperty('--start-x', `${x}px`);
        butterfly.style.setProperty('--start-y', `${y}px`);
        butterfly.style.setProperty('--end-x', `${endX}px`);
        butterfly.style.setProperty('--end-y', `${endY}px`);
        
        butterfly.style.animation = `flutter 0.1s infinite alternate, flyUpFade 1.5s ease-out forwards`;
        
        setTimeout(() => {
            if(butterfly.parentNode) butterfly.remove();
        }, 1500);
    } else {
        // Large butterflies for the initial 5 seconds
        butterfly.style.left = '-10%';
        const startY = Math.random() * 80 + 10;
        const endY = Math.random() * 80 + 10;
        butterfly.style.setProperty('--start-y', `${startY}vh`);
        butterfly.style.setProperty('--end-y', `${endY}vh`);
        
        const scale = 0.4 + Math.random() * 0.6;
        butterfly.style.transform = `scale(${scale})`;
        
        // 5 seconds duration
        butterfly.style.animation = `flutter 0.2s infinite alternate, flyAcrossFade 5s linear forwards`;
        
        setTimeout(() => {
            if(butterfly.parentNode) butterfly.remove();
        }, 5000);
    }
}

function spawnInitialButterflies() {
    removeButterflies();
    // Spawn 10 butterflies initially
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            if (document.body.getAttribute('data-theme') === 'kids') {
                spawnSingleButterfly(0, 0, false);
            }
        }, i * 300);
    }
}

function removeButterflies() {
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach(b => b.remove());
}

// Button hover effect for butterflies
const interactableElements = document.querySelectorAll('.btn-primary, .btn-outline, .card, .integrated-card, .summary-card, .theme-btn');
interactableElements.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        if (document.body.getAttribute('data-theme') === 'kids') {
            const rect = el.getBoundingClientRect();
            // Spawn 3 small butterflies
            for(let i=0; i<3; i++) {
                setTimeout(() => {
                    spawnSingleButterfly(rect.left + rect.width / 2, rect.top, true);
                }, i * 100);
            }
        }
    });
});

function addPageDecorations() {
    if (document.querySelector('.page-decorations')) return;
    
    const container = document.createElement('div');
    container.className = 'page-decorations';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';
    container.style.overflow = 'hidden';
    
    const positions = [
        {top: '10%', left: '5%'},
        {top: '20%', right: '8%'},
        {bottom: '15%', left: '10%'},
        {bottom: '25%', right: '5%'},
        {top: '50%', left: '2%'},
        {top: '60%', right: '3%'},
        {top: '80%', left: '8%'},
        {top: '30%', right: '2%'},
    ];
    
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    
    positions.forEach(pos => {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        Object.assign(el.style, pos);
        el.style.opacity = '0.3';
        el.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 1.5})`;
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const isStar = Math.random() > 0.5;
        
        if (isStar) {
            el.innerHTML = `<svg width="60" height="60" viewBox="0 0 24 24" fill="${randomColor}"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>`;
        } else {
            el.innerHTML = `<svg width="60" height="60" viewBox="0 0 24 24" fill="${randomColor}"><circle cx="12" cy="6" r="5"/><circle cx="12" cy="18" r="5"/><circle cx="6" cy="12" r="5"/><circle cx="18" cy="12" r="5"/><circle cx="12" cy="12" r="4" fill="#fcd34d"/></svg>`;
        }
        
        container.appendChild(el);
    });
    
    document.body.appendChild(container);
}

function removePageDecorations() {
    const decors = document.querySelector('.page-decorations');
    if (decors) decors.remove();
}
