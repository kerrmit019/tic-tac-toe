// DOM
const gameContainer = document.getElementById("boardGameContainer");
// Gameboard  object (module)
//     -store board array inside Gameboard object
const Gameboard = (() => {
  // const board = [];
  const testBoard = ["X", "O", "X", "X", "X", "X", "O", "O", "X"];
  return { testBoard };
})();

console.log(Gameboard);

// display gameboard to page
// IIFE
const displayController = ((board) => {
  console.log(board);
  const printedBoard = (() => {
    board.forEach(function (element) {
      console.log(element);
      const move = document.createElement("p");
      move.textContent = element;
      gameContainer.append(move);
    });
  })();
  return;
})(Gameboard.testBoard);
