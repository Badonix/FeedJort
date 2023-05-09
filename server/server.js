const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const { v4 } = require("uuid");
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let users = [];

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("click", (data) => {
    console.log(data);
  });

  socket.on("register", (data) => {
    const id = v4();
    socket.emit("get_id", {
      id,
    });
    users = [...users, { nickname: data.nickname, id, calories: 0 }];

    console.log(users);
  });
  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("zd");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
