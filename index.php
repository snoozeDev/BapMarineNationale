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
  <div style="z-index:1" class="helper">
    <div id="indexDiv">

      BAP MARINE NATIONALE
      <span>Prototype d'un outil de briefing militaire destiné à simuler des opérations navales</span>

    </div>

  </div>
  <div  id="newDiv" style="color:red">
    <div class='container'>
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
      <a href="#tutounite">  <h3>I - Unités Maritimes et Aériennes </h3>   </a>
      </br>
      <h4>1 - Création d'une unité</h4>
      </br>
      <h4>2 - Déplacement d'une unité</h4>
      </br>
      <h4>3 - Changement de vitesse d'une unité</h4>
      </br>
      <h4>4 - Supprimer une unité</h4>
      </br>
      <a href="#tutoforme">   <h3>II - Formes</h3> </a>
      </br>
      <h4>1 - Création d'une forme</h4>
      </br>
      <h4>2 - Masquer une forme</h4>
      </br>
      <a href="#tutobatiment">  <h3>III - Batiments</h3> </a>
      </br>
      <h4>1 - Création d'un batiment</h4>
      </br>
      <h4>2 - Masquer une forme </h4>
      </br>
      <a href="#tutocarte">  <h3>IV - Carte</h3> </a>
      </br>
      <h4>1 - Fonction zoom/dé-zoom</h4>
      </br>
      <h4>2 - Caccher certains éléments de la carte</h4>
      </br>

      <a href="#tutogestion"> <h3>V - Gestion du temps</h3> </a>
      </br>
      <h4>1 - Mettre la simulation en pause</h4>
      </br>
      <h4>2 - Changer la vitesse de la simulation</h4>
      </br>

      <a href="#tutosauvegarde"> <h3>VI - Sauvegarde</h3> </a>
      </br>
      <h4>1 - Sauvegarder une carte</h4>
      </br>
      <h4>2 - Charger une carte</h4>
      </br>

    </div>
    </br></br>

    <a name="tutounite" id="tutounite"> <h2 style="text-align:center;" >I – Unités Maritimes et Aériennes</h2> </a>
    </br>
    <h3>1 - Création d'une unité</h3>
    </br>
    <div> <p class="tutoriel">Pour créer une unité, cliquez sur l'icône "Unité" sur la gauche de la  table.
        Vous pourrez alors sélectionner le type de d'unité que vous souhaitez créer, si il s'agit d'une unité alliée,
        ennemie ou neutre, déterminez sa vitesse et y ajoutez une description si vous le souhaitez.
        Cliquez ensuite où vous le souhaitez sur la carte pour placer l'unité.</p>
      <img class="gif" src="image/1.gif" border="0"></div>


    <h3>2 – Déplacement d’une unité</h3>
    </br>
    <div> <p class="tutoriel">Pour déplacer une unité, placez là où vous voulez sur la carte puis placez la destination de l’unité.
        Une fois la simulation en mode PLAY, l’unité sera en mouvement jusqu’au point déterminé.
        Pour changer de trajectoire en cours de route, cliquez sur l’unité puis sur Changer Trajet.</p>
      <img class="gif" src="image/2.gif" border="0"></div>

    <h3>3 – Changement de vitesse d’une unité</h3>
    </br>
    <div> <p class="tutoriel">Pour changer la vitesse d’une unité, cliquez sur celle-ci puis sur Changer la vitesse
        et entrez la nouvelle vitesse de déplacement de l’unité.</p>
      <img class="gif" src="image/3.gif" border="0"></div>

    <h3>4 – Supprimer une unité</h3>
    </br>
    <div> <p class="tutoriel">Pour supprimer une unité, cliquez dessus puis cliquez sur « Supprimer l'unité ».</p>
      <img class="gif" src="image/4.gif" border="0"></div>


    <a name="tutoforme" id="tutoforme">  <h2 style="text-align:center;">II – Formes </h2> </a>
    </br>

    <h3>1 - Création d'une forme</h3>
    </br>
    <div> <p class="tutoriel">Pour créer une forme, cliquez sur l'icône "Forme" sur la gauche de la table.
        Vous pourrez alors sélectionner le type de forme que vous souhaitez créer,
        si vous souhaitez placer du texte ou une ligne, déterminez la taille et la couleur de la forme,
        ajoutez s'y une description si vous le souhaitez.
        Cliquez ensuite où vous le souhaitez sur la carte pour placer la forme</p>
      <img class="gif" src="image/5.gif" border="0"></div>

    <h3>2 - Masquer une forme</h3>
    </br>
    <div> <p class="tutoriel">En déployant le pannel situé à la droite de la carte,
        vous pouvez voir l'intégralité des formes que vous avez créé.
        Vous pourrez ainsi supprimer la forme souhaitée en cliquant sur la forme ciblée et appuyez sur « Masquer ».</p>
      <img class="gif" src="image/6.gif" border="0"></div>


    <a name="tutobatiment" id="tutobatiment"> <h2 style="text-align:center;">III – Bâtiments </h2> </a>
    </br>

    <h3>1 - Création d’un bâtiment </h3>
    </br>
    <div> <p class="tutoriel">Pour créer un bâtiment, cliquez sur l'icône "Bâtiment" sur la gauche de la table.
        Vous pourrez alors sélectionner le type de bâtiment que vous souhaitez créer.
        Cliquez ensuite où vous le souhaitez sur la carte pour placer la forme</p>
      <img class="gif" src="image/7.gif" border="0"></div>

    <h3>2 - Masquer une forme </h3>
    </br>
    <div> <p class="tutoriel">En déployant le pannel situé à la droite de la carte,
        vous pouvez voir l'intégralité des bâtiments que vous avez créé.
        Vous pourrez ainsi supprimer le bâtiment souhaitée en cliquant sur le bâtiment ciblé et appuyez sur « Masquer ».</p>
      <img class="gif" src="image/8.gif" border="0"></div>

    <a name="tutocarte" id="tutocarte">  <h2 style="text-align:center;">IV - Carte</h2> </a>
    </br>

    <h3>1 – Fonction zoom/dé-zoom</h3>
    </br>
    <div> <p class="tutoriel">Pour zoomer et dé-zoomer,
        utilisez les boutons "+" et "-" situés en haut à gauche de la carte.</p>
      <img class="gif" src="image/9.gif" border="0"></div>

    <h3>2 - Cacher certains éléments de la carte</h3>
    </br>
    <div> <p class="tutoriel">En déployant le pannel situé à la droite de la carte,
        vous pouvez cocher certaines cases qui vous permettent de masquer certaines éléments de la carte
        comme les infrastructures, les cours d'eaux ou encore les profondeurs.</p>
      <img class="gif" src="image/10.gif" border="0"></div>

    <a name="tutogestion" id="tutogestion"> <h2 style="text-align:center;">V – Gestion du temps</h2></a>
    </br>

    <h3>1 – Mettre la Simulation en pause</h3>
    </br>
    <div> <p class="tutoriel">Grace au bouton "PLAY"/"PAUSE" en bas de la carte vous pourrez gérer le temps
        et ainsi organiser vos simulations comme vous le souhaitez.</p>
      <img class="gif" src="image/11.gif" border="0"></div>


    <h3>2 – Changer la vitesse de la simulation</h3>
    </br>
    <div> <p class="tutoriel">Vous pourrez changer la vitesse de la simulation avec les différentes accélérations possibles
        proposés dans la roulette en bas la carte.</p>
      <img class="gif" src="image/12.gif" border="0"></div>

    <a name="tutosauvegarde" id="tutosauvegarde"> <h2 style="text-align:center;">VI - Sauvegarde </h2></a>
    </br>

    <h3>1 – Sauvegarder une carte</h3>
    </br>
    <div> <p class="tutoriel">Pour sauvegarder une carte, déployez le pannel sur la droite de la carte
        puis entrez le nom et la description que vous souhaitez saisir pour cette sauvegarde de carte.
        Vous pouvez également actualisez votre sauvegarde sur une même carte.</p>
      <img class="gif" src="image/13.gif" border="0"></div>

    <h3>2 – Charger une carte</h3>
    </br>
    <div> <p class="tutoriel">Dans le menu de départ, si vous vous rendez dans « Charger une carte »
        pour voir les différentes sauvegardes effectuées. Vous pourrez alors charger une sauvegarde de carte
        en cliquant sur le bouton. vous pouvez également supprimer la sauvegarde.</p>
      <img class="gif" src="image/14 2.gif" border="0"></div>


  </div>
  <script type="text/javascript" charset="utf-8" src="js/jquery.tubular.1.0.js"></script>
  <script type="text/javascript" charset="utf-8" src="js/scriptIndex.js"></script>

</main></body>