//elements
const menu = document.querySelector('.menu');
const humanOpponent = document.getElementById('human');
const compOpponent = document.getElementById('comp');
const x = document.getElementById('x');
const o = document.getElementById('o');
const play = document.getElementById('play');

//canvas
const cvs = document.getElementById('board');
const ctx = cvs.getContext('2d');

//game options
const options = {
    player1: 'player1',
    player2: '',
    symbolPlayer1: '',
    symbolPlayer2: ''
}

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
    }
    startGame();
    console.log(options);
});



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

//draw board
const drawBoard = () => {
    ctx.strokeStyle = '#E13000';
    for (let i=0; i < board.map.length; i++) {
        ctx.strokeRect((i % board.col) * SIZE, Math.floor(i / board.col) * SIZE, SIZE, SIZE);
    }
}


let currentPlayer;

const chooseCurrentPlayer = () => {
    let random = Math.floor(Math.random() * 101);
    if(random >= 50) {
        console.log('player1 starts')
        return currentPlayer = options.player1;
    } else {
        console.log('player2 starts')
        return currentPlayer = options.player2;
    }
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
        currentPlayer = options.player2;
    } else {
        if (playBoard[idx] === 0) {
            playBoard.splice(idx,1,options.symbolPlayer2);
            currentPlayer = options.player1;
        }
    }

    console.log(playBoard);
})

drawBoard();
chooseCurrentPlayer();
}

