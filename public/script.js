//Pour permet l'échange avec le serveur
let socket = io()
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();
socket.emit('user_connected', { id });

    
//Variables
let currentPlayer = "X";
let gameOver = false;
const message = document.getElementById("message");
const cells = document.querySelectorAll(".cell");
const cells1 = document.querySelectorAll(".cell1");
const cells2 = document.querySelectorAll(".cell2");
const cells3 = document.querySelectorAll(".cell3");
const cells4 = document.querySelectorAll(".cell4");
const cells5 = document.querySelectorAll(".cell5");

let buttonRightUpBlock = false
let buttonRightMiddleBlock = false
let buttonRightDownBlock = false

let buttonLeftUpBlock = false
let buttonLeftMiddleBlock = false
let buttonLeftDownBlock = false

let buttonUpRightBlock = false
let buttonMiddleRightBlock = false
let buttonDownRightBlock = false

let buttonUpLeftBlock = false
let buttonMiddleLeftBlock = false
let buttonDownLeftBlock = false

// Récupère la liste des rooms disponibles
socket.emit('get_room_list');
socket.on('room_list', (rooms) => {
    const ul = document.getElementById('room-list-ul');
    ul.innerHTML = '';
    rooms.forEach((room) => {
        const li = document.createElement('li');
        li.innerText = room;
        ul.appendChild(li);
    });
});

// Événement pour rejoindre une room
const joinRoomButton = document.getElementById('join-room-button');
joinRoomButton.addEventListener('click', () => {
    const roomID = document.getElementById('room-id-input').value;
    socket.emit('join_room', roomID);
});

// Gestion des messages d'erreur
socket.on('room_full', () => {
    alert('La room est pleine. Veuillez choisir une autre room.');
});
socket.on('room_joined', () => {
    alert('Vous avez rejoint la room !');
});

const buttonChangeLineSend = () => {
    socket.emit("buttonChangeLine",buttonRightUpBlock,buttonRightMiddleBlock,buttonRightDownBlock,
    buttonLeftUpBlock,buttonLeftMiddleBlock,buttonLeftDownBlock,
    buttonUpRightBlock,buttonMiddleRightBlock,buttonDownRightBlock,
    buttonUpLeftBlock,buttonMiddleLeftBlock,buttonDownLeftBlock)
}

const init = () => {
board = ["","","","","","","","",""];
board1 = ["","","","","","","","",""];
board2 = ["","","","","","","","",""];
board3 = ["","","","","","","","",""];
board4 = ["","","","","","","","",""];
board5 = ["","","","","","","","",""];
}

const changePlayer = () => {

if (currentPlayer === "X") {
currentPlayer = "O";

} else {
currentPlayer = "X";
    
}}

const removeListeners = () => {
    cells.forEach((cell) => {
        cell.removeEventListener("click", onCellClick);
    });
};

// //Quand une cellule est cliqué envoie l'information au serveur
const onCellClick = (event) => {
    const cell = event.target;
    if (cell.innerText == ""){
    const index = Array.from(cells).indexOf(cell);
    socket.emit("play_a_case", currentPlayer, index);

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
};

cells.forEach((cell) => {
    if (gameOver == false) {
        cell.addEventListener("click", onCellClick);
    }
});

//Récupére l'information envoyer par le serveur pour la cellule
socket.on("play_a_case", function(currentPlayer, index){

    const cell = cells[index];
    cell.innerText = currentPlayer;
    board[index] = currentPlayer;

    checkWin()
    changePlayer()
    
});

const changeLineRight = (verifRightMove) => {

    verifRightMove.forEach((position) => {
    const [a, b, c] = position;
        let memoryBoardEnd = board2[a]
        let memoryBoardEnd1 = board2[b]
        let memoryBoardEnd2 = board2[c]
        let memoryGameEnd = Array.from(cells2)[a].innerText
        let memoryGameEnd1 = Array.from(cells2)[b].innerText
        let memoryGameEnd2 = Array.from(cells2)[c].innerText

        socket.emit("changeLineRight", [a, b, c],
        memoryBoardEnd, memoryBoardEnd1, memoryBoardEnd2,
        memoryGameEnd, memoryGameEnd1, memoryGameEnd2);

    })
}

const changeLineLeft = (verifLeftMove) => {

    verifLeftMove.forEach((position) => {
        const [a, b, c] = position;
        let memoryBoardEnd = board4[a]
        let memoryBoardEnd1 = board4[b]
        let memoryBoardEnd2 = board4[c]
        let memoryGameEnd = Array.from(cells4)[a].innerText
        let memoryGameEnd1 = Array.from(cells4)[b].innerText
        let memoryGameEnd2 = Array.from(cells4)[c].innerText

        socket.emit("changeLineLeft", [a, b, c],
        memoryBoardEnd, memoryBoardEnd1, memoryBoardEnd2,
        memoryGameEnd, memoryGameEnd1, memoryGameEnd2);

    })
}

const changeLineUp = (verifUpMove) => {

    verifUpMove.forEach((position) => {
        const [a, b, c] = position;
        let memoryBoardEnd = board5[a]
        let memoryBoardEnd1 = board5[b]
        let memoryBoardEnd2 = board5[c]
        let memoryGameEnd = Array.from(cells5)[a].innerText
        let memoryGameEnd1 = Array.from(cells5)[b].innerText
        let memoryGameEnd2 = Array.from(cells5)[c].innerText

        socket.emit("changeLineUp", [a, b, c],
        memoryBoardEnd, memoryBoardEnd1, memoryBoardEnd2,
        memoryGameEnd, memoryGameEnd1, memoryGameEnd2);

    })
}

const changeLineDown = (verifDownMove) => {

    verifDownMove.forEach((position) => {
        const [a, b, c] = position;
        let memoryBoardEnd = board1[a]
        let memoryBoardEnd1 = board1[b]
        let memoryBoardEnd2 = board1[c]
        let memoryGameEnd = Array.from(cells1)[a].innerText
        let memoryGameEnd1 = Array.from(cells1)[b].innerText
        let memoryGameEnd2 = Array.from(cells1)[c].innerText

        socket.emit("changeLineDown", [a, b, c],
        memoryBoardEnd, memoryBoardEnd1, memoryBoardEnd2,
        memoryGameEnd, memoryGameEnd1, memoryGameEnd2);

    })
}

socket.on("changeLineRight", function([a, b, c],
    memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
    memoryGameEnd,memoryGameEnd1,memoryGameEnd2){
    
    board2[a] = board3[a]
    board2[b] = board3[b]
    board2[c] = board3[c]
    Array.from(cells2)[a].innerText = Array.from(cells3)[a].innerText
    Array.from(cells2)[b].innerText = Array.from(cells3)[b].innerText
    Array.from(cells2)[c].innerText = Array.from(cells3)[c].innerText

    board3[a] = board4[a]
    board3[b] = board4[b]
    board3[c] = board4[c]
    Array.from(cells3)[a].innerText = Array.from(cells4)[a].innerText
    Array.from(cells3)[b].innerText = Array.from(cells4)[b].innerText
    Array.from(cells3)[c].innerText = Array.from(cells4)[c].innerText

    board4[a] = board[a]
    board4[b] = board[b]
    board4[c] = board[c]
    Array.from(cells4)[a].innerText = Array.from(cells)[a].innerText
    Array.from(cells4)[b].innerText = Array.from(cells)[b].innerText
    Array.from(cells4)[c].innerText = Array.from(cells)[c].innerText

    board[a] = memoryBoardEnd
    board[b] = memoryBoardEnd1
    board[c] = memoryBoardEnd2
    Array.from(cells)[a].innerText = memoryGameEnd 
    Array.from(cells)[b].innerText = memoryGameEnd1
    Array.from(cells)[c].innerText = memoryGameEnd2

    checkWin()
    changePlayer()
    
});

socket.on("changeLineLeft", function([a, b, c],
    memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
    memoryGameEnd,memoryGameEnd1,memoryGameEnd2){
    
        board4[a] = board3[a]
        board4[b] = board3[b]
        board4[c] = board3[c]
        Array.from(cells4)[a].innerText = Array.from(cells3)[a].innerText
        Array.from(cells4)[b].innerText = Array.from(cells3)[b].innerText
        Array.from(cells4)[c].innerText = Array.from(cells3)[c].innerText

        board3[a] = board2[a]
        board3[b] = board2[b]
        board3[c] = board2[c]
        Array.from(cells3)[a].innerText = Array.from(cells2)[a].innerText
        Array.from(cells3)[b].innerText = Array.from(cells2)[b].innerText
        Array.from(cells3)[c].innerText = Array.from(cells2)[c].innerText

        board2[a] = board[a]
        board2[b] = board[b]
        board2[c] = board[c]
        Array.from(cells2)[a].innerText = Array.from(cells)[a].innerText
        Array.from(cells2)[b].innerText = Array.from(cells)[b].innerText
        Array.from(cells2)[c].innerText = Array.from(cells)[c].innerText

        board[a] = memoryBoardEnd
        board[b] = memoryBoardEnd1
        board[c] = memoryBoardEnd2
        Array.from(cells)[a].innerText = memoryGameEnd 
        Array.from(cells)[b].innerText = memoryGameEnd1
        Array.from(cells)[c].innerText = memoryGameEnd2

        checkWin()
        changePlayer()
});

socket.on("changeLineUp", function([a, b, c],
    memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
    memoryGameEnd,memoryGameEnd1,memoryGameEnd2){
    
        board5[a] = board3[a]
        board5[b] = board3[b]
        board5[c] = board3[c]
        Array.from(cells5)[a].innerText = Array.from(cells3)[a].innerText
        Array.from(cells5)[b].innerText = Array.from(cells3)[b].innerText
        Array.from(cells5)[c].innerText = Array.from(cells3)[c].innerText

        board3[a] = board1[a]
        board3[b] = board1[b]
        board3[c] = board1[c]
        Array.from(cells3)[a].innerText = Array.from(cells1)[a].innerText
        Array.from(cells3)[b].innerText = Array.from(cells1)[b].innerText
        Array.from(cells3)[c].innerText = Array.from(cells1)[c].innerText

        board1[a] = board[a]
        board1[b] = board[b]
        board1[c] = board[c]
        Array.from(cells1)[a].innerText = Array.from(cells)[a].innerText
        Array.from(cells1)[b].innerText = Array.from(cells)[b].innerText
        Array.from(cells1)[c].innerText = Array.from(cells)[c].innerText

        board[a] = memoryBoardEnd
        board[b] = memoryBoardEnd1
        board[c] = memoryBoardEnd2
        Array.from(cells)[a].innerText = memoryGameEnd 
        Array.from(cells)[b].innerText = memoryGameEnd1
        Array.from(cells)[c].innerText = memoryGameEnd2
        
        checkWin()
        changePlayer()
});

socket.on("changeLineDown", function([a, b, c],
    memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
    memoryGameEnd,memoryGameEnd1,memoryGameEnd2){
    
        board1[a] = board3[a]
        board1[b] = board3[b]
        board1[c] = board3[c]
        Array.from(cells1)[a].innerText = Array.from(cells3)[a].innerText
        Array.from(cells1)[b].innerText = Array.from(cells3)[b].innerText
        Array.from(cells1)[c].innerText = Array.from(cells3)[c].innerText

        board3[a] = board5[a]
        board3[b] = board5[b]
        board3[c] = board5[c]
        Array.from(cells3)[a].innerText = Array.from(cells5)[a].innerText
        Array.from(cells3)[b].innerText = Array.from(cells5)[b].innerText
        Array.from(cells3)[c].innerText = Array.from(cells5)[c].innerText

        board5[a] = board[a]
        board5[b] = board[b]
        board5[c] = board[c]
        Array.from(cells5)[a].innerText = Array.from(cells)[a].innerText
        Array.from(cells5)[b].innerText = Array.from(cells)[b].innerText
        Array.from(cells5)[c].innerText = Array.from(cells)[c].innerText

        board[a] = memoryBoardEnd
        board[b] = memoryBoardEnd1
        board[c] = memoryBoardEnd2
        Array.from(cells)[a].innerText = memoryGameEnd 
        Array.from(cells)[b].innerText = memoryGameEnd1
        Array.from(cells)[c].innerText = memoryGameEnd2

        checkWin()
        changePlayer()
});

socket.on("buttonChangeLine", function(buttonRightUpBlockR,buttonRightMiddleBlockR,buttonRightDownBlockR,
        buttonLeftUpBlockR,buttonLeftMiddleBlockR,buttonLeftDownBlockR,
        buttonUpRightBlockR,buttonMiddleRightBlockR,buttonDownRightBlockR,
        buttonUpLeftBlockR,buttonMiddleLeftBlockR,buttonDownLeftBlockR){

            buttonRightUpBlock = buttonRightUpBlockR
            buttonRightMiddleBlock = buttonRightMiddleBlockR
            buttonRightDownBlock = buttonRightDownBlockR
            buttonLeftUpBlock = buttonLeftUpBlockR
            buttonLeftMiddleBlock = buttonLeftMiddleBlockR
            buttonLeftDownBlock = buttonLeftDownBlockR
            buttonUpRightBlock = buttonUpRightBlockR
            buttonMiddleRightBlock = buttonMiddleRightBlockR
            buttonDownRightBlock = buttonDownRightBlockR
            buttonUpLeftBlock = buttonUpLeftBlockR
            buttonMiddleLeftBlock = buttonMiddleLeftBlockR
            buttonMiddleLeftBlock = buttonMiddleLeftBlockR
            buttonDownLeftBlock = buttonDownLeftBlockR
        })

const rightUp = () => {
    const verifRightMove = [[0,1,2]]

    if(buttonRightUpBlock == false){
        changeLineRight(verifRightMove)

        buttonRightMiddleBlock = false
        buttonRightDownBlock = false
        buttonLeftUpBlock = true
        buttonLeftMiddleBlock = false
        buttonLeftDownBlock = false
        buttonUpRightBlock = false
        buttonMiddleRightBlock = false
        buttonDownRightBlock = false
        buttonUpLeftBlock = false
        buttonMiddleLeftBlock = false
        buttonDownLeftBlock = false

        buttonChangeLineSend()
    }
    
}

const rightMiddle = () => {
    const verifRightMove = [[3,4,5]]

    if(buttonRightMiddleBlock == false){
    changeLineRight(verifRightMove)

    buttonRightUpBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = true
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

const rightDown = () => {
    const verifRightMove = [[6,7,8]]

    if(buttonRightDownBlock == false){
    changeLineRight(verifRightMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = true
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

document.getElementById("buttonRightUp").addEventListener("click", rightUp);
document.getElementById("buttonRightMiddle").addEventListener("click", rightMiddle);
document.getElementById("buttonRightDown").addEventListener("click", rightDown);

const leftUp = () => {
    const verifLeftMove = [[0,1,2]]

    if(buttonLeftUpBlock == false){
    changeLineLeft(verifLeftMove)

    buttonRightUpBlock = true
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

const leftMiddle = () => {
    const verifLeftMove = [[3,4,5]]

    if(buttonLeftMiddleBlock == false){
    changeLineLeft(verifLeftMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = true
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

const leftDown = () => {
    const verifLeftMove = [[6,7,8]]

    if(buttonLeftUpBlock == false){
    changeLineLeft(verifLeftMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = true
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

document.getElementById("buttonLeftUp").addEventListener("click", leftUp);
document.getElementById("buttonLeftMiddle").addEventListener("click", leftMiddle);
document.getElementById("buttonLeftDown").addEventListener("click", leftDown);

const upLeft = () => {
    const verifUpMove = [[0,3,6]]

    if(buttonUpRightBlock == false){
    changeLineUp(verifUpMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = true
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

const upMiddle = () => {
    const verifUpMove = [[1,4,7]]

    if(buttonMiddleRightBlock == false){
    changeLineUp(verifUpMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = true
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

const upRight = () => {
    const verifUpMove = [[2,5,8]]

    if(buttonDownRightBlock == false){
    changeLineUp(verifUpMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = true

    buttonChangeLineSend()
    }
}

document.getElementById("buttonUpLeft").addEventListener("click", upLeft);
document.getElementById("buttonUpMiddle").addEventListener("click", upMiddle);
document.getElementById("buttonUpRight").addEventListener("click", upRight);

const downLeft = () => {
    const verifDownMove = [[0,3,6]]

    if(buttonUpLeftBlock == false){
    changeLineDown(verifDownMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = true
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
} 

const downMiddle = () => {
    const verifDownMove = [[1,4,7]]

    if(buttonMiddleLeftBlock == false){
    changeLineDown(verifDownMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = true
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonDownLeftBlock = false

    buttonChangeLineSend()
    }
}

const downRight = () => {
    const verifDownMove = [[2,5,8]]

    if(buttonDownLeftBlock == false){
    changeLineDown(verifDownMove)

    buttonRightUpBlock = false
    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = false
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = true
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false

    buttonChangeLineSend()
    }
}

document.getElementById("buttonDownLeft").addEventListener("click", downLeft);
document.getElementById("buttonDownMiddle").addEventListener("click", downMiddle);
document.getElementById("buttonDownRight").addEventListener("click", downRight);

// Vérifie si un joueur a gagné
const checkWin = () => {
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

winningPositions.forEach((position) => {
    const [a, b, c] = position;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        message.innerText = `Le joueur ${currentPlayer} a gagné !`;
        removeListeners();

        buttonRightUpBlock = true
        buttonRightMiddleBlock = true
        buttonRightDownBlock = true
        buttonLeftUpBlock = true
        buttonLeftMiddleBlock = true
        buttonLeftDownBlock = true
        buttonUpRightBlock = true
        buttonMiddleRightBlock = true
        buttonDownRightBlock = true
        buttonUpLeftBlock = true
        buttonMiddleLeftBlock = true
        buttonDownLeftBlock = true

        buttonChangeLineSend()

      return;
    }
})
}

init()
