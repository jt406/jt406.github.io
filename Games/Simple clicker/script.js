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
  BEATLEVEL: "BEATLEVEL",
  SHOP: "SHOP"
}

const selectedOption = {
  ONE: "ONE",
  TWO: "TWO",
  THREE: "THREE"
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
const bigNumTxt = document.getElementById("big-number");

const statsBar = document.getElementById("stats-bar");
const actionArea = document.getElementById("action-area");

const powerups = document.getElementById("powerups");

let selectOption1;
let selectOption2;
let selectOption3;

/*
function resetGame() {
  level = 1;
  goal = 3;
  time = 5;
  bigNum = 0;
  
  levelTxt.innerHTML = level;
  goalTxt.innerHTML = goal;
  timeTxt.innerHTML = time;
  bigNumTxt.innerHTML = bigNum;
  bigButton.innerHTML = "Grow";
  currState = gameState.PLAY;

  startCountdown();
}*/


function resetGame(currLevel, currGoal, currTime) {
  level = currLevel;
  goal = currGoal;
  time = currTime;
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
  if (goal == bigNum) {
    bigNumTxt.style.fontSize = "64px";
    bigNumTxt.innerHTML = "You win.";
    bigButton.innerHTML = "Continue";
    clearInterval(timeCountdown);
    currState = gameState.BEATLEVEL;
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
    } else if (currState == gameState.BEATLEVEL) {
      showShopUI(); // need to create this function;
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

function showShopUI() {
  statsBar.innerHTML = `
    <div class="stat">
        <span class="name">Select one upgrade</span>
    </div>
  `;
  actionArea.innerHTML = `
    <div class="shop-option">
      <div class="shop-item">
        <div class="item-effect">+20</div>
      </div>
      <button class="select-option" id="select-option-1">Select</button>
    </div>
    <div class="shop-option">
      <div class="shop-item">
        <div class="item-effect">x2</div>
      </div>
      <button class="select-option" id="select-option-2">Select</button>
    </div>
    <div class="shop-option">
      <div class="shop-item">
        <div class="special-item">
          <div class="item-effect">+40</div>
          <div class="item-tradeoff">
            <div class="stat"><span class="name">Time: </span><span class="value" id="level">5 -> 4</span></div>
          </div>
        </div>
      </div>
      <button class="select-option" id="select-option-3">Select</button>
    </div>
  `;
  bigButton.style.display = "none";

  selectOption1 = document.getElementById("select-option-1");
  selectOption2 = document.getElementById("select-option-2");
  selectOption3 = document.getElementById("select-option-3");

  selectOption1.addEventListener("click", function() { 
    showGameUI(selectedOption.ONE);
  });

  selectOption2.addEventListener("click", function() { 
    showGameUI(selectedOption.TWO);
  });

  selectOption3.addEventListener("click", function() { 
    showGameUI(selectedOption.THREE);
  });
}

function showGameUI(selectedPowerup) {
  if (selectedPowerup == selectedOption.ONE) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">+20</span>
      </div>
    `;
  } else if (selectedPowerup == selectedOption.TWO) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">x2</span>
      </div>
    `;
  } else if (selectedPowerup == selectedOption.THREE) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">+40</span>
      </div>
    `;
  } 

  statsBar.innerHTML = `
    <div>
        <div class="stat"><span class="name">Level: </span><span class="value" id="level">1</span></div><div class="stat last-item"><span class="name">Goal: </span><span class="value" id="goal">3</span></div>
    </div>
    <div class="stat">
        <span class="name">Time: </span><span class="value" id="time">5</span>
    </div>
  `;
  actionArea.innerHTML = `
    <div id="number-area">
        <p id="big-number">0</p>
    </div>
  `;
  bigButton.style.display = "inline-block";

  /*resetGame(2,20,5);*/ // figure out how to integrate this into the html
}  

resetGame(1,10,5); // initiate game
/*resetGame();*/