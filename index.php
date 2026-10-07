<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>¿Quieres tener una cita conmigo?</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="luz" id="luz"></div>
  <div class="petalos" id="petalos"></div>

  <!-- PANTALLA 1: la pregunta -->
  <main class="pantalla activa" id="pregunta">
    <header class="barra"><span class="logo">A <i>♥</i> A</span><span class="mini">Una pregunta importante</span></header>
    <div class="cuerpo dos-col">
      <div class="texto">
        <p class="mini rojo">Para ti, con cariño</p>
        <h1>¿Quieres tener una <em>cita</em> conmigo?</h1>
        <p class="sub">Tengo un plan en mente, pero los detalles los eliges tú. Solo falta una respuesta...</p>
        <div class="acciones" id="acciones">
          <button class="btn-si" id="btnSi">♥ Sí, acepto</button>
          <button class="btn-no" id="btnNo">No</button>
        </div>
        <p class="error" id="error" role="alert">⚠ Error 404: esa opción no existe 💔</p>
      </div>
      <figure class="marco">
        <svg viewBox="0 0 300 380" class="rosa" aria-label="Rosa negra">
          <defs>
            <radialGradient id="p1" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#4a2a33"/><stop offset="1" stop-color="#120708"/></radialGradient>
            <radialGradient id="p2" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#6a2f41"/><stop offset="1" stop-color="#1b0a0e"/></radialGradient>
            <linearGradient id="tallo" x1="0" x2="1"><stop offset="0" stop-color="#0c1a10"/><stop offset="1" stop-color="#1f3a27"/></linearGradient>
          </defs>
          <path d="M148 215 C140 270 156 320 150 380 L160 380 C166 320 152 270 158 215Z" fill="url(#tallo)"/>
          <path d="M152 290 C110 270 90 285 80 310 C115 318 140 310 152 290Z" fill="#14281a"/>
          <ellipse cx="150" cy="150" rx="110" ry="100" fill="url(#p1)"/>
          <path d="M60 140 C50 80 110 40 150 55 C200 40 255 85 240 145 C235 200 190 235 150 235 C105 235 65 200 60 140Z" fill="url(#p2)" stroke="#2a0d14" stroke-width="2"/>
          <path d="M85 135 C80 95 120 70 150 80 C185 68 222 100 212 140 C205 180 175 200 150 200 C120 200 90 175 85 135Z" fill="url(#p1)" stroke="#3a1621" stroke-width="2"/>
          <path d="M110 130 C108 105 135 95 152 102 C175 95 195 115 190 138 C186 160 165 172 150 170 C130 170 112 155 110 130Z" fill="url(#p2)" stroke="#4a1c2a" stroke-width="2"/>
          <path d="M132 128 C132 114 150 110 160 118 C170 128 162 146 148 146 C136 146 130 138 132 128Z" fill="#1a090d" stroke="#5a2234" stroke-width="2"/>
          <path d="M140 126 C146 118 156 120 156 128" fill="none" stroke="#8a2a45" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="etiqueta">♥ para alguien <b>muy especial</b></span>
        <figcaption class="mini">Edición rosa negra</figcaption>
      </figure>
    </div>
    <footer class="pie mini"><span>Hecho con intención</span><span class="rojo">♥</span><span>Una cita, a tu manera</span></footer>
  </main>

  <!-- PANTALLA 2: eligen los detalles -->
  <main class="pantalla" id="plan">
    <header class="barra"><button class="volver" id="volver">‹ Volver</button><span class="logo">A <i>♥</i> A</span><span class="mini" id="contador">01 / 04</span></header>
    <div class="cuerpo angosto">
      <p class="mini rojo">Diseñemos la noche</p>
      <h2>Ahora tú eliges <em>cada detalle.</em></h2>
      <p class="sub">Quiero que esta cita sea exactamente como la imaginas.</p>

      <ol class="pasos" id="pasos">
        <li class="on">Fecha</li><li>Hora</li><li>Lugar</li><li>Comida</li>
      </ol>

      <section class="tarjeta">
        <div class="paso activo" data-paso="0">
          <p class="mini rojo">Fecha</p><h3>¿Qué día te apetece?</h3>
          <input type="date" id="fecha">
        </div>
        <div class="paso" data-paso="1">
          <p class="mini rojo">Hora</p><h3>¿A qué hora nos vemos?</h3>
          <input type="time" id="hora">
        </div>
        <div class="paso" data-paso="2">
          <p class="mini rojo">Lugar</p><h3>¿A dónde vamos?</h3>
          <div class="opciones" data-campo="lugar">
            <button>Restaurante íntimo</button><button>Mirador con vista</button><button>Parque al atardecer</button><button>Café acogedor</button><button>Un lugar secreto</button>
          </div>
          <input type="text" id="lugarOtro" placeholder="O escribe tu propio lugar...">
        </div>
        <div class="paso" data-paso="3">
          <p class="mini rojo">Comida</p><h3>¿Qué se te antoja?</h3>
          <div class="opciones" data-campo="comida">
            <button>Cena italiana</button><button>Sushi</button><button>Parrilla</button><button>Pizza</button><button>Solo postres</button>
          </div>
          <input type="text" id="comidaOtra" placeholder="O escribe lo que se te antoje...">
        </div>
        <div class="nav"><button class="btn-sig" id="siguiente" disabled>Siguiente ›</button></div>
      </section>
    </div>
  </main>

  <!-- PANTALLA 3: confirmación -->
  <main class="pantalla centrada" id="final">
    <div class="corazon">♥</div>
    <p class="mini rojo">La cita está reservada</p>
    <h2 class="grande">Entonces es un <em>sí.</em></h2>
    <p class="sub">No sabes cuánto me alegra. Ya tenemos una noche que esperar.</p>
    <div class="resumen">
      <p class="mini rojo">Nuestro plan</p>
      <h3 id="rFecha"></h3>
      <p id="rHoraLugar"></p>
      <p id="rComida"></p>
    </div>
    <button class="volver" id="cambiar">↻ Cambiar detalles</button>
  </main>

  <script src="script.js"></script>
</body>
</html>
