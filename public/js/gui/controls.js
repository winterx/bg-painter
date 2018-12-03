function setUIControls() {

    // $('.op-color-item').each(function(index, element) {
    //     $(this).css('background-color', '#' + deciToHex(Pattern.colors[index]));
    // });

    $('.op-color-string').html('["'+deciToHex( Pattern.colors[0] )+'","'+deciToHex( Pattern.colors[1] )+'","'+deciToHex( Pattern.colors[2] )+'","'+deciToHex( Pattern.colors[3] ) +'"]');

    $('#color_00').css('background-color', '#' + deciToHex( Pattern.colors[0] ) );
    $('#color_01').css('background-color', '#' + deciToHex( Pattern.colors[1] ) );
    $('#color_02').css('background-color', '#' + deciToHex( Pattern.colors[2] ) );
    $('#color_03').css('background-color', '#' + deciToHex( Pattern.colors[3] ) );

    $('#color_00').ColorPicker({
        color: '#' + deciToHex(Pattern.colors[0]),
        onChange: function(hsb, hex, rgb) {
            $('#color_00').css('backgroundColor', '#' + hex);
            Pattern.colors[0] = hexToDeci(hex);
        }
    });
    $('#color_01').ColorPicker({
        color: '#' + deciToHex(Pattern.colors[1]),
        onChange: function(hsb, hex, rgb) {
            $('#color_01').css('backgroundColor', '#' + hex);
            Pattern.colors[1] = hexToDeci(hex);
        }
    });
    $('#color_02').ColorPicker({
        color: '#' + deciToHex(Pattern.colors[2]),
        onChange: function(hsb, hex, rgb) {
            $('#color_02').css('backgroundColor', '#' + hex);
            Pattern.colors[2] = hexToDeci(hex);
        }
    });
    $('#color_03').ColorPicker({
        color: '#' + deciToHex(Pattern.colors[3]),
        onChange: function(hsb, hex, rgb) {
            $('#color_03').css('backgroundColor', '#' + hex);
            Pattern.colors[3] = hexToDeci(hex);
        }
    });
    // $('#colorSelector04').ColorPicker({
    //     color: '#' + deciToHex(Pattern.colors[4]),
    //     onChange: function(hsb, hex, rgb) {
    //         $('#colorSelector04').css('backgroundColor', '#' + hex);
    //         Pattern.colors[4] = hexToDeci(hex);
    //     }
    // });

    // 切换投影模式 
    $('#ui_changeCameraTypeOrtho').click(function(){ 
        Pattern.ProjectType = ORTHO;
    });
    $('#ui_changeCameraTypePersp').click(function(){ 
        Pattern.ProjectType = PERSPECTIVE;
    });

    // 灯光控制
    // light 00
    $('#slider-light00-a').slider({
        value: 1,
        min: 0.0,
        max: 1.0,
        step: 0.1,
        slide: updateLightAlpha
    });
    $('#slider-light00-x').slider({
        value: -400,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    $('#slider-light00-y').slider({
        value: 100,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    $('#slider-light00-z').slider({
        value: -100,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    // light 01
    $('#slider-light01-x').slider({
        value: 400,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    $('#slider-light01-y').slider({
        value: -100,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    $('#slider-light01-z').slider({
        value: -100,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    // light 02
    $('#slider-light02-x').slider({
        value: 0,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    $('#slider-light02-y').slider({
        value: 100,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });
    $('#slider-light02-z').slider({
        value: -100,
        min: -1000,
        max: 1000,
        step: 50,
        slide: updateLightPosition
    });


    // 相机控制
    $('#slider-camera-distance').slider({
        value: 640,
        min: 0,
        max: 2000,
        step: 20,
        slide: updateCamera
    });
    $('#slider-camera-azimuth').slider({
        value: 0,
        min: -180,
        max: 180,
        step: 1,
        slide: updateCamera
    });
    $('#slider-camera-elevation').slider({
        value: 0,
        min: -180,
        max: 180,
        step: 1,
        slide: updateCamera
    });
}


// Vertex Color Weight
$('#slider-vertex-color-weight').slider({
    value: 1.0,
    min: 0.0,
    max: 1.0,
    step: 0.05,
    slide: function() {
        var w = $(this).slider('value')
        for (var i = 1; i < Scene.objects.length; ++i) {
            Scene.objects[i].VertexColorWeight = w;
        }
        $('#vertex-color-weight').html(w);
        app.refresh();
    }
});

//
function updateLightPosition() {

    var l0x = $('#slider-light00-x').slider('value');
    var l0y = $('#slider-light00-y').slider('value');
    var l0z = $('#slider-light00-z').slider('value');

    var l1x = $('#slider-light01-x').slider('value');
    var l1y = $('#slider-light01-y').slider('value');
    var l1z = $('#slider-light01-z').slider('value');

    var l2x = $('#slider-light02-x').slider('value');
    var l2y = $('#slider-light02-y').slider('value');
    var l2z = $('#slider-light02-z').slider('value');

    $('#light00-x').html(l0x);
    $('#light00-y').html(l0y);
    $('#light00-z').html(l0z);

    $('#light01-x').html(l1x);
    $('#light01-y').html(l1y);
    $('#light01-z').html(l1z);

    $('#light02-x').html(l2x);
    $('#light02-y').html(l2y);
    $('#light02-z').html(l2z);

    gl.uniform3fv( Program.uLightDirection, [ l0x,l0y,l0z, l1x,l1y,l1z, l2x,l2y,l2z ]);

    // gl.uniform3fv(Program.uLightPosition, [x, y, z]);
    app.refresh();
}

function updateLightAlpha() {
    
    var l0a = $('#slider-light00-a').slider('value');

    $('#light00-x').html(l0x);

    gl.uniform3fv( Program.uLightDirection, [ l0x,l0y,l0z, l1x,l1y,l1z, l2x,l2y,l2z ]);

    app.refresh();
}

function updateColorScheme() {


    app.refresh();
}

function updateCamera() {
    var azi = $('#slider-camera-azimuth').slider('value');
    var ele = $('#slider-camera-elevation').slider('value');

    $('#camera-azimuth').html(azi);
    $('#camera-elevation').html(ele);

    camera.setAzimuth(azi);
    camera.setElevation(ele);

    app.refresh();
}

