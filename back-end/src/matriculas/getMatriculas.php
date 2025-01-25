<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php'; 

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$banco = new DataBase();
$conn = $banco->getConn();

$headers = getallheaders();

if (isset($headers['Authorization'])){
    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);
    try{
        $decoded = JWT::decode($token, new Key($_ENV['KEY'], 'HS256'));
        $idAluno = $decoded->id;
    }catch(Throwable $e){
        http_response_code(401);
        echo json_encode(['error' => 'Não Autorizado']);
        exit;
    }
    try{
        $query = "SELECT * FROM matriculas WHERE id_aluno = :id_aluno;";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_aluno', $idAluno);
        $stmt->execute();
        $matriculas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['message' => 'Matriculas encontradas com sucesso!', 'matriculas' => $matriculas]);
    }catch(Exception $e){
        http_response_code(500);
        echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Token de autenticação não encontrado']);
    exit;
}