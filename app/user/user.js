var AV = require('leanengine');

var query = new AV.Query('GameUser');
var GameUser = AV.Object.extend('GameUser');
var error = function (msg,reject) {
  return function(e){
    console.error(msg,e);
    reject(msg);
  }
}

var getUser = function(objectId){
  return new Promise(function (resolve, reject) {
    query.get(objectId).then(function (user) {
      resolve(user);
    },error("获取用户",reject));
  })
}
var initUser = function (wx_user) {
  return new Promise(function (resolve, reject) {
    var openId = wx_user.openId;
    query.equalTo('openId', openId);
    console.log("find User1");
    query.find().then(function (results) {
      // results 返回的就是有图片的 Todo   集合

      if (results.length > 0 ) {
        var result = results[0];
        //用户已存在
        resolve(result);
      } else {
        var gameUser = new GameUser();
        gameUser.set('openId', openId);
        gameUser.set('userName', wx_user.nickname);
        gameUser.set('wx_user', wx_user);
        gameUser.set('game_result',
          {
            "run": {
              gameType: 'run',
              score: "",
              hasResult: false
            },
            "run-score": {
              gameType: 'run-score',
              score: "",
              hasResult: false
            },
            "hammer": {
              gameType: 'hammer',
              score: "",
              hasResult: false
            }
          }
        );
        gameUser.save().then(function (u) {
          resolve(u);
        }, error("保存用户",reject));
        //用户不存在
      }
    }, error("查询用户",reject));
  })
}

module.exports = {
  initUser,
  getUser
};