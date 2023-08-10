const playerFactory = (name, marker) => {
    return {name, marker};
};

const gameBoard = (() => {

    const boardTiles = [...document.querySelector(".game-board").children];

    let playerMarkers = boardTiles
      .map(x => x.textContent || " ")
      .join("");

    let board = [...playerMarkers];    

    return {
        board
    }
})();


console.log(gameBoard.board)

