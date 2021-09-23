const CHOCOLATE = "chocolate";
const VIALS = "vials of solution";
let backpack = [CHOCOLATE, "maggie mee", "yogurt", "curry"];
let playerStats = { HP: 100, ATK: 50, DEF: 25 };
let enemyStats = { HP: 500, ATK: 50, DEF: 100 };
const gameData = [
  {
    roomID: 1,
    gameText: "The Wandering Forest",
    buttons: [{ text: "Start Game", returnValue: 2 }],
  },
  {
    roomID: 2,
    gameText:
      "Welcome to The Wandering Forest... You're an adventurer in the lands of Torag, a small coastal town where the population barely exceeds 300 men. You were on a quest to find your father, after his written note before he mysteriously disappeared.  ",
    buttons: [
      { text: "Continue", returnValue: 3 },
      { text: "Battle", returnValue: 888 },
    ],
  },
  {
    roomID: 3,
    gameText:
      "You wake up in an unfamiliar hut, head throbbing from a bump behind your head. Trying to compose yourself, you scan your surroundings to notice some vials of liquid on the cupboard and a wooden back door. Suddenly you remember what happened: You were ambushed by bandits just shortly after you left town. You notice that someone is coming.  ",
    buttons: [
      { text: "Lie down and pretend to be asleep", returnValue: 4 },
      { text: "Grab your belongings and bolt to the backdoor", returnValue: 5 },
    ],
    itemRemove: "chocolate",
  },
  {
    roomID: 4,
    gameText:
      "A big bearded man enters, carrying a big wooden barrel over his shoulder. He notices that you are still asleep. He walks over across the room to grab an axe on the table. Unaware, a rat drops from the ceiling and onto your arm. Roll the dice. If you land on an even number, you managed to keep calm and stay completely still. If you land on an odd number, you freak out as the rat bites on your finger.",
    buttons: [
      { text: "Even Number", returnValue: 6 },
      { text: "Odd Number", returnValue: 7 },
    ],
    dice: true,
    itemRemove: "curry",
  },
  {
    roomID: 5,
    gameText:
      "You successfully escaped. You dash into the open forest, while you hear shoutings of the man from behind. You can't make out exactly what he was saying but keywords such as 'tree', 'dark', 'avoid'...  ",
    buttons: [{ text: "continue", returnValue: 12 }],
  },
  {
    roomID: 6,
    gameText:
      "Your heart races as it crawls up to your chest, but the fear ironically freezes you in place. The man also notices the rat that had fallen on to your hand. He drops his axe and runs for the door. After a minute of silence, you get up and check if he is outside but he is nowhere to be found. Do you want to explore the vials you saw earlier, or leave the hut.",
    buttons: [
      { text: "Vials", returnValue: 8 },
      { text: "Leave", returnValue: 5 },
    ],
  },
  {
    roomID: 7,
    gameText:
      "You leap out of the bed, throwing the blanket on the big bearded man, covering his eyes. You take this chance to grab your belongings and decide to run for the front door. The man waves his axe in a frenzy, but you managed to dodge his swings. In the confusion, you stand beside the cupboard of vials, do you want to take them? ",
    buttons: [
      { text: "Take them", returnValue: 9 },
      { text: "Leave them", returnValue: 19 },
    ],
  },
  {
    roomID: 8,
    gameText:
      "As you pick them up, the solution in the vial starts to bubble and overflow, spilling on to your hand. The vials were not supposed to be agitated. Your hand starts burning and you drop the vial on the floor. Roll the dice to test your luck.",
    buttons: [
      { text: "Even", returnValue: 10 },
      { text: "Odd", returnValue: 11 },
    ],
    dice: true,
  },
  {
    roomID: 9,
    gameText:
      "You cap the vials and swiftly put them into your backpack. Unfortunately, you were cornered towards the back of the hut, you decide to escape through the backdoor instead.",
    buttons: [{ text: "continue", returnValue: 5 }],
    item: VIALS,
  },
  {
    roomID: 10,
    gameText:
      "The pain from the solution reacting with your skin is unbearable, it burns deep into your hand while you wail in pain. It slowly spreads up your arm and the pain is excruciating. The big bearded man enters to see you collapsing on the ground, silently watching you die. ",
    buttons: [{ text: "Continue", returnValue: 999 }],
  },
  {
    roomID: 11,
    gameText:
      "You notice a secondary vial labelled: 'use if spill'. You decide to pour the solution in the secondry vial on your hand. The reaction on your skin continued to eat away your flesh. The 2nd solution did not help. You hear the man coming back...",
    buttons: [{ text: "continue", returnValue: 20 }],
  },
  {
    roomID: 12,
    gameText:
      "The trees of the forest are unsually tall, with huge branches and leaves overarching and overlapping each other. The sunlight struggles to light up the path as you journey across the uneven terrain. You spot a trail that is recently traversed with freshly imprinted footprints. Do you want to follow trail or leave the trail?",
    buttons: [
      { text: "Follow the trail", returnValue: 13 },
      { text: "Leave the trail", returnValue: 14 },
    ],
  },
  {
    roomID: 13,
    gameText:
      "You walk cautiously behind the trail, making as little noise as possible while trying to catch up. You finally managed to take a peek as to who was in front, you notice a soldier carrying a body. The body had various bite marks, deep into the flesh. 'WHO ARE YOU AND WHAT ARE YOU DOING HERE?'",
    buttons: [{ text: "continue", returnValue: 15 }],
  },
  {
    roomID: 14,
    gameText:
      "You walk away from the dedicated path. You notice a diary on the ground.",
    buttons: [
      { text: "Pick it up", returnValue: 26 },
      { text: "Leave it", returnValue: 25 },
    ],
  },
  {
    roomID: 15,
    gameText:
      "Shocked, you turn around to see 3 soldiers pointing their crossbows at you. 'You are wearing the clothes of an outsider! Have you come to curse the town?!' Roll the dice. ",
    buttons: [
      { text: "1, 4, 6", returnValue: 16 },
      { text: "2, 3, 5", returnValue: 17 },
    ],
    dice: true,
  },
  {
    roomID: 16,
    gameText:
      "You frantically explain that you were just an adventurer and you got lost in the forest. You were just looking for water and food. The soldiers seemed skeptical of your answer. They ask for proof of your adventures.",
    buttons: [
      { text: "Tell them about you waking in a strange hut", returnValue: 18 },
      {
        text: "Show them the vials that you took",
        returnValue: 21,
        requireItem: VIALS,
      },
    ],
  },
  {
    roomID: 17,
    gameText:
      "You panic and get up, shoving the soldiers aside and running into the woods. The soldiers start firing arrows towards you. One of the arrows pierce through your leg. ",
    buttons: [{ text: "continue", returnValue: 25 }],
  },
  {
    roomID: 18,
    gameText:
      "You explained what happened to the soliders, that you were an adventurer looking for his father and was ambushed by bandits along the way. The soldiers grow ever more suspicious about your story. As you finish your story, one of the soldiers told you that many others have said what you said. They were all bandits in disguise. The soldiers draw their crossbows at you and fire them, killing you in the process. ",
    buttons: [{ text: "continue", returnValue: 999 }],
  },
  {
    roomID: 19,
    gameText:
      "The man ferociously swings his axe, chopping the wooden table and the wooden bed frame. You see an opportunity and you kick his knee. He collapses in pain as you run straight for the backdoor.",
    buttons: [{ text: "continue", returnValue: 5 }],
  },
  {
    roomID: 20,
    gameText:
      "You make a dash for the back door, running into the forest. But the pain from your hand is unbearable, and its spreading up your arms. You collapse and gasp for air, suffocating to death...",
    buttons: [{ text: "continue", returnValue: 999 }],
  },
  {
    roomID: 21,
    gameText:
      "You show the vials to the soldiers. The soldiers exclaim this is the antidote for the recent plague that has overwhelmed the town! They questioned you about where you found them and you explained.",
    buttons: [{ text: "continue", returnValue: 22 }],
    itemRemove: VIALS,
  },
  {
    roomID: 22,
    gameText:
      "The soldiers bring you back into the town and present the antidote to the King. The King is very pleased that the town is saved. He asks if you have any wish or desires that he may grant.",
    buttons: [
      { text: "Tell him about your missing father ", returnValue: 23 },
      { text: "Tell him you would like to leave", returnValue: 24 },
    ],
  },
  {
    roomID: 23,
    gameText:
      "As you explain your story, the King hears your request. He decides to grant you a 10 of his elite guards to join you in your quest. He shares to you that your father might be at the Castle of Dorynvia, where rumours of black magic is practiced and is the origin of the plague.",
    buttons: [{ text: "continue", returnValue: 25 }],
  },
  {
    roomID: 24,
    gameText:
      "The King understands and directs his men to see you out. He gifts a horse for your adventures and also equip you with a sharpened sword for your adventures.",
    buttons: [{ text: "continue", returnValue: 25 }],
  },
  {
    roomID: 25,
    gameText: "To be continued...",
    buttons: [{ text: "Return", returnValue: 1 }],
  },
  {
    roomID: 26,
    gameText:
      "You picked up the diary and open to read the contents. You realised this is a diary of a woman used to live in Torag, and she was outcasted as a witch for her knowledge of spells. ",
    buttons: [{ text: "Return", returnValue: 25 }],
    item: "diary",
  },
  {
    roomID: 888,
    gameText: "You fight the enemy",
    buttons: [],
    battleBtn: [{ text: "Attack!!!" }, { text: "Attack the enemy!" }],
    battle: true,
  },
  {
    roomID: 996,
    gameText: "You Win",
    buttons: [{ text: "Restart", returnValue: 1 }],
  },
  {
    roomID: 997,
    gameText: "You Died",
    buttons: [{ text: "Restart", returnValue: 999 }],
  },
  {
    roomID: 998,
    gameText: "Credits - Angeal Cheong",
    buttons: [{ text: "Return to main screen", returnValue: 1 }],
  },
  {
    roomID: 999,
    gameText: "Would you like to try again?",
    buttons: [
      { text: "Yes", returnValue: 1 },
      { text: "No", returnValue: 998 },
    ],
  },
];
