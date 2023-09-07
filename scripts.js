const playerFactory = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const updateBoard = () => {
    const boardTiles = document.querySelectorAll(".tile");
    let index = 0;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cellContent = board[row][col];
        boardTiles[index].textContent = cellContent || "";
        index++;
      }
    }
  };

  const resetBoard = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row][col] = "";
      }
    }
    updateBoard();
    clearCellTextContent();
  };

  const clearCellTextContent = () => {
    const boardTiles = document.querySelectorAll(".tile");
    boardTiles.forEach(tile => {
      tile.textContent = "";
    });
  };

  return {
    board,
    updateBoard,
    resetBoard
  };
})();

const gameController = (() => {

  
  let p1Name = document.getElementById('player1-name').textContent; 
  if (p1Name === "") {
    p1Name = "Player 1";
  }

  let p2Name = document.getElementById('player2-name').textContent;
  if (p2Name === "") {
    p2Name = "Player 2";
  }


  let playerOne = playerFactory(p1Name, 'X');
  let playerTwo = playerFactory(p2Name, 'O');
  
  console.log(playerOne, playerTwo)
  let playerInfo = document.querySelectorAll('.player-info');

  playerInfo.forEach((element) => {
    element.addEventListener('change', () => {
      let p1Name = document.getElementById('player1-name').textContent; 
      let p2Name = document.getElementById('player2-name').textContent;
      playerOne.name = p1Name;
      playerTwo.name = p2Name;
      console.log(playerOne, playerTwo);
    });
  });



  const switchPlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  let activePlayer = playerOne;

  let tiles = document.querySelectorAll('.tile');

  const makeMove = () => {
    tiles.forEach((tile, tileNum) => tile.addEventListener('click', () => {
      if (tile.textContent === "") {
        tile.textContent = activePlayer.marker;
        const row = Math.floor(tileNum / 3);
        const col = tileNum % 3;
        gameBoard.board[row][col] = activePlayer.marker;
        checkWinner();
        gameBoard.updateBoard();
        switchPlayer();
      } else {
        console.log("Select a different tile");
      }
    }));
  };

  const checkWinner = () => {
    const board = gameBoard.board;
  
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== ""
      ) {
        alert("Winner in row " + (i + 1));
        gameBoard.resetBoard();
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        alert("Winner in column " + (i + 1));
        gameBoard.resetBoard();

      }
    }
  
    // Check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== ""
    ) {
      alert("Winner in diagonal from top-left to bottom-right");
      gameBoard.resetBoard();
    }
  
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== ""
    ) {
      alert("Winner in diagonal from top-right to bottom-left");
      gameBoard.resetBoard();
    }
  
    return
  };

  return {activePlayer,
          makeMove,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  gameController.makeMove();
  gameBoard.updateBoard();
});
