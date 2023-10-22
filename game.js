/* 
Simon Game:
1. Add JavaScript and jQuery.
2. Create a New Pattern.
3. Show the Sequence to the User with Animations and Sounds.
4. Check Which Button is Pressed.
5. Add Sounds to Button Clicks.
6. Add Animations to User Clicks.
7. Start the Game. ???
8. Check the User's Answer Against the Game Sequence8.
9. Game Over.
10. Restart the game.
*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    } else {
        console.log("success!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
}

// Step 4 - Check Which Button is Pressed.
$(".btn").click(function() {
    // Detect the color that was clicked.
    //var style = getComputedStyle(this);
    //console.log(style["background-color"]);

    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);

    // Step 5 - Add Sounds to Button Clicks.
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// Step 7 - Start the Game.
$("body").keydown(function() {
    if (gamePattern.length === 0) {
        $("#level-title").html("Level 0");
        nextSequence();
    }
});