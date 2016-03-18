// 

var canvas;
var ctx;
var confettiHandler;

//canvas dimensions
var W;
var H;

var mp = 100; //max particles
var particles = [];

function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;  // Green path
        ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
        ctx.stroke();  // Draw it
    }

    update();
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

var TiltChangeCountdown = 5;
var angle = 0;
var tiltAngle = 0;
function update() {
    angle += 0.01;
    tiltAngle += 0.1;
    TiltChangeCountdown--;
    for (var i = 0; i < mp; i++) {
        
        var p = particles[i];
        p.tiltAngle += p.tiltAngleIncremental;
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 2;
        p.x += Math.sin(angle);
        //p.tilt = (Math.cos(p.tiltAngle - (i / 3))) * 15;
        p.tilt = (Math.sin(p.tiltAngle - (i / 3))) * 15;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
            if (i % 5 > 0 || i % 2 == 0) //66.67% of the flakes
            {
                particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngle: p.tiltAngle, tiltAngleIncremental: p.tiltAngleIncremental };
            }
            else {
                //If the flake is exitting from the right
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                }
                else {
                    //Enter from the right
                    particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                }
            }
        }
    }
}

function prepareConfetti() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    W = $(".ball-area").width();
    H = $(".ball-area").height();
    canvas.width = W;
    canvas.height = H;

    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: randomFromTo(5, 30), //radius
            d: (Math.random() * mp) + 10, //density
            color: "rgba(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", 0.7)",
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0
        });
    }
}

function resizeConfetti() {
    canvas = document.getElementById("canvas");
    W = $(".ball-area").width();
    H = $(".ball-area").height();
    canvas.width = $(".ball-area").width();
    canvas.height = $(".ball-area").height();
}

function StartConfetti() {
    W = $(".ball-area").width();
    H = $(".ball-area").height();
    canvas.width = W;
    canvas.height = H;
    confettiHandler = setInterval(draw, 15);
}

function StopConfetti() {
    clearTimeout(confettiHandler);
    if (ctx == undefined) return;
    ctx.clearRect(0, 0, W, H);
}
