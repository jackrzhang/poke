var ballActor = new ui.Actor(".ball");

var ballWidth = $(".ball").width();
var ballHeight = $(".ball").height();
var ballFriction = .005;
var ballBounce = 0.9;
var ballGravity = 1500;
var clickVariation = 1500;

var score = 0;

var initialize = new ui.Simulate({
    values: {
        x: {
            velocity: 1000,
            min: 0,
            max: $(".ball-area").width()-ballWidth,
            bounce: ballBounce,
            friction: ballFriction
        },
        y: {
            velocity: 0,
            acceleration: ballGravity,
            min: 0,
            max: $(".ball-area").height()-ballHeight,
            bounce: ballBounce,
            friction: ballFriction
        }
    }
});

$(document).ready(function() {
    ballActor.start(initialize);
});

$(window).resize(function() {
    var resize = new ui.Simulate({
        values: {
            x: {
                min: 0,
                max: $(".ball-area").width()-ballWidth,
                bounce: ballBounce,
                friction: ballFriction
            },
            y: {
                acceleration: 2500,
                min: 0,
                max: $(".ball-area").height()-ballHeight,
                bounce: ballBounce,
                friction: ballFriction
            }
        }
    });

    ballActor.start(resize);
});

$(ballActor.element).on('mousedown touchstart', ballActor.element, function() {
    var push = new ui.Simulate({
        values: {
            x: {
                velocity: '-=' + (Math.random()*(clickVariation*2)-clickVariation).toString(),
                bounce: ballBounce,
                friction: ballFriction
            },
            y: {
                velocity: '-=' + (Math.random()*(clickVariation*4)-clickVariation*2).toString(),
                acceleration: ballGravity,               
                bounce: ballBounce,
                friction: ballFriction
            }
        }
    });

    ballActor.start(push);

    // increase score, update view
    score++;
    document.getElementById("score-num").innerHTML = score;

    if (score < 49) {
        document.getElementById("score-to-win").innerHTML = 50-score + " more";
    } else if (score == 49) {
        document.getElementById("score-to-win").innerHTML = "";
        document.getElementById("score-status").innerHTML = "Just one more poke! ";
    } else if (score == 50) {
        StartConfetti();
        $(canvas).fadeIn('5000');
        document.getElementById("score-status").innerHTML = "You've won! Congratulations!";
    }

});