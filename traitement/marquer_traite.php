<?php
$pdo = new PDO("mysql:host=localhost;dbname=messagerie", "dadj0002", "VfM5Bg48N0");
$id = $_GET["id"];
$pdo->prepare("UPDATE messages SET statut=1 WHERE id=?")->execute([$id]);
header("Location: index.php");
?>