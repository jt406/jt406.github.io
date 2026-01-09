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

let powerupsArr = ["+1"];
let isFirstPowerup = true;

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
bigButton.addEventListener("click", function() { // Next time, test to see if this works; also integrate the score variable throughout code
    if (currState == gameState.PLAY) {
      for (let i=0; i < powerupsArr.length; i++) { // Now need to update the array with new powerups
        if (powerupsArr[i].charAt(0) == "+") {
          increment = parseInt(powerupsArr[i].substring(1,powerupsArr[i].length));
          bigNum = bigNum + increment;
        } else if (powerupsArr[i].charAt(0) == "x") {
          increment = parseInt(powerupsArr[i].substring(1,powerupsArr[i].length));
          bigNum = bigNum * increment;
        } else {
          console.log("Something weird happened with updating the score."); 
        }
      }
      bigNumTxt.innerHTML = bigNum;
      didBeatLevel();
    } else if (currState == gameState.GAMEOVER) {
      resetLevel(1,3,5,1);
      powerupsArr = ['+1']; // figure how to clear the powerups after the game is over
      console.log(`powerupsArr: ${powerupsArr}`);
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

function generateRandomItems(level) {
  // 1) Think about how to determine random items for each level 2) Think about how to implement it
  // level 2: basic: add 10 or 20, mult 2x or 3x, curse: add 30 or 40, multiply 4x or 5x
  // level 3: basic:  
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
  if (isFirstPowerup) {
    powerupsArr.pop();
    isFirstPowerup = false;
  }


  if (selectedPowerup == selectedOption.ONE) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">+20</span>
      </div>
    `;
    powerupsArr.push('+20'); 
  } else if (selectedPowerup == selectedOption.TWO) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">x2</span>
      </div>
    `;
    powerupsArr.push('x2');
  } else if (selectedPowerup == selectedOption.THREE) {
    powerups.innerHTML += `
      <div class="stat">
          <span class="value">+40</span>
      </div>
    `;
    powerupsArr.push('+40');
    time = 4;
  } 

  
  actionArea.innerHTML = `
    <div id="number-area">
        <p id="big-number">0</p>
    </div>
  `;
  bigButton.style.display = "inline-block"; 
  timeStat.style.display = "inline-block";
  timeTxt.innerHTML = time; 
  levelLabelTxt.innerHTML = "Level: ";

  levelTxt = document.getElementById("level");
  goalTxt = document.getElementById("goal");
  timeTxt = document.getElementById("time");

  bigButton = document.getElementById("big-button");
  bigNumTxt = document.getElementById("big-number");

  resetLevel(level, goal, time, increment);
}  

resetLevel(1,3,5,1); // initiate game