// Gameboard  object (module)
//     -store board array inside Gameboard object
const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  // update gameboard
  const placeToken = (location, player) => {
    if (board[location].getValue() === "") {
      board[location].addToken(player);
      return true;
    } else {
      return false;
    }
  };

  return { getBoard, placeToken };
};

/*
 ** A Cell represents one "square" on the board and can have one of
 ** .: no token is in the square,
 ** X: Player One's token,
 ** O: Player 2's token
 */
function Cell() {
  let value = "";

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player.getToken();
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return { getName, getToken };
};

// GAME CONTROLLER
const GameController = () => {
  //  Set up players
  const player1 = Player("P1", "X");
  const player2 = Player("P2", "O");

  const board = Gameboard();

  let activePlayer = player1;
  let gameStatus = true;
  let winner = "No one";
  let roundCount = 0;

  const getGameStatus = () => gameStatus;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  const getActivePlayer = () => activePlayer;

  const checkForWinner = () => {
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
    let xCount = 0;
    let oCount = 0;
    // check horizontals
    console.log(xCount, oCount);
    console.log(board.getBoard()[0].getValue());
    for (let j = 0; j < 3; j++)
      if (board.getBoard()[j].getValue() == "X") {
        console.log("Counting");
        xCount++;
        console.log(xCount);
      } else if (board.getBoard()[j].getValue() == "O") {
        oCount++;
      }
    if (xCount === 3 || oCount === 3) {
      return true;
    }
  };

  const endGame = () => {
    console.log("Game Over!");

    gameStatus = false;
  };

  const getWinner = () => winner;

  const playRound = (location) => {
    roundCount++;

    if (getGameStatus()) {
      if (board.placeToken(location, getActivePlayer())) {
        if (checkForWinner()) {
          console.log(getActivePlayer().getName() + " wins");
          winner = getActivePlayer().getName();
          endGame();
        }
        if (roundCount >= 9) {
          endGame();
        }
        switchPlayerTurn();
      }
    }
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getGameStatus,
    getWinner,
  };
};

const ScreenController = () => {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".boardGameGrid");
  const mainEl = document.querySelector("main");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn or Winner
    if (game.getGameStatus()) {
      playerTurnDiv.textContent = `${activePlayer.getName()}'s turn...`;
    } else {
      playerTurnDiv.textContent = `GAME OVER! ${game.getWinner()} wins!`;

      const playAgainButton = document.createElement("button");
      playAgainButton.textContent = "Play Again?";
      playAgainButton.classList.add("playAgain");
      playerTurnDiv.appendChild(playAgainButton);
      // TODO make it a modal (review previous book project)
    }

    // Render board squares
    board.forEach((cell, index) => {
      // Anything clickable should be a button!!
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      // Create a data attribute to identify the cell
      // This makes it easier to pass into our `playRound` function
      cellButton.dataset.cell = index;
      cellButton.textContent = cell.getValue();
      boardDiv.appendChild(cellButton);
    });
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedCell = e.target.dataset.cell;
    // Make sure I've clicked a cell and not the gaps in between
    if (!selectedCell) return;
    game.playRound(selectedCell);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();
};

ScreenController();
