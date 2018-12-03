var Grid = function ( width, height, depth, xunit, yunit, zunit ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.xunit = xunit || 20;
    this.yunit = yunit || 20;
    this.zunit = zunit || 20;
    this.xnum;
    this.ynum;
    this.znum;
    this.matrix = [];
    this.placement = [];

    this.init();
}

Grid.prototype.init = function() {
    this.xnum = Math.round(this.width/this.xunit);
    this.ynum = Math.round(this.height/this.yunit);
    this.znum = Math.round(this.depth/this.zunit);

    for( var k=0; k<this.znum; ++k ) {
        for( var i=0; i<this.ynum; ++i ) {
            for( var j=0; j<this.xnum; ++j ) {
                this.matrix.push( new Pos( j*this.xunit-this.width/2, i*this.yunit-this.height/2, k*this.zunit ) );
            }
        }
    }
};

Grid.prototype.select = function() {   
    var _h = randompick( 0, this.xnum/2 );
    var _v = randompick( 0, this.ynum/2 );

    var _hnum = randompick( 0, this.xnum - _h );
    var _vnum = randompick( 0, this.ynum - _v );

    for( var i=0; i<_vnum; ++i ) {
        for( var j=0; j<_hnum; ++j ) {
            console.log('s')
            this.placement.push( new Pos( (j+_h)*this.xunit - this.width/2, (i+_v)*this.yunit - this.height/2 ) );
        }
    }
}