//=========================Queries===========================
let player1Input = document.querySelector("#player-1");
let player2Input = document.querySelector("#player-2");
const createPlayersBtn = document.querySelector("#create-players");
const startRoundBtn = document.querySelector("#startBtn");
const list = document.querySelector(".list");
const board = document.querySelector(".board");
const header = document.querySelector("#game-header");

//=========================Event Listeners===================

//Create players button
createPlayersBtn.addEventListener("click", () => {
  list.innerHTML = "";
  gamePlayers.addPlayer(player1Input.value);
  gamePlayers.addPlayer(player2Input.value);
  const players = gamePlayers.getPlayers();

  players.forEach((player, index) => {
    const playerName = document.createElement("p");
    playerName.textContent = `Player ${index + 1}: ${player.name}`;
    list.appendChild(playerName);
  });

  gamePlayers.clearInputs();
  header.appendChild(startRoundBtn);
});

//=========================Factory Functions=================
// Player Factory
const gamePlayers = (function players() {
  const players = [];

  const addPlayer = (name) => {
    if (players.length === 2) {
      throw "Maximum players reached";
    } else if (players.length === 0) {
      const player = { name, symbol: "X" };
      players.push(player);
    } else {
      const player = { name, symbol: "O" };
      players.push(player);
    }
  };

  const getPlayers = () => [...players];

  const clearInputs = () => {
    player1Input.value = "";
    player2Input.value = "";
  };

  return { addPlayer, getPlayers, clearInputs };
})();

//============================================================
// Game Flow Factory
const gamePlay = (function gameflow() {
  let players = [];
  let currentPlayer;
  const X = [];
  const O = [];
  const maxRoundNumber = 3;
  let roundNumber = 1;
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let setResult = {};
  let gameResult = {};
  startRoundBtn.addEventListener("click", handleStartBtnClick);

  function handleCellClicks(event) {
    let idNumber = Number(event.target.id);
    if (!event.target.classList.contains("cell")) return; //Check if a cell is clicked
    if (event.target.textContent !== "") return; //Check if a cell is empty
    if (currentPlayer.symbol === "X") {
      X.push(idNumber);
    } else {
      O.push(idNumber);
    }
    event.target.textContent = currentPlayer.symbol; //update cell on the display

    checkSetWinner();
    declareGameWinner();
    togglePlayer();
  }

  const togglePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  function handleStartBtnClick() {
    players = gamePlayers.getPlayers();
    if (!players || players.length < 2) return;
    board.addEventListener("click", handleCellClicks);
    gamePlay.gameRound();
  }

  const gameRound = () => {
    if (roundNumber > maxRoundNumber) return;
    players = gamePlayers.getPlayers();
    currentPlayer = players[0];
    roundNumber++;
  };

  const checkSetWinner = () => {
    const [player1, player2] = gamePlayers.getPlayers();

    const hasWinningCombo = (playerMoves) =>
      //Does at least one winning combo exists?
      winningCombo.some((combo) =>
        //Are all three indexes of this combo included in the array moves of this player
        combo.every((index) => playerMoves.includes(index))
      );

    if (hasWinningCombo(X)) {
      console.log(`${player1.name} wins this set`);
    } else if (hasWinningCombo(O)) {
      console.log(`${player2.name} wins this set`);
    }
    //the draw condition should be here
  };

  const declareGameWinner = () => {};

  const resetGame = () => {};
  return {
    gameRound,
    checkSetWinner,
    declareGameWinner,
    resetGame,
  };
})();

//============================================================

//============================================================
//Board Module
const boardCells = (function gameBoard() {
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("cell");
    square.setAttribute("id", i);
    board.appendChild(square);
  }
})();
