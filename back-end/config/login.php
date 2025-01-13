<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'banco.php';

$banco = new DataBase();
$conn = $banco->getConn();

$dados = json_decode(file_get_contents('php://input'), true);

if (isset($dados['email'], $dados['senha'])) {
    $email = $dados['email'];
    $senha = $dados['senha'];

    if (empty($email) || empty($senha)) {
        echo json_encode(['error' => 'E-mail e senha são obrigatórios.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Formato de e-mail inválido.']);
        exit;
    }

    $query = "SELECT * FROM aluno WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);

    try {
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            echo json_encode(['message' => 'Login realizado com sucesso!', 'user' => $user['nome']]);
        } else {
            echo json_encode(['error' => 'E-mail ou senha inválidos.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erro ao realizar login: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Dados incompletos enviados.']);
}