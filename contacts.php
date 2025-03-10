<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contacts | Portfolio</title>
        <meta name="description" content="Découvrez mes réalisations en web design, UX/UI et développement front-end. Des projets créatifs et fonctionnels conçus pour offrir des expériences uniques et intuitives.">    
        <meta name="keywords" content="portfolio, UX, UI, designer, web, développeur front-end, Reims, France, étudiant, stage, alternance, PHP, design produit, conception web">
        <meta name="author" content="Néfertiti DADJO">
        <meta http-equiv="Content-Language" content="fr">
        <link rel="canonical" href="https://www.nefertiti.ovh/">
        
        <link rel="icon" type="image/png" href="images/declinaison.ico">
        <link rel="apple-touch-icon" href="images/declinaison.ico">
        
        <meta property="og:url" content="https://www.nefertiti.ovh/">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Portfolio Néfertiti DADJO">
        <meta property="og:description" content="Portfolio de Néfertiti DADJO, web designer et développeuse front-end. Découvrez mes projets en UX/UI design, web design et développement front-end.">
        <meta property="og:image" content="https://www.nefertiti.ovh/images/image-background-2.svg">
        <meta property="og:site_name" content="Portfolio Néfertiti DADJO">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@NefertitiDADJO">
        <meta name="twitter:creator" content="@NefertitiDADJO">
        <meta name="twitter:url" content="https://www.nefertiti.ovh/">
        <meta name="twitter:title" content="Portfolio Néfertiti DADJO">
        <meta name="twitter:description" content="Portfolio de Néfertiti DADJO, web designer et développeuse front-end. Découvrez mes projets en UX/UI design, web design et développement front-end.">
        <meta name="twitter:image" content="https://www.nefertiti.ovh/images/image-background-2.svg">
        
        <link rel="stylesheet" href="styles/styles.css">
        <link rel="stylesheet" href="styles/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Pacifico&family=Dynalight&family=Shadows+Into+Light&display=swap" rel="stylesheet">
    
        <!-- Scripts -->
        <script src="https://kit.fontawesome.com/3d19af06bf.js" crossorigin="anonymous" async></script>
        <script src="/js/index.js" async></script>
    </head>   
<body>
    <div class="hero">
        <nav>
            <ul>
                <li><a href="index#presentation">CV</a></li>
                <li><a href="portfolio">Portfolio</a></li>
                <li><a href="contacts">Contact</a></li>
            </ul>
        </nav>
        <div class="hero-description">
             <h1>Contacts</h1>
             <h2>Immédiatement disponible</h2>
        </div>
        <div class="hero-icon">
            <a href="#contacts"><i class="fa-solid fa-arrow-turn-down fa-2xl"></i></a>
       </div>
    </div>

    <main>
        <div class="containers" id="contacts">
        
        <div class="column-flex">
                <?php
                    try {
                        $pdo = new PDO("mysql:host=10.56.8.55;dbname=messagerie", "dadj0002", "VfM5Bg48N0");
                        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    } catch (PDOException $e) {
                        die("Erreur de connexion : " . $e->getMessage());
                    }

                    if (isset($_POST['submit'])) {
                        $nom = trim(htmlspecialchars($_POST["name"]));
                        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
                        $message = trim(htmlspecialchars($_POST["message"]));
                        $nom = ucfirst($nom);
                        $message = ucfirst($message);
                        $statut= 0;
                        
                        if(isset($nom) && isset($email) && isset($message)){
                            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                                echo "<p style='color:red; text-align:center'>Le format de l'email est invalide.</p>";
                            }else {
                                $sql = "INSERT INTO messages (nom, email, message, statut) VALUES (?, ?, ?, ?)";
                                $stmt = $pdo->prepare($sql);
                                $stmt->execute([$nom, $email, $message, $statut]);  
                            }
                        }else {
                            echo "<p style='color:red; text-align:center'>Remplir tous les champs</p>";
                        }
                    } 
                ?>
              <form action ="" method="POST">
                <input name="name" type="text" placeholder="Nom" class="feedback-input" required />
                <input name="email" type="email" placeholder="Email" class="feedback-input" required />
                <textarea name="message" placeholder="Message" class="feedback-input" required></textarea>
                <input type="submit" name="submit" value="Envoyer"/>
            </form>
              <div class="row-flex contact-icons">
                <div class="row-flex"><i class="fa-solid fa-envelope fa-xl"></i> <h2>ghislainedadjo@gmail.com</h2></div>
                <div class="row-flex"><i class="fa-solid fa-phone fa-xl"></i> <h2>0605608536</h2></div>
                <div class="row-flex"><a href="https://www.linkedin.com/in/n%C3%A9fertiti-dadjo/"><i class="fa-brands fa-linkedin fa-xl"></i></a><h2>@nefertiti</h2></div>
             </div>
        </div>
        </div>
    </main> 
    


</body>
</html>



