import { Socket } from "socket.io";

const rooms: Record<string, UserParams[]> = {};

interface UserParams {
  userId: string;
  username: string;
  isAuth: boolean;
  isOwner?: boolean;
  score?: number;
}

interface IRoomParams {
  roomId: string;
  user: {
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score?: number;
  };
}

export const roomHandler = (socket: Socket) => {
  const createRoom = ({ roomId }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
      socket.emit("room-created", { roomId });
      console.log(`ROOM CREATED: ${roomId}`);
    }
  };

  const joinRoom = ({ roomId, user }: IRoomParams) => {
    const userInRoom = rooms[roomId].filter(
      (room) => room.userId === user.userId
    );
    if (rooms[roomId] && userInRoom.length === 0) {
      if (rooms[roomId].length === 0) {
        rooms[roomId].push({ ...user, isOwner: true });
      } else {
        rooms[roomId].push(user);
      }

      socket.join(roomId);
      socket.emit("get-users", {
        roomId: roomId,
        participants: rooms[roomId],
      });
      socket.to(roomId).emit("user-joined", { user });
      console.log(`user joined the room: ${roomId} - ${user.userId}`);
    }

    socket.on("disconnect", () => {
      console.log("user left the room", user.userId);
      leaveRoom({ roomId, user });
    });
  };

  const leaveRoom = ({ roomId, user }: IRoomParams) => {
    if (rooms[roomId]) {
      const userId = user.userId;

      rooms[roomId] = rooms[roomId].filter((room) => room.userId !== userId);

      if (user.isOwner && rooms[roomId][0]) {
        rooms[roomId][0]["isOwner"] = true;
      }

      socket.to(roomId).emit("user-disconnect", { user });

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    }
  };

  const startGameRoom = (roomId) => {
    if (rooms[roomId]) {
      socket.to(roomId).emit("start-game-room", roomId);
    }
  };

  const getCanvasData = (roomId, base64ImageData) => {
    socket.to(roomId).emit("canvas-data", base64ImageData);
  };

  const getMessage = (data) => {
    const { username, message, roomId } = data;

    const newData = {
      author: username,
      message: message,
    };
    console.log(roomId, newData);
    socket.to(roomId).emit("new-message", newData);
  };

  socket.on("create-room", (roomId) => createRoom(roomId));

  socket.on("join-room", (roomId) => joinRoom(roomId));

  socket.on("start-game", (roomId) => startGameRoom(roomId));

  socket.on("canvas-data", getCanvasData);

  socket.on("new-message", getMessage);
};
