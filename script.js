const GameBoard = (function() {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    function printBoard() {
        console.log(`${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]}`);
        console.log("-------");
        console.log(`${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]}`);
        console.log("-------");
        console.log(`${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]}`);
    }

    function updateBoard(index, marker) {
        if (index >= 0 && index < gameboard.length && gameboard[index] === "") {
            gameboard[index] = marker;
            return true;
        }
        else{
            return false;
        }
    }

    return { gameboard, printBoard, updateBoard };
})();


function Players (fullName, mark) {
    return {
        name: fullName,
        marker: mark,
        sayHello() {
            console.log(`My name is ${this.name} and I play as ${this.marker}`);
        }
    }
}

function GameController() {
    let user1 = 'Alberto Quintero';
    let user2 = 'Andrea Zarate';

    const playerOne = Players(user1, "X");
    const playerTwo = Players(user2, "O");
    playerOne.sayHello();
    playerTwo.sayHello();

    let currPlayer = playerOne;
    
    let gameActive = true;
    while (gameActive) {
        let move = getMove();
        if (GameBoard.updateBoard(move, currPlayer.marker)) {
            GameBoard.printBoard();
            const winningArr = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            let gameWon = false;
            for (let i = 0; i < winningArr.length; i++) {
                let winCombination = winningArr[i];
                let markerMatch = true;
                for (let j = 0; j < winCombination.length; j++) {
                    if (GameBoard.gameboard[winCombination[j]] !== currPlayer.marker) {
                        markerMatch = false;
                        break;
                    }
                }
                if (markerMatch) {
                    console.log(`${currPlayer.name} wins!`);
                    gameActive = false;
                    gameWon = true;
                    break;
                }
            }

            if (!gameWon) {
                // Switch turns if the game is not won
                let count = 0;
                for(let i = 0; i < GameBoard.gameboard.length; i++){
                    if(GameBoard.gameboard[i] == 'X' || GameBoard.gameboard[i] == 'O'){
                        count += 1;
                    }
                }
                if(count == 9){
                    alert('The game resulted in a tie!')
                    gameActive = false;
                }
                currPlayer = (currPlayer === playerOne) ? playerTwo : playerOne;
            }

        } 
        else {
            alert('invalid option');
        }
    }

    function getMove() {
        let currMove = prompt(`${currPlayer.name}, choose where you want your move to be (0-8):`);
        return parseInt(currMove, 10); // Convert string input to a number
    }
}

GameController();
