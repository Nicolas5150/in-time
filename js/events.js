// Date and time plugins.
(function($){
  // Popup for date
  $( "#datepicker" ).datepicker();
  // Select the current time or time needed.
  $('#timepicker').timepicki({
    start_time: ["12", "00", "PM"],
    step_size_minutes:10});


    // Validate user input client side.
    // https://jqueryvalidation.org
    // http://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
    $('#event-form').validate({
      rules: {
        events: {
          required: true
        },
        datepicker: {
          required: true
        },
        timepicker: {
          required: true
        },
        current: {
          required: true
        },
        destination: {
          required: true
        },
        number: {
          required: true
        },
        depart: {
          required: true
        },
        travel: {
          required: true
        },
      },
    });

})(jQuery);

  function addModal() {
      // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

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

  // https://developers.google.com/maps/documentation/javascript/places-autocomplete
  // This example displays an address form, using the autocomplete feature
  // of the Google Places API to help users fill in the information.
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  var autocomplete, autocompletes;

  function currentLocAuto() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        // This is the text value location for the current point of interest.
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete-current')),
        {types: ['geocode']});
  }

  function destinationLocAuto() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocompletes = new google.maps.places.Autocomplete(
        // This is the text value location for a destination point of interest.
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete-destination')),
        {types: ['geocode']});
  }

  // Google Maps Matrix API - used to find the travel time between two points.
  // http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_ajax_getjson
  // https://developers.google.com/maps/documentation/javascript/distancematrix
  $("#event-add-btn").click(function(){
    // Prevent default, w/o, causes matrix to not have origin / destination values.
    event.preventDefault();
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [document.getElementById('autocomplete-current').value],
      destinations: [document.getElementById('autocomplete-destination').value],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
      drivingOptions: {
        departureTime: new Date(Date.now() + 1),  // for the time "1"N milliseconds from now.
        trafficModel: 'bestguess'
      }
    }, function(response, status) {

      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      }

      else {
        // https://jsfiddle.net/3b03m5mt/
        // https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Tampa,%20FL,%20United%20States&destinations=Orlando,%20FL,%20United%20Stateskey=AIzaSyDP9wo3OPbTjnXug18mUwl0T68xMReaKdQ
        // Capture time from form and convert to 24 hr clock.
        var travelTime = response.rows[0].elements[0].duration.value;
        var val = convertTo24Hour(document.getElementById("timepicker").value);
        // In cases where the time is 01-09 pm and causes a 0 to start the 2400 clock.
        if (val.length == 7)
          val = val.slice(1, 7);

        // Date picker has the year at end and moment.js requires it at front.
        // Conforming data to YYYY-MM-DD from MM/DD/YYYY.
        // This will also be used to send/save/check date with server.
        var date = document.getElementById("datepicker").value
        var yrSwitch = date.slice(6, 10);
        yrSwitch += "-";
        yrSwitch += date.slice(0, 5);
        yrSwitch = (yrSwitch.replace(/\//g , "-"));
        var dateTime = (yrSwitch+' '+ val);

        // https://momentjs.com
        // Find the needed departure time using the travel time from google and the
        // arival time needed of the user.
        var now = moment(dateTime, "YYYY-MM-DD HH:mm");
        var olderDate = moment(now).subtract(travelTime, 'seconds').toDate();
        document.getElementById('depart').value = convertTo12Hour(olderDate);

        // Add values to screen for user to see
        document.getElementById('travel').value = secondsToHms(travelTime);
      }
    });
  });

  // Convert value of seconds passed from DistanceMatrixService to Hr:Min:Sec.
  function secondsToHms(d) {
    d = Number(d);
    var hr = Math.floor(d / 3600);
    var min = Math.floor(d % 3600 / 60);

    var hrDisplay = hr > 0 ? hr + (hr == 1 ? " hour, " : " hours, ") : "";
    var minDisplay = min > 0 ? min + (min == 1 ? " minute " : " minutes ") : "";

    return hrDisplay + minDisplay;
  }

  // Convert time to 24 hour clock.
  function convertTo24Hour(time) {
      var hours = parseInt(time.substr(0, 2));
      if (time.indexOf('AM') != -1 && hours == 12) {
          time = time.replace('12', '0');
      }
      if (time.indexOf('PM')  != -1 && hours < 12) {
          time = time.replace(hours, (hours + 12));
      }

      return time.replace(/(AM|PM)/, '');
  }

  // Convert time to 12 hour clock as string.
  function convertTo12Hour(date) {
    var hours = date.getHours();
    var mins = date.getMinutes();
    // This deals with values under 10 min whos prefix 0 is dropped, must add back.
    if (mins < 10)
      mins = "0"+mins;

    var suffix = hours >= 12 ? "PM":"AM";
    hours = ((hours + 11) % 12 + 1);
    convertedTime = hours +":"+  mins +" "+ suffix;

    return convertedTime;
  }
