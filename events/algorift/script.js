// Simple scroll animation
window.addEventListener('scroll', () => {
    const scrollElements = document.querySelectorAll('.scroll');
    scrollElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      }
    });
  });
  // script.js
const navbar = document.querySelector('.navbar');
const scrollElements = document.querySelectorAll('.scroll');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  // navbar background
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // reveal scroll cards
  scrollElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});

// parallax tilt hero
document.querySelector('.hero').addEventListener('mousemove', e => {
  const x = (window.innerWidth / 2 - e.pageX) / 50;
  const y = (window.innerHeight / 2 - e.pageY) / 50;
  heroContent.style.transform = `translateZ(60px) rotateX(${y}deg) rotateY(${x}deg)`;
});

// Hide loader when page fully loads
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  });

  tsParticles.load("sand-particles", {
    background: { color: "transparent" },
    particles: {
      number: { value: 150 },
      color: { value: "#d2b48c" }, // sand color
      opacity: { value: 0.3 },
      size: { value: 1.5, random: true },
      move: {
        enable: true,
        speed: 0.7,
        direction: "right", // blowing direction
        straight: false,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: { onHover: { enable: false } }
    }
  });
  const canvas = document.getElementById('sand-bg');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Particle Geometry
const particleCount = 2000; // number of grains
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 500; // X
  positions[i * 3 + 1] = (Math.random() - 0.5) * 500; // Y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 500; // Z
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle Material
const material = new THREE.PointsMaterial({
  color: 0xd2b48c, // sand color
  size: 0.8,
  transparent: true,
  opacity: 0.5,
});

// Points
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Camera position
camera.position.z = 100;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Slowly rotate field to simulate drifting dust
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0003;

  renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});