export const clearCanvas = (roomId, socket) => {
  socket.to(roomId).emit("clear-canvas");
};
