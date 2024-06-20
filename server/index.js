const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.emit("connected", {
    msg: "Hello",
  });

  socket.on("update_score", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_update", {
      xScore: data.xScore,
      yScore: data.yScore,
    });
  });

  socket.on("update_board", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_updateBoard", {
      squares: data.board,
    });
  });

  socket.on("update_player", (data) => {
    console.log(data);
    socket.broadcast.emit("receiveUpdatePlayer", {
      player: data.player,
    });
  });

  socket.on("updateWinner", (data) => {
    socket.broadcast.emit("receiveUpdateWinner", {
      winner: data.winner,
    });
  });

  socket.on("updateRound", (data) => {
    socket.broadcast.emit("receiveUpdateRound", {
      round: data.round,
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
