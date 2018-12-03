var Bgplane = function(params) {
	PP.Object3D.call( this, params );
	this.alias = 'bg-plane';

	// build 
	var pos_0 = new Pos( -this.width/2,  this.height/2, -100, this.colors[0][0], this.colors[0][1], this.colors[0][2], this.colors[0][3] );
	var pos_1 = new Pos(  this.width/2,  this.height/2, -100, this.colors[1][0], this.colors[1][1], this.colors[1][2], this.colors[1][3] );
	var pos_2 = new Pos(  this.width/2, -this.height/2, -100, this.colors[2][0], this.colors[2][1], this.colors[2][2], this.colors[2][3] );
	var pos_3 = new Pos( -this.width/2, -this.height/2, -100, this.colors[3][0], this.colors[3][1], this.colors[3][2], this.colors[3][3] );

	this.postrack.push(pos_0);
	this.postrack.push(pos_1);
	this.postrack.push(pos_2);
	this.postrack.push(pos_3);

	for( var i=0; i<4; ++i ) {
		this.vertices.push( this.postrack[i].x );
		this.vertices.push( this.postrack[i].y );
		this.vertices.push( this.postrack[i].z );

		this.scalars.push( this.postrack[i].r );
		this.scalars.push( this.postrack[i].g );
		this.scalars.push( this.postrack[i].b );
		this.scalars.push( this.postrack[i].a );

	}

	this.indices.push(0);
	this.indices.push(1);
	this.indices.push(2);
	this.indices.push(0);
	this.indices.push(2);
	this.indices.push(3);
}

// Bgplane.prototype = new PP.Object3D();
Bgplane.prototype.constructor = Bgplane;