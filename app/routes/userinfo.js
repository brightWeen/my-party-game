const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');
const user = require('../user/user');

/*
*
* {\"openid\":\"oatyMv95QmMxFM-XMXoBvHcfNm1M\",
* \"nickname\":\"昕哲\",\"sex\":1,
* \"language\":\"zh_CN\",
* \"city\":\"武汉\",
* \"province\":\"湖北\",
* \"country\":\"中国\",\
* "headimgurl\":\"http:\\/\\/wx.qlogo.cn\\/mmopen\\/ajNVdqHZLLDo8Cma3ss5ugib4zNZTwYv1eic8ia8LvdJGedTxh4Ne8guZQxZjeh4Qooibia8VcPSX7EyrGA93rGFHEA\\/0\",
* \"privilege\":[]}
* */
router.get('/user', function (req, res) {
    getToken(req.query.code)
        .then(function (data) {
            return JSON.parse(data);
        })
        .then(function (data) {

            getUserInfo(data['access_token'], data['openid'])
              .then(_ => {
                var gameType = req.query["state"];
              var wx_user =  JSON.parse(_);
                res.cookie("openId",wx_user.openId)  ;
              user.initUser(wx_user).then(function(user){
                res.cookie("objectId",user.getObjectId()) ;
                switch (gameType){
                  case  "run":
                    res.redirect("/game-run-power");
                    break;
                  case  "run-score":
                    res.redirect("/game-run-score");
                    break;
                  case  "hammer":
                    res.redirect("/game-hammer");
                    break;
                }
                res.json({gameType});
                 console.log("user",user.toJSON());
              },function(e){
                res.json(e);
              });
                //res.render('user.html', {userinfo: _});
            },function(e){
                res.json(e);
            });
        },function(e){
          res.json(e);
        });
});

router.get('/user2', function (req, res) {
    res.json({a:1})
});
module.exports = router;