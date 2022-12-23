export const getMessage = (data, socket) => {
  const { username, message, roomId } = data;

  const newData = {
    author: username,
    message: message,
  };
  console.log(roomId, newData);
  socket.to(roomId).emit("new-message", newData);
};
