// islider
var sliderContent = document.getElementById('sliderContent');
var sliderContainer = document.getElementById('sliderContainer');

var content = [];

for (var i = 0; i < sliderContent.children.length; i++) {
    content.push({
        content: sliderContent.children[i]
    });
}

var S = new iSlider({
    dom: sliderContainer,
    data: content,
    isAutoplay: 0,
    isLooping: 0,
    isOverspread: 1,
    animateTime: 800,
    isVertical: true
});

window.addEventListener('load', function () {

})

S.on('slideChanged', function (number, element) {
    switch (number) {
        case 0:
            // renderRain(element);
            break;
        case 1:
            if (letterShown === false) {
                showLetter(element);
            }
            break;
        case 2:
            if (textShown === false) {
                showText(element);
            }
            break;
        case 5:
            if (initedPlayer === false) {
                initPlayer(element);
            }
            break;
        case 4:
            if (canlenderShown === false) {
                canlenderShow(element);
            }
            if (downArrowShown === false) {
                downArrowShow();
            }
            break;
        case 6:
            if (initedLoveText === false) {
                initLoveText(element);
            }
            downArrowHide();
            break;
    }
})

// for rain fall
// github: https://github.com/maroslaw/rainyday.js

// var engine;

// function renderRain() {
//     var image = document.getElementById("rainFallImage");
//     var rainFall = document.getElementById("rainFall");
//     engine = new RainyDay({
//         image: image,
//         parentElement: rainFall,
//         // crop: [0, 0, 50, 60],
//         // blur: 10,
//         opacity: 1
//     });

//     engine.rain([
//         [3, 2, 2]
//     ], 100);
// }



// for letter

var letterShown = false;

function showLetter(element) {
    var letterContent = element.children.envelop.children.letterContent.textContent;
    var letterContainer = element.children.envelop.children.letterContainer;
    var index = 0;

    var timer;

    function type() {
        letterContainer.textContent = letterContent.substring(0, index++);
        if (index === letterContainer.length) {
            clearImmediate(timer);
        }
    }
    letterShown = true;
    timer = setInterval(type, 100);
}


// for lock

var textShown = false;

function showText(element) {
    textShown = true;
    element.children.lock.children[1].classList.add("fadeIn");
    element.children.lock.children[3].classList.add("fadeIn");
}

// for love
var initedLoveText = false;

function initLoveText(element) {

    var loveText = element.children[0].children.loveText;

    loveText.addEventListener('touchstart', function () {
        for (var i = 0; i < 3; i++) {
            loveText.children[i].classList.add('hover');
        }
    })

    loveText.addEventListener('touchend', function () {
        for (var i = 0; i < 3; i++) {
            loveText.children[i].classList.remove('hover');
        }
    })
}

// for player

var initedPlayer = false;

function initPlayer(element) {
    var player = element.children[0].children[0].children[1].children.player;
    var playButton = element.children[0].children[0].children[2].children.playButton;
    var pauseButton = element.children[0].children[0].children[2].children.pauseButton;
    // var fullScreenButton = element.children[0].children[0].children[2].children.fullScreenButton;
    var audioPlayer = document.getElementById('audioPlayer');
    playButton.addEventListener('touchend', function () {
        player.play();
        playButton.classList.add('hide');
        pauseButton.classList.remove('hide');
        if (audioPlayer.paused === false) {
            audioPlayer.pause();
        }
    })

    pauseButton.addEventListener('touchend', function () {
        player.pause();
        playButton.classList.remove('hide');
        pauseButton.classList.add('hide');
    })

    // fullScreenButton.addEventListener('touchend', function() {
    //     player.webkitRequestFullScreen();
    // })

}


// for canlender 
var canlenderShown = false;

function canlenderShow(element) {
    canlenderShown = true;
    var container = element.children[0].children[0];
    var texts = element.children[0].children[1];
    setTimeout(function () {
        container.classList.add('blur');
        for (var i = 0; i < texts.childElementCount; i++) {
            (function (index) {
                setTimeout(function () {
                    texts.children[index].classList.add('fadeInWithEase')
                }, (index + 1) * 200)
            })(i)
        }
    }, 2000)

}


// for down arrow

var downArrowShown = false;

function downArrowHide() {
    document.getElementById('downArrow').classList.add('hide-tip');
    downArrowShown = false;
}

function downArrowShow() {
    document.getElementById('downArrow').classList.remove('hide-tip');
    downArrowShown = true;
}


window.addEventListener('load', hideLoading);

var hideLoadingTimeOut = setTimeout(function () {
    clearTimeout(hideLoadingTimeOut);
    hideLoading();
}, 5000);

function hideLoading() {
    downArrowShow();
    var loading = document.getElementById('loading');
    loading.classList.add('fadeOut');
    setTimeout(function () {
        loading.classList.add('hide');
        loading.classList.remove('fadeOut');
    }, 500);
}