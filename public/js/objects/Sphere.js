var Sphere = function(params) {
	PP.Object3D.call( this, params );
	this.alias = 'sphere';

	var scope = this;

	// Sphere build
	var eleNum = 80;
	var aziNum = 80; 
	var SphereRadius = params.width/2;

	// postrack
	for( var ele = 0; ele<eleNum; ++ele ) {

		var _angle = Math.PI*(ele/eleNum);
		var _radius = SphereRadius*Math.sin(_angle);

		for( var azi = 0; azi<aziNum; ++azi ) {
			// 每个顶点的索引
			var index = azi + ele*aziNum;

			var progress = azi/aziNum;
			var aziAngle = (2*Math.PI)*progress;
			var x = Math.cos(aziAngle)*_radius;
			var z = Math.sin(aziAngle)*_radius;
			var y = SphereRadius*Math.cos(_angle);

			// vertices
			this.vertices.push(x);
			this.vertices.push(y);
			this.vertices.push(z);
			// scalars
			this.scalars.push(this.colors[0][0]);
			this.scalars.push(this.colors[0][1]);
			this.scalars.push(this.colors[0][2]);
			this.scalars.push(this.colors[0][3]);

			// 最后一个点需要加上
			if( index == eleNum*aziNum - 1 ) {
				x = 0;
				z = 0;
				y = -SphereRadius;
				this.vertices.push(x);
				this.vertices.push(y);
				this.vertices.push(z);
				this.scalars.push(this.colors[0][0]);
				this.scalars.push(this.colors[0][1]);
				this.scalars.push(this.colors[0][2]);
				this.scalars.push(this.colors[0][3]);
			} 

			// indices
			if( ele < eleNum-1 ) {
				if( azi == aziNum-1 ) {
					this.indices.push(index);
					this.indices.push(index + aziNum);
					this.indices.push(index + 1);

					this.indices.push(index);
					this.indices.push(index + 1);
					this.indices.push(index + 1 - aziNum);
				}else{
					this.indices.push(index);
					this.indices.push(index + aziNum);
					this.indices.push(index + aziNum + 1);

					this.indices.push(index);
					this.indices.push(index + aziNum + 1);
					this.indices.push(index + 1);					
				}
			}else if( ele == eleNum-1 ) {
				var last = eleNum*aziNum;
				if( azi == aziNum-1 ) {
					this.indices.push(index);
					this.indices.push(last);
					this.indices.push(index + 1 - aziNum);
				}else{
					this.indices.push(index);
					this.indices.push(last);
					this.indices.push(index+1);
				}
			}
		}
	}


}

// Sphere.prototype = new PP.Object3D();
Sphere.prototype.constructor = Sphere;