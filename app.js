var bodyParser = require('body-parser');
var express= require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended:false });

// 设置静态文件存放路径
app.use( express.static('public') );

// 设置显示模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// index
app.get('/',function(req,res){
	res.render('index',{ title: 'pattern' });
});

// painter
app.get('/painter',function(req,res){
	res.render('painter',{ title:'pattern', w:800, h:480 });
});

app.get('/painter_02',function(req,res){
	res.render('painter_02',{ title:'Sci-fi' });
});

// function test : 测试模型载入 以及 文字添加
app.get('/function_canvas',function(req,res){
	res.render('function_canvas',{ title: '' })
});

// render-test : 测试描边着色的方式
app.get('/render_outlineEffect',function(req,res){
	res.render('render_outlineEffect',{ title: '' })
});

// render-test : 测试Phong着色的模型
app.get('/render_phong',function(req,res){
	res.render('render_phong',{ title: '' })
});

// function test : 测试pattern生成器功能
app.get('/pattern_generator',function(req,res){
	res.render('pattern_generator',{title:''});
});

app.post('/paint',urlencodedParser,function(req,res){
	var init_width = parseInt(req.body.init_width);
	var init_height = parseInt(req.body.init_height);
	var init_regular = parseInt(req.body.init_regular);
	var init_volume = parseInt(req.body.init_volume);

	res.render('painter_02', { 
		init_width 		: req.body.init_width, 
		init_height 	: req.body.init_height,
		init_regular 	: req.body.init_regular,
		init_volume 	: req.body.init_volume,
		init_style		: req.body.init_style,
		init_mainTitle  : req.body.init_mainTitle,
		init_subTitle	: req.body.init_subTitle
	});
});


// 文件上传
var upload = multer({ dest: 'public/upload/' });
var type = upload.single('file');
app.post( '/upload_image', type, function(req,res) {
	var tmp_path = req.file.path;
	var target_path = 'public/upload/'+req.file.originalname;
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);
	src.on('end', function() { res.end('complete'); });

	// delete temp file
	fs.unlink(tmp_path,function(err){
		if(err) {
			console.log(err);
		}
	})
});	

app.post( '/upload_json', urlencodedParser, function(req,res) {
	var obj  = JSON.parse(req.body.data);
	var pattern = JSON.stringify(obj,null,4)
	fs.writeFile( 'public/upload/'+ obj._id +'.json', pattern, function(err){
		if(err) console.log(err);
	})
});	
	


var server = app.listen(3000,function(req,res){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

