export const resetCountdown = (interval, roomId, socket) => {
  clearInterval(interval);

  const timeout = setTimeout(() => {
    socket.to(roomId).emit("countdown-event", { countdown: 0 });
    socket.to(roomId).emit("countdown-event", { countdown: 90 });
  }, 2000);

  return () => clearTimeout(timeout);
};
