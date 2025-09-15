const imageData = [
    {
        title: "AI & Machine Learning Workshop",
        description: "Dive deep into artificial intelligence and machine learning with hands-on sessions"
    },
    {
        title: "Cybersecurity Panel Discussion", 
        description: "Learn from industry experts about latest cybersecurity threats and defense strategies"
    },
    {
        title: "Coding Challenge Competition",
        description: "Test your programming skills in our competitive coding challenge with exciting prizes"
    },
    {
        title: "IoT Innovations Talk",
        description: "Explore the Internet of Things and its revolutionary impact on modern technology"
    },
    {
        title: "Project Exhibition Showcase",
        description: "Showcase your innovative projects and learn from fellow participants' creative solutions"
    },
    {
        title: "Tech Quiz Competition",
        description: "Challenge your technical knowledge in our exciting quiz competition with amazing prizes"
    },
    {
        title: "INFYRA'24 Tech Fest",
        description: "National Level Tech Fest - Innovate, Integrate, Inspire"
    }
];

// Generate Matrix Rain Effect
function generateMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${Math.random() * 5 + 10}s`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        let text = '';
        const charCount = Math.floor(Math.random() * 20 + 10);
        for (let j = 0; j < charCount; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + ' ';
        }
        column.textContent = text;
        
        matrixRain.appendChild(column);
    }
}

// Generate Floating Particles
function generateParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 20}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Coverflow functionality
const items = document.querySelectorAll('.coverflow-item');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;
let autoplayInterval;
let isAnimating = false;

// Create dots
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goToIndex(index);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCoverflow() {
    if (isAnimating) return;
    isAnimating = true;

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        
        if (offset > items.length / 2) {
            offset = offset - items.length;
        }
        else if (offset < -items.length / 2) {
            offset = offset + items.length;
        }
        
        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);
        
        let translateX = offset * 180;
        let translateZ = -absOffset * 150;
        let rotateY = -sign * Math.min(absOffset * 45, 45);
        let opacity = 1 - (absOffset * 0.2);
        let scale = 1 - (absOffset * 0.1);

        if (absOffset > 3) {
            opacity = 0;
            translateX = sign * 600;
        }

        item.style.transform = `
            translateX(${translateX}px) 
            translateZ(${translateZ}px) 
            rotateY(${rotateY}deg)
            scale(${scale})
        `;
        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;

        item.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function goToIndex(index) {
    if (isAnimating || index === currentIndex) return;
    currentIndex = index;
    updateCoverflow();
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    }, 4000);
}

function updateCountdown() {
    const targetDate = new Date('September 25, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update numbers
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Update circular progress bars
        const daysProgress = document.getElementById('days-progress');
        const hoursProgress = document.getElementById('hours-progress');
        const minutesProgress = document.getElementById('minutes-progress');
        const secondsProgress = document.getElementById('seconds-progress');

        // Calculate progress percentages
        const daysPercent = (days % 365) / 365;
        const hoursPercent = hours / 24;
        const minutesPercent = minutes / 60;
        const secondsPercent = seconds / 60;

        // Update stroke-dashoffset for circular progress
        const circumference = 283;
        daysProgress.style.strokeDashoffset = circumference - (daysPercent * circumference);
        hoursProgress.style.strokeDashoffset = circumference - (hoursPercent * circumference);
        minutesProgress.style.strokeDashoffset = circumference - (minutesPercent * circumference);
        secondsProgress.style.strokeDashoffset = circumference - (secondsPercent * circumference);
    } else {
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Reset progress bars
        document.querySelectorAll('.progress-circle').forEach(circle => {
            circle.style.strokeDashoffset = 283;
        });
    }
}

// Initialize everything
generateMatrixRain();
generateParticles();
updateCoverflow();
startAutoplay();

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Click on items to select
items.forEach((item, index) => {
    item.addEventListener('click', () => goToIndex(index));
});
// Typing effect for "INFYRA 2025"
const typingElement = document.getElementById('typingEffect');
const textToType = "INFYRA 2025 - Innovate, Integrate, Inspire!";
let index = 0;

function typeText() {
if (index < textToType.length) {
typingElement.textContent += textToType.charAt(index);
index++;
setTimeout(typeText, 120); // typing speed
}
}

// Initialize typing effect
typeText();


const FULL_CIRCUMFERENCE = 2 * Math.PI * 45; // 2πr, r=45

function setProgress(id, value, max) {
const circle = document.getElementById(id);
const progress = FULL_CIRCUMFERENCE - (value / max) * FULL_CIRCUMFERENCE;
circle.style.strokeDashoffset = progress;
}

function startCountdown(targetDate) {
function update() {
const now = new Date().getTime();
let remaining = targetDate - now;

if (remaining < 0) remaining = 0;

const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
const hrs = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
const secs = Math.floor((remaining % (1000 * 60)) / 1000);

// update numbers
document.getElementById("days").textContent = String(days).padStart(3, "0");
document.getElementById("hours").textContent = String(hrs).padStart(2, "0");
document.getElementById("minutes").textContent = String(mins).padStart(2, "0");
document.getElementById("seconds").textContent = String(secs).padStart(2, "0");

// update circles
setProgress("days-progress", days % 365, 365);
setProgress("hours-progress", hrs, 24);
setProgress("minutes-progress", mins, 60);
setProgress("seconds-progress", secs, 60);

requestAnimationFrame(update);
}
update();
}

// 🔥 Set target event date (adjust as needed)
const targetDate = new Date("Sep 25, 2025 00:00:00").getTime();
startCountdown(targetDate);