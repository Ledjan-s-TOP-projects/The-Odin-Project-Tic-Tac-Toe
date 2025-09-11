gamePlay Factory Pseudocode

Variables / State
• currentPlayer → keeps track of whose turn it is (Player 1 or Player 2)
• boardState → an array of 9 elements representing each cell ("", "X" or "O")
• roundNumber → counts the rounds played
• result → stores "Player 1 wins", "Player 2 wins", "Tie" or ""

Methods 1. gameRound()
• Wait for a cell click (use event delegation)
• Determine the currentPlayer
• Check if the clicked cell is empty
• If yes:
• Update the boardState array
• Update the cell’s visible textContent with the player’s symbol
• If no:
• Ignore the click
• Call declareWinner() to see if the game is over
• Switch currentPlayer for the next round
• Increment roundNumber

declareSetWinner() → check the boardState after each move:
• Use an array of winning combinations ([[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]).
• If any combo is all "X" or all "O", declare that player as the set winner.
• If the board is full and no winner, it’s a tie.
• declareGameWinner() → this is for when you want to keep track of multiple sets (since you already have roundNumber and maxRoundNumber):
• Keep a counter of how many sets each player has won (setResult).
• After each set, increment the winner’s counter.
• When roundNumber > maxRoundNumber, check who has more set wins → that’s the game winner.

    3.	declareGameWinner()
    •	Check boardState for any winning combination (rows, columns, diagonals)
    •	If a player has a winning combination:
    •	Update result with "Player X wins"
    •	Disable further moves
    •	If all cells are filled and no winner:
    •	Update result with "Tie"
    •	Disable further moves

    4.	resetGame()
    •	Reset boardState to empty
    •	Reset all cell textContents to empty
    •	Reset roundNumber and currentPlayer
    •	Reset result and allow new moves

⸻

Notes:
• The currentPlayer toggle can be simple: if currentPlayer === Player 1 → switch to Player 2, else back to Player 1.
• For declareWinner(), you can define an array of winning index combinations and check boardState against it.
• This structure keeps the game logic encapsulated inside the factory.

// switch (event.target.id) {
// case "cell-1":
// console.log("cell-1");
// break;
// case "cell-2":
// console.log("cell-2");
// break;
// case "cell-3":
// console.log("cell-3");
// break;
// case "cell-4":
// console.log("cell-4");
// break;
// case "cell-5":
// console.log("cell-5");
// break;
// case "cell-6":
// console.log("cell-6");
// break;
// case "cell-7":
// console.log("cell-7");
// break;
// case "cell-8":
// console.log("cell-8");
// break;
// case "cell-9":
// console.log("cell-9");
// break;
// }
