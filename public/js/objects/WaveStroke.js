var WaveStroke = function(params) {
	PP.Object3D.call( this, params );
	this.alias = 'wave-stroke';
	this.drawType = 'LINE_STRIP';

	var self = this;
	var num = 100;

	for( var i=0; i<num; ++i ) {
		var x = i * 4;
		var y = 0;
		var z = 0;
		this.vertices.push(x);
		this.vertices.push( Math.cos(Math.PI*(i/num))*40 + Math.sin(Math.PI*(i/num)*4)*40 );
		this.vertices.push(z);
		this.scalars.push(this.colors[0][0]);
		this.scalars.push(this.colors[0][1]);
		this.scalars.push(this.colors[0][2]);
		this.scalars.push(this.colors[0][3]);
		this.indices.push(i);
	}

}

// WaveStroke.prototype = new PP.Object3D();
WaveStroke.prototype.constructor = WaveStroke;