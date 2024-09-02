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
            DomDisplayController.renderGameboard(index,marker);
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
    let user1 = 'The user';
    let user2 = 'Computer';

    const playerOne = Players(user1, "X");
    const playerTwo = Players(user2, "O");
    playerOne.sayHello();
    playerTwo.sayHello();

    let currPlayer = playerOne;
    
    
    const hoverOver = document.querySelector('.container');
    hoverOver.addEventListener('mouseover', (e) => {
        if (e.target && e.target.id) { // Check if the target has an ID
            const hoverElem = document.getElementById(e.target.id);
            if (hoverElem) { // Check if the element exists
                hoverElem.style.backgroundColor = '#fef8dd';
            }
        }
    });

    hoverOver.addEventListener('mouseout', (e) => {
        if (e.target && e.target.id) { // Check if the target has an ID
            const unhoverElem = document.getElementById(e.target.id);
            if (unhoverElem) { // Check if the element exists
            unhoverElem.style.backgroundColor = '';
            }
    }
    });

    const clearBtn = document.querySelector('#restart');
    clearBtn.addEventListener('click', (e) => {
        GameBoard.gameboard.forEach((_, index, array) => {
            array[index] = ""; // Clear each element in the array
        });
        const allBoxes = document.querySelectorAll('.boxes');
        allBoxes.forEach(box => {
            box.textContent = ""; // Clear the content of each box
        });
    });
   
    let move;
    DomDisplayController.renderMessages(`Welcome to Tic Tac Toe`)
   
    const clickCell = document.querySelector('.container');
    clickCell.addEventListener('click', (e) => {
        const idToIndexMap = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8
        };
        const changeColor = document.getElementById(e.target.id);
        changeColor.style.backgroundColor = '#f7d8ba';
        move = idToIndexMap[e.target.id];
        checkWin(move);
        function checkWin (move) {
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
                    DomDisplayController.renderMessages(`${currPlayer.name} wins!`);
                    
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
                    DomDisplayController.renderMessages('Its a tie!')
                    return;
                }
                else{
                    currPlayer = (currPlayer === playerOne) ? playerTwo : playerOne;
                    DomDisplayController.renderMessages('Beat the Computer!')

                    if(currPlayer == playerTwo){
                        let ran = Math.random() * 9;
                        let int_ran = parseInt(ran);
                        checkWin(int_ran);
                    }
                }
            }
            
        }
        else {
            DomDisplayController.renderMessages('invalid option');
            console.log('this should say invalid');

            if (currPlayer == playerTwo){
                let ran = Math.random() * 9;
                let int_ran = parseInt(ran);
                checkWin(int_ran);
            }
        }
        
    }
        
    
    });
    
}




const DomDisplayController = (function(){
    
    const messages = document.querySelector('.msg');
    function renderGameboard(index,marker){
        if (index == 0){
            const box0 = document.querySelector('#zero');
            box0.textContent = marker;
        }
        else if(index == 1) {
            const box1 = document.querySelector('#one');
            box1.textContent = marker;
        }
        else if(index == 2) {
            const box2 = document.querySelector('#two');
            box2.textContent = marker;
        }
        else if(index == 3) {
            const box3 = document.querySelector('#three');
            box3.textContent = marker;
        }
        else if(index == 4) {
            const box4 = document.querySelector('#four');
            box4.textContent = marker;
        }
        else if(index == 5) {
            const box5 = document.querySelector('#five');
            box5.textContent = marker;
        }
        else if(index == 6) {
            const box6 = document.querySelector('#six');
            box6.textContent = marker;
        }
        else if(index == 7) {
            const box7 = document.querySelector('#seven');
            box7.textContent = marker;
        }
        else{
            const box8 = document.querySelector('#eight');
            box8.textContent = marker;
        }
        
    }

    function renderMessages(message){
        messages.textContent = message;
    }

    

    return {renderGameboard, renderMessages};
})();


GameController();

