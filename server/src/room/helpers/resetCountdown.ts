export const resetCountdown = (interval, socket) => {
  clearInterval(interval);

  const timeout = setTimeout(() => {
    socket.emit("countdown-event", { countdown: 0 });
    socket.emit("countdown-event", { countdown: 90 });
  }, 2000);

  return () => clearTimeout(timeout);
};
