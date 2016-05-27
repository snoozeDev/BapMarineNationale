/*var bateaux = []; //tableau de tous les bateaux
 //edit de bateaux
 function editbateau(bat){
 addEventListener('click', function(){
 console.log("bien jouÃƒÆ’Ã‚Â©"+bat);
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
function delete_obj(elem, form){
    if($('.'+elem).css('display') == 'none'){
        $('.'+elem).css('display', 'block');
        $('.'+elem).css({
            'animation-name': '',
            'animation-duration': '',
            'animation-delay': '',
            'animation-iteration-count': ''
        });



        $('#'+elem).html('<div class="margepolyline">supprimer '+form+' </div><div class="oeilvert"><div class=" yeux vert"></div></div>');
    }else{

        if(doubleclique==0){
            doubleclique=1;
            $('.'+elem).css({
                'animation-name': 'animation',
                'animation-duration': '1s',
                'animation-delay': '2s',
                'animation-iteration-count': 'infinite'
            });

            $('#'+elem).html('<img src="image/validationsuppression.png"/> '); //mettre image valider
            $('#'+elem).append('<img src="image/supprsuppression.png" onclick="doubleclique=2;" />');//mettre image suppression
        }else if(doubleclique==1){
            $('.'+elem).removeClass('anim');
            $('.'+elem).css('display', 'none');
            $('#'+elem).html('<div class="margepolyline">remettre '+form+'</div><div class="oeilvert"><div class=" yeux rouge"></div></div>'); //mettre oeil rouge

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
            $('#'+elem).html('<div class="margepolyline">supprimer '+form+'</div><div class="oeilvert"><div class=" yeux vert"></div></div>');
            doubleclique=0;
        }

    }

}




$("#simulation").hide();
$('#console').hide();
$('#notif').hide();
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
var console_message=0;
$('#close_console').click(function(){
    if(console_message==0){
        notif=0;
        $('.black').css('height',"0");
        $('#console').css('height',"auto");
        $('#notif').show();
        $('#close').hide();
        console_message=1;
        
    }else{
        notif=0;
        $('.black').css('height',"80%");
        $('#console').css('height',"50%");
        $('#notif').hide();
        $('#close').show();
        console_message=0;
        
    }
    
});

/*  fonciton changement image icone    */
$('#icone_select').change(function () {   
    var ico="image/"+$('#icone_select').val()+".png";
    $("#icone_img").attr("src",ico);
});