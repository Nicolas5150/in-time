(function($){
  // Check for when the contact submit button is pressed by user.
  $('#contact-btn').bind('click', function (event) {
    // Using this to stop refreshing.
    event.preventDefault();
    $.ajax({
      // Grab data from the from and send it to the php call.
      type: 'POST',
      url: 'http://sulley.cah.ucf.edu/~ni927795/in-time/php/contact.php',
      data: $('#contact-form').serialize(),
      success: function (data) {
        alert(data);
      }
    });
  });

  // Validate user input client side.
  // https://jqueryvalidation.org
  // http://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
  $('#contact-form').validate({
    rules: {
      message: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      message: {
        required: "Description required.",
        minlength: "Description too short."
      },
      email: {
        required: "Email required.",
        email: "Invalid format."
      }
    }
  });

})(jQuery);
