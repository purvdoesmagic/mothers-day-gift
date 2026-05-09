// ===== SMOOTH SCROLL =====
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // Timeline items observer
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

    // Start ambient effects
    createFloatingHearts();
    createPetalRain();

    // Auto-show hero content
    setTimeout(() => {
        document.querySelectorAll('.hero-content .fade-in:not(#heroTitle)').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 300);
        });
        
        // Start typewriter for title
        setTimeout(() => {
            const titleEl = document.getElementById('heroTitle');
            titleEl.classList.add('visible');
            typeWriter('heroTitle', "Happy Mother's Day", 100);
        }, 300);
    }, 300);
});

// ===== TYPEWRITER EFFECT =====
function typeWriter(elementId, text, speed) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== FLOATING HEARTS BACKGROUND =====
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const hearts = ['💕', '💖', '💗', '💝', '♥', '🩷', '🤍'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (8 + Math.random() * 12) + 's';
            heart.style.animationDelay = (Math.random() * 10) + 's';
            heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
            container.appendChild(heart);
        }, i * 600);
    }
}

// ===== PETAL RAIN =====
function createPetalRain() {
    const container = document.getElementById('petal-rain');
    const colors = ['#fd79a8', '#fab1a0', '#ffeaa7', '#dfe6e9', '#f8c8d8'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (6 + Math.random() * 8) + 's';
        petal.style.animationDelay = (Math.random() * 15) + 's';
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.width = (8 + Math.random() * 8) + 'px';
        petal.style.height = petal.style.width;
        petal.style.opacity = 0.3 + Math.random() * 0.3;
        container.appendChild(petal);
    }
}

// ===== ENVELOPE =====
let envelopeOpened = false;

function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    
    const container = document.getElementById('envelopeCard');
    const letter = document.getElementById('letterContent');
    
    container.classList.add('opened');
    
    // Create sparkles on the envelope
    createSparkles(container);
    
    setTimeout(() => {
        letter.classList.add('show');
    }, 600);

    // Vibrate on mobile if supported
    if (navigator.vibrate) navigator.vibrate(100);
}

function createSparkles(parent) {
    const sparkles = ['✨', '⭐', '🌟', '💫', '💖'];
    // Tripled the amount of sparkles for a denser burst!
    for (let i = 0; i < 24; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        const angle = (Math.PI * 2 / 24) * i;
        const distance = 60 + Math.random() * 40;
        sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        parent.style.position = 'relative';
        parent.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

// ===== REASON CARDS =====
function revealReason(card) {
    if (card.classList.contains('revealed')) return;
    card.classList.add('revealed');
    createSparkles(card);
    if (navigator.vibrate) navigator.vibrate(50);
}

// ===== FLOWER GARDEN =====
let flowerCount = 0;
// A beautiful, diverse garden!
const flowerEmojis = ['🌹', '🌹', '🌹', '🌹', '🌹', '🌸', '🌺', '🌻', '🌷', '🌼', '💮', '🏵️', '🌱'];

function plantFlower(event) {
    const garden = document.getElementById('gardenArea');
    const rect = garden.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Don't plant in the ground area
    if (y > rect.height - 60) return;
    
    garden.classList.add('has-flowers');
    
    const flower = document.createElement('span');
    flower.className = 'planted-flower';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = (x - 15) + 'px';
    flower.style.top = (y - 15) + 'px';
    flower.style.fontSize = (1.4 + Math.random() * 1.2) + 'rem';
    
    garden.appendChild(flower);
    
    flowerCount++;
    document.getElementById('flowerCount').textContent = flowerCount;
    
    // Add a gentle sway after growing
    setTimeout(() => {
        flower.style.animation = `sway ${2 + Math.random() * 2}s ease-in-out infinite`;
    }, 600);
    
    if (navigator.vibrate) navigator.vibrate(30);
    
    // Milestone celebrations
    if (flowerCount === 10 || flowerCount === 25 || flowerCount === 50) {
        miniCelebration();
    }
}

// Add sway animation dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes sway {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
    }
`;
document.head.appendChild(styleSheet);

function miniCelebration() {
    for (let i = 0; i < 60; i++) {
        setTimeout(() => createConfettiPiece(), i * 20);
    }
}

// ===== BALLOONS =====
function popBalloon(balloon) {
    if (balloon.classList.contains('popped')) return;
    
    const wish = balloon.getAttribute('data-wish');
    balloon.classList.add('popped');
    
    createSparkles(balloon.parentElement);
    
    const wishDisplay = document.getElementById('wishDisplay');
    wishDisplay.innerHTML = `<p class="wish-text">✨ ${wish} ✨</p>`;
    
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
}

// ===== CELEBRATION / CONFETTI =====
function celebrate() {
    const btn = document.getElementById('celebrateBtn');
    btn.textContent = '🎊 Celebrating You, Mom! 🎊';
    btn.style.background = 'rgba(255,255,255,0.4)';
    
    // Massive confetti burst!
    for (let i = 0; i < 150; i++) {
        setTimeout(() => createConfettiPiece(), i * 15);
    }
    
    // Second wave
    setTimeout(() => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => createConfettiPiece(), i * 20);
        }
    }, 1500);
    
    // Emoji rain — lots of love
    const emojis = ['🌹', '💖', '🎉', '✨', '🌹', '💐', '🎊', '💕', '🌹', '⭐', '❤️', '💗'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const emoji = document.createElement('span');
            emoji.className = 'confetti-piece';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            emoji.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
            emoji.style.animationDuration = (2 + Math.random() * 3) + 's';
            emoji.style.background = 'transparent';
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 5000);
        }, i * 100);
    }
    
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
}

function createConfettiPiece() {
    const colors = ['#e84393', '#fd79a8', '#f9ca24', '#a29bfe', '#55efc4', '#ff7675', '#fab1a0', '#81ecec'];
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.setProperty('--drift', (Math.random() * 150 - 75) + 'px');
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
}

// ===== HUG SECTION =====
let hugCount = 0;
let isHugging = false;
let hugTimer;

function sendHug() {
    const btn = document.getElementById('hugBtn');
    const emoji = document.getElementById('hugEmoji');
    const msg = document.getElementById('hugMessage');
    
    if (isHugging) return;
    isHugging = true;
    
    btn.classList.add('hugging');
    emoji.textContent = '🤗';
    msg.textContent = 'Sending a big warm hug...';
    
    if (navigator.vibrate) navigator.vibrate(200);
    
    clearTimeout(hugTimer);
    hugTimer = setTimeout(() => {
        isHugging = false;
        btn.classList.remove('hugging');
        emoji.textContent = '🫂';
        msg.textContent = 'Hug delivered! 💖';
        
        hugCount++;
        document.getElementById('hugCount').textContent = hugCount;
        
        createSparkles(btn);
        
        if (hugCount === 5 || hugCount === 10 || hugCount === 20) {
            msg.textContent = 'Wow, so many hugs! 🥰';
            miniCelebration();
        }
    }, 1500);
}
