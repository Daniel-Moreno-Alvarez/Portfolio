const trigger = document.getElementById("pacman-trigger");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// porcentaje de veces que seguirá al ratón
const followChance = 0.5;

// Desktop
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Mobile
window.addEventListener("touchmove", (e) => {

  const touch = e.touches[0];

  mouseX = touch.clientX;
  mouseY = touch.clientY;

}, { passive: true });

trigger.addEventListener("click", () => {

  const pacman = document.createElement("div");
  pacman.id = "pacman";
  document.body.appendChild(pacman);

  // Ocultar icono
  document.querySelectorAll(".pacman-item").forEach(item => {
    item.classList.add("pacman-used");
  });

  const rect = trigger.getBoundingClientRect();

  let x = rect.left + rect.width / 2 - 32;
  let y = rect.top + rect.height / 2 - 32;

  const speed = 3;

  let dir = "none";

  const opposite = {
    left: "right",
    right: "left",
    up: "down",
    down: "up"
  };

  // =========================
  // TIMER DE DIRECCIÓN
  // =========================

  let directionTimer;

  function resetDirectionTimer(){
    clearTimeout(directionTimer);

    directionTimer = setTimeout(() => {
      setDirection();
    }, 500);
  }

  // =========================
  // CAMBIO DE DIRECCIÓN
  // =========================

  function setDirection(){

    const opposite = {
      left: "right",
      right: "left",
      up: "down",
      down: "up"
    };

    // =========================
    // SEGUIR AL RATÓN
    // =========================
    if (Math.random() < followChance) {

      const dx = mouseX - x;
      const dy = mouseY - y;

      let newDir;

      if (Math.abs(dx) > Math.abs(dy)) {
        newDir = dx > 0 ? "right" : "left";
      } else {
        newDir = dy > 0 ? "down" : "up";
      }

      // ❌ evitar siempre ir hacia atrás
      if (newDir !== opposite[dir]) {
        dir = newDir;
      }

    } 
    // =========================
    // MOVIMIENTO ALEATORIO
    // =========================
    else {

      const dirs = ["left", "right", "up", "down"];

      const filtered = dirs.filter(d => d !== opposite[dir]);

      dir = filtered[Math.floor(Math.random() * filtered.length)];
    }

    resetDirectionTimer();
  }

  setDirection();
  resetDirectionTimer();

  // =========================
  // MOVIMIENTO
  // =========================

  function move(){

    switch(dir){

      case "right":
        x += speed;
        pacman.style.transform = "scaleX(1)";
        break;

      case "left":
        x -= speed;
        pacman.style.transform = "scaleX(-1)";
        break;

      case "up":
        y -= speed;
        pacman.style.transform = "rotate(-90deg)";
        break;

      case "down":
        y += speed;
        pacman.style.transform = "rotate(90deg)";
        break;
    }

    // =========================
    // COLISIONES CON LOS BORDES
    // =========================

    if(x <= 0){
      x = 0;
      dir = "right";
      resetDirectionTimer();
    }

    if(x >= window.innerWidth - 64){
      x = window.innerWidth - 64;
      dir = "left";
      resetDirectionTimer();
    }

    if(y <= 0){
      y = 0;
      dir = "down";
      resetDirectionTimer();
    }

    if(y >= window.innerHeight - 64){
      y = window.innerHeight - 64;
      dir = "up";
      resetDirectionTimer();
    }

    pacman.style.left = x + "px";
    pacman.style.top = y + "px";

    requestAnimationFrame(move);
  }

  move();

});