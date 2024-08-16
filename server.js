const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const chatSocket = require('./src/sockets/chat');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-public.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

io.on('connection', (socket) => chatSocket(io, socket));

server.listen(3001, () => {
  console.log('listening on 3001');
});
