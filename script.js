// Requirements: bisa isi value bergantian, tampilkan hasil,
// bisa diulang gamenya
// Steps:
// 1. Terima input user (click cell) -> dapat id nya
// 2. Display cell yang sudah diberi cross / circle (
// bisa tentuin giliran & simbol yang keluar apa berdasarkan Player)
// 3. Loop trs sampai ada yg menang / semua cell terisi
// 4. Display message
// 5. Bisa restart game

// Module Pattern -> if you only ever need ONE of something (ex. calculator, library)
// GameBoard -> isi symbol sesuai player, reset board, cek board penuh / ada menang
// DisplayController -> render Board, display message (player 1/2 turn), update cell's value
// display message yg menang

// GameController -> atur jalannya game
// // Game selesai jika:
// // 1. menang kalau cell idx 012 / 345/ 678 / 036 / 147/ 258 / 048 / 246 mark sama
// // 2. draw kalau 9 cell terisi dan ga ada yg menang

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer, gameOver;

const gameBoardElement = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');
const cellElements = document.querySelectorAll('[data-index]');

// Factory Function -> need multiples of something (players!)
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol
    };
};

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
};

const getBoard = () => {
    return board;
};

const isCellEmpty = (index) => {
    return (board[index] === '' ? true : false);
};

const isBoardFull = () => {
    let count = 0;
    board.forEach(cell => {
        if (cell !== '') {
            count++;
        } 
    });
    if (count === 9) {
        return true;
    }
    return false;
}

const displayMessage = (message) => {
    messageElement.textContent = message;
}

const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
}

let winnerPlayer = '';
const checkWinner = (board, symbol) => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // bandingkan tiap symbol apa sama dengan winPattern
    for (const winPattern of winPatterns) { // [0, 1, 2], [3, 4, 5], dll
        let count = 0;
        for (const index of winPattern) { // 0, 1, 2
            if (board[index] === symbol) {
                count++;
            }
            if (count === 3) {
                return true;
            }
        }
    }
    return false;
}

// draw jika board full & tidak ada yg menang
const checkDraw = () => {
    if (isBoardFull() && winnerPlayer === '') {
        return true;
    }
    return false;
}

const startGame = () => {
    // reset
    gameOver = false;
    currentPlayer = player1;
    cellElements.forEach(cell => {
        cell.addEventListener('click', setMark);
    });
    restartButton.addEventListener('click', restartGame); //?
}

function setMark(event) {
    const cell = event.target;
    const index = event.target.dataset.index;
    if (!gameOver) {
        markCell(cell, index, currentPlayer.getSymbol());
        return true;
    }
}

const markCell = (cell, index, symbol) => {
    if (!isCellEmpty) {
        return false;
    }
    board[index] = symbol;
    console.log(board);

    if (symbol === 'O') {
        cell.style.color = 'green';
    }
    cell.textContent = symbol;

    if (checkWinner(board, symbol)) {
        gameOver = true;
        winnerPlayer = currentPlayer.getName();
        displayMessage(`🎉 ${winnerPlayer} wins 🎉`);
        return;
    }
    if (checkDraw()) {
        displayMessage(`It's a draw !`);
        return;
    }
    switchPlayer();
    displayMessage(`${currentPlayer.getName()}'s turn`);
    return true;
}

const restartGame = () => {
    console.log('reset');
    cellElements.forEach(cell => {
        cell.textContent = '';
        cell.style.color = 'brown';
    });
    messageElement.textContent = '';
    resetBoard();
    startGame();
}



// Main

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
startGame();