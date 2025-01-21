<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "localhost";
$user = "root";
$password = ""; 
$database = "simuladormatricula";
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erro ao conectar ao banco de dados."]));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido."]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? null;
$currentPassword = $data['currentPassword'] ?? null;
$newPassword = $data['newPassword'] ?? null;

if (!$email || !$currentPassword) {
    http_response_code(400);
    echo json_encode(["error" => "E-mail e senha atual são obrigatórios."]);
    exit;
}

$stmt = $conn->prepare("SELECT senha FROM aluno WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "E-mail não encontrado."]);
    exit;
}

$aluno = $result->fetch_assoc();
$hashedPassword = $aluno['senha'];

if (!password_verify($currentPassword, $hashedPassword)) {
    http_response_code(401);
    echo json_encode(["error" => "Senha atual incorreta."]);
    exit;
}

if ($newPassword) {
    $newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
    $updateStmt = $conn->prepare("UPDATE aluno SET senha = ? WHERE email = ?");
    $updateStmt->bind_param("ss", $newHashedPassword, $email);

    if ($updateStmt->execute()) {
        echo json_encode(["message" => "Senha alterada com sucesso."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao atualizar a senha."]);
    }
} else {
    echo json_encode(["message" => "Credenciais verificadas."]);
}

$conn->close();
?>