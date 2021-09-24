//? dice rolling
const diceRolling = () => {
  diceRollNum = Math.ceil(Math.random() * 6);
  $(".dicePanel").text(diceRollNum);
};

//? dice animation
const diceAnimation = () => {
  const myInterval = setInterval(diceRolling, 15);
  setTimeout(() => {
    clearInterval(myInterval);
  }, 1500);
};

//? creates new h1 for gameTexts
const gameTextDisplay = (currentRoomID) => {
  $("article").empty();
  const newh1 = $("<h1>")
    .text(currentRoomID.gameText)
    .addClass("gameText")
    .css("display", "none");
  $("article").append(newh1);
  // $("h1").text(nextRoomID.gameText).css("display", "none");
};

//? if there are old buttons, remove all buttons
const removeButtons = () => {
  const removingButtonList = $("button");
  for (i = 0; i < removingButtonList.length; i++) {
    $(".button").remove();
  }
};

//? remove items with class of dice
const removeDiceStuff = () => {
  const removingDice = $(".dice");
  for (i = 0; i < removingDice.length; i++) {
    $(".dice").remove();
  }
};

//? if RoomID = 1 reset the game
const resetGame = (currentRoomID) => {
  if (currentRoomID.roomID === 1) {
    backpack = [];
    playerStats.HP = 100;
    enemyStats.HP = 500;
  }
};

//? add items if room has an item key-pair value
const addItemToBackpack = (currentRoomID) => {
  const itemCheck = currentRoomID.hasOwnProperty("item");
  if (itemCheck === true) {
    backpack.push(currentRoomID.item);
    $(".backpack").fadeIn(3000);
  }
};

//? remove items from backpack if room has an removeItem key-pair value
const removeItemFromBackpack = (currentRoomID) => {
  const itemRemoval = currentRoomID.hasOwnProperty("itemRemove");
  if (itemRemoval === true) {
    const itemToBeRemoved = currentRoomID.itemRemove;
    const resultBackpack = backpack.filter((item) => item !== itemToBeRemoved);
    backpack = resultBackpack;
  }
};

//? prints button based on conditionals
const buttonPrinter = (currentRoomID) => {
  for (i = 0; i < currentRoomID.buttons.length; i++) {
    const nextBtnText = currentRoomID.buttons[i].text;
    const subsequentRoomID = currentRoomID.buttons[i].returnValue;
    const createNewBtn = $("<button>")
      .addClass("button")
      .text(nextBtnText)
      .css("display", "none");
    if (currentRoomID.buttons[i].hasOwnProperty("requireItem") === false) {
      //! if it doesn't require items, it will print the button
      createNewBtn.click(() => RoomDetails(subsequentRoomID));
      $("article").append(createNewBtn);
    } else if (
      currentRoomID.buttons[i].hasOwnProperty("requireItem") &&
      backpack.includes(currentRoomID.buttons[i].requireItem)
    ) {
      //! it requires items and you have the item in backpack
      createNewBtn.click(() => RoomDetails(subsequentRoomID));
      $("article").append(createNewBtn);
    }
  }
};
//? prints the dice mechanism if required
const dicePrinter = (currentRoomID) => {
  const diceCheck = currentRoomID.hasOwnProperty("dice");
  if (diceCheck === true) {
    const diceDiv = $("<div>").addClass("dice");
    const dicePanel = $("<div>")
      .addClass("dicePanel dice")
      .text("0")
      .css("display", "none");
    const diceButton = $("<button>")
      .addClass("button")
      .append("Roll Dice")
      .css("display", "none");
    // diceButton.attr("onclick", "diceRolling()");
    // diceButton.click(() => diceRolling());
    diceButton.click(() => diceAnimation());
    diceDiv.append(dicePanel);
    diceDiv.append(diceButton);
    $("article").append(diceDiv);
  }
};
//? adds the backpack on screen
const backpackDisplay = () => {
  $(".backpackList").empty();
  for (i = 0; i < backpack.length; i++) {
    const newList = $("<li>").addClass("backpackItems").text(backpack[i]);
    $(".backpackList").append(newList);
  }
};

//? if there are battlestuff, remove them
const removeAllBattle = () => {
  $(".player").remove();
  $(".enemy").remove();
};

//! ======================================== Battle Stuff ===============================================

const printBattleBtn = (currentRoomID) => {
  // const nextRoomID = gameData.find((element) => element.roomID === getRoomID);
  // const nextBtnText = currentRoomID.battleBtn[i].text
  // const createNewBtn = $("<button>").addClass("button").text(nextBtnText);
  // for (i = 0; i < currentRoomID.battleBtn.length; i++) {
  const nextBtnText = currentRoomID.battleBtn[0].text;
  const nextBtnText2 = currentRoomID.battleBtn[1].text;
  const createNewBtn = $("<button>")
    .addClass("button")
    .text(nextBtnText)
    .css("display", "none");
  const createNewBtn2 = $("<button>")
    .addClass("button")
    .text(nextBtnText2)
    .css("display", "none");
  createNewBtn.click(() => statsUpdaterPlayer());
  createNewBtn2.click(() => statsUpdaterEnemy());
  $(".first").append(createNewBtn2, $(".button"));
  $(".first").append(createNewBtn, $(".button"));

  // }
};

//! check if the room is a battle scene, removes the backpack and appends the player stats box and battle buttons.
const battle = (currentRoomID) => {
  const battleCheck = currentRoomID.hasOwnProperty("battle");
  if (battleCheck === true) {
    $(".backpack").fadeOut(1000);
    const newDiv = $("<div>")
      .addClass("player")
      .text("Player")
      .css("display", "none");
    for (i = 0; i < Object.keys(playerStats).length; i++) {
      const newList = $("<p>")
        .addClass("playerHP")
        .text(
          Object.keys(playerStats)[i] + " : " + Object.values(playerStats)[i]
        );
      newDiv.append(newList);
    }
    printBattleBtn(currentRoomID);

    //*  ================= enemy stuff =============================
    const newDiv2 = $("<div>")
      .addClass("enemy")
      .text("Enemy")
      .css("display", "none");
    for (i = 0; i < Object.keys(playerStats).length; i++) {
      const newEnemyList = $("<p>")
        .addClass("EnemyHP")
        .text(
          Object.keys(enemyStats)[i] + " : " + Object.values(enemyStats)[i]
        );
      newDiv2.append(newEnemyList);

      $(".container").append(newDiv);
      $(".container").append(newDiv2);
      $(".player").fadeIn(4000);
      $(".enemy").fadeIn(4000);
    }
  }
};

//! Calculate DMG based on stats
const damageCalculation = (playerStats, enemyStats) => {
  const currentATK = playerStats.ATK;
  const currentDEF = enemyStats.DEF;
  const randomMultiplier = Math.random() * 0.3;
  // console.log(Math.random())
  let calculateDMG = Math.ceil(currentATK * randomMultiplier);
  const calculateDEFmitigation = Math.floor(currentDEF * 0.2);
  if (calculateDEFmitigation > calculateDMG) {
    const newMultiplier = Math.random() * 0.3;
    const newDMG = Math.ceil(currentATK * newMultiplier);
    calculateDMG = newDMG;
  }
  const totalDMG = calculateDMG - calculateDEFmitigation;
  // console.log(totalDMG)
  return totalDMG;
};
//! calculate new HP after taking Damage
const battleCalculationEnemy = (playerStats, enemyStats) => {
  const currentHP = enemyStats.HP;
  const newHP = currentHP + damageCalculation(playerStats, enemyStats);
  return newHP;
};
const battleCalculationPlayer = (playerStats, enemyStats) => {
  const currentHP = playerStats.HP;
  const newHP = currentHP + damageCalculation(playerStats, enemyStats);
  return newHP;
};
//! if HP < 1 reset the game, HP = 100
const HPchecker = () => {
  if (playerStats.HP < 1) {
    console.log("you lose");
    RoomDetails(997);
    resetGame(1);
  } else if (enemyStats.HP < 1) {
    console.log("you win");
    RoomDetails(996);
    resetGame(1);
  }
};

//! updates HP and prints it on the screen
const statsUpdaterEnemy = () => {
  HPchecker();
  $(".enemy").remove();
  enemyStats.HP = battleCalculationEnemy(playerStats, enemyStats);
  const newDiv2 = $("<div>").addClass("enemy").text("Enemy");
  for (i = 0; i < Object.keys(enemyStats).length; i++) {
    const newList = $("<p>")
      .addClass("enemyHP")
      .text(Object.keys(enemyStats)[i] + " : " + Object.values(enemyStats)[i]);
    newDiv2.append(newList);
  }
  $(".container").append(newDiv2);
  HPchecker();
};

const statsUpdaterPlayer = () => {
  HPchecker();
  $(".player").remove();
  playerStats.HP = battleCalculationPlayer(playerStats, enemyStats);
  const newDiv = $("<div>").addClass("player").text("Player");
  for (i = 0; i < Object.keys(playerStats).length; i++) {
    const newList = $("<p>")
      .addClass("playerHP")
      .text(
        Object.keys(playerStats)[i] + " : " + Object.values(playerStats)[i]
      );
    newDiv.append(newList);
  }
  $(".container").append(newDiv);
  HPchecker();
};

const removeStuff = (nextRoomID) => {
  //! removes all battle stuff if present
  removeAllBattle();

  //! remove old buttons
  removeButtons();  
  
  //! if there are any dice mechanism, remove them
  removeDiceStuff();

//! checks if there are items needs to be removed and updates the backpack
  removeItemFromBackpack(nextRoomID);

}


const RoomDetails = (getRoomID) => {
  const nextRoomID = gameData.find((element) => element.roomID === getRoomID);
  //! checks if room ID = 1 and reset the game
  resetGame(nextRoomID);

  //! removes stuff
  removeStuff(nextRoomID);

  //! grabs the RoomID and appends the Text box
  gameTextDisplay(nextRoomID);

  //! checks if there are items available in the room and adds them into the backpack array
  addItemToBackpack(nextRoomID);

  //! checks if there new buttons and appends them
  buttonPrinter(nextRoomID);

  //! checks if dice mechanism is required
  dicePrinter(nextRoomID);

  //! adds backpack to website
  backpackDisplay();

  //! battle
  battle(nextRoomID);

  console.log(nextRoomID.roomID);
  $("h1").fadeIn(2000);
  $("button").fadeIn(4000);
  $(".dicePanel").fadeIn(8000);
};

const main = () => {};

$(main);
