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

$banco = new DataBase();
$conn = $banco->getConn();

$headers = getallheaders();

$dados = json_decode(file_get_contents('php://input'), true);
if (isset($headers['Authorization'])){
    if (isset($dados['id_materia_feita'], $dados['nota'])){
        try{
        $query = "UPDATE materias_feitas SET nota = :nota WHERE id = :id_materia_feita";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':nota', $dados['nota']);
        $stmt->bindParam(':id_materia_feita', $dados['id_materia_feita']);
        $stmt->execute();
        echo json_encode(['message' => 'Nota inserida com sucesso!']);
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
            exit;
        }
    }else{
        http_response_code(400);
        echo json_encode(['error' => 'Dados incompletos']);
        exit;
    }
}else{
    http_response_code(400);
    echo json_encode(['error' => 'Token de autenticação não encontrado']);
    exit;
}