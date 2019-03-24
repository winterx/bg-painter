function CurveInfluence ( geometry ) {

	this.pointsnum = 120;

	this.origincurve = null;
	this.targetcurve = null;

	this.originpoints = [];
	this.targetpoints = [];

	this.map = new Map();
	this.arr = [];
	this.geometry = geometry;

	this.surround = function () {
		// Mode 1 : CatmullRom 
		// ---------------------------------------------------------
		// data
		CatmullRomData = {

		}
		// origin 
		// var p00 = new THREE.Vector3( -900, 0, 0 );
		// var p01 = new THREE.Vector3( -300, 200, 0 );
		// var p02 = new THREE.Vector3( 300, -200, 0 );
		// var p03 = new THREE.Vector3( 900, 0, 0 );
		// this.origincurve = new THREE.CatmullRomCurve3( [ p00, p01, p02, p03 ] );

		// // target
		// var t00 = new THREE.Vector3( -900, 0, 0 );
		// var t01 = new THREE.Vector3( -300, 240, 160 );
		// var t02 = new THREE.Vector3( 300, -240, -160 );
		// var t03 = new THREE.Vector3( 900, 0, 0 );
		// this.targetcurve = new THREE.CatmullRomCurve3( [ t00, t01, t02, t03 ] );




		// Mode 2 : CatmullRom 
		// ---------------------------------------------------------
		// origin 
		var CMR_data = {
			p00 : new THREE.Vector3( -800, 300, 0 ),
			p01	: new THREE.Vector3( -400, -200, 0 ),
			p02 : new THREE.Vector3( 0, 200, 0 ),
			p03 : new THREE.Vector3( 400, -200, 0 ),
			p04 : new THREE.Vector3( 800, 000, 0 ),

			offsetX : 30,
			offsetY : 20,
			offsetZ : 80
		}

		var o00 = new THREE.Vector3().copy( CMR_data.p00 );
		var o01 = new THREE.Vector3().copy( CMR_data.p01 );
		var o02 = new THREE.Vector3().copy( CMR_data.p02 );
		var o03 = new THREE.Vector3().copy( CMR_data.p03 );
		var o04 = new THREE.Vector3().copy( CMR_data.p04 );
		this.origincurve = new THREE.CatmullRomCurve3( [ o00, o01, o02, o03, o04 ] );

		// target
		var t00 = new THREE.Vector3().copy( CMR_data.p00 ).add( new THREE.Vector3( CMR_data.offsetX, CMR_data.offsetY, CMR_data.offsetZ ) );
		var t01 = new THREE.Vector3().copy( CMR_data.p01 ).add( new THREE.Vector3( CMR_data.offsetX, CMR_data.offsetY, CMR_data.offsetZ+100 ) );
		var t02 = new THREE.Vector3().copy( CMR_data.p02 ).add( new THREE.Vector3( CMR_data.offsetX, CMR_data.offsetY, CMR_data.offsetZ ) );
		var t03 = new THREE.Vector3().copy( CMR_data.p03 ).add( new THREE.Vector3( CMR_data.offsetX, CMR_data.offsetY, CMR_data.offsetZ ) );
		var t04 = new THREE.Vector3().copy( CMR_data.p04 ).add( new THREE.Vector3( CMR_data.offsetX, CMR_data.offsetY, CMR_data.offsetZ ) );
		this.targetcurve = new THREE.CatmullRomCurve3( [ t00, t01, t02, t03, t04 ] );

		this.originpoints = this.origincurve.getPoints(this.pointsnum);
		this.targetpoints = this.targetcurve.getPoints(this.pointsnum);




		// Mode 2 : Circle
		// ---------------------------------------------------------
		this.curve_circle_outer = new THREE.EllipseCurve(
			0,  0,            // ax, aY
			220, 220,           // xRadius, yRadius
			0,  2 * Math.PI,  // aStartAngle, aEndAngle
			false,            // aClockwise
			0                 // aRotation
		);
		this.curve_circle_inner = new THREE.EllipseCurve(
			0,  0,            // ax, aY
			200, 200,           // xRadius, yRadius
			0,  2 * Math.PI,  // aStartAngle, aEndAngle
			false,            // aClockwise
			0                 // aRotation
		);

		var points2d_outer = this.curve_circle_outer.getPoints( this.pointsnum );
		var points2d_inner = this.curve_circle_inner.getPoints( this.pointsnum );

		for( var i=0; i<this.pointsnum; i++ ) {
			var point2_outer = points2d_outer[i];
			var point2_inner = points2d_inner[i];

			var point3_outer = new THREE.Vector3( point2_outer.x+10, point2_outer.y+10, 20 );


			var point3_inner = new THREE.Vector3( point2_inner.x, point2_inner.y, 0 );

			// this.originpoints.push( point3_inner );
			// this.targetpoints.push( point3_outer );
		}


		// visualize
		var line_geo = new THREE.BufferGeometry().setFromPoints( this.targetpoints );
		var line = new THREE.Line( line_geo, new THREE.LineBasicMaterial( { color: 0xffffff } ) );

		// scene.add(line);


		// surround
		var distance;

		for( var i=0, length=geometry.vertices.length; i<length ; i++ ) {

			for( var p=0, pointsnum=this.pointsnum; p<pointsnum; p++ ) {

				distance = geometry.vertices[i].distanceTo( this.originpoints[p] );

				if( distance < 90 ) {

					if( !this.map.has(i) ) {

						this.map.set( i, [] );

					}

					var factor = distance / 90;
					// var weight = 1- factor * factor * ( 3 - 2*factor );
					var weight = (( 1 / ( Math.sqrt( 2 * 3.14 ) * 0.25 ) ) *Math.exp ( - (factor) * (factor) / (2* 0.25 * 0.25 ) )) / 1.6;

					var m = this.map.get(i);
					m.push( [ p, weight/2 ] );
				}
			}
		}
	}

	this.transform = function () {
		
		var geometry = this.geometry;

		var targetpoints = this.targetpoints;
		var originpoints = this.originpoints;

		this.map.forEach( function( valueArray, index, mapObj ) {

			var vertice = geometry.vertices[ index ];

			for( var i=0, il=valueArray.length; i<il; i++ ) {

				var pointindex = valueArray[i][0]; // 0: point index | 1: point weight
				var pointweight = valueArray[i][1];

				var targetPosition = targetpoints[ pointindex ];
				var originPosition = originpoints[ pointindex ];

				var deltaX = targetPosition.x - originPosition.x;
				var deltaY = targetPosition.y - originPosition.y;
				var deltaZ = targetPosition.z - originPosition.z;

				vertice.x += deltaX * pointweight;
				vertice.y += deltaY * pointweight;
				vertice.z += deltaZ * pointweight;

			}
		});
	}
}


function Influence ( x, y, z, radius ) {

	this.anchor = new THREE.Vector3( x, y, z );
	this.effectradius = radius;
	this.map = new Map();
	this.geometry = null;

	this.surround = function ( geometry ) {

		this.geometry = geometry;

		var distance;

		for( var i=0, length=geometry.vertices.length; i<length ; i++ ) {

			if( i%200==0 || i%200==199 || i<200 || ( i>23800 && i<24000 ) ) {
				continue;
			}

			distance = geometry.vertices[i].distanceTo( this.anchor );

			if( distance < this.effectradius ) {

				var factor = distance/this.effectradius;

				// var weight = 1 - factor * factor * ( 3 - 2*factor );
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





















