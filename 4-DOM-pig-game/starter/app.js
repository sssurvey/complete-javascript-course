/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice;

roundScore = 0;
scores = [0, 0]; // index [0] for player 1, [1] for player 2
activePlayer = 0; // 0 for player 1, 1 for player 2
dice = 0;

// The document.querySelector() select the first elemenet that matches a specified CSS selectors in the document
// and to select the id, we use the hashtag symbo
// document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// to select the class we use the dot symbo
// document.querySelector('.dice').style.display = 'none';
document.getElementsByClassName('dice')[0].style.display = 'none';

document.getElementsByClassName('btn-new')[0].onclick = function() {
    document.getElementsByClassName('dice')[0].style.display = 'initial';
};

document.getElementsByClassName('btn-roll')[0].onclick = function() {
    // re-roll and set number
    if (document.getElementsByClassName('dice')[0].style.display !== 'none') {
        dice = Math.floor(Math.random() * 6 + 1);
        document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    }
};
// document.querySelector('#btn-hold').addEventListener()