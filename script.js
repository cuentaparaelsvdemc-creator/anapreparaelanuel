// ---------- Utilidades ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function mostrar(id) {
  $$('.pantalla').forEach(p => p.classList.remove('activa'));
  $('#' + id).classList.add('activa');
  window.scrollTo(0, 0);
}

// Luz roja que sigue al mouse
document.addEventListener('pointermove', e => {
  const l = $('#luz');
  l.style.setProperty('--x', e.clientX + 'px');
  l.style.setProperty('--y', e.clientY + 'px');
});

// Pétalos que caen
function petalos(n = 40) {
  const cont = $('#petalos');
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'petalo' + (Math.random() < 0.4 ? ' negro' : '');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = 3 + Math.random() * 3 + 's';
    p.style.animationDelay = Math.random() * 1.2 + 's';
    cont.appendChild(p);
    setTimeout(() => p.remove(), 8000);
  }
}

// ---------- Pantalla 1: botones Sí / No ----------
const btnSi = $('#btnSi'), btnNo = $('#btnNo'), zona = $('#acciones'), error = $('#error');
let escala = 1;

// El "No" no hace nada, solo muestra el error. El "Sí" crece y cambia de lugar.
btnNo.addEventListener('click', () => {
  error.classList.remove('ver'); void error.offsetWidth; error.classList.add('ver');
  escala = Math.min(escala + 0.25, 2.4);

  const zw = zona.clientWidth, zh = zona.clientHeight;
  const bw = btnSi.offsetWidth * escala, bh = btnSi.offsetHeight * escala;
  const x = Math.max(0, Math.random() * (Math.min(zw, 480) - bw));
  const y = Math.max(0, Math.random() * (zh - bh));
  btnSi.style.left = x + 'px';
  btnSi.style.top = y + 'px';
  btnSi.style.transform = `scale(${escala})`;
});

btnSi.addEventListener('click', () => {
  petalos(60);
  setTimeout(() => { mostrar('plan'); irAPaso(0); }, 700);
});

// ---------- Pantalla 2: elegir detalles ----------
const datos = { fecha: '', hora: '', lugar: '', comida: '' };
const campos = ['fecha', 'hora', 'lugar', 'comida'];
let paso = 0;
const sig = $('#siguiente');

function valido() { return !!datos[campos[paso]]; }

function irAPaso(n) {
  paso = n;
  $$('.paso').forEach((p, i) => p.classList.toggle('activo', i === n));
  $$('#pasos li').forEach((li, i) => {
    li.classList.toggle('on', i === n);
    li.classList.toggle('hecho', i < n);
  });
  $('#contador').textContent = `0${n + 1} / 04`;
  sig.textContent = n === 3 ? 'Confirmar ♥' : 'Siguiente ›';
  sig.disabled = !valido();
}

$('#fecha').addEventListener('input', e => { datos.fecha = e.target.value; sig.disabled = !valido(); });
$('#hora').addEventListener('input', e => { datos.hora = e.target.value; sig.disabled = !valido(); });

// Opciones tipo botón (lugar y comida) + campo de texto propio
$$('.opciones').forEach(grupo => {
  const campo = grupo.dataset.campo;
  const otro = campo === 'lugar' ? $('#lugarOtro') : $('#comidaOtra');
  grupo.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    $$('button', grupo).forEach(b => b.classList.remove('sel'));
    e.target.classList.add('sel');
    otro.value = '';
    datos[campo] = e.target.textContent;
    sig.disabled = !valido();
  });
  otro.addEventListener('input', () => {
    $$('button', grupo).forEach(b => b.classList.remove('sel'));
    datos[campo] = otro.value.trim();
    sig.disabled = !valido();
  });
});

sig.addEventListener('click', () => {
  if (paso < 3) return irAPaso(paso + 1);
  mostrarResumen();
});

$('#volver').addEventListener('click', () => {
  if (paso > 0) irAPaso(paso - 1); else mostrar('pregunta');
});

// ---------- Pantalla 3: resumen ----------
function mostrarResumen() {
  const [a, m, d] = datos.fecha.split('-').map(Number);
  const fechaTxt = new Date(a, m - 1, d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  $('#rFecha').textContent = fechaTxt;
  $('#rHoraLugar').textContent = `${datos.hora} · ${datos.lugar}`;
  $('#rComida').textContent = datos.comida;
  mostrar('final');
  petalos(70);
}

$('#cambiar').addEventListener('click', () => { mostrar('plan'); irAPaso(0); });
