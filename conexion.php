<?php
// Conexión a MySQL.
// En Railway toma los datos de las variables del servicio MySQL.
// En tu PC (XAMPP, etc.) usa los valores de la derecha.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$host     = getenv('MYSQLHOST')     ?: 'localhost';
$puerto   = (int)(getenv('MYSQLPORT') ?: 3306);
$usuario  = getenv('MYSQLUSER')     ?: 'root';
$clave    = getenv('MYSQLPASSWORD') ?: '';
$basedatos = getenv('MYSQLDATABASE') ?: 'railway';

$conexion = new mysqli($host, $usuario, $clave, $basedatos, $puerto);
$conexion->set_charset('utf8mb4');
