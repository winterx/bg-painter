var Cube = function (params) {
	PP.Object3D.call( this, params );
	this.alias = 'cube';

	this.build( params.width/2, params.height/2, params.depth/2, 0, 0, 0 );
}

// Cube.prototype = new PP.Object3D();
Cube.prototype.constructor = Cube;

Cube.prototype.build = function( width, height, depth, offsetx, offsety, offsetz ) {

	this.push_vertices( width, height, depth, offsetx, offsety, offsetz );
	this.push_indices(0);
	this.push_scalars();
}

Cube.prototype.push_vertices = function( w, h, d, x, y, z ) {

	this.vertices.push(-w+x); this.vertices.push(h+y); this.vertices.push(-d+z);
	this.vertices.push(-w+x); this.vertices.push(-h+y); this.vertices.push(-d+z);
	this.vertices.push(-w+x); this.vertices.push(-h+y); this.vertices.push(d+z);
	this.vertices.push(-w+x); this.vertices.push(h+y); this.vertices.push(d+z);
	
	this.vertices.push(-w+x); this.vertices.push(h+y); this.vertices.push(d+z);
	this.vertices.push(-w+x); this.vertices.push(-h+y); this.vertices.push(d+z);
	this.vertices.push(w+x); this.vertices.push(-h+y); this.vertices.push(d+z);
	this.vertices.push(w+x); this.vertices.push(h+y); this.vertices.push(d+z);

	this.vertices.push(w+x); this.vertices.push(h+y); this.vertices.push(d+z);
	this.vertices.push(w+x); this.vertices.push(-h+y); this.vertices.push(d+z);
	this.vertices.push(w+x); this.vertices.push(-h+y); this.vertices.push(-d+z);
	this.vertices.push(w+x); this.vertices.push(h+y); this.vertices.push(-d+z);

	this.vertices.push(w+x); this.vertices.push(h+y); this.vertices.push(-d+z);
	this.vertices.push(w+x); this.vertices.push(-h+y); this.vertices.push(-d+z);
	this.vertices.push(-w+x); this.vertices.push(-h+y); this.vertices.push(-d+z);
	this.vertices.push(-w+x); this.vertices.push(h+y); this.vertices.push(-d+z);

	this.vertices.push(-w+x); this.vertices.push(h+y); this.vertices.push(-d+z);
	this.vertices.push(-w+x); this.vertices.push(h+y); this.vertices.push(d+z);
	this.vertices.push(w+x); this.vertices.push(h+y); this.vertices.push(d+z);
	this.vertices.push(w+x); this.vertices.push(h+y); this.vertices.push(-d+z);

	this.vertices.push(-w+x); this.vertices.push(-h+y); this.vertices.push(d+z);
	this.vertices.push(-w+x); this.vertices.push(-h+y); this.vertices.push(-d+z);
	this.vertices.push(w+x); this.vertices.push(-h+y); this.vertices.push(-d+z);
	this.vertices.push(w+x); this.vertices.push(-h+y); this.vertices.push(d+z);


}

Cube.prototype.push_indices = function ( start ) {

	for( var i=start; i<24; i+=4 ) {
		this.indices.push(i);
		this.indices.push(i+1);
		this.indices.push(i+2);

		this.indices.push(i);
		this.indices.push(i+2);
		this.indices.push(i+3);
	}
}

Cube.prototype.push_scalars = function () {
	for( var i=0; i<24; ++i ) {
		this.scalars.push(this.colors[i%4][0]);
		this.scalars.push(this.colors[i%4][1]);
		this.scalars.push(this.colors[i%4][2]);
		this.scalars.push(this.colors[i%4][3]);
	}
}

Cube.prototype.sayName = function(name,country) {

}
