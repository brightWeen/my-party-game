;(function () {
    var step = 1
    var energyFull = 100;
    var energy = 0;
    var $body = $('body')
    var $fore = $('#energy-fore')

    var $spaceman = $('.re-spaceman')
    var $moon = $('.re-moon')
    var moonRun = 0;

    !(function preload() {
        var images = [
            'img/moon.png'
        ]
        for (var i = 0; i < images.length; i++) {
            var img = new Image()
            img.src = images[i]
        }
    })()

    function renderEnergy(c) {
        var rate = energyFull / 60;
        var o = Math.ceil(c / rate)
        var l = 600 - (o - 1) * 10
        if (c >= energyFull) {
            l = 0
            addStep()
        }
        $fore.css('background-position', '-' + (l / 75).toFixed(6) + 'rem 0')
    }

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
            }
        }, 1000)
    }

    function reMileage() {
        renderEnergy(energy)
        var even = energy % 2 === 0
        $spaceman.toggleClass('re-spaceman_left', !even).toggleClass('re-spaceman_right', even)
    }

    $('.re-start').on('click', function () {
        addStep();
        countDown();
    })

    $('.re-foot_btn').on('touchend', function () {
        var $this = $(this)
        var even = energy % 2 === 0
        if (($this.hasClass('re-foot_left') && even) || ($this.hasClass('re-foot_right') && !even)) {
            energy++;
            reMileage();

            if (energy % 5 === 0) {
                moonRun++;
            }
            $moon.toggleClass('re-moon_1', moonRun % 2 !== 0)
        }
    })

})()