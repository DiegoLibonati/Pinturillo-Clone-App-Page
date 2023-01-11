export const handleJoinToAnotherRoom = (
  roomId: string,
  createRoom: ({ roomId }: { roomId: string }) => void
) => {
  createRoom({ roomId: roomId });
};
