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
const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => board

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '']
    }
    
    const isCellEmpty = (index) => {
        return (board[index] === '' ? true : false);
    }  

    const isBoardFull = () => {
        const isEmpty = ''
        if (board.every(!isEmpty)) {
            return true
        }
        return false
    }

    const markCell = (index, value) => {
        if (index < 0 || index > 8 || !isCellEmpty) {
            return false
        }
        board[index] = value
        console.log(board[index])
        return true
    }

    return {
        getBoard,
        markCell,
        resetBoard,
        isCellEmpty,
        isBoardFull
    }
})

// DisplayController -> render Board, display message (player 1/2 turn), update cell's value
const DisplayController = (() => {
    const gameBoardElement = document.getElementById('game-board');
    const messageElement = document.getElementById('message');  

    const displayBoard = () => {
        resetDisplayBoard()
        const board = GameBoard.getBoard();
        // isi tiap cell
        board.forEach((value, index) => {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.index = index;
            cell.textContent = value;
            gameBoardElement.appendChild(cell);
            console.log(cell.dataset.index)
        });
    }
    
    const displayMessage = (message) => {
        messageElement.textContent = message
    }

    const updateCell = (index, value) => {
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = symbol;
    }

    const resetDisplayBoard = () => {
        gameBoardElement.textContent = '';
        messageElement.textContent = ''; //?
    }

    return {
        displayBoard,
        displayMessage,
        updateCell,
    }
})

// GameController -> atur jalannya game
// // Game selesai jika:
// // 1. menang kalau cell idx 012 / 345/ 678 / 036 / 147/ 258 / 048 / 246 mark sama
// // 2. draw kalau 9 cell terisi dan ga ada yg menang
// // getName -> congratulates yg menang
const GameController = (() => {
    const player1 = Player('Player 1', 'X')
    const player2 = Player('Player 2', 'O')

    let isGameOver = false;
    let currentPlayer;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    const checkWinner = (board, value) => {
        const winPattern = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        // ?
        let count = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[winPattern[i][j]] === value) {
                    count++
                }
            }
            if (count === 3) {
                return true;
            }
        }
        return false;
    }

    const checkDraw = (board) => {


    }
    // ??
    const handleCellClick = () => {

    }

    const startGame = () => {
        currentPlayer = player1;

    }

    const resetGame = () => {
        GameBoard.resetBoard()
        startGame()
    }

    return {

    }
})

// Factory Function -> need multiples of something (players!)
const Player = (name, value) => {
    const getName = () => name
    const getValue = () => value

    return {
        getName,
        getValue
    }
}



// const crossClass = 'cross'
// const circleClass = 'circle'
// let currentClass = crossClass

// const cellElements = document.querySelectorAll('.cell')
// let playerMessage = document.getElementById('message')
// let resultMessage = document.getElementById('win-msg')
// let restartButton = document.getElementById('restart-btn')

// cellElements.forEach(cell => {
//     cell.addEventListener('click', setMark)
// })
// restartButton.addEventListener('click', resetBoard)

// // append div class circle / cross ke dlm class cell
// function setMark(e) {
//     const cell = e.target
//     const currentMark = document.createElement('div')
//     currentMark.classList.add(currentClass)
//     cell.appendChild(currentMark)
//     // ganti turn
//     if (currentClass === crossClass) {
//         currentClass = circleClass
//     }
//     else {
//         currentClass = crossClass
//     }
//     playerMessage.textContent = `Player ${currentClass}'s turn`
//     // spy cuman bisa 1x click u/ setMark cell
//     e.target.removeEventListener('click', setMark)
// }

const test = GameBoard()
test.markCell(1, 'O')
DisplayController.displayBoard()