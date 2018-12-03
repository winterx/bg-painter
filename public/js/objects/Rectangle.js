var Rectangle = function (params) {
	PP.Object3D.call( this, params );
	this.alias = 'rectangle';

	this.build( params.width/2, params.height/2, params.depth/2, 0, 0, 0 );
}

// Rectangle.prototype = new PP.Object3D();
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.build = function( width, height, depth, offsetx, offsety, offsetz ) {

	this.push_vertices( width, height, depth, offsetx, offsety, offsetz );
	this.push_indices(0);
	this.push_scalars( this.colors );
}

Rectangle.prototype.push_vertices = function( w, h, d, x, y, z ) {
	// 0
	this.vertices.push(0+x);
	this.vertices.push(0+y);
	this.vertices.push(0+z);

	// 1
	this.vertices.push(w+x);
	this.vertices.push(0+y);
	this.vertices.push(0+z);	

	// 2
	this.vertices.push(w+x);
	this.vertices.push(h+y);
	this.vertices.push(0+z);

	// 3
	this.vertices.push(0+x);
	this.vertices.push(h+y);
	this.vertices.push(0+z);	
}

Rectangle.prototype.push_indices = function ( start ) {
	this.indices.push( start + 0 );
	this.indices.push( start + 1 );
	this.indices.push( start + 2 );

	this.indices.push( start + 0 );
	this.indices.push( start + 2 );
	this.indices.push( start + 3 );
}

Rectangle.prototype.push_scalars = function ( colors ) {
	var l = colors.length;
	for( var i=0; i<4; ++i ) {
		this.scalars.push( colors[i%l][0] );
		this.scalars.push( colors[i%l][1] );
		this.scalars.push( colors[i%l][2] );
		this.scalars.push( colors[i%l][3] );
	}
}