import { Socket } from "socket.io-client";

export const onSubmitForm = (
  e: React.FormEvent<HTMLFormElement>,
  ws: Socket,
  isFormValid: boolean,
  roomIdValid: string,
  createRoom: ({ roomId }: { roomId: string }) => void,
  roomId: string,
  setModalOpen: (type: string, message: string, component: string) => void
) => {
  e.preventDefault();

  if (!isFormValid) {
    setModalOpen("error", roomIdValid, "modal");
    return;
  }

  createRoom({ roomId: roomId });
  ws.emit("get-all-rooms");
};
