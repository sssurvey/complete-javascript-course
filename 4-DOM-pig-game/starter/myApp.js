const WINNER_SCORE = 100;

let activePlayer;
let scoreboards;
let currentScore;

let isGameStarted = false;

let diceDOM = document.getElementsByClassName('dice')[0];
let player1CurrentScoreDOM = document.getElementById('current-0');
let player2CurrentScoreDOM = document.getElementById('current-1');
let player1HoldedScoreDOM = document.getElementById('score-0');
let player2HoldedScoreDOM = document.getElementById('score-1');
let holdButtonDOM = document.getElementsByClassName('btn-hold')[0];
let newGameButtonDOM = document.getElementsByClassName('btn-new')[0];
let rollDiceButtonDOM = document.getElementsByClassName('btn-roll')[0];

init();
setOnClickListeners();

function init() {
    activePlayer = 0;
    scoreboards = [0, 0];
    resetCurrentScore();
    refreshSavedScoreBoardUI();
    hideDice();
}

function setOnClickListeners() {
    newGameButtonDOM.addEventListener('click', onNewGameClicked);
    rollDiceButtonDOM.addEventListener('click', onRollDice);
    holdButtonDOM.addEventListener('click', onHoldClicked);
}

function onNewGameClicked() {
    isGameStarted = true;
    scoreboards = [0,0];
    hideDice();
    resetCurrentScore();
}

function onRollDice() {
    console.log(activePlayer);
    if (isGameStarted) {
        let diceNumber = generateRandomDiceNumber();
        switch(diceNumber) {
            case 1:
                hideDice();
                resetCurrentScore();
                changeActivePlayer();
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                incrementCurrentScore(diceNumber);
                refreshDiceImage(diceNumber);
                refreshCurrentScoreBoardUI(activePlayer);
                showDice();
                break;
        }
    }
}

function changeActivePlayer() {
    activePlayer = activePlayer ? 0 : 1;
}

function incrementCurrentScore(diceNumber) {
    currentScore += diceNumber;
}

function refreshDiceImage(diceNumber) {
    diceDOM.src = 'dice-' + diceNumber + ".png";
}

function generateRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function onHoldClicked() {
    scoreboards[activePlayer] += currentScore;
    resetCurrentScore();
    refreshSavedScoreBoardUI();
    hideDice();
    changeActivePlayer();
}

function hideDice() {
    diceDOM.style.display = 'none';
}

function showDice() {
    diceDOM.style.display = 'block';
}

function resetCurrentScore() {
    currentScore = 0;
    player1CurrentScoreDOM.textContent = currentScore + '';
    player2CurrentScoreDOM.textContent = currentScore + '';
}

function refreshSavedScoreBoardUI() {
    player1HoldedScoreDOM.textContent = scoreboards[0];
    player2HoldedScoreDOM.textContent = scoreboards[1];
}

function refreshCurrentScoreBoardUI(activePlayer) {
    if (activePlayer === 0) {
        player1CurrentScoreDOM.textContent = currentScore + '';
    } else if (activePlayer === 1) {
        player2CurrentScoreDOM.textContent = currentScore + '';
    }
}