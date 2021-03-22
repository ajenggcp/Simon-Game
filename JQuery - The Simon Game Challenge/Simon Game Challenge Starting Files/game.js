
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var play = false;

//keypress to start the game
if (!play){
$("h1").click(function(){
    
    $("#level-title").text("Level " + level);
    nextSequence();
    play = true;

})
}

//next colour choosing
function nextSequence() {
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern == [];
    level++;
    $("#level-title").text("Level " + level);
}

//when the button/box of colour is clicked
$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})

//checking the user's answer after the game is started
function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }
    }else{

        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Here to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        
    }

    

    
}

//animating the box when its pressed
function animatePress(currentColour){
    
        $("#"+currentColour).addClass("pressed");

        var offPressed = document.querySelector("#" + currentColour);
        setTimeout(function(){
            offPressed.classList.remove("pressed");
        }, 100);
};

//plays the sound of every box
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

//Game Over
function startOver(){
    level = 0;
    gamePattern = [];
    play = false;
    userClickedPattern = [];
}

