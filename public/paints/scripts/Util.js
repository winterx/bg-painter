GeometryPath = '../geometries/';

// 在整个空间里面随机选择位置
function randomWithinScreen ( width, height, depth ) {
	var _x = ( Math.random() - 0.5 ) * width;
	var _y = ( Math.random() - 0.5 ) * height;
	var _z = ( Math.random() - 0.5 ) * depth;

	return new THREE.Vector3( _x, _y, _z );
}



// 加载外部文件
function loadShaderFromFile( filename, onLoadShader ) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

    	if( request.readyState === 4 && request.status === 200 ) {

            onLoadShader( request.responseText );

        }

    }
        
    request.open( "GET", filename, true );
    request.send();

}

function initUI( renderer ) {
	renderer.domElement.setAttribute('id','canvas_painter');

	initUIInfoPanel();
	initUIControlPanel();
}

// 初始化主信息面板，功能包括显示标题、简介，控制下载和刷新
function initUIInfoPanel ( ) {
	var title = document.title.replace('_',' #');

	// 说明信息 -----------------------------------
	// 主标题
	var infoTitle = document.createElement('H1');
	infoTitle.setAttribute('class','info-title');
	infoTitle.setAttribute('id','info_title');
	infoTitle.textContent = document.title;
	// 作品类别序号
	var infoSerial = document.createElement('SPAN');
	infoSerial.setAttribute('class','info-serial');
	infoSerial.setAttribute('id','info_serial');
	infoSerial.textContent = document.getElementById('serial').content;
	infoTitle.appendChild(infoSerial);

	// 描述
	var infoDescription = document.createElement('P');
	infoDescription.setAttribute('class','info-description');
	infoDescription.setAttribute('id','info_description');
	infoDescription.textContent = document.getElementById('description').content;

	var infoWrapper = document.createElement('DIV');
	infoWrapper.setAttribute('class','info-wrapper');
	infoWrapper.appendChild(infoTitle);
	infoWrapper.appendChild(infoDescription);

	// 操作组 -----------------------------------
	// 下载功能
	var btn_download = document.createElement('DIV');
	btn_download.setAttribute('class','btn btn-download');
	btn_download.addEventListener('click', function(e){
	    // 基本数据
	    var _id = new Date().getTime();
		var imageData = canvas_painter.toDataURL("image/png").replace("image/png", "image/octet-stream"); 

		// 下载
	    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href = imageData;
	    save_link.download = _id + '.png'; 
	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    save_link.dispatchEvent(event);

	    // 上传
	    var arr     = imageData.split(','),
            mime    = arr[0].match(/:(.*?);/)[1],
            bstr    = atob(arr[1]),
            n       = bstr.length,
            u8arr   = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var obj     = new Blob([u8arr],{type:mime});
        var fd      = new FormData();
        fd.append('file', obj, _id + '.png');

        $.ajax({
        	url: "/upload_image",
            type: "POST",
            processData : false,
            contentType : false,
            data : fd,
            success : function(data) {
                console.log(data);
            }
        });

	}, false );


	// 刷新功能
	var btn_refresh = document.createElement('DIV');
	btn_refresh.setAttribute('class','btn btn-download');
	btn_refresh.innerHTML = '刷新';
	btn_refresh.addEventListener('click', function (e) {
		refreshPaint();
	}, false);

	var btnWrapper = document.createElement('DIV');
	btnWrapper.setAttribute('class','btn-wrapper');
	btnWrapper.appendChild(btn_download);
	// btnWrapper.appendChild(btn_refresh);



	// 生成每个paint的通用操作面板
	// 包括：刷新、下载
	var panel = document.createElement('DIV');
	panel.setAttribute('id','panel');
	panel.appendChild(infoWrapper);
	panel.appendChild(btnWrapper);

	document.getElementsByTagName("body")[0].appendChild(panel);	
}

function initUIControlPanel() {
	// 重建样式
	var resetPattern = document.createElement('DIV');
	resetPattern.setAttribute('id','reset_pattern');
	resetPattern.setAttribute('class','dot-btn');
	resetPattern.addEventListener('click',function(){
		PaintData.reset();
	},false);

	// 随机更换颜色主题
	var shuffleColor = document.createElement('DIV');
	shuffleColor.setAttribute('id','shuffle_color');
	shuffleColor.setAttribute('class','dot-btn');
	shuffleColor.addEventListener('click',function(){
		fetch( './data/Color.json' ).then( res => {
			return res.json().then( json => {
				var colorlist = json[ 'Colors' ][ 'Wild' ];
				var random = Math.floor( Math.random() * colorlist.length );
				for( var i in colorlist[random] ) {
					PaintData.colortheme[ 'color-' + i ] = '#' + colorlist[random][i];
				}
			});
		}).then( () => {
			PaintData.updateColors();
			gui.updateDisplay();
		});
	},false);



	// frame controling
	var frameControlSwitch = document.createElement('INPUT');
	frameControlSwitch.setAttribute('type','button');
	frameControlSwitch.setAttribute('id','frame_control_switch');
	frameControlSwitch.addEventListener('click',function(){
		frameControlSwitch.classList.toggle('pause');
	},false);

	var frameControlSlider = document.createElement('INPUT');
	frameControlSlider.setAttribute('type','range');
	frameControlSlider.setAttribute('id','frame_control_slider');
	frameControlSlider.min = 0;
	frameControlSlider.max = 100;
	frameControlSwitch.addEventListener('click',function(){
		if( isFrameControlling ) {
			isFrameControlling = false;
		}else{
			isFrameControlling = true;
		}
	},false);

	var frameControl = document.createElement('DIV');
	frameControl.setAttribute('id','frame_control');
	frameControl.appendChild(frameControlSwitch);
	frameControl.appendChild(frameControlSlider);


	// control panel
	var controlWrapper = document.createElement('DIV');
	controlWrapper.setAttribute('id','control_wrapper');
	controlWrapper.appendChild(frameControl);
	controlWrapper.appendChild(resetPattern);
	controlWrapper.appendChild(shuffleColor);

	document.getElementById('container').appendChild(controlWrapper);	
}





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