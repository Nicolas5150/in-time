// Navbar slideout
(function($){
  $(function(){
    // Navbar items - mobile theme
    $('.button-collapse').sideNav();
    // Image parallax
    $('.parallax').parallax();
    // Materialize
    $('select').material_select();
    // Popup for date
    $( "#datepicker" ).datepicker();
    //
    $('#timepicker').timepicki(); 
  });
})(jQuery);
