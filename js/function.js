/*var bateaux = []; //tableau de tous les bateaux
 //edit de bateaux
 function editbateau(bat){
 addEventListener('click', function(){
 console.log("bien jouÃ©"+bat);
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

    $( "p" ).one( "click", function() {
        $( this ).width( 230).height( 8 )
    });

    $('#'+elem).html('Supprimer '+form);
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


        $('.' + elem + ' .yeux').css({'display': 'block',
            background: '#27ae60'});
        $("#oeil" + elem).addClass('vert').removeClass('rouge');

        /*    $( "p" ).on( "click", function() {
         $( this ).width( 230).height( 8).off ();
         });
         */
        $(".oeilvert").css({
            'display': 'block',
            'top': '4',
        });

        $('#'+elem).html('Supprimer '+form);

        $( "p" ).on( "click", function() {
            $( this ).width( 205).height( 0)
        });

    }else{

        if(doubleclique==0){
            doubleclique=1;
            $('.'+elem).css({
                'animation-name': 'animation',
                'animation-duration': '1s',
                'animation-delay': '2s',
                'animation-iteration-count': 'infinite'
            });

            $( "p" ).one( "click", function() {
                $( this ).width( 44).height( 44 )
            });

            /* $( "p" ).on( "click", function() {
             $(this).off();
             }); */
            $(".oeilvert").css({
                'display': 'none',
            });

            $('#'+elem).html('<div class="croixvalide"><div class="boutonvalide"></div><div class="boutonvalide2"></div></div><div class="croixsuppression" onclick="doubleclique=2;"><div class="boutoncroix"></div><div class="boutoncroix2"></div></div>');
            /* $('#'+elem).append('<div class="croixsuppression" onclick="doubleclique=2;"><div class="boutoncroix"></div><div class="boutoncroix2"></div></div>');
             */



        }else if(doubleclique==1){
            $('.'+elem).removeClass('anim');
            $('.'+elem).css('display', 'none');

$("p").css({
    'width' : '250px',
    'height': '8',
});

            $(".oeilvert").css({
                'display': 'block',
                'top': '-5',
            });

             $( "p" ).one( "click", function() {
             $( this ).width( 250).height( 8 )
             });


            $("#oeil" + elem).addClass('rouge').removeClass('vert');

            $('#'+elem).html('Remettre '+form);

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

            $("p").css({
                'width' : '250px',
                'height': '8',
            });

            $(".oeilvert").css({
                'display': 'block',
                'top': '2',
            });
            $("#oeil" + elem).addClass('vert').removeClass('rouge');



            $( "p" ).one( "click", function() {
                $( this ).width( 250).height( 8 )
            });

            $("form").css({
                'width': '100',
                'height':'8',
            });

            $('#'+elem).html('Supprimer '+form);


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


/*  fonciton changement image icone    */
$('#icone_select').change(function () {   
    var ico="image/"+$('#icone_select').val()+".png";
    $("#icone_img").attr("src",ico);
});