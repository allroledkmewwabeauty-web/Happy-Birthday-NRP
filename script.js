// ===== MUSIC OVERLAY =====
const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");

startBtn.addEventListener("click", () => {
  music.play();
  overlay.style.display = "none";
  startConfetti(); // ← WAJIB
});

// ===== DATE TIME =====
const dateTime = document.getElementById("dateTime");

function updateTime() {
  const now = new Date();
  dateTime.innerText = now.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

setInterval(updateTime, 1000);
updateTime();

// ===== SLIDER =====
const slides = document.getElementById("slides");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function updateSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener("click", () => {
  index++;
  if (index > slides.children.length - 1) index = 0;
  updateSlide();
});

prev.addEventListener("click", () => {
  index--;
  if (index < 0) index = slides.children.length - 1;
  updateSlide();
});

// ===== CONFETTI HITAM–GOLD (FIX FINAL) =====
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) {
    console.error("Canvas confetti tidak ditemukan");
    return;
  }

  const ctx = canvas.getContext("2d");
  let particles = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function createParticles(count = 120) {
    const colors = ["#d4af37", "#b8860b", "#111111", "#ffffff"];
    particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 4 + 3,
        h: Math.random() * 12 + 8,
        vy: Math.random() * 1.8 + 1,
        vx: Math.random() * 0.6 - 0.3,
        r: Math.random() * Math.PI,
        vr: Math.random() * 0.03 - 0.015,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function draw() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.y += p.vy;
      p.x += p.vx;
      p.r += p.vr;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  // === EKSPOS KE GLOBAL (WAJIB) ===
  window.startConfetti = () => {
    if (running) return;
    running = true;
    createParticles();
    draw();
  };
});