<head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>


<nav class="menu" tabindex="0">
	<div class="smartphone-menu-trigger"></div>
	<header class="avatar">
		<img src="http://www.defense.gouv.fr/var/dicod/storage/images/base-de-medias/images/marine/photos-au-fil-de-l-eau/image001/2252802-1-fre-FR/image001.jpg" />
		<h2>Centre d'Études Stratégiques de la Marine</h2>
        </header>
	<ul>
		<li tabindex="0" id="new" class="icon-dashboard"><span>Nouvelle Carte</span></li>
		<li tabindex="0" id="load"  class="icon-customers"><span>Charger Carte</span></li>
		<li tabindex="0" id="tuto"  class="icon-users"><span>Tutoriel</span></li>

	</ul>
</nav>

<main>
	<div class="helper">
		<div id="indexDiv">
		    
		    BAP MARINE NATIONALE
		<span>Prototype d'un outil de briefing militaire destiné à simuler des opérations navales</span>
		    
		</div>
		
	</div>
	<div  id="newDiv" style="color:red">
    <div class='container'>
  <div class='loading'>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
    </div>
    <div  id="loadDiv" style="position:absolute; z-index:100">
    <div class="top">
    <h4 style="margin-bottom:7px; color:#ffffff">Charger une carte sauveguardée</h4>
    
<ul class="" style=" z-index:110">
  <li class="resource--article ">
      <h10 class="resource__title" style="color:black">Titre de la carte</h10>
      <p class="resource__summary">Description de la carte</p>
      <p class="resource--article__author"><span>Auteur de la carte </span>David Johnson</p>
    

    </ul>
    
    </div>
    </div>
		<div  id="tutoDiv">TUTO</div>
	<script type="text/javascript" charset="utf-8" src="js/jquery.tubular.1.0.js"></script>
	<script>
	    
        
        
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
        
        
        
        
	</script>
	<style>
        .hide{display: none}
        .show{display: block}
	    body {
  background: rgba(0, 0, 0, 0);
  margin: 0;
  font-family: "Open Sans", Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #fff;
  padding-left: 240px;
            
}
main {
  position: relative;
  height: 100vh;
   
}
/*
.top{
  height: 70px;
  width: 100%;
    background: rgba(0, 0, 0, 0.1);
    color:black;
}
*/
main .helper {
  background: rgba(0, 0, 0, 0);
  color: #ffffff;
  
  top: 50%;
  left: 40%;
  transform: translate3d(-50%, -50%, 0);

  text-align: center;
  border-radius: 20px;
  font-size: 3em;
  font-weight: bold;
        }
        #newDiv{
            overflow:hidden;
        } 
#loadDiv{
            
  
     text-align: center;
  border-radius: 20px;
  font-size: 3em;
  font-weight: bold;
        }
main .helper span {
  color: rgba(255, 255, 255, 0.71);
  font-size: 0.4em;
  display: block;
}
.menu {
  background:#2c3e50 ;
  height: 100vh;
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  outline: none;
}
.menu .avatar {
  background: rgba(0, 0, 0, 0.1);
  padding: 2em 0.5em;
  text-align: center;
    cursor: pointer;
}
.menu .avatar img {
  width: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #2c3e50;
  box-shadow: 0 0 0 4px rgba(9, 19, 139, 0.2);
}
.menu .avatar h2 {
  font-weight: normal;
  margin-bottom: 0;
}
.menu ul {
  list-style: none;
  padding: 0.5em 0;
  margin: 0;
}
.menu ul li {
  padding: 0.5em 1em 0.5em 3em;
  font-size: 1.25em;
  font-weight: regular;
  background-repeat: no-repeat;
  background-position: left 15px center;
  background-size: auto 20px;
  transition: all 0.15s linear;
cursor: pointer;
}
.menu ul li.icon-dashboard {
  background-image: url("images/sheet.png");
}
.menu ul li.icon-customers {
  background-image: url("images/interface.png");
}
.menu ul li.icon-users {
  background-image: url("images/circle.png");
}
.menu ul li.icon-settings {
  background-image: url("http://www.entypo.com/images//tools.svg");
}
.menu ul li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
        .active{
          background-color: rgba(0, 0, 0, 0.1);  
        }
.menu ul li:focus {
  outline: none;
}
@media screen and (max-width: 900px) and (min-width: 400px) {
  body {
    padding-left: 90px;
  }
  .menu {
    width: 90px;
  }
  .menu .avatar {
    padding: 0.5em;
    position: relative;
  }
  .menu .avatar img {
    width: 60px;
  }
  .menu .avatar h2 {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 100px;
    margin: 0;
    min-width: 200px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4);
    transform: translate3d(-20px, -50%, 0);
    transition: all 0.15s ease-in-out;
  }
  .menu .avatar:hover h2 {
    opacity: 1;
    transform: translate3d(0px, -50%, 0);
  }
  .menu ul li {
    height: 60px;
    background-position: center center;
    background-size: 30px auto;
    position: relative;
  }
  .menu ul li span {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    top: 50%;
    left: 80px;
    transform: translate3d(-15px, -50%, 0);
    transition: all 0.15s ease-in-out;
  }
  .menu ul li span:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: -5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid rgba(0, 0, 0, 0.5);
    transform: translateY(-50%);
  }
  .menu ul li:hover span {
    opacity: 1;
    transform: translate3d(0px, -50%, 0);
  }
}
@media screen and (max-width: 400px) {
  body {
    padding-left: 0;
  }
  .menu {
    width: 230px;
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0);
    transform: translate3d(-230px, 0, 0);
    transition: all 0.3s ease-in-out;
  }
  .menu .smartphone-menu-trigger {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 100%;
    background: #5bc995;
  }
  .menu .smartphone-menu-trigger:before,
  .menu .smartphone-menu-trigger:after {
    content: '';
    width: 50%;
    height: 2px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .menu .smartphone-menu-trigger:after {
    top: 55%;
    transform: translate3d(-50%, -50%, 0);
  }
  .menu ul li {
    padding: 1em 1em 1em 3em;
    font-size: 1.2em;
  }
  .menu:focus {
    transform: translate3d(0, 0, 0);
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0.6);
  }
  .menu:focus .smartphone-menu-trigger {
    pointer-events: none;
  }
}
.container {
    background: #f5f2f2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -15%;
  right: 0;
  margin: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  text-align: center;
}

.loading {
  text-align: center;
  margin-top: 25px;
}
.loading > span {
  display: inline-block;
  width: 8px;
  height: 50px;
  margin: 0 1px;
  background-color: lightgray;
  -webkit-animation: anim 400ms ease infinite alternate;
          animation: anim 400ms ease infinite alternate;
}
.loading > span:nth-child(1) {
  -webkit-animation-delay: 0ms;
          animation-delay: 0ms;
}
.loading > span:nth-child(2) {
  -webkit-animation-delay: 50ms;
          animation-delay: 50ms;
}
.loading > span:nth-child(3) {
  -webkit-animation-delay: 100ms;
          animation-delay: 100ms;
}
.loading > span:nth-child(4) {
  -webkit-animation-delay: 150ms;
          animation-delay: 150ms;
}
.loading > span:nth-child(5) {
  -webkit-animation-delay: 200ms;
          animation-delay: 200ms;
}
.loading > span:nth-child(6) {
  -webkit-animation-delay: 250ms;
          animation-delay: 250ms;
}
.loading > span:nth-child(7) {
  -webkit-animation-delay: 300ms;
          animation-delay: 300ms;
}
.loading > span:nth-child(8) {
  -webkit-animation-delay: 350ms;
          animation-delay: 350ms;
}

@-webkit-keyframes anim {
  from {
    -webkit-transform: scale(1.2, 0.9);
            transform: scale(1.2, 0.9);
    background-color: #18009f;
  }
  to {
    -webkit-transform: scale(1.6, 1.5);
            transform: scale(1.6, 1.5);
    background-color: #09033b;
  }
}

@keyframes anim {
  from {
    -webkit-transform: scale(1.2, 0.9);
            transform: scale(1.2, 0.9);
    background-color: #18009f ;
  }
  to {
    -webkit-transform: scale(1.6, 1.5);
            transform: scale(1.6, 1.5);
    background-color: #09033b;
  }
}
.resource--add__iconcircle {
  position: absolute;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  left: 50%;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #000;
}

section:after {
  content: "";
  display: table;
  clear: both;
}

*, * > * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "roboto", "helvetica";
  background-color: #f4f4f4;
}

main {
  padding: 2rem 0;
  max-width: 1350px;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #202020;
}

.resource--article, .resource--book, .resource--talks, .resource--add {
  position: relative;
  background-color: #fff;
  width: 90%;
  margin: 0 auto;
  list-style-type: none;
  padding: .5rem 1.75rem 3rem;
  border-top: 15px solid #2406a2;
  margin-bottom: 1.75rem;
  border-radius: 5px;
  -webkit-transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.resource--article:hover:before, .resource--book:hover:before, .resource--talks:hover:before, .resource--add:hover:before {
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.resource--article:hover:after, .resource--book:hover:after, .resource--talks:hover:after, .resource--add:hover:after {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
}
.resource--article:before, .resource--book:before, .resource--talks:before, .resource--add:before, .resource--article:after, .resource--book:after, .resource--talks:after, .resource--add:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
  border-radius: inherit;
  z-index: -1;
  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.resource--article:after, .resource--book:after, .resource--talks:after, .resource--add:after {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
}
@media screen and (min-width: 37.5em) {
  .resource--article, .resource--book, .resource--talks, .resource--add {
    width: 80%;
  }
}
@media screen and (min-width: 50em) {
  .resource--article, .resource--book, .resource--talks, .resource--add {
    float: left;
    margin-left: 2.5%;
    width: 46%;
  }
}
@media screen and (min-width: 75em) {
  .resource--article, .resource--book, .resource--talks, .resource--add {
    float: left;
    width: 70%;
      margin-left: 15%;
  }
}

.resource__title, .resource--add__title {
  font-weight: 400;
  line-height: 1.2;
  font-size: 75%;
  margin-bottom: .75em;
}
.resource__summary, .resource--add__summary {
  color: #868686;
  line-height: 1.5;
 font-size: 50%;
  margin-bottom: 2em;
}

.resource--article__author, .resource--book__author, .resource--book__publisher, .resource--talks__author {
  font-weight: 500;
  letter-spacing: 1px;
    font-size: 50%;
}
.resource--article__author span, .resource--book__author span, .resource--book__publisher span, .resource--talks__author span {
  font-style: italic;
  color: #868686;
    
}

.resource--article__author {
  color: #d40000;
}

.resource--book {
  border-color: #1CE8B5;
}
.resource--book__author {
  margin-bottom: .5rem;
  color: #00bea4;
}
.resource--book__publisher {
  color: #00bea4;
}
.resource--book .resource--add {
  border-color: #1CE8B5;
}

.resource--talks {
  border-color: #eb3f79;
}
.resource--talks__author {
  color: #d71a5f;
}

.resource--add svg {
 
}
.resource--add__title {
  text-align: center;
}
.resource--add__summary {
  text-align: center;
}
.resource--add__card {
  width: 0;
  height: 0;
  opacity: 0;
  top: 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: 6px 6px 12px rgba(134, 134, 134, 0.4), -6px -6px 12px rgba(134, 134, 134, 0.4);
  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transform-origin: top top;
          transform-origin: top top;
}

.resource__add-icon {
  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-is-rotated {
  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

section {
  clear: both;
  margin-bottom: 7rem;
}

.section__title {
  margin-left: 5%;
  margin-bottom: .2rem;
  font-size: 1.75rem;
  font-weight: 500;
}
@media screen and (min-width: 37.5em) {
  .section__title {
    margin-left: 10%;
  }
}
@media screen and (min-width: 50em) {
  .section__title {
    margin-left: 2.5%;
  }
}
.section__summary {
  margin-left: 5%;
  margin-bottom: 1.5rem;
  color: #868686;
  line-height: 1.5;
  font-size: 1.125em;
}
@media screen and (min-width: 37.5em) {
  .section__summary {
    margin-left: 10%;
  }
}
@media screen and (min-width: 50em) {
  .section__summary {
    margin-left: 2.5%;
  }
}

.add {
  width: 30%;
  display: block;
  margin: 2.25rem auto 1.75rem;
  position: relative;
  z-index: 100;
  /*&:active polygon{
    transform:rotate(360deg);
  }*/
}
.add polygon {
  -webkit-transition: fill .6s ease,-webkit-transform .4s ease;
  transition: fill .6s ease,-webkit-transform .4s ease;
  transition: transform .4s ease,fill .6s ease;
  transition: transform .4s ease,fill .6s ease,-webkit-transform .4s ease;
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.articles .section__title {
  color: #d40000;
}
.articles .recommended {
  background-color: #FF1643;
}
.articles .add circle {
  fill: #FF1643;
}
.articles .add:hover circle {
  fill: #ff3058;
}

.books .resource--add {
  border-color: #1CE8B5;
}
.books .section__title {
  color: #00bea4;
}
.books .recommended {
  background-color: #1CE8B5;
}
.books .add circle {
  fill: #1CE8B5;
}
.books .add:hover circle {
  fill: #33eabd;
}

.talks .resource--add {
  border-color: #eb3f79;
}
.talks .section__title {
  color: #d71a5f;
}
.talks .recommended {
  background-color: #eb3f79;
}
.talks .add circle {
  fill: #eb3f79;
}
.talks .add:hover circle {
  fill: #ed5689;
}

@media screen and (min-width: 50em) {
  .resources li:nth-child(2n+1) {
    clear: both;
  }
}
@media screen and (min-width: 65em) {
  .resources li:nth-child(3n+1) {
    clear: none;
  }
}
@media screen and (min-width: 75em) {
  .resources li:nth-child(2n+1) {
    clear: none;
  }
}

.recommended {
  color: white;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: .8em;
  text-transform: uppercase;
  padding: .3rem .7rem;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0 0 5px 0;
}
.recommended svg {
  width: 15px;
  margin-right: 8px;
  position: relative;
  top: 2px;
}

.card-is-active {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: red;
  opacity: 1;
  top: 0;
  right: 0;
  z-index: 200;
  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transform-origin: top right;
          transform-origin: top right;
  border-radius: 0;
}
         body{background:black !important}
	</style>
</main>