/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores;
var roundScore;
var activePlayer;
var diceDOM;
var player1CurrentScoreDOM;
var player2CurrentScoreDOM;
var player1HoldedScoreDOM;
var player2HoldedScoreDOM;

roundScore = 0;
scores = [0, 0]; // index [0] for player 1, [1] for player 2
activePlayer = 0; // 0 for player 1, 1 for player 2
diceDOM = document.getElementsByClassName('dice')[0];
player1CurrentScoreDOM = document.getElementById('current-0');
player2CurrentScoreDOM = document.getElementById('current-1');
player1HoldedScoreDOM = document.getElementById('score-0');
player2HoldedScoreDOM = document.getElementById('score-1');
// The document.querySelector() select the first elemenet that matches a specified CSS selectors in the document
// to select the class we use the dot symbo
// document.querySelector('.dice').style.display = 'none';

// when we just open the webpage, no new game is there, we want to hide the dice
// we also want to make sure all the scores is set to 0 when we open the webpage
// document.getElementsByClassName('dice')[0].style.display = 'none';
// --> Initial settings to reset all value of the web page to it's default state
diceDOM.style.display = 'none';
player1CurrentScoreDOM.textContent = 0 + "";
player2CurrentScoreDOM.textContent = 0 + "";
player1HoldedScoreDOM.textContent = scores[0].toString();
player2HoldedScoreDOM.textContent = scores[1].toString();

// refresh current scoreboard to set it to 0
refreshSavedScoreBoard();

// This is to handle the button onclick for the "New game" button
/* When this button is clicked, we want to reset the page to new game state
 * we also wanto to display the dice button to indicate the game is started
 */
document.getElementsByClassName('btn-new')[0].onclick = newGameOnClick;

// Set Onclick for hold button
document.getElementsByClassName('btn-hold')[0].addEventListener('click', onHoldButtonPress);

function newGameOnClick() {
    // This line reset the button to its default value in HTML
    // document.getElementsByClassName('dice')[0].style.display = 'inital';
    // However, I want to explicity set it to block, which is visible in JS at
    // front in JS
    if (diceDOM.style.display === 'none') diceDOM.style.display = 'block';
    // we should also reset all scores when this button is clicked
    scores[0] = 0;
    scores[1] = 0;
    roundScore = 0;
    activePlayer = 0;
    refreshSavedScoreBoard();
}

// ********************************************************
// Add an event listener to the "btn-roll" roll button
// -> 1st by add event listner way, and we supply the callback via anom function
document.getElementsByClassName('btn-roll')[0].addEventListener('click', () => {
    // specify what the button on click do

    /* first we check if the dice img is visible, since if the dice image can 
     * only be visible if a new game is started, and if a new game is not started
     * then it does not make any sense for the button to be able to generate
     * random numbers.
     */
    if (diceDOM.style.display !== 'none') {
        // generate the random number [1 --- 6]
        let dice = Math.floor(Math.random() * 6 + 1);
        // update the active player current score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
        // since dice dom is a img tag using source, we can simply change the src
        // to show new pictures of the dice to reflect the number
        switch (dice) {
            case 1:
                diceDOM.src = 'dice-1.png';
                // In the case of that the current player rolled a number == 1
                // then the current player lose all the unsaved points and hand
                // the round to a different player
                changePlayerAndResetCurrentScore();
                break;
            case 2:
                diceDOM.src = 'dice-2.png';
                break;
            case 3:
                diceDOM.src = 'dice-3.png';
                break;
            case 4:
                diceDOM.src = 'dice-4.png';
                break;
            case 5:
                diceDOM.src = 'dice-5.png';
                break;
            case 6:
                diceDOM.src = 'dice-6.png';
                break;
            default:
                console.log("dice pic error");
        }
    }
});

function changePlayerAndResetCurrentScore() {
    resetRoundScore();
    activePlayer = activePlayer ? 0 : 1;
}

/* 
 * This function resets the current player's score to 0
 */
function resetRoundScore() {
    roundScore = 0;
    if (activePlayer === 0) {
        player1CurrentScoreDOM.innerHTML = roundScore + "";
    } else {
        player2CurrentScoreDOM.textContent = roundScore + "";
    }
}

/* 
 * This fucntion will save the current player's roundScore to the [0,0] arr
 * also the player will forfit the round to another player
 */
function onHoldButtonPress() {
    scores[activePlayer] += roundScore;
    refreshSavedScoreBoard();
    changePlayerAndResetCurrentScore();
}

function refreshSavedScoreBoard() {
    player1HoldedScoreDOM.textContent = scores[0].toString();
    player2HoldedScoreDOM.textContent = scores[1].toString();
}

// -> 2nd by add onClick method way, here we get the reference of the button class
// then we use the mutable data property that JS has to add a function to the
// onClick of the element, thus, when the item is clicked, it triggers this.
// document.getElementsByClassName('btn-roll')[0].onclick = function () {
//     // re-roll and set number
//     if (document.getElementsByClassName('dice')[0].style.display !== 'none') {
//         dice = Math.floor(Math.random() * 6 + 1);
//         document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//     }
// };
// ********************************************************


// document.querySelector('#btn-hold').addEventListener()