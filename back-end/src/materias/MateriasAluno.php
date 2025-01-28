<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php'; 

$banco = new DataBase();
$conn = $banco->getConn();

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dados = json_decode(file_get_contents('php://input'), true);

        // Verifica se a ação foi enviada
        $action = isset($dados['action']) ? $dados['action'] : 'fetch';

        if ($action === 'fetch') {
            // Verifica se o ID do aluno foi enviado
            if (!isset($dados['id_aluno']) || empty($dados['id_aluno'])) {
                echo json_encode(['error' => 'ID do aluno não informado ou vazio']);
                http_response_code(400);
                exit;
            }

            $id_aluno = $dados['id_aluno'];

            // Log do ID do aluno recebido
            error_log("ID do aluno recebido: $id_aluno");

            $query = "
                SELECT mf.*, m.nome AS nome_materia
                FROM materias_feitas mf
                INNER JOIN materia m ON mf.id_materia = m.codigo
                WHERE mf.id_aluno = :id_aluno
            ";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id_aluno', $id_aluno, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Verifica se há resultados e retorna o JSON
            if ($result) {
                echo json_encode(['materias' => $result]);
            } else {
                echo json_encode(['materias' => [], 'message' => 'Nenhuma matéria encontrada para o aluno.']);
            }

            // Log do resultado da consulta
            error_log("Resultado da consulta: " . print_r($result, true));
        } elseif ($action === 'delete') {
            // Exclusão de uma matéria
            if (!isset($dados['id_aluno'], $dados['id_materia'])) {
                echo json_encode(['error' => 'ID do aluno ou ID da matéria não informado.']);
                http_response_code(400);
                exit;
            }

            $id_aluno = $dados['id_aluno'];
            $id_materia = $dados['id_materia'];

            $queryDelete = "
                DELETE FROM materias_feitas
                WHERE id_aluno = :id_aluno AND id_materia = :id_materia
            ";
            $stmtDelete = $conn->prepare($queryDelete);
            $stmtDelete->bindParam(':id_aluno', $id_aluno, PDO::PARAM_INT);
            $stmtDelete->bindParam(':id_materia', $id_materia, PDO::PARAM_STR);
            $stmtDelete->execute();

            if ($stmtDelete->rowCount() > 0) {
                echo json_encode(['message' => 'Matéria excluída com sucesso.']);
            } else {
                echo json_encode(['error' => 'Nenhuma matéria encontrada para exclusão.']);
            }
        } else {
            echo json_encode(['error' => 'Ação não reconhecida.']);
            http_response_code(400);
            exit;
        }
    } else {
        echo json_encode(['error' => 'Método não permitido']);
        http_response_code(405);
        exit;
    }
} catch (Exception $e) {
    // Log de erros
    error_log("Erro no servidor: " . $e->getMessage());
    echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
    http_response_code(500);
    exit;
}

?>