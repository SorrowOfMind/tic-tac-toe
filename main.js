//elements
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

//canvas
const cvs = document.getElementById('board');
const ctx = cvs.getContext('2d');

//game options
let currentPlayer;
const options = {
    player1: 'player1',
    player2: '',
    symbolPlayer1: '',
    symbolPlayer2: ''
}

const xImg = new Image();
xImg.src = './assets/x.png';

const oImg = new Image();
oImg.src = './assets/o.png';

//btns handling
humanOpponent.addEventListener('click', () => {
    options.player2 = 'human';
    if (compOpponent.classList.contains('nonvalid') || humanOpponent.classList.contains('nonvalid')) {
        compOpponent.classList.remove('nonvalid');
        humanOpponent.classList.remove('nonvalid');
    }
    humanOpponent.classList.add('active');
    compOpponent.classList.remove('active');
});

compOpponent.addEventListener('click', () => {
    options.player2 = 'comp';
    if (compOpponent.classList.contains('nonvalid') || humanOpponent.classList.contains('nonvalid')) {
        compOpponent.classList.remove('nonvalid');
        humanOpponent.classList.remove('nonvalid');
    }
    compOpponent.classList.add('active');
    humanOpponent.classList.remove('active');

});

x.addEventListener('click', () => {
    options.symbolPlayer1 = 'x';
    options.symbolPlayer2 = 'o';
    if (x.classList.contains('nonvalid') || o.classList.contains('nonvalid')) {
        x.classList.remove('nonvalid');
        o.classList.remove('nonvalid');
    }
    x.classList.add('active');
    o.classList.remove('active');
});

o.addEventListener('click', () => {
    options.symbolPlayer1 = 'o';
    options.symbolPlayer2 = 'x';
    if (x.classList.contains('nonvalid') || o.classList.contains('nonvalid')) {
        x.classList.remove('nonvalid');
        o.classList.remove('nonvalid');
    }
    x.classList.remove('active');
    o.classList.add('active');
});


const chooseCurrentPlayer = () => {
    let random = Math.floor(Math.random() * 101);
    if(random >= 50) {
        return currentPlayer = options.player1;
    } else {
        return currentPlayer = options.player2;
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


playAgain.addEventListener('click', () => {
   location.reload();
})

//game
function startGame() {

const SIZE = 150;

const board = {
    map: [[0,0],[1,0],[2,0],
          [0,1],[1,1],[2,1],
          [0,2],[1,2],[2,2]],
    row: 3,
    col: 3
}

let playBoard = Array(9).fill(0);

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//draw board
const drawBoard = () => {
    ctx.strokeStyle = '#292f36';
    for (let i=0; i < board.map.length; i++) {
        ctx.strokeRect((i % board.col) * SIZE, Math.floor(i / board.col) * SIZE, SIZE, SIZE);
    }
}

const drawSymbol = (symbol, index) => {
    let img = symbol === 'x' ? xImg : oImg;
    ctx.drawImage(img, board.map[index][0] * SIZE,board.map[index][1] * SIZE)
}

cvs.addEventListener('click', e => {
    let posX = Math.floor((e.clientX - cvs.getBoundingClientRect().x) / SIZE);
    let posY = Math.floor((e.clientY - cvs.getBoundingClientRect().y) / SIZE);

    let idx = board.map.findIndex(val => {
        if (val[0] === posX && val[1] === posY) {
            return val;
        }
    })
    
    if (currentPlayer === 'player1' && playBoard[idx] === 0) {
        playBoard.splice(idx,1,options.symbolPlayer1);
        drawSymbol(options.symbolPlayer1, idx);
        currentPlayer = options.player2;
    } else {
        if (playBoard[idx] === 0) {
            playBoard.splice(idx,1,options.symbolPlayer2);
            drawSymbol(options.symbolPlayer2, idx);
            currentPlayer = options.player1;
        }
    }

    let xArr = playBoard.reduce((acc,val,idx) => {
        if (val === 'x') {
           acc.push(idx);
        }
        return acc;
    }, []);

    let oArr = playBoard.reduce((acc,val,idx) => {
        if (val === 'o') {
           acc.push(idx);
        }
        return acc;
    }, []);

    const showGameOver = (winner, type) => {
        gameOver.classList.remove('hide');
        cvs.classList.add('hide');
        winnerText.textContent = type;
        winnerSymbol.textContent = winner;
    }

    if ((xArr.length + oArr.length) >= 5) {
        let win = false;
        for (let i = 0; i < winningCombos.length; i++) {
            const winCheck = winningCombos[i];
            if (xArr.includes(winCheck[0]) && xArr.includes(winCheck[1]) && xArr.includes(winCheck[2])) {
                win = true;
                showGameOver('X', 'The winner is');
            }
            if (oArr.includes(winCheck[0]) && oArr.includes(winCheck[1]) && oArr.includes(winCheck[2])) {
                win = true;
                showGameOver('O', 'The winner is');
            }
            if ((xArr.length + oArr.length) === 9 && win === false)
                showGameOver(null, 'No winner!');
        }
    }
})

drawBoard();
}

