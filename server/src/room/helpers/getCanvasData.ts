export const getCanvasData = (roomId, base64ImageData, socket) => {
  socket.to(roomId).emit("canvas-data", base64ImageData);
};
