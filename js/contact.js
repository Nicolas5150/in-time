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
            // could pass data if needed.
            modalEvent();
          }
        });
          return false;
      }
  })

  function modalEvent() {
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
  }

})(jQuery);
