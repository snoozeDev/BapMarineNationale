$(document).ready(function () {

	$('#btn_text').click(function(){
		$(this).addClass("active");
		$('#btn_circle').removeClass("active");
		$('#btn_polygone').removeClass("active");
		$('#btn_polyline').removeClass("active");
	});

	$('#btn_circle').click(function(){
		$(this).addClass("active");
		$('#btn_text').removeClass("active");
		$('#btn_polygone').removeClass("active");
		$('#btn_polyline').removeClass("active");
	});

	$('#btn_polygone').click(function(){
		$(this).addClass("active");
		$('#btn_circle').removeClass("active");
		$('#btn_text').removeClass("active");
		$('#btn_polyline').removeClass("active");
	});

	$('#btn_polyline').click(function(){
		$(this).addClass("active");
		$('#btn_circle').removeClass("active");
		$('#btn_polygone').removeClass("active");
		$('#btn_text').removeClass("active");
	});

});