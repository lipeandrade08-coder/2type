// HAMBURGER MENU
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.getElementById('nav-overlay');

function closeMenu() {
    hamburger && hamburger.classList.remove('open');
    navLinks && navLinks.classList.remove('open');
    navOverlay && navOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            hamburger.classList.add('open');
            navLinks.classList.add('open');
            navOverlay && navOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });
}

// Close menu on overlay click
navOverlay && navOverlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked
navLinks && navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
});

window.addEventListener('load', () => {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            grabCursor: true
        });
    }

    // CAROUSEL DOT INDICATORS
    function initCarouselDots(gridSelector, dotsWrapId) {
        const grid = document.querySelector(gridSelector);
        const dotsWrap = document.getElementById(dotsWrapId);
        if (!grid || !dotsWrap) return;
        const dots = dotsWrap.querySelectorAll('.carousel-dot');
        if (!dots.length) return;

        grid.addEventListener('scroll', () => {
            const cardWidth = grid.querySelector('.service-card, .testimonial-card')?.offsetWidth || 1;
            const gap = 14;
            const index = Math.round(grid.scrollLeft / (cardWidth + gap));
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }, { passive: true });

        // Click on dot scrolls to that card
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const cardWidth = grid.querySelector('.service-card, .testimonial-card')?.offsetWidth || 1;
                grid.scrollTo({ left: i * (cardWidth + 14), behavior: 'smooth' });
            });
        });
    }

    initCarouselDots('.services-grid', 'services-dots');
});


// PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => { preloader.classList.add('hidden'); }, 500);
    }
});


// TSPARTICLES BACKGROUND REMOVIDO PARA PERFORMANCE

// MAGNETIC BUTTONS
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.btn-primary, .nav-logo');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Efeito de imã (puxa levemente pro centro do mouse)
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
});

// CURSOR REMOVIDO PARA PERFORMANCE

// NAVBAR
const navbar = document.getElementById('navbar');
if(navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', scrollY > 40);
    });
}

// PARTICLES REMOVIDO PARA PERFORMANCE

// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if(e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: .1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// COUNTERS
function animCount(el){
    const t = +el.dataset.target, d = 2000, s = performance.now();
    (function step(now){
        const p = Math.min((now - s) / d, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * t);
        if(p < 1) requestAnimationFrame(step); else el.textContent = t;
    })(performance.now());
}
const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if(e.isIntersecting){
            animCount(e.target);
            cObs.unobserve(e.target);
        }
    });
}, { threshold: .5 });
document.querySelectorAll('.counter').forEach(c => cObs.observe(c));

// PARALLAX & MOUSE GLOW
window.addEventListener('scroll', () => {
    const c = document.querySelector('#hero .hero-content');
    if(c) c.style.transform = 'translateY(' + (scrollY * .25) + 'px)';
});

document.addEventListener('mousemove', e => {
    const x = e.clientX / innerWidth, y = e.clientY / innerHeight;
    const g1 = document.querySelector('.hero-glow-1'), g2 = document.querySelector('.hero-glow-2');
    if(g1) g1.style.transform = 'translate(' + (x * 30) + 'px,' + (y * 20) + 'px)';
    if(g2) g2.style.transform = 'translate(' + (-x * 20) + 'px,' + (-y * 15) + 'px)';
});

// FORM
function handleFormSubmit(e){
    e.preventDefault();
    const form = e.target;
    
    const nome = document.getElementById('name').value;
    const empresa = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const servico = document.getElementById('service').value;
    const mensagem = document.getElementById('message').value;

    let texto = `Olá, gostaria de solicitar um orçamento!\n\n`;
    texto += `*Nome:* ${nome}\n`;
    if(empresa) texto += `*Empresa:* ${empresa}\n`;
    texto += `*E-mail:* ${email}\n`;
    if(servico) texto += `*Serviço:* ${servico}\n`;
    if(mensagem) texto += `*Mensagem:* ${mensagem}\n`;

    const zapLink = `https://api.whatsapp.com/send?phone=5512987005369&text=${encodeURIComponent(texto)}`;

    const btn = document.getElementById('submit-btn');
    if(btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Abrindo WhatsApp...';
        btn.style.background = 'linear-gradient(135deg,#25D366,#128C7E)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    }

    window.open(zapLink, '_blank');
}
const form = document.querySelector('form');
if(form && form.hasAttribute('onsubmit')) {
    // If it has inline onsubmit, we can leave it, or override it.
}

// SMOOTH ANCHORS
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const targetId = a.getAttribute('href');
        if(targetId === '#') return;
        const t = document.querySelector(targetId);
        if(t){
            e.preventDefault();
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.getElementById('hamburger-btn');
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
            }

            // Auto-select service if data-service attribute is present
            const dataService = a.getAttribute('data-service');
            if(dataService) {
                const serviceSelect = document.getElementById('service');
                if(serviceSelect) {
                    serviceSelect.value = dataService;
                }
            }

            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// PRE-FILL FORM FROM URL PARAMETER
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if(serviceSelect) {
            // Check if option exists, then set
            const options = Array.from(serviceSelect.options).map(opt => opt.value);
            if (options.includes(serviceParam)) {
                serviceSelect.value = serviceParam;
            }
        }
    }
});



// ROI CALCULATOR
const clientsRange = document.getElementById('clientsRange');
const clientsValue = document.getElementById('clientsValue');
const potentialValue = document.getElementById('potentialValue');
if (clientsRange && clientsValue && potentialValue) {
    clientsRange.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        clientsValue.textContent = val;
        // Simple logic: Potential is 3x the current value
        potentialValue.textContent = val * 3;
    });
}

// FAQ ACCORDION
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // If it wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// 3D TILT EFFECT
const tiltElements = document.querySelectorAll('.about-logo-wrap, .service-visual-box');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on cursor position relative to center
        const xPct = x / rect.width - 0.5;
        const yPct = y / rect.height - 0.5;
        
        const maxTilt = 15; // Max rotation in degrees
        const tiltX = -yPct * maxTilt * 2; 
        const tiltY = xPct * maxTilt * 2;
        
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'transform 0.1s ease-out';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s ease-out';
    });
});
