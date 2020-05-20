//select elements
const menu = document.querySelector('.menu');
const humanOpponent = document.getElementById('human');
const compOpponent = document.getElementById('comp');
const x = document.getElementById('x');
const o = document.getElementById('o');
const play = document.getElementById('play');
const gameOver = document.getElementById('game-over');
const winner = document.getElementById('winnerText');
const winnerSymbol = document.getElementById('winner-symbol');
const playAgain = document.getElementById('play-again');
const popup = document.getElementById('popup');

// initial options
const options = {
    player1: 'player1',
    player2: '',
    symbolPlayer1: '',
    symbolPlayer2: ''
}

const classJuggler = (hideElem, showElem) => {
    if (showElem.classList.contains('nonvalid') || hideElem.classList.contains('nonvalid')) {
        showElem.classList.remove('nonvalid');
        hideElem.classList.remove('nonvalid');
    }
    showElem.classList.add('active');
    hideElem.classList.remove('active');
}

//btns handling - choose options
humanOpponent.addEventListener('click', () => {
    options.player2 = 'human';
    classJuggler(compOpponent, humanOpponent);
});

compOpponent.addEventListener('click', () => {
    options.player2 = 'computer';
    classJuggler(humanOpponent, compOpponent);
});

x.addEventListener('click', () => {
    options.symbolPlayer1 = 'x';
    options.symbolPlayer2 = 'o';
    classJuggler(o, x);
});

o.addEventListener('click', () => {
    options.symbolPlayer1 = 'o';
    options.symbolPlayer2 = 'x';
    classJuggler(x, o);
});

const chooseCurrentPlayer = () => {
    let random = Math.floor(Math.random() * 101);
    if(random >= 50) {
        return gameOptions.currentPlayer = options.player1;
    } else {
        return gameOptions.currentPlayer = options.player2;
    }
}

const showPopup = () => {
    popup.classList.remove('hide');
    currentPlayer === options.player1 ? popup.textContent = `Player 1 starts` : popup.textContent = `Player 2 starts`;
    setTimeout(() => {
        popup.classList.add('hide');
    },1500)
}

play.addEventListener('click', () => {
    if (options.player2 === '') {
        humanOpponent.classList.add('nonvalid');
        compOpponent.classList.add('nonvalid');
    } else if (options.symbolPlayer1 === '') {
        x.classList.add('nonvalid');
        o.classList.add('nonvalid');
    } else {
        menu.classList.add('hide');
        cvs.classList.remove('hide');
        chooseCurrentPlayer();
        showPopup();
        startGame();
    }
    console.log(options);
});

const showGameOver = (winner, type) => {
    gameOver.classList.remove('hide');
    cvs.classList.add('hide');
    winnerText.textContent = type;
    winnerSymbol.textContent = winner;
}

playAgain.addEventListener('click', () => {
    location.reload();
 });