const router = require('express').Router();
//const wxAuth = require('../libs/wxAuth');
//const turingRobot = require('../libs/turingRobot');
//const autoReply = require('../libs/wxAutoReply');
const config = require('../../config');
const qs = require('querystring');

//wxabe36d0fb9077787 modeling
//wx5fc22d9225469e1c test

let params = {
    appid: config.appId,
    redirect_uri: 'https://bw.s1.natapp.cc/user/',
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: '',
    connect_redirect: '1#wechat_redirect'
};
var reqUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?";


router.get('/', function (req, res) {
    params.state = req.query["type"] || "run";
    res.render("index.html", {
        url: reqUrl + qs.stringify(params)
    })
});
module.exports = router;