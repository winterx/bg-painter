var CubeStroke = function (params) {
	PP.Object3D.call( this, params );
	this.alias = 'cube-stroke';
	this.drawType = 'LINES';
	
	var self = this;

	// CubeStroke build
	var width_half 	= params.width/2;
	var height_half = params.width/2;
	var depth_half 	= params.width/2;

	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(depth_half);

	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);

	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);

	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);

	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);

	// // // 
	var width_half 	= (params.width+1)/2;
	var height_half = (params.width+1)/2;
	var depth_half 	= (params.width+1)/2;
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(depth_half);

	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);

	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);

	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);
	this.vertices.push(-width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(depth_half);
	this.vertices.push(width_half); this.vertices.push(height_half); this.vertices.push(-depth_half);

	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);
	this.vertices.push(-width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(-depth_half);
	this.vertices.push(width_half); this.vertices.push(-height_half); this.vertices.push(depth_half);


	indicesPush(0);
	indicesPush(4);
	indicesPush(8);
	indicesPush(12);
	indicesPush(16);
	indicesPush(20);

	indicesPush(24);
	indicesPush(28);
	indicesPush(32);
	indicesPush(36);
	indicesPush(40);
	indicesPush(44);
	// indicesPush( 0,1, 	1,2, 	2,3, 	3,0 );
	// indicesPush( 4,5, 	5,6, 	6,7, 	7,4 );
	// indicesPush( 8,9, 	9,10, 	10,11, 	11,8 );
	// indicesPush( 12,13, 13,14, 	14,15, 	15,12 );
	// indicesPush( 16,17, 17,18, 	18,19, 	19,16 );
	// indicesPush( 20,21, 21,22, 	22,23, 	23,20 );

	scalarsPush();

	function indicesPush( index ) {
		self.indices.push(index);
		self.indices.push(index+1);

		self.indices.push(index+1);
		self.indices.push(index+2);

		self.indices.push(index+2);
		self.indices.push(index+3);

		self.indices.push(index+3);
		self.indices.push(index);
	}

	function scalarsPush() {
		for( var i=0; i<48; ++i ) {
			self.scalars.push(self.colors[i%4][0]);
			self.scalars.push(self.colors[i%4][1]);
			self.scalars.push(self.colors[i%4][2]);
			self.scalars.push(self.colors[i%4][3]);
		}
	}
}

// CubeStroke.prototype = new PP.Object3D();
CubeStroke.prototype.constructor = CubeStroke;
