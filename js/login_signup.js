$(function () {
  // Used for switching between login and sign-up.
  $('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(2000);

  });

  // Check for when the signup submit button is pressed by user.
  $('#sign-up-btn').bind('click', function (event) {
    event.preventDefault();// using this page stop being refreshing
    $.ajax({
      type: 'POST',
      url: 'http://sulley.cah.ucf.edu/~ni927795/starter-template/register.php',
      data: $('#sign-up-form').serialize(),
      success: function (data) {
        alert(data);
      }
    });
  });

  // Check for when the login submit button is pressed by user.
  $('#login-btn').bind('click', function (event) {
    event.preventDefault();// using this page stop being refreshing
    $.ajax({
      type: 'POST',
      url: 'http://sulley.cah.ucf.edu/~ni927795/starter-template/login.php',
      data: $('#login-form').serialize(),
      success: function (data) {
        alert(data);
      }
    });
  });

  // Validate user input client side.
  // https://jqueryvalidation.org
  // http://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
  $('#sign-up-form').validate({
    rules: {
      username: {
        required: true,
        minlength: 5
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      },
      phone: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10
      },
    },
    messages: {
      username: {
        required: "Please enter a username",
        minlength:"Min length 5 characters"
      },
      email: {
        required: "Please enter a password",
        email: "Invalid format"
      },
      password: {
        required: "Please provide password",
        minlength: "Your password must be at least 5 characters long"
      },
      phone: {
        required: "Please provide phone number - digits only",
        number: "Numbers only",
        minlength: "Your number must be only 10 values",
        maxlength: "Your number must be only 10 values"
      }
    }
  });


});
