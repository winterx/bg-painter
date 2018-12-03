// drawing canvas 是用来在gradient color中绘制初始的二维图像用的js文件


// 获取一个canvas的 drawing context
var drawingCanvas = document.getElementById( 'drawingcanvas' );
var ctx = drawingCanvas.getContext( '2d' );

// 
// var colors_fantasy = Color_fantasy[ Math.floor( Math.random() * Color_fantasy.length ) ];
var colors_fantasy_0 = Color_fantasy[ 0 ];
var colors_fantasy_1 = Color_fantasy[ 1 ];

var grd = ctx.createLinearGradient( 0, 0, 0, 512 );
grd.addColorStop( 0.0, '#' + colors_fantasy_0[0] + 'ff' );
grd.addColorStop( 0.3, '#' + colors_fantasy_0[1] + 'ff' );
grd.addColorStop( 0.7, '#' + colors_fantasy_0[2] + 'ff' );
grd.addColorStop( 1.0, '#' + colors_fantasy_0[3] + 'ff' );
ctx.fillStyle = grd;
ctx.fillRect( 0, 0, 1024, 512 );

// ctx.fillStyle = '#' + colors[ Math.floor( Math.random()*6 ) ];
// ctx.fillRect( 0, 0, 1024, 512 );

var paintpoints = [];

for( var i=0; i<2; ++i ) {

	for( var j=0; j<2; ++j ) {

		var px = Math.random()*0.5 + 0.5*i;
		var py = Math.random()*0.5 + 0.5*j;
		var x = px*1024;
		var y = py*512;
		var radius_inner = Math.random() * 50 + 50;
		var radius_outer = Math.random() * 300 + 200;

		var grd = ctx.createRadialGradient( x, y, radius_inner, x, y, radius_outer);

		var tempColors = colors_fantasy_1.slice(0);

		var c1 = pick(tempColors);
		var c2 = pick(tempColors);
		var c3 = pick(tempColors);

		grd.addColorStop( 0.0, '#' + c1 );
		grd.addColorStop( 0.2, '#' + c2 );
		grd.addColorStop( 1.0, '#' + c3 + '00' );

		ctx.fillStyle = grd;
		ctx.fillRect( 0, 0, 1024, 512 );

		paintpoints.push({
			px : px,
			py : py
		})

	}

}


function pick( array ) {

	var rand = Math.floor( Math.random()*array.length );

	var result = array[rand];

	array.splice( rand, 1 );

	return result;

}

function addCanvasDraw() {

	var x = Math.random() * 1024;
	var y = Math.random() * 512;
	var radius_inner = Math.random() * 50 + 50;
	var radius_outer = Math.random() * 100 + 400;

	var grd = ctx.createRadialGradient( x, y, radius_inner, x, y, radius_outer);

	var r1 = Math.floor( Math.random()*4 );
	var r2 = Math.floor( Math.random()*4 );
	var r3 = Math.floor( Math.random()*4 );

	grd.addColorStop( 0.0, '#' + colors[r1] );
	// grd.addColorStop( 0.3, '#' + colors[r2] );
	// grd.addColorStop( 0.6, '#' + colors[r3] );
	grd.addColorStop( 1.0, '#' + colors[r3] + '00' );

	ctx.fillStyle = grd;
	ctx.fillRect( 0, 0, 1024, 512 );

}
