export const getMessage = (data, socket) => {
  const { username, message, roomId } = data;

  const newMessage = {
    author: username,
    message: message,
  };

  socket.to(roomId).emit("new-message", newMessage);
};
