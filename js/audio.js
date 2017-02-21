(function() {
  var audio = document.getElementById("music");
  audio.preload = 'auto';
  audio.play();

  //    autoPlayMusic(audio);
  backgroundMusic(audio);
  // 音乐播放
  function autoPlayMusic(audio, other) {
    var o = 0;
    if (other) {
      for (o = 0; o < other.length; o++) {
        other[o].pause();
      }
    }
    if (window.WeixinJSBridge) {
      WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        if (audio.paused) {
          audio.play();
        }
      });
    } else {
      audio.play();
    }
  }
  ///////////////////////

  function backgroundMusic(audio) {
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    if (audio.paused) {
      audio.load();
      audio.play();
    }
    function musicInBrowserHandler() {
      if (audio.paused) {
        audio.load();
        audio.play();
      }
      document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }

    document.body.addEventListener('touchstart', musicInBrowserHandler);

    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
      if (audio.paused) {
        audio.load();
        audio.play();
      }
      document.addEventListener("WeixinJSBridgeReady", function () {
        if (audio.paused) {
          audio.load();
          audio.play();
        }
      }, false);
      document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }

    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
  }
})()