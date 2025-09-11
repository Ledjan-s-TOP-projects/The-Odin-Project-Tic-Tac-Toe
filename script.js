//=========================Queries===========================
let player1Input = document.querySelector("#player-1");
let player2Input = document.querySelector("#player-2");
const createPlayersBtn = document.querySelector("#create-players");
const list = document.querySelector(".list");
const board = document.querySelector(".board");
const header = document.querySelector("#game-header");

//=========================Event Listeners===================

//Create players button
createPlayersBtn.addEventListener("click", () => {
  list.innerHTML = "";
  gamePlayers.addPlayer(player1Input.value);
  gamePlayers.addPlayer(player2Input.value);
  const listOfPlayers = gamePlayers.getPlayers();

  listOfPlayers.forEach((player, index) => {
    const playerName = document.createElement("p");
    playerName.textContent = `Player ${index + 1}: ${player.name}`;
    list.appendChild(playerName);
  });

  gamePlayers.clearInputs();
  header.appendChild(startRoundBtn);
});

//Start game round button
const startRoundBtn = document.createElement("button");
startRoundBtn.textContent = "Start";
startRoundBtn.setAttribute("id", "startBtn");
startRoundBtn.addEventListener("click", () => gamePlay.gameRound());

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
//=====dummy players
// gamePlayers.addPlayer("John");
// gamePlayers.addPlayer("Max");

//============================================================
// Game Flow Factory
const gamePlay = (function gameflow() {
  let players;
  let currentPlayer;
  const boardState = Array(9).fill("");
  const maxRoundNumber = 3;
  let roundNumber = 1;
  let setResult = {};
  let gameResult = {};
  board.addEventListener("click", handleCellClicks);

  function handleCellClicks(event) {
    if (!event.target.classList.contains("cell")) return; //Check if a cell is clicked
    if (event.target.textContent !== "") return; //Check if a cell is empty
    boardState[event.target.id] = currentPlayer.symbol; //update the array board state with the player symbol
    event.target.textContent = currentPlayer.symbol; //update cell on the display
    togglePlayer();
  }
  const togglePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const gameRound = () => {
    if (roundNumber > maxRoundNumber) return;
    players = gamePlayers.getPlayers();
    currentPlayer = players[0];

    declareSetWinner();
    declareGameWinner();
    roundNumber++;
  };

  const declareSetWinner = () => {};
  const declareGameWinner = () => {};

  const resetGame = () => {};
  return { gameRound, declareSetWinner, declareGameWinner, resetGame };
})();

//============================================================
// dummy round
// gamePlay.gameRound();

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
