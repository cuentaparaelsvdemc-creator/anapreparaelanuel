<?php
// Recibe fecha, hora, lugar y comida desde script.js y los guarda en la tabla "citas".
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

$datos  = json_decode(file_get_contents('php://input'), true) ?? [];
$fecha  = $datos['fecha']  ?? '';
$hora   = $datos['hora']   ?? '';
$lugar  = trim($datos['lugar']  ?? '');
$comida = trim($datos['comida'] ?? '');

$fechaOk = preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha) === 1;
$horaOk  = preg_match('/^\d{2}:\d{2}$/', $hora) === 1;
if (!$fechaOk || !$horaOk || $lugar === '' || $comida === '' || mb_strlen($lugar) > 150 || mb_strlen($comida) > 150) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Datos inválidos']);
    exit;
}

try {
    require 'conexion.php';
    $stmt = $conexion->prepare('INSERT INTO citas (fecha, hora, lugar, comida) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $fecha, $hora, $lugar, $comida);
    $stmt->execute();
    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo guardar']);
}
