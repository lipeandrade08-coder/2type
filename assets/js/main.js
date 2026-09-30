// SWIPER INIT
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
});

// PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => { preloader.classList.add('hidden'); }, 500);
    }
});


// TSPARTICLES BACKGROUND
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, resize: true },
            modes: { grab: { distance: 150, links: { opacity: 0.5 } } }
        },
        particles: {
            color: { value: ["#8B2FC9", "#06B6D4"] },
            links: { color: "#8B2FC9", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: "out" },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true,
    });
}

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

// CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if(cursor && follower) {
    let mX=0, mY=0, fX=0, fY=0;
    document.addEventListener('mousemove', e => {
        mX = e.clientX; 
        mY = e.clientY; 
        cursor.style.left = mX + 'px'; 
        cursor.style.top = mY + 'px';
    });
    
    (function anim(){
        fX += (mX - fX) * 0.12; 
        fY += (mY - fY) * 0.12; 
        follower.style.left = fX + 'px'; 
        follower.style.top = fY + 'px'; 
        requestAnimationFrame(anim);
    })();
    
    const hoverElements = document.querySelectorAll('a, button, .service-card, .mini-card, .testimonial-card, .process-step, .about-video-box');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(2)'; 
            follower.style.transform = 'translate(-50%,-50%) scale(1.5)'; 
            follower.style.borderColor = 'rgba(168,85,247,0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(1)'; 
            follower.style.transform = 'translate(-50%,-50%) scale(1)'; 
            follower.style.borderColor = 'rgba(168,85,247,0.5)';
        });
    });
}

// NAVBAR
const navbar = document.getElementById('navbar');
if(navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', scrollY > 40);
    });
}

// PARTICLES
const canvas = document.getElementById('particles-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
    resize(); 
    window.addEventListener('resize', resize);
    
    const palette = ['rgba(107,33,168,', 'rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(34,211,238,'];
    class P {
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - .5) * .4;
            this.vy = (Math.random() - .5) * .4;
            this.r = Math.random() * 1.8 + .5;
            this.life = 1;
            this.decay = Math.random() * .003 + .001;
            this.c = palette[Math.floor(Math.random() * 4)];
        }
        constructor(){ this.reset(); }
        update() {
            this.x += this.vx; this.y += this.vy; this.life -= this.decay;
            if(this.life <= 0 || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
            ctx.fillStyle = this.c + this.life + ')';
            ctx.fill();
        }
    }
    for(let i=0; i<200; i++) particles.push(new P());
    
    let mpX = 0, mpY = 0;
    canvas.addEventListener('mousemove', e => { mpX = e.clientX; mpY = e.clientY; });
    
    (function loop(){
        ctx.clearRect(0,0,W,H);
        particles.forEach(p => {
            const dx = p.x - mpX, dy = p.y - mpY, d = Math.sqrt(dx*dx + dy*dy);
            if(d < 100) {
                p.vx += (dx/d) * .05; p.vy += (dy/d) * .05;
                const s = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
                if(s > 2){ p.vx = p.vx/s*2; p.vy = p.vy/s*2; }
            }
            p.update(); p.draw();
        });
        
        for(let i=0; i<particles.length; i++) {
            for(let j=i+1; j<particles.length; j++){
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx*dx + dy*dy);
                if(d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(107,33,168,' + (1 - d/120) * .15 * particles[i].life + ')';
                    ctx.lineWidth = .5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(loop);
    })();
}

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

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
}

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
