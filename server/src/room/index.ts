import { Socket } from "socket.io";

const rooms: Record<string, { participants: UserParams[]; countdown: number }> =
  {};

interface UserParams {
  userId: String;
  username: String;
  isAuth: Boolean;
  isOwner?: Boolean;
  score: number;
  isPainting?: Boolean;
  wasPainter?: Boolean;
  guessTheWord?: Boolean;
}

interface IRoomParams {
  roomId: string;
  user: {
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
    score: number;
    isPainting?: Boolean;
    wasPainter?: Boolean;
    guessTheWord?: Boolean;
  };
}

export const roomHandler = (socket: Socket) => {
  const createRoom = ({ roomId }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        participants: [],
        countdown: 90,
      };
      socket.emit("room-created", { roomId });
      console.log(`ROOM CREATED: ${roomId}`);
    }
  };

  const joinRoom = ({ roomId, user }: IRoomParams) => {
    const userInRoom = rooms[roomId].participants.filter(
      (room) => room.userId === user.userId
    );
    if (rooms[roomId] && userInRoom.length === 0) {
      if (rooms[roomId].participants.length === 0) {
        rooms[roomId].participants.push({ ...user, isOwner: true });
      } else {
        rooms[roomId].participants.push(user);
      }

      socket.join(roomId);
      socket.emit("get-users", {
        roomId: roomId,
        participants: rooms[roomId].participants,
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

      rooms[roomId].participants = rooms[roomId].participants.filter(
        (room) => room.userId !== userId
      );

      if (user.isOwner && rooms[roomId][0]) {
        rooms[roomId].participants[0]["isOwner"] = true;
      }

      socket.to(roomId).emit("user-disconnect", { user });

      if (rooms[roomId].participants.length === 0) {
        delete rooms[roomId];
      }
    }
  };

  const startGameRoom = (roomId) => {
    if (rooms[roomId].participants) {
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

  const getNewScore = (roomId, user) => {
    if (rooms[roomId].participants) {
      const userId = user.userId;
      const userScore = user.score;

      if (userId && userScore) {
        const usersUpdate = rooms[roomId].participants.map((user) => {
          if (user.userId === userId) {
            user.score = userScore;
            user.guessTheWord = true;
            return user;
          }
          return user;
        });

        rooms[roomId].participants = usersUpdate;

        socket
          .to(roomId)
          .emit("update-score-user", rooms[roomId].participants, user);
      }
    }
  };

  const getNewPainter = (roomId, userWasPainter = null) => {
    let newPainterSetted = false;
    let userPainting = null;
    let userWasAPainter = null;

    if (userWasPainter) {
      const usersUpdate = rooms[roomId].participants.map((user) => {
        if (user.userId === userWasPainter) {
          userWasAPainter = user;
          user.wasPainter = true;
          user.isPainting = false;
          user.guessTheWord = false;
          return user;
        }
        user.guessTheWord = false;
        return user;
      });

      rooms[roomId].participants = usersUpdate;
    }

    const usersUpdate = rooms[roomId].participants.map((user) => {
      if (!user.wasPainter && !newPainterSetted) {
        user.isPainting = true;
        newPainterSetted = true;
        user.guessTheWord = false;
        userPainting = user;
        return user;
      }
      user.isPainting = false;
      user.guessTheWord = false;
      return user;
    });

    rooms[roomId].participants = usersUpdate;

    if (newPainterSetted) {
      socket
        .to(roomId)
        .emit(
          "new-painter",
          rooms[roomId].participants,
          userPainting,
          userWasAPainter
        );
    } else {
      socket.to(roomId).emit("final-round", rooms[roomId].participants);
    }
  };

  const getCountdown = (roomId) => {
    let countdown = rooms[roomId].countdown;
    const interval = setInterval(
      () => {
        countdown -= 1;

        if (countdown === 0) {
          socket.to(roomId).emit("countdown-event", { countdown: 0 });
          socket.to(roomId).emit("countdown-event", { countdown: 90 });
          clearInterval(interval);
        }

        if (countdown > 0 && countdown < 89) {
          socket.to(roomId).emit("countdown-event", { countdown });
        }
      },
      1000,
      countdown
    );

    socket.on("all-users-guess", () => {
      clearInterval(interval);

      const timeout = setTimeout(() => {
        socket.to(roomId).emit("countdown-event", { countdown: 0 });
        socket.to(roomId).emit("countdown-event", { countdown: 90 });
      }, 2000);

      return () => clearTimeout(timeout);
    });
  };

  socket.on("create-room", (roomId) => createRoom(roomId));

  socket.on("join-room", (roomId) => joinRoom(roomId));

  socket.on("start-game", (roomId) => startGameRoom(roomId));

  socket.on("canvas-data", getCanvasData);

  socket.on("new-message", getMessage);

  socket.on("update-score-user", getNewScore);

  socket.on("new-painter", getNewPainter);

  socket.on("countdown-event", getCountdown);
};
