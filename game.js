// Module Pattern
const Game = (() => {
    // display variables
    const gameBoardElement = document.getElementById('game-board');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-btn');
    const cellElements = document.querySelectorAll('[data-index]');

    // game variables
    let board = [];
    const playersMap = new Map([
        ["Player 1", "X"],
        ["Player 2", "O"]
    ]);

    const currentPlayer = ["Player 1", "Player 2"];
    let playerCtr = 0;

    const setupGame = () => {
        // setup display events
        displaySetup();
        clearBoard();
    };

    const clearBoard = () => {
        board = [];
        // board pre filled setup
        for (let i = 0; i < 3; i++) {
            board.push(["", "", ""]);
        }
    };

    const startGame = () => {
        setupGame();
    };

    const displaySetup = () => {
        cellElements.forEach(cell => {
            cell.addEventListener('click', playerTurnHandler)
        });

        restartButton.addEventListener('click', restartGame);
    };

    const playerTurnHandler = (event) => {
        const cell = event.target;
        const coordinatesStr = event.target.dataset.index;
        const coordinates = coordinatesStr.split(",");

        let row = coordinates[0];
        let column = coordinates[1];

        let player = currentPlayer[playerCtr]
        

        fillBoard(row, column, player)
        fillDisplay(cell, playersMap.get(player))

        if (winCondition()){
            displayMessage(`🎉 ${currentPlayer[playerCtr]} wins 🎉`);
            disableAllButton();
            return;
        }

        if (ifDraw() === 9){
            displayMessage(`🎉 It's a draw~ 🎉`);
            disableAllButton();
            return;
        }

        if (playerCtr === 0) {
            playerCtr += 1
            displayMessage(`Player 2's turn`);
        } else {
            playerCtr = 0
            displayMessage(`Player 1's turn`);
        }
    }

    const disableAllButton = () => {
        cellElements.forEach(cell => cell.disabled = true);
    }

    const fillBoard = (row, column, player) => {
        board[row][column] = playersMap.get(player)
    };

    const fillDisplay = (cell, chip) => {
        cell.textContent = chip;
        cell.disabled = true;

        if (chip === "O") {
            cell.style.color = "green";
        }
    };

    const winCondition = () => {
        // check all vertical
        for (let i = 0; i < 3; i++) {
            // ambil array tiap baris krn vertical
            const arr = board.map(rowArr => rowArr[i])
            if (checkHorizontalWinCondition(arr)) {
                return true;
            }
        }

        // check all horizontal
        for (let i = 0; i < board.length; i++) {
            if (checkHorizontalWinCondition(board[i])) {
                return true;
            }
        }

        // check diagonal
        if (checkLeftDiagonalWinCondition()) {
            return true;
        }

        if (checkRightDiagonalWinCondition()) {
            return true;
        }

        return false;
    }

    const checkHorizontalWinCondition = (arr) => {
        const chip = arr[0];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== chip || chip === "") {
                return false;
            }
        }
        return true;
    }

    const checkLeftDiagonalWinCondition = () => {
        const chipLeft = board[0][0];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if ((i === j && board[i][j] !== chipLeft) || chipLeft === "") {
                    return false;
                }
            }
        }
        return true
    };

    const checkRightDiagonalWinCondition = () => {
        const chipRight = board[0][2];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if ((i + j === 2 && board[i][j] !== chipRight) || chipRight === "") {
                    return false;
                }
            }
        }
        return true
    };

    const ifDraw = () => {
        let counter = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === "X" || board[i][j] === "O"){
                    counter += 1;
                }
            }
        }
        return counter;
    }

    const displayMessage = (message) => {
        messageElement.textContent = message;
    }

    const restartGame = () => {
        clearBoard();
        clearDisplay();
        displayMessage(`Player 1's turn`);
    }

    const clearDisplay = () => {
        cellElements.forEach(cell => {
            cell.textContent = "";
            cell.disabled = false;
        });
    }

    return { startGame };
})();

Game.startGame();