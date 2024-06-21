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

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const ROOM_CAPACITY = 2;
const rooms = {};
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", () => {
    // Check first if there's a room if not create the first room
    if (Object.keys(rooms).length <= 0) {
      rooms[socket.id] = [];
      rooms[socket.id].push(socket.id);
      console.log("init rooms:", rooms);
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
      if (rooms[key].length < 2) {
        rooms[key].push(socket.id);
        console.log("Found room:", rooms);
        return;
      }

      // check if you're already in a room
      if (rooms[key].includes(socket.id)) return;
    }

    // Create your own room
    if (!rooms[socket.id]) {
      rooms[socket.id] = [];
      rooms[socket.id].push(socket.id);
      console.log("Created New room:", rooms);
      return;
    }
  });

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
