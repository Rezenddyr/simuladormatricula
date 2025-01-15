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

if (isset($dados['id'], $dados['matricula'], $dados['nome'], $dados['email'])) {
    $id_aluno = (int) $dados['id'];
    $matricula = $dados['matricula'];
    $nome = $dados['nome'];
    $email = $dados['email'];
   
    try {
        // Verificar se a matrícula ou e-mail já estão cadastrados para outro aluno
        $queryCheck = "SELECT * FROM aluno WHERE (matricula = :matricula OR email = :email) AND id_aluno != :id_aluno";
        $stmtCheck = $conn->prepare($queryCheck);
        $stmtCheck->bindParam(':matricula', $matricula);
        $stmtCheck->bindParam(':email', $email);
        $stmtCheck->bindParam(':id_aluno', $id_aluno);
        $stmtCheck->execute();

        if ($stmtCheck->rowCount() > 0) {
            echo json_encode(['error' => 'Matrícula ou e-mail já cadastrado para outro aluno.']);
            exit;
        }

        // Atualizar os dados do aluno
        $queryUpdate = "UPDATE aluno SET matricula = :matricula, nome = :nome, email = :email WHERE id_aluno = :id_aluno";
        $stmtUpdate = $conn->prepare($queryUpdate);
        $stmtUpdate->bindParam(':matricula', $matricula);
        $stmtUpdate->bindParam(':nome', $nome);
        $stmtUpdate->bindParam(':email', $email);
        $stmtUpdate->bindParam(':id_aluno', $id_aluno);

        if ($stmtUpdate->execute()) {
            echo json_encode(['message' => 'Perfil atualizado com sucesso!']);
        } else {
            echo json_encode(['error' => 'Falha ao atualizar o perfil.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Dados incompletos para atualizar o perfil.']);
}
?>