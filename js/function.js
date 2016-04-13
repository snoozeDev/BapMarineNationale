//edit de bateaux
function editbateau(bat){
    console.log("bien joué"+bat);

}




//affichage toolbar et popup

$('#bateau').click(function(){ //faire apparaittre le popup des bateaux
    $('#ajout_bateau').css('display','block');
});
$('#forme').click(function(){ //faire apparaittre le popup des formes
    $('#ajout_pins').css('display','block');
});
$(document).mouseup(function (e){
    var container = $("#ajout_pins");
    if (container.has(e.target).length === 0)
        container.hide();
    var container2 = $("#ajout_bateau");
    if (container2.has(e.target).length === 0)
        container2.hide();
});

$('.btn_finish').click(function(){ //faire disparaitre le bouton draw finish
    $('.btn_finish').css('display', 'none');
});
$('#btn_text').click(function(){ //faire apparaitre le form de texte
    $('.formulaire').css('display', 'none');
    $('#form_text').css('display', 'block');

});
$('#btn_circle').click(function(){ //faire apparaitre le form de circle
    $('.formulaire').css('display', 'none');
    $('#form_circle').css('display', 'block');

});
$('#btn_polygone').click(function(){ //faire apparaitre le form de polygone
    $('.formulaire').css('display', 'none');
    $('#form_polygone').css('display', 'block');

});
$('#btn_polyline').click(function(){ //faire apparaitre le form de polyline
    $('.formulaire').css('display', 'none');
    $('#form_polyline').css('display', 'block');

});