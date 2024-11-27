<?php
    require 'banco.php';

    if (!isset($_GET['idProduto'])){
        echo 'Erro, idProduto é obrigatório';
        exit();
    }

    $idProduto = $_GET['idProduto'];

    $sql = "select * from produto  
             where idProduto = :idProduto";	
    $qry = $con->prepare($sql); 
    $qry->bindParam(':idProduto', $idProduto, PDO::PARAM_INT);
    $qry->execute();
    $registros = $qry->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($registros);
?>