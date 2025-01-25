<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php';

$banco = new DataBase();
$conn = $banco->getConn();

try{
    $query = "SELECT * FROM materia";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['message' => 'Matérias encontradas com sucesso!', 'materias' => $materias]);
}catch(Exception $e){
    http_response_code(500);
    echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
    exit;
}