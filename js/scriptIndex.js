   
        
        
        	$().ready(function() {
                
                $('#newDiv').css('display', 'none');
                $('#loadDiv').css('display', 'none');
                $('#tutoDiv').css('display', 'none');
		$('.helper').tubular({videoId: 'VOuRqBnBYrY'}); // where idOfYourVideo is the YouTube ID.
	});
     
   $('header').click(function(){ //faire apparaittre le popup des bateaux
   
       $('.helper').css('display', 'block');
               $('#newDiv').css('display', 'none');
        $('#new').removeClass('active');
        $('#tuto').removeClass('active');
        $('#load').removeClass('active');
       $('#tubular-container').css('display', 'block');
                $('#loadDiv').css('display', 'none');
                $('#tutoDiv').css('display', 'none');
         console.log("dashboard");
});
        
         $('.resource--article').click(function(){ //faire apparaittre le popup des bateaux
   
      alert("zob");
             
});

     $('.icon-dashboard').click(function(){ //faire apparaittre le popup des bateaux
   
       $('.helper').css('display', 'none');
               $('#newDiv').css('display', 'block');
         $('#new').addClass('active');
          $('#tuto').removeClass('active');
          $('#load').removeClass('active');
                $('#loadDiv').css('display', 'none');
                $('#tubular-container').css('display', 'none');
                $('#tutoDiv').css('display', 'none');
           console.log("new");
           setTimeout(function () {
       window.location.href = "map.php"; //will redirect to your blog page (an ex: blog.html)
    }, 0); //will call the function after 2 secs.

});
           $('.icon-customers').click(function(){ //faire apparaittre le popup des bateaux
   
       $('.helper').css('display', 'none');
               $('#load').addClass('active');
                $('#tuto').removeClass('active');
                $('#new').removeClass('active');
               $('#newDiv').css('display', 'none');
                $('#loadDiv').css('display', 'block');
                      $('#tubular-container').css('display', 'none');
                $('#tutoDiv').css('display', 'none');
                 console.log("load");
});
           $('.icon-users').click(function(){ //faire apparaittre le popup des bateaux
   
       $('.helper').css('display', 'none');
               $('#newDiv').css('display', 'none');
               $('#tuto').addClass('active');
               $('#new').removeClass('active');
                $('#load').removeClass('active');
                $('#loadDiv').css('display', 'none');
                      $('#tubular-container').css('display', 'none');
                $('#tutoDiv').css('display', 'block');
               console.log("tuto");
});
        
        
        