$(document).ready(function() {

    $('#bolinas').click( function(){
        window.open("http://www.surfline.com/surf-forecasts/spot/bolinas-jetty_5091/");
    });

    $('#linda_mar').click( function(){
        window.open("http://www.surfline.com/surf-forecasts/spot/pacifica-lindamar_5013/");
    });

    $('#ocean_beach').click( function(){
        window.open("http://www.surfline.com/surf-forecasts/spot/ocean-beach-sf_4127");
    });

    $('#fort_cronkite').click( function(){
        window.open("http://www.surfline.com/surf-forecasts/spot/fort-cronkite-rodeo-beach_5089/");
    });

    $('#fort_point').click( function(){
        window.open("http://www.surfline.com/surf-forecasts/spot/fort-point_5015/");
    });

});

function updateClock ( )
{
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}
