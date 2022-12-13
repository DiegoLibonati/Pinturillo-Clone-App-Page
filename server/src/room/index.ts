import { Socket } from "socket.io";

const rooms: Record<string, UserParams[]> = {};

interface UserParams {
  userId: string;
  username: string;
  isAuth: boolean;
  isOwner?: boolean;
}

interface IRoomParams {
  roomId: string;
  user: {
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
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
      rooms[roomId].push(user);
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
    const userId = user.userId;

    rooms[roomId] = rooms[roomId].filter((room) => room.userId !== userId);
    socket.to(roomId).emit("user-disconnect", user);
  };

  socket.on("create-room", (roomId) => createRoom(roomId));

  socket.on("join-room", (roomId) => joinRoom(roomId));
};
