// DOM
const boardGameGrid = document.querySelector(".boardGameGrid");

// Gameboard  object (module)
//     -store board array inside Gameboard object
const Gameboard = (() => {
  let board = [".", ".", ".", ".", ".", ".", ".", ".", "."];

  // const board = ["O", "O", "X", "O", "X", "O", "O", "O", "X"];

  // update gameboard
  const updateBoard = (location, token) => {
    board[location] = token;
    return;
  };

  const displayBoard = () => {
    console.log(board);
    let squareCount = 0;
    board.forEach(function (element) {
      console.log(element);
      const square = document.getElementById(`square-${squareCount}`);
      console.log(`square-${squareCount}`);
      const move = document.createElement("p");
      move.textContent = element;
      // square.addEventListener("click", (e) => checkMove(e)); TODO 1. needs work on this - DO NEXT
      square.append(move);
      squareCount++;
    });
    return;
  };
  return { displayBoard, updateBoard };
})();

// display gameboard to page
// IIFE - might change this out when add in a game controller to call functions.

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  // TODO place token logic.
  const placeToken = () => {
    // dummy location - but will be click event
    let location = 3;
    console.log(location);
    Gameboard.updateBoard(location, getToken());
    return;
  };
  //   TODO assign winner e.g player.wins()

  return { placeToken };
};

// GAME LOGIC
// TODO check for winner.
//  0 1 2
//  3 4 5
//  6 7 8

// win conditions
// HORIZONTAL (plus 1 starting at 0, 3, 6)
//  0 1 2 match
// 3 4 5 match
// 6 7 8 match

// VERTICAL (plus 3 starting at 0, 1, 2)
//  0 3 6 match
//  1 4 7 match
//  2 5 8 match

// DIAGONAL (plus 4 starting at 0, plus 2 starting at 2)
// 0 4 8 match
//  2 4 6 match

// wins
// TODO check if token can be placed

// GAME CONTROLLER
// needs a lot of work
const gameController = (() => {
  //  Set up players
  const player1 = Player("P1", "X");
  const player2 = Player("P2", "O");

  // This could be start of game loop
  // e.g player one -> display -check for winner -> player 2 ->
  // Dummy play
  player1.placeToken();
  player2.placeToken();

  // Display board to screen
  Gameboard.displayBoard();
})();
