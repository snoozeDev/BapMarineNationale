<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" href="js/Leaflet-0.7.7/leaflet.css" />
  <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>



  <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />

  <script type="text/javascript">
    function change_onglet(name)
    {
      document.getElementById('onglet_'+anc_onglet).className = 'onglet_0 onglet';
      document.getElementById('onglet_'+name).className = 'onglet_1 onglet';
      document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
      document.getElementById('contenu_onglet_'+name).style.display = 'block';
      anc_onglet = name;
    }
  </script>


</head>

<body onload="initialize()">

  <div id="ajout_pins" class="pop_up_inv hide"><div  class="pop_up">

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
      <input id="label_text" class="formula" placeholder="Votre texte"><br><br>


      <a href="#" class="btn"  id="drawText">Ajouter texte</a>

    </div>
    
    <div id="form_circle" class="formulaire hide">
     <p class="title">Créer un cercle</p>

     <p class="align">Taille du cercle</p>
     <select class="formula" id="taille_circle" name="taille_cercle">
      <option value="50000">Petit</option>
      <option value="100000">Moyen</option>
      <option value="200000">Grand</option>
    </select>
    <p class="align">Couleur du cercle</p>
    <select class="formula" id="color_circle" name="color_circle">
      <option value="blue">Bleu</option>
      <option value="red">Rouge</option>
      <option value="green">Vert</option>
      <option value="gray">Gris</option>
    </select>

    <a href="#" class="btn"  id="drawCircle">Ajouter Cercle</a>

  </div>
  <div id="form_polygone" class="formulaire hide">
   <p class="title">Créer une forme</p>
   <p class="align">Couleur de la forme</p>
   <select class="formula" id="color_polygone" name="color_polygone">
    <option value="blue">Bleu</option>
    <option value="red">Rouge</option>
    <option value="green">Vert</option>
    <option value="gray">Gris</option>
  </select><br>
  <a href="#"  class="btn" id="drawPolygon">Ajouter Polygone</a>

</div>
<div id="form_polyline" class="formulaire hide">
 <p class="title">Créer une ligne</p>
 <p>Couleur de la ligne</p>
 <select class="formula" id="color_polyline" name="color_polyline">
  <option value="blue">Bleu</option>
  <option value="red">Rouge</option>
  <option value="green">Vert</option>
  <option value="gray">Gris</option>
</select><br>
<a href="#" class="btn"  id="drawPolyline">Ajouter Polyline</a>

</div>

</div>




</form>
</div></div>
<div id="ajout_bateau" class="pop_up_inv hide"><div  class="pop_up">
 <div class="formulaire_bat">
   <p class="title"> DÉPLACEMENT </p>
   <label>Type de vehicule</label><br>
   <select class="formula" id="type_bateau" name="type_bateau">
    <option value="porte-avion">Porte-avion</option>
    <option value="cuirasse">Cuirasse</option>
    <option value="destroyer">Destroyer</option>
    <option value="helico">Helico</option>
    <option value="avion">Avion</option>
  </select>
  <label>Vitesse du trajet (en noeud)</label><br>
  <input type="text" id="vitesse_bateau" value="15"><br><br>

  <label>Distance du radar (en km)</label><br>
  <input type="text" id="radar" value="800"><br><br>
  
  <label>Alignement</label><br>
  <select class="formula" id="color_bateau" name="color_bateau">
    <option value="blue">Allié</option>
    <option value="green">Neutre</option>
    <option value="red">Ennemi</option>
  </select><br>

  <label>Description (facutatif)</label><br>
  <textarea class="formula" id="description" name="description"></textarea>
  <a href="#" class="btn" id="drawTrajet">Ajouter Trajet</a>

</div>
</div></div>
 <div class="simulation">

                <a href="#" class="btn" id="simulation">Mode Simulation</a>
                <a href="#" class="btn" id="admin">Mode Administrateur</a>
              </div>
<div class="big_btn">
 <div id="cont">
  <div class="timer">
    <div id="timerbtn">
     <img src="image/play.png" style="display:inline-block" id="play" class="btntime">
     <img src="image/pause.png" style="display:none"  id="pause" class="btntime">
   </div>
   
   <div id="timer">


     <span id="days">00J</span><br> 
     <span id="hours">00H:</span>
     <span id="mins">00M</span>  

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
              <option value="100">100</option>



            </select></div></div></div></div>

            <img id="boussole" src="image/boussole.png">
            <div id="map">



            </div>
            <div id="toolbar">
              <div class="forme" id="bateau"> <img src="image/bateau.png"></div>

              <div class="forme" id="forme"> <img src="image/forme.png"></div>
            </div>

            <div class="stop">
              <input class="hide" id="editVitesse" placeholder="Votre Vitesse"><br>

              <div class="hide btn_finish forme" id="stopDraw"> <img src="image/formev2.png"></div>
              <div class="hide btn_finish forme" id="stopDrawPolyline"> <img src="image/formev2.png"></div>
              <div class="hide btn_finish forme" id="stopEditPolyline"> <img src="image/bateauv2.png"></div>
              <div class="hide btn_finish forme" id="stopDrawTrajet"> <img src="image/bateauv2.png"></div>


            </div>


            <button id="sidebar-btn" class="sidebar-btn">
              <img id="menu-stripes1" src="image/menu.png">
            </button>
            <section id="sidebar" class="sidebar">
              <div class="settings">
                <h1>Parametres</h1>

                <div class="onglets">
                  <span class="onglet_0 onglet" id="onglet_filtres" onclick="javascript:change_onglet('filtres');">Filtres</span>
                  <span class="onglet_0 onglet" id="onglet_suppression" onclick="javascript:change_onglet('suppression');">Suppression</span>
                </div>

                <!-- <button id="onglet-btn" class="onglet1-btn onglet-btn active">
                 <h2>Filtres</h2>
               </button>
               <button id="onglet-btn" class="onglet2-btn onglet-btn inactive">
                <h2>Suppression</h2>
              </button> -->

              <!-- <div class="onglet1 is-open"> -->
              <div class="contenu_onglet" id="contenu_onglet_filtres">
                <div class="filtres-cont">
                  <div style="padding-top:30px" class="bouton">
                    <input class="checkbox" id="checkbox1"  type="checkbox">
                    <label id="profondeur" for="checkbox1"></label>
                    <span class="filtres">Cacher les profondeurs</span>
                  </div><br>
                  <div class="bouton">
                    <input class="checkbox" id="checkbox2"  type="checkbox">
                    <label  id="riv" for="checkbox2"></label>
                    <span class="filtres">Cacher les côtes et les rivières</span>
                  </div><br>
                  <div class="bouton">
                    <input class="checkbox" id="checkbox3" type="checkbox">
                    <label  id="structures" for="checkbox3"></label>
                    <span class="filtres">Cacher les structures</span>
                  </div><br>
                </div>
              </div>


              <!-- <div class="onglet2 is-closed" style="background-color: #2C3E50;"> -->
              <div class="contenu_onglet" id="contenu_onglet_suppression">

              <div class="delete" style="position: relative;">


                  <div class="delete_polyline" style="color: white;">
                    <div class="share-wrap">
                      <div class="main-bar1 main-bar" style="color: #2C3E50;">Ligne(s)<span><img src="http://image.noelshack.com/fichiers/2016/20/1463653455-dropdown.png"/></span></div>

                      <ul class="lignes">

                        <br/>
                        <li>  <p class="delete_polyline_p"></p> </li>
                      </ul>
                    </div>


                    <div class="delete_cercle">
                      <div class="share-wrap">
                        <div class="main-bar2 main-bar" style="color: #2C3E50;">Cercle(s)<span><img src="http://image.noelshack.com/fichiers/2016/20/1463653455-dropdown.png"/></span></div>
                        <ul class="cercle">
                          <br/>
                          <li> <p class="delete_cercle_p"></p></li>
                        </ul>
                      </div>
                    </div>


                    <div class="delete_texte">
                      <div class="share-wrap">
                        <div class="main-bar3 main-bar" style="color: #2C3E50;">Texte(s)<span><img src="http://image.noelshack.com/fichiers/2016/20/1463653455-dropdown.png"/></span></div>
                        <ul class="texte">
                          <br/>
                          <li> <p class="delete_texte_p"></p></li>
                        </ul>
                      </div>
                    </div>


                    <div class="delete_polygone">
                      <div class="share-wrap">
                        <div class="main-bar4 main-bar" style="color: #2C3E50;">Polygone(s)<span><img src="http://image.noelshack.com/fichiers/2016/20/1463653455-dropdown.png"/></span></div>
                        <ul class="polygone">
                          <br/>
                          <li>  <p class="delete_polygone_p"></p></li>
                        </ul>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
             

              <script type="text/javascript">
                var anc_onglet = 'filtres';
                change_onglet(anc_onglet);
              </script>



            </section>

            <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
            <script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

            <script type="text/javascript" src="js/function.js"></script>
            <script type="text/javascript" src="js/icone.js"></script>
            <script type="text/javascript" src="js/map.js"></script>
            <script type="text/javascript" src="js/onglet.js"></script>
            <script src="js/Leaflet-0.7.7/leaflet.js"></script> 


            <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
            <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

            <script>







              var sidebar = (function() {
                "use strict";

                var $contnet         = $('#content'),
                $sidebar         = $('#sidebar'),
                $sidebarBtn      = $('#sidebar-btn'),
                $toggleCol       = $('body').add($contnet).add($sidebarBtn),
                sidebarIsVisible = false;

                $sidebarBtn.on('click', function() {

                  if (!sidebarIsVisible) {
                    bindContent();
                  } else {
                    unbindContent();
                  }

                  toggleMenu();
                });


                function bindContent() {

                  $contnet.on('click', function() {
                    toggleMenu();
                    unbindContent();
                  });
                }

                function unbindContent() {
                  $contnet.unbind();
                }

                function toggleMenu() {

                  $toggleCol.toggleClass('sidebar-show');
                  $sidebar.toggleClass('show');

                  var image = document.getElementById('menu-stripes1');

                  if (!sidebarIsVisible) {

                    image.src = "image/cancel.png"; 
                    sidebarIsVisible = true;
                  } else {
                    image.src = "image/menu.png"; 
                    sidebarIsVisible = false;
                  }
                }


                var $menuToggle = $sidebar.find('.menu-toggle');

                $menuToggle.each(function() {

                  var $this       = $(this),
                  $submenuBtn = $this.children('.menu-toggle-btns').find('.menu-btn'),
                  $submenu    = $this.children('.submenu');

                  $submenuBtn.on('click', function(e) {
                    e.preventDefault();
                    $submenu.slideToggle();
                    $(this).toggleClass('active');
                  });
                });

              })();


            </script>

            <script>
              $(document).ready(function(e){
                $('.main-bar1').on('click',function(){
                  $('ul.lignes').slideToggle(1000);
                });
              })
            </script>
            <script>
              $(document).ready(function(e){
                $('.main-bar2').on('click',function(){
                  $('ul.cercle').slideToggle(1580);
                });
              })
            </script>
            <script>
              $(document).ready(function(e){
                $('.main-bar3').on('click',function(){
                  $('ul.texte').slideToggle(1580);
                });
              })
            </script>
            <script>
              $(document).ready(function(e){
                $('.main-bar4').on('click',function(){
                  $('ul.polygone').slideToggle(1580);
                });
              })
            </script>


          </body>
          </html>

