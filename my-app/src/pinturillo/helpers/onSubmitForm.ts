import Swal from "sweetalert2";

export const onSubmitForm = (
  e: React.FormEvent<HTMLFormElement>,
  isFormValid: boolean,
  roomIdValid: string,
  createRoom: ({ roomId }: { roomId: string }) => void,
  roomId: string
) => {
  e.preventDefault();

  if (!isFormValid) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: roomIdValid,
    });
  }

  createRoom({ roomId: roomId });
};
