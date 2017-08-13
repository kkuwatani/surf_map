$(document).ready(function(){

    function wave_animation_loop($wave, start_x, start_y, end_x, end_y, delay) {
        $wave
            .delay(delay)
            .animate({'left': end_x,
                       'top': end_y},
                       5000,
                       'linear')
             .animate({'left': start_x,
                       'top': start_y},
                        0,
                        'linear');
        window.setTimeout(function() { wave_animation_loop($wave, start_x, start_y, end_x, end_y, delay) }, 5000);
    }

    wave_space = $('#wrapper');

    $.ajax({
        url: "update_conditions",
        success: function(data) {
            // console log for debugging
//            console.log(data);
            $.each(data.Swell, function(i, wave) {
                console.log(wave);
                var $div = $("<div>", {id: i});
                $div.css({
                    'background-color': '#FF0000',
                    'height': '20px',
                    'width': '20px',
                    'position' : 'absolute',
                    'top': 0,
                    'left': 0
                });
                $div.html(i);
                wave_space.append($div);
                wave_animation_loop($div, 0, 0, 500, 500, 2000);
            })
        }
    })



});