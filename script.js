//=========================Queries===========================
const createPlayersDialog = document.querySelector("#create-players-dialog");
createPlayersDialog.showModal();
let player1Input = document.querySelector("#player-1");
let player2Input = document.querySelector("#player-2");
const createPlayersBtn = document.querySelector("#create-players");
const startRoundBtn = document.querySelector("#startBtn");
const list = document.querySelector(".list");
const board = document.querySelector(".board");
const header = document.querySelector("#game-header");
let cell;
const currentPlayerDisplay = document.querySelector("#current-player");
const resultDialog = document.querySelector("#declare-winner");
const setWinner = document.querySelector("#set-result");
const p1Result = document.querySelector("#p1-result");
const p2Result = document.querySelector("#p2-result");
const winner = document.querySelector("#game-result");
const restartBtn = document.querySelector("#restart");

//=========================Factory Functions=================
// Player Factory
const gamePlayers = (function players() {
  const players = [];

  const addPlayer = (name) => {
    if (players.length === 2) {
      throw "Maximum players reached";
    } else if (players.length === 0) {
      const player = { name, symbol: "X", class: "x" };
      players.push(player);
    } else {
      const player = { name, symbol: "O", class: "o" };
      players.push(player);
    }
  };

  const getPlayers = () => [...players];

  const resetPlayers = () => {
    players.length = 0;
  };

  const clearInputs = () => {
    player1Input.value = "";
    player2Input.value = "";
  };

  return { addPlayer, getPlayers, clearInputs, resetPlayers };
})();

//============================================================
// Game Flow Factory
const gamePlay = (function gameflow() {
  //variables
  let players = [];
  let currentPlayer;
  let X = [];
  let O = [];
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
  let setResult = [{ p1: 0 }, { p2: 0 }];
  const maxPoints = 3;

  //Logic for 1 round of the game
  const gameRound = () => {
    players = gamePlayers.getPlayers();
    currentPlayer = players[0];
    p1Result.textContent = `${setResult[0].p1}`;
    p2Result.textContent = `${setResult[1].p2}`;
  };

  //Handle Clicks on the Board
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
    event.target.classList.add(currentPlayer.class);
    checkSetWinner();
    if (setResult[0].p1 === maxPoints || setResult[1].p2 === maxPoints) {
      declareGameWinner();
    } else {
      togglePlayer();
      currentPlayerDisplay.textContent = currentPlayer.name;
    }
  }

  //Toggle players & assign turns
  const togglePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  //Checks and declares the winner of the set
  const checkSetWinner = () => {
    const [player1, player2] = gamePlayers.getPlayers();

    const hasWinningCombo = (playerMoves) =>
      //Does at least one winning combo exists?
      winningCombo.some((combo) =>
        //Are all three indexes of this combo included in the array moves of this player
        combo.every((index) => playerMoves.includes(index))
      );

    if (hasWinningCombo(X)) {
      setResult[0].p1++;
      resultDialog.showModal();
      winner.textContent = `${player1.name} wins this round`;
    } else if (hasWinningCombo(O)) {
      setResult[1].p2++;
      resultDialog.showModal();
      winner.textContent = `${player2.name} wins this round`;
    } else if (
      X.length + O.length === 9 &&
      !hasWinningCombo(X) &&
      !hasWinningCombo(O)
    ) {
      resultDialog.showModal();
      winner.textContent = "It's a draw";
    }

    restartBtn.textContent = "Next Round";
  };

  //Checks and declares the winner of the game
  const declareGameWinner = () => {
    const [player1, player2] = gamePlayers.getPlayers();
    if (setResult[0].p1 === maxPoints) {
      winner.textContent = `${player1.name} has won the game`;
    } else if (setResult[1].p2 === maxPoints) {
      winner.textContent = `${player2.name} has won the game`;
    }

    restartBtn.textContent = "Restart Game";
  };

  const restartSet = () => {
    resultDialog.close();
    X = [];
    O = [];
    currentPlayer = players[0];
    currentPlayerDisplay.textContent = players[0].name;
    boardCells.getCells();
    cell.forEach((cell) => {
      cell.textContent = "";
    });
    gameRound();
  };

  const restartGame = () => {
    resultDialog.close();
    gamePlayers.resetPlayers();
    X = [];
    O = [];
    currentPlayer = null;
    boardCells.getCells();
    cell.forEach((cell) => {
      cell.textContent = "";
    });
    setResult[0].p1 = 0;
    setResult[1].p2 = 0;
    list.innerHTML = "";
    currentPlayerDisplay.innerHTML = "";
    p1Result.innerHTML = "";
    p2Result.innerHTML = "";
  };

  const getResult = () => setResult;

  return {
    gameRound,
    handleCellClicks,
    checkSetWinner,
    restartSet,
    declareGameWinner,
    restartGame,
    getResult,
  };
})();

//============================================================
//=========================Event Listeners===================

//Create players button
createPlayersBtn.addEventListener("click", () => {
  list.innerHTML = "";
  gamePlayers.addPlayer(player1Input.value);
  gamePlayers.addPlayer(player2Input.value);
  const players = gamePlayers.getPlayers();
  currentPlayerDisplay.textContent = players[0].name;

  players.forEach((player, index) => {
    const playerName = document.createElement("div");
    playerName.textContent = `${player.symbol} - ${player.name}`;
    index === 0
      ? playerName.classList.add("player-1")
      : playerName.classList.add("player-2");
    list.appendChild(playerName);
    gamePlay.gameRound();
    if (!players || players.length < 2) return;
    board.addEventListener("click", gamePlay.handleCellClicks);
  });

  gamePlayers.clearInputs();
  createPlayersDialog.close();
});

//============================================================
//Board Module
const boardCells = (function gameBoard() {
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("cell");
    square.setAttribute("id", i);
    board.appendChild(square);
  }

  const getCells = () => {
    return (cell = document.querySelectorAll(".cell"));
  };

  return { getCells };
})();

//============================================================
//Restart button listener
restartBtn.addEventListener("click", () => {
  const result = gamePlay.getResult();
  result[0].p1 === 3 || result[1].p2 === 3
    ? gamePlay.restartGame()
    : gamePlay.restartSet();
});
