GeometryPath = '../geometries/';

function randomWithinScreen ( width, height, depth ) {
	var _x = ( Math.random() - 0.5 ) * width;
	var _y = ( Math.random() - 0.5 ) * height;
	var _z = ( Math.random() - 0.5 ) * depth;

	return new THREE.Vector3( _x, _y, _z );
}

function initInfoDomPanel ( renderer ) {
	renderer.domElement.setAttribute('id','canvas_painter');
	// canvas_painter.style.height = 

	var title = document.title.replace('_',' #');


	// 说明信息 -----------------------------------
	// 主标题
	var infoTitle = document.createElement('H1');
	infoTitle.setAttribute('class','info-title');
	infoTitle.setAttribute('id','info_title');
	// 描述
	var infoDescription = document.createElement('P');
	infoDescription.setAttribute('class','info-description');
	infoDescription.setAttribute('id','info_description');

	var infoWrapper = document.createElement('DIV');
	infoWrapper.setAttribute('class','info-wrapper');
	infoWrapper.appendChild(infoTitle);
	infoWrapper.appendChild(infoDescription);



	// 操作组 -----------------------------------
	var btn_download = document.createElement('DIV');
	btn_download.setAttribute('class','btn btn-download');
	btn_download.innerHTML = '下载';
	btn_download.addEventListener('click', function(e){
		var imageData = canvas_painter.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
		// Convert image to 'octet-stream' (Just a download, really)

	    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href = imageData;
	    save_link.download = 'frank.png'; 
	   
	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    save_link.dispatchEvent(event);

	}, false );


	var btn_refresh = document.createElement('DIV');
	btn_refresh.setAttribute('class','btn btn-download');
	btn_refresh.innerHTML = '刷新';
	btn_refresh.addEventListener('click', function (e) {
		refreshPaint();
	}, false);


	var btnWrapper = document.createElement('DIV');
	btnWrapper.setAttribute('class','btn-wrapper');
	btnWrapper.appendChild(btn_download);
	btnWrapper.appendChild(btn_refresh);



	// 生成每个paint的通用操作面板
	// 包括：刷新、下载
	var panel = document.createElement('DIV');
	panel.setAttribute('id','panel');
	panel.appendChild(infoWrapper);
	panel.appendChild(btnWrapper);

	document.getElementsByTagName("body")[0].appendChild(panel);

	
}

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