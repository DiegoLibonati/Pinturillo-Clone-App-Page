export const onSubmitForm = (
  e: React.FormEvent<HTMLFormElement>,
  isFormValid: boolean,
  roomIdValid: string,
  createRoom: ({ roomId }: { roomId: string }) => void,
  roomId: string,
  setModalOpen: (type: string, message: string) => void
) => {
  e.preventDefault();

  if (!isFormValid) {
    setModalOpen("error", roomIdValid);
    return;
  }

  createRoom({ roomId: roomId });
};
