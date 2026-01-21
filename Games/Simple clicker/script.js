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


//Next step: Add a final victory state (perhaps after lvl7)
function didBeatLevel() {
  if (goal <= bigNum) {
    bigNumTxt.style.fontSize = "64px";
    bigNumTxt.innerHTML = "You win.";
    bigButton.innerHTML = "Continue";
    clearInterval(timeCountdown);
    currState = gameState.BEATLEVEL;
    level++;
    goal = generateGoal(level);
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
      resetLevel(1,10,5,1);
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

function generateGoal(level) {
  return level * (10 ** level); // N x 10^n; 
}

// Next step: Tweak the balance so that it's harder and more satisfying to win
function generatePowerup(level) {
  let powerupRange;
  let powerup;

  if (getRandomIntInclusive(1,100) > 20) { // 80% chance for additive powerup;
    powerupRange = [10**(level-2),10**(level-1)]; // (1,10), (10,100), (100,1000), etc
    powerup = `+${getRandomIntInclusive(powerupRange[0],powerupRange[1])}`;
  } else { // 20% chance for multiplicative powerup
    powerupRange = [level, level+1]; // (2,3), (3,4), etc
    powerup = `x${getRandomIntInclusive(powerupRange[0],powerupRange[1])}`;
  }

  console.log(powerup);
  return powerup; // test this out now
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);   // Ensure min is an integer
  max = Math.floor(max);  // Ensure max is an integer
  // The formula ensures an even distribution across the range, including both min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function showShopUI() {
  levelLabelTxt.innerHTML = "Next Level: ";
  levelTxt.innerHTML = level; 
  goalTxt.innerHTML = goal;

  timeStat.style.display = "none";
  bigButton.style.display = "none";

  let powerUp1 = generatePowerup(level);
  let powerUp2 = generatePowerup(level);
  let powerUp3 = generatePowerup(level);

  actionArea.innerHTML = `
    <div class="shop-option">
      <div class="shop-item">
        <div class="item-effect">${powerUp1}</div>
      </div>
      <button class="select-option" id="select-option-1">Select</button>
    </div>
    <div class="shop-option">
      <div class="shop-item">
        <div class="item-effect">${powerUp2}</div>
      </div>
      <button class="select-option" id="select-option-2">Select</button>
    </div>
    <div class="shop-option">
      <div class="shop-item">
        <div class="item-effect">${powerUp3}</div>
      </div>
      <button class="select-option" id="select-option-3">Select</button>
    </div>
  `;

  /*
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
  */


  selectOption1 = document.getElementById("select-option-1");
  selectOption2 = document.getElementById("select-option-2");
  selectOption3 = document.getElementById("select-option-3");

  selectOption1.addEventListener("click", function() { 
    showGameUI(powerUp1);
  });

  selectOption2.addEventListener("click", function() { 
    showGameUI(powerUp2);
  });

  selectOption3.addEventListener("click", function() { 
    showGameUI(powerUp3);
  });
}

function showGameUI(powerupValue) {
  if (isFirstPowerup) {
    powerupsArr.pop();
    isFirstPowerup = false;
  }

  powerups.innerHTML += `
    <div class="stat">
        <span class="value">${powerupValue}</span>
    </div>
  `;
  powerupsArr.push(powerupValue); 

  
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

resetLevel(1,10,5,1); // initiate game