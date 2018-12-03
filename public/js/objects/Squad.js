var Squad = function (params) {
	PP.Object3D.call( this, params );
	var self = this;
	this.alias = 'squad';
	this.drawType = 'TRIANGLES';
	this.colorVertexWeight = 1.0;

	// 形状选择

	this.shapeType = [ 'triangle','rectangle' ];

	var shape = new Triangle({
        width : 100,
        height : 100,
        depth : 100,
	});

	// 设定网格点选择

	this.grid = params.grid;
	this.placement = [];
	this.setPlacement();

	for( var p=0; p<this.placement.length; ++p ) {
		shape.push_vertices.call(this, 6, 6, 10, this.placement[p].x, this.placement[p].y, 0 );
		shape.push_indices.call(this, p*3 ); // triangle:3, rectangle: 4
		shape.push_scalars.call(this, this.colors );
	}

}

// Squad.prototype = new PP.Object3D();
Squad.prototype.constructor = Squad;

Squad.prototype.setPlacement = function() {	
    var _h = randompick( 0, this.grid.xnum/2 );
    var _v = randompick( 0, this.grid.ynum/2 );

    var _hnum = randompick( 0, this.grid.xnum - _h );
    var _vnum = randompick( 0, this.grid.ynum - _v );

    for( var i=0; i<_vnum; ++i ) {
        for( var j=0; j<_hnum; ++j ) {
            this.placement.push( new Pos( (j+_h)*this.grid.xunit - this.grid.width/2, (i+_v)*this.grid.yunit - this.grid.height/2 ) );
        }
    }
}