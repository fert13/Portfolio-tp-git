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
$stmt = $pdo->prepare("SELECT * FROM messages WHERE id = :id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt->execute();
$message = $stmt->fetch();

if (!$message) {
    echo "Message introuvable.";
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Détail Message</title>
    <style>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 50%;
    text-align: center;
}

h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 15px;
}

p {
    font-size: 18px;
    color: #555;
    margin: 10px 0;
    text-align: left;
}

strong {
    color: #333;
}

/* Bouton Retour */
.button-container {
    margin-top: 20px;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
    transition: 0.3s;
}

.button:hover {
    background-color: #0056b3;
}

    </style>
</head>
<body>
    <div class="container">
        <h1>Message de <?= htmlspecialchars($message["nom"]) ?></h1>
        <p><strong>Email :</strong> <?= htmlspecialchars($message["email"]) ?></p>
        <p><strong>Date :</strong> <?= $message["date_envoi"] ?></p>
        <p><strong>Message :</strong> <?= nl2br(htmlspecialchars($message["message"])) ?></p>

        <div class="button-container">
            <a href="index.php" class="button">Retour</a>
        </div>
    </div>
</body>

</html>
