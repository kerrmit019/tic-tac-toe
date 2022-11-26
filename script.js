// DOM
const boardGameGrid = document.querySelector(".boardGameGrid");

// Gameboard  object (module)
//     -store board array inside Gameboard object
const Gameboard = (() => {
  // const board = [];
  const testBoard = ["X", "O", "X", "X", "X", "X", "O", "O", "X"];
  return { testBoard };
})();

console.log(Gameboard);

// display gameboard to page
// IIFE - might change this out when add in a game controller to call functions.
const displayController = ((board) => {
  console.log(board);
  const printBoard = (() => {
    board.forEach(function (element) {
      console.log(element);

      const move = document.createElement("p");
      move.textContent = element;
      boardGameGrid.append(move);
    });
  })();
  return;
})(Gameboard.testBoard);
