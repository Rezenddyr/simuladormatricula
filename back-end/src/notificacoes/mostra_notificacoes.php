<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = ""; 
$database = "simuladormatricula";
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao conectar ao banco de dados: " . $conn->connect_error]);
    exit;
}

// Listar Notificações
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM notificacoes ORDER BY criado_em DESC");
    if ($stmt) {
        $stmt->execute();
        $result = $stmt->get_result();
        $notificacoes = [];

        while ($row = $result->fetch_assoc()) {
            $notificacoes[] = $row;
        }

        echo json_encode($notificacoes);
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao preparar a consulta: " . $conn->error]);
    }
    $conn->close();
    exit;
}

$conn->close();
?>