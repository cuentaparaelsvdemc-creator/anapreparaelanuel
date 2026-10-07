// =====================================================
//  VARIABLES (aquí están todas juntas para que las veas)
// =====================================================

// --- Lo que elige ella (se llenan con los inputs) ---
let fecha  = '';   // viene del input de fecha  -> "2030-06-15"
let hora   = '';   // viene del input de hora   -> "19:30"
let lugar  = '';   // botón de lugar o texto propio
let comida = '';   // botón de comida o texto propio

// --- Inputs del HTML ---
const inputFecha      = document.querySelector('#fecha');
const inputHora       = document.querySelector('#hora');
const inputLugarOtro  = document.querySelector('#lugarOtro');
const inputComidaOtra = document.querySelector('#comidaOtra');

// --- Botones ---
const btnSi        = document.querySelector('#btnSi');
const btnNo        = document.querySelector('#btnNo');
const btnSiguiente = document.querySelector('#siguiente');
const btnVolver    = document.querySelector('#volver');
const btnCambiar   = document.querySelector('#cambiar');
const opcionesLugar  = document.querySelector('[data-campo="lugar"]');
const opcionesComida = document.querySelector('[data-campo="comida"]');

// --- Otros elementos ---
const zonaBotones = document.querySelector('#acciones');
const mensajeError = document.querySelector('#error');
const contador = document.querySelector('#contador');
const contPetalos = document.querySelector('#petalos');
const luz = document.querySelector('#luz');

// --- Control ---
let escalaSi = 1;   // tamaño actual del botón Sí
let paso = 0;       // 0 fecha, 1 hora, 2 lugar, 3 comida

// =====================================================
//  FUNCIONES
// =====================================================
function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  window.scrollTo(0, 0);
}

function petalos(cantidad = 40) {
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement('span');
    p.className = 'petalo' + (Math.random() < 0.4 ? ' negro' : '');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = 3 + Math.random() * 3 + 's';
    p.style.animationDelay = Math.random() * 1.2 + 's';
    contPetalos.appendChild(p);
    setTimeout(() => p.remove(), 8000);
  }
}

// ¿Ya eligió lo del paso actual?
function pasoValido() {
  return [fecha, hora, lugar, comida][paso] !== '';
}

function irAPaso(n) {
  paso = n;
  document.querySelectorAll('.paso').forEach((p, i) => p.classList.toggle('activo', i === n));
  document.querySelectorAll('#pasos li').forEach((li, i) => {
    li.classList.toggle('on', i === n);
    li.classList.toggle('hecho', i < n);
  });
  contador.textContent = `0${n + 1} / 04`;
  btnSiguiente.textContent = n === 3 ? 'Confirmar ♥' : 'Siguiente ›';
  btnSiguiente.disabled = !pasoValido();
}

// Envía la cita al servidor (que la guarda en la base de datos de Railway)
async function guardarCita() {
  try {
    await fetch('guardar.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fecha, hora, lugar, comida })
    });
  } catch (error) {
    console.error('No se pudo guardar la cita', error);
  }
}

function mostrarResumen() {
  guardarCita();
  const [a, m, d] = fecha.split('-').map(Number);
  const fechaTexto = new Date(a, m - 1, d)
    .toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  document.querySelector('#rFecha').textContent = fechaTexto;
  document.querySelector('#rHoraLugar').textContent = `${hora} · ${lugar}`;
  document.querySelector('#rComida').textContent = comida;
  mostrar('final');
  petalos(70);
}

// Conecta un grupo de botones + su input de texto con una variable
function conectarOpciones(grupo, inputOtro, guardar) {
  grupo.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    grupo.querySelectorAll('button').forEach(b => b.classList.remove('sel'));
    e.target.classList.add('sel');
    inputOtro.value = '';
    guardar(e.target.textContent);
    btnSiguiente.disabled = !pasoValido();
  });
  inputOtro.addEventListener('input', () => {
    grupo.querySelectorAll('button').forEach(b => b.classList.remove('sel'));
    guardar(inputOtro.value.trim());
    btnSiguiente.disabled = !pasoValido();
  });
}

// =====================================================
//  EVENTOS
// =====================================================
document.addEventListener('pointermove', e => {
  luz.style.setProperty('--x', e.clientX + 'px');
  luz.style.setProperty('--y', e.clientY + 'px');
});

// "No": solo muestra el error; el "Sí" crece y cambia de lugar
btnNo.addEventListener('click', () => {
  mensajeError.classList.remove('ver');
  void mensajeError.offsetWidth;
  mensajeError.classList.add('ver');

  escalaSi = Math.min(escalaSi + 0.25, 2.4);
  const ancho = btnSi.offsetWidth * escalaSi;
  const alto = btnSi.offsetHeight * escalaSi;
  const x = Math.max(0, Math.random() * (Math.min(zonaBotones.clientWidth, 480) - ancho));
  const y = Math.max(0, Math.random() * (zonaBotones.clientHeight - alto));
  btnSi.style.left = x + 'px';
  btnSi.style.top = y + 'px';
  btnSi.style.transform = `scale(${escalaSi})`;
});

// "Sí": pétalos y pasa a elegir los detalles
btnSi.addEventListener('click', () => {
  petalos(60);
  setTimeout(() => { mostrar('plan'); irAPaso(0); }, 700);
});

// Inputs -> variables
inputFecha.addEventListener('input', () => { fecha = inputFecha.value; btnSiguiente.disabled = !pasoValido(); });
inputHora.addEventListener('input',  () => { hora  = inputHora.value;  btnSiguiente.disabled = !pasoValido(); });
conectarOpciones(opcionesLugar,  inputLugarOtro,  v => lugar  = v);
conectarOpciones(opcionesComida, inputComidaOtra, v => comida = v);

btnSiguiente.addEventListener('click', () => {
  if (paso < 3) irAPaso(paso + 1);
  else mostrarResumen();
});
btnVolver.addEventListener('click', () => { if (paso > 0) irAPaso(paso - 1); else mostrar('pregunta'); });
btnCambiar.addEventListener('click', () => { mostrar('plan'); irAPaso(0); });
