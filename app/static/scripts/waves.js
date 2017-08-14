$(document).ready(function(){

    // function creates wave animation with delay and start/end coordinates
    function wave_animation_loop($wave, start_x, start_y, end_x, end_y, period, delay) {
        $wave
            .delay(delay)
            .animate({'left': end_x + '%',
                       'top': end_y + '%'},
                       period,
                       'linear')
             .animate({'left': start_x + '%',
                       'top': start_y + '%'},
                        0,
                        'linear');
        console.log(period+delay);
        window.setTimeout(function() { wave_animation_loop($wave, start_x, start_y, end_x, end_y, period, 0) }, period);
    }

    wave_space = $('#wrapper');

    $.ajax({
        url: "update_conditions",
        success: function(data) {
            // console log for debugging
//            console.log(data);
            $.each(data.Swell, function(i, wave) {

                var wave_angle = -1*(wave.Direction - 270)*(Math.PI/180);
                var wave_period = wave.Period;
                var wave_velocity = 3;
                var wave_iterator = 1;
                var wave_distance = 0;

                while(true) {
                    wave_distance = wave_iterator * wave_velocity * wave_period;
                    wave_distance_x = Math.abs(wave_distance*Math.cos(wave_angle));
                    wave_distance_y = Math.abs(wave_distance*Math.sin(wave_angle));

                    if(wave_distance_x + 50 > 100 || wave_distance_y + 50 > 100) {
                        break;
                    }
                    else {
                        wave_iterator += 1;
                    }
                }
                pos_start_x = 50 - wave_distance*Math.cos(wave_angle);
                pos_start_y = 50 - wave_distance*Math.sin(wave_angle);
                pos_end_x = 50 + wave_distance*Math.cos(wave_angle);
                pos_end_y = 50 + wave_distance*Math.sin(wave_angle);

                for(j = 0; j < wave_iterator; j++) {
                    var $div = $("<div>", {id: i + 'Wave' + j});
                    $div.css({
                        'overflow': 'hidden',   
                        'background-color': '#FF0000',
                        'height': '20px',
                        'width': '20px',
                        'position' : 'absolute',
                        'top': pos_start_y + '%',
                        'left': pos_start_x + '%'
                    });
                    wave_space.append($div);
                    wave_animation_loop($div, pos_start_x, pos_start_y, pos_end_x, pos_end_y, 1000*wave_distance/wave_velocity, 1000*j*wave_period);
                }
            })
        }
    })



});