<h1> BapMarineNationale </h1>

Notes techniques sur la BapMarineNationale; réalisée au second semestre de l'année 2015/2016.
Projet réalisé par Quentin Delamare, Simon Antonelli, Theo Hinfray, Mathieu Rella et Nicolas Gauvin dans le cadre de l'agence MDR.

<h2>Pour les A2 | Installation complète :</h2>

<strong>Nécessite MAMP (Mac) / WAMP (Windows) ET Git ( Lien Windows : <a href="https://git-scm.com/download/win">https://git-scm.com/download/win</a>)</strong>

<strong>Utilisation de Git</strong> : <a href="http://www.commentcamarche.net/faq/13094-utiliser-git-sous-windows">http://www.commentcamarche.net/faq/13094-utiliser-git-sous-windows</a> (sans faire le test)

### Windows :
<ol>
	<li> Allez dans le dossier /htdocs de WAMP et creez un dossier pour le projet.</li>
	<li> </li>
</ol>


<h2>Setup de l'installation :</h2>

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
