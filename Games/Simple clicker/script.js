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

let levelStat = document.getElementById("level-stat");
let goalStat = document.getElementById("goal-stat");
let timeStat = document.getElementById("time-stat");

let levelLabelTxt = document.getElementById("level-label");
let timeLabelTxt = document.getElementById("time-label");
let levelTxt = document.getElementById("level");
let goalTxt = document.getElementById("goal");
let timeTxt = document.getElementById("time");

let bigButton = document.getElementById("big-button");
let bigNumTxt = document.getElementById("big-number");

let statsBar = document.getElementById("stats-bar");
let actionArea = document.getElementById("action-area");

let powerups = document.getElementById("powerups");

let selectOption1;
let selectOption2;
let selectOption3;

let increment;

const powerupsArr = [];

function resetLevel(currLevel, currGoal, currTime, currIncrement) {
  level = currLevel;
  goal = currGoal;
  time = currTime;
  bigNum = 1;
  increment = currIncrement;
  
  levelTxt.innerHTML = level;
  goalTxt.innerHTML = goal;
  timeTxt.innerHTML = time;
  bigNumTxt.innerHTML = bigNum;
  bigButton.innerHTML = "Grow"
  currState = gameState.PLAY;

  startCountdown();
}

function didBeatLevel() {
  if (goal <= bigNum) {
    bigNumTxt.style.fontSize = "64px";
    bigNumTxt.innerHTML = "You win.";
    bigButton.innerHTML = "Continue";
    clearInterval(timeCountdown);
    currState = gameState.BEATLEVEL;
    level++;
    goal *= 10;
    time = 5;
  }
}

// Note: Try the 3d button for a more tactile feel, aka the pomofocus button
bigButton.addEventListener("click", function() { 
    if (currState == gameState.PLAY) {
      bigNum += increment;
      bigNumTxt.innerHTML = bigNum;
      didBeatLevel();
    } else if (currState == gameState.GAMEOVER) {
      resetLevel(1,3,5,1);
      powerups.innerHTML = "";
    } else if (currState == gameState.BEATLEVEL) {
      showShopUI(); 
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
  levelLabelTxt.innerHTML = "Next Level: ";
  levelTxt.innerHTML = level; 
  goalTxt.innerHTML = goal;

  timeStat.style.display = "none";
  bigButton.style.display = "none";

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
    increment += 20;
    console.log("increment is " + increment);
  } else if (selectedPowerup == selectedOption.TWO) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">x2</span>
      </div>
    `;
    increment *= 2; //figure out how to make x2 apply to current number; does this feel intuitive in the first place?
    //need to use an array to iterate through the powerups and apply them to current score - https://share.google/aimode/LHPv3NiEMV4Z17HOv
    console.log("increment is " + increment);
  } else if (selectedPowerup == selectedOption.THREE) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">+40</span>
      </div>
    `;
    increment += 40;
    time = 4;
    console.log("increment is " + increment);
  } 


  statsBar.innerHTML = '<div><div class="stat"><span class="name">Level: </span><span class="value" id="level">' + level + '</span></div><div class="stat last-item"><span class="name">Goal: </span><span class="value" id="goal">' + goal + '</span></div></div><div class="stat"><span class="name">Time: </span><span class="value" id="time">' + time + '</span></div>';
  actionArea.innerHTML = `
    <div id="number-area">
        <p id="big-number">0</p>
    </div>
  `;
  bigButton.style.display = "inline-block"; 

  levelTxt = document.getElementById("level");
  goalTxt = document.getElementById("goal");
  timeTxt = document.getElementById("time");

  bigButton = document.getElementById("big-button");
  bigNumTxt = document.getElementById("big-number");

  resetLevel(level, goal, time, increment);
}  

resetLevel(1,3,5,1); // initiate game