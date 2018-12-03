function Grid( xnum, ynum, znum, unitsize_width, unitsize_height, unitsize_depth ) {
	this.xnum = xnum;
	this.ynum = ynum;
	this.znum = znum;

	this.unitsize_width = unitsize_width;
	this.unitsize_height = unitsize_height;
	this.unitsize_depth = unitsize_depth;

	this.totalNum = this.xnum * this.ynum * this.znum;

	this.totalWidth = (this.xnum-1)*unitsize_width;
	this.totalHeight = (this.ynum-1)*unitsize_height;
	this.totalDepth = (this.znum-1)*unitsize_depth;

	this.matrix = [];

	this.make();
}

Grid.prototype.make = function() {
	for( var d=0; d<this.znum; ++d ) {
		for( var v=0; v<this.ynum; ++v ) {
			for( var h=0; h<this.xnum; ++h ) {

				var xnum = h * this.unitsize_width - this.totalWidth/2 ;
				var ynum = v * this.unitsize_height - this.totalHeight/2;
				var znum = d * this.unitsize_depth - this.totalDepth/2;

				var pos = new THREE.Vector3( xnum, ynum, znum );

				this.matrix.push(pos);
			}
		}
	}
};