const router = require('express').Router();
var AV = require('leanengine');
const user = require('../user/user');





var query = new AV.Query('GameUser');

var error = function (e) {
  console.error(e);
}


//获取用户
router.get('/game/getuser', function (req, res) {
  var wx_user = req.session.wx_user;

  user.getUser(wx_user).then(function (user) {
    res.json(user.toJSON());
  });
});
//更新分数
router.get('/game/update', function (req, res) {
  var objectId = req.cookies.objectId;
  let gameType = req.query.gameType;
  let score = req.query.score;
  user.getUser(objectId).then(function (user) {
    var game_result = user.get("game_result");
    var currentGame = game_result[gameType];
    //更新游戏积分
    currentGame["score"] = score;
    currentGame["hasResult"] = true;
    game_result[gameType] = currentGame;
    user.set("game_result", game_result);
    user.save().then(function () {
      res.json({success: 1, msg: "更新成功"});
    }, error)
  }, function () {
    res.json({success: 0, msg: "用户不存在"})
  });
});


module.exports = router;