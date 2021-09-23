const playerStats = {
    health: 100,
    strength: 50,
    items: ["sword", "key" ]
}

//! input ---> function ---> output
const act1FrontDoor = () => {
    //! create new div for articles
    const newDivAct1s2 = $('<div>').addClass('wolves')
    const newArticleAct1s2 = $('<article>').addClass('wolves')
    const newHeaderAct1s2 = $('<h1>').addClass('wolves').text('The Starving Wolves')
    const newText = $('<p>').addClass('wolves').text("The wolves stands before you, it ferousciously wants to eat you.. You have no choice but to fight.")
    const newFightButton = $('<button>').addClass('wolves').text('fight')
    newArticleAct1s2.append(newHeaderAct1s2).append(newText).append(newFightButton)
    newDivAct1s2.append(newArticleAct1s2)
    $('body').append(newDivAct1s2)
    //! delete previous div of "start"
    $('.start').remove();
}

const act1BackDoor = () => {
    //! create new div for articles
    const newDivAct1s2 = $('<div>').addClass('trail')
    const newArticleAct1s2 = $('<article>').addClass('trail')
    const newHeaderAct1s2 = $('<h1>').addClass('trail').text('The Trail')
    const newText = $('<p>').addClass('trail').text("The long trail path is long and dark. Luckily you brought a lamp for your journey")
    const newText2 = $('<p>').addClass('trail').text("As you walked down the path, you notice a diary on the side.")
    const newText3 = $('<p>').addClass('trail').text("Will you pick it up?")
    const newYesButton = $('<button>').addClass('trail').text('Yes')
    const newNoButton = $('<button>').addClass('trail').text('No')
    newArticleAct1s2.append(newHeaderAct1s2).append(newText).append(newText2).append(newText3)
    newDivAct1s2.append(newArticleAct1s2).append(newYesButton).append(newNoButton)
    $('body').append(newDivAct1s2)
    //! delete previous div of "start"
    $('.start').remove();
}

const fight = () => {
    //! create new div for articles
    const newDivAct1s3 = $('<div>').addClass('fight')
    const newArticleAct1s3 = $('<article>').addClass('fight')
    const newHeaderAct1s3 = $('<h1>').addClass('fight').text('The Fight')
    const newText = $('<p>').addClass('fight').text("The Wolves stare at you watching your every move")
    const newText2 = $('<p>').addClass('fight').text("You lunge forward, striking hard on the first wolf. However another pack of wolves surround you from behind. You're trapped.")
    const newText3 = $('<p>').addClass('fight').text("Roll the dice to see if you were lucky.")
    newDivAct1s3.append(newArticleAct1s3).append(newHeaderAct1s3).append(newText).append(newText2).append(newText3)
    $('body').append(newDivAct1s3)
    //! delete previous div of "start"
    $('.wolves').remove();
}





const main = () =>{



$(document).on('click','.frontdoor', () => {
    act1FrontDoor()  
});

$(document).on('click', '.backdoor', () => {
    act1BackDoor()
});



$(document).on('click', '.wolves', () => { 
    console.log("button working")
    fight()    

});




}
$(main)