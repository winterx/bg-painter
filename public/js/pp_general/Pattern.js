var ORTHO = 1;
var PERSPECTIVE = 2;

var BasicModels = [
	'Cube',
	'Sphere',
	'Cone'
];

var PatternStyles = [

	{ // sci-fi style
		stylename : 'scifi',
		grid: {
			// width: 
		},
		objects : [
			{
				name: 'Bgplane',
				wireframe: true,
				drawType: 'LINES',
				size_method: 'by-screen',
				colorVertexWeight: 1.0,
	            alpha: 0.02,
	            wireframe: true,
	            num: 1,
			},
	        {
	            name: 'Squad',
				size_method: 'by-screen',
				position: { method: 'canvas-random' },
	            colorVertexWeight: 1.0,
	            alpha: 1.0,
	            num: 1,
	        },
	        {
	            name: 'CubeStroke',
	            drawType: 'LINES',
				size_method: 'by-pattern',
				position: { method: 'canvas-random', modify: [0,0,1000] },
	            rotate: { method: 'value', value: [ 0.4, 0.4, 0.4 ] },
	            scale: { random: 2 },
	            colorVertexWeight: 1.0,
	            alpha: 1.0,
	            num: 1,
	        },
	        {
	            name: 'Sphere',
	            drawType: 'POINTS',
				size_method: 'by-pattern',
				position: { method: 'canvas-random', modify: [0,0,800] },
	            rotate: { method: 'value', value: [ 1.3, 0.0, 1.0 ], random: 2 },
	            scale: { method: 'value', value: [4,4,4], random: 4 },
	            colorVertexWeight: 1.0,
	            alpha: 1.0,
	            num: 1,
	        }
	    ],
	    lights : []
	},

	{ // fantasy style
		stylename : 'fantasy',
		objects : [
			{
				name: 'Bgplane',
				size_method: 'by-screen',
				colorVertexWeight: 1.0,
	            alpha: 1.0,
	            num: 1,
			},
			{
				name: 'Cube',
				size_method: 'by-pattern',
	            position: { method: 'canvas-random' },
	            rotate: { method: 'value', value: [ 0.4, 0.4, 0.4 ] },
	            scale: { random: 3 },

				colorVertexWeight: 1.0,
	            alpha: 1.0,
				num: 2,
			},
			{
				name: 'Sphere',
				size_method: 'by-pattern',
	            position: { method: 'canvas-random' },
	            scale: { random: 3 },
				colorVertexWeight: 0.2,
	            alpha: 1.0,
				num: 2,			
			},
			{
				name: 'Cone',
				size_method: 'by-pattern',
	            position: { method: 'canvas-random' },
	            rotate: { method: 'value', value: [ 0.4, 0.4, 0.4 ] },
	            scale: { random: 3 },
				colorVertexWeight: 1.0,
	            alpha: 1.0,
				num: 2,			
			}
		],
		lights : [
			{
				position: [ 400, 100, 400 ],
				diffuseIndex: 0,
				direction: [ -400, 100, -100 ]
			},
			{
				position: [ -200, -100, 400 ],
				diffuseIndex: 1,
				direction: [ 400, -100, -100 ]
			}
		]
	},

	{ // landscape style
		stylename : 'landscape',
		objects : [
			{
				name: 'Bgplane',
				wireframe: true,
				drawType: 'LINES',
				size_method: 'by-screen',
				colorVertexWeight: 0.0,
	            alpha: 0.1,
	            num: 0,
			},
			{
				name: 'Cone',
				size_method: 'by-pattern',
	            position: { method: 'placement-order', modify: [ 0, 0, -1000 ] },
	            scale: { method: 'value', value: [ 0.4, 0.4, 0.4 ] },
				colorVertexWeight: 0.0,
	            alpha: 1.0,
				num: 100,
			},		
		],
		lights : [
			{
				position: [ -150, 950, -1000 ],
				diffuseIndex: 0,
				direction: [ -400, 100, -100 ]
			},
			{
				position: [ -1000, -100, -1000 ],
				diffuseIndex: 1,
				direction: [ 400, -100, -100 ]
			},
			{
				position: [ 1000, -300, -1000 ],
				diffuseIndex: 1,
				direction: [ 400, -100, -100 ]
			}
		]
	}
]

var Pattern = {
	_id 			: 0,
	style 			: 0,
	ProjectType		: ORTHO,
	// canvas dimension
	c_width 		: 0,
	c_height 		: 0,

	// origin input
	amount 			: 4,
	regular 		: 5,
	volume			: 40,

	// lights
	lights 			: [],

	// object stack
	primary_objects	: [],
	library_objects	: [],

	// transform
	sizeList 		: [],
	positionList 	: [],
	rotationList	: [],
	scaleList 		: [],
	// color
	colors 			: [],

	generateData: function( w, h, a, r, v ) {
		Pattern.c_width 	= w;
		Pattern.c_height 	= h;
		Pattern.amount 		= a;
		Pattern.regular 	= r;
		Pattern.volume 		= v;
		// 清空原有物体列表
		Pattern.primary_objects = [];
		Pattern.library_objects = [];

		// size
		var size;
		if( Pattern.c_width <= Pattern.c_height ) {
			size = Pattern.c_width * Pattern.volume / 100;
		}else{
			size = Pattern.c_height * Pattern.volume / 100;
		}

		Pattern.grid = new Grid( Pattern.c_width, Pattern.c_height, 40, 20, 40, 40 );

		// placement
		var placement = new Placement( 1200, 120, 1200, 120, 120, 120 );
        placement.init();
        Pattern.matrix = placement.matrix;

        var r;

		PatternStyles[Pattern.style].objects.forEach(function( Object, index, thisArr ){
			var selectNum = 0;

			// nun logic	
			if( typeof Object.num === 'number' ) {
				selectNum = Object.num;
			}else if( Object.num == 1 || Object.num == 2 ) {
				selectNum = Object.num;
			}
			else{
				selectNum = randompick( 0, Object.num );
			}

			for( var n=0; n<selectNum; ++n ) {
				var o = {};

				o.name 				= Object.name;
				o.drawType 			= Object.drawType;
				o.colorVertexWeight = Object.colorVertexWeight;
				o.alpha 			= Object.alpha;
				o.wireframe 		= Object.wireframe;
				o.position 			= [0,0,0];
				o.rotation 			= [0,0,0];
				o.scale 			= [1.0,1.0,1.0];

				// size 
				if( Object.size_method == 'by-pattern' ) {
					o.width = size;
					o.height = size;
					o.depth = size;
				}else if( Object.size_method == 'by-screen' ) {
					o.width = Pattern.c_width;
					o.height = Pattern.c_height;
				}

				// position
				if( Object.position ) {
					switch( Object.position.method ) {
						case 'canvas-random':
							o.position = [ random( -Pattern.c_width/2, Pattern.c_width/2 ), random( -Pattern.c_height/2, Pattern.c_height/2 ), 0 ];
							break;
						case 'placement-order':
							o.position = [ Pattern.matrix[n].x, Pattern.matrix[n].y, Pattern.matrix[n].z-640 ];
							break;
						default:
							o.position = [0,0,0];
							break;
					}
					if( Object.position.modify ) {
						o.position[0] += Object.position.modify[0];
						o.position[1] += Object.position.modify[1];
						o.position[2] += Object.position.modify[2];
					}

				}

				// rotation
				if( Object.rotate ) {
					switch( Object.rotate.method ) {
						case 'value':
							o.rotation = Object.rotate.value;
							break;
						default : 
							break;
					}
					if( Object.rotate.random ) {
						var randomfactor = Math.random() * Object.rotate.random;
						o.rotation[0] += randomfactor;
						o.rotation[1] += randomfactor;
						o.rotation[2] += randomfactor;
					}
				}

				// scale modify
				if( Object.scale ) {
					switch( Object.scale.method ) {
						case 'value':
							o.scale = Object.scale.value;
							break;
					}
					if( Object.scale.random ) {
						r = Math.random() * Object.scale.random;
						o.scale[0] += r;
						o.scale[1] += r;
						o.scale[2] += r;
					}
				}

				Pattern.primary_objects.push(o);
			}
		});


		PatternStyles[Pattern.style].lights.forEach(function( Light, index, thisArr){
			var l = {};
			l.position = Light.position;
			l.diffuseIndex = Light.diffuseIndex;
			l.direction = Light.direction;

			Pattern.lights.push(l);
		});


		// 选择基本形体
		// switch( Pattern.style ) {
		// 	case 'sci-fi':
		// 		for( var i=0; i<Style_scifi.objects.length; ++i ) {
		// 			var num = Style_scifi.objects[i].num;
		// 			for( var n=0; n<num; ++n ) {

		// 				var o = {};

		// 				o.width = size;
		// 				o.height = size;
		// 				o.depth = size;

		// 				o.position = [0,0,0];
		// 				o.rotation = [0,0,0];
		// 				o.scale = [1,1,1];

		// 				o.name = Style_scifi.objects[i].name;
		// 				o.drawType = Style_scifi.objects[i].drawType;
		// 				o.colorVertexWeight = Style_scifi.objects[i].colorVertexWeight;
						
		// 				// position
		// 				if( Style_scifi.objects[i].position_modify ) {
		// 					var x = random( -Pattern.c_width/2, Pattern.c_width/2 );
		// 					var y = random( -Pattern.c_height/2, Pattern.c_height/2 );
		// 					var z = i*10 + 100;
		// 					o.position = [x,y,z];
		// 				}
		// 				// rotation
		// 				if( Style_scifi.objects[i].rotate_modify ) {
		// 					var angle_x = Math.PI*random(-12,12)*Pattern.regular/100;
		// 					var angle_y = Math.PI*random(-12,12)*Pattern.regular/100;
		// 					var angle_z = Math.PI*random(-12,12)*Pattern.regular/100;
		// 					o.rotation = [angle_x,angle_y,angle_z];
		// 				}
		// 				// scale
		// 				if( Style_scifi.objects[i].scale_modify ) {
		// 					var scale_random = Math.random()*2+0.2;
		// 					o.scale = [ scale_random, scale_random, scale_random ];
		// 				}				

		// 				Pattern.primary_objects.push(o);
		// 			}
		// 		}
		// 		break;

		// 	case 'fantasy':
		// 		for( var i=0; i<Style_fantasy.objects.length; ++i ) {
		// 			var num = Style_fantasy.objects[i].num;
		// 			for( var n=0; n<num; ++n ) {

		// 				var o = {};

		// 				if( Style_fantasy.objects[i].size_method == 'by-pattern' ) {
		// 					o.width = size;
		// 					o.height = size;
		// 					o.depth = size;
		// 				}else if( Style_fantasy.objects[i].size_method == 'by-screen' ){
		// 					o.width = Pattern.c_width;
		// 					o.height = Pattern.c_height;
		// 				}

		// 				o.position = [0,0,0];
		// 				o.rotation = [0,0,0];
		// 				o.scale = [1,1,1];

		// 				o.name = Style_fantasy.objects[i].name;
		// 				o.drawType = Style_fantasy.objects[i].drawType;
		// 				o.colorVertexWeight = Style_fantasy.objects[i].colorVertexWeight;
		// 				o.alpha = Style_fantasy.objects[i].alpha;
						
		// 				// position
		// 				if( Style_fantasy.objects[i].position_modify ) {
		// 					var x = random( -Pattern.c_width/2, Pattern.c_width/2 );
		// 					var y = random( -Pattern.c_height/2, Pattern.c_height/2 );
		// 					var z = i*10 + 100;
		// 					o.position = [x,y,z];
		// 				}
		// 				// rotation
		// 				if( Style_fantasy.objects[i].rotate_modify ) {
		// 					var angle_x = Math.PI*random(-1,1)*Pattern.regular/100;
		// 					var angle_y = Math.PI*random(-1,1)*Pattern.regular/100;
		// 					var angle_z = Math.PI*random(-1,1)*Pattern.regular/100;
		// 					o.rotation = [angle_x,angle_y,angle_z];
		// 				}
		// 				// scale
		// 				if( Style_fantasy.objects[i].scale_modify ) {
		// 					var scale_random = Math.random()*2+0.2;
		// 					o.scale = [ scale_random, scale_random, scale_random ];
		// 				}				

		// 				Pattern.primary_objects.push(o);
		// 			}
		// 		}
		// 		break;

		// 	default :
		// 		break;
		// }


		// 形体库中选择形体
		// for(var i=0;i<1;++i) {
		// 	Pattern.library_objects.push( LibModels[0] );
		// }

		// 初始化各项【选择参数】数组
		// transform stacks
		// for(var i=0;i<10;++i) {
		// 	// size 
		// 	Pattern.sizeList.push(size)
		// 	// position
		// 	var x = random( -Pattern.c_width/2, Pattern.c_width/2 );
		// 	var y = random( -Pattern.c_height/2, Pattern.c_height/2 );
		// 	var z = i*10 + 100;
		// 	Pattern.positionList.push([ x, y, z ]);
		// 	// rotation
		// 	var angle_x = Math.PI*random(-1,1)*Pattern.regular/100;
		// 	var angle_y = Math.PI*random(-1,1)*Pattern.regular/100;
		// 	var angle_z = Math.PI*random(-1,1)*Pattern.regular/100;
		// 	Pattern.rotationList.push([angle_x,angle_y,angle_z]);
		// 	// scale
		// 	var scale_random = Math.random()*2+0.2;
		// 	Pattern.scaleList.push([ scale_random, scale_random, scale_random ]);
		// 	// diffuse color pick
		// 	Pattern.colorPickList.push(randompick(0,4));
		// }
	},
	initColor: function(schemes) {
		var ln = schemes.length;
		var random = Math.floor( Math.random()*ln );
		var scheme = schemes[random];

		for( var i=0; i<scheme.length; ++i ) {
			Pattern.colors.push( hexToDeci(scheme[i]) );
		}

		// light color
		var middleColor = [];
		for( var i=0; i<Pattern.colors[3].length; ++i ) {
			if( i==Pattern.colors[3].length-1 ) {
				c = 1.0;
			}else{
				var c = ((Pattern.colors[3][i] - Pattern.colors[0][i])/2 + Pattern.colors[0][i])*1.2;
				if(c>1.0) c=1.0;
			}
			middleColor.push(c);
		}
		Pattern.colors.push(middleColor)
	},
	getColorDeci: function(index) {
		return Pattern.colors[index];
	},
	resetData: function() {
		Pattern.basic_obj_list 		= [];
		Pattern.sizeList 		= [];
		Pattern.positionList 	= [];
		Pattern.rotationList	= [];
		Pattern.scaleList 		= [];
	}
}

Object.defineProperty( Pattern, 'generateData', { enumerable: false });
Object.defineProperty( Pattern, 'initColor', { enumerable: false });
Object.defineProperty( Pattern, 'getColorDeci', { enumerable: false });
Object.defineProperty( Pattern, 'resetData', { enumerable: false });
