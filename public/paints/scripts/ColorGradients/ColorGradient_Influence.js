
function Influence ( x, y, z, radius ) {

	this.anchor = new THREE.Vector3( x, y, z );
	this.effectradius = radius;
	this.map = new Map();
	this.geometry = null;

	this.surround = function ( geometry ) {

		this.geometry = geometry;

		var distance;

		for( var i=0; i<geometry.vertices.length ; i++ ) {

			if( i%100==0 || i%100==99 || i<100 || ( i>5900 && i<6000 ) ) {
				continue;
			}

			distance = geometry.vertices[i].distanceTo( this.anchor );

			if( distance < this.effectradius ) {

				var factor = distance/this.effectradius;

				var weight = (( 1 / ( Math.sqrt( 2 * 3.14 ) * 0.25 ) ) *Math.exp ( - (factor) * (factor) / (2* 0.25 * 0.25 ) )) / 1.6;

				this.map.set( i, weight );

			}
		}
	}

	this.moveTo = function ( target_x, target_y, target_z ) {

		var geometry = this.geometry;

		if( this.anchor.x === target_x && this.anchor.y === target_y && this.anchor.z === target_z ) {
			return;
		}

		var dx = target_x - this.anchor.x;
		var dy = target_y - this.anchor.y;
		var dz = target_z - this.anchor.z;

		this.map.forEach( function( value, index, mapObj ) {

			geometry.vertices[index].x += dx*value;
			geometry.vertices[index].y += dy*value;
			geometry.vertices[index].z += dz*value;


			// console.log( index, value );

		});

		// geometry.computeVertexNormals();

		this.anchor.set( target_x, target_y, target_z );

	}
}