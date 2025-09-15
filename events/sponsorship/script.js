// Generate floating neon particles
const container = document.getElementById("particles");
for (let i = 0; i < 20; i++) {
  const dot = document.createElement("div");
  dot.className = "particle";
  dot.style.top = Math.random() * window.innerHeight + "px";
  dot.style.left = Math.random() * window.innerWidth + "px";
  dot.style.animationDelay = Math.random() * 6 + "s";
  container.appendChild(dot);
}

// Scroll reveal animation (info + logo same time)
const hiddenCards = document.querySelectorAll(".hidden-card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

hiddenCards.forEach(card => observer.observe(card));