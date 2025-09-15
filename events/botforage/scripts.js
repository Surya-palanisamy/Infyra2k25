// Poster reveal logic
document.getElementById("revealBtn").addEventListener("click", () => {
  document.getElementById("posterImg").classList.remove("hidden");
  document.getElementById("registerBelow").classList.remove("hidden");
  document.getElementById("revealBtn").classList.add("hidden");
});

// Intro sequence then show site content
window.addEventListener("load", () => {
  const introOverlay = document.getElementById("introOverlay");
  const contentSections = document.querySelectorAll("section, article, header, nav, .poster-section");

  // Hide all content initially
  contentSections.forEach(sec => sec.classList.add("fade-in"));

  setTimeout(() => {
    introOverlay.style.opacity = "0";
    setTimeout(() => {
      introOverlay.style.display = "none";
      contentSections.forEach(sec => sec.classList.add("show"));
    }, 1000);
  }, 6000); // matches chat bubbles
});

// Background Network Animation with gold particles
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 90;
let mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = 2;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    if (mouse.x && mouse.y) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x += dx * 0.02;
        this.y += dy * 0.02;
      }
    }
    this.draw();
  }
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = "rgba(255, 215, 0, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  connect();
  requestAnimationFrame(animate);
}

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});