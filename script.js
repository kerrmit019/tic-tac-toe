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
    }
    return;
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

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  const getActivePlayer = () => activePlayer;

  const playRound = (location) => {
    // Drop a token for the current player
    console.log(
      `Placing ${getActivePlayer().getName()}'s token into location ${location}...`
    );
    board.placeToken(location, getActivePlayer());

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

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

    // Switch player turn
    switchPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
};

const ScreenController = () => {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".boardGameGrid");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.getName()}'s turn...`;

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

    // TODO add in condition to check successful turn e.g if clicks on already filled cell nothing happens.
    // did a check for empty cell in  placeToken(), but possibly other check here would be better. as still skips
    // to next player

    game.playRound(selectedCell);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();
};

ScreenController();
