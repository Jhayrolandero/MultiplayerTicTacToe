const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const GameState = require("./gameClass").GameState;
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

let rooms = {};
let playerQueue = {};
let currRoom = "";

const generateCode = () => {
  return (code = Math.floor(Math.random() * 1000000).toString());
};

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // Quick Play
  socket.on("quickPlay", (data) => {
    // Player is in queue
    if (playerQueue[socket.id]) {
      console.log(playerQueue);
      return;
    }
    console.log("Quick play Room");

    // Check first if there's a room if not create the first room
    if (Object.keys(rooms).length <= 0) {
      const code = generateCode();
      const game = new GameState(code, data.user, socket.id);
      rooms = { ...rooms, [code]: game };
      console.log(rooms[code]);
      socket.join(code);
      playerQueue = { ...playerQueue, [socket.id]: true };
      return;
      // currRoom = socket.id;
      // rooms[socket.id] = [];
      // rooms[socket.id].push(socket.id);
      // socket.join(socket.id);
      // // console.log("init rooms:", rooms);
      // console.log("Room: ", currRoom);
      // return;
    }

    // check for rooms first
    for (const [key, value] of Object.entries(rooms)) {
      // Room found
      if (!rooms[key].player2) {
        rooms[key].JoinMatch(data.user, socket.id);
        console.log(rooms[key]);
        socket.join(rooms[key].Room());
        playerQueue = { ...playerQueue, [socket.id]: true };
        return;
      }

      // // make sure you don't join the same room
      // if (rooms[socket.id] && rooms[key].includes(socket.id)) {
      //   console.log("all rooms:", rooms);
      //   return;
      // }

      // // room founded
      // if (rooms[key].length < ROOM_CAPACITY) {
      //   currRoom = key;
      //   rooms[key].push(socket.id);
      //   socket.join(currRoom);
      //   console.log("Room: ", currRoom);
      //   io.to(currRoom).emit("startMatch", {
      //     message: "Match Found",
      //   });
      //   // console.log("Found room:", rooms);
      //   return;
      // }
      // // check if you're already in a room
      // if (rooms[key].includes(socket.id)) return;
    }

    // Create your own room
    const code = generateCode();
    if (!rooms[code]) {
      const game = new GameState(code, data.user, socket.id);
      rooms = { ...rooms, [code]: game };
      console.log(rooms[code]);
      socket.join(code);
      playerQueue = { ...playerQueue, [socket.id]: true };
      return;
    }

    // if (!rooms[socket.id]) {
    //   currRoom = socket.id;
    //   rooms[socket.id] = [];
    //   rooms[socket.id].push(socket.id);
    //   socket.join(socket.id);
    //   console.log("Room: ", currRoom);
    //   // console.log("Created New room:", rooms);
    //   return;
    // }
  });

  // socket.join(currRoom);

  socket.on("update_score", (data) => {
    console.log(data);
    socket.to(currRoom).emit("receive_update", {
      xScore: data.xScore,
      yScore: data.yScore,
    });
  });

  socket.on("update_board", (data) => {
    console.log(currRoom);
    // console.log(data);
    socket.to(currRoom).emit("receive_updateBoard", {
      squares: data.board,
    });
  });

  socket.on("update_player", (data) => {
    console.log(data);
    socket.to(currRoom).emit("receiveUpdatePlayer", {
      player: data.player,
    });
  });

  socket.on("updateWinner", (data) => {
    socket.to(currRoom).emit("receiveUpdateWinner", {
      winner: data.winner,
    });
  });

  socket.on("updateRound", (data) => {
    socket.to(currRoom).emit("receiveUpdateRound", {
      round: data.round,
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
