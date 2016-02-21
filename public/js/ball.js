var ballActor = new ui.Actor(".ball");

var ballWidth = $(".ball").width();
var ballHeight = $(".ball").height();
var ballFriction = .005;
var ballBounce = 0.9;
var ballGravity = 1500;
var clickVariation = 1500;

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

var resize = new ui.Simulate({
    values: {
        x: {
            min: 0,
            max: $(".ball-area").width()-ballWidth,
            bounce: ballBounce,
            friction: ballFriction
        },
        y: {
            acceleration: ballGravity,
            min: 0,
            max: $(".ball-area").height()-ballHeight,
            bounce: ballBounce,
            friction: ballFriction
        }
    }
});

var poke = new ui.Simulate({
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