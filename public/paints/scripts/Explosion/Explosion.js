var Explosion = function( size, instances, bounding, globalColors ) {
	this.instances = instances;
	this.size = size;
	this.bounding = bounding;
	this.globalColors = globalColors;
};

Explosion.prototype.make = function() {
	// base positions
	var positions = [];
	positions.push( this.size, -this.size, 0 );
	positions.push( -this.size, this.size, 0 );
	positions.push( 0, 0, this.size );

	var offsets = [];
	var colors = [];
	var orientationsStart = [];
	var orientationsEnd = [];

	var vector = new THREE.Vector4();

	for( var i =0; i<this.instances; i++ ) {

		// offsets

		offsets.push( (Math.random() - 0.5)*this.bounding, (Math.random() - 0.5)*this.bounding, (Math.random() - 0.5)*this.bounding );

		// colors

		// colors.push( Math.random(), Math.random(), Math.random(), Math.random() );
		var index = i%6;
		colors.push( this.globalColors[index].r, this.globalColors[index].g, this.globalColors[index].b, 1.0 );

		// orientation start

		vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
		vector.normalize();

		orientationsStart.push( vector.x, vector.y, vector.z, vector.w );

		// orientation end

		vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
		vector.normalize();

		orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
	}

	var geometry = new THREE.InstancedBufferGeometry();
	geometry.maxInstancedCount = this.instances;

	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
	geometry.addAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
	geometry.addAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );
	geometry.addAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );

	var material = new THREE.RawShaderMaterial({
		uniforms: {
			time: { value: 1.0 },
			sineTime: { value: 1.0 }
		},
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
		transparent: true,
		side: THREE.DoubleSide
	});

	return new THREE.Mesh( geometry, material );
};