<?php

require_once 'banco.php';

$banco = new DataBase();
$conn = $banco->getConn();

$dados = json_decode(file_get_contents('php://input'), true);

if(isset($dados['email']) && isset($dados['senha'])) {
    $email = $dados['email'];
    $senha = $dados['senha'];
    
    $query = "SELECT * FROM  WHERE email = :email AND senha = :senha";
}