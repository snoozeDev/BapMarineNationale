$(document).ready(function () {
  var trigger1 = $('.onglet1-btn'),
  trigger2 = $('.onglet2-btn'),
  overlay1 = $('.onglet1'),
  overlay2 = $('.onglet2');
  isClosed = false;

  trigger1.click(function () {
    onglet1();      
  });

  function onglet1() {

    if (isClosed == true) {
      overlay1.removeClass('is-open');
      overlay1.addClass('is-closed');
      overlay2.removeClass('is-closed');
      overlay2.addClass('is-open');
      isClosed = false;
    } else {   
      overlay1.removeClass('is-closed');
      overlay1.addClass('is-open');
      overlay2.removeClass('is-open');
      overlay2.addClass('is-closed');
      isClosed = true;
    }
  }

  trigger2.click(function () {
    onglet2();
  });

  function onglet2() {
    
    if (isClosed == true) {
      overlay2.removeClass('is-open');
      overlay2.addClass('is-closed');
      overlay1.removeClass('is-closed');
      overlay1.addClass('is-open');
      isClosed = false;
    } else {
      overlay2.removeClass('is-closed');
      overlay2.addClass('is-open');
      overlay1.removeClass('is-open');
      overlay1.addClass('is-closed');
      isClosed = true;
    }
  }
  
});