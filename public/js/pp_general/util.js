// 生成第二层背景：复杂网格体
// 参数函数
function shapeRefact( factor, scale, func ) {
	var value = null;
	switch(func) {
		case 'MATH_SIN' :
			value = Math.sin(factor*Math.PI*2)*scale*0.4;
			break;
		case 'MATH_COS' :
			break;
	}
	return value;
}
function random(min,max) { 
	var diff = max-min;
	return Math.random()*diff + min;
}
function randompick(start,end) {
    // [ start , end )
	return Math.floor( Math.random()*(end-start) + start );
}
function hexToDeci(hex) {
	var deci_1 = Math.round( 100 * parseInt( hex.slice(0*2,(0+1)*2), 16 )/255 )/100;
	var deci_2 = Math.round( 100 * parseInt( hex.slice(1*2,(1+1)*2), 16 )/255 )/100;
	var deci_3 = Math.round( 100 * parseInt( hex.slice(2*2,(2+1)*2), 16 )/255 )/100;
	var deci = [ deci_1, deci_2, deci_3, 1.0 ];
	return deci;
}
function deciToHex(deciArr) {
	var result = '';
	for( var i=0; i<3; ++i ) {
		var d = Math.floor( deciArr[i]*255 );
		var hex = d.toString(16).length>1 ? d.toString(16) : '0'+d.toString(16);
		result += hex;
	}
	return result;
}

var Pos = function(x,y,z,r,g,b,a) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}



// PICKING FUNCTIONS
function hitProperty(ob) { 
    return ob.diffuse;
}
function addHit(ob) { 
    ob.previous = ob.diffuse.slice(0);
    ob.diffuse[3] = 0.5;
    render();
}
function removeHit(ob) {
    ob.diffuse = ob.previous.slice(0);
    render();
}
function processHits(hits) {
    var names = '',
        ob;
    for (var i = 0; i < hits.length; ++i) {
        ob = hits[i];
        ob.diffuse = ob.previous;
        names += ob.alias + '';
    }
    render();
}
function movePickedObjects(hits, interactor, dx, dy) {
    if (hits == 0)
        return;

    var camera = interactor.camera;
    var depth = interactor.alt;
    var factor = Math.max(Math.max(camera.position[0], camera.position[1]), camera.position[2]) / 1000;
    var scaleX, scaleY;
    for (var i = 0; i < hits.length; ++i) {
        scaleX = vec3.create();
        scaleY = vec3.create();
        if (depth) {
            vec3.scale(camera.normal, dy * factor, scaleY);
        } else {
            vec3.scale(camera.up, -dy * factor, scaleY);
            vec3.scale(camera.right, dx * factor, scaleX);
        }

        vec3.add(hits[i].position, scaleY);
        vec3.add(hits[i].position, scaleX);
    }
    render();
}

