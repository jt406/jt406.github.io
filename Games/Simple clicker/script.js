// Function declaration
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Calling the function
greet("Alice"); // Output: Hello, Alice!
greet("Bob");   // Output: Hello, Bob!


const gameState = {
  GAMEOVER: "GAMEOVER",
  PLAY: "PLAYING",
  SHOP: "SHOP"
}

let currState;
let level;
let goal;
let time;
let bigNum;

let timeCountdown;

const levelTxt = document.getElementById("level");
const goalTxt = document.getElementById("goal");
const timeTxt = document.getElementById("time");

const bigButton = document.getElementById("big-button");
const bigNumTxt= document.getElementById("big-number");


function resetGame() {
  level = 1;
  goal = 10;
  time = 5;
  bigNum = 0;
  
  levelTxt.innerHTML = level;
  goalTxt.innerHTML = goal;
  timeTxt.innerHTML = time;
  bigNumTxt.innerHTML = bigNum;
  bigButton.innerHTML = "Grow";
  currState = gameState.PLAY;

  startCountdown();
}

function didBeatLevel() {
  if (goal+1 == bigNum) {
    bigNumTxt.style.fontSize = "64px";
    bigNumTxt.innerHTML = "You win.";
    bigButton.innerHTML = "Continue";
    clearInterval(timeCountdown);
  }
}

// Note: Try the 3d button for a more tactile feel, aka the pomofocus button
bigButton.addEventListener("click", function() { 
    if (currState == gameState.PLAY) {
      bigNum++;
      bigNumTxt.innerHTML = bigNum;
      didBeatLevel();
    } else if (currState == gameState.GAMEOVER) {
      resetGame();
    }
});


// Start countdown
function startCountdown() {
  timeCountdown = setInterval(function(){
    if (time < 0){
      clearInterval(timeCountdown);
      bigNumTxt.style.fontSize = "64px";
      bigNumTxt.innerHTML = "Game over.";
      bigButton.innerHTML = "Continue";
      currState = gameState.GAMEOVER;
    } else {
      timeTxt.innerHTML = time;
    }
    time -= 1;
  }, 1000);
}

resetGame(); // initiate game