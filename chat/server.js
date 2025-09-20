const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Usuário conectado");
  socket.on("mensagem", (msg) => {
    io.emit("mensagem", msg);
  });
});

httpServer.listen(5004, () => console.log("Chat rodando na porta 5004"));
