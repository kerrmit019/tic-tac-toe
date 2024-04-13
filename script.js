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

    console.log(board.getBoard()[0].getValue());
    let currentBoard = [];
    for (let i = 0; i < 9; i++) {
      currentBoard.push(board.getBoard()[i].getValue());
    }
    console.log(currentBoard);

    // horizontal winners
    // TODO horizontal still brokem
    for (let i = 0; i <= 6; i += 3) {
      let horizXCount = 0;
      let horizOCount = 0;
      for (let j = 0; j <= 3; j++) {
        if (currentBoard[i + j] == "X") {
          horizXCount++;
        } else if (currentBoard[i + j] == "O") {
          horizOCount++;
        }
        // check horizontals
        console.log(
          "horizXCount: " + horizXCount + ", horizOCount: " + horizOCount
        );
        if (horizXCount === 3 || horizOCount === 3) {
          return true;
        }
      }
    }

    // TODO vertical winners
    // for (let i = 0; i <= 3; i++) {
    //   let vertXCount = 0;
    //   let vertOCount = 0;
    //   for (let j = 0; j <= 3; j++) {
    //     if (currentBoard[j + 3] == "X") {
    //       vertXCount++;
    //     } else if (currentBoard[j + 3] == "O") {
    //       vertOCount++;
    //     }
    //     // check verts
    //     console.log(
    //       "vertXCount: " + vertXCount + ", vertOCount: " + vertOCount
    //     );
    //     if (vertXCount === 3 || vertOCount === 3) {
    //       return true;
    //     }
    //   }
    // }
  };

  const endGame = () => {
    console.log("Game Over!");

    gameStatus = false;
  };

  const getWinner = () => winner;

  const playRound = (location) => {
    if (getGameStatus()) {
      if (board.placeToken(location, getActivePlayer())) {
        roundCount++;
        if (checkForWinner()) {
          console.log(getActivePlayer().getName() + " wins");
          winner = getActivePlayer().getName();
          endGame();
        }
        console.log("roundCount " + roundCount);
        if (roundCount == 9) {
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
