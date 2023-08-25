const playerFactory = (name, marker) => {
    return {name, marker};
};


let board = [ "","","",
              "","","",
              "","","" ];
              
// const gameBoard = (() => {

//   const boardTiles = [...document.querySelector(".game-board").children];
   
//     let playerMarkers = boardTiles
//       .map(x => x.textContent || " ")
//       .join("");

//     let board = [...playerMarkers];    
  
//     return {
//         board
//       }
// });

const gameController = (() => {

  // pull the variables form the page for actual player
  // const playerOne = playerFactory(playerOneName, playerOneMarker);
  // pull the variables form the page for actual player
  // const playerTwo = playerFactory(playerTwoName, playerTwoMarker);

  const playerOne = playerFactory('Player One', 'x');
  const playerTwo = playerFactory('Player Two', 'o');

  let activePlayer = playerOne;

  const switchPlayer = () => {
      activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const updateBoard = () => {
    const boardTiles = [...document.querySelector(".game-board").children];
  
    let playerMarkers = boardTiles
    .map(x => x.textContent || " ")
    .join("");
  
    let board = [...playerMarkers];    
    console.log(board) 
    }

  let tiles = document.querySelectorAll('.tile');

  const makeMove = () => {
    tiles.forEach(tile => tile.addEventListener('click', () => {
      console.log(tile.classList[1])
      console.log(activePlayer.marker)
      if (tile.textContent === ""){
      tile.textContent = activePlayer.marker;
      switchPlayer();
      updateBoard();
      } 
      else {
        console.log("Select a different tile")
      };
    }));
  }

  return {activePlayer, 
          makeMove, 
          updateBoard};

})();

// console.log(gameController.activePlayer)
// console.log(gameBoard.initBoard)




gameController.makeMove()
gameController.updateBoard()




