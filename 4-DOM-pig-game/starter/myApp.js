// Coding challenges:
// 1. If a player got two 6 in a role, he lose his entire score and player change
//      - impl completes
// 2. Add an input field to the html where player can set the winner score
//      - impl completes
//          = once the user clicks new game, a box will be shown at top for user
//            to input score
//          = if the user clicks roll dice the box hides itself and set win score
// 3. Add another dice, however, if the player, rolled one dice to one, then they
// lost all their score
//      - impl completes

let activePlayer;
let scoreboards;
let currentScore;
let lastDiceScore;

let isGameStarted = false;
let winningScore = 100;

let dice1DOM = document.getElementById('dice-0');
let dice2DOM = document.getElementById('dice-1');
let player1NameDOM = document.getElementById('name-0');
let player2NameDOM = document.getElementById('name-1');
let player1PanelDOM = document.getElementsByClassName('player-0-panel')[0];
let player2PanelDOM = document.getElementsByClassName('player-1-panel')[0];
let player1CurrentScoreDOM = document.getElementById('current-0');
let player2CurrentScoreDOM = document.getElementById('current-1');
let player1HoldedScoreDOM = document.getElementById('score-0');
let player2HoldedScoreDOM = document.getElementById('score-1');
let holdButtonDOM = document.getElementsByClassName('btn-hold')[0];
let newGameButtonDOM = document.getElementsByClassName('btn-new')[0];
let rollDiceButtonDOM = document.getElementsByClassName('btn-roll')[0];
let winningScoreInputDOM = document.getElementById('set-score')

init();
setOnClickListeners();

function init() {
    activePlayer = 0;
    scoreboards = [0, 0];
    resetCurrentScore();
    refreshSavedScoreBoardUI();
    hideDice();
    removeWinner();
    resetPlayerName();
}

function showInputWinningScoreUI() {
    winningScoreInputDOM.style.display = 'block'
    document.getElementsByClassName('input-box')[0].style.display = 'block'
}

function hideInputWinningScoreUI() {
    winningScoreInputDOM.style.display = 'none'
    document.getElementsByClassName('input-box')[0].style.display = 'none'
}

function updateWinningScore() {
    if (winningScoreInputDOM.value === undefined
        || winningScoreInputDOM.value === 0
        || winningScoreInputDOM.value === null) {
        winningScore = 100;
    } else {
        winningScore = winningScoreInputDOM.value;
    }
}

function resetWinningScore() {
    winningScore = 100;
}

function setOnClickListeners() {
    newGameButtonDOM.addEventListener('click', onNewGameClicked);
    rollDiceButtonDOM.addEventListener('click', onRollDice);
    holdButtonDOM.addEventListener('click', onHoldClicked);
}

function onNewGameClicked() {
    isGameStarted = true;
    scoreboards = [0,0];
    updateWinningScore();
    resetWinningScore();
    changeActivePlayer();
    resetCurrentScore();
    refreshSavedScoreBoardUI();
    hideDice();
    removeWinner();
    resetPlayerName();
    showInputWinningScoreUI();
}

function onRollDice() {
    if (isGameStarted) {

        hideInputWinningScoreUI();

        let dice1Number = generateRandomDiceNumber();
        let dice2Number = generateRandomDiceNumber();

        if (dice1Number === 1 && dice2Number === 1) {
            hideDice();
            resetCurrentScore();
            changeActivePlayer();
        } else if (checkIfLastDiceRollIsSix(dice1Number)) {
            scoreboards[activePlayer] = 0;
            hideDice();
            resetCurrentScore();
            refreshSavedScoreBoardUI();
            changeActivePlayer();
        } else {
            checkIfLastDiceRollIsSix(dice1Number + dice2Number);
            saveLastRoll(dice1Number + dice2Number);
            incrementCurrentScore(dice1Number + dice2Number);
            refreshDiceImage(dice1Number, dice2Number);
            refreshCurrentScoreBoardUI(activePlayer);
            showDice();
        }
    }
}

function saveLastRoll(diceNumber) {
    lastDiceScore = diceNumber;
}

function checkIfLastDiceRollIsSix(currentDiceRow) {
    return (currentDiceRow === lastDiceScore && lastDiceScore === 6)
}

function changeActivePlayer() {
    clearPreviousRoll();
    activePlayer = activePlayer ? 0 : 1;
    updateActivePlayer(activePlayer);

    function clearPreviousRoll() {
        lastDiceScore = undefined;
    }
}

function updateActivePlayer(currentActivePlayer) {
    if (currentActivePlayer === 0) {
        player1PanelDOM.classList.add('active');
        player2PanelDOM.classList.remove('active');
    } else {
        player2PanelDOM.classList.add('active');
        player1PanelDOM.classList.remove('active');
    }
}

function incrementCurrentScore(diceNumber) {
    currentScore += diceNumber;
}

function refreshDiceImage(dice1Number, dice2Number) {
    dice1DOM.src = 'dice-' + dice1Number + ".png";
    dice2DOM.src = 'dice-' + dice2Number + ".png";
}

function generateRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function onHoldClicked() {
    if (isGameStarted) {
        scoreboards[activePlayer] += currentScore;
        updateWinningScore();
        resetCurrentScore();
        refreshSavedScoreBoardUI();
        hideDice();
        changeActivePlayer();
        checkForWinCondition();
    }
}

function checkForWinCondition() {
    scoreboards.forEach((score, index) => {
        if (score >= winningScore) {
            setPlayerToWinner(index)
        }
    });
}

function setPlayerToWinner(winnerPlayer) {
    endCurrentGame();
    if (winnerPlayer === 0) {
        player1NameDOM.textContent = 'winner';
        player1PanelDOM.classList.add('winner');
    } else {
        player2NameDOM.textContent = 'winner';
        player2PanelDOM.classList.add('winner');
    }
}

function endCurrentGame() {
    isGameStarted = false;
} 

function removeWinner() {
    player1PanelDOM.classList.remove('winner');
    player2PanelDOM.classList.remove('winner');
}

function resetPlayerName() {
    player1NameDOM.textContent = 'player 1';
    player1NameDOM.textContent = 'player 2';
}

function hideDice() {
    dice1DOM.style.display = 'none';
    dice2DOM.style.display = 'none';
}

function showDice() {
    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';
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
    function htmlItalicWrapper(contentText) {
        return '<em>' + contentText + "</em>"
    }

    if (activePlayer === 0) {
        player1CurrentScoreDOM.innerHTML =  htmlItalicWrapper(currentScore);
    } else if (activePlayer === 1) {
        player2CurrentScoreDOM.innerHTML = htmlItalicWrapper(currentScore);
    }
}