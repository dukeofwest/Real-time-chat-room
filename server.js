PORT = 8080;
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

const app = express();

app.get("/", function (req, res) {
  res.json("Welcome to the group chat");
});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

//app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
