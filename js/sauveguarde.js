
$('#myform').submit(function(){
 return false;
});
 
$('#insert').click(function(){
    console.log("azazza");
    alert('Carte sauveguardée');
 $.post( 
 $('#myform').attr('action'),
 $('#myform :input').serializeArray(),
 function(result){
 $('#result').html(result);
 }
 );
});
