<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");


$host = "localhost";
$user = "root";
$password = ""; 
$database = "simuladormatricula";
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erro ao conectar ao banco de dados."]));
}

// Listar Notificações
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM notificacoes ORDER BY criado_em DESC");
    $notificacoes = [];

    while ($row = $result->fetch_assoc()) {
        $notificacoes[] = $row;
    }

    echo json_encode($notificacoes);
    exit;
}

$conn->close();
?>
