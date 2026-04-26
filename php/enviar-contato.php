<?php

require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método não permitido.');
}

$nome = htmlspecialchars(trim($_POST['nome'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
$telefone = htmlspecialchars(trim($_POST['telefone'] ?? ''), ENT_QUOTES, 'UTF-8');
$mensagem = htmlspecialchars(trim($_POST['mensagem'] ?? ''), ENT_QUOTES, 'UTF-8');

if (strlen($nome) < 3) {
    header('Location: ../index.html?status=erro');
    exit;
}

if (strlen($nome) > 150) {
    header('Location: ../index.html?status=erro');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ../index.html?status=erro');
    exit;
}

$telefoneNumeros = preg_replace('/\D/', '', $telefone);
if (strlen($telefoneNumeros) < 10 || strlen($telefoneNumeros) > 11) {
    header('Location: ../index.html?status=erro');
    exit;
}

if (strlen($mensagem) < 10 || strlen($mensagem) > 1000) {
    header('Location: ../index.html?status=erro');
    exit;
}

$sql = "INSERT INTO contatos (nome, email, telefone, mensagem)
        VALUES (:nome, :email, :telefone, :mensagem)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':nome' => $nome,
    ':email' => $email,
    ':telefone' => $telefone,
    ':mensagem' => $mensagem
]);

header('Location: ../index.html?status=sucesso');
exit;