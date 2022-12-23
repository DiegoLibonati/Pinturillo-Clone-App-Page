import { rooms } from "..";
import { resetCountdown } from "./resetCountdown";

export const getCountdown = (roomId, socket) => {
  let countdown = rooms[roomId].countdown;
  const interval = setInterval(
    () => {
      countdown -= 1;

      if (countdown === 0) {
        resetCountdown(interval, roomId, socket);
      }

      if (countdown > 0 && countdown < 89) {
        socket.to(roomId).emit("countdown-event", { countdown });
      }
    },
    1000,
    countdown
  );

  socket.on("all-users-guess", () => resetCountdown(interval, roomId, socket));
};
