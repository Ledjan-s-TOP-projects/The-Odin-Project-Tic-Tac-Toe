//=========================Queries===========================
let player1Input = document.querySelector("#player-1");
let player2Input = document.querySelector("#player-2");
const createPlayersBtn = document.querySelector("#create-players");
// const player1Name = document.querySelector("#player-1-name");
// const player2Name = document.querySelector("#player-2-name");
const list = document.querySelector(".list");

//=========================Event Listeners===================

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

//=========================Factory Functions=================
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

function gameBoard() {}
function flow() {}

function clearInputs() {
  player1Input.value = "";
  player2Input.value = "";
}
