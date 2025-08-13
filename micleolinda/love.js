// Abrir y cerrar el sobre con click o teclado
const secretBox = document.getElementById('secretBox');

secretBox.addEventListener('click', () => {
  secretBox.classList.toggle('open');
  // Actualizar aria-pressed para accesibilidad
  const pressed = secretBox.getAttribute('aria-pressed') === 'true';
  secretBox.setAttribute('aria-pressed', !pressed);
});

// Abrir con tecla Enter o espacio para accesibilidad
secretBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    secretBox.click();
  }
});

// --- Animación constelaciones en canvas ---
const canvas = document.createElement('canvas');
canvas.id = 'starsCanvas';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// Crear estrellas
const starsCount = 120;
const stars = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < starsCount; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomRange(0.8, 1.5),
    alpha: randomRange(0.3, 1),
    alphaChange: randomRange(0.002, 0.007),
  });
}

// Dibujar estrellas y animar brillo
function drawStars() {
  ctx.clearRect(0, 0, width, height);

  for (let star of stars) {
    star.alpha += star.alphaChange;
    if (star.alpha <= 0.3 || star.alpha >= 1) star.alphaChange = -star.alphaChange;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha.toFixed(2)})`;
    ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha.toFixed(2)})`;
    ctx.shadowBlur = 4;
    ctx.fill();
  }

  // Opcional: dibujar líneas estilo constelación (uniones entre estrellas)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 0.6;

  for (let i = 0; i < starsCount; i++) {
    for (let j = i + 1; j < starsCount; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawStars);
}

drawStars();



