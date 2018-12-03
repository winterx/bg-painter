var PP = PP || {};

PP.Object3D = function (params) {
	// alias
	this.alias 		= null;

	// Basic Size
	this.width 		= 12;
	this.height 	= 12;
	this.depth 		= 12;
	// Basic Transform
	this.position 	= [0,0,0];
	this.rotation 	= [0,0,0];
	this.scale 		= [1,1,1]; 
	// Colors
	this.alpha 		= 1.0;
	this.colorVertexWeight = 1.0; 		// [default 1:use vertex color] [0:use diffuse color] 
	this.colors 	=[[1.0,0.0,0.0,1.0],
					  [1.0,0.0,0.0,1.0],
					  [1.0,0.0,0.0,1.0],
					  [1.0,0.0,0.0,1.0]],
	this.diffuse 	= [1.0,0.0,0.0,1.0]; 	// default : totally black
	// postrack
	this.postrack 	= [];
	// Buffers for webgl rendering 
	this.vertices 	= [];
	this.indices 	= [];
	this.scalars 	= [];

	this.wireframe 	= false;


	if(params.width) {
		this.width = params.width;
	}
	if(params.height) {
		this.height = params.height;
	}
	if(params.depth) {
		this.depth = params.depth;
	}
	if(params.position) {
		this.position = params.position;
	}
	if(params.rotation) {
		this.rotation = params.rotation;
	}
	if( params.scale ) {
		this.scale = params.scale;
	}
	if( params.colorVertexWeight !== undefined ) { 
		this.colorVertexWeight = params.colorVertexWeight;
	}
	if( params.colors ) {
		this.colors = params.colors;
	}
	if( params.diffuse ) {
		this.diffuse = params.diffuse;
	}
	if( params.alpha !== undefined ) {
		this.alpha = params.alpha;
	}
	if( params.drawType ) {
		this.drawType = params.drawType;
	}
	if( params.wireframe ) {
		this.wireframe = true;
	}
}
