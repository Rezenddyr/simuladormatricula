<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/banco.php';

$banco = new DataBase();
$conn = $banco->getConn();

$dados = json_decode(file_get_contents('php://input'), true);

if (isset($dados['matricula'], $dados['senha'], $dados['nome'], $dados['email'])) {
    $matricula = $dados['matricula'];
    $senha = $dados['senha'];
    $nome = $dados['nome'];
    $email = $dados['email'];

    // Verificar campos obrigatórios
    if (empty($matricula) || empty($senha) || empty($nome) || empty($email)) {
        echo json_encode(['error' => 'Todos os campos são obrigatórios.']);
        exit;
    }

    // formato de e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Formato de e-mail inválido.']);
        exit;
    }

    // Verificar se ja tem no banco
    $queryCheck = "SELECT * FROM aluno WHERE matricula = :matricula OR email = :email";
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->bindParam(':matricula', $matricula);
    $stmtCheck->bindParam(':email', $email);
    $stmtCheck->execute();

    if ($stmtCheck->rowCount() > 0) {
        echo json_encode(['error' => 'Matrícula ou e-mail já cadastrado.']);
        exit;
    }

    // Hash da senha
    $senhaHash = password_hash($senha, PASSWORD_BCRYPT);

    //  novo usuário
    $query = "INSERT INTO aluno (matricula, senha, nome, email) VALUES (:matricula, :senha, :nome, :email)";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':matricula', $matricula);
    $stmt->bindParam(':senha', $senhaHash);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);

    try {
        $stmt->execute();
        echo json_encode(['message' => 'Cadastro realizado com sucesso!']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erro ao cadastrar: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Dados incompletos enviados.']);
}
