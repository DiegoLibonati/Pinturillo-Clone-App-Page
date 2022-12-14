import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";

const port = 3001;
const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("user is connected");

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening to the server on ${port}`);
});
