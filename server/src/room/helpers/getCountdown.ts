import { Socket } from "socket.io";
import { rooms } from "..";
import { resetCountdown } from "./resetCountdown";

export const getCountdown = (roomId: string, socket: Socket): void => {
  if (!rooms[roomId]) return;
  let countdown = rooms[roomId].countdown;

  const interval = setInterval(
    () => {
      if (!rooms[roomId]) return clearInterval(interval);

      countdown -= 1;
      if (countdown === 0) {
        resetCountdown(interval, roomId, socket);
      }

      if (countdown > 0 && countdown < 89) {
        socket.emit("countdown-event", { countdown });
      }
    },
    1000,
    countdown
  );

  socket.on("all-users-guess", () => resetCountdown(interval, roomId, socket));
};
