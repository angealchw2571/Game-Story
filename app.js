//? dice rolling
const diceRolling = () => {
  // for (i=0; i<10;i++){
  diceRollNum = Math.ceil(Math.random() * 6);
  // console.log(diceRollNum);
  $(".dicePanel").text(diceRollNum);
  // };
}

//? dice animation
const diceAnimation = () => {
    const myInterval = setInterval(diceRolling, 15);
    setTimeout(() => {clearInterval(myInterval)}, 1500)
}

//? creates new h1 for gameTexts
const gameTextDisplay = (currentRoomID) => {
  $("article").empty()
  const newh1 = $("<h1>").text(currentRoomID.gameText).addClass("gameText").css("display", "none");
  $("article").append(newh1);
  // $("h1").text(nextRoomID.gameText).css("display", "none");
}

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
    const createNewBtn = $("<button>").addClass("button").text(nextBtnText).css("display", "none");
    if (currentRoomID.buttons[i].hasOwnProperty("requireItem") === false) {
      //! if it doesn't require items, it will print the button
      // createNewBtn.attr("onclick", "RoomDetails(" + subsequentRoomID + ")");
      createNewBtn.click(() => RoomDetails(subsequentRoomID));
      $("article").append(createNewBtn);
    } else if (
      currentRoomID.buttons[i].hasOwnProperty("requireItem") &&
      backpack.includes(currentRoomID.buttons[i].requireItem)
    ) {
      //! it requires items and you have the item in backpack
      // createNewBtn.attr("onclick", "RoomDetails(" + subsequentRoomID + ")");
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
    const diceButton = $("<button>").addClass("button").append("Roll Dice").css("display", "none");
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




//! ============ Battle Stuff ===============================================

const battle = (currentRoomID) => {
  const battleCheck = currentRoomID.hasOwnProperty("battle");
  if (battleCheck === true) {
    $(".backpack").fadeOut(1000);
    const newDiv = $("<div>").addClass("battle").text("Player").css("display", "none")
      for (i=0; i<Object.keys(playerStats).length ;i++) {
    const newList = $("<p>").addClass("playerHP").text(Object.keys(playerStats)[i]+ " : " + Object.values(playerStats)[i]);
    newDiv.append(newList) 
    }
    $(".container").append(newDiv)
    $(".battle").fadeIn(4000)
  }
};


const damageCalculation = () => {
  const currentATK = playerStats.ATK
  const currentDEF = playerStats.DEF;
  const randomMultiplier = Math.random() * 0.3
  console.log(Math.random())
  let calculateDMG = Math.ceil(currentATK * (randomMultiplier))
  const calculateDEFmitigation = Math.floor(currentDEF*0.2)
  if ((calculateDEFmitigation) > calculateDMG){
    const newMultiplier = Math.random() * 0.3
    const newDMG = Math.ceil(currentATK * (newMultiplier))
    calculateDMG = newDMG
  }
  const totalDMG  = calculateDMG - calculateDEFmitigation;
  console.log(totalDMG)
  return totalDMG
}

battleCalculation = () => {
  const currentHP = playerStats.HP
  const newHP = currentHP - damageCalculation()
  console.log(newHP)
}

// battleCalculation()




const RoomDetails = (getRoomID) => {
  const nextRoomID = gameData.find((element) => element.roomID === getRoomID);
  //! checks if room ID = 1 and reset the game
  resetGame(nextRoomID);

  //! remove old buttons
  removeButtons();

  //! grabs the RoomID and appends the Text box
  gameTextDisplay(nextRoomID)

  //! if there are any dice mechanism, remove them
  removeDiceStuff();

  //! checks if there are items available in the room and adds them into the backpack array
  addItemToBackpack(nextRoomID);

  //! checks if there are items needs to be removed and updates the backpack
  removeItemFromBackpack(nextRoomID);

  //! checks if there new buttons and appends them
  buttonPrinter(nextRoomID);

  //! checks if dice mechanism is required
  dicePrinter(nextRoomID);

  //! adds backpack to website
  backpackDisplay();

  //! battle
  battle(nextRoomID)


  console.log(nextRoomID.roomID);
  // $("article").css("display", "none")
  // $("article").fadeIn(3000)
  $("h1").fadeIn(2000);
  $("button").fadeIn(4000);
  $(".dicePanel").fadeIn(8000);

};

const main = () => {};

$(main);
