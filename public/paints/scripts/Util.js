GeometryPath = '../geometries/';

// 在整个空间里面随机选择位置
function randomWithinScreen ( width, height, depth ) {
	var _x = ( Math.random() - 0.5 ) * width;
	var _y = ( Math.random() - 0.5 ) * height;
	var _z = ( Math.random() - 0.5 ) * depth;

	return new THREE.Vector3( _x, _y, _z );
}

// 加载颜色和样式数据: color | paint data
function loadPaintData ( dataPath, init, animate ) {
	// 首先获取颜色数据
	$.get('./data/Color.json', function( data ){

		globalColors = data['Colors'];

		$.get( dataPath, function( data ){

			// set paint data 
			PaintData.pattern = data.standard.pattern;

			// set model path if it exists
			if( data.hasOwnProperty('instances') ) {
				var key = window.location.href.split( '#' )[1];
				PaintData.modelPath = data.instances[ key ].model;
				PaintData.colorTheme = data.instances[ key ].theme;
			}

			var colorList = globalColors[ PaintData.colorTheme ];

			var random = Math.floor( Math.random() * colorList.length );

			for( var i in colorList[random] ) {
				// set color theme
				PaintData.palette[ 'color-' + i ] = '#' + colorList[random][i];
			}

			init();
			animate();
		})
	})

	// fetch( './data/Color.json' ).then( function( res ) {
	// 	return res.json().then( function( json ) {
	// 		globalColors = json['Colors'];
	// 	});
	// }).then( function(){
	// 	fetch( dataPath ).then( function( res ) {
	// 		return res.json().then( function( json ) {
	// 			// set paint data 
	// 			PaintData.pattern = json.standard.pattern;
	// 			// set model path if it exists
	// 			if( json.hasOwnProperty('instances') ) {
	// 				var key = window.location.href.split( '#' )[1];
	// 				PaintData.modelPath = json.instances[ key ].model;
	// 				PaintData.colorTheme = json.instances[ key ].theme;
	// 			}
	// 		})
	// 	}).then( function() {

	// 		var colorList = globalColors[ PaintData.colorTheme ];

	// 		var random = Math.floor( Math.random() * colorList.length );

	// 		for( var i in colorList[random] ) {
	// 			// set color theme
	// 			PaintData.palette[ 'color-' + i ] = '#' + colorList[random][i];
	// 		}

	// 		init();
	// 		animate();
	// 	});
	// });
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
	initUITips();
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
	// var infoSerial = document.createElement('SPAN');
	// infoSerial.setAttribute('class','info-serial');
	// infoSerial.setAttribute('id','info_serial');
	// infoSerial.textContent = document.getElementById('serial').content;
	// infoTitle.appendChild(infoSerial);

	// 描述
	// var infoDescription = document.createElement('P');
	// infoDescription.setAttribute('class','info-description');
	// infoDescription.setAttribute('id','info_description');
	// infoDescription.textContent = document.getElementById('description').content;

	// 关键词
	var infoKeywords = document.createElement('DIV');
	infoKeywords.setAttribute('id','info_keywords');

	var keywordsString = document.getElementById('keywords').content;
	var keywordsArray = keywordsString.split(',');
	keywordsArray.forEach(function(item,index){
		var keywordSpan = document.createElement('SPAN');
		keywordSpan.setAttribute('class','keyword');
		keywordSpan.textContent = item;
		infoKeywords.appendChild(keywordSpan);
	});

	

	var infoWrapper = document.createElement('DIV');
	infoWrapper.setAttribute('class','info-wrapper');
	infoWrapper.appendChild(infoTitle);
	infoWrapper.appendChild(infoKeywords);




	// 操作组 -----------------------------------
	// 下载功能
	var btn_download = document.createElement('DIV');
	btn_download.setAttribute('class','btn btn-download');
	btn_download.addEventListener('click', function(e){

		if( isChromeRecommend ) {
			$('.btn-download .warning').show();
		}

	    // 基本数据
	    var _id = new Date().getTime();

	    var imageData = canvas_painter.toDataURL("image/png"); 
	    var link = document.createElement("a");
		var imgData = canvas_painter.toDataURL({ format: 'png' });
		var strDataURI = imgData.substr(22, imgData.length);
		var blob = dataURLtoBlob(imgData);

		// link.download = _id + ".png";
		// link.href = URL.createObjectURL(blob);
	 //    link.click();

	 	download( blob, _id, "image/png" );

	    // 上传
        var fd = new FormData();
        fd.append('file', blob, _id + '.png');

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

	function dataURLtoBlob(dataurl) {
	    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new Blob([u8arr], {type:mime});
	}

	// 下载时候的提示信息
	btn_download_warning = document.createElement('DIV');
	btn_download_warning.setAttribute('class','warning');
	var browserWarningText = localStorage.lang === 'en' ? 'Problem with downloading ? Please try in Chrome' : '下载遇到问题？试试Chrome浏览器吧';
	btn_download_warning.textContent = browserWarningText;
	btn_download.appendChild( btn_download_warning );

	// 刷新功能
	// var btn_refresh = document.createElement('DIV');
	// btn_refresh.setAttribute('class','btn btn-download');
	// btn_refresh.innerHTML = '刷新';
	// btn_refresh.addEventListener('click', function (e) {
	// 	refreshPaint();
	// }, false);

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

		if( PaintData.colorShuffleTheme ) {
			var colorList = globalColors[ PaintData.colorShuffleTheme ];
		}else{
			var colorList = globalColors[ 'Wild' ];
		}

		var random = Math.floor( Math.random() * colorList.length );

		for( var i in colorList[random] ) {
			PaintData.palette[ 'color-' + i ] = '#' + colorList[random][i];
		}

		PaintData.updateColors();
		gui.updateDisplay();
	},false);

	// 后期处理特效开关
	var btnPostEFX = document.createElement('DIV');
	btnPostEFX.setAttribute('id','toggle_PostEfx');
	if( PaintData.postEFX.effects === false ) btnPostEFX.classList.add('off');
	btnPostEFX.addEventListener('click',function () {
		if( PaintData.postEFX.effects === false ) {
			PaintData.postEFX.effects = true;
			btnPostEFX.classList.toggle('off');
		}else{
			PaintData.postEFX.effects = false;
			btnPostEFX.classList.toggle('off');
		}
	},false);


	// frame controling
	var frameControlSwitch = document.createElement('INPUT');
	frameControlSwitch.setAttribute('type','button');
	frameControlSwitch.setAttribute('id','frame_control_switch');
	frameControlSwitch.addEventListener('click',function(){
		frameControlSwitch.classList.toggle('pause');
		if( isFrameControlling ) {
			isFrameControlling = false;
		}else{
			isFrameControlling = true;
		}
	},false);

	// var frameControlSlider = document.createElement('INPUT');
	// frameControlSlider.setAttribute('type','range');
	// frameControlSlider.setAttribute('id','frame_control_slider');
	// frameControlSlider.min = 0;
	// frameControlSlider.max = 100;

	var frameControl = document.createElement('DIV');
	frameControl.setAttribute('id','frame_control');
	frameControl.appendChild(frameControlSwitch);
	// frameControl.appendChild(frameControlSlider);


	// control panel
	var controlWrapper = document.createElement('DIV');
	controlWrapper.setAttribute('id','control_wrapper');
	controlWrapper.appendChild(frameControl);
	controlWrapper.appendChild(resetPattern);
	if( PaintData.options.canColorShuffle ) {
		controlWrapper.appendChild(shuffleColor);
	}
	if( PaintData.options.canEffectsToggle ) {
		container.appendChild(btnPostEFX);
	}

	document.getElementById('container').appendChild(controlWrapper);	
}

function initUITips() {

	// 刷新提示
	var tipsResetPattern = document.createElement('DIV');
	tipsResetPattern.setAttribute('class','tip-vertical');
	tipsResetPattern.setAttribute('id','tip_resetPattern');
	tipsResetPattern.textContent = parent.window.localStorage.lang === 'en' ? 
									parent.window.words['#tip_resetPattern'].en : 
									parent.window.words['#tip_resetPattern'].zh;
	reset_pattern.appendChild(tipsResetPattern);

	// 刷新颜色主题
	var tipsShuffleTheme = document.createElement('DIV');
	tipsShuffleTheme.setAttribute('class','tip-vertical');
	tipsShuffleTheme.setAttribute('id','tip_shuffleTheme');
	tipsShuffleTheme.textContent = parent.window.localStorage.lang === 'en' ? 
									parent.window.words['#tip_shuffleTheme'].en : 
									parent.window.words['#tip_shuffleTheme'].zh;
	shuffle_color.appendChild(tipsShuffleTheme);
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


/* 16进制颜色转为RGB格式 */  
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  
String.prototype.colorRgb = function( alpha ){  
    var sColor = this.toLowerCase();  
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }  
        //处理六位的颜色值  
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }  
        return "rgba(" + sColorChange.join(",") + "," + alpha + ")"; 
//或 
//return "rgba(" + sColorChange.join(",") + ",0.8)"; 
    }else{  
        return sColor;    
    }  
};  




//download.js v4.2, by dandavis; 2008-2016. [CCBY2] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}//end if dataURL passed?

		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));