<<<<<<< HEAD
$('#myform').submit(function(){
	return false;
});

$('#insert').click(function(){
	$.post(		
		$('#myform').attr('action'),
		$('#myform :input').serializeArray(),
		function(result){
			$('#result').html(result);
		}
	);
=======
$('#myform').submit(function(){
	return false;
});

$('#insert').click(function(){
	$.post(		
		$('#myform').attr('action'),
		$('#myform :input').serializeArray(),
		function(result){
			$('#result').html(result);
		}
	);
>>>>>>> 1abfc6fb8ff3ceb7c3f4bbb0314162f1b22ee8ed
});