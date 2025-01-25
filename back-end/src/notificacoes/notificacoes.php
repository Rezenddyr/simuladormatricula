<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../config/banco.php';

$banco = new DataBase();
$conn = $banco->getConn();

try {
    $query = "SELECT * FROM notificacoes ORDER BY criado_em DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $notificacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($notificacoes);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro ao buscar notificações.']);
}
