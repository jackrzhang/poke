var score = 48;

$(document).ready(function() {
    (ballActor).start(initialize);
    prepareConfetti();
});

$(window).resize(function() {
    ballActor.start(resize);
    resizeConfetti();
});

$((ballActor).element).on('mousedown touchstart', ballActor.element, function() {

    ballActor.start(poke);

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