// Referencias
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaRetos = document.getElementById('pantalla-retos');

const btnIniciar = document.getElementById('btn-iniciar');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnVolverInicio = document.getElementById('btn-volver-inicio');
const btnVolverInicio2 = document.getElementById('btn-volver-inicio-2');
const btnVolverJuego = document.getElementById('btn-volver-juego');

const contenedor = document.getElementById('constelaciones-container');
const mensajeDiv = document.getElementById('mensaje');

let constelaciones = [];

function mostrarPantalla(pantalla) {
  pantallaInicio.classList.remove('activo');
  pantallaJuego.classList.remove('activo');
  pantallaRetos.classList.remove('activo');
  pantalla.classList.add('activo');
}

function crearConstelaciones() {
  contenedor.innerHTML = "";
  constelaciones = [];

  datos.posiciones.forEach(pos => {
    const div = document.createElement('div');
    div.classList.add('constelacion');
    div.dataset.baseX = pos.x;
    div.dataset.baseY = pos.y;
    div.dataset.movX = pos.movX;
    div.dataset.movY = pos.movY;
    div.dataset.phase = Math.random() * 2 * Math.PI;
    div.textContent = "★";

    div.style.left = pos.x + '%';
    div.style.top = pos.y + '%';

    contenedor.appendChild(div);
    constelaciones.push(div);

    div.addEventListener('click', () => {
      constelaciones.forEach(c => c.classList.remove('activo'));
      div.classList.add('activo');
      mensajeDiv.textContent = datos.mensajes[pos.id] || "Sin mensaje";
    });
  });
}

function animarMovimiento(time = 0) {
  constelaciones.forEach(div => {
    const baseX = parseFloat(div.dataset.baseX);
    const baseY = parseFloat(div.dataset.baseY);
    const movX = parseFloat(div.dataset.movX);
    const movY = parseFloat(div.dataset.movY);
    const phase = parseFloat(div.dataset.phase);

    const offsetX = movX * Math.sin(time / 1000 + phase);
    const offsetY = movY * Math.cos(time / 1000 + phase);

    div.style.left = (baseX + offsetX) + '%';
    div.style.top = (baseY + offsetY) + '%';
  });

  requestAnimationFrame(animarMovimiento);
}

btnIniciar.addEventListener('click', () => {
  mostrarPantalla(pantallaJuego);
  crearConstelaciones();
  animarMovimiento();
});

btnSiguiente.addEventListener('click', () => {
  mostrarPantalla(pantallaRetos);
});

btnVolverInicio.addEventListener('click', () => {
  mostrarPantalla(pantallaInicio);
});

btnVolverInicio2.addEventListener('click', () => {
  mostrarPantalla(pantallaInicio);
});

btnVolverJuego.addEventListener('click', () => {
  mostrarPantalla(pantallaJuego);
});


  
  