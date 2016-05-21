
$('#myform').submit(function(){
 return false;
});
 
$('#insert').click(function(){
    alert('Carte sauveguardée');
 $.post( 
 $('#myform').attr('action'),
 $('#myform :input').serializeArray(),
 function(result){
 $('#result').html(result);
 }
 );
});
