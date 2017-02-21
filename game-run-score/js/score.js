;(function () {
  var step = 1;
  var mileage = 0;
  var $body = $('body')
  var $mileage = $('#energy-mileage')
  var $spaceman = $('#spaceman')
  var $moon = $('#moon')
  var moonRun = 0;
  var timing = 30;
  var $timing = $('#energy-timing')
  var $score = $('#complete-score')
  runTiming(timing)

  ;(function preload() {
    var images = [
      'img/moon.png'
    ]
    for (var i = 0; i < images.length; i++) {
      var img = new Image()
      img.src = images[i]
    }
  })()

  function addStep() {
    step++
    var prev = step - 1
    $body.removeClass('re-step_' + prev).addClass('re-step_' + step)
  }

  function countDown() {
    setTimeout(function () {
      addStep()
      if (step < 5) {
        countDown()
      } else {
        startTiming();
      }
    }, 1000)
  }

  function reMileage() {
    $mileage.html(renderMileage(mileage))

    var even = mileage % 2 === 0
    $spaceman.toggleClass('re-spaceman_left', !even).toggleClass('re-spaceman_right', even)
  }

  function padLeft(number, pad) {
    var ms = number.toString();
    var l = ms.length
    if (l < pad) {
      for (var i = 0; i < pad - l; i++) {
        ms = '0' + ms
      }
    }
    return ms
  }

  function renderMileage() {
    var ms = padLeft(mileage, 5)
    var sp = []
    for (var i = 0; i < ms.length; i++) {
      var n = ms[i]
      sp.push('<span class="re-number re-number_' + n + '"></span>')
    }
    return sp.join('')
  }

  function renderTs(ts) {
    var ms = padLeft(ts, timing.toString().length)
    var sp = []
    for (var i = 0; i < ms.length; i++) {
      var n = ms[i]
      sp.push('<span class="re-number re-number_' + n + '"></span>')
    }
    return sp.join('')
  }

  function renderScore() {

  }

  function runTiming(t) {
    var h = 0;
    var m = 0;
    var s = 0;
    if (t >= 0) {
      // h = Math.floor(t / 60 / 60 % 24);
      // m = Math.floor(t / 60 % 60);
      s = Math.floor(t % 60);
      s = t;
    }
    var p = []
    // p.push(renderTs(h))
    // p.push('<span class="re-timing re-timing_s"></span>')
    // p.push(renderTs(m))
    // p.push('<span class="re-timing re-timing_s"></span>')
    p.push(renderTs(s))
    $timing.html(p.join(''))
  }

  var ts = null;

  function startTiming() {
    runTiming(timing)
    ts = setInterval(function () {
      timing--;
      runTiming(timing)
      if (timing === 0) {
        clearInterval(ts)
        addStep()
        $score.html(renderMileage(mileage))
      }
    }, 1000)
  }

  $('.re-start').on('click', function () {
    addStep();
    countDown();
  })

  $('.re-foot_btn').on('touchend', function () {
    var $this = $(this)
    var even = mileage % 2 === 0
    if (($this.hasClass('re-foot_left') && even) || ($this.hasClass('re-foot_right') && !even)) {
      mileage += 5;
      reMileage();

      if (mileage % 10 === 0) {
        moonRun++;
      }
      $moon.toggleClass('re-moon_1', moonRun % 2 !== 0)
    }
  })

})()