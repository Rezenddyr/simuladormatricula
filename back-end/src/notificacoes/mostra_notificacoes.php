<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php'; 

$banco = new DataBase();
$conn = $banco->getConn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $query = "SELECT id, mensagem, criado_em FROM notificacao ORDER BY criado_em DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $notificacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'message' => 'Listando Notificações',
            'notificacoes' => $notificacoes
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Erro no servidor: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
}
?>