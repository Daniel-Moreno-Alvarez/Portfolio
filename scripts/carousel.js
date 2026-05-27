const track = document.querySelector(".skills-track");
const items = document.querySelectorAll(".skill-item");

let position = 0;
let velocity = 0;

let isDragging = false;
let startX = 0;
let lastX = 0;
let lastTime = 0;

const speed = 0.5; // Velocidad del autoplay
const friction = 0.92;

/* =========================
   LOOP + ANIMACIÓN
========================= */
function animate() {
  if (!isDragging) {
    // Si se mueve por inercia o autoplay
    position -= speed;
    position += velocity;
    velocity *= friction;

    if (Math.abs(velocity) < 0.1) {
      velocity = 0;
    }
  }

  // Bucle infinito (asumiendo que el track está duplicado)
  const half = track.scrollWidth / 2;
  if (position <= -half) position += half;
  if (position >= 0) position -= half;

  // Renderizado optimizado con hardware acceleration
  track.style.transform = `translate3d(${position}px, 0, 0)`;

  applyEdgeAnim();

  requestAnimationFrame(animate);
}

// Iniciar la animación
if (items.length > 0) {
  animate();
}

/* =========================
   EVENTOS (MOUSE & TOUCH)
========================= */
function pointerDown(clientX) {
  isDragging = true;
  startX = clientX;
  lastX = clientX;
  lastTime = Date.now();
}

function pointerMove(clientX) {
  if (!isDragging) return;

  const now = Date.now();
  const dx = clientX - startX;
  
  position += dx;

  const dt = now - lastTime || 16;
  // Factor 16 para normalizar la velocidad a ~60fps
  velocity = ((clientX - lastX) / dt) * 16; 

  lastX = clientX;
  lastTime = now;
  startX = clientX;
}

function pointerUp() {
  if (!isDragging) return;
  isDragging = false;
}

// Mouse Listeners
track.addEventListener("mousedown", (e) => pointerDown(e.clientX));
window.addEventListener("mousemove", (e) => pointerMove(e.clientX));
window.addEventListener("mouseup", pointerUp);
window.addEventListener("mouseleave", () => { isDragging = false; });

// Touch Listeners (Soporte Móvil)
track.addEventListener("touchstart", (e) => pointerDown(e.touches[0].clientX), { passive: true });
window.addEventListener("touchmove", (e) => pointerMove(e.touches[0].clientX), { passive: true });
window.addEventListener("touchend", pointerUp);

/* =========================
   BLUR DINÁMICO LATERAL
========================= */
function applyEdgeAnim() {
  if (!items.length) return;

  const center = window.innerWidth / 2;

  const safeZone = 500;
  const maxDistance = (window.innerWidth / 2) - safeZone;

  items.forEach((item) => {

    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;

    const distanceToCenter = Math.abs(center - itemCenter);

    let t = 0;

    if (distanceToCenter > safeZone) {
      const distancePastSafeZone = distanceToCenter - safeZone;
      t = Math.min(distancePastSafeZone / maxDistance, 1);
    }

    const scale = 1.2 - t * 0.8; // más agresivo = más diferencia visual

    // opcional: ligera transparencia (recomendado)
    const opacity = 1 - t * 0.5;

    item.style.transform = `scale(${scale}) translateZ(0)`;
    item.style.opacity = opacity;
  });
}