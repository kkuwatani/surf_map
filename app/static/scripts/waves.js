$(document).ready(function(){


    // function creates wave animation with delay and start/end coordinates
    function wave_animation_loop($wave, start_x, start_y, end_x, end_y, period, delay) {
        var go_left = end_x + '%';
        var go_bottom = end_y + '%';
        var return_left = start_x + '%';
        var return_bottom = start_y + '%';
        $wave
            .delay(delay)
            .animate({'left': go_left,
                       'bottom': go_bottom},
                       period,
                       'linear')
             .animate({'left': return_left,
                       'bottom': return_bottom},
                        0,
                        'linear');
        window.setTimeout(function() { wave_animation_loop($wave, start_x, start_y, end_x, end_y, period, 0) }, period);
    }

    wave_space = $('#wrapper');

    $.ajax({
        url: "update_conditions",
        success: function(data) {
            // console log for debugging
            console.log(data);
            $.each(data.Swell, function(i, wave) {

                var wave_angle = -1*(wave.Direction - 270)*(Math.PI/180);
                var wave_period = wave.Period;
                var wave_velocity = 1.0;
                var wave_iterator = 1;
                var wave_distance = 0;

                var wave_image_x = 75;
                var wave_image_y = 82;
                var aspect_ratio = 1.4; //x pixels / y pixels
                var wave_img_offset = 20;

                while(true) {
                    wave_distance = wave_iterator * wave_velocity * wave_period;
                    wave_distance_x = Math.abs(wave_distance*Math.cos(wave_angle));
                    wave_distance_y = Math.abs(wave_distance*Math.sin(wave_angle));

                    if(wave_distance_x + 50 > 120 || wave_distance_y + 50 > 120 ) {
                        break;
                    }
                    else {
                        wave_iterator += 1;
                    }
                }
                console.log();
                pos_start_x = 50 - wave_distance*Math.cos(wave_angle);
                pos_start_y = 50 - wave_distance*Math.sin(wave_angle);
                pos_end_x = 50 + wave_distance*Math.cos(wave_angle);
                pos_end_y = 50 + wave_distance*Math.sin(wave_angle);
                transform_angle = 45 - wave_angle*(180/Math.PI);
                for(j = 0; j < wave_iterator; j++) {
                    var $div = $("<div>", {id: i + 'Wave' + j});
                    $div.css({
                        'overflow': 'hidden',
                        'height': wave_image_y + '%',
                        'width': wave_image_x + '%',
//                        'background-color': '#909090',
//                        'height': wave_image_y + 'px',
//                        'width': wave_image_x + 'px',
                        'position' : 'absolute',
                        'transform': 'rotate(' + transform_angle + 'deg)',
                        'bottom': pos_start_y - wave_image_y/2 + '%',
                        'left': pos_start_x - wave_image_x/2 + '%',
                        'background-image': 'url("static/images/Dank Wave.svg")',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        'opacity' : 0.7
                    });
                    wave_space.append($div);
                    wave_animation_loop(
                        $div,
                        pos_start_x - wave_image_x/2,
                        pos_start_y - wave_image_y/2,
                        pos_end_x - wave_image_y/2,
                        pos_end_y - wave_image_y/2,
                        1000*wave_distance/wave_velocity,
                        1000*j*wave_period
                    );
                }
            })
            wind_transform = data.Wind.Direction - 180;
            $('#wind_icon').css({
                'transform': "rotate(" + wind_transform + "deg)"
            });
            if(data.Tide.Rise != true) {
                $('#tide_icon').css({
                    'transform': "rotate(" + 180 + "deg)"
                });
            }
        }
    })



});