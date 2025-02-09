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

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$banco = new DataBase();
$conn = $banco->getConn();

$headers = getallheaders();

$dados = json_decode(file_get_contents('php://input'), true);

if (isset($headers['Authorization'])){
    
    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);
    try{
        $decoded = JWT::decode($token, new Key($_ENV['KEY'], 'HS256'));
        $idAluno = $decoded->id;
        $matricula = $decoded->matricula;
    }catch(Throwable $e){
        http_response_code(401);
        echo json_encode(['error' => 'Não Autorizado']);
        exit;
    }
    //VAI TOMAR NO CU YURI ESSA MERDA NÃO FUNCIONA PQ A PORRA DO TOKEN 
    //NÃO TEM A MATRICULA SO O ID E A CHAVE NA MATERIA FEITA TA PUXANDO A MATRICULA
    if(isset($dados['selectedPeriod'])){
        $periodo = $dados['selectedPeriod'];
        try{
            // fui mlk e botei a matricula pra vir no token e to usando no lugar do id
            $query = "SELECT * FROM materias_feitas WHERE id_aluno = :matricula AND ano = :periodo";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':periodo', $periodo);
            $stmt->bindParam(':matricula', $matricula);
            $stmt->execute();
            $materiasFeitas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $chPeriodo = 0;
            for ($i = 0; $i < count($materiasFeitas); $i++) {
                $query = "SELECT * FROM materia WHERE codigo = :codigo";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':codigo', $materiasFeitas[$i]['id_materia']);
                $stmt->execute();
                $materia = $stmt->fetch(PDO::FETCH_ASSOC);
                $materiasFeitas[$i]['carga_horaria'] = $materia['carga_horaria'];
                $chPeriodo += $materia['carga_horaria'];
            }
            echo json_encode(['message' => 'Progresso do periodo encontrado com sucesso!', 'materias_feitas' => $materiasFeitas, 
                'chPeriodo' => $chPeriodo]);
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['error' => 'Erro no servidor: ' . $e->getMessage()]);
            exit;
        }
    }else{
        http_response_code(400);
        echo json_encode(['error' => 'Período selecionado não encontrado']);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Token de autenticação não encontrado']);
    exit;
}