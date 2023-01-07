import { Socket } from "socket.io";
import { rooms } from "..";

export const resetCountdown = (
  interval: number,
  roomId: string,
  socket: Socket
): (() => void) => {
  if (!rooms[roomId]) return;

  clearInterval(interval);

  if (rooms[roomId].userWasPainterId) {
    const usersUpdate = rooms[roomId].participants.map((user) => {
      if (user.userId === rooms[roomId].userWasPainterId) {
        rooms[roomId].userWasAPainter = user;
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

  const timeout = setTimeout(() => {
    socket.emit("countdown-event", { countdown: 0 });
    socket.emit("countdown-event", { countdown: 90 });
  }, 2000);

  return () => clearTimeout(timeout);
};
