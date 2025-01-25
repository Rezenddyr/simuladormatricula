<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../vendor/autoload.php';
require_once '../../config/banco.php';


$banco = new DataBase();
$conn = $banco->getConn();

function gerarSenha($tamanho = 8) {
    $caixaAlta = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $caixaBaixa = 'abcdefghijklmnopqrstuvwxyz';
    $numeros = '0123456789';
    $caracteresEspeciais = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    $todosCaracteres = $caixaAlta . $caixaBaixa . $numeros . $caracteresEspeciais;
    $senha = '';

    // Garante que tenha ao menos um de cada tipo
    $senha .= $caixaAlta[random_int(0, strlen($caixaAlta) - 1)];
    $senha .= $caixaBaixa[random_int(0, strlen($caixaBaixa) - 1)];
    $senha .= $numeros[random_int(0, strlen($numeros) - 1)];
    $senha .= $caracteresEspeciais[random_int(0, strlen($caracteresEspeciais) - 1)];

    // Preenche o restante dos caracteres de forma aleatória
    for ($i = 4; $i < $tamanho; $i++) {
        $senha .= $todosCaracteres[random_int(0, strlen($todosCaracteres) - 1)];
    }

    // Embaralha a senha para garantir aleatoriedade
    $senha = str_shuffle($senha);

    return $senha;
}

$randomPassword = gerarSenha(); // Gera um token único para o link de recuperação

if(isset($_GET['email'])){
    $userEmail = $_GET['email'];
    $passwordHash = password_hash($randomPassword, PASSWORD_BCRYPT);
    try{
        $query = "UPDATE aluno SET senha = :senha WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':senha', $passwordHash);
        $stmt->bindParam(':email', $userEmail);
        $stmt->execute();
        echo '<p>Senha alterada com sucesso!</p>
        <p>Use a nova senha: ' . $randomPassword .' para acessar sua conta</p>';
    } catch (PDOException $e) {
        return http_response_code(500);
        echo json_encode(['error' => 'Erro de servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'E-mail não informado']);
}