// === FONDO DE ESTRELLAS PARPADEANTES ===
const cvs = document.getElementById('stars-canvas');
const ctx = cvs.getContext('2d', { alpha: true });

function fit() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  cvs.width = Math.floor(innerWidth * dpr);
  cvs.height = Math.floor(innerHeight * dpr);
  cvs.style.width = innerWidth + 'px';
  cvs.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
fit();
addEventListener('resize', fit);

const STARS = [];
const COUNT = 220;
for (let i = 0; i < COUNT; i++) {
  STARS.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.8 + 0.4,
    s: Math.random() * 0.4 + 0.1,
    a: Math.random() * 0.6 + 0.3,
    t: Math.random() * Math.PI * 2,
    l: Math.random() < 0.02
  });
}

// === CONSTELACIONES (ejemplo) ===
const constelaciones = [
  {
    nombre: "Orión",
    puntos: [{ x: 200, y: 150 }, { x: 240, y: 200 }, { x: 280, y: 160 }, { x: 320, y: 210 }],
    color: "white",
    mensaje: "✨ Alcanzas la fuerza de un cazador estelar."
  },
  {
    nombre: "Casiopea",
    puntos: [{ x: 500, y: 300 }, { x: 540, y: 260 }, { x: 580, y: 310 }, { x: 620, y: 270 }],
    color: "white",
    mensaje: "💫 Brillas con la sabiduría de los cielos."
  },
  {
    nombre: "Cruz del Sur",
    puntos: [{ x: 800, y: 400 }, { x: 820, y: 450 }, { x: 780, y: 420 }, { x: 760, y: 460 }],
    color: "white",
    mensaje: "🌟 Tu luz guía a quienes se han perdido."
  }
];

// === FUNCIÓN PARA DIBUJAR CONSTELACIONES ===
function dibujarConstelaciones() {
  constelaciones.forEach(c => {
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(c.puntos[0].x, c.puntos[0].y);
    for (let i = 1; i < c.puntos.length; i++) {
      ctx.lineTo(c.puntos[i].x, c.puntos[i].y);
    }
    ctx.stroke();

    // Dibujar estrellas
    c.puntos.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
  });
}

// === DETECTAR CLICK EN UNA CONSTELACIÓN ===
cvs.addEventListener("click", (e) => {
  const rect = cvs.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  constelaciones.forEach(c => {
    c.puntos.forEach(p => {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      if (Math.sqrt(dx * dx + dy * dy) < 8) {
        c.color = "#FFD700"; // Cambiar a dorado
        mostrarMensaje(c.mensaje);
      }
    });
  });
});

// === MENSAJE LINDO ===
function mostrarMensaje(texto) {
  const msg = document.createElement("div");
  msg.textContent = texto;
  msg.style.position = "absolute";
  msg.style.top = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.padding = "10px 20px";
  msg.style.background = "rgba(0,0,0,0.7)";
  msg.style.color = "white";
  msg.style.borderRadius = "10px";
  msg.style.fontSize = "18px";
  msg.style.zIndex = "10";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// === LOOP DE ANIMACIÓN ===
let last = performance.now();
function loop(now = 0) {
  const dt = Math.min(32, now - last);
  last = now;

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  // estrellas normales
  for (const st of STARS) {
    st.y += st.s * (dt * 0.06);
    if (st.y > innerHeight + 4) { st.y = -4; st.x = Math.random() * innerWidth; }

    // parpadeo
    st.t += 0.02 + Math.random() * 0.01;
    const tw = 0.6 + Math.sin(st.t) * 0.4;
    const alpha = Math.max(0.15, Math.min(1, st.a * tw));

    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fill();

    // fugaces
    if (st.l && Math.random() < 0.005) {
      const len = 60 + Math.random() * 80;
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(st.x - len, st.y + len * 0.2);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  dibujarConstelaciones();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
