<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Se vier uma requisição OPTIONS (pré-flight), retornamos 200 e saímos.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php';

$banco = new DataBase();
$conn = $banco->getConn();

try {
    // Lê o conteúdo JSON enviado no corpo da requisição
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Verifica se o JSON foi decodificado corretamente
    if (!$data) {
        throw new Exception("Nenhum dado recebido ou JSON inválido.");
    }

    // Extrai o array de matérias do corpo da requisição
    $materias = $data['materias'] ?? [];

    if (!is_array($materias) || count($materias) === 0) {
        throw new Exception("Nenhuma matéria para atualizar.");
    }

    // Prepara a query de UPDATE na tabela 'materia' para alterar apenas o 'horario'
    $sql = "UPDATE materia SET horario = :horario WHERE codigo = :codigo";
    $stmt = $conn->prepare($sql);

    // Percorre cada matéria enviada
    foreach ($materias as $m) {
        $codigo  = $m['codigo']  ?? null;
        $horario = $m['horario'] ?? null; // Pode ser string ou null

        // Valida o código da matéria
        if (!$codigo || !is_string($codigo)) {
            throw new Exception("Código da matéria inválido ou ausente.");
        }

        // Valida o horário (pode ser null ou uma string no formato esperado)
        if ($horario !== null && !preg_match('/^\d{1,2}:\d{2} às \d{1,2}:\d{2}$/', $horario)) {
            throw new Exception("Horário inválido para a matéria $codigo: $horario");
        }

        // Faz o bind dos valores
        $stmt->bindValue(':horario', $horario);
        $stmt->bindValue(':codigo',  $codigo, PDO::PARAM_STR); // Use PDO::PARAM_STR para códigos alfanuméricos

        // Executa o UPDATE
        $stmt->execute();
    }

    // Retorna resposta de sucesso
    echo json_encode([
        "success" => true,
        "message" => "Horários atualizados com sucesso!"
    ]);
    exit;

} catch (Exception $e) {
    // Em caso de erro, retorna código 400 e a mensagem
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
    exit;
}
?>