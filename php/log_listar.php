<?php
require 'banco.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $sql = "SELECT * FROM log ORDER BY datahora DESC";
    $qry = $con->prepare($sql);
    $qry->execute();
    $logs = $qry->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($logs);
} catch (Exception $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
