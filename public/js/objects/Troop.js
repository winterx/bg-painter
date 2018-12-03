var Troop = function (params) {
	PP.Object3D.call( this, params );
	var self = this;
	this.alias = 'troop';
	// this.drawType = 'TRIANGLES';
	this.colorVertexWeight = 0.0;

	this.shapeType = [ 'cube' ];

	var shape = new Cube({
        width : 100,
        height : 100,
        depth : 100,
	});

	shape.push_vertices.call(this, 100, 100, 100, 0, 0, 0 );
	shape.push_indices.call(this, p*3 ); // triangle:3, rectangle: 4
	shape.push_scalars.call(this, this.colors );

}

// Troop.prototype = new PP.Object3D();
Troop.prototype.constructor = Troop;
