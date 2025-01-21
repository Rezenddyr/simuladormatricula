<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php';

$banco = new DataBase();
$conn = $banco->getConn();

$dados = json_decode(file_get_contents('php://input'), true);

if (isset($dados['id'])) {
    $id_aluno = (int) $dados['id'];
        $query = "DELETE FROM aluno WHERE id_aluno = :id_aluno";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_aluno', $id_aluno);
    try {
        $stmt->execute();
        echo json_encode(['message' => 'Conta excluida com sucesso!']);
    }catch(PDOException $e){
        echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
    }
}else{
    echo json_encode(['error' => 'Dados incompletos enviados.']);
}
