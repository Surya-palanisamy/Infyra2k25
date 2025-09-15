// Image data for coverflow
const imageData = [
  {
    title: "AI & Machine Learning Workshop",
    description: "Dive deep into artificial intelligence and machine learning with hands-on sessions",
  },
  {
    title: "Cybersecurity Panel Discussion",
    description: "Learn from industry experts about latest cybersecurity threats and defense strategies",
  },
  {
    title: "Coding Challenge Competition",
    description: "Test your programming skills in our competitive coding challenge with exciting prizes",
  },
  {
    title: "IoT Innovations Talk",
    description: "Explore the Internet of Things and its revolutionary impact on modern technology",
  },
  {
    title: "Project Exhibition Showcase",
    description: "Showcase your innovative projects and learn from fellow participants' creative solutions",
  },
  {
    title: "Tech Quiz Competition",
    description: "Challenge your technical knowledge in our exciting quiz competition with amazing prizes",
  },
  {
    title: "INFYRA'24 Tech Fest",
    description: "National Level Tech Fest - Innovate, Integrate, Inspire",
  },
]

// Video data for grid
const videoData = [
  { src: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4" },
  { src: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4" },
]

// State variables for video grid
let hovered = null
const hoverSize = 6
const gapSize = 4
let showFrames = false
let autoplayMode = "all"

// Coverflow variables
const items = document.querySelectorAll(".coverflow-item")
const dotsContainer = document.getElementById("dots")
let currentIndex = 0
let autoplayInterval
let isAnimating = false

// Generate Matrix Rain Effect
function generateMatrixRain() {
  const matrixRain = document.getElementById("matrixRain")
  if (!matrixRain) return

  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
  const columns = Math.floor(window.innerWidth / 20)

  for (let i = 0; i < columns; i++) {
    const column = document.createElement("div")
    column.className = "matrix-column"
    column.style.left = `${i * 20}px`
    column.style.animationDuration = `${Math.random() * 5 + 10}s`
    column.style.animationDelay = `${Math.random() * 5}s`

    let text = ""
    const charCount = Math.floor(Math.random() * 20 + 10)
    for (let j = 0; j < charCount; j++) {
      text += characters[Math.floor(Math.random() * characters.length)] + " "
    }
    column.textContent = text

    matrixRain.appendChild(column)
  }
}

// Generate Floating Particles
function generateParticles() {
  const particlesContainer = document.getElementById("particlesContainer")
  if (!particlesContainer) return

  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = `${Math.random() * 100}%`
    particle.style.animationDelay = `${Math.random() * 20}s`
    particle.style.animationDuration = `${Math.random() * 10 + 20}s`

    particlesContainer.appendChild(particle)
  }
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.getElementById("header")
  if (!header) return

  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}

// Sidebar functions
// Sidebar functions
function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");

  if (sidebar) {
    sidebar.classList.add("open");
    menuIcon.style.display = "none"; // hide hamburger
  }

  // Add event listener for outside click
  document.addEventListener("click", handleOutsideClick);
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");

  if (sidebar) {
    sidebar.classList.remove("open");
    menuIcon.style.display = "block"; // show hamburger
  }

  // Remove outside click listener when closed
  document.removeEventListener("click", handleOutsideClick);
}

function handleOutsideClick(event) {
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");

  if (
    sidebar &&
    !sidebar.contains(event.target) && // click not inside sidebar
    !menuIcon.contains(event.target)   // click not on hamburger
  ) {
    closeSidebar();
  }
}


// Coverflow functionality
function initializeCoverflow() {
  if (!items.length || !dotsContainer) return

  // Create dots
  items.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.className = "dot"
    dot.onclick = () => goToIndex(index)
    dotsContainer.appendChild(dot)
  })

  updateCoverflow()
  startAutoplay()

  // Click on items to select
  items.forEach((item, index) => {
    item.addEventListener("click", () => goToIndex(index))
  })
}

function updateCoverflow() {
  if (isAnimating || !items.length) return
  isAnimating = true

  const dots = document.querySelectorAll(".dot")

  items.forEach((item, index) => {
    let offset = index - currentIndex

    if (offset > items.length / 2) {
      offset = offset - items.length
    } else if (offset < -items.length / 2) {
      offset = offset + items.length
    }

    const absOffset = Math.abs(offset)
    const sign = Math.sign(offset)

    let translateX = offset * 180
    const translateZ = -absOffset * 150
    const rotateY = -sign * Math.min(absOffset * 45, 45)
    let opacity = 1 - absOffset * 0.2
    const scale = 1 - absOffset * 0.1

    if (absOffset > 3) {
      opacity = 0
      translateX = sign * 600
    }

    item.style.transform = `
            translateX(${translateX}px) 
            translateZ(${translateZ}px) 
            rotateY(${rotateY}deg)
            scale(${scale})
        `
    item.style.opacity = opacity
    item.style.zIndex = 100 - absOffset

    item.classList.toggle("active", index === currentIndex)
  })

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex)
  })

  setTimeout(() => {
    isAnimating = false
  }, 600)
}

function goToIndex(index) {
  if (isAnimating || index === currentIndex || !items.length) return
  currentIndex = index
  updateCoverflow()
}

function startAutoplay() {
  if (!items.length) return

  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length
    updateCoverflow()
  }, 4000)
}

// Countdown functionality
const FULL_CIRCUMFERENCE = 2 * Math.PI * 45 // 2πr, r=45

function setProgress(id, value, max) {
  const circle = document.getElementById(id)
  if (!circle) return

  const progress = FULL_CIRCUMFERENCE - (value / max) * FULL_CIRCUMFERENCE
  circle.style.strokeDashoffset = progress
}

function startCountdown(targetDate) {
  function update() {
    const now = new Date().getTime()
    let remaining = targetDate - now

    if (remaining < 0) remaining = 0

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    const hrs = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    const secs = Math.floor((remaining % (1000 * 60)) / 1000)

    // Update numbers
    const daysEl = document.getElementById("days")
    const hoursEl = document.getElementById("hours")
    const minutesEl = document.getElementById("minutes")
    const secondsEl = document.getElementById("seconds")

    if (daysEl) daysEl.textContent = String(days).padStart(3, "0")
    if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, "0")
    if (minutesEl) minutesEl.textContent = String(mins).padStart(2, "0")
    if (secondsEl) secondsEl.textContent = String(secs).padStart(2, "0")

    // Update circles
    setProgress("days-progress", days % 365, 365)
    setProgress("hours-progress", hrs, 24)
    setProgress("minutes-progress", mins, 60)
    setProgress("seconds-progress", secs, 60)

    requestAnimationFrame(update)
  }
  update()
}

// Video grid functionality
function initializeVideoGrid() {
  const gridContainer = document.getElementById("grid-container")
  const frameToggle = document.getElementById("frame-toggle")
  const autoplayToggle = document.getElementById("autoplay-toggle")

  if (!gridContainer) return

  // Create video frames
  videoData.forEach((video, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3

    const frameItem = document.createElement("div")
    frameItem.className = "frame-item"
    frameItem.dataset.row = row
    frameItem.dataset.col = col

    frameItem.innerHTML = `
            <div class="frame-component">
                <div class="video-container">
                    <div class="video-wrapper">
                        <video class="frame-video" loop muted playsinline autoplay>
                            <source src="${video.src}" type="video/mp4">
                        </video>
                    </div>
                </div>
                <div class="frame-borders">
                    <!-- Frame borders would go here -->
                </div>
            </div>
        `

    gridContainer.appendChild(frameItem)
  })

  setupVideoGridEventListeners()
  updateGrid()
}

function setupVideoGridEventListeners() {
  const frameToggle = document.getElementById("frame-toggle")
  const autoplayToggle = document.getElementById("autoplay-toggle")

  // Frame toggle
  if (frameToggle) {
    frameToggle.addEventListener("change", function () {
      showFrames = this.checked
      toggleFrameBorders()
    })
  }

  // Autoplay toggle
  if (autoplayToggle) {
    autoplayToggle.addEventListener("change", function () {
      autoplayMode = this.checked ? "all" : "hover"
      handleAutoplayChange()
    })
  }

  // Grid hover events
  const frameItems = document.querySelectorAll(".frame-item")
  frameItems.forEach((item, index) => {
    const row = Number.parseInt(item.dataset.row)
    const col = Number.parseInt(item.dataset.col)

    item.addEventListener("mouseenter", () => {
      hovered = { row, col }
      updateGrid()
      handleVideoHover(item, true)
    })

    item.addEventListener("mouseleave", () => {
      hovered = null
      updateGrid()
      handleVideoHover(item, false)
    })
  })
}

function updateGrid() {
  const gridContainer = document.getElementById("grid-container")
  if (!gridContainer) return

  const rowSizes = getRowSizes()
  const colSizes = getColSizes()

  gridContainer.style.gridTemplateRows = rowSizes
  gridContainer.style.gridTemplateColumns = colSizes
  gridContainer.style.gap = `${gapSize}px`
}

function getRowSizes() {
  if (hovered === null) {
    return "4fr 4fr 4fr"
  }
  const nonHoveredSize = (12 - hoverSize) / 2
  return [0, 1, 2].map((r) => (r === hovered.row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
}

function getColSizes() {
  if (hovered === null) {
    return "4fr 4fr 4fr"
  }
  const nonHoveredSize = (12 - hoverSize) / 2
  return [0, 1, 2].map((c) => (c === hovered.col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
}

function toggleFrameBorders() {
  const frameBorders = document.querySelectorAll(".frame-borders")
  frameBorders.forEach((border) => {
    if (showFrames) {
      border.classList.add("show")
    } else {
      border.classList.remove("show")
    }
  })
}

function handleAutoplayChange() {
  const videos = document.querySelectorAll(".frame-video")
  videos.forEach((video) => {
    if (autoplayMode === "all") {
      safeVideoPlay(video)
    } else {
      safeVideoPause(video)
    }
  })
}

function handleVideoHover(frameItem, isEntering) {
  const video = frameItem.querySelector(".frame-video")

  if (autoplayMode === "hover") {
    if (isEntering) {
      safeVideoPlay(video)
    } else {
      safeVideoPause(video)
    }
  }
}

function safeVideoPlay(video) {
  if (!video || !video.isConnected) return

  try {
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Silently handle play interruption errors
        if (error.name !== "AbortError") {
          console.log("Video play interrupted:", error)
        }
      })
    }
  } catch (error) {
    console.log("Video play error:", error)
  }
}

function safeVideoPause(video) {
  if (!video || !video.isConnected) return

  try {
    video.pause()
  } catch (error) {
    console.log("Video pause error:", error)
  }
}

// Register button functionality
function initializeRegisterButton() {
  const registerBtn = document.querySelector(".register-btn")
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      alert("Registration functionality would be implemented here!")
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize background effects
  generateMatrixRain()
  generateParticles()

  // Initialize components
  initializeCoverflow()
  initializeVideoGrid()
  initializeRegisterButton()

  // Set target event date (adjust as needed)
  const targetDate = new Date("Sep 25, 2025 00:00:00").getTime()
  startCountdown(targetDate)

  // Add scroll listener for header
  window.addEventListener("scroll", handleHeaderScroll)
})

// Make sidebar functions globally available
window.openSidebar = openSidebar
window.closeSidebar = closeSidebar
   document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.fullName || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
 function animateTimelineOnScroll() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            timelineItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
animateTimelineOnScroll();
// Initialize EmailJS
(function () {
  emailjs.init("mmIp8j1yZorOYOhIL"); // your public key
})();

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("formStatus");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    statusDiv.innerText = "⏳ Sending message...";

    emailjs.sendForm("service_op2q0xd", "template_e8e2pf4", this)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        statusDiv.innerText = "✅ Message sent successfully!";
        form.reset();
      }, function (error) {
        console.error("FAILED...", error);
        statusDiv.innerText = "❌ Failed to send message. Check console.";
      });
  });
});

  document.addEventListener('DOMContentLoaded', function () {
                // --- CORRECTED HAMBURGER MENU LOGIC ---
                const menuToggle = document.getElementById('menuToggle');
                const sidebar = document.getElementById('sidebar');

                if (menuToggle && sidebar) {
                    menuToggle.addEventListener('click', function () {
                        sidebar.classList.toggle('open');
                        menuToggle.classList.toggle('active');
                    });
                }

                // Close sidebar on outside click
                document.addEventListener("click", (e) => {
                    if (sidebar.classList.contains("open") &&
                        !sidebar.contains(e.target) &&
                        !menuToggle.contains(e.target)) {
                        sidebar.classList.remove("open");
                        menuToggle.classList.remove('active');
                    }
                });

                // Header scroll effect
                window.addEventListener('scroll', () => {
                    const header = document.getElementById('header');
                    if (header) {
                        if (window.scrollY > 50) {
                            header.classList.add('scrolled');
                        } else {
                            header.classList.remove('scrolled');
                        }
                    }
                });
            });
        