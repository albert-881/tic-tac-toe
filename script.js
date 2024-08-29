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

const playerOne = Players("Alberto Quintero", "X")
const playerTwo = Players("Andrea Zarate", "O");
playerOne.sayHello();
playerTwo.sayHello();


GameBoard.printBoard();
GameBoard.updateBoard(0, playerOne.marker);
GameBoard.updateBoard(1,playerOne.marker);
GameBoard.updateBoard(5,playerTwo.marker);
GameBoard.printBoard();