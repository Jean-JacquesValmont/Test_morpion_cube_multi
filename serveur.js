const express = require('express');
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const path = require('path');

app.get("/", (req,res) =>{
    res.sendFile(`${__dirname}/public/index.html`)
})

// Permet d'avoir le CSS sur le serveur
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));

io.on("connection", (socket) => {
    console.log("Un utilisateur vient de se connecter.")
    const { id } = socket
    console.log(`User connected with ID ${id}`);

    socket.on("disconnect", () => {
        
        console.log("Un utilisateur vient de se déconnecter.")
    })

    socket.on("play_a_case", (currentPlayer, index) => {
        io.emit("play_a_case", currentPlayer, index);
    });

    socket.on("changeLineRight", ([a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2) => {

        io.emit("changeLineRight", [a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2);
    });

    socket.on("changeLineLeft", ([a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2) => {

        io.emit("changeLineLeft", [a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2);
    });

    socket.on("changeLineUp", ([a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2) => {

        io.emit("changeLineUp", [a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2);
    });

    socket.on("changeLineDown", ([a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2) => {

        io.emit("changeLineDown", [a, b, c],
        memoryBoardEnd,memoryBoardEnd1,memoryBoardEnd2,
        memoryGameEnd,memoryGameEnd1,memoryGameEnd2);
    });

    socket.on("buttonChangeLine",(buttonRightUpBlock,buttonRightMiddleBlock,buttonRightDownBlock,
        buttonLeftUpBlock,buttonLeftMiddleBlock,buttonLeftDownBlock,
        buttonUpRightBlock,buttonMiddleRightBlock,buttonDownRightBlock,
        buttonUpLeftBlock,buttonMiddleLeftBlock,buttonDownLeftBlock) => {

            // console.log("buttonRightUpBlock " + buttonRightUpBlock)
            // console.log("buttonRightMiddleBlock " + buttonRightMiddleBlock)
            // console.log("buttonRightDownBlock " + buttonRightDownBlock)

            // console.log("buttonLeftUpBlock " + buttonLeftUpBlock)
            // console.log("buttonLeftMiddleBlock " + buttonLeftMiddleBlock)
            // console.log("buttonLeftDownBlock " + buttonLeftDownBlock)

            // console.log("buttonUpRightBlock " + buttonUpRightBlock)
            // console.log("buttonMiddleRightBlock " + buttonMiddleRightBlock)
            // console.log("buttonDownRightBlock " + buttonDownRightBlock)

            // console.log("buttonUpLeftBlock " + buttonUpLeftBlock)
            // console.log("buttonMiddleLeftBlock " + buttonMiddleLeftBlock)
            // console.log("buttonDownLeftBlock " + buttonDownLeftBlock)

        io.emit("buttonChangeLine", buttonRightUpBlock,buttonRightMiddleBlock,buttonRightDownBlock,
            buttonLeftUpBlock,buttonLeftMiddleBlock,buttonLeftDownBlock,
            buttonUpRightBlock,buttonMiddleRightBlock,buttonDownRightBlock,
            buttonUpLeftBlock,buttonMiddleLeftBlock,buttonDownLeftBlock);
    });
})

server.listen(4000, () => {
    console.log("Ecoute sur le port 4000")
})