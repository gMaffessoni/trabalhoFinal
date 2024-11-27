<?php
    require 'banco.php';

    if (!isset($_GET['idProduto']) || !isset($_GET['nome'] ) || !isset($_GET['preco'] ) || !isset($_GET['categoria'] ) || !isset($_GET['descricao'] ) || !isset($_GET['imagem'] )){
        echo 'Erro, idProduto, nome, preço, categoria, descrição e imagem são obrigatórios';
        exit();
    }

    $idProduto = $_GET['idProduto'];
    $nome = $_GET['nome'];
    $preco = $_GET['preco'];
    $categoria = $_GET['categoria'];
    $descricao = $_GET['descricao'];
    $imagem = $_GET['imagem'];

    $sql = "update produto set nome = :nome, preco = :preco, categoria = :categoria, descricao = :descricao, imagem = :imagem
             where idProduto = :idProduto";	
    $qry = $con->prepare($sql); 
    $qry->bindParam(':idProduto', $idProduto, PDO::PARAM_INT);
    $qry->bindParam(':nome', $nome, PDO::PARAM_STR);
    $qry->bindParam(':preco', $preco, PDO::PARAM_STR);
    $qry->bindParam(':categoria', $categoria, PDO::PARAM_STR);
    $qry->bindParam(':descricao', $descricao, PDO::PARAM_STR);
    $qry->bindParam(':imagem', $imagem, PDO::PARAM_STR);
    
    $qry->execute();
    $nr = $qry->rowCount();
    echo $nr;
?>