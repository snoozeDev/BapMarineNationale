/*var bateaux = []; //tableau de tous les bateaux
 //edit de bateaux
 function editbateau(bat){
 addEventListener('click', function(){
 console.log("bien joué"+bat);
 $('#stopEditPolyline').css('display','block');

 bateau[bat]=moveTo([3,3], 20000);
 console.log(bateau[bat]);
 //currentPolyline = new L.polyline([]).addTo(map);
 //map.on('click', editLatLngToPolyline); //Listen for clicks on map.*/
/*
 });

 }

 function editLatLngToPolyline(clickEventData){
 //console.log(clickEventData);
 //console.log(clickEventData.latlng.lat)
 currentPolyline.addLatLng(clickEventData.latlng);

 }
 stopEditTrajet.addEventListener('click', function(){
 map.off('click', editLatLngToPolyline); //Stop listening for clicks on map.
 });
 */
var doubleclique=0;
function annuler(elem, form){
    $('.'+elem).css('display', 'block');
    $('#'+elem).html('supprimer '+form);
    doubleclique=0;


}
function delete_obj(elem, form){
    if($('.'+elem).css('display') == 'none'){
        $('.'+elem).css('display', 'block');
        $('.'+elem).css({
            'animation-name': '',
            'animation-duration': '',
            'animation-delay': '',
            'animation-iteration-count': ''
        });
        $('.oeilvert').css({'display': 'block',
            'position': 'relative',
            'top': '-37px'});
        $('.yeux').css({'display': 'block',
            background: '#27ae60'});
        $('#'+elem).html('supprimer '+form);
    }else{

        if(doubleclique==0){
            doubleclique=1;
            $('.'+elem).css({
                'animation-name': 'animation',
                'animation-duration': '1s',
                'animation-delay': '2s',
                'animation-iteration-count': 'infinite'
            });

            $('#'+elem).html('<div class="croixvalide">  <div class="boutonvalide"> </div>  <div class="boutonvalide2"> </div>  </div> ');
            $('#'+elem).append('<div class="croixsuppression" onclick="doubleclique=2;"> <div class="boutoncroix"> </div>  <div class="boutoncroix2"> </div>  </div> ');
            $('.oeilvert').css('display', 'none');
        }else if(doubleclique==1){
            $('.'+elem).removeClass('anim');
            $('.'+elem).css('display', 'none');
            $('.oeilvert').css({'display': 'block',
                'position': 'relative',
                'top': '-40px'});
            $('.yeux').css({'display': 'block',
                background: '#e74c3c'});
            $('#'+elem).html('remettre '+form );

            doubleclique=0;

        }


        if(doubleclique==2){
            $('.'+elem).css('display', 'block');
            $('.'+elem).css({
                'animation-name': '',
                'animation-duration': '',
                'animation-delay': '',
                'animation-iteration-count': ''
            });
            $('.oeilvert').css({'display': 'block',
                'position': 'relative',
                'top': '-37px'});
            $('#'+elem).html('supprimer '+form);
            doubleclique=0;
        }

    }

}


$("#simulation").hide();
$('#console').hide();
/*    mode simulation ou non   */
$("#admin").click(function () {    // on lance la simulation donc on montre la console, on cache les bateaux ennemis
    $("#simulation").show();
    $('#console').show();
    $("#admin").hide();
    $('.red').css("display", "none");
    $('#boussole').css("left", "27%")
    $('.rred2').hide();
});
$("#simulation").click(function () {      // on repasse en mode admin
    $("#simulation").hide();
    $("#admin").show();
     $('.red').css("display", "block");
     $('.rred2').show();
     $('#console').hide();
});


