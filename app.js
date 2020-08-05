var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var query=require('./mysql/sql')
var url=require('url')
var upload = require('multer')()
var ejs = require('ejs');

// 使用cors跨域
var allowCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};

// 处理post
var bodyParser = require('body-parser')
 





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(allowCors);//使用跨域中间件







// var options={
// 	key:fs.readFileSync('./ssl/a.key');
// 	cert:fs.readFileSync('./ssl/a.pem')
// }
// app.use(bodyParser())
app.use(bodyParser.json());	//json
app.use(bodyParser.urlencoded({ extended: true}));//x-www
 //from-data






// app.use(logger(‘dev’));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.engine('.html',ejs.__express);
// app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 减少缓存 seo优化
app.disable('etag');

// 文件静态托管

app.use(express.static('public'));


// app.all('/',(req,res)=>{
// 	// res.send('暂未开放~')
// 	res.render('01.html'); 

// })

app.use(express.static(path.join(__dirname, 'public/dist')) );
// app.use(express.static(path.join(__dirname, 'public/vues')) );

app.use('/', indexRouter);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听捕获异常使其遇到err继续往下进行
process.on('uncaughtException', (err) => {
    console.log('这里有个未捕获的同步错误', err);
})
process.on('unhandledRejection', (err) => {
    console.log('这里有个未处理的异步错误', err)
})

module.exports = app;
