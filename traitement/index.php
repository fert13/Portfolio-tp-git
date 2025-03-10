<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: authentification/login.php");
    exit();
}

$pdo = new PDO("mysql:host=localhost;dbname=messagerie", "dadj0002", "VfM5Bg48N0");
$limit = 10;
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($page - 1) * $limit;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$where = "statut=0";
if (isset($_GET["all"])) {
    $where = "1";
}
if (!empty($search)) {
    $where .= " AND (nom LIKE :search OR email LIKE :search)";
}

// Récupération du nombre total de messages
$query = "SELECT COUNT(*) FROM messages WHERE $where";
$totalStmt = $pdo->prepare($query);
if (!empty($search)) {
    $totalStmt->bindValue(":search", "%$search%", PDO::PARAM_STR);
}
$totalStmt->execute();
$totalMessages = $totalStmt->fetchColumn();
$totalPages = ceil($totalMessages / $limit);

// Récupération des messages avec pagination
$stmt = $pdo->prepare("SELECT * FROM messages WHERE $where ORDER BY date_envoi DESC LIMIT $limit OFFSET $offset");
if (!empty($search)) {
    $stmt->bindValue(":search", "%$search%", PDO::PARAM_STR);
}
$stmt->execute();
$messages = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Admin - Messages</title>
    <link rel="stylesheet" href="../styles/administration.css">
</head>
<body class="admin">
    <h1 style="text-align:center; font-size:60px">Bienvenue Admin</h1>
    <p style="text-align:center; font-size:30px">Bienvenue sur la page admin, vous gérez vos messages ici.</p>

    <div class="header-admin">
        <form method="GET" class="form-admin">
            <input class="feedback-input search" type="text" name="search" placeholder="Rechercher par nom ou email">
            <input type="submit" name="submit" class="submit" value="Rechercher">
        </form>
        <div class="button-admin">
            <a href="index.php?all=1">Voir tout</a>
            <a href="authentification/logout.php">Se déconnecter</a>
        </div>
    </div>

    <table border="1">
        <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
        </tr>
        <?php if (empty($messages)) : ?>
            <tr>
                <td colspan="5" style="text-align: center;">Aucune donnée</td>
            </tr>
        <?php else: ?>
            <?php foreach ($messages as $msg) : ?>
            <tr>
                <td><?= htmlspecialchars($msg["nom"]) ?></td>
                <td><?= htmlspecialchars($msg["email"]) ?></td>
                <td><?= htmlspecialchars($msg["message"]) ?></td>
                <td><?= $msg["date_envoi"] ?></td>
                <td>
                    <?php if ($msg["statut"] == 0) : ?>
                        <button><a href="marquer_traite.php?id=<?= $msg['id'] ?>" class="process">Marquer comme traité</a></button>
                    <?php else : ?>
                        <button><a href="voir.php?id=<?= $msg['id'] ?>" class="traited">Traité</a></button>
                        <button><a href="archiver.php?id=<?= $msg['id'] ?>" class="deleted">Supprimer</a></button>
                    <?php endif; ?>
                </td>
            </tr>
            <?php endforeach; ?>
        <?php endif; ?>
    </table>

    <div style="text-align:center; margin-top:20px;">
        <?php if ($page > 1) : ?>
            <a href="?page=<?= $page - 1 ?>&search=<?= urlencode($search) ?>&all=1">Précédent</a>
        <?php endif; ?>
        <?php for ($i = 1; $i <= $totalPages; $i++) : ?>
            <a href="?page=<?= $i ?>&search=<?= urlencode($search) ?>" 
               style="<?= $i == $page ? 'font-weight: bold; color: red;' : '' ?>">
                <?= $i ?>
            </a>
        <?php endfor; ?>
        <?php if ($page < $totalPages) : ?>
            <a href="?page=<?= $page + 1 ?>&search=<?= urlencode($search) ?> &all=1">Suivant</a>
        <?php endif; ?>
    </div>
</body>
</html>
