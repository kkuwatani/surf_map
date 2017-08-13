$(document).ready(function(){

    wave_space = $('#wrapper');

    $.ajax({
        url: "update_conditions",
        success: function(data) {
            // console log for debugging
//            console.log(data);
            $.each(data.Swell, function(i, wave) {
                console.log(wave);
                var $div = $("<div>", {id: "testtesttest"});
                $div.html("hello world");
                wave_space.append($div);
            })
        }
    })
});