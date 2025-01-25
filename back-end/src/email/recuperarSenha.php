<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

function sendPasswordRecoveryEmail($userEmail, $recoveryToken) {
    $mail = new PHPMailer(true);
    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Substitua pelo servidor SMTP que você está utilizando
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL'];
        $mail->Password = $_ENV['PASS'];// Sua senha ou App Password (para Gmail)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // TLS ou SMTPS
        $mail->Port = 465; // Porta do servidor (465 para SMTPS ou 587 para TLS)

        // Configurações do remetente e destinatário
        $mail->setFrom('dweb2024.2@gmail.com', 'Simulador Matricula');
        $mail->addAddress($userEmail); // Email do usuário que vai receber o link

        // Conteúdo do email
        $mail->isHTML(true);
        $mail->Subject = 'Recuperação de senha';
        $mail->Body = "
            <h1>Recuperação de Senha</h1>
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para continuar:</p>
            <a href='http://localhost:3000/esquecisenha?={$recoveryToken}'>Redefinir Senha</a>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
        ";
        $mail->AltBody = "Olá,\n\nRecebemos uma solicitação para redefinir sua senha. Use o link abaixo para continuar:\n\nhttp://localhost:3000/esquecisenha={$recoveryToken}\n\nSe você não solicitou isso, ignore este e-mail.";

        // Envia o email
        $mail->send();
        echo 'E-mail enviado com sucesso!';
    } catch (Exception $e) {
        echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    }
}

$dados = json_decode(file_get_contents('php://input'), true);
if (isset($dados['email'])) {
    $userEmail = $dados['email'];
    $recoveryToken = bin2hex(random_bytes(16)); // Gera um token único para o link de recuperação
    sendPasswordRecoveryEmail($userEmail, $recoveryToken);
} else {
    echo json_encode(['error' => 'Dados incompletos enviados.']);
}


?>