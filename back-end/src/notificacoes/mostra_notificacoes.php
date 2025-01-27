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
    echo json_encode(["error" => "Erro ao conectar ao banco de dados."]);
    exit;
}

// Listar Notificações
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM notificacoes ORDER BY criado_em DESC");
    if ($result) {
        $notificacoes = [];

        while ($row = $result->fetch_assoc()) {
            $notificacoes[] = $row;
        }

        echo json_encode($notificacoes);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao buscar notificações."]);
    }
    exit;
}

$conn->close();
?>