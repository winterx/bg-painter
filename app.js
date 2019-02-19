var bodyParser = require('body-parser');
var express= require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended:false });

// 设置静态文件存放路径
app.use( express.static('public') );

// 设置显示模板
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// index
app.get('/',function(req,res){
	res.render('index');
});

app.get('/colors',function(req,res){
	res.render('colors');
});

// 后端接口,请求颜色数据
app.get( '/api/colors_data', function( req, res ) {
	fs.readFile( __dirname + '/public/paints/data/Color.json', 'utf-8', function(err,data){
		var colordata = JSON.parse(data).Colors;
		res.send(colordata);
		res.end();
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

module.exports = app;
