var score = 0;
var simulation;

function updateView(score) {
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
}

$(document).ready(function() {
    ballActor.start(initialize);

    if (typeof document.createElement('canvas').getContext === "function") {
        prepareConfetti();
    }
});

$(window).resize(function() {
    simulation = newResize()
    ballActor.start(simulation);

    if (typeof document.createElement('canvas').getContext === "function") {
        resizeConfetti();
    }
});

$(ballActor.element).on('mousedown touchstart', ballActor.element, function() {
    simulation = newPoke();
    ballActor.start(simulation);

    // increase score, update view
    score++;
    updateView(score);
});