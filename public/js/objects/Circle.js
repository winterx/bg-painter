var Circle = function (params) {
	PP.Object3D.call( this, params );
	this.alias = 'circle';
	this.VertexColorWeight = 0.5;
	this.drawType = 'TRIANGLES_FAN';

	var radius = params.width/2;

	// vertex 0 
	this.vertices.push(0.0);
	this.vertices.push(0.0);
	this.vertices.push(0.0);
	this.scalars.push(this.colors[0][0]);
	this.scalars.push(this.colors[0][1]);
	this.scalars.push(this.colors[0][2]);
	this.scalars.push(this.colors[0][3]);
	this.indices.push(0);

	this.segments = 36;

	for( var i=0; i<=this.segments; ++i ) {
		var angle = Math.PI*2*(i/this.segments);
		var x = radius*Math.cos(angle);
		var y = radius*Math.sin(angle);
		this.vertices.push(x);
		this.vertices.push(y);
		this.vertices.push(0);
		this.scalars.push(this.colors[1][0]);
		this.scalars.push(this.colors[1][1]);
		this.scalars.push(this.colors[1][2]);
		this.scalars.push(this.colors[1][3]);
		this.indices.push(i+1);
	}

}

Circle.prototype.constructor = Circle;