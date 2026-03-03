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
let numberArea = document.getElementById("number-area");
let scoreStatus;

let powerups = document.getElementById("powerups");

let powerupsArr = ["+1"];
let isFirstPowerup = true;

function resetLevel(currLevel, currGoal, currTime, currIncrement) {
  level = currLevel;
  goal = currGoal;
  time = currTime;
  bigNum = 1;
  increment = currIncrement;

  actionArea.innerHTML = `
    <div id="number-area">
        <p id="big-number">0</p>
    </div>
  `;

  numberArea = document.getElementById("number-area");
  bigNumTxt = document.getElementById("big-number");
  
  levelTxt.innerHTML = level;
  goalTxt.innerHTML = goal;
  timeTxt.innerHTML = time;
  bigNumTxt.innerHTML = bigNum;
  bigNumTxt.style.fontSize = "96px";
  bigButton.innerHTML = "Grow"
  currState = gameState.PLAY;

  startCountdown();
}


//Next step: Add a final victory state (perhaps after lvl7)
function didBeatLevel() {
  if (convertStrWithCommastoNum(goal) <= bigNum) {
    scoreStatus = document.createElement('div');
    scoreStatus.innerHTML=`
      <div class="stat score" id="level-stat">
        <span class="name" id="level-label">Score: </span><span class="value" id="level">${convertNumtoStrWithCommas(bigNum)}</span>
      </div>`;
    document.getElementById("number-area").append(scoreStatus); // figure out why there's extra spacing now
    console.log("scoreStatus: " + scoreStatus.innerHTML); 
    bigNumTxt.style.fontSize = "64px";
    bigNumTxt.style.margin = "0px";
    level++;

    if (level < 8) {
      bigNumTxt.innerHTML = "You win."; 
      bigButton.innerHTML = "Continue";
      clearInterval(timeCountdown);
      currState = gameState.BEATLEVEL;
      goal = convertNumtoStrWithCommas(generateGoal(level));
      time = 5;
    } else {
      bigNumTxt.innerHTML = "Winner."; // Figure out why the text is small after starting over
      bigButton.innerHTML = "Play again";
      clearInterval(timeCountdown);
      currState = gameState.GAMEOVER;
    }
  }
}

// Next step: Add commas to scores, goals, and powerups for better readability; then publish live!
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
      bigNumTxt.innerHTML = convertNumtoStrWithCommas(bigNum);
      didBeatLevel();
    } else if (currState == gameState.GAMEOVER) {
      powerupsArr = ['+1']; // figure how to clear the powerups after the game is over
      powerups.innerHTML = "";
      resetLevel(1,10,5,1);
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
      bigNumTxt.style.margin = "0px";
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
  return level * (10 ** level); // N x 10^n; 10, 200, 3000, 40000
}

// Next step: Think about to visually tweak numbers so that commas don't take up so much space (ie. decrease size of commas or letter spacing)
function generatePowerup(level) {
  let powerupRange;
  let powerup;

  if (getRandomIntInclusive(1,100) > 20) { // 80% chance for additive powerup;
    powerupRange = [10**(level-2),10**(level-1)]; // (1,1), (1,10), (10,100), (100,1000), etc
    powerup = getRandomIntInclusive(powerupRange[0],powerupRange[1]);
    powerup = `+${convertNumtoStrWithCommas(powerup)}`;
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

function convertNumtoStrWithCommas(number) { 
  if (typeof number == "number") {
    return number.toLocaleString('en-US');
  } else {
    return number;
  }
}

function convertStrWithCommastoNum(string) {
  if (typeof string == "string") {
    return Number(string.replaceAll(',', ''));
  } else {
    return string;
  }
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

  let powerUps = [];
  powerUps[0] = powerUp1;
  powerUps[1] = powerUp2;
  powerUps[2] = powerUp3;

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

  let selectOptions = [];
  selectOptions[0] = selectOption1;
  selectOptions[1] = selectOption2;
  selectOptions[2] = selectOption3;

  let holdTimeout;
  const HOLD_DURATION = 250;

  function onHoldComplete(powerup) {
    console.log("Hold action executed!");
    showGameUI(powerup);
  }

  const handleDown = (powerup) => {
    holdTimeout = setTimeout (onHoldComplete, HOLD_DURATION, powerup);
    console.log("Status: Holding...");

  }

  const handleUpOrLeave = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      console.log("Hold action cancelled");
    }
  }


  // function declaration vs expression: https://share.google/aimode/f60tNHPNXoVkx9ULA
  // traditional function vs arrow function: https://share.google/aimode/F4toljeH7CMt77G0R
  /*selectOption1.addEventListener("click", function() { // figure out how to make this hold down mouse along with fill-up animation // https://share.google/aimode/SrxmYWPJSkbYo32cD
    showGameUI(powerUp1);
  });

  selectOption2.addEventListener("click", function() { 
    showGameUI(powerUp2);
  });*/

  /*
  selectOption3.addEventListener("click", function() { 
    showGameUI(powerUp3);
  });*/


  for (let i = 0; i < selectOptions.length; i++) {
    selectOptions[i].addEventListener('mousedown', () => {
      handleDown(powerUps[i]);
    });
    selectOptions[i].addEventListener('touchstart',() => {
      handleDown(powerUps[i]);
    });

    selectOptions[i].addEventListener('mouseup', handleUpOrLeave);
    selectOptions[i].addEventListener('touchend', handleUpOrLeave); // For mobile devices
    selectOptions[i].addEventListener('mouseleave', handleUpOrLeave); // Handle mouse leaving the button while pressed
  }
  
  /*selectOption3.addEventListener('mousedown', () => {
    handleDown(powerUp3);
  });
  selectOption3.addEventListener('touchstart',handleDown); // Next steps: Figure out for mobile

  selectOption3.addEventListener('mouseup', handleUpOrLeave);
  selectOption3.addEventListener('touchend', handleUpOrLeave); // For mobile devices
  selectOption3.addEventListener('mouseleave', handleUpOrLeave); // Handle mouse leaving the button while pressed
  */
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