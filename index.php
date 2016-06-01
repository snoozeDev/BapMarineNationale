<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" type="text/css" href="css/styleIndex.css">
</head>

<body>
<nav class="menu" tabindex="0">
	<div class="smartphone-menu-trigger"></div>
	<header class="avatar">
		<img src="http://www.defense.gouv.fr/var/dicod/storage/images/base-de-medias/images/marine/photos-au-fil-de-l-eau/image001/2252802-1-fre-FR/image001.jpg" />
		<h2>Centre d'Études Stratégiques de la Marine</h2>
  </header>
  <ul>
    <li tabindex="0" id="new" class="icon-dashboard"><span>Nouvelle Carte</span></li>
    <li tabindex="0" id="load"  class="icon-customers"><span>Charger Carte</span></li>
    <li tabindex="0" id="tuto"  class="icon-users"><span>Tutoriel</span></li>

  </ul>
</nav>

<main>
<div id="indexDiv">
      
    <h1>BAP MARINE NATIONALE</h1>
      <span>Prototype d'un outil de briefing militaire destiné à simuler des opérations navales</span>
      
    </div>
    
  <div  id="newDiv" style="color:red">
    <div class='container'>
<!--
      <div class='loading'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
-->
    </div>
  </div>
  <div  id="loadDiv" style="z-index:100"> 
    <h4 style="padding-bottom: 5%">Charger une carte sauvegardée</h4>
    
    <?php
    include 'db.php';   
 
     

    
    
    
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT id, mapName, mapDescription, cercles, polygs, texts, polyls, batis, bateaux FROM save_marine_table";
$result = $conn->query($sql);

    
    
    while($row = $result->fetch_assoc()) {
        
       echo '
        
           <ul class="" style="position:relative;z-index:1000">
      <li class="resource--article ">
        <h10 class="resource__title" style="color:black">'.$row["mapName"].'</h10>
        <p class="resource__summary">'.$row["mapDescription"].'</p>
        <a href="map.php?id='.$row["id"].'" style="cursor: pointer;" class="btn"  id="Load">Charger la carte</a>
         <a href="delete.php?id='.$row["id"].'" style="background:red;cursor: pointer;" class="btn"  id="Load">Supprimer la carte</a>
        

      </ul>
        
       ';
        
    }
?>
    

          
        </div>
        <div  id="tutoDiv" class="tuto">
          <div class="title">TUTORIEL</div>
          <div class="sommaire">
          </br>
          <h1>SOMMAIRE</h1>
        </br>
        
      </br>
      <h4>1 - Création d'une unité</h4>
    </br>
    <h4>2 - Création d'une forme</h4>
  </br>
  <h4>3 - Déplacement et changement de trajectoire</h4>
</br>
<h4>4 - Supprimer une unité</h4>
</br>
<h4>5 - Supprimer une forme</h4>
</br>
<h4>6 - Gestion du Temps</h4>
</br>
<h4>7 - Zoomer - Mode plein écran</h4>
</br>
<h4>8 - Cacher certains éléments de la carte </h4>
</br>
</div>
</br></br>

<h3>1 - Création d'une unité</h3>
</br>
<div> <p class="tutoriel">Pour créer une unité, cliquer sur l'icone "Bateau" sur la gauche de la 
  table. Vous pourrez alors sélectionner le type de d'unité que vous souhaitez créer, 
  si il s'agitdivd'une unité alliée, ennemie ou neutre, déterminez sa vitesse et ajoutez 
  s'y une description si vous le souhaitez.
  Cliquez ensuite où vous le souhaitez sur la carte pour placer l'unité.</p>
  <img class="gif" src="image/test.gif" border="0"></div>


  <h3>2 - Création d'une forme</h3>
</br>
<div> <p class="tutoriel">Pour créer une forme, cliquer sur l'icone "Forme" sur la gauche de la 
  table. Vous pourrez alors sélectionner le type de de forme que vous souhaitez créer, 
  si vous souhaitez placer du texte ou une ligne, déterminez la taille et la couleur 
  de la forme, ajoutez s'y une description si vous le souhaitez.
  Cliquez ensuite où vous le souhaitez sur la carte pour placer la forme.</p>
  <img class="gif" src="image/test.gif" border="0"></div>

  <h3>3 - Déplacement et changement de trajectoire</h3>
</br>
<div> <p class="tutoriel">Une fois votre unité créée, cliquez à l'endroit où vous souhaitez qu'elle se rende. 
  Cliquez ensuite sur "Arrêtez de dessiner" puis lancer le mode "PLAY". Si vous souhaitez changer
  la trajectoire d'une unité, cliquez dessus puis cliquez sur "Changer de trajectoire" et sélectionnez la nouvelle destination.</p>
  <img class="gif" src="image/test.gif" border="0"></div>

  <h3>4 - Supprimer une unité</h3>
</br>
<div> <p class="tutoriel">Pour supprimer une unité, cliquez dessus puis cliquez sur "Supprimer l'unité".</p>
  <img class="gif" src="image/test.gif" border="0"></div>

  <h3>5 - Supprimer une forme</h3>
</br>
<div> <p class="tutoriel">En déployant le pannel situé à la droite de la carte, vous pouvez voir l'intégralité des
  formes que vous avez créées. Vous pourrez ainsi supprimez la forme souhaitée en cliquant
  sur la forme ciblée et appuyez sur "Supprimer".</p>
  <img class="gif" src="image/test.gif" border="0"></div>

  <h3>6 - Gestion du Temps</h3>
</br>
<div> <p class="tutoriel">Grace au bouton "PLAY"/"PAUSE" en bas de la carte vous pourrez gérer le temps et 
  ainsi organiser vos simulations comme vous le souhaitez. Vous pourrez ainsi mettre le temps 
  en pause ou en mode "play".</p>
  <img class="gif" src="image/test.gif" border="0"></div>

  <h3>7 - Zoomer - Mode plein écran</h3>
</br>
<div> <p class="tutoriel">Pour zoomer et dé-zoomer, utilisez les boutons "+" et "-" situés en haut à gauche de la carte.
  Si vous souhaitez mettre la carte en plein écran, appuyez sur le bouton Plein écran" 
  situé également en haut à gauche de la carte.</p>
  <img class="gif" src="image/test.gif" border="0"></div>

  <h3>8 - Cacher certains éléments de la carte</h3>
</br>
<div> <p class="tutoriel">En déployant le pannel situé à la droite de la carte, vous pouvez cocher certaines cases 
  qui vous permettent de masquer certaines éléments de la carte comme les infrastructures,
  les cours d'eaux ou encore les profondeurs.</p>
  <img class="gif" src="image/test.gif" border="0"></div>

</div>
<script type="text/javascript" charset="utf-8" src="js/jquery.tubular.1.0.js"></script>
<script type="text/javascript" charset="utf-8" src="js/scriptIndex.js"></script>

</main></body>