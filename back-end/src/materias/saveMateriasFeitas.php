<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php'; 

$banco = new DataBase();
$conn = $banco->getConn();

$dados = json_decode(file_get_contents('php://input'), true);

if (isset($dados['id_aluno'], $dados['materias']) && is_array($dados['materias'])) {
    $id_aluno = (int) $dados['id_aluno']; // Converte para número
    $materias = $dados['materias'];
    error_log("Valor recebido para id_aluno: " . $id_aluno);
    error_log("Tipo de id_aluno: " . gettype($id_aluno));

    // Verificar campos obrigatórios
    if (empty($id_aluno) || empty($materias)) {
        echo json_encode(['error' => 'Todos os campos são obrigatórios.']);
        exit;
    }

    try {
        // Iniciar transação
        $conn->beginTransaction();

        foreach ($materias as $materia) {
            if (!isset($materia['id_materia'], $materia['status'])) {
                throw new Exception('Dados incompletos para uma matéria.');
            }

            $id_materia = $materia['id_materia'];
            $status = $materia['status'];
            $ano = $materia['ano'] ?? null;

            // Verificar se o ano está correto (não pode ser nulo)
            if (empty($ano)) {
                throw new Exception("Ano inválido para a matéria $id_materia. O campo 'ano' não pode ser vazio ou nulo.");
            }

            // Insere ou atualiza os registros na tabela materias_feitas
            $query = "
                INSERT INTO materias_feitas (id_aluno, id_materia, status, ano)
                VALUES (:id_aluno, :id_materia, :status, :ano)
                ON DUPLICATE KEY UPDATE
                    status = VALUES(status),
                    ano = VALUES(ano)
            ";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id_aluno', $id_aluno);
            $stmt->bindParam(':id_materia', $id_materia);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':ano', $ano);
            $stmt->execute();
        }

        // Confirmar transação
        $conn->commit();
        echo json_encode(['message' => 'Matérias registradas com sucesso!']);
    } catch (Exception $e) {
        // Reverter transação em caso de erro
        $conn->rollBack();
        echo json_encode(['error' => 'Erro ao registrar matérias, confira os campos! ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Dados incompletos enviados.']);
}
?>
