<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/banco.php';
require_once '../../vendor/autoload.php';

$banco = new DataBase();
$conn = $banco->getConn();

$dados = json_decode(file_get_contents('php://input'), true);
if(isset($dados['periodo'])){
    $periodo = $dados['periodo'];
    try{
        $query = "SELECT * FROM materia WHERE periodo = :periodo;";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':periodo', $periodo);
        $stmt->execute();
        $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['message' => 'Matérias encontradas com sucesso!', 'materias' => $materias]);
    }catch(Exception $e){
        http_response_code(500);
        echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
        exit;
    }
}else{
    http_response_code(400);
    echo json_encode(['error' => 'Parâmetros obrigatórios não informados']);
    exit;
}