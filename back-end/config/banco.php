<?php

class DataBase {
    private $ip_host = "localhost";
    private $database = "test";
    private $user = ""; // Defina o usuário do banco
    private $password = ""; // Defina a senha do banco

    public $conn;

    public function getConn() {
        $this->conn = null; // Inicializa a conexão como null
        try {
            // Conexão correta com o banco de dados
            $this->conn = new PDO(
                "mysql:host={$this->ip_host};dbname={$this->database}",
                $this->user,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("SET NAMES utf8"); // Configura o charset
            echo "Conexão realizada com sucesso!";
        } catch (PDOException $exception) {
            // Trata o erro de conexão
            echo "Não foi possível conectar. Erro: " . $exception->getMessage();
        }
        return $this->conn;
    }
}


?>

