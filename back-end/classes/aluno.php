<?php
class Aluno
{
    private $conn;
    private $table = 'aluno';

    public $idAluno;
    public $matricula;
    public $nome;
    public $email;

    public function __construct($conexao){
        $this->conn = $conexao;
    }

    public function modificaNomeAluno()
    {
        try {
            $query = "UPDATE " . $this->tabela . " SET nome = '" . $this->nome. "' WHERE id_aluno = " . $this->idAluno . "";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':nome', $this->nome);
            $stmt->bindParam(':id_aluno', $this->id_aluno);
            $stmt->execute();
            echo json_encode(['message' => 'Nome atualizado com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao atualizar nome: ' . $e->getMessage()]);
        }
    }

    public function modificaEmailAluno()
    {
        try {
            $query = "UPDATE " . $this->tabela . " SET email = '" . $this->email. "' WHERE id_aluno = " . $this->idAluno . "";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':id_aluno', $this->id_aluno);
            $stmt->execute();
            echo json_encode(['message' => 'Email atualizado com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao atualizar email: ' . $e->getMessage()]);
        }
    }

    public function modificaMatriculaAluno()
    {
        try {
            $query = "UPDATE " . $this->tabela . " SET matricula = '" . $this->matricula. "' WHERE id_aluno = " . $this->idAluno . "";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':matricula', $this->matricula);
            $stmt->bindParam(':id_aluno', $this->id_aluno);
            $stmt->execute();
            echo json_encode(['message' => 'Matricula atualizada com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao atualizar matricula: ' . $e->getMessage()]);
        }
    }
    public function getMatricula()
    {
        $query = "SELECT matricula FROM " . $this->tabela . " WHERE id_aluno = " . $this->idAluno . "";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_aluno', $this->id_aluno);
        try{
            $stmt->execute();
            echo json_encode(['message' => 'Matricula obtida com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao obter matricula: ' . $e->getMessage()]);
        }
    }
}
    
?>
