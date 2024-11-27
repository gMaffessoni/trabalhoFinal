<?php
require 'banco.php';

// Definir o cabeçalho para retorno em JSON
header('Content-Type: application/json; charset=utf-8');

// Verificar se todos os parâmetros necessários estão presentes
if (!isset($_GET['nome']) || !isset($_GET['preco']) || !isset($_GET['categoria']) || !isset($_GET['descricao']) || !isset($_GET['imagem'])){
    echo json_encode(['erro' => 'Nome, preço, categoria, descrição e imagem são obrigatórios']);
    exit();
}

$nome = $_GET['nome'];
$preco = $_GET['preco'];
$categoria = $_GET['categoria'];
$descricao = $_GET['descricao'];
$imagem = $_GET['imagem'];

try {
    // Inserir o produto no banco de dados
    $sql = "INSERT INTO produto (nome, preco, categoria, descricao, imagem)
            VALUES (:nome, :preco, :categoria, :descricao, :imagem)";
    $qry = $con->prepare($sql);
    $qry->bindParam(':nome', $nome, PDO::PARAM_STR);
    $qry->bindParam(':preco', $preco, PDO::PARAM_STR);
    $qry->bindParam(':categoria', $categoria, PDO::PARAM_STR);
    $qry->bindParam(':descricao', $descricao, PDO::PARAM_STR);
    $qry->bindParam(':imagem', $imagem, PDO::PARAM_STR);
    $qry->execute();

    $nr = $qry->rowCount();
    echo json_encode(['linhas_inseridas' => $nr]);
} catch (Exception $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
