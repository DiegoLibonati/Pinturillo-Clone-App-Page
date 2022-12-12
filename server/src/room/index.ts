import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {
  const createRoom = (roomId) => {
    socket.emit("room-created", { roomId });
    console.log(`ROOM CREATED: ${roomId}`);
  };

  const joinRoom = (roomId) => {
    socket.join(roomId);
    console.log(`user joined the room: ${roomId}`);
  };

  socket.on("create-room", (roomId) => createRoom(roomId));

  socket.on("join-room", (roomId) => joinRoom(roomId));
};
