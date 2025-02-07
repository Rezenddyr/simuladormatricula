<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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
    // Consulta para buscar os horários da tabela materia
    $sql = "SELECT codigo, horario FROM materia";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Converte os horários (que estão armazenados como strings separadas por vírgula) em arrays
    $horariosComMaterias = [];
    foreach ($materias as $materia) {
        if (!empty($materia['horario'])) {
            $horarios = explode(", ", $materia['horario']);
            foreach ($horarios as $horario) {
                // Adiciona cada horário com a matéria correspondente
                $horariosComMaterias[] = [
                    "horario" => $horario,
                    "materia" => $materia['codigo']
                ];
            }
        }
    }

    // Log dos dados que serão retornados
    error_log("Dados retornados pela API: " . print_r($horariosComMaterias, true));

    // Retorna os dados em JSON
    echo json_encode([
        "success" => true,
        "horarios" => $horariosComMaterias
    ]);
    exit;

} catch (Exception $e) {
    // Em caso de erro, retorna código 500 e a mensagem de erro
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Erro ao buscar horários: " . $e->getMessage()
    ]);
    exit;
}
?>