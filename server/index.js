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
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
});

const ROOM_CAPACITY = 2;
const rooms = {};
let currRoom = "";
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("joinRoom", () => {
    console.log("Joining Room");
    // Check first if there's a room if not create the first room
    if (Object.keys(rooms).length <= 0) {
      currRoom = socket.id;
      rooms[socket.id] = [];
      rooms[socket.id].push(socket.id);
      socket.join(socket.id);
      // console.log("init rooms:", rooms);
      console.log("Room: ", currRoom);
      return;
    }

    // check for rooms first
    for (const [key, value] of Object.entries(rooms)) {
      // make sure you don't join the same room
      if (rooms[socket.id] && rooms[key].includes(socket.id)) {
        console.log("all rooms:", rooms);
        return;
      }

      // room founded
      if (rooms[key].length < ROOM_CAPACITY) {
        currRoom = key;
        rooms[key].push(socket.id);
        socket.join(currRoom);
        console.log("Room: ", currRoom);
        io.to(currRoom).emit("startMatch", {
          message: "Match Found",
        });
        // console.log("Found room:", rooms);
        return;
      }
      // check if you're already in a room
      if (rooms[key].includes(socket.id)) return;
    }

    // Create your own room
    if (!rooms[socket.id]) {
      currRoom = socket.id;
      rooms[socket.id] = [];
      rooms[socket.id].push(socket.id);
      socket.join(socket.id);
      console.log("Room: ", currRoom);
      // console.log("Created New room:", rooms);
      return;
    }
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
