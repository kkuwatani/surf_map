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


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}