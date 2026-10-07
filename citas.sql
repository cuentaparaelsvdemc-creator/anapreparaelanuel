-- Tabla para guardar lo que elige ella en la web de la cita
-- Versión MySQL / MariaDB

CREATE TABLE IF NOT EXISTS citas (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  fecha      DATE         NOT NULL,   -- input de fecha  (ej: 2030-06-15)
  hora       TIME         NOT NULL,   -- input de hora   (ej: 19:30)
  lugar      VARCHAR(150) NOT NULL,   -- lugar elegido o escrito
  comida     VARCHAR(150) NOT NULL,   -- comida elegida o escrita
  creada_en  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ejemplo de cómo se guarda una respuesta
INSERT INTO citas (fecha, hora, lugar, comida)
VALUES ('2030-06-15', '19:30', 'Un lugar secreto', 'Cena italiana');

-- Ver lo guardado
SELECT * FROM citas;

-- Si usas PostgreSQL, cambia la primera línea de la tabla por:
--   id SERIAL PRIMARY KEY,
-- Si usas SQLite, cámbiala por:
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   y usa TEXT en lugar de DATE, TIME y VARCHAR(150).
