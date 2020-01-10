const WINNER_SCORE = 100;

let activePlayer;
let scoreboards;
let currentScore;

let isGameStarted = false;

let diceDOM = document.getElementsByClassName('dice')[0];
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

function setOnClickListeners() {
    newGameButtonDOM.addEventListener('click', onNewGameClicked);
    rollDiceButtonDOM.addEventListener('click', onRollDice);
    holdButtonDOM.addEventListener('click', onHoldClicked);
}

function onNewGameClicked() {
    isGameStarted = true;
    scoreboards = [0,0];
    changeActivePlayer();
    resetCurrentScore();
    refreshSavedScoreBoardUI();
    hideDice();
    removeWinner();
    resetPlayerName();
}

function onRollDice() {
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
    updateActivePlayer(activePlayer);
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

function refreshDiceImage(diceNumber) {
    diceDOM.src = 'dice-' + diceNumber + ".png";
}

function generateRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function onHoldClicked() {
    if (isGameStarted) {
        scoreboards[activePlayer] += currentScore;
        resetCurrentScore();
        refreshSavedScoreBoardUI();
        hideDice();
        changeActivePlayer();
        checkForWinCondition();
    }
}

function checkForWinCondition() {
    scoreboards.forEach((score, index) => {
        if (score >= WINNER_SCORE) {
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
    function htmlItalicWrapper(contentText) {
        return '<em>' + contentText + "</em>"
    }

    if (activePlayer === 0) {
        player1CurrentScoreDOM.innerHTML =  htmlItalicWrapper(currentScore);
    } else if (activePlayer === 1) {
        player2CurrentScoreDOM.innerHTML = htmlItalicWrapper(currentScore);
    }
}