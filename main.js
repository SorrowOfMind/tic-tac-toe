//canvas
const cvs = document.getElementById('board');
const ctx = cvs.getContext('2d');

//game options
let currentPlayer;

let gameOptions = {
    currentPlayer: '',
    xArr: [],
    oArr: [],
    gameOver: false,
    winner: '',
    tie: false
}

const xImg = new Image();
xImg.src = './assets/x.png';

const oImg = new Image();
oImg.src = './assets/o.png';

//game
function startGame() {

    const SIZE = 150;

    const board = {
        map: [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [0, 2],
            [1, 2],
            [2, 2]
        ],
        row: 3,
        col: 3
    }

    let playBoard = Array(9).fill(0);

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //draw board
    const drawBoard = () => {
        ctx.strokeStyle = '#292f36';
        for (let i = 0; i < board.map.length; i++) {
            ctx.strokeRect((i % board.col) * SIZE, Math.floor(i / board.col) * SIZE, SIZE, SIZE);
        }
    }

    const drawSymbol = (symbol, index) => {
        let img = symbol === 'x' ? xImg : oImg;
        ctx.drawImage(img, board.map[index][0] * SIZE, board.map[index][1] * SIZE)
    }

    const findIdx = (board, x,y) => {
        let idx = board.findIndex(val => {
            if (val[0] === x && val[1] === y) {
                return val
            }
        })
        return idx;
    }

    cvs.addEventListener('click', e => {
        if (gameOptions.gameOver) return;

        let posX = Math.floor((e.clientX - cvs.getBoundingClientRect().x) / SIZE);
        let posY = Math.floor((e.clientY - cvs.getBoundingClientRect().y) / SIZE);

        let idx = findIdx(board.map, posX, posY);
 
        if (gameOptions.currentPlayer === 'player1' && playBoard[idx] === 0) {
            playBoard.splice(idx, 1, options.symbolPlayer1);
            drawSymbol(options.symbolPlayer1, idx);
            gameOptions.currentPlayer = options.player2;
        } else {
            if (playBoard[idx] === 0) {
                playBoard.splice(idx, 1, options.symbolPlayer2);
                drawSymbol(options.symbolPlayer2, idx);
                gameOptions.currentPlayer = options.player1;
            }
        }

        gameOptions.xArr = playBoard.reduce((acc, val, idx) => {
            if (val === 'x') {
                acc.push(idx);
            }
            return acc;
        }, []);

        gameOptions.oArr = playBoard.reduce((acc, val, idx) => {
            if (val === 'o') {
                acc.push(idx);
            }
            return acc;
        }, []);

        // if (options.player2 === 'computer') {
        //     let idx = minimax(gameOptions.xArr, gameOptions.oArr).idx;
        //     playBoard[idx] = options.symbolPlayer1;

        //     drawSymbol(options.symbolPlayer2, idx);
            
        // }
  
        console.log(playBoard);
        checkForWinner(gameOptions.xArr, gameOptions.oArr);
        checkForTie(gameOptions.xArr, gameOptions.oArr);
    });

    const checkForWinner = (arrayX, arrayO) => {
        if ((arrayX.length + arrayO.length) >= 5) {
            for (let i = 0; i < winningCombos.length; i++) {
                const winCheck = winningCombos[i];
                if (arrayX.includes(winCheck[0]) && arrayX.includes(winCheck[1]) && arrayX.includes(winCheck[2])) {
                    gameOptions.gameOver = true;
                    showGameOver('X', 'The winner is');
                    gameOptions.winner = options.symbolPlayer1 === 'x' ? 'player1' : 'player2';
                }
                if (arrayO.includes(winCheck[0]) && arrayO.includes(winCheck[1]) && arrayO.includes(winCheck[2])) {
                    gameOptions.gameOver = true;
                    showGameOver('O', 'The winner is');
                    gameOptions.winner = options.symbolPlayer1 === 'o' ? 'player1' : 'player2';
                }
            }
        }
        console.log(gameOptions.winner);
        return gameOptions.winner;
    }

    const checkForTie = (arrayX, arrayO) => {
        if ((arrayX.length + arrayO.length) === 9 && gameOptions.gameOver === false) {
            showGameOver(null, 'No winner!');
            gameOptions.tie = true;
            return gameOptions.tie;
        }
    }

    // const minimax = (arrayX, arrayO) => {
    //     if (checkForWinner(gameOptions.xArr, gameOptions.oArr) === 'player1') return {eval: -10};
    //     if (checkForWinner(gameOptions.xArr, gameOptions.oArr) === 'player2') return {eval: +10};
    //     if (checkForTie(gameOptions.xArr, gameOptions.oArr)) return {eval: 0};

    //     let spaces = findSpaces(playBoard);

    //     let moves = [];

    //     for (let i = 0; i < spaces.length; i++) {
    //         let idx = spaces[i];
    //         let backup = playBoard[idx];

    //         playBoard[idx] = options.symbolPlayer1;

    //         let move = {};
    //         move.idx = idx;

    //         move.eval = minimax(arrayX, arrayO).eval;

    //         playBoard[idx] = backup;

    //         moves.push(move);
    //     }

    //     let bestMove;

    //     if (gameOptions.currentPlayer === 'player2') {
    //         let bestEval = -Infinity;
    //         for (let i=0; i<moves.length; i++) {
    //             if (moves[i].eval > bestEval) {
    //                 bestEval = moves[i].eval;
    //                 bestMove = moves[i];
    //             }
    //         }
    //     } else {
    //         let bestEval = +Infinity;
    //         for (let i=0; i<moves.length; i++) {
    //             if (moves[i].eval < bestEval) {
    //                 bestEval = moves[i].eval;
    //                 bestMove = moves[i];
    //             }
    //         }
    //     }
    //     return bestMove;
    // }

    const findSpaces = board => {
        let spaces = [];
        board.forEach((space,idx) => {
            !space ? spaces.push(idx) : null;
        });
        return spaces;
    }

    drawBoard();
}