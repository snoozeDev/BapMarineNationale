<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="css/leaflet.css" />
    <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>



<!--    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />-->

    <script type="text/javascript">
        function change_onglet(name) {
            document.getElementById('onglet_' + anc_onglet).className = 'onglet_0 onglet';
            document.getElementById('onglet_' + name).className = 'onglet_1 onglet';
            document.getElementById('contenu_onglet_' + anc_onglet).style.display = 'none';
            document.getElementById('contenu_onglet_' + name).style.display = 'block';
            anc_onglet = name;
        }
    </script>


</head>

<body>
    <div id="ajout_batiment" class="pop_up_inv hide">
        <div class="pop_up">
            <p class="title"> BATIMENTS </p>
            <select class="formula" id="icone_select" name="icone_select">
                <option value="port">Port</option>
                <option value="offshore">Offshore</option>
                <option value="phare">Phare</option>
                <option value="ville">Ville</option>
                <option value="village">Village</option>

            </select>
            <img src="image/port.png" id="icone_img">

            <label>Description (facutatif)</label>
            <br>
            <textarea class="formula" id="bati_describ" name="description"></textarea>

            <a href="#" class="btn" id="drawBatiment">Ajouter le batiment</a>
        </div>
    </div>
    <div class="grade_circle">
        <div class="value">0</div>
        <input id="grade" type="range" min="10" max="1500" step="10" value="50">

    </div>
    <div id="ajout_pins" class="pop_up_inv hide">
        <div class="pop_up">

            <form>
                <p class="title"> FORMES </p>
                <div id="selecteur">
                    <a class="btn_text btn" id="btn_text">Texte</a>
                    <a class="btn_circle btn" id="btn_circle">Cercle</a>
                    <a class="btn_polygone btn" id="btn_polygone">Polygone</a>
                    <a class="btn_polyline btn" id="btn_polyline">Lignes</a></div>
                <div class="ligne">
                    <div id="form_text" class="formulaire hide">
                        <p class="title"> Ecrire sur la carte </p>
                        <input id="label_text" class="formula" placeholder="Votre texte">
                        <br>
                        <br>


                        <a href="#" class="btn" id="drawText">Ajouter texte</a>

                    </div>

                    <div id="form_circle" class="formulaire hide">
                        <p class="title">Créer un cercle</p>

                        <p class="align">Taille du cercle</p>
                        <select class="formula" id="taille_circle" name="taille_cercle">
                            <option value="50000">100 km</option>
                            <option value="250000">500 km</option>
                            <option value="500000">1000 km</option>
                        </select>
                        <p class="align">Couleur du cercle</p>
                        <select class="formula" id="color_circle" name="color_circle">
                            <option value="blue">Bleu</option>
                            <option value="red">Rouge</option>
                            <option value="green">Vert</option>
                            <option value="gray">Gris</option>
                        </select>

                        <a href="#" class="btn" id="drawCircle">Ajouter Cercle</a>

                    </div>
                    <div id="form_polygone" class="formulaire hide">
                        <p class="title">Créer une forme</p>
                        <p class="align">Couleur de la forme</p>
                        <select class="formula" id="color_polygone" name="color_polygone">
                            <option value="blue">Bleu</option>
                            <option value="red">Rouge</option>
                            <option value="green">Vert</option>
                            <option value="gray">Gris</option>
                        </select>
                        <br>
                        <a href="#" class="btn" id="drawPolygon">Ajouter Polygone</a>

                    </div>
                    <div id="form_polyline" class="formulaire hide">
                        <p class="title">Créer une ligne</p>
                        <p>Couleur de la ligne</p>
                        <select class="formula" id="color_polyline" name="color_polyline">
                            <option value="blue">Bleu</option>
                            <option value="red">Rouge</option>
                            <option value="green">Vert</option>
                            <option value="gray">Gris</option>
                        </select>
                        <br>
                        <a href="#" class="btn" id="drawPolyline">Ajouter Polyline</a>

                    </div>

                </div>




            </form>
        </div>
    </div>
    <div class="fin">
        <h1>Vous avez été détecté !</h1>
        <a href="#" class="btn" id="fin">Retourner sur la carte</a>

    </div>
    <div id="ajout_bateau" class="pop_up_inv hide">
        <div class="pop_up">
            <div class="formulaire_bat">
                <p class="title"> DÉPLACEMENT </p>
                <label>Type de vehicule</label>
                <select class="formula" id="type_bateau" name="type_bateau">
                    <option value="porte-avion">Porte-avion</option>
                    <option value="asm">FASM</option>
                    <option value="bpc">BPC</option>
                    <option value="fs">FS</option>
                    <option value="phm">PHM</option>
                    <option value="fda">FDA</option>
                    <option value="bcr">BCR</option>
                    <option value="puma">Helico Puma</option>
                    <option value="tigre">Helico Tigre</option>
                    <option value="fennec">Helico Fennec</option>
                    <option value="avion">Mirage F1</option>
                    <option value="paquebot">Paquebot Civil</option>
                    <option value="cargo">Cargo Civil</option>
                    <option value="peche">Bateau de pêche Civil</option>

                </select>
                <label>Vitesse du trajet (en noeud)</label>
                <input class="formula" type="text" id="vitesse_bateau" value="15">

                <label>Distance du radar (en km)</label>
                <input class="formula" type="text" id="radar" value="800">

                <label>Alignement</label>
                <select class="formula" id="color_bateau" name="color_bateau">
                    <option value="blue">Allié</option>
                    <option value="green">Neutre</option>
                    <option value="red">Ennemi</option>
                </select>

                <label>Description (facutatif)</label>
                <textarea class="formula" id="description" name="description"></textarea>
                <a href="#" class="btn" id="drawTrajet">Ajouter Trajet</a>

            </div>
        </div>
    </div>

    <div class="big_btn">
        <div id="cont">
            <div class="timer">
                <div id="timerbtn">
                    <img src="image/play.png" style="position: relative;top: -10px;" id="play" class="btntime">
                    <img src="image/pause.png" style="display:none;position: relative;top: -10px;" id="pause" class="btntime">
                </div>

                <div id="timer">


                    <span id="days">00J</span>
                    <span id="hours">00H</span>
                    <span id="mins">00</span>

                </div>

                <div class="timer_number_titles">
                    <!--
              <div class="timer_number_days">
                Jours
              </div>
              <div class="timer_number_hours">
                Heures
              </div>
              <div class="timer_number_mins">
                Minutes
              </div>
            -->
                </div>


                <div>
                    <select class=" speed">

                        <option value="1">x1</option>
                        <option value="3">x3</option>
                        <option value="5">x5</option>
                        <option value="10">x10</option>
                        <option value="50">x50</option>
                        <option value="100">x100</option>



                    </select>
                </div>
            </div>
        </div>
    </div>

    <img id="boussole" src="image/boussole.png">
    <div id="map">



    </div>


    <div id="console">
        <div id="close_console">
            <p id="notif"></p>
            <img id="close" src="image/close.png">
        </div>
        <div class="black">
            <p class="reperer">Vous ne devez pas vous faire repérer</p>
            <ul>


            </ul>
        </div>
    </div>

    <div id="toolbar">
        <div class="forme" id="bateau"> <img src="image/bateau.png"></div>

        <div class="forme" id="forme"> <img src="image/forme.png"></div>
        <div class="batiment" id="batiment"> <img src="image/anchor_btn.png"></div>
    </div>

    <div class="stop">
        <input class="hide" id="editVitesse" placeholder="Votre Vitesse">
        <br>

        <div class="hide btn_finish forme" id="stopDraw"> <img src="image/formev2.png"></div>
        <div class="hide btn_finish forme" id="stopDrawPolyline"> <img src="image/formev2.png"></div>
        <div class="hide btn_finish forme" id="stopDrawCircle"> <img src="image/formev2.png"></div>
        <div class="hide btn_finish forme" id="stopEditPolyline"> <img src="image/bateauv2.png"></div>
        <div class="hide btn_finish forme" id="stopDrawTrajet"> <img src="image/bateauv2.png"></div>


    </div>


    <button id="sidebar-btn" class="sidebar-btn">
        <img id="menu-stripes1" src="image/menu.png">
    </button>
    <section id="sidebar" class="sidebar">

        <div class="settings">



            <div class="btn_retourhome">
                <a href="index.php"> Retour au menu </a>
            </div>


            <h1 class="parametre">Parametres</h1>

            <div class="onglets">

                <span class="onglet_0 onglet" id="onglet_options" onclick="javascript:change_onglet('options');">Options</span>
                <span class="onglet_0 onglet" id="onglet_suppression" onclick="javascript:change_onglet('suppression');">Suppression</span>
            </div>

            <!-- <button id="onglet-btn" class="onglet1-btn onglet-btn active">
                 <h2>Filtres</h2>
               </button>
               <button id="onglet-btn" class="onglet2-btn onglet-btn inactive">
                <h2>Suppression</h2>
              </button> -->

            <!-- <div class="onglet1 is-open"> -->
            <div class="contenu_onglet" id="contenu_onglet_options">
                <div class="options-cont">
                    <h3 class="filtres_title">Filtres des éléments natifs</h3>
                    <div  class="bouton  filtres">
                        <input class="checkbox" id="checkbox1" type="checkbox">
                        <label id="profondeur" for="checkbox1"></label>
                        <span class="options">Cacher les profondeurs</span>
                    </div>
                    
                    <div class="bouton">
                        <input class="checkbox" id="checkbox2" type="checkbox">
                        <label id="riv" for="checkbox2"></label>
                        <span class="options">Cacher les côtes et les rivières</span>
                    </div>
                    
                    <div class="bouton">
                        <input class="checkbox" id="checkbox3" type="checkbox">
                        <label id="structures" for="checkbox3"></label>
                        <span class="options">Cacher les structures</span>
                    </div>
                    
                </div>
                <div>
                    <form class="sauvegarde" action='sauveguarde.php' method='post' id='myform'>
                        <?php 
                    if(isset($_GET['id']) && ($_GET['id'] !=null)){
                      
                        include 'db.php';   
 
     

    
    
    
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT id, mapName, mapDescription, cercles, polygs, texts, polyls, batis, bateaux FROM save_marine_table";
$result = $conn->query($sql);

    
    
    while($row = $result->fetch_assoc()) {
        if($row["id"] == $_GET["id"]){  
          echo '<h3 class="sauvegarde_title" style="color:black">Carte actuelle :</h3><p style="color:black;text-align:center">'.$row["mapName"].'</p><input name="idUpdate" type="hidden" value="'.$row["id"].'"><button id="insert2" name="update" class="save" >Ecraser la sauvegarde</button>';
        }
    }
    
}
?>
                          
                           
                            <h3 class="sauvegarde_title">Sauvegardez une nouvelle carte</h3>





                            <input class="formula" type="text" name="mapName"  placeholder="Nom de la carte">
                            <textarea class="formula" name="mapDescription" placeholder="Description de la carte"></textarea>
                            <input type="hidden" id="cer" name="cercles">
                            <input type="hidden" id="polyg" name="polygs">
                            <input type="hidden" id="text" name="texts">
                            <input type="hidden" id="polyl" name="polyls">
                            <input type="hidden" id="bati" name="batis">
                            <input type="hidden" id="bateau_save" name="bateau_save">
                            <button class="save" name="save"  id='insert'>Sauvegarder</button>

                    </form>

                </div>

                <div class="simulation">

                    <a href="#" class="btn_simulation" id="simulation">Arreter la simulation</a>
                    <a href="#" class="btn_admin" id="admin">Lancer la simulation</a>
                </div>
            </div>


            <!-- <div class="onglet2 is-closed" style="background-color: #2C3E50;"> -->
            <div class="contenu_onglet" id="contenu_onglet_suppression">

                <div class="delete" style="position: relative;">

                    <div class="delete_batiment" style="color: white;">
                        <div class="share-wrap">
                            <div class="main-bar5 main-bar" style="color: #2C3E50;">Batiment(s)<span><img src="image/dropdown-bas%20suppression.png"/></span></div>

                            <ul class="batiments">


                                <p class="delete_batiment_p"></p>
                            </ul>
                        </div>
                    </div>

                    <div class="delete_polyline" style="color: white;">
                        <div class="share-wrap">
                            <div class="main-bar1 main-bar" style="color: #2C3E50;">Ligne(s)<span><img src="image/dropdown-bas%20suppression.png"/></span></div>

                            <ul class="lignes">


                                <p class="delete_polyline_p"></p>
                            </ul>
                        </div>
                    </div>

                    <div class="delete_cercle">
                        <div class="share-wrap">
                            <div class="main-bar2 main-bar" style="color: #2C3E50;">Cercle(s)<span><img src="image/dropdown-bas%20suppression.png"/></span></div>
                            <ul class="cercle">

                                <p class="delete_cercle_p"></p>
                            </ul>
                        </div>
                    </div>


                    <div class="delete_texte">
                        <div class="share-wrap">
                            <div class="main-bar3 main-bar" style="color: #2C3E50;">Texte(s)<span><img src="image/dropdown-bas%20suppression.png"/></span></div>
                            <ul class="texte">

                                <p class="delete_texte_p"></p>
                            </ul>
                        </div>
                    </div>


                    <div class="delete_polygone">
                        <div class="share-wrap">
                            <div class="main-bar4 main-bar" style="color: #2C3E50;">Polygone(s)<span><img src="image/dropdown-bas%20suppression.png"/></span></div>
                            <ul class="polygone">

                                <p class="delete_polygone_p"></p>
                            </ul>
                        </div>
                    </div>

                </div>



            </div>


            <script type="text/javascript">
                var anc_onglet = 'options';
                change_onglet(anc_onglet);
            </script>


        </div>
    </section>

    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>

    <script src="js/leaflet.js"></script>
    <script type="text/javascript" src="js/icone.js"></script>
    <script type="text/javascript" src="js/map.js" charset="UTF-8"></script>
    <script src='js/coord.js'></script>
    <script type="text/javascript" src="js/function.js"></script>



    <script type="text/javascript" src="js/onglet.js"></script>



<!--
    <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />
-->

    <script>

    </script>






    <script src='js/sauveguarde.js'></script>

    <?php include 'load.php' ?>

</body>

</html>