const express = require("express");
const http = require("http");
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
server.listen(PORT, () => {
  console.log(` Server is listening on port ${PORT}`);
});
