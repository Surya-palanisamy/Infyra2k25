// Matrix Rain Effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 35);

// -------------------- INTRO HANDLER --------------------
window.addEventListener("load", () => {
  const intro = document.querySelector(".intro");
  const content = document.querySelector(".hidden-content");

  setTimeout(() => {
    intro.classList.add("hidden"); // fade out intro
    setTimeout(() => {
      content.classList.add("show"); // fade in main content
    }, 800);
  }, 3000); // intro stays for 3s
});

// -------------------- POSTER REVEAL HANDLER --------------------
const revealBtn = document.querySelector(".reveal-btn");
const terminal = document.getElementById("terminal");
const poster = document.getElementById("poster");

if (revealBtn) {
  revealBtn.addEventListener("click", () => {
    terminal.classList.remove("hidden");
    terminal.textContent = "";

    const message = [
      "Initializing poster reveal...",
      "Bypassing firewalls...",
      "Decrypting hidden content...",
      "Access granted. Poster unlocked."
    ];

    let line = 0;
    function typeLine() {
      if (line < message.length) {
        terminal.textContent += message[line] + "\n";
        line++;
        setTimeout(typeLine, 800);
      } else {
        poster.classList.remove("hidden");
        poster.classList.add("show");
      }
    }
    typeLine();
  });
}