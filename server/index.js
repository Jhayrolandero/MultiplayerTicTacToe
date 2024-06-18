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

  socket.on("update_score", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_update", {
      xScore: data.xScore,
      yScore: data.yScore,
    });
  });

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", {
      xScore: data.xScore,
      yScore: data.yScore,
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
