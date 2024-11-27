<?php
require 'banco.php';

try {
    $sql = "DELETE FROM produto";
    $qry = $con->prepare($sql);
    $qry->execute();

    echo json_encode(['linhas_afetadas' => $qry->rowCount()]);
} catch (Exception $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
