const express = require('express');
const nunjucks =require('nunjucks');
var AV = require('leanengine');
var cookieParser = require('cookie-parser')



const path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session')


require('body-parser-xml')(bodyParser);

//引入token刷新
//const getToken = require('./libs/common');
//getToken();

//创建菜单
//const createMenu = require('./libs/wxCustomeMenu');
//createMenu();


//引入路由
//const weixin = require('./routes/weixin');
//const auth = require('./routes/auth');
const route_userinfo = require('./routes/userinfo');
const route_index = require('./routes/index');
const route_game= require('./routes/game');



//app配置
const app = express();

app.use(cookieParser())
app.use(AV.express());
app.set('views', path.join(__dirname, '../app/views'));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
//解析xml
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}));

//启用nunjucks模板
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

//启用路由
//app.use('/wechat', weixin);
//app.use(auth);
app.use(route_userinfo);
app.use(route_index);
app.use(route_game);

/*
*
*

app.get('/', function (req, res) {
  console.log(1);
  res.render('index.html');
});
 * */

module.exports = app;