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

// display controller
const GameDisplay = (() => {
    const gameBoardElement = document.getElementById('game-board');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-btn');
    const cellElements = document.querySelectorAll('[data-index]');

    const setup = () => {
        cellElements.forEach(cell => {
            cell.addEventListener('click', getLastClickedButton)
        });
    };

    const getLastClickedButton = (event) => {
        const cell = event.target;
        const index = event.target.dataset.index;
        console.log(coordinates)
    }

    return { setup };
})();

// Game module
const Game = ((GameDisplay) => {
    // const scoreBoard = {
    //     player1: 0,
    //     player2: 0,
    // }
    // private variable
    const display = GameDisplay

    const board = [[]];
    const p1Chip = "X";
    const p2Chip = "O";

    // game functions bellow
    const setupGame = () => {
        display.setup();
    };

    const startGame = () => {

    };

    // get coordinates based on the inserted chip type
    // const getChipCoordinates(chipType)


})();

Game.setupGame();