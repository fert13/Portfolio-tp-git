<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: authentification/login.php");
    exit();
}

$pdo = new PDO("mysql:host=localhost;dbname=messagerie", "dadj0002", "VfM5Bg48N0");

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo "ID invalide.";
    exit();
}

$id = (int)$_GET['id'];

$stmt = $pdo->prepare("DELETE FROM messages WHERE id = :id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
if ($stmt->execute()) {
    header("Location: index.php?message=supprime");
    exit();
} else {
    echo "Erreur lors de lors de l'archivage.";
}
?>
