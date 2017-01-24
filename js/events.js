
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

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:

var autocomplete, autocompletes;

// https://developers.google.com/maps/documentation/javascript/places-autocomplete
function currentLocAuto() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      // This is the text value location for the current point of interest.
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});
}

function destinationLocAuto() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocompletes = new google.maps.places.Autocomplete(
      // This is the text value location for a destination point of interest.
      /** @type {!HTMLInputElement} */(document.getElementById('autocompletes')),
      {types: ['geocode']});
}

// http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_ajax_getjson
// https://developers.google.com/maps/documentation/javascript/distancematrix
$("#event-add-btn").click(function(){
  var service = new google.maps.DistanceMatrixService;
service.getDistanceMatrix({
  origins: [document.getElementById('autocomplete').value],
  destinations: [document.getElementById('autocompletes').value],
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
  } else {

    // https://jsfiddle.net/3b03m5mt/
    // https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Tampa,%20FL,%20United%20States&destinations=Orlando,%20FL,%20United%20Stateskey=AIzaSyDP9wo3OPbTjnXug18mUwl0T68xMReaKdQ
    // Durration value in seconds.
    alert(response.originAddresses[0] + ' --> ' + response.destinationAddresses[0] + ' ==> ' + response.rows[0].elements[0].duration.value);
    alert(secondsToHms(response.rows[0].elements[0].duration.value));
  }
});
alert(document.getElementById('autocomplete').value);
});

// Convert value of seconds passed from DistanceMatrixService to Hr:Min:Sec.
function secondsToHms(d) {
d = Number(d);
var hr = Math.floor(d / 3600);
var min = Math.floor(d % 3600 / 60);
var sec = Math.floor(d % 3600 % 60);

var hrDisplay = hr > 0 ? hr + (hr == 1 ? " hour, " : " hours, ") : "";
var minDisplay = min > 0 ? min + (min == 1 ? " minute, " : " minutes, ") : "";
var secDisplay = sec > 0 ? sec + (sec == 1 ? " second" : " seconds") : "";
return hrDisplay + minDisplay + secDisplay;
}
