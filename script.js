//=========================Queries===========================
let player1Input = document.querySelector("#player-1");
let player2Input = document.querySelector("#player-2");
const createPlayersBtn = document.querySelector("#create-players");
const list = document.querySelector(".list");
const board = document.querySelector(".board");

//=========================Event Listeners===================

//Create players button
createPlayersBtn.addEventListener("click", () => {
  list.innerHTML = "";
  gamePlayers.addPlayer(player1Input.value);
  gamePlayers.addPlayer(player2Input.value);
  const listOfPlayers = gamePlayers.getPlayers();

  listOfPlayers.forEach((player, index) => {
    const playerName = document.createElement("p");
    playerName.textContent = `Player ${index + 1}: ${player}`;
    list.appendChild(playerName);
  });

  clearInputs();
});

//Board Cells

board.addEventListener("click", (event) => {
  if (!event.target.classList.contains("cell")) return;
  console.log(event.target.id);
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

  const getPlayers = () => players.map((player) => player.name);

  return { addPlayer, getPlayers };
})();

function flow() {}

function clearInputs() {
  player1Input.value = "";
  player2Input.value = "";
}

//Board Module
const boardCells = (function gameBoard() {
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("cell");
    square.setAttribute("id", `cell-${i + 1}`);
    board.appendChild(square);
  }
})();
