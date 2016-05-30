        //fonction booléenne affichage ou non
    //var valider = "non";
    var simulation=false;
    
    var detection = [];
    var bateaux = []; //tableau de tous les bateaux
  bat = 0;
    var drawTrajetButton = document.getElementById('drawTrajet');
    var currentTrajet = {}; //Empty object to be used later;
    var CurrentIcon;
    var CurrentSpeed;
    var id;
    var currentPolyline2 = {};
    var editIcon = {};
    var editVitesse;
    var editColor;
    var editTypeVitesse;
    var editType;
var editDetection;
var editCurrentLine;
    var editDescription;
    var suppression;
    var editSpeed;
    var changerVitesse; //booléen si c'est juste un changement de vitesse
    var nouveauTrajet; //booléan pour éviter bug
    var deleteUltime = false;

    var map = L.map('map');
    initialize();

function initialize() { //fonction qui permet de charger la carte au lancement de la page
    //initialisation de la map
    

    map.setView([-1.743, 4.8], 5);



   
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: ' <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        , maxZoom: 19,


    }); 
       // map.addLayer(TopoLayer);  
    //L.control.fullscreen().addTo(map);
    map.addLayer(osmLayer);

    $(".leaflet-control-fullscreen-button").click(function () {

        var currentDisplay = $("#map").css('display');

        if (currentDisplay == "inline-block") {
            $("#map").css("display", "block");
        } else {

        }

    });

}



    //    PLUGIN MIVING MARKER
    L.interpolatePosition = function (p1, p2, duration, t) {
        var k = t / duration;
        k = (k > 0) ? k : 0;
        k = (k > 1) ? 1 : k;
        return L.latLng(p1.lat + k * (p2.lat - p1.lat)
            , p1.lng + k * (p2.lng - p1.lng));
    };

    L.Marker.MovingMarker = L.Marker.extend({

        //state constants
        statics: {
            notStartedState: 0
            , endedState: 1
            , pausedState: 2
            , runState: 3
        },

        options: {
            autostart: false
            , loop: false
        , },

        initialize: function (latlngs, durations, options) {
            L.Marker.prototype.initialize.call(this, latlngs[0], options);

            this._latlngs = latlngs.map(function (e, index) {
                return L.latLng(e);
            });

            if (durations instanceof Array) {
                this._durations = durations;
            } else {
                this._durations = this._createDurations(this._latlngs, durations);
            }

            this._currentDuration = 0;
            this._currentIndex = 0;

            this._state = L.Marker.MovingMarker.notStartedState;
            this._startTime = 0;
            this._startTimeStamp = 0; // timestamp given by requestAnimFrame
            this._pauseStartTime = 0;
            this._animId = 0;
            this._animRequested = false;
            this._currentLine = [];
            this._stations = {};
        },

        isRunning: function () {
            return this._state === L.Marker.MovingMarker.runState;
        },

        isEnded: function () {
            return this._state === L.Marker.MovingMarker.endedState;
        },

        isStarted: function () {
            return this._state !== L.Marker.MovingMarker.notStartedState;
        },

        isPaused: function () {
            return this._state === L.Marker.MovingMarker.pausedState;
        },

        start: function () {
            if (this.isRunning()) {
                return;
            }

            if (this.isPaused()) {
                this.resume();
            } else {
                this._loadLine(0);
                this._startAnimation();
                this.fire('start');
            }
        },

        resume: function () {
            if (!this.isPaused()) {
                return;
            }
            // update the current line
            this._currentLine[0] = this.getLatLng();
            this._currentDuration -= (this._pauseStartTime - this._startTime);
            this._startAnimation();
        },

        pause: function () {
            if (!this.isRunning()) {
                return;
            }

            this._pauseStartTime = Date.now();
            this._state = L.Marker.MovingMarker.pausedState;
            this._stopAnimation();
            this._updatePosition();
        },

        stop: function (elapsedTime) {

            map.removeLayer(this.stock);
            this._latlngs = null;

            if (this.isEnded()) {
                return;
            }

            this._stopAnimation();

            if (typeof (elapsedTime) === 'undefined') {
                // user call
                elapsedTime = 0;
                this._updatePosition();
            }

            this._state = L.Marker.MovingMarker.endedState;
            this.fire('end', {
                elapsedTime: elapsedTime
            });
        },

        addLatLng: function (latlng, duration) {
            this._latlngs.push(L.latLng(latlng));
            this._durations.push(duration);
        },

        moveTo: function (latlng, duration) {
            this._stopAnimation();
            this._latlngs = [this.getLatLng(), L.latLng(latlng)];
            this._durations = [duration];
            this._state = L.Marker.MovingMarker.notStartedState;
            this.start();
            this.options.loop = false;
        },

        addStation: function (pointIndex, duration) {
            if (pointIndex > this._latlngs.length - 2 || pointIndex < 1) {
                return;
            }
            this._stations[pointIndex] = duration;
        },

        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);

            if (this.options.autostart && (!this.isStarted())) {
                this.start();
                return;
            }

            if (this.isRunning()) {
                this._resumeAnimation();
            }
        },

        onRemove: function (map) {
            L.Marker.prototype.onRemove.call(this, map);
            this._stopAnimation();
        },

        _createDurations: function (latlngs, duration) {
            var lastIndex = latlngs.length - 1;
            var distances = [];
            var totalDistance = 0;
            var distance = 0;

            // compute array of distances between points
            for (var i = 0; i < lastIndex; i++) {
                distance = latlngs[i + 1].distanceTo(latlngs[i]);
                distances.push(distance);
                totalDistance += distance;
            }

            var ratioDuration = duration / totalDistance;

            var durations = [];
            for (i = 0; i < distances.length; i++) {
                durations.push(distances[i] * ratioDuration);
            }

            return durations;
        },

        _startAnimation: function () {
            this._state = L.Marker.MovingMarker.runState;
            this._animId = L.Util.requestAnimFrame(function (timestamp) {
                this._startTime = Date.now();
                this._startTimeStamp = timestamp;
                this._animate(timestamp);
            }, this, true);
            this._animRequested = true;
        },

        _resumeAnimation: function () {
            if (!this._animRequested) {
                this._animRequested = true;
                this._animId = L.Util.requestAnimFrame(function (timestamp) {
                    this._animate(timestamp);
                }, this, true);
            }
        },

        _stopAnimation: function () {
            if (this._animRequested) {
                L.Util.cancelAnimFrame(this._animId);
                this._animRequested = false;
            }
        },

        _updatePosition: function () {
            var elapsedTime = Date.now() - this._startTime;
            this._animate(this._startTimeStamp + elapsedTime, true);
        },

        _loadLine: function (index) {



            this._currentIndex = index;
            this._currentDuration = this._durations[index];
            this._currentLine = this._latlngs.slice(index, index + 2);
        },

        /**
         * Load the line where the marker is
         * @param  {Number} timestamp
         * @return {Number} elapsed time on the current line or null if
         * we reached the end or marker is at a station
         */
        _updateLine: function (timestamp) {
            // time elapsed since the last latlng
            var elapsedTime = timestamp - this._startTimeStamp;

            // not enough time to update the line
            if (elapsedTime <= this._currentDuration) {
                return elapsedTime;
            }

            var lineIndex = this._currentIndex;
            var lineDuration = this._currentDuration;
            var stationDuration;

            while (elapsedTime > lineDuration) {
                // substract time of the current line
                elapsedTime -= lineDuration;
                stationDuration = this._stations[lineIndex + 1];

                // test if there is a station at the end of the line
                if (stationDuration !== undefined) {
                    if (elapsedTime < stationDuration) {
                        this.setLatLng(this._latlngs[lineIndex + 1]);
                        return null;
                    }
                    elapsedTime -= stationDuration;
                }

                lineIndex++;

                // test if we have reached the end of the polyline
                if (lineIndex >= this._latlngs.length - 1) {

                    if (this.options.loop) {
                        lineIndex = 0;
                        this.fire('loop', {
                            elapsedTime: elapsedTime
                        });
                    } else {
                        // place the marker at the end, else it would be at
                        // the last position
                        this.setLatLng(this._latlngs[this._latlngs.length - 1]);
                        this.stop(elapsedTime);
                        return null;
                    }
                }
                lineDuration = this._durations[lineIndex];
            }

            this._loadLine(lineIndex);
            this._startTimeStamp = timestamp - elapsedTime;
            this._startTime = Date.now() - elapsedTime;
            return elapsedTime;
        },

        _animate: function (timestamp, noRequestAnim) {
            this._animRequested = false;

            // find the next line and compute the new elapsedTime
            var elapsedTime = this._updateLine(timestamp);

            if (this.isEnded()) {
                // no need to animate
                return;
            }

            if (elapsedTime != null) {
                // compute the position
                var p = L.interpolatePosition(this._currentLine[0]
                    , this._currentLine[1]
                    , this._currentDuration
                    , elapsedTime);
                this.setLatLng(p);
            }

            if (!noRequestAnim) {
                this._animId = L.Util.requestAnimFrame(this._animate, this, false);
                this._animRequested = true;
            }
        }
    });

    L.Marker.movingMarker = function (latlngs, duration, options) {
        return new L.Marker.MovingMarker(latlngs, duration, options);
    };

    

    //affichage toolbar et popup

    $('#bateau').click(function () { //faire apparaittre le popup des bateaux
        $('#ajout_bateau').css('display', 'block');
    });
    $('#forme').click(function () { //faire apparaittre le popup des formes
        $('#ajout_pins').css('display', 'block');
    });
    $('#batiment').click(function () { //faire apparaittre le popup des batiments
        $('#ajout_batiment').css('display', 'block');
    });
    $(document).mouseup(function (e) {              //clique en dehors
        var container = $("#ajout_pins");
        if (container.has(e.target).length === 0)
            container.hide();
        var container2 = $("#ajout_bateau");
        if (container2.has(e.target).length === 0)
            container2.hide();
        var container3 = $("#ajout_batiment");
        if (container3.has(e.target).length === 0)
            container3.hide();
    });

    $('.btn_finish').click(function () { //faire disparaitre le bouton draw finish
        $('.btn_finish').css('display', 'none');
    });
    $('#btn_text').click(function () { //faire apparaitre le form de texte
        $('.formulaire').css('display', 'none');
        $('#form_text').css('display', 'block');

    });
    $('#btn_circle').click(function () { //faire apparaitre le form de circle
        $('.formulaire').css('display', 'none');
        $('#form_circle').css('display', 'block');

    });
    $('#btn_polygone').click(function () { //faire apparaitre le form de polygone
        $('.formulaire').css('display', 'none');
        $('#form_polygone').css('display', 'block');

    });
    $('#btn_polyline').click(function () { //faire apparaitre le form de polyline
        $('.formulaire').css('display', 'none');
        $('#form_polyline').css('display', 'block');

    });

 
    
  

 

    //ajout de marker pour le test






    //    OUTIL POUR AFFICHER LES LAT LNG AU CLICK
    //	var popup = L.popup();
    //		function onMapClick(e) {
    //			popup
    //			.setLatLng(e.latlng)
    //			.setContent(e.latlng.toString())
    //			.openOn(map);
    //		}
    //    map.on('click', onMapClick);

    //    **************************************

    //création du plugin 
    // suppression 

    //ajout de batiments

    var drawBatimentButton = document.getElementById('drawBatiment');
    var batiment = [];
    var bati = 0;
    var currentBatiment = {}; //var du batiment en cours
    var batimentJson = {};

    drawBatimentButton.addEventListener('click', function () {

        $('#toolbar').hide();

        $('#ajout_batiment').css('display', 'none');
        map.on('click', addLatLngToBati); //listener des cliques sur la carte
    });

    function stop3() {
        console.log(batiment[bati]);
        $('#toolbar').show();
        map.off('click', addLatLngToBati); //on arrête d'écouter les cliques sur la map
        var elem = "batiment" + bati;    //element utile pour la suppression 
        var form = batiment[bati].type;
      
        $('.delete_batiment_p').append('<div class="bord"> <div class="margebatiment" class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div>');
        
        bati++;
        console.log(bati);
    };

    function addLatLngToBati(clickEventData) {
        var iconeBatiment = $('#icone_select').val();
        var bati_name = "batiment" + bati;
        var bati_describ = $('#bati_describ').val();

        batiment[bati] = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
            icon: L.icon({
                iconUrl: 'image/'+iconeBatiment+'.png',
                className: bati_name,
                iconSize:     [30, 30], // size of the icon
                iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            })
                
        }).addTo(map);
        batiment[bati] = batiment[bati].bindPopup(iconeBatiment+" : "+bati_describ);
        batiment[bati].type = iconeBatiment;
        console.log(batiment[bati]);
         batimentJson[bati] = [batiment[bati]._latlng,batiment[bati].type];
        var batiJsonString = JSON.stringify(batimentJson);
        $('#bati').val(batiJsonString);
        stop3(); //pour finir l'ajout


    }



    // Dessiner polygone
    var drawPolygonButton = document.getElementById('drawPolygon');
    var stopDrawButton = document.getElementById('stopDraw');
    var getDataButton = document.getElementById('getData');
    var currentPolygon = {}; //Empty object to be used later;
    var polygone = []; //tableau de toutes les polylines
    polyg = 0; //equivalent de bat pour les bateaux
    var polygJson = {};

    drawPolygonButton.addEventListener('click', function () {
        $('#ajout_pins').css('display', 'none');
        $('#stopDraw').css('display', 'block');
        var color_polygone = $('#color_polygone option:selected').val();
        polygName = "polygone" + polyg;
        polygone[polyg] = new L.polygon([], {
            className: polygName
            , clickable: false
            , color: color_polygone
        }).addTo(map);
        $('#toolbar').hide();
        map.on('click', addLatLngToPolygon); //Listen for clicks on map.

    });
    stopDraw.addEventListener('click', function() {
        $('#toolbar').show();

        var elem = "polygone" + polyg;
        var color_fr = polygone[polyg].options.color;
        polyg2 = polyg + 1;
        switch (color_fr) {
        case "blue":
            color_fr = 'bleu';
            break;
        case "green":
            color_fr = 'vert';
            break;
        case "red":
            color_fr = 'rouge';
            break;
        case "gray":
            color_fr = 'gris';
            break;
        default:
            break;
        }
     
                polygJson[polyg] = [polygone[polyg]._latlngs,polygone[polyg].options];
        var polygJsonString = JSON.stringify(polygJson);
        console.log(polygJsonString);
        $('#polyg').val(polygJsonString);
        
        
        var form = 'le polygone ' + color_fr + ' n°' + polyg2;
      
        $('.delete_polygone_p').append('<div class="bord"> <div class="margepolygone" class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div>');
        

        polyg++;

        map.off('click', addLatLngToPolygon); //Stop listening for clicks on map.
    });

    function addLatLngToPolygon(clickEventData) {

        polygone[polyg].addLatLng(clickEventData.latlng);

    }

    //ecrire texte

    var drawMarkerButton = document.getElementById('drawText');
    var texte = [];
    var tex = 0;
    var currentMarker = {}; //Empty object to be used later;
var textJson = {};

    drawMarkerButton.addEventListener('click', function () {

        $('#toolbar').hide();

        $('#ajout_pins').css('display', 'none');
        map.on('click', addLatLngToMarker); //Listen for clicks on map.
    });

    function stop2() {
        $('#toolbar').show();
        map.off('click', addLatLngToMarker); //Stop listening for clicks on map.
        var elem = "texte" + tex;
        var form = texte[tex].options.icon.options.html;
      
        $('.delete_texte_p').append('<div class="bord"> <div class="margetexte" class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div>');
        
        tex++;
    };

    function addLatLngToMarker(clickEventData) {
        //console.log(clickEventData);
        //console.log(clickEventData.latlng.lat)
        var text = $('#label_text').val();
        var text_name = "texte" + tex + " text";


        texte[tex] = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
            icon: L.divIcon({
                className: text_name
                , html: text
                , iconSize: [200, 80]
                ,iconAnchor:   [100, 17],
            })
        }).addTo(map);
        console.log(texte[tex]);
        
        textJson[tex] = [texte[tex]._latlng,text];
        var texteJsonString = JSON.stringify(textJson);
        $('#text').val(texteJsonString);
        stop2(); //pour ne pas dessiner d'autres cercles


    }

    //dessiner un cercle
    var drawCircleButton = document.getElementById('drawCircle');
    var stopDrawCircle = document.getElementById('stopDrawCircle');
    var cercle = []; //tableau de tous les cercles
    cer = 0; //equivalent de bat pour les bateaux
    var currentCircle = {}; //Empty object to be used later;
    var cercleJson = {};
    var taille;
    var color;
    var cercle_name;
    drawCircleButton.addEventListener('click', function () {
        $('#toolbar').hide();
        $('#ajout_pins').css('display', 'none');
        $('#stopDrawCircle').show();
        map.on('click', addLatLngToCircle); //Listen for clicks on map.
    });
    stopDrawCircle.addEventListener('click', function arrete() {
        $('#toolbar').show();
        $('#stopDrawCircle').hide();
        $('.grade_circle').hide();
        cercleJson[cer] = [cercle[cer]._mRadius,cercle[cer]._latlng,cercle[cer].options];
        var cercleJsonString = JSON.stringify(cercleJson);
        $('#cer').val(cercleJsonString);
        cer++;
    });
    var rangeGradeCircle = document.querySelector('input[type="range"]');   //cercle changement valeur du grade
    var target = document.querySelector('.value');
    target = document.querySelector('.value');
    target.innerHTML = 0+" km";
    var rangeValue = function(){
      var newValue = rangeGradeCircle.value;
      target = document.querySelector('.value');
      target.innerHTML = newValue+" km";
    }

    rangeGradeCircle.addEventListener("input", rangeValue);

    $('.grade_circle').change(function(){
        latlng=cercle[cer]._latlng;
        taille=$('#grade').val()*500;
        map.removeLayer(cercle[cer]);
        cercle[cer] = L.circle(latlng, taille, {
            className: cercle_name,
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            clickable: false
        }).addTo(map);
            

    });
     function stop() {
        
        map.off('click', addLatLngToCircle); //Stop listening for clicks on map.    
        var elem = "cercle" + cer;
        var color_fr = cercle[cer].options.color;
        cer2 = cer + 1;
        switch (color_fr) {
        case "blue":
            color_fr = 'bleu';
            break;
        case "green":
            color_fr = 'vert';
            break;
        case "red":
            color_fr = 'rouge';
            break;
        case "gray":
            color_fr = 'gris';
            break;
        default:
            break;
        }
        var form = 'le cercle ' + color_fr + ' n°' + cer2;
      
        $('.delete_cercle_p').append('<div class="bord"> <div class="margecercle" class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div>');
        
        
        $('.grade_circle').show();
        


    }
   

    function addLatLngToCircle(clickEventData) {
        taille = $('#taille_circle option:selected').val();
        color = $('#color_circle option:selected').val();
        cercle_name = "cercle" + cer;
        $('#grade').val(taille/500);  
        target.innerHTML = taille/500+" km";
        cercle[cer] = L.circle([clickEventData.latlng.lat, clickEventData.latlng.lng], taille, {
            className: cercle_name,
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            clickable: false
        }).addTo(map);
            cercleJson[cer] = [cercle[cer]._mRadius,cercle[cer]._latlng,cercle[cer].options];
        var cercleJsonString = JSON.stringify(cercleJson);
        $('#cer').val(cercleJsonString);
        stop(); //pour ne pas dessiner d'autres cercles


    }
    // deesiner une ligne
    var drawPolylineButton = document.getElementById('drawPolyline');
    var currentPolyline = {}; //Empty object to be used later;
    var CurrentMarkerTrajet = {};
    var polyline = []; //tableau de toutes les polylines
    poly = 0; //equivalent de bat pour les bateaux
    var polylineJson = {};

    drawPolylineButton.addEventListener('click', function () {
        $('#toolbar').hide();
        var color_polyline = $('#color_polyline option:selected').val();
        $('#ajout_pins').css('display', 'none');
        $('#stopDrawPolyline').css('display', 'block');
        polyName = "polyline" + poly;
        polyline[poly] = new L.polyline([], {
            color: color_polyline
            , className: polyName
        }).addTo(map);
        map.on('click', addLatLngToPolyline); //Listen for clicks on map.

    });
    stopDrawPolyline.addEventListener('click', function () {
        $('#toolbar').show();
        var elem = "polyline" + poly;
        var color_fr = polyline[poly].options.color;
        poly2 = poly + 1;
        switch (color_fr) {
        case "blue":
            color_fr = 'bleu';
            break;
        case "green":
            color_fr = 'vert';
            break;
        case "red":
            color_fr = 'rouge';
            break;
        case "gray":
            color_fr = 'gris';
            break;
        default:
            break;
        }
          polylineJson[poly] = [polyline[poly]._latlngs,polyline[poly].options];
        var polylineJsonString = JSON.stringify(polylineJson);
        $('#polyl').val(polylineJsonString);
        var form = 'la ligne ' + color_fr + ' n°' + poly2;
        $('.delete_polyline_p').append('<div class="bord" ><div class="margepolyline" class="form" id="' + elem + '"onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>Cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div> ');
        poly++;

        map.off('click', addLatLngToPolyline); //Stop listening for clicks on map.
    });

    function addLatLngToPolyline(clickEventData) {
        //console.log(clickEventData);
        //console.log(clickEventData.latlng.lat)
        polyline[poly].addLatLng(clickEventData.latlng);


    }

    // dessiner une trajectoire
   
    //var DistanceTotaleM=20000;
 var playOrPause = 0;
 var radar;
var CurrentEtat;
var bateauxJson = {};

var trajetEnCours=false;
 


    drawTrajetButton.addEventListener('click', function () {
        $('#toolbar').hide();
        trajetEnCours=true;
        
        var color_bateau = $('#color_bateau option:selected').val();
        var type_bateau = $('#type_bateau option:selected').val();


        $('#ajout_bateau').css('display', 'none');
        
        $('#timerbtn').hide();
        currentTrajet = new L.polyline([], {
            color: color_bateau,
            className: color_bateau
        }).addTo(map);
        map.on('click', addLatLngToTrajet); //Listen for clicks on map.




    });

    stopDrawTrajet.addEventListener('click', function () {
        //$('.bateau').show();
         trajetEnCours=false;
        $('#toolbar').show();
        $('#timerbtn').show();
        bool_bateau = 0;
        map.off('click', addLatLngToTrajet); //Stop listening for clicks on map.

        var CurrentVitesse = $('#vitesse_bateau').val();
        var radar = $('#radar').val();
        radar=radar*100;
        CurrentVitesse = CurrentVitesse;
        vitesse_bateau = 1;

        // Calcul longeur Trajet*********************************   


        //    On calcule la distance entre chaque points du tableau


        var nombreDePoints = currentTrajet._latlngs.length;
        var DistanceTotaleM = 0;
        for (var i = 1; i < nombreDePoints; i++) {
            DistanceTotaleM += currentTrajet._latlngs[i].distanceTo(currentTrajet._latlngs[i - 1]);
        }
        CurrentSpeed=speed;//recupere coef speed

        var dureeTrajet = 1000*DistanceTotaleM / (CurrentVitesse/1.9438399999515);
        dureeTrajet = parseInt(dureeTrajet/(CurrentSpeed*60));
        TOTAL = dureeTrajet;
        console.log(TOTAL);
        //var dureeTrajet = DistanceTotaleM / 500 ;
        var elem = "bateau" + bat;
        /*if(bat>0){
            $(CurrentIcon).removeClass(color_bateau+(bat-1));
        }*/
        
        bateaux[bat] = L.Marker.movingMarker(currentTrajet._latlngs
            , TOTAL, CurrentIcon).addTo(map);
        if(playOrPause == 1){
            if (bateaux[bat]._latlngs){
                if (currentTrajet._latlngs[1]){
                    bateaux[bat].start();
                }
            }
        }
        
       

        map.removeLayer(CurrentMarkerTrajet);

        var description_bateau = $('#description').val();
        //edit de bateaux
        CurrentType = $('#type_bateau option:selected').val();

        if (description_bateau.length == 0) {
            bateaux[bat] = bateaux[bat].bindPopup('<label>Type d\'unité : </label>' + CurrentType + '<br><a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>');
            bateaux[bat].editDescription = '<label>Type d\'unité : </label>' + CurrentType + '<br><a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>';        
        } else {
            bateaux[bat] = bateaux[bat].bindPopup('<label>Type d\'unité : </label>' + CurrentType + '<br>' + '<label>Description : </label><br>' + description_bateau + '<a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>');
            bateaux[bat].editDescription = '<label>Type d\'unité : </label>' + CurrentType + '<br>' + '<label>Description : </label><br>' + description_bateau + '<a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>';
        }
        var stock = currentTrajet;

        bateaux[bat].stock = currentTrajet;
        classId=bateaux[bat].stock.options.color+bat;
        // console.log(('#grosbateau').id);
        $(bateaux[bat]._icon).addClass(classId);
        bateaux[bat].suppression=false;
        bateaux[bat].editVitesse = CurrentVitesse;
       
        bateaux[bat].editType = CurrentType;
        

        bateaux[bat].editSpeed = CurrentSpeed;
        bateaux[bat].editRadar = radar;
        bateaux[bat].editIcon = CurrentIcon;
        bateaux[bat].editColor = bateaux[bat].stock.options.color;
        
        bateaux[bat].editDetection = false;

        bateaux[bat].editTypeVitesse = vitesse_bateau;
        console.log(bateaux[bat]);
        bat++;


        //console.log(myMovingMarker);
    });
    bool_bateau = 0;

    function addLatLngToTrajet(clickEventData) {
        $('#stopDrawTrajet').css('display', 'block');
        var type_bateau = $('#type_bateau option:selected').val();
        var color_bateau = $('#color_bateau option:selected').val();

        currentTrajet.addLatLng(clickEventData.latlng);

        if (bool_bateau == 0) {

            bool_bateau = 1;

            switch (type_bateau) {

                case 'porte-avion':


                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: porte_avion_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: porte_avion_allie
                        };


                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: porte_avion_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: porte_avion_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: porte_avion_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: porte_avion_neutre
                        };
                    }



                    break;






                case 'asm':


                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: asm_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: asm_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: asm_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: asm_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: asm_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: asm_neutre
                        };
                    }


                    break;




                case 'bpc':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: bpc_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: bpc_allie
                        };

                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: bpc_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: bpc_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: bpc_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: bpc_neutre
                        };
                    }



                    break;

                case 'fs':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fs_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fs_allie
                        };

                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fs_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fs_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fs_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fs_neutre
                        };
                    }



                    break;

                case 'phm':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: phm_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: phm_allie
                        };

                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: phm_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: phm_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: phm_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: phm_neutre
                        };
                    }



                    break;

                case 'fda':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fda_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fda_allie
                        };

                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fda_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fda_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fda_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fda_neutre
                        };
                    }



                    break;


                case 'bcr':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: bcr_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: bcr_allie
                        };

                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: bcr_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: bcr_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: bcr_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: bcr_neutre
                        };
                    }



                    break;






                case 'avion':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: avion_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: avion_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: avion_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: avion_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: avion_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: avion_neutre
                        };
                    }

                    break;




                case 'tigre':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: tigre_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: tigre_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: tigre_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: tigre_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: tigre_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: tigre_neutre
                        };
                    }



                    break;

                case 'puma':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: puma_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: puma_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: puma_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: puma_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: puma_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: puma_neutre
                        };
                    }

                    break;




                case 'fennec':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fennec_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fennec_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fennec_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fennec_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: fennec_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: fennec_neutre
                        };
                    }



                    break;

                case 'paquebot':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: paquebot_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: paquebot_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: paquebot_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: paquebot_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: paquebot_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: paquebot_neutre
                        };
                    }



                    break;

                case 'cargo':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: cargo_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: cargo_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: cargo_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: cargo_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: cargo_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: cargo_neutre
                        };
                    }



                    break;

                case 'peche':

                    if (color_bateau == "blue") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: peche_allie
                        }).addTo(map);

                        CurrentIcon = {
                            icon: peche_allie
                        };
                    } else if (color_bateau == "red") {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: peche_ennemi
                        }).addTo(map);

                        CurrentIcon = {
                            icon: peche_ennemi
                        };
                    } else {
                        CurrentMarkerTrajet = L.marker([clickEventData.latlng.lat, clickEventData.latlng.lng], {
                            icon: peche_neutre
                        }).addTo(map);

                        CurrentIcon = {
                            icon: peche_neutre
                        };
                    }



                    break;

            }
        }
        //console.log(bateaux[bat]);

    }


    // editer une trajectoire 

    $('#play').click(function () {
        //simulation=true;
        for (var i = bateaux.length - 1; i >= 0; i--) {
            if(bateaux[i]._latlngs){
                if (bateaux[i]._latlngs[1]){
                    bateaux[i].start();
                }
            }

        };
        //myMovingMarker.start();
    })

    $('#pause').click(function () {
        //simulation=false;
        for (var i = bateaux.length - 1; i >= 0; i--) {
            if (bateaux[i] && bateaux[i]!=null && bateaux[i]!="") {
                bateaux[i].pause();
            }

        };
        //myMovingMarker.start();
    })
    //TIMER
    var hours = 0;
    var mins = 0;
    var days = 0;
    var speed = 1;
    var editRadar;
   
    $("#pause").css("display", "none");
    $('#play').click(function () {
        startTimer();
        $("#pause").css("display", "inline-block");
        $("#play").css("display", "none");
        playOrPause = 1;
        console.log(playOrPause);
    });
    $('#pause').click(function () {
        clearTimeout(timex);
        $("#play").css("display", "inline-block");
        $("#pause").css("display", "none");
        playOrPause = 0;
        console.log(playOrPause);
    });
$('.speed').change(function () {             //lorsque le coef de vitesse change on refait les trajets desbateaux qui bougent
    speed = $('.speed option:selected').val();           //valeur du coef de vitesse
        // fonction changement vitesse general
    for(var j = 0 ; j <= bateaux.length - 1; j++) {     //boucle de for de tous les bat

               //faire la modif de vitesse sur tous les bateaux
               //debut de récupération des données du bateau
        console.log("j : "+j);
        console.log(bateaux[j]);
        boolean_vitesse = false;
        //alert( $(this).attr('id') );
        if (bateaux[j]._latlngs != null && bateaux[j]!="") {    //recup beateau avant modif

                editIcon = bateaux[j].editIcon;
                editVitesse = bateaux[j].editVitesse;
                editColor = bateaux[j].editColor;
                editRadar = bateaux[j].editRadar;
                suppression = bateaux[j].suppression;
                 editType= bateaux[j].editType;
                editTypeVitesse = bateaux[j].editTypeVitesse;
                editDescription = bateaux[j].editDescription;
                editSpeed = bateaux[j].editSpeed;
                editDetection = bateaux[j].editDetection;
                
                editCurrentLine = bateaux[j]._latlngs; //recup trajet

                map.removeLayer(bateaux[j].stock);   //enlever le trajet
                currentPolyline2 = L.polyline([], {   //nouvelle ligne de trajet 
                    color: editColor,
                    className: editColor
                }).addTo(map);

                if( bateaux[j]._currentLine.length!=0){
                    editCurrentPoint = bateaux[j]._currentLine[1]; //recup position
                    
                }else{
                    editCurrentPoint = bateaux[j]._latlngs[0];
                }
                

                currentPolyline2.addLatLng(bateaux[j]._latlng);    // ajouter la position actuelle
                    for (var i = 0; i <= editCurrentLine.length - 1; i++) {    //recup trajet à partir du point

                        if (editCurrentLine[i] == editCurrentPoint) {
                            boolean_vitesse = true;
                        }
                        if (boolean_vitesse == true) {   //if pour reprendre le trajet à partir des points ou l'on en est
                            currentPolyline2.addLatLng(editCurrentLine[i]);
                        }
                        /*bateaux[i]._latlngs*/
                    };

                boolean_vitesse = false;
                map.removeLayer(bateaux[j]);
                edit_vitesse = "";

                var nombreDePoints = currentPolyline2._latlngs.length;
                var DistanceTotaleM = 0;

                for (var i = 1; i < nombreDePoints; i++) {   //fonction pour la convertir la vitesse en noeud
                    DistanceTotaleM += currentPolyline2._latlngs[i].distanceTo(currentPolyline2._latlngs[i - 1]);
                }
                editSpeed = speed;
                
                var dureeTrajet = 1000*DistanceTotaleM / (editVitesse/1.9438399999515);
                dureeTrajet = parseInt(dureeTrajet/(editSpeed*60));
                TOTAL = dureeTrajet;

                bateaux[j] = new L.Marker.movingMarker(currentPolyline2._latlngs
                    , TOTAL, editIcon).addTo(map);
                
                    bateaux[j] =  bateaux[j].bindPopup(editDescription);
                     bateaux[j].editDescription = editDescription;
                //edit de bateaux

                var stock = currentTrajet;

                bateaux[j].stock = currentPolyline2;
                // console.log(('#grosbateau').j);
                var edit_vitesse = $('#editVitesse').val();
                //edit de bateaux

                if(simulation==true){
                    $('.red').css("display", "none");
                    $('.green').css("display", "none");
                }
                
                classId=editColor+j;
                 
                $(bateaux[j]._icon).addClass(classId);
                bateaux[j].editVitesse = editVitesse;
                bateaux[j].editSpeed = editSpeed;
                bateaux[j].suppression=suppression;
                bateaux[j].editRadar = editRadar;
                bateaux[j].editType = editType;
                bateaux[j].editDetection = editDetection;
                bateaux[j].editIcon = editIcon;
                bateaux[j].editColor = editColor;
                bateaux[j].editTypeVitesse = editTypeVitesse;
                console.log(bateaux[j].editDetection);
                if(editColor!="blue"&& bateaux[j].editDetection==false&&simulation==true){ // cache le bateau rouge ou vert pendant la simulation
                    $('.'+classId).hide();
                }
               
                if (playOrPause == 1) {       //si play or pause on fait avancer le bateau ou non
                    if (bateaux[j]._latlngs){       //on regarde si le bateau a un trajet si il en a pas on va pas le faire bouger #logique
                         if (bateaux[j]._latlngs[1]){
                            bateaux[j].start();
                        }
                    }

                } else {
                    bateaux[j].pause();
                }
            }
            if( bateaux[j]==""){
                map.removeLayer(bateaux[j]);
            }

        
    };
});

    function startTimer() {
        timex = setTimeout(function () {


            for (var i = 0; i < speed; i++) {
                mins++;
            }


            if (mins > 59) {
                var restmins = mins - 60;
                while (restmins > 59) {
                    hours++;
                    restmins = restmins - 60;
                }
                mins = restmins;
                hours++;
                if (hours > 23) {
                    var resthours = hours - 24;
                    while (resthours > 23) {
                        days++;
                        resthours = resthours - 24;

                    }
                    hours = resthours;
                    days++;
                    if (days < 10) {
                        $("#days").text('0' + days + 'J:')
                    } else $("#days").text(days + 'J:');
                }

                if (hours < 10) {
                    $("#hours").text('0' + hours + 'H');
                } else $("#hours").text(hours + 'H');
            }
            if (mins < 10) {
                $("#mins").text('0' + mins);
            } else {
                $("#mins").text(mins

            );
            }

            startTimer();
        }, 1000);
    }
    //*****
    
    $('#map').on('click', '.bateau_suppr', function () {   //afficher le popup de validation de la suppression
        if( trajetEnCours==false){
            id = $(this).data('id');                           //on recup la data qui stock l'id du bateau
            bateaux[id].pause();                              //on met le bateau en pause en attendant la réponse
            $('#map').append('<div class="pop_up_inv2"><div class="pop_up"><h1>ATTENTION : Voulez-vous vraiment supprimer le bateau ? </br> Vous ne pourrez pas revenir en arrière.</h1><a href="#" data-id="' + id + '" class="delete deleteUltim">SUPPRIMER</a><a href="#" data-id="' + id + '" class="retour deleteUltim">ANNULER</a></div></div>');
        }
    });
    $('#map').on('click', '.delete', function () {    //supprimer le bateau
        id = $(this).data('id');                       //on recup la data qui stock l'id du bateau
        $('.pop_up_inv2').hide();
        bateaux[id].suppression=true;
        map.removeLayer(bateaux[id]);
        map.removeLayer(bateaux[id].stock);
        bateaux[id]="";
    });
    $('#map').on('click', '.retour', function () {
        id = $(this).data('id');
        $('.pop_up_inv2').hide();
        bateaux[id].resume();
    });
    $('#map').on('click', '.bateau', function () { // changer trajet
        if( trajetEnCours==false){
            trajetEnCours=true;
            if (nouveauTrajet == false) {
                map.removeLayer(currentPolyline2);
            }
            nouveauTrajet = false;

            //alert( $(this).attr('id') );
            id = $(this).attr('id');
            $('#toolbar').hide();
             $('#timerbtn').hide();
            editIcon = bateaux[id].editIcon;
            editVitesse = bateaux[id].editVitesse;
            editColor = bateaux[id].editColor;
            suppression = bateaux[id].suppression;
            editTypeVitesse = bateaux[id].editTypeVitesse;
            editSpeed = bateaux[id].editSpeed;
            editType= bateaux[id].editType;
            editRadar = bateaux[id].editRadar;
            editDescription = bateaux[id].editDescription;

            editDetection =bateaux[id].editDetection;
            $('#stopEditPolyline').css('display', 'block');
            $('#editVitesse').show();


            // console.log(bateau[bat]);

            bateaux[id].pause();
           
            map.removeLayer(bateaux[id].stock);   //suppression du trajet
            //bateaux[id].moveTo(bateaux[id]._currentLine[1], 20000);
            currentPolyline2 = L.polyline([], {
                color: editColor,
                className: editColor
            }).addTo(map);
            currentPolyline2.addLatLng(bateaux[id]._latlng);

            map.on('click', editLatLngToPolyline); //Listen for clicks on map.*/

        }

    });
    $('#map').on('click', '.bateau_vitesse', function () {   //changement vitesse
        if(trajetEnCours==false){
            trajetEnCours=true;
            
            trajetEnCours=true;
            boolean_vitesse = false;
            //alert( $(this).attr('id') );
            id = $(this).data('id');
            if (bateaux[id]._latlngs != null && bateaux[i]!="") {    //recup beateau avant modif
                $('#toolbar').hide();
                $('#timerbtn').hide();
                $('#editVitesse').show();
                editIcon = bateaux[id].editIcon;
                editVitesse = bateaux[id].editVitesse;
                editColor = bateaux[id].editColor;
                suppression = bateaux[id].suppression;
                editTypeVitesse = bateaux[id].editTypeVitesse;
                editDescription = bateaux[id].editDescription;
                editType = bateaux[id].editType;
                editSpeed = bateaux[id].editSpeed;
                editRadar = bateaux[id].editRadar;
                editDetection = bateaux[id].editDetection;

                console.log(bateaux[id]);
                editCurrentLine = bateaux[id]._latlngs; //recup trajet
                if(bateaux[id]._currentLine[1]){                  //si le bateau n'a pas encore bougé il n'a pas de currentline
                    editCurrentPoint = bateaux[id]._currentLine[1]; //recup position
                }else {
                    editCurrentPoint=editCurrentLine[0];
                }
                
                console.log(bateaux[id]._currentLine[1]);
                
                $('#stopEditPolyline').css('display', 'block');


                // console.log(bateau[bat]);

                bateaux[id].pause();
                console.log(editCurrentLine);
                map.removeLayer(bateaux[id].stock);   //enlever le trajet
                //bateaux[id].moveTo(bateaux[id]._currentLine[1], 20000);
                currentPolyline2 = L.polyline([], {
                    color: editColor,
                    className: editColor
                }).addTo(map);
                currentPolyline2.addLatLng(bateaux[id]._latlng);    // ajouter la position actuelle
                for (var i = 0; i <= editCurrentLine.length - 1; i++) {    //recup trajet à partir du point

                    if (editCurrentLine[i] == editCurrentPoint) {
                        boolean_vitesse = true;
                    }
                    if (boolean_vitesse == true) {   //if pour reprendre le trajet à partir des points ou l'on en est
                        currentPolyline2.addLatLng(editCurrentLine[i]);
                    }
                    /*bateaux[i]._latlngs*/
                };
                boolean_vitesse = false;

            }

        }
    });

    function editLatLngToPolyline(clickEventData) {
        //console.log(clickEventData);
        //console.log(clickEventData.latlng.lat)

        currentPolyline2.addLatLng(clickEventData.latlng);

    }
     var stopEdtiPolyline = document.getElementById('stopEditPolyline');
    stopEdtiPolyline.addEventListener('click', function () {
        nouveauTrajet = true;
        trajetEnCours=false;
        $('#editVitesse').hide();
        $('#toolbar').show();
        $('#timerbtn').show();
        map.off('click', editLatLngToPolyline); //Stop listening for clicks on map
        map.removeLayer(bateaux[id]);
        var edit_vitesse = $('#editVitesse').val();
        if (edit_vitesse.length > 0) {
            editVitesse = edit_vitesse;
        }
        edit_vitesse = "";
        var nombreDePoints = currentPolyline2._latlngs.length;

        var DistanceTotaleM = 0;
        for (var i = 1; i < nombreDePoints; i++) {
            DistanceTotaleM += currentPolyline2._latlngs[i].distanceTo(currentPolyline2._latlngs[i - 1]);
            console.log(DistanceTotaleM);
        }
        editSpeed = speed;
        var dureeTrajet = 1000*DistanceTotaleM / (editVitesse/1.9438399999515);
        dureeTrajet = parseInt(dureeTrajet/(editSpeed*60));
        TOTAL = dureeTrajet;
  

        bateaux[id] = new L.Marker.movingMarker(currentPolyline2._latlngs
            , TOTAL, editIcon).addTo(map);
       //edit de bateaux
       
       
        bateaux[id] =  bateaux[id].bindPopup(editDescription);
        bateaux[id].editDescription = editDescription;
      


        var stock = currentTrajet;
        classId=editColor+id;
         console.log(editColor);
         console.log(id);
         console.log(classId);
        $(bateaux[id]._icon).addClass(classId);
        bateaux[id].stock = currentPolyline2;
        // console.log(('#grosbateau').id);
        var edit_vitesse = $('#editVitesse').val();
        //edit de bateaux



        bateaux[id].editVitesse = editVitesse;
        bateaux[id].suppression=suppression;
        bateaux[id].editSpeed = editSpeed;
        bateaux[id].editRadar = editRadar;

        bateaux[id].editDetection = editDetection;
        bateaux[id].editIcon = editIcon;
        bateaux[id].editType =editType;
        bateaux[id].editColor = editColor;
        bateaux[id].editTypeVitesse = editTypeVitesse;

        console.log(bateaux[id]);
        
        
        
        if(simulation==true){
            $('.red').css("display", "none");
        }
        
        if (bateaux[id]._latlngs){
            if (playOrPause == 1) {
            
                if (bateaux[id]._latlngs[1]){
                    bateaux[id].start();
                }
            }else {
            bateaux[id].pause();
            }
        } 
    });

    /*//edit trajet 
    $('#'+bateau[bat]){
        console.log('bien joué');

    }*/

   function loadCercle(cerclesPhp){
       var limit = Object.keys(cerclesPhp).length ;
    for (var e = 0; e < limit; e++) {
              var cercle_name = "cercle" + cer;
            var taillecercle = cerclesPhp[e][0];
        var colorcercle = cerclesPhp[e][2].color;
        var latcercle = cerclesPhp[e][1].lat;
        var lngcercle = cerclesPhp[e][1].lng;

        cercle[cer] = L.circle([latcercle, lngcercle], taillecercle, {
            className: cercle_name
            , color: colorcercle
            , fillColor: colorcercle
            , fillOpacity: 0.5
            , clickable: false
        , }).addTo(map);
      cercleJson[cer] = [cercle[cer]._mRadius,cercle[cer]._latlng,cercle[cer].options];
        var elem = "cercle" + cer;
        var color_fr = cercle[cer].options.color;
        var cercleJsonString = JSON.stringify(cercleJson);
        var form = 'le cercle ' + color_fr + ' n°' + cer;
      
        $('.delete_cercle_p').append('<div class="bord"> <div class="margecercle" class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div>');
        
        
        cer++;
        $('#cer').val(cercleJsonString);

        //stop();
        
    };
}
 function loadPolyg(polygsPhp){
       var limit = Object.keys(polygsPhp).length ;
    for (var e = 0; e < limit; e++) {
        var polygName = "polygone" + polyg;
        var color_polygone = polygsPhp[e][1].color;
        polygone[polyg] = new L.polygon([], {
            className: polygName
            , clickable: false
            , color: color_polygone
        }).addTo(map);
        for (var a = 0; a < polygsPhp[e][0].length; a++) {
            polygone[polyg].addLatLng(polygsPhp[e][0][a]);
        }
           $('#toolbar').show();

        var elem = "polygone" + polyg;
        var color_fr = polygone[polyg].options.color;
        polyg2 = polyg + 1;
        switch (color_fr) {
        case "blue":
            color_fr = 'bleu';
            break;
        case "green":
            color_fr = 'vert';
            break;
        case "red":
            color_fr = 'rouge';
            break;
        case "gray":
            color_fr = 'gris';
            break;
        default:
            break;
        }
     
        polygJson[polyg] = [polygone[polyg]._latlngs,polygone[polyg].options];
        var polygJsonString = JSON.stringify(polygJson);
        $('#polyg').val(polygJsonString);
        
        
        var form = 'le polygone ' + color_fr + ' n°' + polyg2;
        
        $('.delete_polygone_p').append('<div class="bord"> <div class="margepolygone" class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false"><p>cacher ' + form + ' </p> <div class="oeilvert" id="oeil"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div> </div>');
        

        polyg++;

        map.off('click', addLatLngToPolygon); //Stop listening for clicks on map.
    }
};

function loadText(textsPhp){
    var limit = Object.keys(textsPhp).length ;
    var text_name = "text" + tex;
      for (var u = 0; u < limit; u++) {
      texte[tex] = L.marker([textsPhp[u][0].lat, textsPhp[u][0].lng], {
            icon: L.divIcon({
                className: text_name
                , html: textsPhp[u][1]
                , iconSize: [200, 80]
            })
        }).addTo(map);
        
        textJson[tex] = [texte[tex]._latlng,text];
        var texteJsonString = JSON.stringify(textJson);
        $('#text').val(texteJsonString);
        stop2(); 
      }
    
};

function loadPolyl(polylsPhp){
    var limit = Object.keys(polylsPhp).length ;
    for (var z = 0; z < limit; z++) {
            polyName = "polyline" + poly;
        polyline[poly] = new L.polyline([], {
            color: polylsPhp[z][1].color
            , className: polyName
        }).addTo(map);
        
    for (var q= 0; q < polylsPhp[z][0].length; q++) {
            polyline[poly].addLatLng(polylsPhp[z][0][q]);
        }
        
          $('#toolbar').show();
        var elem = "polyline" + poly;
        var color_fr = polyline[poly].options.color;
        poly2 = poly + 1;
        switch (color_fr) {
        case "blue":
            color_fr = 'bleu';
            break;
        case "green":
            color_fr = 'vert';
            break;
        case "red":
            color_fr = 'rouge';
            break;
        case "gray":
            color_fr = 'gris';
            break;
        default:
            break;
        }
          polylineJson[poly] = [polyline[poly]._latlngs,polyline[poly].options];
        var polylineJsonString = JSON.stringify(polylineJson);
        $('#polyl').val(polylineJsonString);
        var form = 'la ligne ' + color_fr + ' n°' + poly2;
     
        $('.delete_polyline_p').append('<div class="bord"><div class="margepolyline"><p class="form" id="' + elem + '" onclick="delete_obj(&#34;' + elem + '&#34;,&#34;' + form + '&#34;);return false">Cacher ' + form + ' </p> </div><div class="oeilvert"><div id="oeil'+ elem + '" class="vert yeux"></div></div></div>');
        
        poly++;

        map.off('click', addLatLngToPolyline); //Stop listening for clicks on map.
    }
};

function loadBati(batisPhp){
     var limit = Object.keys(batisPhp).length ;
      
        
    for (var c = 0; c < limit; c++) {
        var bati_name = "batiment" + bati;
         batiment[bati] = L.marker([batisPhp[c][0].lat, batisPhp[c][0].lng], {
            icon: L.icon({
                iconUrl: 'image/'+batisPhp[c][1]+'.png',
                className: bati_name,
                iconSize:     [30, 30], // size of the icon
                iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            })
                
        }).addTo(map);
        batiment[bati].type = batisPhp[c][1];
         batimentJson[bati] = [batiment[bati]._latlng,batiment[bati].type];
        var batiJsonString = JSON.stringify(batimentJson);
        $('#bati').val(batiJsonString);
        stop3(); //pour finir l'ajout
    }
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function loadBateaux(bateauxPhp){
    var limit = Object.keys(bateauxPhp).length;
    for (var a = 0; a < limit; a++) {
        console.log(bateauxPhp[a]);
        var currentPolyline = [];
        var name = "bateau" + a;
         trajetEnCours=false;
        $('#toolbar').show();
        $('#timerbtn').show();
        bool_bateau = 0;
        map.off('click', addLatLngToTrajet); 

        var CurrentVitesse = bateauxPhp[a][1];
        var radar = bateauxPhp[a][7];

        var nombreDePoints = bateauxPhp[a][9].length;
        var DistanceTotaleM = 0;
        var color_bateau = bateauxPhp[a][2];
                    switch (bateauxPhp[a][5]) {

                case 'porte-avion':


                    if (color_bateau == "blue") {
                     
                        CurrentIcon = {
                            icon: porte_avion_allie
                        };


                    } else if (color_bateau == "red") {
                     
                        CurrentIcon = {
                            icon: porte_avion_ennemi
                        };
                    } else {
                    
                        CurrentIcon = {
                            icon: porte_avion_neutre
                        };
                    }



                    break;






                case 'asm':


                    if (color_bateau == "blue") {
                 
                        CurrentIcon = {
                            icon: asm_allie
                        };
                    } else if (color_bateau == "red") {
                 
                        CurrentIcon = {
                            icon: asm_ennemi
                        };
                    } else {
                 
                        CurrentIcon = {
                            icon: asm_neutre
                        };
                    }


                    break;




                case 'bpc':

                    if (color_bateau == "blue") {
             

                        CurrentIcon = {
                            icon: bpc_allie
                        };

                    } else if (color_bateau == "red") {
                     
                        CurrentIcon = {
                            icon: bpc_ennemi
                        };
                    } else {
                       
                        CurrentIcon = {
                            icon: bpc_neutre
                        };
                    }



                    break;

                case 'fs':

                    if (color_bateau == "blue") {
                    

                        CurrentIcon = {
                            icon: fs_allie
                        };

                    } else if (color_bateau == "red") {
                  

                        CurrentIcon = {
                            icon: fs_ennemi
                        };
                    } else {
                     

                        CurrentIcon = {
                            icon: fs_neutre
                        };
                    }



                    break;

                case 'phm':

                    if (color_bateau == "blue") {
                  

                        CurrentIcon = {
                            icon: phm_allie
                        };

                    } else if (color_bateau == "red") {
                   

                        CurrentIcon = {
                            icon: phm_ennemi
                        };
                    } else {
                  

                        CurrentIcon = {
                            icon: phm_neutre
                        };
                    }



                    break;

                case 'fda':

                    if (color_bateau == "blue") {
                  

                        CurrentIcon = {
                            icon: fda_allie
                        };

                    } else if (color_bateau == "red") {
                      

                        CurrentIcon = {
                            icon: fda_ennemi
                        };
                    } else {


                        CurrentIcon = {
                            icon: fda_neutre
                        };
                    }



                    break;


                case 'bcr':

                    if (color_bateau == "blue") {
                     
                        CurrentIcon = {
                            icon: bcr_allie
                        };

                    } else if (color_bateau == "red") {
                  
                        CurrentIcon = {
                            icon: bcr_ennemi
                        };
                    } else {
              

                        CurrentIcon = {
                            icon: bcr_neutre
                        };
                    }



                    break;






                case 'avion':

                    if (color_bateau == "blue") {
              
                        CurrentIcon = {
                            icon: avion_allie
                        };
                    } else if (color_bateau == "red") {
               
                        CurrentIcon = {
                            icon: avion_ennemi
                        };
                    } else {
                   
                        CurrentIcon = {
                            icon: avion_neutre
                        };
                    }

                    break;




                case 'tigre':

                    if (color_bateau == "blue") {
                   

                        CurrentIcon = {
                            icon: tigre_allie
                        };
                    } else if (color_bateau == "red") {
                   

                        CurrentIcon = {
                            icon: tigre_ennemi
                        };
                    } else {
        
                        CurrentIcon = {
                            icon: tigre_neutre
                        };
                    }



                    break;

                case 'puma':

                    if (color_bateau == "blue") {
                

                        CurrentIcon = {
                            icon: puma_allie
                        };
                    } else if (color_bateau == "red") {
                

                        CurrentIcon = {
                            icon: puma_ennemi
                        };
                    } else {
                   

                        CurrentIcon = {
                            icon: puma_neutre
                        };
                    }

                    break;




                case 'fennec':

                    if (color_bateau == "blue") {
             

                        CurrentIcon = {
                            icon: fennec_allie
                        };
                    } else if (color_bateau == "red") {
                 

                        CurrentIcon = {
                            icon: fennec_ennemi
                        };
                    } else {
                
                        CurrentIcon = {
                            icon: fennec_neutre
                        };
                    }



                    break;

                case 'paquebot':

                    if (color_bateau == "blue") {
                       

                        CurrentIcon = {
                            icon: paquebot_allie
                        };
                    } else if (color_bateau == "red") {
                      

                        CurrentIcon = {
                            icon: paquebot_ennemi
                        };
                    } else {
                  

                        CurrentIcon = {
                            icon: paquebot_neutre
                        };
                    }



                    break;

                case 'cargo':

                    if (color_bateau == "blue") {
                   
                        CurrentIcon = {
                            icon: cargo_allie
                        };
                    } else if (color_bateau == "red") {
                 

                        CurrentIcon = {
                            icon: cargo_ennemi
                        };
                    } else {
                   

                        CurrentIcon = {
                            icon: cargo_neutre
                        };
                    }



                    break;

                case 'peche':

                    if (color_bateau == "blue") {
                      

                        CurrentIcon = {
                            icon: peche_allie
                        };
                    } else if (color_bateau == "red") {
           

                        CurrentIcon = {
                            icon: peche_ennemi
                        };
                    } else {
               

                        CurrentIcon = {
                            icon: peche_neutre
                        };
                    }



                    break;

            }
        
        console.log(CurrentIcon);
        
                 currentPolyline = new L.polyline([], {
            color: bateauxPhp[a][2]
            , className: name
        }).addTo(map);
        
    for (var q= 0; q < bateauxPhp[a][9].length; q++) {
            currentPolyline.addLatLng(bateauxPhp[a][9][q]);
        };
        
             CurrentSpeed=1;

         for (var i = 1; i < nombreDePoints; i++) {
            DistanceTotaleM += getDistanceFromLatLonInKm(bateauxPhp[a][9][i].lat,bateauxPhp[a][9][i].lng,bateauxPhp[a][9][i - 1].lat,bateauxPhp[a][9][i - 1].lng) ;
        };
        
        var dureeTrajet = 1000*DistanceTotaleM / (CurrentVitesse/1.9438399999515);
        dureeTrajet = parseInt(dureeTrajet/(CurrentSpeed*60));
        console.log(CurrentVitesse+" avec un coef de "+speed);
        TOTAL = dureeTrajet*1000;   
        console.log(TOTAL);
//  
////        for (var i = 0; i < nombreDePoints; i++) {
//             bateaux[bat] = L.Marker.movingMarker(currentPolyline
//            , TOTAL, CurrentIcon).addTo(map);
//        };

//        var elem = "bateau" + bat;
        bateaux[a] = L.Marker.movingMarker(currentPolyline._latlngs
            , TOTAL, CurrentIcon).addTo(map);
   console.log(TOTAL + "total");
//        
//       
//
//        map.removeLayer(CurrentMarkerTrajet);
//
//        var description_bateau = $('#description').val();
        CurrentType = bateauxPhp[a][5];
//
//        if (description_bateau.length == 0) {
            bateaux[bat] = bateaux[bat].bindPopup('<label>Type d\'unité : </label>' + CurrentType + '<br><a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>');
            bateaux[bat].editDescription = '<label>Type d\'unité : </label>' + CurrentType + '<br><a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>';        
//        } else {
//            bateaux[bat] = bateaux[bat].bindPopup('<label>Type d\'unité : </label>' + CurrentType + '<br>' + '<label>Description : </label><br>' + description_bateau + '<a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>');
//            bateaux[bat].editDescription = '<label>Type d\'unité : </label>' + CurrentType + '<br>' + '<label>Description : </label><br>' + description_bateau + '<a href="#" id="' + bat + '" class="bateau">Changer Trajet</a><br><a href="#" data-id="' + bat + '" class="bateau_vitesse">Changer Vitesse</a><br><a href="#" data-id="' + bat + '" class="bateau_suppr">Supprimer bateau</a>';
//        }
//        var stock = currentPolyline;
//
        bateaux[a].stock = currentPolyline;
        classId=bateaux[a].stock.options.color+a;
        $(bateaux[a]._icon).addClass(classId);
        bateaux[a].suppression=false;
        bateaux[a].editVitesse = CurrentVitesse;
////       
        bateaux[a].editType = bateauxPhp[a][5];
////        
////
        bateaux[a].editSpeed = bateauxPhp[a][1];
        bateaux[a].editRadar = bateauxPhp[a][7];
        bateaux[a].editIcon = CurrentIcon;
        bateaux[a].editColor = bateaux[a].stock.options.color;
//        
        bateaux[a].editDetection = false;

        bateaux[a].editTypeVitesse = bateauxPhp[a][1];
        bat++;
//
//        
        
    }
}


    
//Conversion des degrés en radian
function convertRad(input){
        return (Math.PI * input)/180;
}
 

var etat;
var consolet=0; //pour ne pas avoir un spam de messages consoles
var cercleRadar = [];
var cerRadar=0;
var detection= [];
var detection2= [];
var message = [];
var mes=0;
var notif=0;
function calculDistance(){

    if(simulation==true){

        for (var i = bateaux.length - 1; i >= 0; i--) { //fonction de message
            if(bateaux[i]!=""&&bateaux[i].editColor!="blue"){        //on donne la valeur avant le changement
                detection2[i]=bateaux[i].editDetection;
            }

        };
        detection = [];
        for (var i = bateaux.length - 1; i >= 0; i--) {       //calcul de distance pour le radar
            if(cercleRadar[i]){
                    map.removeLayer(cercleRadar[i]);
                }
            suppression = bateaux[i].suppression;
            
            if(bateaux[i]!=""&&bateaux[i].editColor=="blue"){        //le bateau n'a pas été supprimé
                
                
                cercleRadar[i] = L.circle([bateaux[i]._latlng.lat,bateaux[i]._latlng.lng], bateaux[i].editRadar, { //on ajout un cercle de radar
                    className: "cercle-radar",
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 0.1,
                    clickable: false
                }).addTo(map);
                
                


                  for (var j = 0; j <= bateaux.length - 1; j++) {       //calcul de distance pour le radar
                    

                        if(bateaux[j]!="" && bateaux[i].editColor != bateaux[j].editColor ){  //si le bateau est pas supprimé, pas bleu
                            
              
                            R = 6378000; //Rayon de la terre en mètre
                            lat_a = convertRad(bateaux[j]._latlng.lat );  //convertir la donnée en radian pour la courbure de la terre
                            lon_a = convertRad(bateaux[j]._latlng.lng);
                            lat_b = convertRad(bateaux[i]._latlng.lat);
                            lon_b = convertRad(bateaux[i]._latlng.lng);
                            classIdBat = bateaux[j].editColor+j; //class bateau avec sa couleur et son id
                            d = R * (Math.PI/2 - Math.asin( Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
                           /* if(detection[j]!=true){
                                detection[j]="false";           
                            }*/
                            
                            
                            if(d < bateaux[j].editRadar){ //distance de radar plus grande que distance entre bat
                                if(bateaux[i].editDetection==false && bateaux[j].editColor=="red"){     //si le bateau a déjà été détecté
                                    $("#console ul").prepend("<li>"+$('#hours').text()+$('#mins').text()+" "+ bateaux[j].editType +" ennemi(e) vous a repéré</li><br>");
                                    notif++; 
                                    bateaux[i].editDetection=true;
                                }
                            
                            }
                            if(d >= bateaux[i].editRadar){ //si un bateau ennemi este le radar
                                if(detection[j]!=true){  //si ce bateau n'a pas été détécté par un autre bateau dans la boucle 

                              
                                    $('.'+classIdBat).hide(); //on cache le bateau en question
                                    $('.green').hide();     //on cache les lignes (au cas ou un bateau a été ajouté pendant la simulation)
                                    $('.red').hide();       
                                    
                                    bateaux[j].editDetection=false; //passer en etat de détection
                                    
                              }
                                

                            }else{  //bateau dans le radar
                                $('.'+classIdBat).show();     //on montre le bateau en question
                                bateaux[j].editDetection=true;
                                detection[j]=true;
                                   
                                
                                
                                
                            } 
                       
                       
                    }
                        
                };  

              

            }
                
        };
        for (var i = bateaux.length - 1; i >= 0; i--) { //fonction de message
            if(bateaux[i]!="" &&bateaux[i].editColor!="blue"){        //le bateau n'a pas été supprimé
                if(bateaux[i].editDetection!=detection2[i]){
                    console.log('ça change');
                    lat=bateaux[i]._latlng.lat.toFixed(5);
                    lng=bateaux[i]._latlng.lng.toFixed(5);
                    if(bateaux[i].editDetection==true){ //si le bateau est détecté on envoie le message de détection
                        if(bateaux[i].editColor=="red"){
                            etat="ennemie";
                        }else{
                            etat="neutre";
                        }
                        $("#console ul").prepend("<li>"+$('#hours').text()+$('#mins').text()+" "+ bateaux[i].editType +" "+etat+" repéré aux coordonnées "+lat+","+lng+"</li><br>");
                        notif++;      
                                     
                    }else{                  //bateau disparu on envoie le message de disparition
                        if(bateaux[i].editColor=="red"){
                            etat="ennemie";
                        }else{
                            etat="neutre";
                        }
                        $("#console ul").prepend("<li>"+$('#hours').text()+$('#mins').text()+" "+ bateaux[i].editType +" "+etat+" a disparu aux coordonnées "+lat+","+lng+"</li><br>");
                        notif++;      
                                          
                    }
                }
            }

        };
    }
    
     $("#notif").html(notif);
    setTimeout(calculDistance,1000); /* rappel après 2 secondes = 2000 millisecondes */
}

$('#admin').on('click', function(){
    notif=0; 
    simulation=true;
    calculDistance();
    
   
});
$('#simulation').on('click',function(){
    simulation=false;
    
});

// fin du game 
/*
$('#fin').on('click', function() {
    $('.fin').hide();
    $('#timerbtn').hide();
    for (var i = bateaux.length - 1; i >= 0; i--) {

            if (bateaux[i]._latlngs == null) {} {
                bateaux[i].pause();
            }

    };
    simulation=false;
    $("#simulation").hide();
    $("#admin").show();
     $('.red').css("display", "block");
     $('.rred2').show();
});*/






