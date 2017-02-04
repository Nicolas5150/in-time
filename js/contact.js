(function($){
  $('#contact-form').validate({
    debug: false,

    rules: {
      message: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
        pass: "required"
      },

    messages: {
      message: {
        required: "Description required.",
        minlength: "Description too short."
      },
        pass: "Required !",
      email: {
        required: "Email required.",
        email: "Invalid format."
      },
        pass: "Required !"
      },

      // If all passes submit the ajax call for the form data to pass.
      submitHandler: function (form) {
        $.ajax({
          type: 'POST',
          url: 'http://sulley.cah.ucf.edu/~ni927795/in-time/php/contact.php',
          data: $('#contact-form').serialize(),
          success: function (data) {
            alert(data);
          }
        });
          return false;
      }
  })

})(jQuery);
