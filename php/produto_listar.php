<?php
    require 'banco.php';

    $sql = "select * from produto order by idProduto";	
    $qry = $con->prepare($sql); 
    $qry->execute();
    //$nr = $qry->rowCount();
    //echo $nr;
    $registros = $qry->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($registros);



?>