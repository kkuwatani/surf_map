$(document).ready(function(){


    // function creates wave animation with delay and start/end coordinates
    function wave_animation_loop($wave, start_x, start_y, end_x, end_y, period, delay) {
        $wave
            .delay(delay)
            .animate({'left': end_x + '%',
                       'bottom': end_y + '%'},
                       period,
                       'linear')
             .animate({'left': start_x + '%',
                       'bottom': start_y + '%'},
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
                var wave_velocity = 1.5;
                var wave_iterator = 1;
                var wave_distance = 0;

                var aspect_ratio = 1.4; //x pixels / y pixels
                var wave_img_offset = 20;

                while(true) {
                    wave_distance = wave_iterator * wave_velocity * wave_period;
                    wave_distance_x = Math.abs(wave_distance*Math.cos(wave_angle));
                    wave_distance_y = Math.abs(wave_distance*Math.sin(wave_angle));

                    if(wave_distance_x + 50 > 100 || wave_distance_y + 50 > 100 ) {
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
                        'height': '5px',
                        'width': '5px',
                        'background-color': '#FF0000',
//                        'height': '1240px',
//                        'width': '1240px',
                        'position' : 'absolute',
                        'transform': 'rotate(' + transform_angle + 'deg)',
                        'bottom': pos_start_y + '%',
                        'left': pos_start_x + '%',
//                        'background-image': 'url("static/images/Wave.svg")'
                    });
//                    var $img = $("<img>", {})
                    wave_space.append($div);
                    wave_distance_aspect_ratio = Math.sqrt((Math.pow(aspect_ratio*wave_distance_x, 2) + Math.pow(wave_distance_y, 2)));
//                    wave_animation_loop($div, pos_start_x, pos_start_y, pos_end_x, pos_end_y, 1000*wave_distance/wave_velocity, 1000*j*wave_period);
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