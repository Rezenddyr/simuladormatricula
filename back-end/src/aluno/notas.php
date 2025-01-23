<?php
ini_set('display_errors', 0);
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php'; 

use Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$banco = new DataBase();
$conn = $banco->getConn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Consulta para obter todas as matérias
        $query = "SELECT nome FROM materia";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        // Busca os resultados e os organiza em um array
        $materias = $stmt->fetchAll(PDO::FETCH_COLUMN);

        // Retorna as matérias em formato JSON
        echo json_encode($materias);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro no servidor: " . $e->getMessage()]);
        exit;
    }
}

// Método não permitido
http_response_code(405);
echo json_encode(["error" => "Método não permitido"]);
?>
