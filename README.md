<h1> BapMarineNationale </h1>

Notes techniques sur la BapMarineNationale; réalisée au second semestre de l'année 2015/2016.
Projet réalisé par Quentin Delamare, Simon Antonelli, Theo Hinfray, Mathieu Rella et Nicolas Gauvin dans le cadre de l'agence MDR.

<h2>Installation complète (Windows):</h2>

<h3>Installation de Git for Windows :</h3> 

1. Téléchargez <a href="https://github.com/git-for-windows/git/releases/v2.10.2.windows.1">Git for Windows</a> (en bas de la page).
2. Installez dans "C:/Program Files/Git", puis séléctionnez toutes les cases sauf la dernière, puis séléctionnez "Use Git from Git Bash only", puis laisez tout par défault.
3. Trouvez Git Bash sur votre Bureau et lancez-le. Ceci est votre <strong>Console Git</strong> dans laquelle vous ferez vos commandes Git.

<h2>Mise en place des fichiers :</h2>

1. Dans le dossier "C:/MAMP/htdocs", créez un dossier qui sera votre dossier du projet.
2. Ouvrez votre Console Git et tapez <code>cd C:/MAMP/htdocs/votre_dossier</code> et appuyez sur Enter.
3. Puis tapez <code>git clone https://github.com/NicolasGauvin/BapMarineNationale.git</code> et appuyez sur Enter.

<strong>Importation de la base de données:</strong><br>
Importer sur PhpMyAdmin la fichier .sql de votre choix. Vous trouverez ce fichier dans le fichier "sql".<br>
Si vous souhaitez importer la base de donnée, prenez le fichier marine_nationale_db.<br>
Si vous souhaitez seulement la table , prenez le fichier marine_nationale_table.<br>

<strong>Changement des identifiants de connection à la base de donnée:</strong><br>
Copiez/collez le contenu de "db.php.example" dans un nouveau fichier que vous nommerez "db.php".<br>
Remplacez les informations par celles de votre base de données.<br>
(<i>ATTENTION</i> :  ne pas supprimer ou renommer le fichier initial)<br>

<strong>Mise en place de la repository:</strong><br>
Clonez la repository dans le dossier web de la de votre serveur local (MAMP,WAMP...) ou uploadez la sur votre serveur en ligne.<br>


<h2>Architecture du code :</h2>

<i>index.php</i>|page d'accueil<br>
<i>load.php</i>|script php récupérant les informations d'une sauvagarde si la page actuelle est une carte sauvagardée<br>
<i>map.php</i>|page principale du projet; c'est la page où on trouve la carte<br>
<i>sauveguarde.php</i>|script php permettant de sauveguarder une nouvelle carte ou d'écraser une sauvegarde existant<br>
<i>delete.php</i>|script php permettant de supprimer une carte<br>
<i>db.php.example</i>|voir setup de l'installation partie 2<br>
<i>.gitignore</i>|fichier empechant le partage de db.php (voir setup) pour ne pas créer des conflits<br>

<strong>dossier sql</strong><br>
    <i>save_marine_db.sql</i>|fichier d'export de la base de données<br>
    <i>save_marine_table.sql</i>|fichier d'export de la table sql<br>

<strong>dossier image</strong><br>
    toutes les pictos, les image d'unités ou d'éléments<br>
  
<strong>dossier js</strong><br>
    <i>coord.js</i>|fichier comprenant les coordonnées de la carte ainsi que la fonctionalité de filtres<br>
    <i>function.js</i>|fichier comprenant des scripts de de mise en page (sidebar...) et une partie de la fonctionnalité de radar<br>
    <i>icone.js</i>|fichier comprenant toutes les icones (principalement les icones d'unités)<br>
    <i>jquery.tubular.js</i>|script d'affichage de la vidéo d'index<br>
    <i>leaflet.js</i>|fichier js de la librairie leaflet<br>
    <i>leaflet-src.js</i>|fichier js de la librairie leaflet<br>
    <i>map.js</i>|fichier principale de js. Gestion des bateaux, des formes, du radar, du chargement de la sauvegarde...<br>
    <i>onglet.js</i>|fichier js de gestion des onglets dans les paramètres<br>
    <i>sauveguarde.js</i>|fichier de sauveguarde (principalement de preparation de la save des bateaux)<br>
    <i>scriptIndex.js</i>|divers scripts d'affichage de la page index.php<br>
  
  <strong>dossier css</strong><br>
    <i>leaflet.css</i>|fichier de style de la librairie leaflet<br>
    <i>reset.css</i>|ficher de style pour reste les charactéristiques de chaque naviguateurs<br>
    <i>screen.css</i>|fichier de style du plugin de vidéo tubular<br>
    <i>style.css</i>|fichier de style d ela page map.php<br>
    <i>styleIndex.css</i>|fichier de style de la page index.php<br>
