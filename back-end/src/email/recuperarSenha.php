<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendPasswordRecoveryEmail($userEmail, $recoveryLink) {
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Substitua pelo servidor SMTP que você está utilizando
        $mail->SMTPAuth = true;
        $mail->Username = 'seuemail@gmail.com'; // Seu email
        $mail->Password = 'suasenha';          // Sua senha ou App Password (para Gmail)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // TLS ou SMTPS
        $mail->Port = 465; // Porta do servidor (465 para SMTPS ou 587 para TLS)

        // Configurações do remetente e destinatário
        $mail->setFrom('seuemail@gmail.com', 'Seu Nome ou Empresa');
        $mail->addAddress($userEmail); // Email do usuário que vai receber o link

        // Conteúdo do email
        $mail->isHTML(true);
        $mail->Subject = 'Recuperação de senha';
        $mail->Body = "
            <h1>Recuperação de Senha</h1>
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para continuar:</p>
            <a href='{$recoveryLink}'>Redefinir Senha</a>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
        ";
        $mail->AltBody = "Olá,\n\nRecebemos uma solicitação para redefinir sua senha. Use o link abaixo para continuar:\n\n{$recoveryLink}\n\nSe você não solicitou isso, ignore este e-mail.";

        // Envia o email
        $mail->send();
        echo 'E-mail enviado com sucesso!';
    } catch (Exception $e) {
        echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    }
}

// Exemplo de uso:
$userEmail = 'usuario@exemplo.com';
$recoveryToken = bin2hex(random_bytes(16)); // Gera um token único para o link de recuperação
$recoveryLink = "https://seusite.com/redefinir-senha?token={$recoveryToken}";

sendPasswordRecoveryEmail($userEmail, $recoveryLink);
?>